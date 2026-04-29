"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Types ───────────────────────────────────────────────────── */
type Separator = "period" | "paren" | "tab" | "colon";
type Mode = "add" | "remove";

/* ─── Helpers ─────────────────────────────────────────────────── */
function addLineNumbers(
  text: string,
  startNumber: number,
  separator: Separator,
  zeroPad: boolean,
): string {
  if (!text) return "";

  const lines = text.split("\n");
  const endNumber = startNumber + lines.length - 1;
  const padLength = zeroPad ? String(endNumber).length : 0;

  const separatorMap: Record<Separator, string> = {
    period: ". ",
    paren: ") ",
    tab: "\t",
    colon: ": ",
  };
  const sep = separatorMap[separator];

  return lines
    .map((line, i) => {
      const num = startNumber + i;
      const numStr = zeroPad ? String(num).padStart(padLength, "0") : String(num);
      return `${numStr}${sep}${line}`;
    })
    .join("\n");
}

function removeLineNumbers(text: string): string {
  if (!text) return "";

  return text
    .split("\n")
    .map((line) => {
      // Match patterns like: "1. ", "01) ", "123: ", "5\t", etc.
      return line.replace(/^\s*\d+[.):\t]\s?/, "");
    })
    .join("\n");
}

/* ─── Main Component ──────────────────────────────────────────── */
export function AddLineNumbersTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("add");
  const [startNumber, setStartNumber] = useState(1);
  const [separator, setSeparator] = useState<Separator>("period");
  const [zeroPad, setZeroPad] = useState(false);
  const [copied, setCopied] = useState("");

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const output = useMemo(() => {
    if (!input) return "";
    if (mode === "remove") return removeLineNumbers(input);
    return addLineNumbers(input, startNumber, separator, zeroPad);
  }, [input, mode, startNumber, separator, zeroPad]);

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const handleExample = () => {
    if (mode === "remove") {
      setInput(`1. First line of text
2. Second line of text
3. Third line of text
4. Fourth line of text
5. Fifth line of text`);
    } else {
      setInput(`First line of text
Second line of text
Third line of text
Fourth line of text
Fifth line of text
Sixth line of text
Seventh line of text
Eighth line of text
Ninth line of text
Tenth line of text`);
    }
  };

  const lineCount = input ? input.split("\n").length : 0;

  return (
    <div className="space-y-4">
      {/* Mode toggle + actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode("add")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            mode === "add" ? btnActive : btnBase,
          )}
        >
          Add Line Numbers
        </button>
        <button
          onClick={() => setMode("remove")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            mode === "remove" ? btnActive : btnBase,
          )}
        >
          Remove Line Numbers
        </button>
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

      {/* Options (only in add mode) */}
      {mode === "add" && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label htmlFor="start-number" className={cx("text-xs font-medium", muted)}>
                Starting Number
              </label>
              <input
                id="start-number"
                type="number"
                min={0}
                value={startNumber}
                onChange={(e) => setStartNumber(Math.max(0, parseInt(e.target.value) || 0))}
                className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="separator" className={cx("text-xs font-medium", muted)}>
                Separator
              </label>
              <select
                id="separator"
                value={separator}
                onChange={(e) => setSeparator(e.target.value as Separator)}
                className={cx("w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
              >
                <option value="period">Period (1. )</option>
                <option value="paren">Parenthesis (1) )</option>
                <option value="tab">Tab</option>
                <option value="colon">Colon (1: )</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                <input
                  type="checkbox"
                  checked={zeroPad}
                  onChange={(e) => setZeroPad(e.target.checked)}
                  className="rounded border-white/10 bg-neutral-800"
                />
                <span className="text-sm">Zero padding (01, 02...)</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="line-numbers-input" className="text-sm font-semibold block mb-2">
          {mode === "add" ? "Input Text" : "Numbered Text to Strip"}
        </label>
        <textarea
          id="line-numbers-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "add"
              ? "Paste your text here to add line numbers..."
              : "Paste numbered text here to remove line numbers..."
          }
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {lineCount} line{lineCount !== 1 ? "s" : ""} · {input.length} character{input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              {mode === "add" ? "Numbered Output" : "Numbers Removed"}
            </h3>
            <button
              onClick={() => copyText(output, "output")}
              className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied === "output" ? "Copied!" : "Copy"}
            </button>
          </div>
          <output aria-live="polite" className={cx("block w-full rounded-lg border px-3 py-2 text-sm font-mono overflow-x-auto whitespace-pre", inputBase)}>
            {output}
          </output>
          <div className={cx("mt-2 text-xs", muted)}>
            {output.split("\n").length} line{output.split("\n").length !== 1 ? "s" : ""} · {output.length} character{output.length !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
