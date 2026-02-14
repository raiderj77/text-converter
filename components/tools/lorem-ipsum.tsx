"use client";

import { useEffect, useMemo, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/**
 * Standard Lorem Ipsum corpus broken into words.
 * We generate text by randomly assembling from this pool,
 * starting with the classic "Lorem ipsum dolor sit amet..." opener.
 */
const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "ac", "accumsan",
  "aliquet", "ante", "arcu", "at", "auctor", "augue", "bibendum", "blandit",
  "condimentum", "congue", "consequat", "cras", "curabitur", "cursus",
  "dapibus", "diam", "dictum", "dignissim", "donec", "efficitur", "egestas",
  "elementum", "eleifend", "eros", "etiam", "eu", "euismod", "facilisi",
  "faucibus", "felis", "fermentum", "finibus", "fringilla", "fusce",
  "gravida", "habitant", "hendrerit", "iaculis", "imperdiet", "integer",
  "interdum", "justo", "lacinia", "lacus", "laoreet", "lectus", "leo",
  "libero", "ligula", "lobortis", "luctus", "maecenas", "massa", "mattis",
  "mauris", "maximus", "metus", "mi", "morbi", "nam", "nec", "neque",
  "nibh", "nunc", "odio", "orci", "ornare", "pellentesque", "pharetra",
  "placerat", "porta", "posuere", "potenti", "praesent", "pretium", "proin",
  "pulvinar", "purus", "quam", "quisque", "rhoncus", "risus", "rutrum",
  "sagittis", "sapien", "scelerisque", "semper", "senectus", "sodales",
  "sollicitudin", "suscipit", "suspendisse", "tellus", "tincidunt", "tortor",
  "tristique", "turpis", "ultrices", "ultricies", "urna", "varius",
  "vehicula", "vel", "vestibulum", "vitae", "vivamus", "viverra", "volutpat",
  "vulputate",
];

const CLASSIC_OPENER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateSentence(minWords: number = 6, maxWords: number = 16): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    words.push(randomWord());
  }
  // Add a comma somewhere in longer sentences
  if (len > 8) {
    const commaPos = 3 + Math.floor(Math.random() * (len - 6));
    words[commaPos] = words[commaPos] + ",";
  }
  return capitalize(words.join(" ")) + ".";
}

function generateParagraph(minSentences: number = 4, maxSentences: number = 8): string {
  const len = minSentences + Math.floor(Math.random() * (maxSentences - minSentences + 1));
  const sentences: string[] = [];
  for (let i = 0; i < len; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

type GenMode = "paragraphs" | "sentences" | "words";

function generateText(
  mode: GenMode,
  count: number,
  startWithLorem: boolean
): string {
  if (count <= 0) return "";

  if (mode === "words") {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      words.push(randomWord());
    }
    let result = words.join(" ");
    if (startWithLorem) {
      // Replace first few words with the classic opener words
      const openerWords = ["lorem", "ipsum", "dolor", "sit", "amet"];
      const replaceCount = Math.min(openerWords.length, count);
      const resultWords = result.split(" ");
      for (let i = 0; i < replaceCount; i++) {
        resultWords[i] = openerWords[i];
      }
      result = resultWords.join(" ");
    }
    return capitalize(result) + ".";
  }

  if (mode === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      sentences.push(generateSentence());
    }
    let result = sentences.join(" ");
    if (startWithLorem) {
      result = CLASSIC_OPENER + " " + sentences.slice(1).join(" ");
    }
    return result;
  }

  // paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph());
  }
  if (startWithLorem) {
    paragraphs[0] = CLASSIC_OPENER + " " + paragraphs[0].split(". ").slice(1).join(". ");
  }
  return paragraphs.join("\n\n");
}

