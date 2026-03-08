"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const NATO_MAP: Record<string, string> = {
  A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo",
  F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliet",
  K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar",
  P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango",
  U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee",
  Z: "Zulu",
};

const NATO_NUMBERS: Record<string, string> = {
  "0": "Zero", "1": "One", "2": "Two", "3": "Three", "4": "Four",
  "5": "Five", "6": "Six", "7": "Seven", "8": "Eight", "9": "Niner",
};

function textToNato(text: string): Array<{ char: string; nato: string }> {
  const result: Array<{ char: string; nato: string }> = [];
  for (const char of text) {
    const upper = char.toUpperCase();
    if (NATO_MAP[upper]) {
      result.push({ char: upper, nato: NATO_MAP[upper] });
    } else if (NATO_NUMBERS[char]) {
      result.push({ char, nato: NATO_NUMBERS[char] });
    } else if (char === " ") {
      result.push({ char: "[space]", nato: "(space)" });
    } else {
      result.push({ char, nato: char });
    }
  }
  return result;
}

function formatNatoList(items: Array<{ char: string; nato: string }>): string {
  return items
    .filter((item) => item.nato !== "(space)")
    .map((item) => `${item.char} — ${item.nato}`)
    .join("\n");
}

function formatNatoInline(items: Array<{ char: string; nato: string }>): string {
  return items
    .map((item) => (item.nato === "(space)" ? " " : item.nato))
    .join(" ");
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const DIGITS = "0123456789".split("");

export function NatoPhoneticAlphabetTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [copied, setCopied] = useState("");

  const natoResult = input ? textToNato(input) : [];

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowTable(!showTable)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", showTable ? btnActive : btnBase)}
        >
          {showTable ? "Hide" : "Show"} Reference Table
        </button>
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="nato-input" className="text-sm font-semibold block mb-2">
          Enter Text
        </label>
        <textarea
          id="nato-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to convert to NATO phonetic alphabet..."
          rows={4}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y min-h-[44px]",
            inputBase
          )}
          spellCheck={false}
        />
        <span className={cx("text-xs mt-1 block", muted)}>
          {input.length} character{input.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Output */}
      {natoResult.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">NATO Phonetic Output</h3>
            <div className="flex gap-2">
              <button
                onClick={() => copyText(formatNatoInline(natoResult), "inline")}
                className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
                aria-label="Copy inline output"
              >
                {copied === "inline" ? "Copied!" : "Copy Inline"}
              </button>
              <button
                onClick={() => copyText(formatNatoList(natoResult), "list")}
                className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
                aria-label="Copy as formatted list"
              >
                {copied === "list" ? "Copied!" : "Copy List"}
              </button>
            </div>
          </div>

          {/* Inline view */}
          <div className={cx(
            "rounded-lg border p-3 text-sm leading-relaxed",
            isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
          )}>
            {natoResult.map((item, i) => (
              <span key={i}>
                {item.nato === "(space)" ? (
                  <span className={cx("mx-1", muted)}>|</span>
                ) : (
                  <span className={cx("inline-block mr-1.5 mb-1 rounded px-1.5 py-0.5 text-xs font-mono", isDark ? "bg-white/5" : "bg-black/5")}>
                    <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>{item.char}</span>
                    <span className={cx("ml-1", muted)}>{item.nato}</span>
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* List view */}
          <div className={cx(
            "mt-3 rounded-lg border p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap select-all",
            isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
          )}>
            {formatNatoList(natoResult)}
          </div>
        </div>
      )}

      {/* Reference table */}
      {showTable && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">NATO Phonetic Alphabet Reference</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {LETTERS.map((letter) => (
              <div
                key={letter}
                className={cx(
                  "rounded-lg border p-2 text-center text-xs font-mono",
                  isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
                )}
              >
                <span className={isDark ? "text-emerald-400 font-semibold" : "text-emerald-600 font-semibold"}>{letter}</span>
                <span className={cx("ml-1.5", muted)}>{NATO_MAP[letter]}</span>
              </div>
            ))}
          </div>

          <h4 className="text-sm font-semibold mt-4 mb-3">Numbers</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {DIGITS.map((digit) => (
              <div
                key={digit}
                className={cx(
                  "rounded-lg border p-2 text-center text-xs font-mono",
                  isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
                )}
              >
                <span className={isDark ? "text-emerald-400 font-semibold" : "text-emerald-600 font-semibold"}>{digit}</span>
                <span className={cx("ml-1.5", muted)}>{NATO_NUMBERS[digit]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      <div className={cx("text-xs text-center", muted)}>
        Letters and numbers are converted. Other characters pass through unchanged.
      </div>
    </div>
  );
}
