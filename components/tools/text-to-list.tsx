"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type SplitMode = "line" | "sentence" | "comma" | "custom";
type OutputFormat = "bullet" | "numbered" | "html-ul" | "md-unordered" | "md-ordered";

function splitText(text: string, mode: SplitMode, customDelimiter: string): string[] {
  if (!text.trim()) return [];
  let items: string[];
  switch (mode) {
    case "line":
      items = text.split(/\r?\n/);
      break;
    case "sentence":
      items = text.split(/(?<=[.!?])\s+/);
      break;
    case "comma":
      items = text.split(",");
      break;
    case "custom":
      if (!customDelimiter) return [text];
      items = text.split(customDelimiter);
      break;
    default:
      items = [text];
  }
  return items.map((s) => s.trim()).filter(Boolean);
}

function formatList(items: string[], format: OutputFormat): string {
  switch (format) {
    case "bullet":
      return items.map((item) => `• ${item}`).join("\n");
    case "numbered":
      return items.map((item, i) => `${i + 1}. ${item}`).join("\n");
    case "html-ul":
      return `<ul>\n${items.map((item) => `  <li>${item}</li>`).join("\n")}\n</ul>`;
    case "md-unordered":
      return items.map((item) => `- ${item}`).join("\n");
    case "md-ordered":
      return items.map((item, i) => `${i + 1}. ${item}`).join("\n");
    default:
      return items.join("\n");
  }
}

export function TextToListTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [splitMode, setSplitMode] = useState<SplitMode>("line");
  const [customDelimiter, setCustomDelimiter] = useState("|");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("bullet");
  const [toast, setToast] = useState("");

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark
    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Persist input
  useEffect(() => {
    const saved = localStorage.getItem("fmc_text_to_list_text");
    if (saved) setText(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("fmc_text_to_list_text", text);
  }, [text]);

  const items = useMemo(
    () => splitText(text, splitMode, customDelimiter),
    [text, splitMode, customDelimiter]
  );

  const output = useMemo(
    () => formatList(items, outputFormat),
    [items, outputFormat]
  );

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1200);
  }, []);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(
      () => showToast("Copied!"),
      () => showToast("Copy failed")
    );
  }, [output, showToast]);

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  const splitOptions: { value: SplitMode; label: string }[] = [
    { value: "line", label: "By Line" },
    { value: "sentence", label: "By Sentence" },
    { value: "comma", label: "By Comma" },
    { value: "custom", label: "Custom" },
  ];

  const formatOptions: { value: OutputFormat; label: string }[] = [
    { value: "bullet", label: "Bullet (•)" },
    { value: "numbered", label: "Numbered" },
    { value: "html-ul", label: "HTML ul/li" },
    { value: "md-unordered", label: "Markdown -" },
    { value: "md-ordered", label: "Markdown 1." },
  ];

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Input Text</label>
          <span className={cx("text-xs tabular-nums", muted)}>
            {text.length.toLocaleString()} char{text.length !== 1 ? "s" : ""}
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder="Paste or type text to convert into a list..."
          className={cx(
            "w-full resize-y rounded-lg border px-3 py-2 text-sm leading-6 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
        />
      </div>

      {/* Split mode */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label className="text-sm font-semibold block mb-2">Split By</label>
        <div className="flex flex-wrap gap-2">
          {splitOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSplitMode(opt.value)}
              className={cx(
                "rounded-xl border px-3 min-h-[44px] text-sm transition-colors",
                splitMode === opt.value ? btnActive : btnBase
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {splitMode === "custom" && (
          <div className="mt-3">
            <label className="text-xs block mb-1">Custom Delimiter</label>
            <input
              type="text"
              value={customDelimiter}
              onChange={(e) => setCustomDelimiter(e.target.value)}
              placeholder="e.g. | or ; or ::"
              className={cx(
                "w-full max-w-xs rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                inputBase
              )}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>

      {/* Output format */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label className="text-sm font-semibold block mb-2">Output Format</label>
        <div className="flex flex-wrap gap-2">
          {formatOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setOutputFormat(opt.value)}
              className={cx(
                "rounded-xl border px-3 min-h-[44px] text-sm transition-colors",
                outputFormat === opt.value ? btnActive : btnBase
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm font-semibold transition-colors",
            output
              ? isDark
                ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300"
                : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
              : "opacity-40 cursor-not-allowed border-white/5"
          )}
        >
          Copy Output
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm transition-colors",
            btnBase
          )}
        >
          Clear
        </button>
      </div>

      {/* Output */}
      {items.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">
              Output — {items.length} item{items.length !== 1 ? "s" : ""}
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className={cx(
                "rounded-md border px-2 py-0.5 text-xs transition-colors",
                btnBase
              )}
            >
              Copy
            </button>
          </div>
          <div
            aria-live="polite"
            className={cx(
              "rounded-lg border p-3 font-mono text-sm whitespace-pre-wrap break-words leading-relaxed max-h-[400px] overflow-y-auto",
              inputBase
            )}
          >
            {output || "\u00A0"}
          </div>
        </div>
      )}

      {text && items.length === 0 && (
        <div
          aria-live="polite"
          className={cx("text-sm text-center py-4", muted)}
        >
          No items found with the current split mode.
        </div>
      )}

      <div className={cx("text-xs text-center", muted)}>
        Split by line, sentence, comma, or custom delimiter · All processing in
        your browser · Ctrl/⌘ + L toggles theme
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
