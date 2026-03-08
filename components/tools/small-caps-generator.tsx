"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_small_caps_generator";

const SMALL_CAPS_MAP: Record<string, string> = {
  a: "\u1D00",
  b: "\u0299",
  c: "\u1D04",
  d: "\u1D05",
  e: "\u1D07",
  f: "\uA730",
  g: "\u0262",
  h: "\u029C",
  i: "\u026A",
  j: "\u1D0A",
  k: "\u1D0B",
  l: "\u029F",
  m: "\u1D0D",
  n: "\u0274",
  o: "\u1D0F",
  p: "\u1D18",
  q: "\u01EB",
  r: "\u0280",
  s: "\uA731",
  t: "\u1D1B",
  u: "\u1D1C",
  v: "\u1D20",
  w: "\u1D21",
  x: "x",
  y: "\u028F",
  z: "\u1D22",
};

function toSmallCaps(text: string): string {
  return text
    .split("")
    .map((char) => {
      const lower = char.toLowerCase();
      if (char !== lower) return char; // uppercase passes through
      return SMALL_CAPS_MAP[lower] || char;
    })
    .join("");
}

export function SmallCapsGeneratorTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.input) setInput(parsed.input);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ input }));
    } catch {
      // ignore
    }
  }, [input]);

  const output = input ? toSmallCaps(input) : "";

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [output]);

  const clearAll = () => setInput("");

  const handleExample = () => {
    setInput("Small Caps look elegant and professional!");
  };

  const stats = {
    inputChars: input.length,
    outputChars: output.length,
    inputWords: input.trim() ? input.trim().split(/\s+/).length : 0,
  };

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExample}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            btnBase
          )}
        >
          Load Example
        </button>
        <button
          type="button"
          onClick={clearAll}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            btnBase
          )}
        >
          Clear All
        </button>
        {output && (
          <button
            type="button"
            onClick={copyToClipboard}
            className={cx(
              "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
              btnBase
            )}
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>

      {/* Input / Output panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className={cx("rounded-xl border p-4", base)}>
          <label
            htmlFor="text-input"
            className="text-sm font-semibold block mb-2"
          >
            Input Text
          </label>
          <textarea
            id="text-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste your text here..."
            className={cx(
              "w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
              inputBase
            )}
            style={{ minHeight: "280px" }}
          />
          <div className={cx("mt-2 text-xs", muted)}>
            {stats.inputWords} word{stats.inputWords !== 1 ? "s" : ""} ·{" "}
            {stats.inputChars} char{stats.inputChars !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Output */}
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Small Caps Output</h3>
            {output && (
              <button
                type="button"
                onClick={copyToClipboard}
                className={cx(
                  "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
                  btnBase
                )}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div
            aria-live="polite"
            className={cx(
              "w-full rounded-lg border px-3 py-2 text-sm font-mono whitespace-pre-wrap break-words overflow-auto",
              inputBase
            )}
            style={{ minHeight: "280px" }}
          >
            {output || (
              <span className={cx("text-sm", muted)}>
                S&#x1D0D;&#x1D00;&#x029F;&#x029F; C&#x1D00;&#x1D18;&#x1A731; output appears here as you type...
              </span>
            )}
          </div>
          <div className={cx("mt-2 text-xs", muted)}>
            {stats.outputChars} char{stats.outputChars !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className={cx("rounded-xl border p-3", base)}>
          <div className={cx("text-xs", muted)}>Input Characters</div>
          <div className="text-lg font-semibold">{stats.inputChars}</div>
        </div>
        <div className={cx("rounded-xl border p-3", base)}>
          <div className={cx("text-xs", muted)}>Output Characters</div>
          <div className="text-lg font-semibold">{stats.outputChars}</div>
        </div>
        <div className={cx("rounded-xl border p-3", base)}>
          <div className={cx("text-xs", muted)}>Words</div>
          <div className="text-lg font-semibold">{stats.inputWords}</div>
        </div>
      </div>
    </div>
  );
}
