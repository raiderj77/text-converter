"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";
import { hmacMd5, md5 } from "@/lib/md5";

type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
type HashResults = Partial<Record<Algorithm, string>>;

const ALGORITHMS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export function findHashMatches(
  compareHash: string,
  textHashes: HashResults,
  fileHashes: HashResults,
): string[] {
  const clean = compareHash.trim().toLowerCase();
  if (!clean) return [];

  const matches: string[] = [];
  const sources: Array<readonly ["Text" | "File", HashResults]> = [
    ["Text", textHashes],
    ["File", fileHashes],
  ];
  for (const [source, sourceHashes] of sources) {
    for (const algorithm of ALGORITHMS) {
      if (sourceHashes[algorithm]?.toLowerCase() === clean) {
        matches.push(`${source} ${algorithm}`);
      }
    }
  }
  return matches;
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function cryptoHash(algo: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest(algo, encoder.encode(data));
  return arrayBufferToHex(buffer);
}

async function cryptoHmac(algo: string, key: string, data: string | ArrayBuffer): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw", encoder.encode(key), { name: "HMAC", hash: algo }, false, ["sign"]
  );
  const message = typeof data === "string" ? encoder.encode(data) : data;
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, message);
  return arrayBufferToHex(sig);
}

export async function hashBytes(
  algo: string,
  buffer: ArrayBuffer,
  hmacKey: string | null = null,
): Promise<string> {
  if (hmacKey !== null) {
    if (algo === "MD5") {
      return hmacMd5(hmacKey, new Uint8Array(buffer));
    }
    return cryptoHmac(algo, hmacKey, buffer);
  }
  if (algo === "MD5") {
    return md5(new Uint8Array(buffer));
  }
  const hashBuffer = await crypto.subtle.digest(algo, buffer);
  return arrayBufferToHex(hashBuffer);
}

type ClipboardWriter = (text: string) => Promise<void>;

