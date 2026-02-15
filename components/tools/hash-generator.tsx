"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Algorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const ALGORITHMS: Algorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

// Simple MD5 implementation (Web Crypto doesn't support MD5)
function md5(input: string): string {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  const bytes: number[] = [];
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0x10000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      bytes.push(0xf0 | (code >> 18), 0x80 | ((code >> 12) & 0x3f), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    }
  }

  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  bytes.push(bitLen & 0xff, (bitLen >> 8) & 0xff, (bitLen >> 16) & 0xff, (bitLen >> 24) & 0xff, 0, 0, 0, 0);

  const x: number[] = [];
  for (let i = 0; i < bytes.length; i += 4) {
    x.push(bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24));
  }

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const oa = a, ob = b, oc = c, od = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936); d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063); b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558); d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844); d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, oa); b = safeAdd(b, ob); c = safeAdd(c, oc); d = safeAdd(d, od);
  }

  const hex = (n: number) => {
    let s = "";
    for (let i = 0; i < 4; i++) s += ((n >> (i * 8 + 4)) & 0xf).toString(16) + ((n >> (i * 8)) & 0xf).toString(16);
    return s;
  };
  return hex(a) + hex(b) + hex(c) + hex(d);
}

// HMAC-MD5
function hmacMd5(key: string, message: string): string {
  const blockSize = 64;
  let keyBytes: number[] = [];
  for (let i = 0; i < key.length; i++) keyBytes.push(key.charCodeAt(i));
  if (keyBytes.length > blockSize) {
    const h = md5(key);
    keyBytes = [];
    for (let i = 0; i < h.length; i += 2) keyBytes.push(parseInt(h.substr(i, 2), 16));
  }
  while (keyBytes.length < blockSize) keyBytes.push(0);
  const opad = keyBytes.map((b) => String.fromCharCode(b ^ 0x5c)).join("");
  const ipad = keyBytes.map((b) => String.fromCharCode(b ^ 0x36)).join("");
  return md5(opad + md5HexToStr(md5(ipad + message)));
}

function md5HexToStr(hex: string): string {
  let s = "";
  for (let i = 0; i < hex.length; i += 2) s += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return s;
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function cryptoHash(algo: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest(algo, encoder.encode(data));
  return arrayBufferToHex(buffer);
}

async function cryptoHmac(algo: string, key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw", encoder.encode(key), { name: "HMAC", hash: algo }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data));
  return arrayBufferToHex(sig);
}

async function hashFile(algo: string, file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  if (algo === "MD5") {
    const bytes = new Uint8Array(buffer);
    let str = "";
    for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
    return md5(str);
  }
  const hashBuffer = await crypto.subtle.digest(algo, buffer);
  return arrayBufferToHex(hashBuffer);
}

export function HashGeneratorTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<Algorithm, string>>({} as any);
  const [hmacKey, setHmacKey] = useState("");
  const [hmacMode, setHmacMode] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState("");
  const [compareHash, setCompareHash] = useState("");
  const [showCompare, setShowCompare] = useState(false);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const [fileHashes, setFileHashes] = useState<Record<Algorithm, string>>({} as any);
  const [hashing, setHashing] = useState(false);

  // Hash text input
  useEffect(() => {
    if (!input) { setHashes({} as any); return; }
    let cancelled = false;
    async function run() {
      const results: Partial<Record<Algorithm, string>> = {};
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
      if (!cancelled) setHashes(results as Record<Algorithm, string>);
    }
    run();
    return () => { cancelled = true; };
  }, [input, hmacMode, hmacKey]);

  const handleFile = useCallback(async (file: File) => {
    setFileInfo({ name: file.name, size: file.size });
    setHashing(true);
    const results: Partial<Record<Algorithm, string>> = {};
    for (const algo of ALGORITHMS) {
      results[algo] = await hashFile(algo === "MD5" ? "MD5" : algo, file);
    }
    setFileHashes(results as Record<Algorithm, string>);
    setHashing(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const formatHash = (h: string) => uppercase ? h.toUpperCase() : h.toLowerCase();

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const compareMatch = useMemo(() => {
    if (!compareHash || !showCompare) return null;
    const clean = compareHash.trim().toLowerCase();
    const allHashes = { ...hashes, ...fileHashes };
    for (const [algo, hash] of Object.entries(allHashes)) {
      if (hash && hash.toLowerCase() === clean) return algo as Algorithm;
    }
    return false;
  }, [compareHash, showCompare, hashes, fileHashes]);

  const copyAll = () => {
    const activeHashes = Object.keys(hashes).length > 0 ? hashes : fileHashes;
    const text = ALGORITHMS.filter((a) => activeHashes[a]).map((a) => `${a}: ${formatHash(activeHashes[a])}`).join("\n");
    copyText(text, "all");
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
          placeholder="Enter text to hash..."
          rows={4}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          spellCheck={false}
        />
        <div className="flex items-center justify-between mt-2">
          <span className={cx("text-xs", isDark ? "text-neutral-500" : "text-neutral-400")}>
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
        onClick={() => { const inp = document.createElement("input"); inp.type = "file"; inp.onchange = (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) handleFile(f); }; inp.click(); }}
      >
        {hashing ? (
          <div className="text-sm text-emerald-400">Hashing file...</div>
        ) : fileInfo ? (
          <div className="text-sm">
            <span className="font-semibold">{fileInfo.name}</span>
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}> ({formatSize(fileInfo.size)})</span>
          </div>
        ) : (
          <div className={cx("text-sm", isDark ? "text-neutral-500" : "text-neutral-400")}>
            Drop a file here or click to select — generate checksums for any file
          </div>
        )}
      </div>

      {/* Options toolbar */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setHmacMode(!hmacMode)}
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
        <button onClick={() => { setInput(""); setHashes({} as any); setFileInfo(null); setFileHashes({} as any); setCompareHash(""); setHmacKey(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", btnBase)}>
          Clear All
        </button>
      </div>

      {/* HMAC key */}
      {hmacMode && (
        <div className={cx("rounded-xl border p-4", base)}>
          <label className="text-sm font-semibold block mb-2">HMAC Secret Key</label>
          <input type="text" value={hmacKey} onChange={(e) => setHmacKey(e.target.value)}
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
              {compareMatch === null ? null : compareMatch ? (
                <span className="text-emerald-400 font-semibold">✓ Match found — {compareMatch}</span>
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
                      <button onClick={() => copyText(display, algo)}
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
            File Checksums — {fileInfo?.name}
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
                    <button onClick={() => copyText(display, `f-${algo}`)}
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
