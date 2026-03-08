"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Constants ────────────────────────────────────────────────── */
const AI_FILLER_PHRASES = [
  "in today's world", "it's crucial to", "plays a vital role",
  "when it comes to", "a wide range of", "whether you're a",
  "it's important to note", "it's worth mentioning",
  "in today's digital age", "in today's fast-paced",
];

const TRANSITION_WORDS = [
  "furthermore", "moreover", "additionally", "consequently",
  "in conclusion", "nevertheless", "nonetheless", "subsequently",
  "hence", "therefore", "thus", "likewise", "similarly",
  "in addition", "as a result", "on the other hand",
  "in contrast", "for instance", "for example", "specifically",
  "in particular", "notably", "significantly", "ultimately",
];

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "to", "of", "in", "for", "on", "with", "at", "by", "from", "as",
  "into", "through", "during", "before", "after", "above", "below",
  "between", "under", "again", "further", "then", "once", "here",
  "there", "when", "where", "why", "how", "all", "each", "every",
  "both", "few", "more", "most", "other", "some", "such", "no",
  "nor", "not", "only", "own", "same", "so", "than", "too", "very",
  "just", "because", "but", "and", "or", "if", "while", "about",
  "up", "out", "off", "over", "its", "it", "this", "that", "these",
  "those", "i", "me", "my", "we", "our", "you", "your", "he", "him",
  "his", "she", "her", "they", "them", "their", "what", "which", "who",
]);

/* ─── Analysis helpers ─────────────────────────────────────────── */
function getSentences(text: string): string[] {
  return text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0);
}

function getWords(text: string): string[] {
  return text.toLowerCase().match(/[a-z']+/g) || [];
}

function getParagraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 0);
}

function stdDev(arr: number[]): number {
  if (arr.length < 2) return 0;
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const variance = arr.reduce((sum, val) => sum + (val - mean) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  let count = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g)?.length || 1;
  return Math.max(1, count);
}

type Rating = "green" | "yellow" | "red";

interface Metric {
  label: string;
  value: string;
  rating: Rating;
  explanation: string;
}

