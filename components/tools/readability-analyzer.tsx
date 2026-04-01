"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Helpers ──────────────────────────────────────────────────── */
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  let count = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "")
    .match(/[aeiouy]{1,2}/g)?.length || 1;
  return Math.max(1, count);
}

function getSentences(text: string): string[] {
  return text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0);
}

function getWords(text: string): string[] {
  return text.match(/[a-zA-Z']+/g) || [];
}

// Dale-Chall familiar word list (top ~3000 - simplified subset of most common)
const DALE_CHALL_EASY = new Set([
  "a", "able", "about", "above", "across", "act", "add", "afraid", "after", "again",
  "age", "ago", "agree", "air", "all", "almost", "along", "already", "also", "always",
  "am", "among", "an", "and", "animal", "another", "answer", "any", "anything", "appear",
  "apple", "are", "area", "arm", "around", "art", "as", "ask", "at", "away", "baby",
  "back", "bad", "ball", "bank", "base", "be", "bear", "beat", "beautiful", "because",
  "become", "bed", "been", "before", "began", "begin", "behind", "believe", "below",
  "best", "better", "between", "big", "bird", "bit", "black", "blood", "blue", "board",
  "boat", "body", "book", "born", "both", "bottom", "box", "boy", "break", "bring",
  "brother", "brown", "build", "burn", "bus", "but", "buy", "by", "call", "came", "can",
  "car", "care", "carry", "case", "cat", "catch", "cause", "center", "certain", "change",
  "child", "children", "church", "city", "class", "clean", "clear", "close", "cold",
  "come", "common", "company", "complete", "could", "country", "course", "cover", "cross",
  "cry", "cut", "dark", "day", "dead", "deal", "dear", "deep", "did", "die", "different",
  "do", "does", "dog", "done", "door", "down", "draw", "dream", "drive", "drop", "dry",
  "during", "each", "ear", "early", "earth", "east", "eat", "end", "enough", "even",
  "evening", "ever", "every", "everyone", "everything", "eye", "face", "fact", "fall",
  "family", "far", "farm", "fast", "father", "feel", "feet", "few", "field", "fight",
  "fill", "find", "fine", "fire", "first", "fish", "five", "floor", "fly", "follow",
  "food", "foot", "for", "form", "found", "four", "free", "friend", "from", "front",
  "full", "game", "garden", "gave", "get", "girl", "give", "glad", "go", "god", "gold",
  "gone", "good", "got", "great", "green", "grew", "ground", "group", "grow", "had",
  "half", "hand", "happen", "happy", "hard", "has", "hat", "have", "he", "head", "hear",
  "heart", "heavy", "help", "her", "here", "high", "hill", "him", "his", "hit", "hold",
  "hole", "home", "hope", "horse", "hot", "house", "how", "however", "hundred", "I",
  "idea", "if", "important", "in", "inside", "interest", "into", "is", "it", "its",
  "job", "join", "just", "keep", "kind", "king", "knew", "know", "land", "large", "last",
  "late", "later", "lay", "lead", "learn", "leave", "left", "let", "letter", "life",
  "light", "like", "line", "list", "listen", "little", "live", "long", "look", "lose",
  "lost", "lot", "love", "low", "made", "make", "man", "many", "may", "me", "mean",
  "men", "might", "mind", "miss", "money", "month", "moon", "more", "morning", "most",
  "mother", "move", "much", "music", "must", "my", "name", "near", "need", "never",
  "new", "next", "night", "no", "north", "not", "nothing", "now", "number", "of", "off",
  "often", "oh", "old", "on", "once", "one", "only", "open", "or", "order", "other",
  "our", "out", "outside", "over", "own", "page", "paper", "part", "pass", "past",
  "pay", "people", "picture", "place", "plan", "plant", "play", "point", "poor", "power",
  "pretty", "problem", "pull", "put", "question", "quite", "rain", "ran", "read", "ready",
  "real", "red", "remember", "rest", "right", "river", "road", "rock", "room", "round",
  "run", "said", "same", "sat", "saw", "say", "school", "sea", "second", "see", "seem",
  "self", "send", "set", "several", "shall", "she", "ship", "short", "should", "show",
  "side", "since", "sister", "sit", "six", "sleep", "small", "snow", "so", "some",
  "something", "sometimes", "son", "song", "soon", "south", "stand", "star", "start",
  "state", "stay", "step", "still", "stood", "stop", "story", "strong", "study", "such",
  "sun", "sure", "table", "take", "talk", "tell", "ten", "than", "that", "the", "their",
  "them", "then", "there", "these", "they", "thing", "think", "third", "this", "those",
  "though", "thought", "three", "through", "time", "to", "today", "together", "told",
  "too", "took", "top", "town", "tree", "true", "try", "turn", "two", "under",
  "understand", "until", "up", "upon", "us", "use", "usual", "very", "voice", "walk",
  "want", "war", "warm", "was", "watch", "water", "way", "we", "well", "went", "were",
  "west", "what", "when", "where", "which", "while", "white", "who", "whole", "why",
  "will", "win", "window", "wish", "with", "without", "woman", "women", "word", "work",
  "world", "would", "write", "year", "yes", "yet", "you", "young", "your",
]);

interface ReadabilityScores {
  fleschEase: number;
  fleschKincaid: number;
  gunningFog: number;
  colemanLiau: number;
  smog: number;
  ari: number;
  daleChall: number;
  avgGradeLevel: number;
  sentences: { text: string; grade: number }[];
}

function calculateReadability(text: string): ReadabilityScores | null {
  const sentences = getSentences(text);
  const words = getWords(text);
  const totalWords = words.length;
  const totalSentences = sentences.length;

  if (totalWords < 30 || totalSentences < 2) return null;

  const syllableCounts = words.map(countSyllables);
  const totalSyllables = syllableCounts.reduce((a, b) => a + b, 0);
  const polysyllables = syllableCounts.filter((s) => s >= 3).length;
  const totalChars = words.join("").length;

  const wordsPerSentence = totalWords / totalSentences;
  const syllablesPerWord = totalSyllables / totalWords;

  // Flesch Reading Ease
  const fleschEase = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;

  // Flesch-Kincaid Grade Level
  const fleschKincaid = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;

  // Gunning Fog Index
  const complexWordPct = (polysyllables / totalWords) * 100;
  const gunningFog = 0.4 * (wordsPerSentence + complexWordPct);

  // Coleman-Liau Index
  const L = (totalChars / totalWords) * 100;
  const S = (totalSentences / totalWords) * 100;
  const colemanLiau = 0.0588 * L - 0.296 * S - 15.8;

  // SMOG Index
  const smog = 1.0430 * Math.sqrt(polysyllables * (30 / totalSentences)) + 3.1291;

  // Automated Readability Index
  const ari = 4.71 * (totalChars / totalWords) + 0.5 * (totalWords / totalSentences) - 21.43;

  // Dale-Chall
  const difficultWords = words.filter((w) => !DALE_CHALL_EASY.has(w.toLowerCase())).length;
  const difficultPct = (difficultWords / totalWords) * 100;
  let daleChall = 0.1579 * difficultPct + 0.0496 * wordsPerSentence;
  if (difficultPct > 5) daleChall += 3.6365;

  // Average grade level (excluding Flesch Ease which is a different scale)
  const grades = [fleschKincaid, gunningFog, colemanLiau, smog, ari];
  const avgGradeLevel = grades.reduce((a, b) => a + b, 0) / grades.length;

  // Per-sentence difficulty
  const sentenceGrades = sentences.map((sent) => {
    const sw = getWords(sent);
    if (sw.length === 0) return { text: sent, grade: 0 };
    const ss = sw.map(countSyllables);
    const totalSyl = ss.reduce((a, b) => a + b, 0);
    const grade = 0.39 * sw.length + 11.8 * (totalSyl / sw.length) - 15.59;
    return { text: sent, grade };
  });

  return {
    fleschEase: Math.max(0, Math.min(100, fleschEase)),
    fleschKincaid: Math.max(0, fleschKincaid),
    gunningFog: Math.max(0, gunningFog),
    colemanLiau: Math.max(0, colemanLiau),
    smog: Math.max(0, smog),
    ari: Math.max(0, ari),
    daleChall,
    avgGradeLevel: Math.max(0, avgGradeLevel),
    sentences: sentenceGrades,
  };
}

function getEaseLabel(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}

function getGradeAudience(grade: number): string {
  if (grade <= 6) return "Elementary school level. Accessible to nearly all readers.";
  if (grade <= 8) return "Middle school level. Good for general audiences.";
  if (grade <= 10) return "High school level. Suitable for informed general readers.";
  if (grade <= 12) return "Late high school level. Common in quality journalism.";
  if (grade <= 14) return "College level. Typical of academic and professional writing.";
  return "Graduate level. Dense, specialized content.";
}

export function ReadabilityAnalyzerTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState("");
  const [showSentences, setShowSentences] = useState(false);

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const scores = useMemo(() => calculateReadability(input), [input]);
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const cardBg = isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10";

  // Gauge color based on ease score
  function easeColor(score: number): string {
    if (score >= 70) return isDark ? "text-emerald-400" : "text-emerald-600";
    if (score >= 50) return isDark ? "text-amber-400" : "text-amber-600";
    return isDark ? "text-red-400" : "text-red-600";
  }

  function sentenceColor(grade: number): string {
    if (grade <= 8) return "";
    if (grade <= 12) return isDark ? "bg-amber-950/30 border-l-2 border-amber-500/40 pl-2" : "bg-amber-50 border-l-2 border-amber-400 pl-2";
    return isDark ? "bg-red-950/30 border-l-2 border-red-500/40 pl-2" : "bg-red-50 border-l-2 border-red-400 pl-2";
  }

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setInput(""); setCopied(""); setShowSentences(false); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="read-input" className="text-sm font-semibold block mb-2">
          Paste Text (minimum 30 words)
        </label>
        <textarea
          id="read-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here to analyze readability..."
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
      {scores && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          {/* Overall gauge */}
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold mb-2">Average Grade Level</h3>
            <div className={cx("text-4xl font-bold", easeColor(scores.fleschEase))}>
              {scores.avgGradeLevel.toFixed(1)}
            </div>
            <div className={cx("text-sm mt-1", muted)}>
              {getGradeAudience(scores.avgGradeLevel)}
            </div>
          </div>

          {/* Flesch Ease gauge */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Flesch Reading Ease</span>
              <span className={cx("text-sm font-bold", easeColor(scores.fleschEase))}>
                {scores.fleschEase.toFixed(1)} — {getEaseLabel(scores.fleschEase)}
              </span>
            </div>
            <div className={cx("w-full h-3 rounded-full overflow-hidden", isDark ? "bg-neutral-800" : "bg-neutral-200")}>
              <div
                className="h-full rounded-full transition-all bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500"
                style={{ width: `${Math.min(100, scores.fleschEase)}%` }}
              />
            </div>
            <div className={cx("flex justify-between text-xs mt-1", muted)}>
              <span>Very Difficult</span>
              <span>Standard</span>
              <span>Very Easy</span>
            </div>
          </div>

          {/* Score cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Flesch-Kincaid", value: scores.fleschKincaid.toFixed(1), unit: "grade" },
              { label: "Gunning Fog", value: scores.gunningFog.toFixed(1), unit: "grade" },
              { label: "Coleman-Liau", value: scores.colemanLiau.toFixed(1), unit: "grade" },
              { label: "SMOG Index", value: scores.smog.toFixed(1), unit: "grade" },
              { label: "ARI", value: scores.ari.toFixed(1), unit: "grade" },
              { label: "Dale-Chall", value: scores.daleChall.toFixed(1), unit: "score" },
            ].map((s) => (
              <div key={s.label} className={cx("rounded-lg border p-3 text-center", cardBg)}>
                <div className="text-xs font-semibold mb-1">{s.label}</div>
                <div className="text-lg font-bold font-mono">{s.value}</div>
                <div className={cx("text-xs", muted)}>{s.unit}</div>
              </div>
            ))}
          </div>

          {/* Benchmarks */}
          <div className={cx("rounded-lg border p-4 mb-6", cardBg)}>
            <h4 className="text-xs font-semibold mb-2">Comparison Benchmarks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className={cx("p-2 rounded", isDark ? "bg-emerald-950/30" : "bg-emerald-50")}>
                <div className="font-semibold">Harry Potter</div>
                <div className={muted}>~6th grade · Flesch 80+</div>
              </div>
              <div className={cx("p-2 rounded", isDark ? "bg-amber-950/30" : "bg-amber-50")}>
                <div className="font-semibold">New York Times</div>
                <div className={muted}>~10th grade · Flesch 50–60</div>
              </div>
              <div className={cx("p-2 rounded", isDark ? "bg-red-950/30" : "bg-red-50")}>
                <div className="font-semibold">Academic Journals</div>
                <div className={muted}>~14th grade · Flesch 20–30</div>
              </div>
            </div>
          </div>

          {/* Sentence-level highlighting */}
          <div className="mb-4">
            <button
              onClick={() => setShowSentences(!showSentences)}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", showSentences ? btnActive : btnBase)}
            >
              {showSentences ? "Hide" : "Show"} Sentence Analysis
            </button>
          </div>

          {showSentences && (
            <div className={cx("rounded-lg border p-4 space-y-2", cardBg)}>
              <div className={cx("flex gap-4 text-xs mb-3", muted)}>
                <span>Normal = grade 8 or below</span>
                <span className={isDark ? "text-amber-400" : "text-amber-600"}>Yellow = grade 9–12</span>
                <span className={isDark ? "text-red-400" : "text-red-600"}>Red = grade 13+</span>
              </div>
              {scores.sentences.map((s, i) => (
                <div key={i} className={cx("rounded p-2 text-xs", sentenceColor(s.grade))}>
                  <span className="font-mono mr-2">[{s.grade.toFixed(1)}]</span>
                  {s.text}
                </div>
              ))}
            </div>
          )}

          {/* Copy results */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                const report = [
                  `Readability Analysis`,
                  `Average Grade Level: ${scores.avgGradeLevel.toFixed(1)}`,
                  `Flesch Reading Ease: ${scores.fleschEase.toFixed(1)} (${getEaseLabel(scores.fleschEase)})`,
                  `Flesch-Kincaid: ${scores.fleschKincaid.toFixed(1)}`,
                  `Gunning Fog: ${scores.gunningFog.toFixed(1)}`,
                  `Coleman-Liau: ${scores.colemanLiau.toFixed(1)}`,
                  `SMOG: ${scores.smog.toFixed(1)}`,
                  `ARI: ${scores.ari.toFixed(1)}`,
                  `Dale-Chall: ${scores.daleChall.toFixed(1)}`,
                ].join("\n");
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
    </div>
  );
}
