"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_superscript_generator";

/* ── Unicode Superscript Mappings ── */

const SUPERSCRIPT_MAP: Record<string, string> = {
  a: "\u1D43", b: "\u1D47", c: "\u1D9C", d: "\u1D48", e: "\u1D49",
  f: "\u1DA0", g: "\u1D4D", h: "\u02B0", i: "\u2071", j: "\u02B2",
  k: "\u1D4F", l: "\u02E1", m: "\u1D50", n: "\u207F", o: "\u1D52",
  p: "\u1D56", r: "\u02B3", s: "\u02E2", t: "\u1D57", u: "\u1D58",
  v: "\u1D5B", w: "\u02B7", x: "\u02E3", y: "\u02B8", z: "\u1DBB",
  "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3",
  "4": "\u2074", "5": "\u2075", "6": "\u2076", "7": "\u2077",
  "8": "\u2078", "9": "\u2079",
  "+": "\u207A", "-": "\u207B", "=": "\u207C", "(": "\u207D", ")": "\u207E",
};

const NO_SUPERSCRIPT = ["q"];

function toSuperscript(text: string): string {
  let result = "";
  for (const ch of text) {
    const lower = ch.toLowerCase();
    if (SUPERSCRIPT_MAP[lower]) {
      result += SUPERSCRIPT_MAP[lower];
    } else {
      result += ch; // pass through (including q)
    }
  }
  return result;
}

export function SuperscriptGeneratorTool() {
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

  const output = toSuperscript(input);

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
    setInput("Hello World 123 (a+b)=c");
  };

  const stats = {
    inputChars: input.length,
    outputChars: [...output].length,
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
          <label htmlFor="superscript-input" className="text-sm font-semibold block mb-2">
            Input Text
          </label>
          <textarea
            id="superscript-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here to generate superscript..."
            className={cx(
              "w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
              inputBase
            )}
            style={{ minHeight: "280px" }}
          />
          <div className={cx("mt-2 text-xs", muted)}>
            {stats.inputChars} character{stats.inputChars !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Output */}
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Superscript Output</h3>
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
              "w-full rounded-lg border px-3 py-2 text-sm whitespace-pre-wrap break-words overflow-auto",
              inputBase
            )}
            style={{ minHeight: "280px" }}
          >
            {output || (
              <span className={cx("text-sm", muted)}>
                Superscript text appears here as you type...
              </span>
            )}
          </div>
          <div className={cx("mt-2 text-xs", muted)}>
            {stats.outputChars} character{stats.outputChars !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Note about unsupported characters */}
      <div className={cx("rounded-xl border p-3 text-xs", base)}>
        <span className="font-semibold">Note:</span> The letter &quot;q&quot; has no standard Unicode
        superscript equivalent and will pass through unchanged. All other lowercase letters, digits 0-9,
        and symbols + - = ( ) are converted.
      </div>
    </div>
  );
}
