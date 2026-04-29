"use client";

import { useCallback, useEffect, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ── Helpers ──────────────────────────────────────────────── */

function generateNumbers(
  min: number,
  max: number,
  count: number,
  allowDuplicates: boolean,
): number[] {
  const range = max - min + 1;
  if (!allowDuplicates && count > range) count = range;

  if (!allowDuplicates) {
    // Fisher-Yates on the full range for small ranges, or set-based for large
    const results = new Set<number>();
    while (results.size < count) {
      results.add(Math.floor(Math.random() * range) + min);
    }
    return Array.from(results);
  }

  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * range) + min);
  }
  return results;
}

function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

type SortMode = "unsorted" | "ascending" | "descending";

const STORAGE_KEY = "fmc_random_number";

const DICE = [
  { sides: 4, label: "d4" },
  { sides: 6, label: "d6" },
  { sides: 8, label: "d8" },
  { sides: 10, label: "d10" },
  { sides: 12, label: "d12" },
  { sides: 20, label: "d20" },
];

export function RandomNumberGeneratorTool() {
  const { isDark } = useTheme();

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>("unsorted");
  const [results, setResults] = useState<number[]>([]);
  const [diceResults, setDiceResults] = useState<{ die: string; value: number }[]>([]);
  const [copied, setCopied] = useState("");

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (typeof data.min === "number") setMin(data.min);
        if (typeof data.max === "number") setMax(data.max);
        if (typeof data.count === "number") setCount(data.count);
        if (typeof data.allowDuplicates === "boolean") setAllowDuplicates(data.allowDuplicates);
        if (typeof data.sortMode === "string") setSortMode(data.sortMode);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ min, max, count, allowDuplicates, sortMode }));
    } catch { /* ignore */ }
  }, [min, max, count, allowDuplicates, sortMode]);

  const generate = useCallback(() => {
    if (min > max) return;
    let nums = generateNumbers(min, max, count, allowDuplicates);
    if (sortMode === "ascending") nums.sort((a, b) => a - b);
    else if (sortMode === "descending") nums.sort((a, b) => b - a);
    setResults(nums);
    setCopied("");
  }, [min, max, count, allowDuplicates, sortMode]);

  const handleDiceRoll = useCallback((sides: number, label: string) => {
    const value = rollDice(sides);
    setDiceResults((prev) => [{ die: label, value }, ...prev].slice(0, 50));
    setCopied("");
  }, []);

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  // Theme styles
  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const btnPrimary = isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500" : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const isBulk = count > 1;
  const rangeValid = min <= max;
  const uniqueCount = max - min + 1;
  const canGenerate = rangeValid && (allowDuplicates || count <= uniqueCount);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="rng-min" className="text-sm font-semibold block mb-2">Min</label>
            <input
              id="rng-min"
              type="number"
              value={min}
              onChange={(e) => setMin(parseInt(e.target.value) || 0)}
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            />
          </div>
          <div>
            <label htmlFor="rng-max" className="text-sm font-semibold block mb-2">Max</label>
            <input
              id="rng-max"
              type="number"
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value) || 0)}
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            />
          </div>
          <div>
            <label htmlFor="rng-count" className="text-sm font-semibold block mb-2">
              Count <span className={cx("font-normal", muted)}>(1-1000)</span>
            </label>
            <input
              id="rng-count"
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
              className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]", inputBase)}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generate}
              disabled={!canGenerate}
              className={cx(
                "w-full rounded-lg border px-5 py-2 text-sm font-semibold transition-colors min-h-[44px]",
                canGenerate ? btnPrimary : "opacity-50 cursor-not-allowed bg-neutral-600 border-neutral-600 text-neutral-300"
              )}
            >
              Generate
            </button>
          </div>
        </div>

        {!rangeValid && (
          <p className="mt-2 text-xs text-red-400">Min must be less than or equal to Max.</p>
        )}
        {rangeValid && !allowDuplicates && count > uniqueCount && (
          <p className="mt-2 text-xs text-amber-400">
            Only {uniqueCount.toLocaleString()} unique number{uniqueCount !== 1 ? "s" : ""} possible in this range. Count will be capped.
          </p>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setAllowDuplicates(!allowDuplicates)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", allowDuplicates ? btnBase : btnActive)}
        >
          {allowDuplicates ? "Duplicates: On" : "No Duplicates"}
        </button>
        <button
          onClick={() => setSortMode(sortMode === "unsorted" ? "ascending" : sortMode === "ascending" ? "descending" : "unsorted")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", sortMode !== "unsorted" ? btnActive : btnBase)}
        >
          Sort: {sortMode === "unsorted" ? "Off" : sortMode === "ascending" ? "Asc" : "Desc"}
        </button>
        {results.length > 0 && (
          <>
            <button
              onClick={() => copyText(results.join(", "), "all")}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              {copied === "all" ? "Copied!" : "Copy All"}
            </button>
            <button
              onClick={() => { setResults([]); setCopied(""); }}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              Clear
            </button>
          </>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">
              {isBulk ? `Generated Numbers` : "Result"}{" "}
              <span className={cx("font-normal", muted)}>({results.length.toLocaleString()})</span>
            </h3>
          </div>
          {!isBulk ? (
            <div className="text-center py-4">
              <output aria-live="polite" aria-label="Generated random number" className={cx("block text-5xl font-bold font-mono", isDark ? "text-emerald-400" : "text-emerald-600")}>
                {results[0]}
              </output>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
              {results.map((num, i) => (
                <span
                  key={i}
                  className={cx(
                    "inline-block rounded-lg border px-2.5 py-1 text-sm font-mono",
                    isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
                  )}
                >
                  {num.toLocaleString()}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dice Roller */}
      <div className={cx("rounded-xl border p-4", base)}>
        <h3 className="text-sm font-semibold mb-3">Dice Roller</h3>
        <div className="flex flex-wrap gap-2">
          {DICE.map(({ sides, label }) => (
            <button
              key={label}
              onClick={() => handleDiceRoll(sides, label)}
              className={cx("rounded-lg border px-4 py-2 text-sm font-semibold transition-colors min-h-[44px]", btnBase)}
            >
              {label}
            </button>
          ))}
        </div>
        {diceResults.length > 0 && (
          <div className="mt-3 space-y-1" aria-live="polite">
            <div className="flex items-center justify-between mb-2">
              <span className={cx("text-xs", muted)}>Roll history (latest first)</span>
              <div className="flex gap-2">
                <button
                  onClick={() => copyText(diceResults.map((d) => `${d.die}: ${d.value}`).join("\n"), "dice")}
                  className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
                >
                  {copied === "dice" ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => setDiceResults([])}
                  className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px]", btnBase)}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {diceResults.map((d, i) => (
                <span
                  key={i}
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-mono",
                    isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
                  )}
                >
                  <span className={muted}>{d.die}</span>
                  <span className={cx("font-bold", isDark ? "text-emerald-400" : "text-emerald-600")}>{d.value}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
