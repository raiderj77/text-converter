"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Direction = "text-to-hex" | "hex-to-text";

function textToHex(text: string, prefix: boolean, spaceSeparated: boolean): string {
  if (!text) return "";
  return Array.from(text)
    .map((char) => {
      const code = char.codePointAt(0) ?? 0;
      const hex = code.toString(16).toUpperCase().padStart(2, "0");
      return prefix ? `0x${hex}` : hex;
    })
    .join(spaceSeparated ? " " : "");
}

function hexToText(hex: string): string {
  if (!hex.trim()) return "";
  // Remove 0x prefixes, then clean whitespace
  const cleaned = hex.replace(/0x/gi, " ").trim();
  if (!cleaned) return "";
  // Split by spaces or parse continuous pairs
  const parts = cleaned.includes(" ")
    ? cleaned.split(/\s+/)
    : cleaned.match(/.{1,2}/g) || [];
  const chars: string[] = [];
  for (const part of parts) {
    if (!/^[0-9a-fA-F]+$/.test(part)) return "";
    const code = parseInt(part, 16);
    if (isNaN(code)) return "";
    chars.push(String.fromCharCode(code));
  }
  return chars.join("");
}

function getCharBreakdown(text: string): Array<{ char: string; decimal: number; hex: string }> {
  return Array.from(text).map((char) => {
    const code = char.codePointAt(0) ?? 0;
    return {
      char,
      decimal: code,
      hex: code.toString(16).toUpperCase().padStart(2, "0"),
    };
  });
}

function isValidHex(value: string): boolean {
  if (!value.trim()) return true;
  const cleaned = value.replace(/0x/gi, " ").replace(/\s+/g, "");
  return /^[0-9a-fA-F]*$/.test(cleaned);
}

export function HexTextConverterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("text-to-hex");
  const [prefix, setPrefix] = useState(false);
  const [spaceSeparated, setSpaceSeparated] = useState(true);
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const output =
    direction === "text-to-hex"
      ? textToHex(input, prefix, spaceSeparated)
      : hexToText(input);

  const breakdown =
    direction === "text-to-hex" && input ? getCharBreakdown(input) : [];

  const isValid = direction === "hex-to-text" ? isValidHex(input) : true;

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
          onClick={() => { setDirection("text-to-hex"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "text-to-hex" ? btnActive : btnBase)}
        >
          Text to Hex
        </button>
        <button
          onClick={() => { setDirection("hex-to-text"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "hex-to-text" ? btnActive : btnBase)}
        >
          Hex to Text
        </button>
        {direction === "text-to-hex" && (
          <>
            <button
              onClick={() => setPrefix(!prefix)}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", prefix ? btnActive : btnBase)}
            >
              {prefix ? "0x Prefix On" : "0x Prefix Off"}
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
        <label htmlFor="hex-input" className="text-sm font-semibold">
          {direction === "text-to-hex" ? "Enter Text" : "Enter Hex"}
        </label>
        <textarea
          id="hex-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            direction === "text-to-hex"
              ? "e.g. Hello World"
              : "e.g. 48 65 6C 6C 6F"
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
              Invalid hex input (only 0-9, A-F, and spaces allowed)
            </span>
          )}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              {direction === "text-to-hex" ? "Hex Output" : "Text Output"}
            </h3>
            <button
              onClick={() => copyText(output, "output")}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied === "output" ? "Copied!" : "Copy"}
            </button>
          </div>
          <output aria-live="polite" className="block font-mono text-sm break-all leading-relaxed select-all whitespace-pre-wrap">
            {output}
          </output>
        </div>
      )}

      {/* Per-character breakdown table */}
      {breakdown.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Per-Character Breakdown</h3>
            <button
              onClick={() => copyText(breakdown.map((c) => c.hex).join(" "), "all-hex")}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              {copied === "all-hex" ? "Copied!" : "Copy All Hex"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className={cx("border-b", isDark ? "border-white/10" : "border-black/10")}>
                  <th className="text-left py-2 px-2 font-semibold">Char</th>
                  <th className="text-left py-2 px-2 font-semibold">Decimal</th>
                  <th className="text-left py-2 px-2 font-semibold">Hex</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((c, i) => (
                  <tr key={i} className={cx("border-b", isDark ? "border-white/5" : "border-black/5")}>
                    <td className="py-1.5 px-2 text-sm">{c.char === " " ? "\u2423" : c.char}</td>
                    <td className="py-1.5 px-2">{c.decimal}</td>
                    <td className={cx("py-1.5 px-2", accent)}>{c.hex}</td>
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
