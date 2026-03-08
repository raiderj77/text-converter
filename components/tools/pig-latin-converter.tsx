"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Direction = "to-pig" | "from-pig";

const VOWELS = "aeiouAEIOU";

function isVowel(char: string): boolean {
  return VOWELS.includes(char);
}

function isLetter(char: string): boolean {
  return /[a-zA-Z]/.test(char);
}

function isUpperCase(char: string): boolean {
  return char >= "A" && char <= "Z";
}

function applyCapitalization(word: string, pattern: string): string {
  const chars = word.split("");
  for (let i = 0; i < chars.length && i < pattern.length; i++) {
    if (isUpperCase(pattern[i])) {
      chars[i] = chars[i].toUpperCase();
    } else {
      chars[i] = chars[i].toLowerCase();
    }
  }
  // If the word is longer than the pattern, keep remaining chars lowercase
  for (let i = pattern.length; i < chars.length; i++) {
    chars[i] = chars[i].toLowerCase();
  }
  return chars.join("");
}

function toPigLatin(word: string): string {
  if (!word || !isLetter(word[0])) return word;

  // Separate leading/trailing punctuation
  let prefix = "";
  let suffix = "";
  let core = word;

  while (core.length > 0 && !isLetter(core[0])) {
    prefix += core[0];
    core = core.slice(1);
  }
  while (core.length > 0 && !isLetter(core[core.length - 1])) {
    suffix = core[core.length - 1] + suffix;
    core = core.slice(0, -1);
  }

  if (!core) return word;

  // Save capitalization pattern
  const capPattern = core;
  const lowerCore = core.toLowerCase();

  let result: string;
  if (isVowel(lowerCore[0])) {
    result = lowerCore + "way";
  } else {
    // Find the consonant cluster
    let i = 0;
    while (i < lowerCore.length && !isVowel(lowerCore[i])) {
      i++;
    }
    // Handle 'qu' as a cluster
    if (i > 0 && i < lowerCore.length && lowerCore[i - 1] === "q" && lowerCore[i] === "u") {
      i++;
    }
    const consonants = lowerCore.slice(0, i);
    const rest = lowerCore.slice(i);
    result = rest + consonants + "ay";
  }

  // Restore capitalization
  result = applyCapitalization(result, capPattern);

  return prefix + result + suffix;
}

function fromPigLatin(word: string): string {
  if (!word) return word;

  // Separate leading/trailing punctuation
  let prefix = "";
  let suffix = "";
  let core = word;

  while (core.length > 0 && !isLetter(core[0])) {
    prefix += core[0];
    core = core.slice(1);
  }
  while (core.length > 0 && !isLetter(core[core.length - 1])) {
    suffix = core[core.length - 1] + suffix;
    core = core.slice(0, -1);
  }

  if (!core) return word;

  const capPattern = core;
  const lowerCore = core.toLowerCase();

  let result: string;

  // Check for "way" ending (vowel-start words)
  if (lowerCore.endsWith("way")) {
    const candidate = lowerCore.slice(0, -3);
    if (candidate.length > 0 && isVowel(candidate[0])) {
      result = candidate;
    } else {
      result = lowerCore;
    }
  }
  // Check for "ay" ending (consonant-start words)
  else if (lowerCore.endsWith("ay")) {
    const withoutAy = lowerCore.slice(0, -2);
    // Find the moved consonant cluster at the end
    let i = withoutAy.length - 1;
    while (i >= 0 && !isVowel(withoutAy[i])) {
      i--;
    }
    if (i >= 0) {
      const consonants = withoutAy.slice(i + 1);
      const rest = withoutAy.slice(0, i + 1);
      result = consonants + rest;
    } else {
      result = lowerCore;
    }
  } else {
    result = lowerCore;
  }

  // Restore capitalization
  result = applyCapitalization(result, capPattern);

  return prefix + result + suffix;
}

