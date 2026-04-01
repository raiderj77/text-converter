"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_bold_italic_text_generator";

/**
 * Map A-Z to Mathematical Bold Italic Uppercase (U+1D468–U+1D481)
 * Map a-z to Mathematical Bold Italic Lowercase (U+1D482–U+1D49B)
 * All other characters pass through unchanged.
 */
function toBoldItalic(text: string): string {
  let result = "";
  for (const char of text) {
    const code = char.codePointAt(0)!;
    if (code >= 65 && code <= 90) {
      // A-Z → U+1D468 to U+1D481
      result += String.fromCodePoint(0x1d468 + (code - 65));
    } else if (code >= 97 && code <= 122) {
      // a-z → U+1D482 to U+1D49B
      result += String.fromCodePoint(0x1d482 + (code - 97));
    } else {
      result += char;
    }
  }
  return result;
}

export function BoldItalicTextGeneratorTool() {
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

  const output = toBoldItalic(input);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [output]);

  const clearAll = () => {
    setInput("");
  };

  const handleExample = () => {
    setInput("The quick brown fox jumps over the lazy dog");
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
            Your Text
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
            {input.length} character{input.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Output */}
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Bold Italic Output</h3>
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
              "w-full rounded-lg border px-3 py-2 text-sm whitespace-pre-wrap break-words overflow-auto",
              inputBase
            )}
            style={{ minHeight: "280px" }}
          >
            {output || (
              <span className={cx("text-sm", muted)}>
                Bold italic text appears here as you type...
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
