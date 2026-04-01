"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Stop Words ──────────────────────────────────────────────── */
const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "to", "of", "in",
  "for", "on", "with", "at", "by", "from", "as", "into", "through",
  "during", "before", "after", "above", "below", "between", "under",
  "again", "further", "then", "once", "here", "there", "when", "where",
  "why", "how", "all", "each", "every", "both", "few", "more", "most",
  "other", "some", "such", "no", "nor", "not", "only", "own", "same",
  "so", "than", "too", "very", "just", "because", "but", "and", "or",
  "if", "while", "about", "up", "out", "off", "over", "its", "it",
  "this", "that", "these", "those", "i", "me", "my", "we", "our",
  "you", "your", "he", "him", "his", "she", "her", "they", "them",
  "their", "what", "which", "who", "also", "any", "many", "much",
  "like", "get", "got", "one", "two", "new",
]);

/* ─── Types ───────────────────────────────────────────────────── */
type SortMode = "frequency" | "alphabetical" | "length";
type LimitMode = 10 | 25 | 50 | 0; // 0 = all
type TabMode = "frequency" | "ngrams" | "cloud";

interface WordEntry {
  word: string;
  count: number;
  percentage: number;
  rank: number;
}

interface NgramEntry {
  gram: string;
  count: number;
}

