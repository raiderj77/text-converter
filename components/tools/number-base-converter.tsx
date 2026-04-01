"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Base = "bin" | "oct" | "dec" | "hex";
type Mode = "number" | "text";

const BASE_LABELS: Record<Base, string> = {
  bin: "Binary (2)",
  oct: "Octal (8)",
  dec: "Decimal (10)",
  hex: "Hexadecimal (16)",
};

const BASE_RADIX: Record<Base, number> = {
  bin: 2,
  oct: 8,
  dec: 10,
  hex: 16,
};

const COMMON_CONVERSIONS = [
  { dec: 0, bin: "0", oct: "0", hex: "0" },
  { dec: 1, bin: "1", oct: "1", hex: "1" },
  { dec: 8, bin: "1000", oct: "10", hex: "8" },
  { dec: 10, bin: "1010", oct: "12", hex: "A" },
  { dec: 16, bin: "10000", oct: "20", hex: "10" },
  { dec: 32, bin: "100000", oct: "40", hex: "20" },
  { dec: 64, bin: "1000000", oct: "100", hex: "40" },
  { dec: 100, bin: "1100100", oct: "144", hex: "64" },
  { dec: 127, bin: "1111111", oct: "177", hex: "7F" },
  { dec: 128, bin: "10000000", oct: "200", hex: "80" },
  { dec: 255, bin: "11111111", oct: "377", hex: "FF" },
  { dec: 256, bin: "100000000", oct: "400", hex: "100" },
  { dec: 1024, bin: "10000000000", oct: "2000", hex: "400" },
  { dec: 65535, bin: "1111111111111111", oct: "177777", hex: "FFFF" },
];

function isValidForBase(value: string, base: Base): boolean {
  if (!value.trim()) return true;
  const cleaned = value.trim().toLowerCase();
  switch (base) {
    case "bin": return /^[01]+$/.test(cleaned);
    case "oct": return /^[0-7]+$/.test(cleaned);
    case "dec": return /^[0-9]+$/.test(cleaned);
    case "hex": return /^[0-9a-f]+$/.test(cleaned);
  }
}

function convertNumber(value: string, fromBase: Base): Record<Base, string> | null {
  const cleaned = value.trim();
  if (!cleaned) return null;
  if (!isValidForBase(cleaned, fromBase)) return null;

  try {
    const decimal = parseInt(cleaned, BASE_RADIX[fromBase]);
    if (isNaN(decimal) || decimal < 0) return null;
    return {
      bin: decimal.toString(2),
      oct: decimal.toString(8),
      dec: decimal.toString(10),
      hex: decimal.toString(16).toUpperCase(),
    };
  } catch {
    return null;
  }
}

function textToCharCodes(text: string): Array<{ char: string; dec: number; bin: string; oct: string; hex: string }> {
  return Array.from(text).map((char) => {
    const code = char.codePointAt(0) ?? 0;
    return {
      char,
      dec: code,
      bin: code.toString(2).padStart(8, "0"),
      oct: code.toString(8),
      hex: code.toString(16).toUpperCase().padStart(2, "0"),
    };
  });
}

