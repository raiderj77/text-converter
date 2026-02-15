"use client";

import { useMemo, useRef, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Flag = "g" | "i" | "m" | "s" | "u";

interface MatchInfo {
  full: string;
  index: number;
  length: number;
  groups: string[];
  namedGroups: Record<string, string>;
}

const FLAG_LABELS: Record<Flag, string> = {
  g: "Global",
  i: "Case Insensitive",
  m: "Multiline",
  s: "Dotall",
  u: "Unicode",
};

const QUICK_REF = [
  {
    label: "Character Classes",
    items: [
      { p: ".", d: "Any character except newline" },
      { p: "\\d", d: "Digit [0-9]" },
      { p: "\\D", d: "Non-digit" },
      { p: "\\w", d: "Word char [a-zA-Z0-9_]" },
      { p: "\\W", d: "Non-word char" },
      { p: "\\s", d: "Whitespace" },
      { p: "\\S", d: "Non-whitespace" },
      { p: "[abc]", d: "Any of a, b, or c" },
      { p: "[^abc]", d: "Not a, b, or c" },
    ],
  },
  {
    label: "Anchors",
    items: [
      { p: "^", d: "Start of string/line" },
      { p: "$", d: "End of string/line" },
      { p: "\\b", d: "Word boundary" },
      { p: "\\B", d: "Non-word boundary" },
    ],
  },
  {
    label: "Quantifiers",
    items: [
      { p: "*", d: "0 or more" },
      { p: "+", d: "1 or more" },
      { p: "?", d: "0 or 1 (optional)" },
      { p: "{n}", d: "Exactly n times" },
      { p: "{n,}", d: "n or more" },
      { p: "{n,m}", d: "Between n and m" },
      { p: "*?", d: "0+ (lazy)" },
      { p: "+?", d: "1+ (lazy)" },
    ],
  },
  {
    label: "Groups & Lookaround",
    items: [
      { p: "(abc)", d: "Capture group" },
      { p: "(?:abc)", d: "Non-capturing group" },
      { p: "(?<n>abc)", d: "Named capture" },
      { p: "(?=abc)", d: "Positive lookahead" },
      { p: "(?!abc)", d: "Negative lookahead" },
      { p: "(?<=abc)", d: "Positive lookbehind" },
      { p: "(?<!abc)", d: "Negative lookbehind" },
      { p: "a|b", d: "Alternation (a or b)" },
    ],
  },
];

const PRESETS = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "gi" },
  { label: "URL", pattern: "https?://[^\\s]+", flags: "gi" },
  { label: "IPv4", pattern: "\\b\\d{1,3}(\\.\\d{1,3}){3}\\b", flags: "g" },
  { label: "HEX Color", pattern: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b", flags: "gi" },
  { label: "Date", pattern: "\\d{4}-\\d{2}-\\d{2}", flags: "g" },
  { label: "Phone", pattern: "\\+?1?[-.\\s]?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { label: "HTML Tag", pattern: "<([a-z][a-z0-9]*)\\b[^>]*>(.*?)</\\1>", flags: "gi" },
  { label: "Words", pattern: "\\b\\w+\\b", flags: "g" },
];

const MATCH_COLORS = [
  "bg-emerald-500/30 border-emerald-400/50",
  "bg-sky-500/30 border-sky-400/50",
  "bg-amber-500/30 border-amber-400/50",
  "bg-purple-500/30 border-purple-400/50",
  "bg-rose-500/30 border-rose-400/50",
  "bg-teal-500/30 border-teal-400/50",
];

export function RegexTesterTool() {
  const { isDark } = useTheme();
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState<Set<Flag>>(new Set(["g"]));
  const [testStr, setTestStr] = useState("");
  const [replaceStr, setReplaceStr] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [copied, setCopied] = useState("");

  const flagStr = useMemo(() => {
    const order: Flag[] = ["g", "i", "m", "s", "u"];
    return order.filter((f) => flags.has(f)).join("");
  }, [flags]);

  const toggleFlag = (f: Flag) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f); else next.add(f);
      return next;
    });
  };

  const { regex, error, matches, matchCount } = useMemo(() => {
    if (!pattern) return { regex: null, error: null, matches: [] as MatchInfo[], matchCount: 0 };
    try {
      const re = new RegExp(pattern, flagStr);
      const results: MatchInfo[] = [];
      if (testStr) {
        if (flagStr.includes("g")) {
          let m: RegExpExecArray | null;
          const seen = new Set<number>();
          while ((m = re.exec(testStr)) !== null) {
            if (seen.has(m.index)) break;
            seen.add(m.index);
            results.push({
              full: m[0], index: m.index, length: m[0].length,
              groups: m.slice(1),
              namedGroups: m.groups ? { ...m.groups } : {},
            });
            if (m[0].length === 0) re.lastIndex++;
          }
        } else {
          const m = re.exec(testStr);
          if (m) {
            results.push({
              full: m[0], index: m.index, length: m[0].length,
              groups: m.slice(1),
              namedGroups: m.groups ? { ...m.groups } : {},
            });
          }
        }
      }
      return { regex: re, error: null, matches: results, matchCount: results.length };
    } catch (e: any) {
      return { regex: null, error: e.message || "Invalid regex", matches: [] as MatchInfo[], matchCount: 0 };
    }
  }, [pattern, flagStr, testStr]);

  const replaceResult = useMemo(() => {
    if (!regex || !testStr || !showReplace) return "";
    try { return testStr.replace(regex, replaceStr); } catch { return ""; }
  }, [regex, testStr, replaceStr, showReplace]);

  const highlightedTest = useMemo(() => {
    if (!matches.length || !testStr) return null;
    const parts: { text: string; matchIdx: number | null }[] = [];
    let lastEnd = 0;
    matches.forEach((m, i) => {
      if (m.index > lastEnd) parts.push({ text: testStr.slice(lastEnd, m.index), matchIdx: null });
      parts.push({ text: m.full, matchIdx: i });
      lastEnd = m.index + m.length;
    });
    if (lastEnd < testStr.length) parts.push({ text: testStr.slice(lastEnd), matchIdx: null });
    return parts;
  }, [matches, testStr]);

  const applyPreset = (p: typeof PRESETS[0]) => {
    setPattern(p.pattern);
    const newFlags = new Set<Flag>();
    for (const c of p.flags) newFlags.add(c as Flag);
    setFlags(newFlags);
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  };

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";

  return (
    <div className="space-y-4">
      {/* Pattern input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex items-center gap-2 mb-3">
          <span className={cx("text-lg font-mono", isDark ? "text-neutral-500" : "text-neutral-400")}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern..."
            className={cx("flex-1 rounded-lg border px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
            spellCheck={false}
            autoComplete="off"
          />
          <span className={cx("text-lg font-mono", isDark ? "text-neutral-500" : "text-neutral-400")}>/{flagStr}</span>
        </div>
        {/* Flags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={cx("text-xs", isDark ? "text-neutral-500" : "text-neutral-400")}>Flags:</span>
          {(Object.keys(FLAG_LABELS) as Flag[]).map((f) => (
            <button key={f} onClick={() => toggleFlag(f)}
              className={cx("rounded-md border px-2.5 py-1 text-xs font-mono transition-colors", flags.has(f) ? btnActive : btnBase)}
              title={FLAG_LABELS[f]}
            >
              {f} <span className="hidden sm:inline ml-1 font-sans opacity-70">{FLAG_LABELS[f]}</span>
            </button>
          ))}
        </div>
        {error && (
          <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs text-red-400 font-mono">{error}</div>
        )}
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        <span className={cx("text-xs py-1", isDark ? "text-neutral-500" : "text-neutral-400")}>Presets:</span>
        {PRESETS.map((p) => (
          <button key={p.label} onClick={() => applyPreset(p)}
            className={cx("rounded-lg border px-2.5 py-1 text-xs transition-colors", btnBase)}>{p.label}</button>
        ))}
      </div>

      {/* Test string */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Test String</label>
          <div className="flex items-center gap-3 text-xs">
            {matchCount > 0 && <span className="text-emerald-400 font-semibold">{matchCount} match{matchCount !== 1 ? "es" : ""}</span>}
            {pattern && !error && testStr && matchCount === 0 && <span className="text-red-400">No matches</span>}
          </div>
        </div>
        {highlightedTest && (
          <div className={cx("rounded-lg border p-3 mb-3 font-mono text-sm whitespace-pre-wrap break-all leading-relaxed", inputBase)}>
            {highlightedTest.map((part, i) =>
              part.matchIdx !== null ? (
                <mark key={i} className={cx("rounded px-0.5 border", MATCH_COLORS[part.matchIdx % MATCH_COLORS.length])} title={`Match ${part.matchIdx + 1}`}>{part.text}</mark>
              ) : (<span key={i}>{part.text}</span>)
            )}
          </div>
        )}
        <textarea
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder="Enter test string to match against..."
          rows={6}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          spellCheck={false}
        />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setShowReplace(!showReplace)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", showReplace ? btnActive : btnBase)}>
          Replace Mode
        </button>
        <button onClick={() => setShowRef(!showRef)}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", showRef ? btnActive : btnBase)}>
          Quick Reference
        </button>
        {pattern && (
          <button onClick={() => copyText(`/${pattern}/${flagStr}`, "regex")}
            className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", btnBase)}>
            {copied === "regex" ? "✓ Copied!" : "Copy Regex"}
          </button>
        )}
        <button onClick={() => { setPattern(""); setTestStr(""); setReplaceStr(""); setFlags(new Set(["g"])); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors", btnBase)}>
          Clear All
        </button>
      </div>

      {/* Replace */}
      {showReplace && (
        <div className={cx("rounded-xl border p-4", base)}>
          <label className="text-sm font-semibold block mb-2">Replace With</label>
          <input type="text" value={replaceStr} onChange={(e) => setReplaceStr(e.target.value)}
            placeholder="Replacement string ($1, $2 for groups)..."
            className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50 mb-3", inputBase)}
            spellCheck={false}
          />
          {replaceResult !== undefined && testStr && regex && (
            <>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold">Result</label>
                <button onClick={() => copyText(replaceResult, "replace")}
                  className={cx("rounded-md border px-2 py-0.5 text-xs transition-colors", btnBase)}>
                  {copied === "replace" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className={cx("rounded-lg border p-3 font-mono text-sm whitespace-pre-wrap break-all", inputBase)}>{replaceResult}</div>
            </>
          )}
        </div>
      )}

      {/* Match details */}
      {matches.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">Match Details</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {matches.slice(0, 100).map((m, i) => (
              <div key={i} className={cx("rounded-lg border p-3 text-xs font-mono", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-sans font-semibold text-emerald-400">Match {i + 1}</span>
                  <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
                    Index {m.index}–{m.index + m.length - 1} ({m.length} char{m.length !== 1 ? "s" : ""})
                  </span>
                </div>
                <div className={cx("rounded px-2 py-1", MATCH_COLORS[i % MATCH_COLORS.length])}>
                  {m.full || <span className="italic text-neutral-500">(empty)</span>}
                </div>
                {m.groups.length > 0 && m.groups.some((g) => g !== undefined) && (
                  <div className="mt-2 space-y-1">
                    {m.groups.map((g, gi) => g !== undefined ? (
                      <div key={gi} className="flex gap-2">
                        <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>Group {gi + 1}:</span>
                        <span className="text-sky-400">{g}</span>
                      </div>
                    ) : null)}
                  </div>
                )}
                {Object.keys(m.namedGroups).length > 0 && (
                  <div className="mt-2 space-y-1">
                    {Object.entries(m.namedGroups).map(([name, val]) => (
                      <div key={name} className="flex gap-2">
                        <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>&lt;{name}&gt;:</span>
                        <span className="text-purple-400">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {matches.length > 100 && (
              <div className="text-xs text-neutral-500 text-center py-2">Showing first 100 of {matches.length} matches</div>
            )}
          </div>
        </div>
      )}

      {/* Quick Reference */}
      {showRef && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUICK_REF.map((section) => (
              <div key={section.label}>
                <h4 className="text-xs font-semibold text-emerald-400 mb-2">{section.label}</h4>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <div key={item.p} className="flex items-center gap-2 text-xs">
                      <button onClick={() => setPattern((prev) => prev + item.p)}
                        className={cx("font-mono rounded px-1.5 py-0.5 border transition-colors shrink-0", btnBase)}
                        title={`Insert ${item.p}`}>{item.p}</button>
                      <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>{item.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
