"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Analysis ─────────────────────────────────────────────────── */
interface LineStats {
  totalLines: number;
  nonEmptyLines: number;
  emptyLines: number;
  whitespaceOnlyLines: number;
  avgCharsPerLine: number;
  longestLine: { index: number; length: number; content: string };
  shortestNonEmpty: { index: number; length: number; content: string };
  lineLengths: number[];
}

function analyzeLines(text: string): LineStats | null {
  if (!text) return null;

  const lines = text.split("\n");
  const totalLines = lines.length;

  let nonEmptyLines = 0;
  let emptyLines = 0;
  let whitespaceOnlyLines = 0;
  let totalChars = 0;
  let longestLine = { index: 0, length: 0, content: "" };
  let shortestNonEmpty = { index: -1, length: Infinity, content: "" };
  const lineLengths: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const len = line.length;
    lineLengths.push(len);
    totalChars += len;

    if (line.length === 0) {
      emptyLines++;
    } else if (line.trim().length === 0) {
      whitespaceOnlyLines++;
    } else {
      nonEmptyLines++;
    }

    if (len > longestLine.length) {
      longestLine = { index: i + 1, length: len, content: line };
    }
    if (line.trim().length > 0 && len < shortestNonEmpty.length) {
      shortestNonEmpty = { index: i + 1, length: len, content: line };
    }
  }

  if (shortestNonEmpty.index === -1) {
    shortestNonEmpty = { index: 0, length: 0, content: "" };
  }

  return {
    totalLines,
    nonEmptyLines,
    emptyLines,
    whitespaceOnlyLines,
    avgCharsPerLine: totalLines > 0 ? totalChars / totalLines : 0,
    longestLine,
    shortestNonEmpty,
    lineLengths,
  };
}

/* ─── Histogram component ──────────────────────────────────────── */
function LengthHistogram({ lengths, isDark }: { lengths: number[]; isDark: boolean }) {
  if (lengths.length === 0) return null;

  const maxLen = Math.max(...lengths);
  const bucketSize = maxLen <= 20 ? 5 : maxLen <= 100 ? 10 : 20;
  const buckets: Record<string, number> = {};

  for (const len of lengths) {
    const bucket = Math.floor(len / bucketSize) * bucketSize;
    const label = `${bucket}-${bucket + bucketSize - 1}`;
    buckets[label] = (buckets[label] || 0) + 1;
  }

  const entries = Object.entries(buckets).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
  const max = Math.max(...entries.map(([, v]) => v));
  const barColor = isDark ? "bg-emerald-500/60" : "bg-emerald-500/40";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-1">
      {entries.map(([label, count]) => (
        <div key={label} className="flex items-center gap-2 text-xs">
          <span className="w-16 truncate text-right font-mono">{label}</span>
          <div
            className="flex-1 h-4 rounded overflow-hidden"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
          >
            <div
              className={cx("h-full rounded", barColor)}
              style={{ width: `${(count / max) * 100}%` }}
            />
          </div>
          <span className={cx("w-8 text-right font-mono", muted)}>{count}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export function LineCounterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [showNumbered, setShowNumbered] = useState(false);
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const stats = useMemo(() => analyzeLines(input), [input]);
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const numberedOutput = useMemo(() => {
    if (!input) return "";
    return input
      .split("\n")
      .map((line, i) => `${String(i + 1).padStart(4, " ")} | ${line}`)
      .join("\n");
  }, [input]);

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const cardBg = isDark ? "bg-neutral-950 border-white/10" : "bg-neutral-50 border-black/10";

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowNumbered(!showNumbered)}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            showNumbered ? btnActive : btnBase
          )}
        >
          {showNumbered ? "Hide Line Numbers" : "Number Lines"}
        </button>
        <button
          onClick={() => { setInput(""); setCopied(""); setShowNumbered(false); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="line-counter-input" className="text-sm font-semibold block mb-2">
          Paste Text to Count Lines
        </label>
        <textarea
          id="line-counter-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your text here to count lines, view stats, and see length distribution..."
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {wordCount} word{wordCount !== 1 ? "s" : ""} · {input.length} char{input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Results */}
      {stats && (
        <div aria-live="polite" className="space-y-4">
          {/* Line counts */}
          <div className={cx("rounded-xl border p-4", base)}>
            <h3 className="text-sm font-semibold mb-3">Line Counts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Lines", value: stats.totalLines },
                { label: "Non-Empty Lines", value: stats.nonEmptyLines },
                { label: "Empty Lines", value: stats.emptyLines },
                { label: "Whitespace-Only", value: stats.whitespaceOnlyLines },
              ].map((s) => (
                <div key={s.label} className={cx("rounded-lg border p-2 text-center", cardBg)}>
                  <div className="text-lg font-bold font-mono">{s.value.toLocaleString()}</div>
                  <div className={cx("text-xs", muted)}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Line stats */}
          <div className={cx("rounded-xl border p-4", base)}>
            <h3 className="text-sm font-semibold mb-3">Line Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={cx("rounded-lg border p-3", cardBg)}>
                <div className="text-sm font-bold font-mono">
                  {stats.avgCharsPerLine.toFixed(1)} chars
                </div>
                <div className={cx("text-xs", muted)}>Avg Characters Per Line</div>
              </div>
              <div className={cx("rounded-lg border p-3", cardBg)}>
                <div className="text-sm font-bold font-mono">
                  {stats.longestLine.length} chars (line {stats.longestLine.index})
                </div>
                <div className={cx("text-xs mt-1 font-mono truncate", muted)} title={stats.longestLine.content}>
                  {stats.longestLine.content.slice(0, 60)}{stats.longestLine.content.length > 60 ? "..." : ""}
                </div>
                <div className={cx("text-xs", muted)}>Longest Line</div>
              </div>
              {stats.shortestNonEmpty.index > 0 && (
                <div className={cx("rounded-lg border p-3", cardBg)}>
                  <div className="text-sm font-bold font-mono">
                    {stats.shortestNonEmpty.length} chars (line {stats.shortestNonEmpty.index})
                  </div>
                  <div className={cx("text-xs mt-1 font-mono truncate", muted)} title={stats.shortestNonEmpty.content}>
                    {stats.shortestNonEmpty.content.slice(0, 60)}{stats.shortestNonEmpty.content.length > 60 ? "..." : ""}
                  </div>
                  <div className={cx("text-xs", muted)}>Shortest Non-Empty Line</div>
                </div>
              )}
            </div>
          </div>

          {/* Line length distribution */}
          {stats.lineLengths.length > 1 && (
            <div className={cx("rounded-xl border p-4", base)}>
              <h3 className="text-sm font-semibold mb-3">Line Length Distribution (characters per line)</h3>
              <LengthHistogram lengths={stats.lineLengths} isDark={isDark} />
            </div>
          )}

          {/* Numbered output */}
          {showNumbered && (
            <div className={cx("rounded-xl border p-4", base)}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Numbered Lines</h3>
                <button
                  onClick={() => copyText(numberedOutput, "numbered")}
                  className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
                  aria-label="Copy numbered lines"
                >
                  {copied === "numbered" ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono overflow-x-auto whitespace-pre", inputBase)}>
                {numberedOutput}
              </pre>
            </div>
          )}

          {/* Copy summary */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                const summary = `Total: ${stats.totalLines} | Non-empty: ${stats.nonEmptyLines} | Empty: ${stats.emptyLines} | Avg chars/line: ${stats.avgCharsPerLine.toFixed(1)}`;
                copyText(summary, "summary");
              }}
              className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
              aria-label="Copy summary"
            >
              {copied === "summary" ? "Copied!" : "Copy Summary"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
