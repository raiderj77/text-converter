"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── LCS diff (line-level) ─── */
type DiffOp = "equal" | "add" | "remove";
type DiffLine = { op: DiffOp; textA: string; textB: string; lineA: number | null; lineB: number | null };

function diffLines(a: string[], b: string[]): DiffLine[] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);

  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.push({ op: "equal", textA: a[i - 1], textB: b[j - 1], lineA: i, lineB: j });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ op: "add", textA: "", textB: b[j - 1], lineA: null, lineB: j });
      j--;
    } else {
      result.push({ op: "remove", textA: a[i - 1], textB: "", lineA: i, lineB: null });
      i--;
    }
  }
  return result.reverse();
}

/* ─── Word-level diff within a line ─── */
type WordSpan = { text: string; changed: boolean };

function diffWords(a: string, b: string): { wordsA: WordSpan[]; wordsB: WordSpan[] } {
  const tokA = a.split(/(\s+)/);
  const tokB = b.split(/(\s+)/);
  const m = tokA.length, n = tokB.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = tokA[i - 1] === tokB[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);

  const wordsA: WordSpan[] = [];
  const wordsB: WordSpan[] = [];
  let i = m, j = n;
  const stackA: WordSpan[] = [];
  const stackB: WordSpan[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && tokA[i - 1] === tokB[j - 1]) {
      stackA.push({ text: tokA[i - 1], changed: false });
      stackB.push({ text: tokB[j - 1], changed: false });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stackB.push({ text: tokB[j - 1], changed: true });
      j--;
    } else {
      stackA.push({ text: tokA[i - 1], changed: true });
      i--;
    }
  }
  stackA.reverse().forEach((s) => wordsA.push(s));
  stackB.reverse().forEach((s) => wordsB.push(s));
  return { wordsA, wordsB };
}

function normLine(line: string, ic: boolean, iw: boolean): string {
  let s = line;
  if (iw) s = s.replace(/\s+/g, " ").trim();
  if (ic) s = s.toLowerCase();
  return s;
}

type ViewMode = "split" | "inline";

