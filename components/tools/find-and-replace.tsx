"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function FindAndReplaceTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [findStr, setFindStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [regexMode, setRegexMode] = useState(false);
  const [toast, setToast] = useState("");
  const [previousText, setPreviousText] = useState<string | null>(null);
  const [lastReplaceCount, setLastReplaceCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Persist input to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fmc_find_replace_text");
    if (saved) setText(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("fmc_find_replace_text", text);
  }, [text]);

  // Build regex from find string + options
  const { regex, regexError } = useMemo(() => {
    if (!findStr) return { regex: null, regexError: null };
    try {
      let pattern = regexMode ? findStr : escapeRegex(findStr);
      if (wholeWord) pattern = `\\b${pattern}\\b`;
      const flags = caseSensitive ? "g" : "gi";
      const re = new RegExp(pattern, flags);
      return { regex: re, regexError: null };
    } catch (e: any) {
      return { regex: null, regexError: e.message || "Invalid regex" };
    }
  }, [findStr, caseSensitive, wholeWord, regexMode]);

  // Count matches
  const matchCount = useMemo(() => {
    if (!regex || !text) return 0;
    const matches = text.match(regex);
    return matches ? matches.length : 0;
  }, [regex, text]);

  // Build highlighted preview
  const highlightedParts = useMemo(() => {
    if (!regex || !text || matchCount === 0) return null;
    const parts: { text: string; isMatch: boolean }[] = [];
    let lastEnd = 0;
    // Need a fresh regex to reset lastIndex
    const re = new RegExp(regex.source, regex.flags);
    let m: RegExpExecArray | null;
    const seen = new Set<number>();
    while ((m = re.exec(text)) !== null) {
      if (seen.has(m.index)) break;
      seen.add(m.index);
      if (m.index > lastEnd) {
        parts.push({ text: text.slice(lastEnd, m.index), isMatch: false });
      }
      parts.push({ text: m[0], isMatch: true });
      lastEnd = m.index + m[0].length;
      if (m[0].length === 0) re.lastIndex++;
    }
    if (lastEnd < text.length) {
      parts.push({ text: text.slice(lastEnd), isMatch: false });
    }
    return parts;
  }, [regex, text, matchCount]);

  // Replace all
  const handleReplaceAll = useCallback(() => {
    if (!regex || !text) return;
    setPreviousText(text);
    const re = new RegExp(regex.source, regex.flags);
    let count = 0;
    const newText = text.replace(re, (...args) => {
      count++;
      // If regex mode, support group references in replace string
      if (regexMode) {
        return replaceStr.replace(/\$(\d+)/g, (_, n) => {
          const idx = parseInt(n, 10);
          return args[idx] !== undefined ? args[idx] : `$${n}`;
        });
      }
      return replaceStr;
    });
    setText(newText);
    setLastReplaceCount(count);
    setToast(`Replaced ${count} match${count !== 1 ? "es" : ""}`);
    setTimeout(() => setToast(""), 2000);
  }, [regex, text, replaceStr, regexMode]);

  // Undo last replacement
  const handleUndo = useCallback(() => {
    if (previousText === null) return;
    setText(previousText);
    setPreviousText(null);
    setLastReplaceCount(0);
    setToast("Undo successful");
    setTimeout(() => setToast(""), 1500);
  }, [previousText]);

  // Copy output
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => { setToast("Copied!"); setTimeout(() => setToast(""), 1200); },
      () => { setToast("Copy failed"); setTimeout(() => setToast(""), 1200); }
    );
  }, [text]);

  // Clear all
  const handleClear = useCallback(() => {
    setText("");
    setFindStr("");
    setReplaceStr("");
    setPreviousText(null);
    setLastReplaceCount(0);
    textareaRef.current?.focus();
  }, []);

  const wordCount = useMemo(() => countWords(text), [text]);
  const charCount = text.length;

  return (
    <div className="space-y-4">
      {/* Input textarea */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Input Text</label>
          <span className={cx("text-xs tabular-nums", muted)}>
            {wordCount.toLocaleString()} word{wordCount !== 1 ? "s" : ""} · {charCount.toLocaleString()} char{charCount !== 1 ? "s" : ""}
          </span>
        </div>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => { setText(e.target.value); setPreviousText(null); setLastReplaceCount(0); }}
          rows={8}
          spellCheck={false}
          placeholder="Paste or type your text here..."
          className={cx("w-full resize-y rounded-lg border px-3 py-2 text-sm leading-6 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
        />
      </div>

      {/* Find and Replace fields */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-semibold block mb-1.5">Find</label>
            <input
              type="text"
              value={findStr}
              onChange={(e) => setFindStr(e.target.value)}
              placeholder={regexMode ? "Enter regex pattern..." : "Text to find..."}
              className={cx("w-full rounded-lg border px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1.5">Replace with</label>
            <input
              type="text"
              value={replaceStr}
              onChange={(e) => setReplaceStr(e.target.value)}
              placeholder={regexMode ? "Replacement ($1, $2 for groups)..." : "Replacement text..."}
              className={cx("w-full rounded-lg border px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Match count + regex error */}
        <div className="mt-3 flex items-center gap-3">
          {findStr && !regexError && (
            <span className={cx("text-xs font-semibold", matchCount > 0 ? "text-emerald-400" : "text-red-400")}>
              {matchCount} match{matchCount !== 1 ? "es" : ""} found
            </span>
          )}
          {regexError && (
            <span className="text-xs text-red-400 font-mono">{regexError}</span>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-2">
        {([
          { label: "Case Sensitive", checked: caseSensitive, toggle: () => setCaseSensitive(!caseSensitive) },
          { label: "Whole Word", checked: wholeWord, toggle: () => setWholeWord(!wholeWord) },
          { label: "Regex Mode", checked: regexMode, toggle: () => setRegexMode(!regexMode) },
        ] as const).map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={opt.toggle}
            className={cx(
              "flex items-center gap-2 rounded-xl border px-3 min-h-[44px] text-sm transition-colors",
              opt.checked ? btnActive : btnBase
            )}
          >
            <div className={cx(
              "w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0",
              opt.checked ? "bg-emerald-500 border-emerald-500 text-white" : isDark ? "border-white/20" : "border-black/20"
            )}>
              {opt.checked ? "✓" : ""}
            </div>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleReplaceAll}
          disabled={!regex || !text || matchCount === 0}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm font-semibold transition-colors",
            regex && text && matchCount > 0
              ? isDark ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300" : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
              : "opacity-40 cursor-not-allowed border-white/5"
          )}
        >
          Replace All{matchCount > 0 ? ` (${matchCount})` : ""}
        </button>
        <button
          type="button"
          onClick={handleUndo}
          disabled={previousText === null}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm transition-colors",
            previousText !== null ? btnBase : "opacity-40 cursor-not-allowed border-white/5"
          )}
        >
          Undo Last Replace
        </button>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!text}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm transition-colors",
            text ? btnBase : "opacity-40 cursor-not-allowed border-white/5"
          )}
        >
          Copy Text
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={cx("rounded-xl border px-4 min-h-[44px] text-sm transition-colors", btnBase)}
        >
          Clear All
        </button>
      </div>

      {/* Match preview with highlights */}
      {highlightedParts && (
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Match Preview</label>
            <span className={cx("text-xs", muted)}>Matches highlighted in yellow</span>
          </div>
          <div
            aria-live="polite"
            className={cx(
              "rounded-lg border p-3 font-mono text-sm whitespace-pre-wrap break-words leading-relaxed max-h-[400px] overflow-y-auto",
              inputBase
            )}
          >
            {highlightedParts.map((part, i) =>
              part.isMatch ? (
                <mark
                  key={i}
                  className={cx(
                    "rounded px-0.5",
                    isDark ? "bg-yellow-500/30 text-yellow-200" : "bg-yellow-200 text-yellow-900"
                  )}
                >
                  {part.text}
                </mark>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      )}

      {/* Result after replacement */}
      {lastReplaceCount > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">
              Result — {lastReplaceCount} replacement{lastReplaceCount !== 1 ? "s" : ""} made
            </label>
            <button
              type="button"
              onClick={handleCopy}
              className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors", btnBase)}
            >
              Copy
            </button>
          </div>
          <div
            aria-live="polite"
            className={cx(
              "rounded-lg border p-3 font-mono text-sm whitespace-pre-wrap break-words leading-relaxed max-h-[400px] overflow-y-auto",
              inputBase
            )}
          >
            {text || "\u00A0"}
          </div>
        </div>
      )}

      <div className={cx("text-xs text-center", muted)}>
        Live match highlighting · Regex support · All processing in your browser · Ctrl/⌘ + L toggles theme
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
