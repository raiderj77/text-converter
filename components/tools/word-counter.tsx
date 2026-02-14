"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber, readingTime, speakingTime } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/** Social media character limits */
const SOCIAL_LIMITS = [
  { name: "Twitter/X", limit: 280 },
  { name: "Instagram Bio", limit: 150 },
  { name: "Instagram Caption", limit: 2200 },
  { name: "LinkedIn Post", limit: 3000 },
  { name: "Facebook Post", limit: 63206 },
  { name: "YouTube Title", limit: 100 },
  { name: "YouTube Description", limit: 5000 },
  { name: "TikTok Caption", limit: 4000 },
  { name: "Pinterest Pin", limit: 500 },
  { name: "Meta Description (SEO)", limit: 160 },
  { name: "Google Ads Headline", limit: 30 },
  { name: "Google Ads Description", limit: 90 },
];

type Stats = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  avgWordLength: number;
  readingTimeMin: number;
  speakingTimeMin: number;
};

function computeStats(text: string): Stats {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  // Sentences: split on . ! ? followed by space or end, filter empty
  const sentences = trimmed
    ? trimmed.split(/[.!?]+\s*/g).filter((s) => s.trim().length > 0).length
    : 0;

  // Paragraphs: non-empty blocks separated by blank lines
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;

  // Lines: actual line count
  const lines = text ? text.split("\n").length : 0;

  // Average word length
  const avgWordLength =
    words > 0
      ? Math.round(
          (trimmed.split(/\s+/).reduce((sum, w) => sum + w.length, 0) / words) *
            10
        ) / 10
      : 0;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    avgWordLength,
    readingTimeMin: readingTime(words),
    speakingTimeMin: speakingTime(words),
  };
}

function getTopWords(text: string, n: number = 10, includeStopWords: boolean = false) {
  const trimmed = text.trim().toLowerCase();
  if (!trimmed) return [];

  const words = trimmed.match(/[a-z']+/g);
  if (!words) return [];

  // Common stop words to filter
  const stopWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "is", "it", "be", "as", "was", "that", "this",
    "are", "were", "been", "have", "has", "had", "do", "does", "did",
    "will", "would", "could", "should", "may", "might", "can", "shall",
    "not", "no", "so", "if", "from", "i", "me", "my", "we", "our",
    "you", "your", "he", "she", "they", "them", "his", "her", "its",
  ]);

  const freq: Record<string, number> = {};
  for (const w of words) {
    if (w.length < 2) continue;
    if (!includeStopWords && stopWords.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}

function StatBox({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string | number;
  isDark: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-xl border p-3 text-center",
        isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
      )}
    >
      <div className="text-xl sm:text-2xl font-bold tabular-nums">{value}</div>
      <div
        className={cx(
          "mt-1 text-xs",
          isDark ? "text-neutral-400" : "text-neutral-500"
        )}
      >
        {label}
      </div>
    </div>
  );
}

