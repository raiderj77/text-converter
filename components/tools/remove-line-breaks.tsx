"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Types ───────────────────────────────────────────────────── */
type JoinMode = "spaces" | "commas" | "custom";

/* ─── Main Component ──────────────────────────────────────────── */
export function RemoveLineBreaksTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [joinMode, setJoinMode] = useState<JoinMode>("spaces");
  const [customSeparator, setCustomSeparator] = useState("; ");
  const [preserveParagraphs, setPreserveParagraphs] = useState(false);
  const [copied, setCopied] = useState("");

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const separator = useMemo(() => {
    if (joinMode === "spaces") return " ";
    if (joinMode === "commas") return ", ";
    return customSeparator;
  }, [joinMode, customSeparator]);

  const output = useMemo(() => {
    if (!input) return "";

    if (preserveParagraphs) {
      // Double line breaks → paragraph marker, single → separator
      return input
        .replace(/\r\n/g, "\n")
        .replace(/\n{2,}/g, "\n\n") // normalize multiple breaks to double
        .split("\n\n")
        .map((paragraph) => paragraph.replace(/\n/g, separator).trim())
        .filter(Boolean)
        .join("\n");
    }

    return input
      .replace(/\r\n/g, "\n")
      .replace(/\n+/g, separator)
      .trim();
  }, [input, separator, preserveParagraphs]);

  const inputLineCount = input ? input.split(/\r?\n/).length : 0;
  const outputLineCount = output ? output.split("\n").length : 0;

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const handleExample = () => {
    setInput(`This is the first line
of a paragraph that got
broken up by line breaks.

This is another paragraph
that should stay separate
from the first one.

And here is a third
paragraph for testing.`);
  };

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleExample}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Load Example
        </button>
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Options */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className={cx("text-xs font-medium", muted)}>Replace line breaks with</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {(["spaces", "commas", "custom"] as JoinMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setJoinMode(mode)}
                  className={cx(
                    "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px] capitalize",
                    joinMode === mode ? btnActive : btnBase,
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {joinMode === "custom" && (
            <div className="space-y-1">
              <label htmlFor="custom-separator" className={cx("text-xs font-medium", muted)}>
                Custom Separator
              </label>
              <input
                id="custom-separator"
                type="text"
                value={customSeparator}
                onChange={(e) => setCustomSeparator(e.target.value)}
                className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
                placeholder="; "
              />
            </div>
          )}

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={preserveParagraphs}
                onChange={(e) => setPreserveParagraphs(e.target.checked)}
                className="rounded border-white/10 bg-neutral-800"
              />
              <span className="text-sm">Preserve paragraph breaks</span>
            </label>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="remove-breaks-input" className="text-sm font-semibold block mb-2">
          Input Text
        </label>
        <textarea
          id="remove-breaks-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text with line breaks here..."
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {inputLineCount} line{inputLineCount !== 1 ? "s" : ""} · {input.length} character{input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              Result — {outputLineCount} line{outputLineCount !== 1 ? "s" : ""}{" "}
              <span className={cx("font-normal", muted)}>
                (removed {inputLineCount - outputLineCount} line break{inputLineCount - outputLineCount !== 1 ? "s" : ""})
              </span>
            </h3>
            <button
              onClick={() => copyText(output, "output")}
              className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied === "output" ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono overflow-x-auto whitespace-pre-wrap", inputBase)}>
            {output}
          </pre>
          <div className={cx("mt-2 text-xs", muted)}>
            {output.length} character{output.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
