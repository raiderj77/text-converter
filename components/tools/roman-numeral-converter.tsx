"use client";

import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ── Conversion logic ──────────────────────────────── */

const ROMAN_MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(num: number): string {
  if (num < 1 || num > 3999) return "";
  let result = "";
  let remaining = num;
  for (const [value, symbol] of ROMAN_MAP) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function fromRoman(str: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const s = str.toUpperCase().replace(/[^IVXLCDM]/g, "");
  if (!s) return 0;
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]];
    const next = i + 1 < s.length ? map[s[i + 1]] : 0;
    if (curr < next) {
      total -= curr;
    } else {
      total += curr;
    }
  }
  if (total < 1 || total > 3999) return 0;
  // Validate by round-tripping
  if (toRoman(total) !== s) return 0;
  return total;
}

type Mode = "to-roman" | "to-decimal" | "date";

const STORAGE_KEY = "fmc_roman_numeral";

const REFERENCE_TABLE = [
  [1, "I"], [2, "II"], [3, "III"], [4, "IV"], [5, "V"],
  [6, "VI"], [7, "VII"], [8, "VIII"], [9, "IX"], [10, "X"],
  [11, "XI"], [12, "XII"], [13, "XIII"], [14, "XIV"], [15, "XV"],
  [16, "XVI"], [17, "XVII"], [18, "XVIII"], [19, "XIX"], [20, "XX"],
  [50, "L"], [100, "C"], [500, "D"], [1000, "M"],
] as const;

export function RomanNumeralConverterTool() {
  const { isDark } = useTheme();

  const [mode, setMode] = useState<Mode>("to-roman");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.mode === "string") setMode(data.mode);
        if (typeof data.input === "string") setInput(data.input);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, input }));
    } catch { /* ignore */ }
  }, [mode, input]);

  // Convert on change
  useEffect(() => {
    setError("");
    setCopied(false);
    if (!input.trim()) {
      setOutput("");
      return;
    }

    if (mode === "to-roman" || mode === "date") {
      const num = parseInt(input, 10);
      if (isNaN(num)) {
        setError("Enter a valid number.");
        setOutput("");
        return;
      }
      if (num < 1 || num > 3999) {
        setError("Number must be between 1 and 3999.");
        setOutput("");
        return;
      }
      setOutput(toRoman(num));
    } else {
      const result = fromRoman(input);
      if (result === 0) {
        setError("Invalid Roman numeral.");
        setOutput("");
        return;
      }
      setOutput(result.toString());
    }
  }, [input, mode]);

  const copyOutput = useCallback(() => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
  }, []);

  // Theme styles
  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Mode selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleModeChange("to-roman")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === "to-roman" ? btnActive : btnBase)}
        >
          Number &rarr; Roman
        </button>
        <button
          onClick={() => handleModeChange("to-decimal")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === "to-decimal" ? btnActive : btnBase)}
        >
          Roman &rarr; Number
        </button>
        <button
          onClick={() => handleModeChange("date")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === "date" ? btnActive : btnBase)}
        >
          Date Mode (Year)
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="roman-input" className="text-sm font-semibold block mb-2">
          {mode === "to-decimal" ? "Enter Roman Numeral" : mode === "date" ? "Enter Year (1-3999)" : "Enter Number (1-3999)"}
        </label>
        <input
          id="roman-input"
          type={mode === "to-decimal" ? "text" : "number"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "to-decimal" ? "e.g. MMXXIV" : mode === "date" ? "e.g. 2024" : "e.g. 42"}
          min={mode !== "to-decimal" ? 1 : undefined}
          max={mode !== "to-decimal" ? 3999 : undefined}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]",
            inputBase
          )}
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Result</h3>
            <button
              onClick={copyOutput}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", copied ? btnPrimary : btnBase)}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="text-center py-4">
            <span className={cx("text-4xl sm:text-5xl font-bold font-mono", isDark ? "text-emerald-400" : "text-emerald-600")}>
              {output}
            </span>
            {mode === "date" && (
              <p className={cx("mt-2 text-sm", muted)}>
                Year {input} = {output}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Reference Table */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">Reference Table</h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {REFERENCE_TABLE.map(([num, roman]) => (
            <button
              key={num}
              onClick={() => {
                if (mode === "to-decimal") {
                  setInput(roman);
                } else {
                  setInput(num.toString());
                }
              }}
              className={cx(
                "rounded-lg border px-2 py-2 text-center transition-colors hover:ring-1 hover:ring-emerald-500/30",
                isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
              )}
            >
              <div className={cx("text-xs font-bold", isDark ? "text-emerald-400" : "text-emerald-600")}>
                {roman}
              </div>
              <div className={cx("text-xs", muted)}>{num}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
