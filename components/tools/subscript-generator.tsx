"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_subscript_generator";

/* ── Unicode Subscript Mappings ── */

const SUBSCRIPT_MAP: Record<string, string> = {
  a: "\u2090", e: "\u2091", h: "\u2095", i: "\u1D62", j: "\u2C7C",
  k: "\u2096", l: "\u2097", m: "\u2098", n: "\u2099", o: "\u2092",
  p: "\u209A", r: "\u1D63", s: "\u209B", t: "\u209C", u: "\u1D64",
  v: "\u1D65", x: "\u2093",
  "0": "\u2080", "1": "\u2081", "2": "\u2082", "3": "\u2083",
  "4": "\u2084", "5": "\u2085", "6": "\u2086", "7": "\u2087",
  "8": "\u2088", "9": "\u2089",
  "+": "\u208A", "-": "\u208B", "=": "\u208C", "(": "\u208D", ")": "\u208E",
};

const NO_SUBSCRIPT = ["b", "c", "d", "f", "g", "q", "w", "y", "z"];

function toSubscript(text: string): string {
  let result = "";
  for (const ch of text) {
    const lower = ch.toLowerCase();
    if (SUBSCRIPT_MAP[lower]) {
      result += SUBSCRIPT_MAP[lower];
    } else {
      result += ch; // pass through
    }
  }
  return result;
}

export function SubscriptGeneratorTool() {
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

  const output = toSubscript(input);

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
    setInput("H2O + CO2 = H2CO3");
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
          <label htmlFor="subscript-input" className="text-sm font-semibold block mb-2">
            Input Text
          </label>
          <textarea
            id="subscript-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here to generate subscript..."
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
            <h3 className="text-sm font-semibold">Subscript Output</h3>
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
                Subscript text appears here as you type...
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
        <span className="font-semibold">Note:</span> The letters{" "}
        <strong>{NO_SUBSCRIPT.join(", ")}</strong> have no standard Unicode subscript
        equivalent and will pass through unchanged. Available letters: a, e, h, i, j, k, l, m, n, o,
        p, r, s, t, u, v, x. All digits 0-9 and symbols + - = ( ) are fully supported.
      </div>
    </div>
  );
}