function analyze(text: string): { metrics: Metric[]; overallScore: number } {
  const sentences = getSentences(text);
  const words = getWords(text);
  const paragraphs = getParagraphs(text);
  const totalWords = words.length;

  if (totalWords < 100) return { metrics: [], overallScore: -1 };

  const metrics: Metric[] = [];
  let scoreSum = 0;
  let scoreCount = 0;

  // 1. Sentence length uniformity
  const sentLengths = sentences.map((s) => getWords(s).length);
  const sentSD = stdDev(sentLengths);
  const sentRating: Rating = sentSD < 4 ? "red" : sentSD < 7 ? "yellow" : "green";
  metrics.push({
    label: "Sentence Length Uniformity",
    value: `SD = ${sentSD.toFixed(1)} words`,
    rating: sentRating,
    explanation: "Standard deviation of sentence lengths. AI text tends to have uniform sentence lengths (SD < 5). Human text is more varied (SD > 8).",
  });
  scoreSum += sentRating === "green" ? 0 : sentRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // 2. Vocabulary diversity (type-token ratio)
  const uniqueWords = new Set(words);
  const ttr = uniqueWords.size / totalWords;
  const ttrRating: Rating = ttr < 0.45 ? "red" : ttr < 0.55 ? "yellow" : "green";
  metrics.push({
    label: "Vocabulary Diversity",
    value: `${(ttr * 100).toFixed(1)}% unique words`,
    rating: ttrRating,
    explanation: "Type-token ratio (unique words / total words). AI typically produces 40–60% diversity. Human writing usually exceeds 50%.",
  });
  scoreSum += ttrRating === "green" ? 0 : ttrRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // 3. Transition word density
  const textLower = text.toLowerCase();
  let transCount = 0;
  for (const tw of TRANSITION_WORDS) {
    const regex = new RegExp(`\\b${tw}\\b`, "gi");
    const matches = textLower.match(regex);
    if (matches) transCount += matches.length;
  }
  const transDensity = (transCount / totalWords) * 100;
  const transRating: Rating = transDensity > 3 ? "red" : transDensity > 1.5 ? "yellow" : "green";
  metrics.push({
    label: "Transition Word Density",
    value: `${transDensity.toFixed(2)}% (${transCount} found)`,
    rating: transRating,
    explanation: "Percentage of transition words like 'furthermore', 'moreover', 'additionally'. AI text often overuses these connectors.",
  });
  scoreSum += transRating === "green" ? 0 : transRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // 4. Repeated phrase detection (3-grams appearing 2+ times)
  const trigrams: Record<string, number> = {};
  for (let i = 0; i < words.length - 2; i++) {
    if (STOP_WORDS.has(words[i]) && STOP_WORDS.has(words[i + 1]) && STOP_WORDS.has(words[i + 2])) continue;
    const tri = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    trigrams[tri] = (trigrams[tri] || 0) + 1;
  }
  const repeatedPhrases = Object.entries(trigrams).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]);
  const repeatCount = repeatedPhrases.length;
  const repeatRating: Rating = repeatCount > 8 ? "red" : repeatCount > 3 ? "yellow" : "green";
  metrics.push({
    label: "Repeated Phrases (3+ words)",
    value: `${repeatCount} phrase${repeatCount !== 1 ? "s" : ""} repeated 2+ times`,
    rating: repeatRating,
    explanation: "Three-word phrases appearing multiple times. AI text tends to repeat structural phrases. Human writers vary phrasing more naturally.",
  });
  scoreSum += repeatRating === "green" ? 0 : repeatRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // 5. Paragraph length variance
  const paraSentCounts = paragraphs.map((p) => getSentences(p).length);
  const paraSD = stdDev(paraSentCounts);
  const paraRating: Rating = paraSD < 1 ? "red" : paraSD < 2.5 ? "yellow" : "green";
  metrics.push({
    label: "Paragraph Length Variance",
    value: `SD = ${paraSD.toFixed(1)} sentences`,
    rating: paraRating,
    explanation: "Standard deviation of paragraph lengths. AI tends to produce paragraphs of similar size. Human writing has more varied paragraph structure.",
  });
  scoreSum += paraRating === "green" ? 0 : paraRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // 6. Passive voice estimate
  const passivePattern = /\b(was|were|been|is|are|be|being)\s+\w+ed\b/gi;
  const passiveMatches = text.match(passivePattern) || [];
  const passivePct = (passiveMatches.length / sentences.length) * 100;
  const passiveRating: Rating = passivePct > 30 ? "yellow" : "green";
  metrics.push({
    label: "Passive Voice Estimate",
    value: `${passivePct.toFixed(1)}% of sentences`,
    rating: passiveRating,
    explanation: "Estimated passive voice constructions. This metric alone is not strongly indicative — it varies by subject and style.",
  });
  scoreSum += passiveRating === "green" ? 0 : passiveRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // 7. Average word length & syllables
  const avgWordLen = words.reduce((sum, w) => sum + w.length, 0) / totalWords;
  const avgSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0) / totalWords;
  const wordLenRating: Rating = "green"; // informational
  metrics.push({
    label: "Average Word Length",
    value: `${avgWordLen.toFixed(1)} chars · ${avgSyllables.toFixed(2)} syllables/word`,
    rating: wordLenRating,
    explanation: "Average characters and syllables per word. This is an informational metric — both AI and human writing vary widely here.",
  });

  // 8. Em dash & semicolon frequency
  const emDashCount = (text.match(/—|--|–/g) || []).length;
  const semicolonCount = (text.match(/;/g) || []).length;
  const per100 = totalWords / 100;
  const emDashPer100 = per100 > 0 ? emDashCount / per100 : 0;
  const semiPer100 = per100 > 0 ? semicolonCount / per100 : 0;
  const punctRating: Rating = emDashPer100 < 0.2 && semiPer100 < 0.2 ? "yellow" : "green";
  metrics.push({
    label: "Em Dash & Semicolon Frequency",
    value: `${emDashPer100.toFixed(2)} em dashes · ${semiPer100.toFixed(2)} semicolons per 100 words`,
    rating: punctRating,
    explanation: "AI text rarely uses em dashes and semicolons. Human writers tend to use these punctuation marks more freely.",
  });
  scoreSum += punctRating === "green" ? 0 : punctRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // 9. AI filler phrase count
  let fillerCount = 0;
  for (const phrase of AI_FILLER_PHRASES) {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    const matches = textLower.match(regex);
    if (matches) fillerCount += matches.length;
  }
  const fillerRating: Rating = fillerCount > 4 ? "red" : fillerCount > 1 ? "yellow" : "green";
  metrics.push({
    label: "AI Filler Phrase Count",
    value: `${fillerCount} phrase${fillerCount !== 1 ? "s" : ""} detected`,
    rating: fillerRating,
    explanation: `Phrases like "in today's world", "it's crucial to", "plays a vital role" are statistically overrepresented in AI-generated text.`,
  });
  scoreSum += fillerRating === "green" ? 0 : fillerRating === "yellow" ? 0.5 : 1;
  scoreCount++;

  // Overall score: 0 = very human-like patterns, 100 = very AI-like patterns
  const overallScore = scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 100) : 0;

  return { metrics, overallScore };
}