export function TextDiffTool() {
  const { isDark } = useTheme();
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [collapseUnchanged, setCollapseUnchanged] = useState(false);
  const [toast, setToast] = useState("");
  const [currentDiff, setCurrentDiff] = useState(0);
  const diffRefs = useRef<(HTMLDivElement | null)[]>([]);
  const refA = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const a = localStorage.getItem("fmc_diff_a");
    const b = localStorage.getItem("fmc_diff_b");
    if (a) setTextA(a);
    if (b) setTextB(b);
  }, []);
  useEffect(() => { localStorage.setItem("fmc_diff_a", textA); }, [textA]);
  useEffect(() => { localStorage.setItem("fmc_diff_b", textB); }, [textB]);

  const result = useMemo(() => {
    const rawA = textA.split("\n");
    const rawB = textB.split("\n");
    const normA = rawA.map((l) => normLine(l, ignoreCase, ignoreWhitespace));
    const normB = rawB.map((l) => normLine(l, ignoreCase, ignoreWhitespace));
    const diff = diffLines(normA, normB);

    let idxA = 0, idxB = 0;
    const mapped: DiffLine[] = diff.map((d) => {
      if (d.op === "equal") { const t = rawA[idxA]; idxA++; idxB++; return { ...d, textA: t, textB: rawB[idxB - 1] }; }
      if (d.op === "remove") { const t = rawA[idxA]; idxA++; return { ...d, textA: t }; }
      const t = rawB[idxB]; idxB++; return { ...d, textB: t };
    });

    // Pair adjacent remove+add for word-level diff
    const paired: (DiffLine & { wordsA?: WordSpan[]; wordsB?: WordSpan[] })[] = [];
    for (let k = 0; k < mapped.length; k++) {
      if (mapped[k].op === "remove" && k + 1 < mapped.length && mapped[k + 1].op === "add") {
        const wd = diffWords(mapped[k].textA, mapped[k + 1].textB);
        paired.push({ ...mapped[k], op: "remove", wordsA: wd.wordsA });
        paired.push({ ...mapped[k + 1], op: "add", wordsB: wd.wordsB });
        k++;
      } else {
        paired.push(mapped[k]);
      }
    }

    const added = paired.filter((d) => d.op === "add").length;
    const removed = paired.filter((d) => d.op === "remove").length;
    const unchanged = paired.filter((d) => d.op === "equal").length;
    const total = paired.length;
    const similarity = total > 0 ? Math.round((unchanged / total) * 100) : 100;
    const diffIndices = paired.map((d, i) => d.op !== "equal" ? i : -1).filter((i) => i >= 0);

    return { diff: paired, added, removed, unchanged, total, similarity, diffIndices };
  }, [textA, textB, ignoreCase, ignoreWhitespace]);

  function navDiff(dir: 1 | -1) {
    if (result.diffIndices.length === 0) return;
    const next = (currentDiff + dir + result.diffIndices.length) % result.diffIndices.length;
    setCurrentDiff(next);
    diffRefs.current[result.diffIndices[next]]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function swapTexts() { const tmp = textA; setTextA(textB); setTextB(tmp); }
  function clearAll() { setTextA(""); setTextB(""); refA.current?.focus(); }

  function copyDiff() {
    const output = result.diff
      .map((d) => d.op === "add" ? `+ ${d.textB}` : d.op === "remove" ? `- ${d.textA}` : `  ${d.textA}`)
      .join("\n");
    navigator.clipboard.writeText(output).then(
      () => { setToast("Copied!"); setTimeout(() => setToast(""), 1200); },
      () => { setToast("Failed"); setTimeout(() => setToast(""), 1200); }
    );
  }

  const hasInput = textA.length > 0 || textB.length > 0;
  const hasDiffs = result.diffIndices.length > 0;

  function renderWordSpans(spans: WordSpan[] | undefined, fallback: string, type: "add" | "remove") {
    if (!spans) return <span>{fallback || "\u00A0"}</span>;
    return (
      <>
        {spans.map((s, i) => (
          <span
            key={i}
            className={s.changed ? (type === "add"
              ? isDark ? "bg-emerald-500/30 rounded px-0.5" : "bg-emerald-200 rounded px-0.5"
              : isDark ? "bg-red-500/30 rounded px-0.5" : "bg-red-200 rounded px-0.5"
            ) : ""}
          >
            {s.text}
          </span>
        ))}
      </>
    );
  }

  // Collapse logic: group consecutive equal lines
  const displayLines = useMemo(() => {
    if (!collapseUnchanged) return result.diff.map((d, i) => ({ type: "line" as const, line: d, idx: i }));

    const items: ({ type: "line"; line: typeof result.diff[0]; idx: number } | { type: "collapsed"; count: number })[] = [];
    let equalRun = 0;
    for (let i = 0; i < result.diff.length; i++) {
      if (result.diff[i].op === "equal") {
        equalRun++;
      } else {
        if (equalRun > 3) {
          items.push({ type: "collapsed", count: equalRun });
        } else {
          for (let k = i - equalRun; k < i; k++)
            items.push({ type: "line", line: result.diff[k], idx: k });
        }
        equalRun = 0;
        items.push({ type: "line", line: result.diff[i], idx: i });
      }
    }
    if (equalRun > 3) items.push({ type: "collapsed", count: equalRun });
    else for (let k = result.diff.length - equalRun; k < result.diff.length; k++)
      items.push({ type: "line", line: result.diff[k], idx: k });
    return items;
  }, [result.diff, collapseUnchanged]);

  const Checkbox = ({ checked, toggle, label }: { checked: boolean; toggle: () => void; label: string }) => (
    <button type="button" onClick={toggle} className={cx(
      "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
      checked ? isDark ? "border-emerald-500/40 bg-emerald-500/10" : "border-emerald-500/40 bg-emerald-50" : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
    )}>
      <div className={cx("w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0", checked ? "bg-emerald-500 border-emerald-500 text-white" : isDark ? "border-white/20" : "border-black/20")}>
        {checked ? "✓" : ""}
      </div>
      {label}
    </button>
  );

  return (
    <div>
      {/* Two inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Original Text", val: textA, set: setTextA, ref: refA, placeholder: "Paste original text here..." },
          { label: "Modified Text", val: textB, set: setTextB, ref: null as any, placeholder: "Paste modified text here..." },
        ].map((box) => (
          <div key={box.label} className={cx("rounded-2xl border shadow-sm", isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10")}>
            <div className={cx("flex items-center justify-between px-3 py-2 border-b", isDark ? "border-white/10" : "border-black/5")}>
              <span className="text-sm font-semibold">{box.label}</span>
              <span className={cx("text-xs tabular-nums", isDark ? "text-neutral-400" : "text-neutral-500")}>{formatNumber(box.val.split("\n").length)} lines</span>
            </div>
            <div className="p-3">
              <textarea
                ref={box.ref}
                value={box.val}
                onChange={(e) => box.set(e.target.value)}
                rows={8}
                spellCheck={false}
                placeholder={box.placeholder}
                className={cx("w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono", isDark ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10" : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10")}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Options */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Checkbox checked={ignoreCase} toggle={() => setIgnoreCase(!ignoreCase)} label="Ignore case" />
        <Checkbox checked={ignoreWhitespace} toggle={() => setIgnoreWhitespace(!ignoreWhitespace)} label="Ignore whitespace" />
        <Checkbox checked={collapseUnchanged} toggle={() => setCollapseUnchanged(!collapseUnchanged)} label="Focus changes" />

        {/* View mode */}
        {(["split", "inline"] as ViewMode[]).map((m) => (
          <button key={m} type="button" onClick={() => setViewMode(m)} className={cx(
            "rounded-xl px-3 py-2 text-sm border transition-colors capitalize",
            viewMode === m ? isDark ? "border-blue-500/40 bg-blue-500/10 font-semibold" : "border-blue-500/40 bg-blue-50 font-semibold" : isDark ? "border-white/10 hover:bg-white/5" : "border-black/10 hover:bg-black/5"
          )}>{m === "split" ? "Side by Side" : "Inline"}</button>
        ))}

        <button type="button" onClick={swapTexts} className={cx("rounded-xl px-3 py-2 text-sm border transition-colors", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>⇄ Swap</button>
        <button type="button" onClick={copyDiff} disabled={!hasInput} className={cx("rounded-xl px-3 py-2 text-sm border transition-colors", hasInput ? isDark ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20" : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100" : "opacity-40 cursor-not-allowed border-white/5")}>Copy Diff</button>
        <button type="button" onClick={clearAll} className={cx("rounded-xl px-3 py-2 text-sm border transition-colors", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>Clear</button>
      </div>

      {/* Stats + nav */}
      {hasInput && (
        <div className={cx("mt-4 rounded-xl border p-3 flex flex-wrap items-center gap-4", isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white")}>
          <span className="text-xs"><span className="text-emerald-400 font-medium">+{formatNumber(result.added)}</span> added</span>
          <span className="text-xs"><span className="text-red-400 font-medium">-{formatNumber(result.removed)}</span> removed</span>
          <span className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>{formatNumber(result.unchanged)} unchanged</span>
          <span className={cx("text-xs font-medium", result.similarity > 80 ? "text-emerald-400" : result.similarity > 50 ? "text-amber-400" : "text-red-400")}>{result.similarity}% similar</span>
          {hasDiffs && (
            <span className="flex items-center gap-1 ml-auto">
              <button type="button" onClick={() => navDiff(-1)} className={cx("rounded-lg px-2 py-1 text-xs border", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>← Prev</button>
              <span className={cx("text-xs tabular-nums px-1", isDark ? "text-neutral-400" : "text-neutral-500")}>{currentDiff + 1}/{result.diffIndices.length}</span>
              <button type="button" onClick={() => navDiff(1)} className={cx("rounded-lg px-2 py-1 text-xs border", isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5")}>Next →</button>
            </span>
          )}
        </div>
      )}

      {/* Diff output */}
      {hasInput && (
        <div className={cx("mt-4 rounded-2xl border shadow-sm overflow-hidden", isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10")}>
          <div className={cx("px-3 py-2 border-b text-sm font-semibold", isDark ? "border-white/10" : "border-black/5")}>
            Differences {viewMode === "split" ? "(Side by Side)" : "(Inline)"}
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {viewMode === "inline" ? (
              /* Inline / Unified view */
              displayLines.map((item, i) => {
                if (item.type === "collapsed") return (
                  <div key={`c-${i}`} className={cx("px-3 py-1 text-xs text-center", isDark ? "text-neutral-500 bg-neutral-950" : "text-neutral-400 bg-neutral-50")}>
                    ··· {item.count} unchanged lines ···
                  </div>
                );
                const d = item.line;
                return (
                  <div key={i} ref={(el) => { diffRefs.current[item.idx] = el; }}
                    className={cx("flex text-xs font-mono leading-6 border-b",
                      d.op === "add" ? isDark ? "bg-emerald-500/10 border-emerald-500/10" : "bg-emerald-50 border-emerald-100"
                      : d.op === "remove" ? isDark ? "bg-red-500/10 border-red-500/10" : "bg-red-50 border-red-100"
                      : isDark ? "border-white/5" : "border-black/5"
                    )}>
                    <div className={cx("w-10 shrink-0 text-right pr-1 py-0.5 select-none", isDark ? "text-neutral-500" : "text-neutral-400")}>
                      {d.lineA ?? ""}
                    </div>
                    <div className={cx("w-10 shrink-0 text-right pr-1 py-0.5 select-none", isDark ? "text-neutral-500" : "text-neutral-400")}>
                      {d.lineB ?? ""}
                    </div>
                    <div className={cx("w-6 shrink-0 text-center py-0.5 select-none",
                      d.op === "add" ? "text-emerald-400" : d.op === "remove" ? "text-red-400" : isDark ? "text-neutral-600" : "text-neutral-300"
                    )}>{d.op === "add" ? "+" : d.op === "remove" ? "-" : " "}</div>
                    <div className={cx("flex-1 px-2 py-0.5 whitespace-pre-wrap break-words",
                      d.op === "add" ? isDark ? "text-emerald-300" : "text-emerald-800"
                      : d.op === "remove" ? isDark ? "text-red-300" : "text-red-800"
                      : isDark ? "text-neutral-300" : "text-neutral-700"
                    )}>
                      {d.op === "add" ? renderWordSpans((d as any).wordsB, d.textB, "add")
                       : d.op === "remove" ? renderWordSpans((d as any).wordsA, d.textA, "remove")
                       : (d.textA || "\u00A0")}
                    </div>
                  </div>
                );
              })
            ) : (
              /* Side-by-side view */
              displayLines.map((item, i) => {
                if (item.type === "collapsed") return (
                  <div key={`c-${i}`} className={cx("px-3 py-1 text-xs text-center", isDark ? "text-neutral-500 bg-neutral-950" : "text-neutral-400 bg-neutral-50")}>
                    ··· {item.count} unchanged lines ···
                  </div>
                );
                const d = item.line;
                return (
                  <div key={i} ref={(el) => { diffRefs.current[item.idx] = el; }} className="grid grid-cols-2">
                    {/* Left (original) */}
                    <div className={cx("flex text-xs font-mono leading-6 border-b border-r",
                      d.op === "remove" ? isDark ? "bg-red-500/10 border-red-500/10" : "bg-red-50 border-red-100"
                      : d.op === "add" ? isDark ? "bg-neutral-950 border-white/5" : "bg-neutral-50 border-black/5"
                      : isDark ? "border-white/5" : "border-black/5"
                    )}>
                      <div className={cx("w-8 shrink-0 text-right pr-1 py-0.5 select-none", isDark ? "text-neutral-600" : "text-neutral-400")}>
                        {d.lineA ?? ""}
                      </div>
                      <div className={cx("flex-1 px-2 py-0.5 whitespace-pre-wrap break-words",
                        d.op === "remove" ? isDark ? "text-red-300" : "text-red-800" : isDark ? "text-neutral-300" : "text-neutral-700"
                      )}>
                        {d.op === "remove" ? renderWordSpans((d as any).wordsA, d.textA, "remove") : d.op === "equal" ? (d.textA || "\u00A0") : "\u00A0"}
                      </div>
                    </div>
                    {/* Right (modified) */}
                    <div className={cx("flex text-xs font-mono leading-6 border-b",
                      d.op === "add" ? isDark ? "bg-emerald-500/10 border-emerald-500/10" : "bg-emerald-50 border-emerald-100"
                      : d.op === "remove" ? isDark ? "bg-neutral-950 border-white/5" : "bg-neutral-50 border-black/5"
                      : isDark ? "border-white/5" : "border-black/5"
                    )}>
                      <div className={cx("w-8 shrink-0 text-right pr-1 py-0.5 select-none", isDark ? "text-neutral-600" : "text-neutral-400")}>
                        {d.lineB ?? ""}
                      </div>
                      <div className={cx("flex-1 px-2 py-0.5 whitespace-pre-wrap break-words",
                        d.op === "add" ? isDark ? "text-emerald-300" : "text-emerald-800" : isDark ? "text-neutral-300" : "text-neutral-700"
                      )}>
                        {d.op === "add" ? renderWordSpans((d as any).wordsB, d.textB, "add") : d.op === "equal" ? (d.textB || "\u00A0") : "\u00A0"}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      <div className={cx("mt-3 text-xs text-center", isDark ? "text-neutral-500" : "text-neutral-400")}>
        Word-level highlighting · All processing in your browser · Ctrl/⌘ + L toggles theme
      </div>

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">{toast}</div>}
    </div>
  );
}
