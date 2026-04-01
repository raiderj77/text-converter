"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Helpers ──────────────────────────────────────────────────── */
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
  "their", "what", "which", "who",
]);

function getWords(text: string): string[] {
  return text.match(/[a-zA-Z']+/g) || [];
}

function getSentences(text: string): string[] {
  return text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0);
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  let count = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g)?.length || 1;
  return Math.max(1, count);
}

function getNgrams(words: string[], n: number): Record<string, number> {
  const map: Record<string, number> = {};
  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n).join(" ");
    map[gram] = (map[gram] || 0) + 1;
  }
  return map;
}

interface Stats {
  words: number;
  charsWithSpaces: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  uniqueWords: number;
  vocabRichness: number;
  lexicalDensity: number;
  avgSentenceLen: number;
  minSentenceLen: number;
  maxSentenceLen: number;
  avgParagraphLen: number;
  avgWordLen: number;
  questions: number;
  exclamations: number;
  readingTime: string;
  speakingTime: string;
  fleschKincaid: number;
  topWords: [string, number][];
  topBigrams: [string, number][];
  topTrigrams: [string, number][];
  sentenceLengths: number[];
}

function analyze(text: string): Stats | null {
  if (!text.trim()) return null;

  const words = getWords(text);
  const lowerWords = words.map((w) => w.toLowerCase());
  const sentences = getSentences(text);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const lines = text.split("\n").length;
  const totalWords = words.length;

  if (totalWords === 0) return null;

  const uniqueSet = new Set(lowerWords);
  const contentWords = lowerWords.filter((w) => !STOP_WORDS.has(w));

  const sentLengths = sentences.map((s) => getWords(s).length);
  const avgSentenceLen = sentLengths.length > 0 ? sentLengths.reduce((a, b) => a + b, 0) / sentLengths.length : 0;

  const paraSentCounts = paragraphs.map((p) => getSentences(p).length);
  const avgParagraphLen = paraSentCounts.length > 0 ? paraSentCounts.reduce((a, b) => a + b, 0) / paraSentCounts.length : 0;

  const avgWordLen = words.reduce((sum, w) => sum + w.length, 0) / totalWords;

  const questions = (text.match(/\?/g) || []).length;
  const exclamations = (text.match(/!/g) || []).length;

  const readingMinutes = totalWords / 238;
  const speakingMinutes = totalWords / 150;

  // Flesch-Kincaid
  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  const fk = sentences.length > 0
    ? 0.39 * (totalWords / sentences.length) + 11.8 * (totalSyllables / totalWords) - 15.59
    : 0;

  // Top words (excluding stop words)
  const wordFreq: Record<string, number> = {};
  for (const w of lowerWords) {
    if (!STOP_WORDS.has(w) && w.length > 1) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    }
  }
  const topWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 20);

  // Bigrams & trigrams
  const bigrams = getNgrams(lowerWords, 2);
  const trigrams = getNgrams(lowerWords, 3);
  const topBigrams = Object.entries(bigrams).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topTrigrams = Object.entries(trigrams).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const formatTime = (mins: number) => {
    if (mins < 1) return `${Math.round(mins * 60)}s`;
    const m = Math.floor(mins);
    const s = Math.round((mins - m) * 60);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  };

  return {
    words: totalWords,
    charsWithSpaces: text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    sentences: sentences.length,
    paragraphs: paragraphs.length,
    lines,
    uniqueWords: uniqueSet.size,
    vocabRichness: (uniqueSet.size / totalWords) * 100,
    lexicalDensity: (contentWords.length / totalWords) * 100,
    avgSentenceLen,
    minSentenceLen: sentLengths.length > 0 ? Math.min(...sentLengths) : 0,
    maxSentenceLen: sentLengths.length > 0 ? Math.max(...sentLengths) : 0,
    avgParagraphLen,
    avgWordLen,
    questions,
    exclamations,
    readingTime: formatTime(readingMinutes),
    speakingTime: formatTime(speakingMinutes),
    fleschKincaid: Math.max(0, fk),
    topWords,
    topBigrams,
    topTrigrams,
    sentenceLengths: sentLengths,
  };
}

