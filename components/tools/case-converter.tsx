"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import {
  conversions,
  getCommonConversions,
  getDeveloperConversions,
  getOtherConversions,
} from "@/lib/conversions";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/layout/theme-provider";

export function CaseConverterTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved text on mount
  useEffect(() => {
    const saved = localStorage.getItem("fmc_text");
    if (saved) setText(saved);
  }, []);

  // Persist text changes
  useEffect(() => {
    localStorage.setItem("fmc_text", text);
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

  const common = useMemo(
    () => getCommonConversions().map((c) => ({ ...c, value: c.fn(text) })),
    [text]
  );

  const developer = useMemo(
    () => getDeveloperConversions().map((c) => ({ ...c, value: c.fn(text) })),
    [text]
  );

  const other = useMemo(
    () => getOtherConversions().map((c) => ({ ...c, value: c.fn(text) })),
    [text]
  );

  async function doCopy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value || "");
      setToast(`Copied: ${label}`);
    } catch {
      setToast("Copy failed — try selecting manually");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  // Character and word stats shown below input
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

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
                "text-xs",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              {wordCount} {wordCount === 1 ? "word" : "words"} · {charCount}{" "}
              {charCount === 1 ? "char" : "chars"}
            </span>
            <button
              type="button"
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-black/10 hover:bg-black/5"
              )}
              onClick={clearAll}
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
            rows={4}
            placeholder="Paste or type text here…"
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none",
              isDark
                ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Common conversions */}
      <div className="mt-4">
        <div
          className={cx(
            "text-xs uppercase tracking-wide",
            isDark ? "text-neutral-400" : "text-neutral-500"
          )}
        >
          Common
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {common.map((o) => (
            <Card
              key={o.id}
              label={o.label}
              value={o.value}
              onCopy={() => doCopy(o.label, o.value)}
            />
          ))}
        </div>
      </div>

      {/* Developer conversions */}
      <div className="mt-4">
        <div
          className={cx(
            "text-xs uppercase tracking-wide",
            isDark ? "text-neutral-400" : "text-neutral-500"
          )}
        >
          Developer &amp; URL formats
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {developer.map((o) => (
            <Card
              key={o.id}
              label={o.label}
              value={o.value}
              onCopy={() => doCopy(o.label, o.value)}
            />
          ))}
        </div>
      </div>

      {/* Other conversions */}
      <div className="mt-4">
        <div
          className={cx(
            "text-xs uppercase tracking-wide",
            isDark ? "text-neutral-400" : "text-neutral-500"
          )}
        >
          Other styles
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          {other.map((o) => (
            <Card
              key={o.id}
              label={o.label}
              value={o.value}
              onCopy={() => doCopy(o.label, o.value)}
            />
          ))}
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

      {/* Toast notification */}
      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
