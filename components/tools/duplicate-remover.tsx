"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type SortMode = "original" | "asc" | "desc";

export function DuplicateRemoverTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortMode, setSortMode] = useState<SortMode>("original");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved text
  useEffect(() => {
    const saved = localStorage.getItem("fmc_dr_text");
    if (saved) setText(saved);
  }, []);

  // Persist text
  useEffect(() => {
    localStorage.setItem("fmc_dr_text", text);
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

  const result = useMemo(() => {
    let lines = text.split("\n");

    // Trim each line
    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }

    // Remove empty lines
    if (removeEmpty) {
      lines = lines.filter((l) => l.length > 0);
    }

    const totalLines = lines.length;

    // Deduplicate
    const seen = new Set<string>();
    const unique: string[] = [];
    const duplicateCounts: Record<string, number> = {};

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
        duplicateCounts[key] = 1;
      } else {
        duplicateCounts[key] = (duplicateCounts[key] || 1) + 1;
      }
    }

    // Sort
    let sorted = [...unique];
    if (sortMode === "asc") {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortMode === "desc") {
      sorted.sort((a, b) => b.localeCompare(a));
    }

    const duplicatesRemoved = totalLines - unique.length;

    // Find the most duplicated lines
    const topDuplicates = Object.entries(duplicateCounts)
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      output: sorted.join("\n"),
      totalLines,
      uniqueLines: unique.length,
      duplicatesRemoved,
      topDuplicates,
    };
  }, [text, caseSensitive, trimLines, removeEmpty, sortMode]);

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(result.output);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(""), 1200);
  }

  function applyToInput() {
    setText(result.output);
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  return (
    <div>
      {/* Input */}
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
          <div className="text-sm font-semibold">Input (one item per line)</div>
          <div className="flex items-center gap-2">
            <span
              className={cx(
                "text-xs tabular-nums",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              {formatNumber(result.totalLines)} lines
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
            rows={8}
            placeholder={"apple\nbanana\napple\ncherry\nbanana\napple\n\nPaste your list here, one item per line…"}
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
              isDark
                ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Options */}
      <div className="mt-4">
        <div
          className={cx(
            "text-xs uppercase tracking-wide mb-2",
            isDark ? "text-neutral-400" : "text-neutral-500"
          )}
        >
          Options
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "trim", label: "Trim whitespace", value: trimLines, toggle: () => setTrimLines(!trimLines) },
            { id: "empty", label: "Remove empty lines", value: removeEmpty, toggle: () => setRemoveEmpty(!removeEmpty) },
            { id: "case", label: "Case sensitive", value: caseSensitive, toggle: () => setCaseSensitive(!caseSensitive) },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={opt.toggle}
              className={cx(
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                opt.value
                  ? isDark
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-emerald-500/40 bg-emerald-50"
                  : isDark
                    ? "border-white/10 hover:bg-white/5"
                    : "border-black/10 hover:bg-black/5"
              )}
            >
              <div
                className={cx(
                  "w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0",
                  opt.value
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : isDark
                      ? "border-white/20"
                      : "border-black/20"
                )}
              >
                {opt.value ? "✓" : ""}
              </div>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className={cx(
              "text-xs uppercase tracking-wide",
              isDark ? "text-neutral-400" : "text-neutral-500"
            )}
          >
            Sort:
          </div>
          {(["original", "asc", "desc"] as SortMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSortMode(m)}
              className={cx(
                "rounded-xl px-3 py-1.5 text-xs border transition-colors",
                sortMode === m
                  ? isDark
                    ? "border-emerald-500/40 bg-emerald-500/10 font-semibold"
                    : "border-emerald-500/40 bg-emerald-50 font-semibold"
                  : isDark
                    ? "border-white/10 hover:bg-white/5"
                    : "border-black/10 hover:bg-black/5"
              )}
            >
              {m === "original" ? "Original order" : m === "asc" ? "A → Z" : "Z → A"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      {text.length > 0 && (
        <div
          className={cx(
            "mt-4 rounded-xl border p-3 flex flex-wrap items-center gap-4",
            isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
          )}
        >
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            <span className="font-medium">{formatNumber(result.totalLines)}</span> total lines
          </div>
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            <span className="font-medium">{formatNumber(result.uniqueLines)}</span> unique
          </div>
          <div
            className={cx(
              "text-xs",
              result.duplicatesRemoved > 0 ? "text-emerald-400" : isDark ? "text-neutral-500" : "text-neutral-400"
            )}
          >
            <span className="font-medium">{formatNumber(result.duplicatesRemoved)}</span> duplicates removed
          </div>
        </div>
      )}

      {/* Top duplicates */}
      {result.topDuplicates.length > 0 && (
        <div className="mt-3">
          <div
            className={cx(
              "text-xs uppercase tracking-wide mb-2",
              isDark ? "text-neutral-400" : "text-neutral-500"
            )}
          >
            Most Duplicated
          </div>
          <div className="flex flex-wrap gap-2">
            {result.topDuplicates.map(([line, count]) => (
              <div
                key={line}
                className={cx(
                  "rounded-xl border px-3 py-1.5 text-xs",
                  isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
                )}
              >
                <span className="font-mono">{line.length > 30 ? line.slice(0, 30) + "..." : line}</span>
                <span className={cx("ml-2", isDark ? "text-neutral-400" : "text-neutral-500")}>
                  {count}x
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output */}
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
          <div className="text-sm font-semibold">
            Unique Lines ({formatNumber(result.uniqueLines)})
          </div>
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
              onClick={copyOutput}
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark
                  ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                  : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
              )}
            >
              Copy
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
            {result.output || "\u00A0"}
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