export async function copyToClipboard(
  text: string,
  writeText: ClipboardWriter = (value) => navigator.clipboard.writeText(value),
): Promise<boolean> {
  try {
    await writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function HashGeneratorTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResults>({});
  const [hmacKey, setHmacKey] = useState("");
  const [hmacMode, setHmacMode] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState("");
  const [compareHash, setCompareHash] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const [fileHashes, setFileHashes] = useState<HashResults>({});
  const [hashing, setHashing] = useState(false);
  const [fileError, setFileError] = useState("");
  const [copyError, setCopyError] = useState("");
  const fileRequestGeneration = useRef(0);
  const copyRequestGeneration = useRef(0);
  const copyResetTimeout = useRef<number | null>(null);

  // Hash text input
  useEffect(() => {
    let cancelled = false;
    async function run(): Promise<HashResults> {
      if (!input || (hmacMode && !hmacKey)) return {};
      const results: HashResults = {};
      if (hmacMode && hmacKey) {
        results["MD5"] = hmacMd5(hmacKey, input);
        for (const algo of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as Algorithm[]) {
          results[algo] = await cryptoHmac(algo, hmacKey, input);
        }
      } else if (!hmacMode) {
        results["MD5"] = md5(input);
        for (const algo of ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as Algorithm[]) {
          results[algo] = await cryptoHash(algo, input);
        }
      }
      return results;
    }
    void run().then((results) => {
      if (!cancelled) setHashes(results);
    });
    return () => { cancelled = true; };
  }, [input, hmacMode, hmacKey]);

  const invalidateFileResults = useCallback(() => {
    fileRequestGeneration.current += 1;
    setFileInfo(null);
    setFileHashes({});
    setHashing(false);
    setFileError("");
  }, []);

  const handleFile = useCallback(async (file: File) => {
    const requestId = ++fileRequestGeneration.current;
    if (hmacMode && !hmacKey) {
      setFileInfo(null);
      setFileHashes({});
      setHashing(false);
      setFileError("Enter an HMAC secret key before hashing a file.");
      return;
    }

    const activeHmacKey = hmacMode ? hmacKey : null;
    setFileInfo({ name: file.name, size: file.size });
    setFileHashes({});
    setFileError("");
    setHashing(true);
    try {
      const buffer = await file.arrayBuffer();
      if (requestId !== fileRequestGeneration.current) return;
      const results: HashResults = {};
      for (const algo of ALGORITHMS) {
        const hash = await hashBytes(algo, buffer, activeHmacKey);
        if (requestId !== fileRequestGeneration.current) return;
        results[algo] = hash;
      }
      if (requestId === fileRequestGeneration.current) {
        setFileHashes(results);
      }
    } catch {
      if (requestId === fileRequestGeneration.current) {
        setFileHashes({});
        setFileError("This file could not be read or hashed. Try it again or use a smaller file.");
      }
    } finally {
      if (requestId === fileRequestGeneration.current) {
        setHashing(false);
      }
    }
  }, [hmacKey, hmacMode]);

  const clearAll = useCallback(() => {
    fileRequestGeneration.current += 1;
    setInput("");
    setHashes({});
    setFileInfo(null);
    setFileHashes({});
    setHashing(false);
    setFileError("");
    setCopied("");
    setCopyError("");
    copyRequestGeneration.current += 1;
    if (copyResetTimeout.current !== null) {
      window.clearTimeout(copyResetTimeout.current);
      copyResetTimeout.current = null;
    }
    setCompareHash("");
    setHmacKey("");
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  }, [handleFile]);

  const openFilePicker = useCallback(() => {
    if (hmacMode && !hmacKey) {
      setFileError("Enter an HMAC secret key before hashing a file.");
      return;
    }
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) void handleFile(file);
    };
    inputElement.click();
  }, [handleFile, hmacKey, hmacMode]);

  const formatHash = (h: string) => uppercase ? h.toUpperCase() : h.toLowerCase();

  const copyText = async (text: string, label: string) => {
    const requestId = ++copyRequestGeneration.current;
    const succeeded = await copyToClipboard(text);
    if (requestId !== copyRequestGeneration.current) return;
    if (!succeeded) {
      setCopied("");
      setCopyError("Copy failed. Select the value and copy it manually.");
      return;
    }

    setCopyError("");
    setCopied(label);
    if (copyResetTimeout.current !== null) {
      window.clearTimeout(copyResetTimeout.current);
    }
    copyResetTimeout.current = window.setTimeout(() => {
      setCopied("");
      copyResetTimeout.current = null;
    }, 1500);
  };

  const compareMatches = useMemo(() => {
    if (!compareHash || !showCompare) return null;
    return findHashMatches(compareHash, hashes, fileHashes);
  }, [compareHash, showCompare, hashes, fileHashes]);

  const copyAll = () => {
    const sources: Array<readonly ["Text" | "File", HashResults]> = [];
    if (Object.keys(hashes).length > 0) sources.push(["Text", hashes]);
    if (Object.keys(fileHashes).length > 0) sources.push(["File", fileHashes]);
    const includeSource = sources.length > 1;
    const text = sources.flatMap(([source, sourceHashes]) =>
      ALGORITHMS.flatMap((algorithm) => {
        const hash = sourceHashes[algorithm];
        const label = includeSource ? `${source} ${algorithm}` : algorithm;
        return hash ? [`${label}: ${formatHash(hash)}`] : [];
      }),
    ).join("\n");
    void copyText(text, "all");
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";

  return (
    <div className="space-y-4">
      {/* Text input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label className="text-sm font-semibold block mb-2">Text Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Text to hash"
          placeholder="Enter text to hash..."
          rows={4}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          spellCheck={false}
        />
        <div className="flex items-center justify-between mt-2">
          <span className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-600")}>
            {input.length} character{input.length !== 1 ? "s" : ""} · {new TextEncoder().encode(input).length} bytes
          </span>
        </div>
      </div>

      {/* File drop */}
      <div
        className={cx("rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
          isDark ? "border-white/10 hover:border-white/20" : "border-black/10 hover:border-black/20")}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={openFilePicker}
        aria-disabled={hmacMode && !hmacKey}
      >
        {hashing ? (
          <div className="text-sm text-emerald-400">Hashing file...</div>
        ) : hmacMode && !hmacKey ? (
          <div className={cx("text-sm", isDark ? "text-neutral-400" : "text-neutral-600")}>
            Enter an HMAC secret key before selecting a file
          </div>
        ) : fileInfo ? (
          <div className="text-sm">
            <span className="font-semibold">{fileInfo.name}</span>
            <span className={isDark ? "text-neutral-400" : "text-neutral-600"}> ({formatSize(fileInfo.size)})</span>
          </div>
        ) : (
          <div className={cx("text-sm", isDark ? "text-neutral-400" : "text-neutral-600")}>
            Drop a file here or click to select — generate checksums for any file
          </div>
        )}
      </div>

      {fileError ? (
        <p role="alert" className="text-sm text-red-400">{fileError}</p>
      ) : null}
      {copyError ? (
        <p role="alert" className="text-sm text-red-400">{copyError}</p>
      ) : null}

      {/* Options toolbar */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { invalidateFileResults(); setHmacMode((enabled) => !enabled); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", hmacMode ? btnActive : btnBase)}>
          HMAC Mode
        </button>
        <button onClick={() => setUppercase(!uppercase)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", uppercase ? btnActive : btnBase)}>
          {uppercase ? "UPPERCASE" : "lowercase"}
        </button>
        <button onClick={() => setShowCompare(!showCompare)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", showCompare ? btnActive : btnBase)}>
          Compare Hash
        </button>
        {(Object.keys(hashes).length > 0 || Object.keys(fileHashes).length > 0) && (
          <button onClick={copyAll}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", btnBase)}>
            {copied === "all" ? "✓ Copied All!" : "Copy All"}
          </button>
        )}
        <button onClick={clearAll}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", btnBase)}>
          Clear All
        </button>
      </div>

      {/* HMAC key */}
      {hmacMode && (
        <div className={cx("rounded-xl border p-4", base)}>
          <label className="text-sm font-semibold block mb-2">HMAC Secret Key</label>
          <input type="text" value={hmacKey} onChange={(e) => { invalidateFileResults(); setHmacKey(e.target.value); }}
            placeholder="Enter HMAC secret key..."
            className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
            spellCheck={false}
          />
        </div>
      )}

      {/* Compare */}
      {showCompare && (
        <div className={cx("rounded-xl border p-4", base)}>
          <label className="text-sm font-semibold block mb-2">Compare Hash</label>
          <input type="text" value={compareHash} onChange={(e) => setCompareHash(e.target.value)}
            placeholder="Paste a hash to compare..."
            className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
            spellCheck={false}
          />
          {compareHash && (
            <div className="mt-2 text-xs">
              {compareMatches === null ? null : compareMatches.length > 0 ? (
                <span className="text-emerald-400 font-semibold">✓ Match found — {compareMatches.join(", ")}</span>
              ) : (
                <span className="text-red-400">✗ No match found</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hash results — text */}
      {Object.keys(hashes).length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">
            {hmacMode ? "HMAC Results" : "Hash Results"}
          </h3>
          <div className="space-y-3">
            {ALGORITHMS.map((algo) => {
              const hash = hashes[algo];
              if (!hash) return null;
              const display = formatHash(hash);
              const isMatch = showCompare && compareHash && compareHash.trim().toLowerCase() === hash.toLowerCase();
              return (
                <div key={algo} className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50", isMatch && "ring-2 ring-emerald-400/50")}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-emerald-400">{algo}</span>
                    <div className="flex items-center gap-2">
                      <span className={cx("text-xs", isDark ? "text-neutral-600" : "text-neutral-400")}>{hash.length} chars</span>
                      <button onClick={() => { void copyText(display, algo); }}
                        className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors", btnBase)}>
                        {copied === algo ? "✓" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <div className="font-mono text-xs break-all leading-relaxed select-all">{display}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hash results — file */}
      {Object.keys(fileHashes).length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">
            {hmacMode ? "File HMAC Results" : "File Checksums"} — {fileInfo?.name}
          </h3>
          <div className="space-y-3">
            {ALGORITHMS.map((algo) => {
              const hash = fileHashes[algo];
              if (!hash) return null;
              const display = formatHash(hash);
              const isMatch = showCompare && compareHash && compareHash.trim().toLowerCase() === hash.toLowerCase();
              return (
                <div key={`f-${algo}`} className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50", isMatch && "ring-2 ring-emerald-400/50")}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-sky-400">{algo}</span>
                    <button onClick={() => { void copyText(display, `f-${algo}`); }}
                      className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors", btnBase)}>
                      {copied === `f-${algo}` ? "✓" : "Copy"}
                    </button>
                  </div>
                  <div className="font-mono text-xs break-all leading-relaxed select-all">{display}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