export function NumberBaseConverterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [fromBase, setFromBase] = useState<Base>("dec");
  const [mode, setMode] = useState<Mode>("number");
  const [uppercase, setUppercase] = useState(true);
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const results = mode === "number" ? convertNumber(input, fromBase) : null;
  const charCodes = mode === "text" ? textToCharCodes(input) : [];
  const isValid = mode === "number" ? (!input.trim() || isValidForBase(input, fromBase)) : true;

  const formatHex = (v: string) => uppercase ? v.toUpperCase() : v.toLowerCase();

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setMode("number"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === "number" ? btnActive : btnBase)}
        >
          Number Mode
        </button>
        <button
          onClick={() => { setMode("text"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === "text" ? btnActive : btnBase)}
        >
          ASCII Text Mode
        </button>
        {mode === "number" && (
          <button
            onClick={() => setUppercase(!uppercase)}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", uppercase ? btnActive : btnBase)}
          >
            {uppercase ? "UPPERCASE" : "lowercase"}
          </button>
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
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="base-input" className="text-sm font-semibold">
            {mode === "number" ? "Enter a Number" : "Enter Text"}
          </label>
          {mode === "number" && (
            <select
              value={fromBase}
              onChange={(e) => { setFromBase(e.target.value as Base); setInput(""); }}
              className={cx("rounded-lg border px-2 py-1 text-xs min-h-[44px]", inputBase)}
              aria-label="Input base"
            >
              {(Object.keys(BASE_LABELS) as Base[]).map((b) => (
                <option key={b} value={b}>{BASE_LABELS[b]}</option>
              ))}
            </select>
          )}
        </div>
        <input
          id="base-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "number"
              ? fromBase === "bin" ? "e.g. 11010110"
              : fromBase === "oct" ? "e.g. 326"
              : fromBase === "dec" ? "e.g. 214"
              : "e.g. D6"
              : "e.g. Hello World"
          }
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]",
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
              Invalid {BASE_LABELS[fromBase].split(" ")[0].toLowerCase()} number
            </span>
          )}
        </div>
      </div>

      {/* Number mode results */}
      {mode === "number" && results && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <h3 className="text-sm font-semibold mb-3">Conversion Results</h3>
          <div className="space-y-3">
            {(Object.keys(BASE_LABELS) as Base[]).map((b) => {
              const val = b === "hex" ? formatHex(results[b]) : results[b];
              const label = BASE_LABELS[b];
              return (
                <div key={b} className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={cx("text-xs font-semibold", accent)}>{label}</span>
                    <button
                      onClick={() => copyText(val, b)}
                      className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px]", btnBase)}
                      aria-label={`Copy ${label} value`}
                    >
                      {copied === b ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="font-mono text-sm break-all leading-relaxed select-all">{val}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Text mode results */}
      {mode === "text" && charCodes.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Character Code Table</h3>
            <div className="flex gap-2">
              <button
                onClick={() => copyText(charCodes.map((c) => c.bin).join(" "), "all-bin")}
                className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {copied === "all-bin" ? "Copied!" : "Copy Binary"}
              </button>
              <button
                onClick={() => copyText(charCodes.map((c) => c.hex).join(" "), "all-hex")}
                className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
              >
                {copied === "all-hex" ? "Copied!" : "Copy Hex"}
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className={cx("border-b", isDark ? "border-white/10" : "border-black/10")}>
                  <th className="text-left py-2 px-2 font-semibold">Char</th>
                  <th className="text-left py-2 px-2 font-semibold">Decimal</th>
                  <th className="text-left py-2 px-2 font-semibold">Binary</th>
                  <th className="text-left py-2 px-2 font-semibold">Octal</th>
                  <th className="text-left py-2 px-2 font-semibold">Hex</th>
                </tr>
              </thead>
              <tbody>
                {charCodes.map((c, i) => (
                  <tr key={i} className={cx("border-b", isDark ? "border-white/5" : "border-black/5")}>
                    <td className="py-1.5 px-2 text-sm">{c.char === " " ? "\u2423" : c.char}</td>
                    <td className="py-1.5 px-2">{c.dec}</td>
                    <td className="py-1.5 px-2">{c.bin}</td>
                    <td className="py-1.5 px-2">{c.oct}</td>
                    <td className="py-1.5 px-2">{c.hex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reference table */}
      <details className={cx("rounded-xl border p-4", base)}>
        <summary className="text-sm font-semibold cursor-pointer select-none">
          Common Conversions Reference Table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className={cx("border-b", isDark ? "border-white/10" : "border-black/10")}>
                <th className="text-left py-2 px-2 font-semibold">Decimal</th>
                <th className="text-left py-2 px-2 font-semibold">Binary</th>
                <th className="text-left py-2 px-2 font-semibold">Octal</th>
                <th className="text-left py-2 px-2 font-semibold">Hex</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_CONVERSIONS.map((row) => (
                <tr key={row.dec} className={cx("border-b", isDark ? "border-white/5" : "border-black/5")}>
                  <td className="py-1.5 px-2">{row.dec}</td>
                  <td className="py-1.5 px-2">{row.bin}</td>
                  <td className="py-1.5 px-2">{row.oct}</td>
                  <td className="py-1.5 px-2">{row.hex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
