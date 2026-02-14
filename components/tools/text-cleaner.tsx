"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type CleanOption = {
  id: string;
  label: string;
  description: string;
  fn: (text: string) => string;
  defaultOn: boolean;
};

const CLEAN_OPTIONS: CleanOption[] = [
  {
    id: "trim-lines",
    label: "Trim trailing spaces",
    description: "Remove spaces and tabs at the end of each line",
    fn: (t) => t.replace(/[ \t]+$/gm, ""),
    defaultOn: true,
  },
  {
    id: "collapse-spaces",
    label: "Collapse multiple spaces",
    description: "Replace consecutive spaces with a single space",
    fn: (t) => t.replace(/ {2,}/g, " "),
    defaultOn: true,
  },
  {
    id: "collapse-blank-lines",
    label: "Collapse blank lines",
    description: "Replace multiple blank lines with a single blank line",
    fn: (t) => t.replace(/\n{3,}/g, "\n\n"),
    defaultOn: true,
  },
  {
    id: "remove-blank-lines",
    label: "Remove all blank lines",
    description: "Delete every empty line entirely",
    fn: (t) => t.replace(/^\s*\n/gm, ""),
    defaultOn: false,
  },
  {
    id: "remove-line-breaks",
    label: "Remove all line breaks",
    description: "Join all lines into a single paragraph",
    fn: (t) => t.replace(/\n+/g, " "),
    defaultOn: false,
  },
  {
    id: "remove-tabs",
    label: "Replace tabs with spaces",
    description: "Convert tab characters to a single space",
    fn: (t) => t.replace(/\t/g, " "),
    defaultOn: true,
  },
  {
    id: "trim-start",
    label: "Trim leading spaces",
    description: "Remove spaces and tabs at the start of each line",
    fn: (t) => t.replace(/^[ \t]+/gm, ""),
    defaultOn: false,
  },
  {
    id: "smart-quotes",
    label: "Straighten smart quotes",
    description: "Replace curly quotes with straight quotes and dashes with hyphens",
    fn: (t) =>
      t
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/\u2013/g, "-")
        .replace(/\u2014/g, "--")
        .replace(/\u2026/g, "..."),
    defaultOn: false,
  },
  {
    id: "remove-non-ascii",
    label: "Remove non-ASCII characters",
    description: "Strip characters outside the standard ASCII range",
    fn: (t) => t.replace(/[^\x00-\x7F]/g, ""),
    defaultOn: false,
  },
  {
    id: "normalize-unicode",
    label: "Normalize whitespace characters",
    description: "Replace non-breaking spaces, zero-width spaces, and other invisible characters",
    fn: (t) =>
      t
        .replace(/\u00A0/g, " ")      // non-breaking space
        .replace(/\u200B/g, "")        // zero-width space
        .replace(/\u200C/g, "")        // zero-width non-joiner
        .replace(/\u200D/g, "")        // zero-width joiner
        .replace(/\uFEFF/g, ""),       // BOM
    defaultOn: true,
  },
];

