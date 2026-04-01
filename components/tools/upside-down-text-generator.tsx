"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_upside_down_text";

const charMap: Record<string, string> = {
  // lowercase
  a: "\u0250", b: "q", c: "\u0254", d: "p", e: "\u01DD", f: "\u025F",
  g: "\u0183", h: "\u0265", i: "\u1D09", j: "\u027E", k: "\u029E",
  l: "l", m: "\u026F", n: "u", o: "o", p: "d", q: "b", r: "\u0279",
  s: "s", t: "\u0287", u: "n", v: "\u028C", w: "\u028D", x: "x",
  y: "\u028E", z: "z",
  // uppercase
  A: "\u2200", B: "\uA4ED", C: "\u2183", D: "\uA4F7", E: "\u018E",
  F: "\u2132", G: "\u2141", H: "H", I: "I", J: "\u027E", K: "\uA4D8",
  L: "\u2143", M: "W", N: "N", O: "O", P: "\u0500", Q: "\uA779",
  R: "\uA4E4", S: "S", T: "\u22A5", U: "\u2229", V: "\u039B",
  W: "M", X: "X", Y: "\u2144", Z: "Z",
  // punctuation
  ".": "\u02D9", ",": "\u2018", "?": "\u00BF", "!": "\u00A1",
  "'": ",", '"': "\u201E", "(": ")", ")": "(", "[": "]", "]": "[",
  "{": "}", "}": "{", "<": ">", ">": "<", "_": "\u203E", "&": "\u214B",
};

function toUpsideDown(text: string): string {
  return text
    .split("")
    .map((ch) => charMap[ch] ?? ch)
    .reverse()
    .join("");
}

export function UpsideDownTextGeneratorTool() {
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

  const output = input ? toUpsideDown(input) : "";

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
    setInput("Hello World! Flip this text upside down.");
  };

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExample}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Load Example
        </button>
        <button
          type="button"
          onClick={clearAll}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear All
        </button>
        {output && (
          <button
            type="button"
            onClick={copyToClipboard}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
          >
            {copied ? "Copied!" : "Copy Output"}
          </button>
        )}
      </div>

      {/* Input / Output panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className={cx("rounded-xl border p-4", base)}>
          <label htmlFor="upside-down-input" className="text-sm font-semibold block mb-2">
            Your Text
          </label>
          <textarea
            id="upside-down-input"
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
            {input.length} character{input.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Output */}
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Upside Down Output</h3>
            {output && (
              <button
                type="button"
                onClick={copyToClipboard}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
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
                Upside down text appears here as you type...
              </span>
            )}
          </div>
          <div className={cx("mt-2 text-xs", muted)}>
            {output.length} character{output.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
