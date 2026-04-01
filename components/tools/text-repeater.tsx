"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type SeparatorType = "newline" | "space" | "comma" | "tab" | "custom";

const SEPARATOR_OPTIONS: { value: SeparatorType; label: string }[] = [
  { value: "newline", label: "New Line" },
  { value: "space", label: "Space" },
  { value: "comma", label: "Comma" },
  { value: "tab", label: "Tab" },
  { value: "custom", label: "Custom" },
];

function getSeparator(type: SeparatorType, custom: string): string {
  switch (type) {
    case "newline":
      return "\n";
    case "space":
      return " ";
    case "comma":
      return ", ";
    case "tab":
      return "\t";
    case "custom":
      return custom;
  }
}

function repeatText(
  text: string,
  count: number,
  separator: string,
  numbered: boolean
): string {
  if (!text || count <= 0) return "";
  const lines: string[] = [];
  for (let i = 1; i <= count; i++) {
    lines.push(numbered ? `${i}. ${text}` : text);
  }
  return lines.join(separator);
}

const STORAGE_KEY = "fmc_text_repeater";

export function TextRepeaterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [count, setCount] = useState(5);
  const [separatorType, setSeparatorType] = useState<SeparatorType>("newline");
  const [customSeparator, setCustomSeparator] = useState(" | ");
  const [numbered, setNumbered] = useState(false);
  const [toast, setToast] = useState("");

  // Persist input to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.input) setInput(parsed.input);
        if (parsed.count) setCount(parsed.count);
        if (parsed.separatorType) setSeparatorType(parsed.separatorType);
        if (parsed.customSeparator !== undefined) setCustomSeparator(parsed.customSeparator);
        if (parsed.numbered !== undefined) setNumbered(parsed.numbered);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ input, count, separatorType, customSeparator, numbered })
      );
    } catch {
      // ignore
    }
  }, [input, count, separatorType, customSeparator, numbered]);

  const separator = getSeparator(separatorType, customSeparator);
  const fullOutput = useMemo(
    () => repeatText(input, count, separator, numbered),
    [input, count, separator, numbered]
  );
  const previewOutput = useMemo(
    () => repeatText(input, Math.min(count, 10), separator, numbered),
    [input, count, separator, numbered]
  );
  const isPreview = count > 10;

  const copyOutput = useCallback(async () => {
    if (!fullOutput) return;
    try {
      await navigator.clipboard.writeText(fullOutput);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }
    setTimeout(() => setToast(""), 1200);
  }, [fullOutput]);

  const clearAll = useCallback(() => {
    setInput("");
    setCount(5);
    setSeparatorType("newline");
    setCustomSeparator(" | ");
    setNumbered(false);
  }, []);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const btnActive = isDark
    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark
    ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500"
    : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="repeater-input" className="text-sm font-semibold block mb-2">
          Text to Repeat
        </label>
        <textarea
          id="repeater-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to repeat..."
          rows={3}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y",
            inputBase
          )}
        />
      </div>

      {/* Controls */}
      <div className={cx("rounded-xl border p-4 space-y-4", base)}>
        {/* Repetition count */}
        <div>
          <label htmlFor="repeat-count" className="text-sm font-semibold block mb-2">
            Repetitions
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="flex-1"
            />
            <input
              id="repeat-count"
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                if (!isNaN(v) && v >= 1 && v <= 1000) setCount(v);
              }}
              className={cx(
                "w-24 rounded-lg border px-3 py-2 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]",
                inputBase
              )}
            />
          </div>
        </div>

        {/* Separator options */}
        <div>
          <div className={cx("text-xs uppercase tracking-wide mb-2", isDark ? "text-neutral-400" : "text-neutral-500")}>
            Separator
          </div>
          <div className="flex flex-wrap gap-2">
            {SEPARATOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSeparatorType(opt.value)}
                className={cx(
                  "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
                  separatorType === opt.value ? btnActive : btnBase
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {separatorType === "custom" && (
            <div className="mt-2">
              <input
                type="text"
                value={customSeparator}
                onChange={(e) => setCustomSeparator(e.target.value)}
                placeholder="Enter custom separator..."
                className={cx(
                  "w-full max-w-xs rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]",
                  inputBase
                )}
              />
            </div>
          )}
        </div>

        {/* Number toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setNumbered(!numbered)}
            className={cx(
              "w-5 h-5 rounded border flex items-center justify-center text-xs shrink-0",
              numbered
                ? "bg-emerald-500 border-emerald-500 text-white"
                : isDark
                  ? "border-white/20"
                  : "border-black/20"
            )}
          >
            {numbered ? "\u2713" : ""}
          </button>
          <div className={cx("text-sm", isDark ? "text-neutral-200" : "text-neutral-700")}>
            Number each repetition (1. 2. 3. ...)
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyOutput}
            disabled={!fullOutput}
            className={cx(
              "rounded-lg border px-5 py-2 text-sm font-semibold transition-colors min-h-[44px]",
              fullOutput ? btnPrimary : cx(btnBase, "opacity-50 cursor-not-allowed")
            )}
          >
            Copy Output
          </button>
          <button
            type="button"
            onClick={clearAll}
            className={cx("rounded-lg border px-4 py-2 text-sm transition-colors min-h-[44px]", btnBase)}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={cx("flex items-center gap-4 px-1", muted)}>
        <span className="text-xs">{count} repetition{count !== 1 ? "s" : ""}</span>
        <span className="text-xs">{fullOutput.length.toLocaleString()} characters</span>
        {isPreview && <span className="text-xs">Showing first 10 in preview</span>}
      </div>

      {/* Output */}
      {input && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">
              {isPreview ? "Preview (first 10)" : "Output"}
            </h3>
            <button
              type="button"
              onClick={copyOutput}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              {toast === "Copied!" ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div
            className={cx(
              "whitespace-pre-wrap text-sm leading-7 font-mono rounded-lg border p-3 max-h-96 overflow-y-auto",
              isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
            )}
          >
            {isPreview ? previewOutput : fullOutput}
          </div>
          {isPreview && (
            <p className={cx("mt-2 text-xs", muted)}>
              ... and {count - 10} more repetition{count - 10 !== 1 ? "s" : ""}. Click &quot;Copy All&quot; to get the full output.
            </p>
          )}
        </div>
      )}

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