function convertText(text: string, direction: Direction): string {
  const converter = direction === "to-pig" ? toPigLatin : fromPigLatin;
  // Split by word boundaries while preserving whitespace and punctuation
  return text.replace(/\S+/g, (word) => converter(word));
}

export function PigLatinConverterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("to-pig");
  const [copied, setCopied] = useState(false);

  const output = input ? convertText(input, direction) : "";

  const copyText = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Direction toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setDirection("to-pig")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "to-pig" ? btnActive : btnBase)}
        >
          English → Pig Latin
        </button>
        <button
          onClick={() => setDirection("from-pig")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "from-pig" ? btnActive : btnBase)}
        >
          Pig Latin → English
        </button>
        <button
          onClick={() => { setInput(""); setCopied(false); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="piglatin-input" className="text-sm font-semibold block mb-2">
          {direction === "to-pig" ? "English Text" : "Pig Latin Text"}
        </label>
        <textarea
          id="piglatin-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            direction === "to-pig"
              ? "Type or paste English text to convert to Pig Latin..."
              : "Type or paste Pig Latin text to convert back to English..."
          }
          rows={5}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y min-h-[44px]",
            inputBase
          )}
          spellCheck={false}
        />
        <span className={cx("text-xs mt-1 block", muted)}>
          {input.length} character{input.length !== 1 ? "s" : ""}
          {" · "}
          {input.trim() ? input.trim().split(/\s+/).length : 0} word{input.trim().split(/\s+/).length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">
              {direction === "to-pig" ? "Pig Latin Output" : "English Output (Best Effort)"}
            </h3>
            <button
              onClick={() => copyText(output)}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors min-h-[44px] min-w-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className={cx(
            "rounded-lg border p-3 font-mono text-sm break-all leading-relaxed whitespace-pre-wrap select-all",
            isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50"
          )}>
            {output}
          </div>
          {direction === "from-pig" && (
            <p className={cx("text-xs mt-2", muted)}>
              Reverse Pig Latin is best-effort. Some words may not convert perfectly.
            </p>
          )}
        </div>
      )}

      {/* Examples */}
      <details className={cx("rounded-xl border p-4", base)}>
        <summary className="text-sm font-semibold cursor-pointer select-none">
          Pig Latin Rules &amp; Examples
        </summary>
        <div className="mt-3 space-y-3">
          <div className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
            <h4 className={cx("text-xs font-semibold mb-1", isDark ? "text-emerald-400" : "text-emerald-600")}>
              Consonant-start words
            </h4>
            <p className="text-xs">
              Move the leading consonant cluster to the end and add &quot;ay&quot;.
            </p>
            <div className={cx("mt-1 text-xs font-mono", muted)}>
              hello → ellohay · string → ingstray · chat → atchay
            </div>
          </div>
          <div className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
            <h4 className={cx("text-xs font-semibold mb-1", isDark ? "text-emerald-400" : "text-emerald-600")}>
              Vowel-start words
            </h4>
            <p className="text-xs">
              Keep the word as-is and add &quot;way&quot; to the end.
            </p>
            <div className={cx("mt-1 text-xs font-mono", muted)}>
              apple → appleway · eagle → eagleway · is → isway
            </div>
          </div>
          <div className={cx("rounded-lg border p-3", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
            <h4 className={cx("text-xs font-semibold mb-1", isDark ? "text-emerald-400" : "text-emerald-600")}>
              Punctuation &amp; capitalization
            </h4>
            <p className="text-xs">
              Punctuation stays in place. Capitalization pattern is preserved.
            </p>
            <div className={cx("mt-1 text-xs font-mono", muted)}>
              Hello, World! → Ellohay, Orldway!
            </div>
          </div>
        </div>
      </details>

      {/* Hint */}
      <div className={cx("text-xs text-center", muted)}>
        Punctuation is preserved. Capitalization pattern is maintained.
      </div>
    </div>
  );
}
