"use client";

import { useState, useEffect, useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const STORAGE_KEY = "fmc_bubble_text_generator";

/* ── Unicode Circled Letter Mappings ── */

function toCircledEmpty(text: string): string {
  let result = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code >= 0x41 && code <= 0x5a) {
      // A-Z → Ⓐ-Ⓩ (U+24B6–U+24CF)
      result += String.fromCodePoint(0x24b6 + (code - 0x41));
    } else if (code >= 0x61 && code <= 0x7a) {
      // a-z → ⓐ-ⓩ (U+24D0–U+24E9)
      result += String.fromCodePoint(0x24d0 + (code - 0x61));
    } else if (code === 0x30) {
      // 0 → ⓪ (U+24EA)
      result += String.fromCodePoint(0x24ea);
    } else if (code >= 0x31 && code <= 0x39) {
      // 1-9 → ①-⑨ (U+2460–U+2468)
      result += String.fromCodePoint(0x2460 + (code - 0x31));
    } else {
      result += ch;
    }
  }
  return result;
}

function toCircledFilled(text: string): string {
  let result = "";
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    if (code >= 0x41 && code <= 0x5a) {
      // A-Z → 🅐-🅩 (U+1F150–U+1F169)
      result += String.fromCodePoint(0x1f150 + (code - 0x41));
    } else if (code >= 0x61 && code <= 0x7a) {
      // a-z → use uppercase filled (U+1F150–U+1F169)
      result += String.fromCodePoint(0x1f150 + (code - 0x61));
    } else if (code === 0x30) {
      // 0 → ⓪ (U+24EA) - no filled variant, use empty
      result += String.fromCodePoint(0x24ea);
    } else if (code >= 0x31 && code <= 0x39) {
      // 1-9 → ①-⑨ - no filled variant for digits, use empty
      result += String.fromCodePoint(0x2460 + (code - 0x31));
    } else {
      result += ch;
    }
  }
  return result;
}

export function BubbleTextGeneratorTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [filled, setFilled] = useState(false);
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
  const activeBtn = isDark
    ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white"
    : "bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white";

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.input) setInput(parsed.input);
        if (typeof parsed.filled === "boolean") setFilled(parsed.filled);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ input, filled }));
    } catch {
      // ignore
    }
  }, [input, filled]);

  const output = filled ? toCircledFilled(input) : toCircledEmpty(input);

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
    setInput("Bubble Text 123");
  };

  const stats = {
    inputChars: input.length,
    outputChars: [...output].length,
  };

  return (
    <div className="space-y-4">
      {/* Style toggle + action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilled(false)}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            !filled ? activeBtn : btnBase
          )}
        >
          Empty Circles (Ⓐⓑⓒ)
        </button>
        <button
          type="button"
          onClick={() => setFilled(true)}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            filled ? activeBtn : btnBase
          )}
        >
          Filled Circles ({"\uD83C\uDD50\uD83C\uDD51\uD83C\uDD52"})
        </button>
        <div className="w-px bg-white/10" />
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
          <label htmlFor="bubble-input" className="text-sm font-semibold block mb-2">
            Input Text
          </label>
          <textarea
            id="bubble-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text here to generate bubble text..."
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
            <h3 className="text-sm font-semibold">
              {filled ? "Filled Bubble Output" : "Bubble Output"}
            </h3>
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
                Bubble text appears here as you type...
              </span>
            )}
          </div>
          <div className={cx("mt-2 text-xs", muted)}>
            {stats.outputChars} character{stats.outputChars !== 1 ? "s" : ""} &middot;{" "}
            {filled ? "Filled/negative circled" : "Empty/outlined circled"}
          </div>
        </div>
      </div>
    </div>
  );
}
