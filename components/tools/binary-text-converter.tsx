"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Direction = "text-to-bin" | "bin-to-text";
type BitMode = "7" | "8";

function textToBinary(text: string, bitMode: BitMode, spaceSeparated: boolean): string {
  if (!text) return "";
  const bits = parseInt(bitMode);
  return Array.from(text)
    .map((char) => {
      const code = char.codePointAt(0) ?? 0;
      return code.toString(2).padStart(bits, "0");
    })
    .join(spaceSeparated ? " " : "");
}

function binaryToText(binary: string): string {
  if (!binary.trim()) return "";
  // Remove all spaces, then split into 8-bit (or 7-bit) chunks
  const cleaned = binary.replace(/\s+/g, "");
  if (!/^[01]+$/.test(cleaned)) return "";
  // Try to detect chunk size: if length divisible by 8, use 8; if by 7, use 7
  const chunkSize = cleaned.length % 8 === 0 ? 8 : cleaned.length % 7 === 0 ? 7 : 8;
  const chars: string[] = [];
  for (let i = 0; i < cleaned.length; i += chunkSize) {
    const chunk = cleaned.slice(i, i + chunkSize);
    if (chunk.length === chunkSize) {
      chars.push(String.fromCharCode(parseInt(chunk, 2)));
    }
  }
  return chars.join("");
}

function getCharBreakdown(text: string, bitMode: BitMode): Array<{ char: string; decimal: number; binary: string }> {
  return Array.from(text).map((char) => {
    const code = char.codePointAt(0) ?? 0;
    return {
      char,
      decimal: code,
      binary: code.toString(2).padStart(parseInt(bitMode), "0"),
    };
  });
}

function isValidBinary(value: string): boolean {
  if (!value.trim()) return true;
  return /^[01\s]+$/.test(value);
}

export function BinaryTextConverterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("text-to-bin");
  const [bitMode, setBitMode] = useState<BitMode>("8");
  const [spaceSeparated, setSpaceSeparated] = useState(true);
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const output =
    direction === "text-to-bin"
      ? textToBinary(input, bitMode, spaceSeparated)
      : binaryToText(input);

  const breakdown =
    direction === "text-to-bin" && input ? getCharBreakdown(input, bitMode) : [];

  const isValid = direction === "bin-to-text" ? isValidBinary(input) : true;

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
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setDirection("text-to-bin"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "text-to-bin" ? btnActive : btnBase)}
        >
          Text to Binary
        </button>
        <button
          onClick={() => { setDirection("bin-to-text"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "bin-to-text" ? btnActive : btnBase)}
        >
          Binary to Text
        </button>
        {direction === "text-to-bin" && (
          <>
            <button
              onClick={() => setBitMode(bitMode === "8" ? "7" : "8")}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", bitMode === "8" ? btnActive : btnBase)}
            >
              {bitMode}-bit
            </button>
            <button
              onClick={() => setSpaceSeparated(!spaceSeparated)}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", spaceSeparated ? btnActive : btnBase)}
            >
              {spaceSeparated ? "Space-separated" : "Continuous"}
            </button>
          </>
        )}
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="binary-input" className="text-sm font-semibold">
          {direction === "text-to-bin" ? "Enter Text" : "Enter Binary"}
        </label>
        <textarea
          id="binary-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            direction === "text-to-bin"
              ? "e.g. Hello World"
              : "e.g. 01001000 01100101 01101100 01101100 01101111"
          }
          rows={4}
          className={cx(
            "mt-2 w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] resize-y",
            inputBase,
            !isValid && "ring-2 ring-red-500/50"
          )}
          spellCheck={false}
          autoComplete="off"
        />
        <div className="flex items-center justify-between mt-2">
          <span className={cx("text-xs", muted)}>
            {input.length} character{input.length !== 1 ? "s" : ""}
          </span>
          {!isValid && (
            <span className="text-xs text-red-400">
              Invalid binary input (only 0, 1, and spaces allowed)
            </span>
          )}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              {direction === "text-to-bin" ? "Binary Output" : "Text Output"}
            </h3>
            <button
              onClick={() => copyText(output, "output")}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied === "output" ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="font-mono text-sm break-all leading-relaxed select-all whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}

      {/* Per-character breakdown table */}
      {breakdown.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Per-Character Breakdown</h3>
            <button
              onClick={() => copyText(breakdown.map((c) => c.binary).join(" "), "all-bin")}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              {copied === "all-bin" ? "Copied!" : "Copy All Binary"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className={cx("border-b", isDark ? "border-white/10" : "border-black/10")}>
                  <th className="text-left py-2 px-2 font-semibold">Char</th>
                  <th className="text-left py-2 px-2 font-semibold">Decimal</th>
                  <th className="text-left py-2 px-2 font-semibold">Binary</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((c, i) => (
                  <tr key={i} className={cx("border-b", isDark ? "border-white/5" : "border-black/5")}>
                    <td className="py-1.5 px-2 text-sm">{c.char === " " ? "\u2423" : c.char}</td>
                    <td className="py-1.5 px-2">{c.decimal}</td>
                    <td className={cx("py-1.5 px-2", accent)}>{c.binary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