/* ─── Component ────────────────────────────────────────────────── */
export function AiWritingAnalyzerTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const { metrics, overallScore } = useMemo(() => analyze(input), [input]);
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const warnBg = isDark ? "bg-amber-950/40 border-amber-500/30 text-amber-200" : "bg-amber-50 border-amber-400/40 text-amber-800";

  const ratingColors: Record<Rating, string> = {
    green: isDark ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-300" : "border-emerald-500/40 bg-emerald-50 text-emerald-700",
    yellow: isDark ? "border-amber-500/40 bg-amber-950/30 text-amber-300" : "border-amber-500/40 bg-amber-50 text-amber-700",
    red: isDark ? "border-red-500/40 bg-red-950/30 text-red-300" : "border-red-500/40 bg-red-50 text-red-700",
  };

  const ratingLabels: Record<Rating, string> = {
    green: "Human-typical",
    yellow: "Ambiguous",
    red: "AI-typical",
  };

  const scoreLabel = overallScore <= 25 ? "Human-typical patterns" : overallScore <= 55 ? "Mixed patterns" : "AI-typical patterns";
  const scoreColor = overallScore <= 25 ? "text-emerald-400" : overallScore <= 55 ? "text-amber-400" : "text-red-400";

  return (
    <div className="space-y-4">
      {/* Disclaimer — TOP */}
      <div className={cx("rounded-xl border p-4 text-xs", warnBg)}>
        <strong>Disclaimer:</strong> This tool analyzes statistical writing patterns only. It cannot determine whether text was written by AI or a human. Writing patterns are affected by many factors including ESL status, editing, and individual style. Use as one data point only — never as proof.
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="ai-input" className="text-sm font-semibold block mb-2">
          Paste Text (minimum 100 words)
        </label>
        <textarea
          id="ai-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste at least 100 words of text to analyze writing patterns..."
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {wordCount} word{wordCount !== 1 ? "s" : ""} · {input.length} char{input.length !== 1 ? "s" : ""}
          {wordCount > 0 && wordCount < 100 && (
            <span className="text-amber-400 ml-2">Need at least {100 - wordCount} more words</span>
          )}
        </div>
      </div>

      {/* Results */}
      {metrics.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          {/* Overall score */}
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold mb-2">Writing Pattern Score</h3>
            <div className={cx("text-4xl font-bold", scoreColor)}>{overallScore}</div>
            <div className={cx("text-sm mt-1", muted)}>{scoreLabel}</div>
            <div className={cx("flex items-center justify-center gap-4 mt-3 text-xs", muted)}>
              <span>0 = Human-typical</span>
              <span>50 = Mixed</span>
              <span>100 = AI-typical</span>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className={cx("rounded-lg border p-3", ratingColors[m.rating])}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold">{m.label}</h4>
                  <span className="text-xs font-medium">{ratingLabels[m.rating]}</span>
                </div>
                <div className="text-sm font-mono font-bold">{m.value}</div>
                <p className={cx("text-xs mt-2 opacity-80")}>{m.explanation}</p>
              </div>
            ))}
          </div>

          {/* Copy results */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                const report = `Writing Pattern Score: ${overallScore}/100 (${scoreLabel})\n\n` +
                  metrics.map((m) => `${m.label}: ${m.value} [${ratingLabels[m.rating]}]`).join("\n");
                copyText(report, "results");
              }}
              className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
              aria-label="Copy results"
            >
              {copied === "results" ? "Copied!" : "Copy Results"}
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer — BOTTOM */}
      {metrics.length > 0 && (
        <div className={cx("rounded-xl border p-4 text-xs", warnBg)}>
          <strong>Disclaimer:</strong> This tool analyzes statistical writing patterns only. It cannot determine whether text was written by AI or a human. Writing patterns are affected by many factors including ESL status, editing, and individual style. Use as one data point only — never as proof.
        </div>
      )}
    </div>
  );
}
