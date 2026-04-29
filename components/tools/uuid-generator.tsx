"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

function generateUUID(): string {
  // crypto.randomUUID is available in modern browsers; fallback for older ones
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Manual v4 UUID using crypto.getRandomValues
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 1
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function formatUUID(uuid: string, uppercase: boolean, hyphens: boolean): string {
  let result = uppercase ? uuid.toUpperCase() : uuid.toLowerCase();
  if (!hyphens) result = result.replace(/-/g, "");
  return result;
}

export function UuidGeneratorTool() {
  const { isDark } = useTheme();
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copied, setCopied] = useState("");

  const generate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
    setCopied("");
  }, [count]);

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const copyAll = useCallback(() => {
    const text = uuids.map((u) => formatUUID(u, uppercase, hyphens)).join("\n");
    copyText(text, "all");
  }, [uuids, uppercase, hyphens, copyText]);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="uuid-count" className="text-sm font-semibold block mb-2">
              How many?
            </label>
            <input
              id="uuid-count"
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              className={cx("w-24 rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            />
          </div>
          <button
            onClick={generate}
            className={cx("rounded-lg border px-5 py-2 text-sm font-semibold transition-colors min-h-[44px]", btnPrimary)}
          >
            Generate UUID{count > 1 ? "s" : ""}
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setUppercase(!uppercase)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", uppercase ? btnActive : btnBase)}
        >
          {uppercase ? "UPPERCASE" : "lowercase"}
        </button>
        <button
          onClick={() => setHyphens(!hyphens)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", hyphens ? btnActive : btnBase)}
        >
          {hyphens ? "With Hyphens" : "No Hyphens"}
        </button>
        {uuids.length > 0 && (
          <>
            <button
              onClick={copyAll}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              {copied === "all" ? "Copied All!" : "Copy All"}
            </button>
            <button
              onClick={() => { setUuids([]); setCopied(""); }}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              Clear
            </button>
          </>
        )}
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">
              Generated UUID{uuids.length > 1 ? "s" : ""}{" "}
              <span className={cx("font-normal", muted)}>({uuids.length})</span>
            </h3>
          </div>
          <div className="space-y-2">
            {uuids.map((uuid, i) => {
              const formatted = formatUUID(uuid, uppercase, hyphens);
              const label = `uuid-${i}`;
              return (
                <div
                  key={i}
                  className={cx("flex items-center justify-between rounded-lg border p-3 gap-2", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}
                >
                  <output aria-live="polite" aria-label={`Generated UUID ${i + 1}`} className="block font-mono text-sm break-all select-all flex-1"><code>{formatted}</code></output>
                  <button
                    onClick={() => copyText(formatted, label)}
                    className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px] shrink-0", btnBase)}
                    aria-label={`Copy UUID ${i + 1}`}
                  >
                    {copied === label ? "Copied!" : "Copy"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* UUID anatomy */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">UUID v4 Anatomy</h3>
        <div className="font-mono text-sm break-all leading-relaxed">
          <span className={accent}>xxxxxxxx</span>
          <span className={muted}>-</span>
          <span className={accent}>xxxx</span>
          <span className={muted}>-</span>
          <span className="text-amber-400">4</span><span className={accent}>xxx</span>
          <span className={muted}>-</span>
          <span className="text-sky-400">[89ab]</span><span className={accent}>xxx</span>
          <span className={muted}>-</span>
          <span className={accent}>xxxxxxxxxxxx</span>
        </div>
        <div className={cx("mt-2 text-xs space-y-1", muted)}>
          <p><span className="text-amber-400 font-semibold">4</span> = version (always 4 for random UUIDs)</p>
          <p><span className="text-sky-400 font-semibold">[89ab]</span> = variant (RFC 4122)</p>
          <p><span className={cx("font-semibold", accent)}>x</span> = random hexadecimal digit</p>
          <p>122 random bits = 5.3 x 10<sup>36</sup> possible UUIDs</p>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