export function TextCleanerTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const opt of CLEAN_OPTIONS) {
      initial[opt.id] = opt.defaultOn;
    }
    return initial;
  });
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved text
  useEffect(() => {
    const saved = localStorage.getItem("fmc_tc_text");
    if (saved) setText(saved);
  }, []);

  // Persist text
  useEffect(() => {
    localStorage.setItem("fmc_tc_text", text);
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

  const cleaned = useMemo(() => {
    let result = text;
    for (const opt of CLEAN_OPTIONS) {
      if (enabled[opt.id]) {
        result = opt.fn(result);
      }
    }
    return result;
  }, [text, enabled]);

  // Stats
  const inputChars = text.length;
  const outputChars = cleaned.length;
  const removed = inputChars - outputChars;
  const removedPct = inputChars > 0 ? ((removed / inputChars) * 100).toFixed(1) : "0";

  function toggleOption(id: string) {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function enableAll() {
    const next: Record<string, boolean> = {};
    for (const opt of CLEAN_OPTIONS) next[opt.id] = true;
    setEnabled(next);
  }

  function disableAll() {
    const next: Record<string, boolean> = {};
    for (const opt of CLEAN_OPTIONS) next[opt.id] = false;
    setEnabled(next);
  }

  function resetDefaults() {
    const next: Record<string, boolean> = {};
    for (const opt of CLEAN_OPTIONS) next[opt.id] = opt.defaultOn;
    setEnabled(next);
  }

  async function copyCleaned() {
    try {
      await navigator.clipboard.writeText(cleaned);
      setToast("Copied cleaned text!");
    } catch {
      setToast("Copy failed — try selecting manually");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  function applyToInput() {
    setText(cleaned);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
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
          <div className="text-sm font-semibold">Input (paste messy text here)</div>
          <div className="flex items-center gap-2">
            <span
              className={cx(
                "text-xs tabular-nums",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              {formatNumber(inputChars)} chars
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
            placeholder={"Paste text with extra   spaces,\n\n\n\nmultiple blank lines,\n\tor tabs here…"}
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
              isDark
                ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Cleaning options */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div
            className={cx(
              "text-xs uppercase tracking-wide",
              isDark ? "text-neutral-400" : "text-neutral-500"
            )}
          >
            Cleaning Options
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={enableAll}
              className={cx(
                "text-xs px-2 py-1 rounded-lg border transition-colors",
                isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              )}
            >
              All on
            </button>
            <button
              type="button"
              onClick={disableAll}
              className={cx(
                "text-xs px-2 py-1 rounded-lg border transition-colors",
                isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              )}
            >
              All off
            </button>
            <button
              type="button"
              onClick={resetDefaults}
              className={cx(
                "text-xs px-2 py-1 rounded-lg border transition-colors",
                isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              )}
            >
              Defaults
            </button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CLEAN_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleOption(opt.id)}
              className={cx(
                "rounded-xl border p-3 text-left transition-colors",
                enabled[opt.id]
                  ? isDark
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-emerald-500/40 bg-emerald-50"
                  : isDark
                    ? "border-white/10 bg-neutral-900 hover:bg-neutral-800"
                    : "border-black/10 bg-white hover:bg-neutral-50"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cx(
                    "w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0",
                    enabled[opt.id]
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : isDark
                        ? "border-white/20"
                        : "border-black/20"
                  )}
                >
                  {enabled[opt.id] ? "✓" : ""}
                </div>
                <div className="text-sm font-medium">{opt.label}</div>
              </div>
              <div
                className={cx(
                  "mt-1 text-xs pl-6",
                  isDark ? "text-neutral-400" : "text-neutral-500"
                )}
              >
                {opt.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      {text.length > 0 && (
        <div
          className={cx(
            "mt-4 rounded-xl border p-3 flex items-center justify-between",
            isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
          )}
        >
          <div className="flex items-center gap-4">
            <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
              <span className="font-medium">{formatNumber(inputChars)}</span> → <span className="font-medium">{formatNumber(outputChars)}</span> chars
            </div>
            <div
              className={cx(
                "text-xs",
                removed > 0 ? "text-emerald-400" : isDark ? "text-neutral-500" : "text-neutral-400"
              )}
            >
              {removed > 0
                ? `${formatNumber(removed)} chars removed (${removedPct}%)`
                : "No changes"}
            </div>
          </div>
        </div>
      )}

      {/* Output area */}
      <div
        className={cx(
          "mt-4 rounded-2xl border shadow-sm",
          isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
        )}
      >
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Cleaned Output</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={applyToInput}
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
            >
              Apply to Input
            </button>
            <button
              type="button"
              onClick={copyCleaned}
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark
                  ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
              )}
            >
              Copy Cleaned Text
            </button>
          </div>
        </div>
        <div className="p-3">
          <pre
            className={cx(
              "whitespace-pre-wrap break-words text-sm leading-6 font-mono min-h-[96px]",
              isDark ? "text-neutral-200" : "text-neutral-700"
            )}
          >
            {cleaned || "\u00A0"}
          </pre>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div
        className={cx(
          "mt-3 text-xs text-center",
          isDark ? "text-neutral-500" : "text-neutral-400"
        )}
      >
        Ctrl/⌘ + K focuses input · Ctrl/⌘ + L toggles theme
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