export function WordCounterTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [showStopWords, setShowStopWords] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved text
  useEffect(() => {
    const saved = localStorage.getItem("fmc_wc_text");
    if (saved) setText(saved);
  }, []);

  // Persist text
  useEffect(() => {
    localStorage.setItem("fmc_wc_text", text);
  }, [text]);

  // Ctrl/Cmd+K focuses input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const stats = useMemo(() => computeStats(text), [text]);
  const topWords = useMemo(() => getTopWords(text, 10, showStopWords), [text, showStopWords]);

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  async function copyStats() {
    const lines = [
      `Words: ${formatNumber(stats.words)}`,
      `Characters: ${formatNumber(stats.characters)}`,
      `Characters (no spaces): ${formatNumber(stats.charactersNoSpaces)}`,
      `Sentences: ${formatNumber(stats.sentences)}`,
      `Paragraphs: ${formatNumber(stats.paragraphs)}`,
      `Lines: ${formatNumber(stats.lines)}`,
      `Avg word length: ${stats.avgWordLength}`,
      `Reading time: ~${stats.readingTimeMin} min`,
      `Speaking time: ~${stats.speakingTimeMin} min`,
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
  }

  return (
    <div>
      {/* Input area */}
      <div
        className={cx(
          "rounded-2xl border shadow-sm",
          isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
        )}
      >
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Input</div>
          <div className="flex items-center gap-2">
            <span
              className={cx(
                "text-xs tabular-nums",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              {formatNumber(stats.words)} words · {formatNumber(stats.characters)} chars
            </span>
            <button
              type="button"
              onClick={clearAll}
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="p-3">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Paste or type text here to count words, characters, sentences…"
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none",
              isDark
                ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Main stats grid */}
      <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
        <StatBox label="Words" value={formatNumber(stats.words)} isDark={isDark} />
        <StatBox label="Characters" value={formatNumber(stats.characters)} isDark={isDark} />
        <StatBox label="No Spaces" value={formatNumber(stats.charactersNoSpaces)} isDark={isDark} />
        <StatBox label="Sentences" value={formatNumber(stats.sentences)} isDark={isDark} />
        <StatBox label="Paragraphs" value={formatNumber(stats.paragraphs)} isDark={isDark} />
      </div>

      {/* Secondary stats */}
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatBox label="Lines" value={formatNumber(stats.lines)} isDark={isDark} />
        <StatBox label="Avg Word Length" value={stats.avgWordLength} isDark={isDark} />
        <StatBox label="Reading Time" value={`~${stats.readingTimeMin} min`} isDark={isDark} />
        <StatBox label="Speaking Time" value={`~${stats.speakingTimeMin} min`} isDark={isDark} />
      </div>

      {/* Copy stats button */}
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={copyStats}
          className={cx(
            "text-sm rounded-xl px-4 py-2 border transition-colors",
            isDark
              ? "border-white/10 hover:bg-white/10"
              : "border-black/10 hover:bg-black/5"
          )}
        >
          Copy All Stats
        </button>
      </div>

      {/* Social media limits */}
      <div className="mt-6">
        <div
          className={cx(
            "text-xs uppercase tracking-wide",
            isDark ? "text-neutral-400" : "text-neutral-500"
          )}
        >
          Social Media Character Limits
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SOCIAL_LIMITS.map((s) => {
            const count = stats.characters;
            const pct = count > 0 ? Math.min((count / s.limit) * 100, 100) : 0;
            const over = count > s.limit;

            return (
              <div
                key={s.name}
                className={cx(
                  "rounded-xl border p-3",
                  isDark
                    ? "border-white/10 bg-neutral-900"
                    : "border-black/10 bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium">{s.name}</div>
                  <div
                    className={cx(
                      "text-xs tabular-nums font-mono",
                      over
                        ? "text-red-400"
                        : isDark
                          ? "text-neutral-400"
                          : "text-neutral-500"
                    )}
                  >
                    {formatNumber(count)}/{formatNumber(s.limit)}
                  </div>
                </div>
                <div
                  className={cx(
                    "mt-2 h-1.5 rounded-full overflow-hidden",
                    isDark ? "bg-neutral-800" : "bg-neutral-200"
                  )}
                >
                  <div
                    className={cx(
                      "h-full rounded-full transition-all duration-200",
                      over ? "bg-red-500" : pct > 80 ? "bg-yellow-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top keywords */}
      <div className="mt-6">
        <div
          className={cx(
            "text-xs uppercase tracking-wide",
            isDark ? "text-neutral-400" : "text-neutral-500"
          )}
        >
          Top Keywords (stop words {showStopWords ? "included" : "excluded"})
          <button
            type="button"
            onClick={() => setShowStopWords(!showStopWords)}
            className={cx(
              "ml-2 underline",
              isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            {showStopWords ? "exclude" : "include"}
          </button>
        </div>
        {topWords.length > 0 ? (
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {topWords.map(({ word, count }, i) => {
              const maxCount = topWords[0].count;
              const barPct = (count / maxCount) * 100;
              const density =
                stats.words > 0
                  ? ((count / stats.words) * 100).toFixed(1)
                  : "0";

              return (
                <div
                  key={word}
                  className={cx(
                    "rounded-xl border p-2 relative overflow-hidden",
                    isDark
                      ? "border-white/10 bg-neutral-900"
                      : "border-black/10 bg-white"
                  )}
                >
                  {/* Background bar */}
                  <div
                    className={cx(
                      "absolute inset-y-0 left-0 opacity-10",
                      isDark ? "bg-blue-400" : "bg-blue-500"
                    )}
                    style={{ width: `${barPct}%` }}
                  />
                  <div className="relative">
                    <div className="text-sm font-medium truncate">{word}</div>
                    <div
                      className={cx(
                        "text-xs tabular-nums",
                        isDark ? "text-neutral-400" : "text-neutral-500"
                      )}
                    >
                      {count}x · {density}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={cx(
              "mt-2 text-sm",
              isDark ? "text-neutral-500" : "text-neutral-400"
            )}
          >
            Start typing to see keyword frequency.
          </div>
        )}
      </div>

      {/* Keyboard shortcut hint */}
      <div
        className={cx(
          "mt-4 text-xs text-center",
          isDark ? "text-neutral-500" : "text-neutral-400"
        )}
      >
        Ctrl/⌘ + K focuses input · Ctrl/⌘ + L toggles theme
      </div>
    </div>
  );
}