/* ─── Bar chart component ──────────────────────────────────────── */
function BarChart({ data, maxBars, isDark }: { data: [string, number][]; maxBars: number; isDark: boolean }) {
  const items = data.slice(0, maxBars);
  const max = items.length > 0 ? Math.max(...items.map(([, v]) => v)) : 1;
  const barColor = isDark ? "bg-emerald-500/60" : "bg-emerald-500/40";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-1">
      {items.map(([label, count]) => (
        <div key={label} className="flex items-center gap-2 text-xs">
          <span className="w-24 truncate text-right font-mono">{label}</span>
          <div className="flex-1 h-4 rounded overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
            <div className={cx("h-full rounded", barColor)} style={{ width: `${(count / max) * 100}%` }} />
          </div>
          <span className={cx("w-8 text-right font-mono", muted)}>{count}</span>
        </div>
      ))}
    </div>
  );
}

function Histogram({ data, isDark }: { data: number[]; isDark: boolean }) {
  if (data.length === 0) return null;
  // Bucket sentence lengths into groups of 5
  const maxLen = Math.max(...data);
  const bucketSize = 5;
  const buckets: Record<string, number> = {};
  for (const len of data) {
    const bucket = Math.floor(len / bucketSize) * bucketSize;
    const label = `${bucket}-${bucket + bucketSize - 1}`;
    buckets[label] = (buckets[label] || 0) + 1;
  }
  const entries = Object.entries(buckets).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  return <BarChart data={entries} maxBars={20} isDark={isDark} />;
}

