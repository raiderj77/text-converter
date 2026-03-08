"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_bold_text_generator";

/* ── Unicode Bold Mappings ── */

function toMathBold(text: string): string {
  let result = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code >= 0x41 && code <= 0x5a) {
      // A-Z → U+1D400–U+1D419
      result += String.fromCodePoint(0x1d400 + (code - 0x41));
    } else if (code >= 0x61 && code <= 0x7a) {
      // a-z → U+1D41A–U+1D433
      result += String.fromCodePoint(0x1d41a + (code - 0x61));
    } else if (code >= 0x30 && code <= 0x39) {
      // 0-9 → U+1D7CE–U+1D7D7
      result += String.fromCodePoint(0x1d7ce + (code - 0x30));
    } else {
      result += ch;
    }
  }
  return result;
}

function toSansBold(text: string): string {
  let result = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code >= 0x41 && code <= 0x5a) {
      // A-Z → U+1D5D4–U+1D5ED
      result += String.fromCodePoint(0x1d5d4 + (code - 0x41));
    } else if (code >= 0x61 && code <= 0x7a) {
      // a-z → U+1D5EE–U+1D607
      result += String.fromCodePoint(0x1d5ee + (code - 0x61));
    } else if (code >= 0x30 && code <= 0x39) {
      // 0-9 → U+1D7EC–U+1D7F5
      result += String.fromCodePoint(0x1d7ec + (code - 0x30));
    } else {
      result += ch;
    }
  }
  return result;
}

export function BoldTextGeneratorTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [copiedSerif, setCopiedSerif] = useState(false);
  const [copiedSans, setCopiedSans] = useState(false);

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

  const serifBold = toMathBold(input);
  const sansBold = toSansBold(input);

  const copySerif = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(serifBold);
      setCopiedSerif(true);
      setTimeout(() => setCopiedSerif(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [serifBold]);

  const copySans = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sansBold);
      setCopiedSans(true);
      setTimeout(() => setCopiedSans(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [sansBold]);

  const clearAll = () => setInput("");

  const handleExample = () => {
    setInput("Hello World! Bold text is awesome 123");
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="bold-input" className="text-sm font-semibold block mb-2">
          Enter Your Text
        </label>
        <textarea
          id="bold-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text here to generate bold Unicode..."
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
          style={{ minHeight: "120px" }}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {input.length} character{input.length !== 1 ? "s" : ""}
        </div>
      </div>

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
      </div>

      {/* Output panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Serif Bold */}
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Bold (Serif)</h3>
            {serifBold && (
              <button
                type="button"
                onClick={copySerif}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {copiedSerif ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div
            aria-live="polite"
            className={cx(
              "w-full rounded-lg border px-3 py-2 text-sm whitespace-pre-wrap break-words overflow-auto",
              inputBase
            )}
            style={{ minHeight: "100px" }}
          >
            {serifBold || (
              <span className={cx("text-sm", muted)}>
                Bold serif output appears here...
              </span>
            )}
          </div>
          <div className={cx("mt-2 text-xs", muted)}>
            Mathematical Bold &middot; Works on social media, bios &amp; more
          </div>
        </div>

        {/* Sans-Serif Bold */}
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Bold (Sans-Serif)</h3>
            {sansBold && (
              <button
                type="button"
                onClick={copySans}
                className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {copiedSans ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div
            aria-live="polite"
            className={cx(
              "w-full rounded-lg border px-3 py-2 text-sm whitespace-pre-wrap break-words overflow-auto",
              inputBase
            )}
            style={{ minHeight: "100px" }}
          >
            {sansBold || (
              <span className={cx("text-sm", muted)}>
                Bold sans-serif output appears here...
              </span>
            )}
          </div>
          <div className={cx("mt-2 text-xs", muted)}>
            Sans-Serif Bold &middot; Cleaner look for modern platforms
          </div>
        </div>
      </div>
    </div>
  );
}
