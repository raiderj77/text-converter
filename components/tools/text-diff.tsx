"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Diff algorithm (simple LCS-based) ─── */

type DiffOp = "equal" | "add" | "remove";
type DiffLine = { op: DiffOp; text: string };

function diffLines(a: string[], b: string[]): DiffLine[] {
  const m = a.length;
  const n = b.length;

  // LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  // Backtrack
  const result: DiffLine[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.push({ op: "equal", text: a[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ op: "add", text: b[j - 1] });
      j--;
    } else {
      result.push({ op: "remove", text: a[i - 1] });
      i--;
    }
  }
  return result.reverse();
}

function normalizeLine(line: string, ignoreCase: boolean, ignoreWhitespace: boolean): string {
  let s = line;
  if (ignoreWhitespace) s = s.replace(/\s+/g, " ").trim();
  if (ignoreCase) s = s.toLowerCase();
  return s;
}

export function TextDiffTool() {
  const { isDark } = useTheme();
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [toast, setToast] = useState("");
  const refA = useRef<HTMLTextAreaElement | null>(null);

  // Load saved
  useEffect(() => {
    const a = localStorage.getItem("fmc_diff_a");
    const b = localStorage.getItem("fmc_diff_b");
    if (a) setTextA(a);
    if (b) setTextB(b);
  }, []);

  useEffect(() => { localStorage.setItem("fmc_diff_a", textA); }, [textA]);
  useEffect(() => { localStorage.setItem("fmc_diff_b", textB); }, [textB]);

  const result = useMemo(() => {
    const linesA = textA.split("\n");
    const linesB = textB.split("\n");

    const normA = linesA.map((l) => normalizeLine(l, ignoreCase, ignoreWhitespace));
    const normB = linesB.map((l) => normalizeLine(l, ignoreCase, ignoreWhitespace));

    const diff = diffLines(normA, normB);

    // Map back to original text
    let idxA = 0;
    let idxB = 0;
    const mapped: DiffLine[] = diff.map((d) => {
      if (d.op === "equal") {
        const text = linesA[idxA];
        idxA++;
        idxB++;
        return { op: "equal", text };
      } else if (d.op === "remove") {
        const text = linesA[idxA];
        idxA++;
        return { op: "remove", text };
      } else {
        const text = linesB[idxB];
        idxB++;
        return { op: "add", text };
      }
    });

    const added = mapped.filter((d) => d.op === "add").length;
    const removed = mapped.filter((d) => d.op === "remove").length;
    const unchanged = mapped.filter((d) => d.op === "equal").length;

    return { diff: mapped, added, removed, unchanged };
  }, [textA, textB, ignoreCase, ignoreWhitespace]);

  function swapTexts() {
    const tmp = textA;
    setTextA(textB);
    setTextB(tmp);
  }

  function clearAll() {
    setTextA("");
    setTextB("");
    refA.current?.focus();
  }

  function copyDiff() {
    const output = result.diff
      .map((d) => {
        if (d.op === "add") return `+ ${d.text}`;
        if (d.op === "remove") return `- ${d.text}`;
        return `  ${d.text}`;
      })
      .join("\n");
    navigator.clipboard.writeText(output).then(
      () => { setToast("Copied diff!"); window.setTimeout(() => setToast(""), 1200); },
      () => { setToast("Copy failed"); window.setTimeout(() => setToast(""), 1200); }
    );
  }

  const hasInput = textA.length > 0 || textB.length > 0;

  return (
    <div>
      {/* Two input boxes side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Original */}
        <div
          className={cx(
            "rounded-2xl border shadow-sm",
            isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
          )}
        >
          <div className={cx("px-3 py-2 border-b text-sm font-semibold", isDark ? "border-white/10" : "border-black/5")}>
            Original Text
          </div>
          <div className="p-3">
            <textarea
              ref={refA}
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              rows={10}
              spellCheck={false}
              placeholder="Paste original text here..."
              className={cx(
                "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
                isDark
                  ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                  : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
              )}
            />
          </div>
        </div>

        {/* Modified */}
        <div
          className={cx(
            "rounded-2xl border shadow-sm",
            isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
          )}
        >
          <div className={cx("px-3 py-2 border-b text-sm font-semibold", isDark ? "border-white/10" : "border-black/5")}>
            Modified Text
          </div>
          <div className="p-3">
            <textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              rows={10}
              spellCheck={false}
              placeholder="Paste modified text here..."
              className={cx(
                "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
                isDark
                  ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                  : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
              )}
            />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {[
          { id: "case", label: "Ignore case", value: ignoreCase, toggle: () => setIgnoreCase(!ignoreCase) },
          { id: "ws", label: "Ignore whitespace", value: ignoreWhitespace, toggle: () => setIgnoreWhitespace(!ignoreWhitespace) },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={opt.toggle}
            className={cx(
              "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
              opt.value
                ? isDark ? "border-emerald-500/40 bg-emerald-500/10" : "border-emerald-500/40 bg-emerald-50"
                : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
            )}
          >
            <div className={cx(
              "w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0",
              opt.value ? "bg-emerald-500 border-emerald-500 text-white" : isDark ? "border-white/20" : "border-black/20"
            )}>
              {opt.value ? "✓" : ""}
            </div>
            {opt.label}
          </button>
        ))}
        <button type="button" onClick={swapTexts} className={cx("rounded-xl px-3 py-2 text-sm border transition-colors", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>
          ⇄ Swap
        </button>
        <button type="button" onClick={copyDiff} disabled={!hasInput} className={cx("rounded-xl px-3 py-2 text-sm border transition-colors", hasInput ? isDark ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20" : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100" : "opacity-40 cursor-not-allowed border-white/5")}>
          Copy Diff
        </button>
        <button type="button" onClick={clearAll} className={cx("rounded-xl px-3 py-2 text-sm border transition-colors", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>
          Clear
        </button>
      </div>

      {/* Stats */}
      {hasInput && (
        <div className={cx("mt-4 rounded-xl border p-3 flex flex-wrap items-center gap-4", isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white")}>
          <div className="text-xs">
            <span className="text-emerald-400 font-medium">+{formatNumber(result.added)}</span> added
          </div>
          <div className="text-xs">
            <span className="text-red-400 font-medium">-{formatNumber(result.removed)}</span> removed
          </div>
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            <span className="font-medium">{formatNumber(result.unchanged)}</span> unchanged
          </div>
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            <span className="font-medium">{formatNumber(result.diff.length)}</span> total lines
          </div>
        </div>
      )}

      {/* Diff output */}
      {hasInput && (
        <div className={cx("mt-4 rounded-2xl border shadow-sm overflow-hidden", isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10")}>
          <div className={cx("px-3 py-2 border-b text-sm font-semibold", isDark ? "border-white/10" : "border-black/5")}>
            Differences
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {result.diff.map((d, i) => (
              <div
                key={i}
                className={cx(
                  "flex text-xs font-mono leading-6 border-b",
                  d.op === "add"
                    ? isDark ? "bg-emerald-500/10 border-emerald-500/10" : "bg-emerald-50 border-emerald-100"
                    : d.op === "remove"
                      ? isDark ? "bg-red-500/10 border-red-500/10" : "bg-red-50 border-red-100"
                      : isDark ? "border-white/5" : "border-black/5"
                )}
              >
                <div className={cx(
                  "w-8 shrink-0 text-center py-0.5 select-none",
                  d.op === "add" ? "text-emerald-400" : d.op === "remove" ? "text-red-400" : isDark ? "text-neutral-500" : "text-neutral-400"
                )}>
                  {d.op === "add" ? "+" : d.op === "remove" ? "-" : " "}
                </div>
                <div className={cx(
                  "flex-1 px-2 py-0.5 whitespace-pre-wrap break-words",
                  d.op === "add"
                    ? isDark ? "text-emerald-300" : "text-emerald-800"
                    : d.op === "remove"
                      ? isDark ? "text-red-300" : "text-red-800"
                      : isDark ? "text-neutral-300" : "text-neutral-700"
                )}>
                  {d.text || "\u00A0"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shortcut hint */}
      <div className={cx("mt-3 text-xs text-center", isDark ? "text-neutral-500" : "text-neutral-400")}>
        Ctrl/⌘ + L toggles theme
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