/* ─── Main Component ───────────────────────────────────────────── */
export function TextStatisticsTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const stats = useMemo(() => analyze(input), [input]);
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const cardBg = isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10";

  const handleExport = useCallback(() => {
    if (!stats) return;
    const report = [
      "Text Statistics Report",
      "=".repeat(40),
      "",
      `Words: ${stats.words}`,
      `Characters (with spaces): ${stats.charsWithSpaces}`,
      `Characters (no spaces): ${stats.charsNoSpaces}`,
      `Sentences: ${stats.sentences}`,
      `Paragraphs: ${stats.paragraphs}`,
      `Lines: ${stats.lines}`,
      "",
      `Unique Words: ${stats.uniqueWords}`,
      `Vocabulary Richness: ${stats.vocabRichness.toFixed(1)}%`,
      `Lexical Density: ${stats.lexicalDensity.toFixed(1)}%`,
      "",
      `Avg Sentence Length: ${stats.avgSentenceLen.toFixed(1)} words`,
      `Min Sentence Length: ${stats.minSentenceLen} words`,
      `Max Sentence Length: ${stats.maxSentenceLen} words`,
      `Avg Paragraph Length: ${stats.avgParagraphLen.toFixed(1)} sentences`,
      `Avg Word Length: ${stats.avgWordLen.toFixed(1)} chars`,
      "",
      `Questions: ${stats.questions}`,
      `Exclamations: ${stats.exclamations}`,
      `Reading Time: ${stats.readingTime}`,
      `Speaking Time: ${stats.speakingTime}`,
      `Flesch-Kincaid Grade: ${stats.fleschKincaid.toFixed(1)}`,
      "",
      "Top 20 Words:",
      ...stats.topWords.map(([w, c]) => `  ${w}: ${c}`),
      "",
      "Top 10 Bigrams:",
      ...stats.topBigrams.map(([w, c]) => `  ${w}: ${c}`),
      "",
      "Top 10 Trigrams:",
      ...stats.topTrigrams.map(([w, c]) => `  ${w}: ${c}`),
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-statistics.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [stats]);

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        {stats && (
          <button
            onClick={handleExport}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
          >
            Export Report
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
        <label htmlFor="stats-input" className="text-sm font-semibold block mb-2">
          Paste Text to Analyze
        </label>
        <textarea
          id="stats-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here for comprehensive statistical analysis..."
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {wordCount} word{wordCount !== 1 ? "s" : ""} · {input.length} char{input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Results */}
      {stats && (
        <div aria-live="polite" className="space-y-4">
          {/* Basic counts */}
          <div className={cx("rounded-xl border p-4", base)}>
            <h3 className="text-sm font-semibold mb-3">Basic Counts</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { label: "Words", value: stats.words },
                { label: "Chars (spaces)", value: stats.charsWithSpaces },
                { label: "Chars (no spaces)", value: stats.charsNoSpaces },
                { label: "Sentences", value: stats.sentences },
                { label: "Paragraphs", value: stats.paragraphs },
                { label: "Lines", value: stats.lines },
              ].map((s) => (
                <div key={s.label} className={cx("rounded-lg border p-2 text-center", cardBg)}>
                  <div className="text-lg font-bold font-mono">{s.value.toLocaleString()}</div>
                  <div className={cx("text-xs", muted)}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary & Structure */}
          <div className={cx("rounded-xl border p-4", base)}>
            <h3 className="text-sm font-semibold mb-3">Vocabulary & Structure</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Vocabulary Richness", value: `${stats.vocabRichness.toFixed(1)}%` },
                { label: "Lexical Density", value: `${stats.lexicalDensity.toFixed(1)}%` },
                { label: "Unique Words", value: stats.uniqueWords.toLocaleString() },
                { label: "Avg Word Length", value: `${stats.avgWordLen.toFixed(1)} chars` },
                { label: "Avg Sentence", value: `${stats.avgSentenceLen.toFixed(1)} words` },
                { label: "Shortest Sentence", value: `${stats.minSentenceLen} words` },
                { label: "Longest Sentence", value: `${stats.maxSentenceLen} words` },
                { label: "Avg Paragraph", value: `${stats.avgParagraphLen.toFixed(1)} sent.` },
              ].map((s) => (
                <div key={s.label} className={cx("rounded-lg border p-2 text-center", cardBg)}>
                  <div className="text-sm font-bold font-mono">{s.value}</div>
                  <div className={cx("text-xs", muted)}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Time & Readability */}
          <div className={cx("rounded-xl border p-4", base)}>
            <h3 className="text-sm font-semibold mb-3">Time & Readability</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "Reading Time", value: stats.readingTime },
                { label: "Speaking Time", value: stats.speakingTime },
                { label: "FK Grade", value: stats.fleschKincaid.toFixed(1) },
                { label: "Questions", value: stats.questions },
                { label: "Exclamations", value: stats.exclamations },
              ].map((s) => (
                <div key={s.label} className={cx("rounded-lg border p-2 text-center", cardBg)}>
                  <div className="text-sm font-bold font-mono">{s.value}</div>
                  <div className={cx("text-xs", muted)}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentence Length Histogram */}
          {stats.sentenceLengths.length > 1 && (
            <div className={cx("rounded-xl border p-4", base)}>
              <h3 className="text-sm font-semibold mb-3">Sentence Length Distribution (words per sentence)</h3>
              <Histogram data={stats.sentenceLengths} isDark={isDark} />
            </div>
          )}

          {/* Top Words */}
          {stats.topWords.length > 0 && (
            <div className={cx("rounded-xl border p-4", base)}>
              <h3 className="text-sm font-semibold mb-3">Most Common Words (excluding stop words)</h3>
              <BarChart data={stats.topWords} maxBars={20} isDark={isDark} />
            </div>
          )}

          {/* Bigrams & Trigrams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.topBigrams.length > 0 && (
              <div className={cx("rounded-xl border p-4", base)}>
                <h3 className="text-sm font-semibold mb-3">Top Bigrams</h3>
                <BarChart data={stats.topBigrams} maxBars={10} isDark={isDark} />
              </div>
            )}
            {stats.topTrigrams.length > 0 && (
              <div className={cx("rounded-xl border p-4", base)}>
                <h3 className="text-sm font-semibold mb-3">Top Trigrams</h3>
                <BarChart data={stats.topTrigrams} maxBars={10} isDark={isDark} />
              </div>
            )}
          </div>

          {/* Copy */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                const summary = `Words: ${stats.words} | Sentences: ${stats.sentences} | FK Grade: ${stats.fleschKincaid.toFixed(1)} | Reading: ${stats.readingTime}`;
                copyText(summary, "summary");
              }}
              className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
              aria-label="Copy summary"
            >
              {copied === "summary" ? "Copied!" : "Copy Summary"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