export function LoremIpsumTool() {
  const { isDark } = useTheme();
  const [mode, setMode] = useState<GenMode>("paragraphs");
  const [count, setCount] = useState(5);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [toast, setToast] = useState("");
  const [seed, setSeed] = useState(0);

  const output = useMemo(
    () => generateText(mode, count, startWithLorem),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, count, startWithLorem, seed]
  );

  // Stats
  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  function regenerate() {
    setSeed((s) => s + 1);
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  return (
    <div>
      {/* Controls */}
      <div
        className={cx(
          "rounded-2xl border shadow-sm",
          isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
        )}
      >
        <div
          className={cx(
            "px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Generator Settings</div>
        </div>
        <div className="p-4 space-y-4">
          {/* Mode selector */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-2",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Generate by
            </div>
            <div className="flex gap-2">
              {(["paragraphs", "sentences", "words"] as GenMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    if (m === "words" && count < 10) setCount(50);
                    if (m === "sentences" && count > 50) setCount(10);
                    if (m === "paragraphs" && count > 20) setCount(5);
                  }}
                  className={cx(
                    "rounded-xl px-4 py-2 text-sm border transition-colors capitalize",
                    mode === m
                      ? isDark
                        ? "border-emerald-500/40 bg-emerald-500/10 font-semibold"
                        : "border-emerald-500/40 bg-emerald-50 font-semibold"
                      : isDark
                        ? "border-white/10 hover:bg-white/5"
                        : "border-black/10 hover:bg-black/5"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-2",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Number of {mode}: {count}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={mode === "words" ? 5 : 1}
                max={mode === "words" ? 500 : mode === "sentences" ? 50 : 20}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="flex-1"
              />
              <input
                type="number"
                min={1}
                max={mode === "words" ? 500 : mode === "sentences" ? 50 : 20}
                value={count}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  if (!isNaN(v) && v > 0) setCount(v);
                }}
                className={cx(
                  "w-20 rounded-xl border px-3 py-1.5 text-sm text-center outline-none",
                  isDark
                    ? "border-white/10 bg-neutral-950"
                    : "border-black/10 bg-neutral-50"
                )}
              />
            </div>
          </div>

          {/* Start with Lorem */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStartWithLorem(!startWithLorem)}
              className={cx(
                "w-5 h-5 rounded border flex items-center justify-center text-xs shrink-0",
                startWithLorem
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : isDark
                    ? "border-white/20"
                    : "border-black/20"
              )}
            >
              {startWithLorem ? "✓" : ""}
            </button>
            <div
              className={cx(
                "text-sm",
                isDark ? "text-neutral-200" : "text-neutral-700"
              )}
            >
              Start with classic "Lorem ipsum dolor sit amet..."
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={regenerate}
              className={cx(
                "rounded-xl px-4 py-2 text-sm border transition-colors",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
            >
              Regenerate
            </button>
            <button
              type="button"
              onClick={copyOutput}
              className={cx(
                "rounded-xl px-4 py-2 text-sm border transition-colors",
                isDark
                  ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
              )}
            >
              Copy Text
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        className={cx(
          "mt-3 flex items-center gap-4 px-1",
          isDark ? "text-neutral-400" : "text-neutral-500"
        )}
      >
        <span className="text-xs">{formatNumber(wordCount)} words</span>
        <span className="text-xs">{formatNumber(charCount)} characters</span>
        <span className="text-xs">{count} {mode}</span>
      </div>

      {/* Output */}
      <div
        className={cx(
          "mt-3 rounded-2xl border shadow-sm",
          isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
        )}
      >
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Generated Text</div>
          <button
            type="button"
            onClick={copyOutput}
            className={cx(
              "text-sm rounded-xl px-3 py-1.5 border transition-colors",
              isDark
                ? "border-white/10 hover:bg-white/10"
                : "border-black/10 hover:bg-black/5"
            )}
          >
            Copy
          </button>
        </div>
        <div className="p-4">
          <div
            className={cx(
              "whitespace-pre-wrap text-sm leading-7",
              isDark ? "text-neutral-200" : "text-neutral-700"
            )}
          >
            {output || "\u00A0"}
          </div>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div
        className={cx(
          "mt-3 text-xs text-center",
          isDark ? "text-neutral-500" : "text-neutral-400"
        )}
      >
        Ctrl/⌘ + L toggles theme
      </div>

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
