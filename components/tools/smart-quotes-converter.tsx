"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";
import { deferStorageHydration, persistAfterStorageHydration, safeGetLocalStorage, useStorageHydrationGate } from "@/lib/storage-hydration";

type Mode = "straighten" | "typeset";

/**
 * Straighten: curly quotes -> straight, em dash -> --, en dash -> -
 * Typeset: straight -> curly quotes, double hyphens -> em dash
 */

export function straighten(text: string) {
  let result = text;
  const counts = { quotes: 0, apostrophes: 0, emDashes: 0, enDashes: 0 };

  // Curly double quotes -> straight
  result = result.replace(/[\u201C\u201D\u201E\u00AB\u00BB\u2033]/g, () => {
    counts.quotes++;
    return '"';
  });

  // Curly single quotes / apostrophes -> straight
  result = result.replace(/[\u2018\u2019\u201A\u2032\u2039\u203A]/g, () => {
    counts.apostrophes++;
    return "'";
  });

  // Em dash -> --
  result = result.replace(/\u2014/g, () => {
    counts.emDashes++;
    return "--";
  });

  // En dash -> -
  result = result.replace(/\u2013/g, () => {
    counts.enDashes++;
    return "-";
  });

  return { result, counts };
}

const WORD_CHARACTER = /[\p{L}\p{N}]/u;
const OPENING_CONTEXT = /[\s([{<\-\u2013\u2014\u2018\u201C]/u;
const CLOSING_CONTEXT = /['.!?,)\]}>\u2019\u201D]/u;
const LEADING_ELISION = /^(?:\d{2}s?|tis|twas|twere|twill|twould|cause|em|n|round|bout|neath|gainst|til|nuff|scuse)\b/i;

function characterAt(text: string, index: number): string | undefined {
  return index >= 0 && index < text.length ? text[index] : undefined;
}

function isWordCharacter(character: string | undefined): boolean {
  return character !== undefined && WORD_CHARACTER.test(character);
}

function shouldOpenDoubleQuote(text: string, index: number): boolean {
  const previous = characterAt(text, index - 1);
  const next = characterAt(text, index + 1);

  if (next === undefined) return false;
  if (previous === undefined || OPENING_CONTEXT.test(previous)) return true;
  if ((previous === ":" || previous === ";") && isWordCharacter(next)) return true;
  if (isWordCharacter(previous) || CLOSING_CONTEXT.test(previous)) return false;
  return true;
}

function isLeadingElision(text: string, index: number): boolean {
  const previous = characterAt(text, index - 1);
  if (previous !== undefined && !OPENING_CONTEXT.test(previous)) return false;
  return LEADING_ELISION.test(text.slice(index + 1));
}

function shouldOpenSingleQuote(text: string, index: number): boolean {
  if (isLeadingElision(text, index)) return false;

  const previous = characterAt(text, index - 1);
  const next = characterAt(text, index + 1);
  if (isWordCharacter(previous)) return false;
  if (next === undefined) return false;
  if (previous === undefined || OPENING_CONTEXT.test(previous)) return true;
  if ((previous === ":" || previous === ";") && isWordCharacter(next)) return true;
  return false;
}

export function typeset(text: string) {
  let result = text;
  const counts = { quotes: 0, apostrophes: 0, emDashes: 0 };

  // Double hyphens -> em dash (before quote conversion)
  result = result.replace(/--/g, () => {
    counts.emDashes++;
    return "\u2014";
  });

  // Convert a common feet-and-inches form before interpreting quote context.
  result = result.replace(/(\d+)(\s*)'(\s*)(\d+(?:[.,]\d+)?)(\s*)"/g, (
    _match,
    feet: string,
    beforeFeetMark: string,
    afterFeetMark: string,
    inches: string,
    beforeInchMark: string,
  ) => {
    counts.apostrophes++;
    counts.quotes++;
    return `${feet}${beforeFeetMark}\u2032${afterFeetMark}${inches}${beforeInchMark}\u2033`;
  });

  // Decide each double quote from its neighboring characters rather than
  // alternating globally, so independent and nested quotations stay balanced.
  const doubleSource = result;
  result = doubleSource.replace(/"/g, (_mark, index: number) => {
    counts.quotes++;
    return shouldOpenDoubleQuote(doubleSource, index) ? "\u201C" : "\u201D";
  });

  // Apostrophes and single quotes share U+0027. Common English elisions and
  // word-internal marks close; marks before quoted words open.
  const singleSource = result;
  result = singleSource.replace(/'/g, (_mark, index: number) => {
    counts.apostrophes++;
    return shouldOpenSingleQuote(singleSource, index) ? "\u2018" : "\u2019";
  });

  return { result, counts };
}

export function SmartQuotesConverterTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("straighten");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const storageHydration = useStorageHydrationGate();

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-400" : "text-neutral-600";

  // Load saved text
  useEffect(() => {
    const saved = safeGetLocalStorage("fmc_sqc_text");
    const savedMode = safeGetLocalStorage("fmc_sqc_mode") as Mode | null;
    return deferStorageHydration(storageHydration, () => {
      if (saved) setText(saved);
      if (savedMode === "straighten" || savedMode === "typeset") setMode(savedMode);
    });
  }, [storageHydration]);

  // Persist
  useEffect(() => {
    persistAfterStorageHydration(storageHydration, () => localStorage.setItem("fmc_sqc_text", text));
  }, [text, storageHydration]);
  useEffect(() => {
    persistAfterStorageHydration(storageHydration, () => localStorage.setItem("fmc_sqc_mode", mode));
  }, [mode, storageHydration]);

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

  const { converted, counts } = useMemo(() => {
    if (!text) return { converted: "", counts: { quotes: 0, apostrophes: 0, emDashes: 0, enDashes: 0 } };
    if (mode === "straighten") {
      const { result, counts } = straighten(text);
      return { converted: result, counts: { ...counts } };
    } else {
      const { result, counts } = typeset(text);
      return { converted: result, counts: { ...counts, enDashes: 0 } };
    }
  }, [text, mode]);

  const totalChanges =
    (counts.quotes || 0) +
    (counts.apostrophes || 0) +
    (counts.emDashes || 0) +
    ("enDashes" in counts ? counts.enDashes || 0 : 0);

  async function copyConverted() {
    try {
      await navigator.clipboard.writeText(converted);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("straighten")}
          className={cx(
            "text-sm rounded-xl px-4 min-h-[44px] border transition-colors font-medium",
            mode === "straighten"
              ? isDark
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-emerald-500/40 bg-emerald-50 text-emerald-700"
              : btnBase
          )}
        >
          Straighten (curly &rarr; straight)
        </button>
        <button
          type="button"
          onClick={() => setMode("typeset")}
          className={cx(
            "text-sm rounded-xl px-4 min-h-[44px] border transition-colors font-medium",
            mode === "typeset"
              ? isDark
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border-emerald-500/40 bg-emerald-50 text-emerald-700"
              : btnBase
          )}
        >
          Typeset (straight &rarr; curly)
        </button>
      </div>

      {/* Input area */}
      <div className={cx("rounded-2xl border shadow-sm", base)}>
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Input</div>
          <div className="flex items-center gap-2">
            <span className={cx("text-xs tabular-nums", muted)}>
              {formatNumber(text.length)} chars
            </span>
            <button
              type="button"
              onClick={clearAll}
              className={cx(
                "text-sm rounded-xl px-3 min-h-[44px] border transition-colors",
                btnBase
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
            aria-label="Text with quotes to convert"
            placeholder={
              mode === "straighten"
                ? "Paste text with \u201Csmart quotes\u201D and em dashes \u2014 here\u2026"
                : 'Paste text with "straight quotes" and double hyphens -- here...'
            }
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
              inputBase,
              isDark
                ? "focus:ring-2 focus:ring-white/10"
                : "focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Substitution counts */}
      {text.length > 0 && (
        <div
          className={cx(
            "mt-4 rounded-xl border p-3 flex flex-wrap items-center gap-4",
            base
          )}
        >
          <div className={cx("text-xs font-medium", totalChanges > 0 ? "text-emerald-400" : muted)}>
            {totalChanges > 0
              ? `${formatNumber(totalChanges)} substitution${totalChanges !== 1 ? "s" : ""}`
              : "No changes"}
          </div>
          {counts.quotes > 0 && (
            <div className={cx("text-xs", muted)}>
              Quotes: {formatNumber(counts.quotes)}
            </div>
          )}
          {counts.apostrophes > 0 && (
            <div className={cx("text-xs", muted)}>
              Apostrophes: {formatNumber(counts.apostrophes)}
            </div>
          )}
          {counts.emDashes > 0 && (
            <div className={cx("text-xs", muted)}>
              Em dashes: {formatNumber(counts.emDashes)}
            </div>
          )}
          {"enDashes" in counts && (counts as { enDashes?: number }).enDashes! > 0 && (
            <div className={cx("text-xs", muted)}>
              En dashes: {formatNumber((counts as { enDashes: number }).enDashes)}
            </div>
          )}
        </div>
      )}

      {/* Output area */}
      <div className={cx("mt-4 rounded-2xl border shadow-sm", base)}>
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">
            {mode === "straighten" ? "Straightened Output" : "Typeset Output"}
          </div>
          <button
            type="button"
            onClick={copyConverted}
            className={cx(
              "text-sm rounded-xl px-3 min-h-[44px] border transition-colors",
              isDark
                ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
            )}
          >
            Copy
          </button>
        </div>
        <div className="p-3">
          <output
            aria-live="polite"
            className={cx(
              "block whitespace-pre-wrap break-words text-sm leading-6 font-mono min-h-[96px]",
              isDark ? "text-neutral-200" : "text-neutral-700"
            )}
          >
            {converted || "\u00A0"}
          </output>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className={cx("mt-3 text-xs text-center", muted)}>
        Ctrl/Cmd + K focuses input &middot; Ctrl/Cmd + L toggles theme
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