/* ─── Helpers ─────────────────────────────────────────────────── */
function getWords(text: string): string[] {
  return text.match(/[a-zA-Z']+/g) || [];
}

function buildFrequencyTable(
  words: string[],
  excludeStopWords: boolean,
  sortMode: SortMode,
): WordEntry[] {
  const lowerWords = words.map((w) => w.toLowerCase());
  const freq: Record<string, number> = {};
  for (const w of lowerWords) {
    if (w.length < 2) continue;
    if (excludeStopWords && STOP_WORDS.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
  }

  const totalCounted = Object.values(freq).reduce((a, b) => a + b, 0);
  let entries: WordEntry[] = Object.entries(freq).map(([word, count]) => ({
    word,
    count,
    percentage: totalCounted > 0 ? (count / totalCounted) * 100 : 0,
    rank: 0,
  }));

  // Always rank by frequency first
  entries.sort((a, b) => b.count - a.count);
  entries.forEach((e, i) => (e.rank = i + 1));

  // Then apply display sort
  if (sortMode === "alphabetical") {
    entries.sort((a, b) => a.word.localeCompare(b.word));
  } else if (sortMode === "length") {
    entries.sort((a, b) => b.word.length - a.word.length || b.count - a.count);
  }

  return entries;
}

function getNgrams(words: string[], n: number): NgramEntry[] {
  const lowerWords = words.map((w) => w.toLowerCase());
  const map: Record<string, number> = {};
  for (let i = 0; i <= lowerWords.length - n; i++) {
    const gram = lowerWords.slice(i, i + n).join(" ");
    map[gram] = (map[gram] || 0) + 1;
  }
  return Object.entries(map)
    .map(([gram, count]) => ({ gram, count }))
    .filter((e) => e.count > 1)
    .sort((a, b) => b.count - a.count);
}

/* ─── Main Component ──────────────────────────────────────────── */
export function WordFrequencyCounterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [excludeStopWords, setExcludeStopWords] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>("frequency");
  const [limit, setLimit] = useState<LimitMode>(25);
  const [tab, setTab] = useState<TabMode>("frequency");
  const [copied, setCopied] = useState(false);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const words = useMemo(() => getWords(input), [input]);
  const wordCount = words.length;
  const charCount = input.length;

  const table = useMemo(
    () => buildFrequencyTable(words, excludeStopWords, sortMode),
    [words, excludeStopWords, sortMode],
  );

  const displayTable = useMemo(() => {
    if (limit === 0) return table;
    return table.slice(0, limit);
  }, [table, limit]);

  const bigrams = useMemo(() => getNgrams(words, 2), [words]);
  const trigrams = useMemo(() => getNgrams(words, 3), [words]);

  const copyTable = useCallback(() => {
    const header = "Rank\tWord\tCount\tPercentage";
    const rows = table.map((e) => `${e.rank}\t${e.word}\t${e.count}\t${e.percentage.toFixed(2)}%`);
    navigator.clipboard.writeText([header, ...rows].join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [table]);

  const exportCSV = useCallback(() => {
    const header = "Rank,Word,Count,Percentage";
    const rows = table.map(
      (e) => `${e.rank},"${e.word}",${e.count},${e.percentage.toFixed(2)}%`,
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-frequency.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [table]);

  // Word cloud: top 40 words scaled by frequency
  const cloudWords = useMemo(() => {
    const top = table.slice(0, 40);
    if (top.length === 0) return [];
    const maxCount = top[0]?.count || 1;
    const minSize = 14;
    const maxSize = 48;
    return top.map((e) => ({
      word: e.word,
      count: e.count,
      size: minSize + ((e.count / maxCount) * (maxSize - minSize)),
    }));
  }, [table]);

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {table.length > 0 && (
          <>
            <button
              onClick={exportCSV}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              Export CSV
            </button>
            <button
              onClick={copyTable}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              {copied ? "Copied!" : "Copy Table"}
            </button>
          </>
        )}
        <button
          onClick={() => { setInput(""); setCopied(false); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="freq-input" className="text-sm font-semibold block mb-2">
          Paste Text to Analyze
        </label>
        <textarea
          id="freq-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here to count word frequencies..."
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {wordCount} word{wordCount !== 1 ? "s" : ""} · {charCount} char{charCount !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Controls */}
      {wordCount > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Tabs */}
            <div className="flex gap-1">
              {(["frequency", "ngrams", "cloud"] as TabMode[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cx(
                    "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px] capitalize",
                    tab === t ? btnActive : btnBase,
                  )}
                >
                  {t === "frequency" ? "Frequency Table" : t === "ngrams" ? "N-grams" : "Word Cloud"}
                </button>
              ))}
            </div>

            {/* Stop words toggle */}
            {tab === "frequency" && (
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeStopWords}
                  onChange={(e) => setExcludeStopWords(e.target.checked)}
                  className="rounded border-neutral-600 text-emerald-500 focus:ring-emerald-500/50"
                />
                Exclude stop words
              </label>
            )}

            {/* Sort */}
            {tab === "frequency" && (
              <div className="flex gap-1">
                {(["frequency", "alphabetical", "length"] as SortMode[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortMode(s)}
                    className={cx(
                      "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px] capitalize",
                      sortMode === s ? btnActive : btnBase,
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Limit */}
            {tab === "frequency" && (
              <div className="flex gap-1">
                {([10, 25, 50, 0] as LimitMode[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLimit(l)}
                    className={cx(
                      "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
                      limit === l ? btnActive : btnBase,
                    )}
                  >
                    {l === 0 ? "All" : `Top ${l}`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {wordCount > 0 && (
        <div aria-live="polite" className="space-y-4">
          {/* Frequency Table */}
          {tab === "frequency" && (
            <div className={cx("rounded-xl border p-4 overflow-x-auto", base)}>
              <h3 className="text-sm font-semibold mb-3">
                Word Frequency Table
                <span className={cx("ml-2 font-normal", muted)}>
                  ({table.length} unique word{table.length !== 1 ? "s" : ""})
                </span>
              </h3>
              {displayTable.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className={cx("border-b text-xs text-left", isDark ? "border-white/10" : "border-black/10")}>
                      <th className="py-2 pr-3 font-medium">Rank</th>
                      <th className="py-2 pr-3 font-medium">Word</th>
                      <th className="py-2 pr-3 font-medium text-right">Count</th>
                      <th className="py-2 pr-3 font-medium text-right">%</th>
                      <th className="py-2 font-medium" style={{ width: "40%" }}>Bar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayTable.map((entry) => (
                      <tr key={entry.word} className={cx("border-b", isDark ? "border-white/5" : "border-black/5")}>
                        <td className={cx("py-1.5 pr-3 font-mono text-xs", muted)}>{entry.rank}</td>
                        <td className="py-1.5 pr-3 font-mono text-xs">{entry.word}</td>
                        <td className="py-1.5 pr-3 font-mono text-xs text-right">{entry.count}</td>
                        <td className="py-1.5 pr-3 font-mono text-xs text-right">{entry.percentage.toFixed(1)}%</td>
                        <td className="py-1.5">
                          <div
                            className="h-3 rounded"
                            style={{
                              width: `${(entry.count / (displayTable[0]?.count || 1)) * 100}%`,
                              background: isDark ? "rgba(16,185,129,0.4)" : "rgba(16,185,129,0.3)",
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className={cx("text-sm", muted)}>No words to display.</p>
              )}
              {limit > 0 && table.length > limit && (
                <p className={cx("mt-2 text-xs", muted)}>
                  Showing {limit} of {table.length} words.{" "}
                  <button
                    onClick={() => setLimit(0)}
                    className="underline hover:text-emerald-400 transition-colors"
                  >
                    Show all
                  </button>
                </p>
              )}
            </div>
          )}

          {/* N-grams */}
          {tab === "ngrams" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={cx("rounded-xl border p-4", base)}>
                <h3 className="text-sm font-semibold mb-3">
                  Bigrams (2-word phrases)
                  <span className={cx("ml-2 font-normal", muted)}>
                    ({bigrams.length} unique)
                  </span>
                </h3>
                {bigrams.length > 0 ? (
                  <div className="space-y-1">
                    {bigrams.slice(0, 20).map((entry) => (
                      <div key={entry.gram} className="flex items-center gap-2 text-xs">
                        <span className="w-32 truncate text-right font-mono">{entry.gram}</span>
                        <div
                          className="flex-1 h-4 rounded overflow-hidden"
                          style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                        >
                          <div
                            className={cx("h-full rounded", isDark ? "bg-emerald-500/60" : "bg-emerald-500/40")}
                            style={{ width: `${(entry.count / (bigrams[0]?.count || 1)) * 100}%` }}
                          />
                        </div>
                        <span className={cx("w-8 text-right font-mono", muted)}>{entry.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={cx("text-sm", muted)}>No repeated bigrams found.</p>
                )}
              </div>

              <div className={cx("rounded-xl border p-4", base)}>
                <h3 className="text-sm font-semibold mb-3">
                  Trigrams (3-word phrases)
                  <span className={cx("ml-2 font-normal", muted)}>
                    ({trigrams.length} unique)
                  </span>
                </h3>
                {trigrams.length > 0 ? (
                  <div className="space-y-1">
                    {trigrams.slice(0, 20).map((entry) => (
                      <div key={entry.gram} className="flex items-center gap-2 text-xs">
                        <span className="w-40 truncate text-right font-mono">{entry.gram}</span>
                        <div
                          className="flex-1 h-4 rounded overflow-hidden"
                          style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                        >
                          <div
                            className={cx("h-full rounded", isDark ? "bg-emerald-500/60" : "bg-emerald-500/40")}
                            style={{ width: `${(entry.count / (trigrams[0]?.count || 1)) * 100}%` }}
                          />
                        </div>
                        <span className={cx("w-8 text-right font-mono", muted)}>{entry.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={cx("text-sm", muted)}>No repeated trigrams found.</p>
                )}
              </div>
            </div>
          )}

          {/* Word Cloud */}
          {tab === "cloud" && (
            <div className={cx("rounded-xl border p-6", base)}>
              <h3 className="text-sm font-semibold mb-4">Word Cloud</h3>
              {cloudWords.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 min-h-[200px]">
                  {cloudWords.map((w) => (
                    <span
                      key={w.word}
                      className="transition-opacity hover:opacity-70 cursor-default"
                      style={{
                        fontSize: `${w.size}px`,
                        lineHeight: 1.2,
                        color: isDark
                          ? `hsl(160, ${40 + (w.count / (cloudWords[0]?.count || 1)) * 40}%, ${50 + (w.count / (cloudWords[0]?.count || 1)) * 20}%)`
                          : `hsl(160, ${40 + (w.count / (cloudWords[0]?.count || 1)) * 40}%, ${25 + (w.count / (cloudWords[0]?.count || 1)) * 15}%)`,
                        fontWeight: w.size > 30 ? 700 : w.size > 20 ? 600 : 400,
                      }}
                      title={`${w.word}: ${w.count}`}
                    >
                      {w.word}
                    </span>
                  ))}
                </div>
              ) : (
                <p className={cx("text-sm", muted)}>Enter text to generate a word cloud.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
