"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type ConvertOption = {
  id: string;
  label: string;
  description: string;
  fn: (text: string) => string;
  defaultOn: boolean;
};

const CONVERT_OPTIONS: ConvertOption[] = [
  {
    id: "strip-html",
    label: "Remove HTML tags",
    description: "Strip all HTML and XML tags from the text",
    fn: (t) => t.replace(/<[^>]*>/g, ""),
    defaultOn: true,
  },
  {
    id: "smart-quotes",
    label: "Straighten smart quotes",
    description: "Convert curly/smart quotes to straight quotes",
    fn: (t) =>
      t
        .replace(/[\u2018\u2019\u201A\u2039\u203A]/g, "'")
        .replace(/[\u201C\u201D\u201E\u00AB\u00BB]/g, '"'),
    defaultOn: true,
  },
  {
    id: "dashes",
    label: "Convert dashes",
    description: "Em dash to double hyphen, en dash to single hyphen",
    fn: (t) => t.replace(/\u2014/g, "--").replace(/\u2013/g, "-"),
    defaultOn: true,
  },
  {
    id: "ellipsis",
    label: "Convert ellipsis",
    description: "Replace ellipsis character with three dots",
    fn: (t) => t.replace(/\u2026/g, "..."),
    defaultOn: true,
  },
  {
    id: "normalize-whitespace",
    label: "Normalize whitespace",
    description: "Replace non-breaking spaces, zero-width spaces, and other invisible characters",
    fn: (t) =>
      t
        .replace(/\u00A0/g, " ")
        .replace(/\u200B/g, "")
        .replace(/\u200C/g, "")
        .replace(/\u200D/g, "")
        .replace(/\uFEFF/g, ""),
    defaultOn: true,
  },
  {
    id: "remove-non-ascii",
    label: "Remove non-ASCII characters",
    description: "Strip all characters outside the standard ASCII range (keeps newlines and tabs)",
    fn: (t) => t.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ""),
    defaultOn: false,
  },
  {
    id: "remove-urls",
    label: "Remove URLs",
    description: "Strip http/https URLs from the text",
    fn: (t) => t.replace(/https?:\/\/[^\s)>\]]+/g, ""),
    defaultOn: false,
  },
  {
    id: "remove-emails",
    label: "Remove email addresses",
    description: "Strip email addresses from the text",
    fn: (t) => t.replace(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g, ""),
    defaultOn: false,
  },
];

export function PlainTextConverterTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const opt of CONVERT_OPTIONS) {
      initial[opt.id] = opt.defaultOn;
    }
    return initial;
  });
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Load saved text
  useEffect(() => {
    const saved = localStorage.getItem("fmc_ptc_text");
    if (saved) setText(saved);
  }, []);

  // Persist text
  useEffect(() => {
    localStorage.setItem("fmc_ptc_text", text);
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

  const converted = useMemo(() => {
    let result = text;
    for (const opt of CONVERT_OPTIONS) {
      if (enabled[opt.id]) {
        result = opt.fn(result);
      }
    }
    return result;
  }, [text, enabled]);

  // Stats
  const inputChars = text.length;
  const inputWords = text.trim() ? text.trim().split(/\s+/).length : 0;
  const outputChars = converted.length;
  const removed = inputChars - outputChars;
  const removedPct = inputChars > 0 ? ((removed / inputChars) * 100).toFixed(1) : "0";

  function toggleOption(id: string) {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function enableAll() {
    const next: Record<string, boolean> = {};
    for (const opt of CONVERT_OPTIONS) next[opt.id] = true;
    setEnabled(next);
  }

  function disableAll() {
    const next: Record<string, boolean> = {};
    for (const opt of CONVERT_OPTIONS) next[opt.id] = false;
    setEnabled(next);
  }

  function resetDefaults() {
    const next: Record<string, boolean> = {};
    for (const opt of CONVERT_OPTIONS) next[opt.id] = opt.defaultOn;
    setEnabled(next);
  }

  async function copyConverted() {
    try {
      await navigator.clipboard.writeText(converted);
      setToast("Copied plain text!");
    } catch {
      setToast("Copy failed — try selecting manually");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  function applyToInput() {
    setText(converted);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  return (
    <div>
      {/* Input area */}
      <div className={cx("rounded-2xl border shadow-sm", base)}>
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Input (paste formatted text here)</div>
          <div className="flex items-center gap-2">
            <span className={cx("text-xs tabular-nums", muted)}>
              {formatNumber(inputWords)} words &middot; {formatNumber(inputChars)} chars
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
            placeholder={"Paste text with <b>HTML tags</b>, \u201Csmart quotes\u201D, em dashes \u2014 and more\u2026"}
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
              inputBase,
              isDark ? "focus:ring-2 focus:ring-white/10" : "focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Conversion options */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className={cx("text-xs uppercase tracking-wide", muted)}>
            Conversion Options
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={enableAll}
              className={cx(
                "text-xs px-2 min-h-[44px] rounded-lg border transition-colors",
                btnBase
              )}
            >
              All on
            </button>
            <button
              type="button"
              onClick={disableAll}
              className={cx(
                "text-xs px-2 min-h-[44px] rounded-lg border transition-colors",
                btnBase
              )}
            >
              All off
            </button>
            <button
              type="button"
              onClick={resetDefaults}
              className={cx(
                "text-xs px-2 min-h-[44px] rounded-lg border transition-colors",
                btnBase
              )}
            >
              Defaults
            </button>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {CONVERT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleOption(opt.id)}
              className={cx(
                "rounded-xl border p-3 text-left transition-colors min-h-[44px]",
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
                  {enabled[opt.id] ? "\u2713" : ""}
                </div>
                <div className="text-sm font-medium">{opt.label}</div>
              </div>
              <div className={cx("mt-1 text-xs pl-6", muted)}>
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
            base
          )}
        >
          <div className="flex items-center gap-4">
            <div className={cx("text-xs", muted)}>
              <span className="font-medium">{formatNumber(inputChars)}</span> &rarr;{" "}
              <span className="font-medium">{formatNumber(outputChars)}</span> chars
            </div>
            <div
              className={cx(
                "text-xs",
                removed > 0 ? "text-emerald-400" : muted
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
      <div className={cx("mt-4 rounded-2xl border shadow-sm", base)}>
        <div
          className={cx(
            "flex items-center justify-between px-3 py-2 border-b",
            isDark ? "border-white/10" : "border-black/5"
          )}
        >
          <div className="text-sm font-semibold">Plain Text Output</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={applyToInput}
              className={cx(
                "text-sm rounded-xl px-3 min-h-[44px] border transition-colors",
                btnBase
              )}
            >
              Apply to Input
            </button>
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
              Copy Plain Text
            </button>
          </div>
        </div>
        <div className="p-3">
          <pre
            aria-live="polite"
            className={cx(
              "whitespace-pre-wrap break-words text-sm leading-6 font-mono min-h-[96px]",
              isDark ? "text-neutral-200" : "text-neutral-700"
            )}
          >
            {converted || "\u00A0"}
          </pre>
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
