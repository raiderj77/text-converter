"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Main Component ──────────────────────────────────────────── */
export function RemoveEmptyLinesTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [stripWhitespaceOnly, setStripWhitespaceOnly] = useState(true);
  const [copied, setCopied] = useState("");

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const { output, removedCount } = useMemo(() => {
    if (!input) return { output: "", removedCount: 0 };

    const lines = input.replace(/\r\n/g, "\n").split("\n");
    const filtered = lines.filter((line) => {
      if (stripWhitespaceOnly) {
        return line.trim().length > 0;
      }
      return line.length > 0;
    });

    return {
      output: filtered.join("\n"),
      removedCount: lines.length - filtered.length,
    };
  }, [input, stripWhitespaceOnly]);

  const inputLineCount = input ? input.split(/\r?\n/).length : 0;
  const outputLineCount = output ? output.split("\n").length : 0;

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const handleExample = () => {
    setInput(`First line of text

Second line of text

Third line of text


Fourth line of text

Fifth line of text

Sixth line of text`);
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
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={stripWhitespaceOnly}
              onChange={(e) => setStripWhitespaceOnly(e.target.checked)}
              className="rounded border-white/10 bg-neutral-800"
            />
            <span className="text-sm">Also remove whitespace-only lines</span>
          </label>
        </div>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="remove-empty-input" className="text-sm font-semibold block mb-2">
          Input Text
        </label>
        <textarea
          id="remove-empty-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text with empty lines here..."
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
                ({removedCount} empty line{removedCount !== 1 ? "s" : ""} removed)
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
          <pre className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono overflow-x-auto whitespace-pre", inputBase)}>
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
