"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cx, formatNumber } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── helpers ─── */

type IndentStyle = "2" | "4" | "tab";

function indentStr(style: IndentStyle) {
  return style === "tab" ? "\t" : " ".repeat(Number(style));
}

/** Try to fix common broken-JSON issues: trailing commas, single quotes, comments, unquoted keys */
function tryFixJson(raw: string): string {
  let s = raw;
  // strip single-line comments
  s = s.replace(/\/\/.*$/gm, "");
  // strip multi-line comments
  s = s.replace(/\/\*[\s\S]*?\*\//g, "");
  // replace single quotes with double quotes (simple heuristic)
  s = s.replace(/'/g, '"');
  // remove trailing commas before } or ]
  s = s.replace(/,\s*([\]}])/g, "$1");
  // try to quote unquoted keys: word: -> "word":
  s = s.replace(/([{,]\s*)([a-zA-Z_$][\w$]*)\s*:/g, '$1"$2":');
  return s;
}

type ParseResult =
  | { ok: true; data: unknown; json: string }
  | { ok: false; error: string; line: number | null };

function parseJson(raw: string): ParseResult {
  if (!raw.trim()) return { ok: false, error: "Empty input", line: null };
  try {
    const data = JSON.parse(raw);
    return { ok: true, data, json: raw };
  } catch (e: any) {
    // try to extract line number from error
    const lineMatch = e.message?.match(/position (\d+)/i);
    let line: number | null = null;
    if (lineMatch) {
      const pos = parseInt(lineMatch[1]);
      line = raw.substring(0, pos).split("\n").length;
    }
    return { ok: false, error: e.message || "Invalid JSON", line };
  }
}

/** Flatten JSON for CSV export */
function flattenObject(obj: any, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val, fullKey));
    } else {
      result[fullKey] = val === null ? "" : String(val);
    }
  }
  return result;
}

function jsonToCsv(data: unknown): string | null {
  // must be an array of objects
  let rows: any[];
  if (Array.isArray(data)) {
    rows = data;
  } else if (typeof data === "object" && data !== null) {
    // single object — wrap in array
    rows = [data];
  } else {
    return null;
  }

  if (rows.length === 0) return "";

  const flattened = rows.map((r) =>
    typeof r === "object" && r !== null ? flattenObject(r) : { value: String(r) }
  );
  const headers = Array.from(new Set(flattened.flatMap((r) => Object.keys(r))));

  const escape = (s: string) => {
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };

  const lines = [
    headers.map(escape).join(","),
    ...flattened.map((row) => headers.map((h) => escape(row[h] ?? "")).join(",")),
  ];
  return lines.join("\n");
}

/** Simple stats about parsed JSON */
function jsonStats(data: unknown) {
  let keys = 0;
  let maxDepth = 0;
  let arrays = 0;
  let objects = 0;
  let strings = 0;
  let numbers = 0;
  let booleans = 0;
  let nulls = 0;

  function walk(node: unknown, depth: number) {
    if (depth > maxDepth) maxDepth = depth;
    if (node === null) {
      nulls++;
    } else if (Array.isArray(node)) {
      arrays++;
      node.forEach((item) => walk(item, depth + 1));
    } else if (typeof node === "object") {
      objects++;
      const entries = Object.entries(node as Record<string, unknown>);
      keys += entries.length;
      entries.forEach(([, v]) => walk(v, depth + 1));
    } else if (typeof node === "string") {
      strings++;
    } else if (typeof node === "number") {
      numbers++;
    } else if (typeof node === "boolean") {
      booleans++;
    }
  }
  walk(data, 0);
  return { keys, maxDepth, arrays, objects, strings, numbers, booleans, nulls };
}

/* ─── Tree View component ─── */

function TreeNode({ label, value, depth }: { label?: string; value: unknown; depth: number }) {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(depth < 2);
  const isObject = value !== null && typeof value === "object";

  if (!isObject) {
    let display: string;
    let color: string;
    if (value === null) {
      display = "null";
      color = isDark ? "text-red-400" : "text-red-600";
    } else if (typeof value === "string") {
      display = `"${value.length > 120 ? value.slice(0, 120) + "…" : value}"`;
      color = isDark ? "text-emerald-400" : "text-emerald-600";
    } else if (typeof value === "number") {
      display = String(value);
      color = isDark ? "text-blue-400" : "text-blue-600";
    } else if (typeof value === "boolean") {
      display = String(value);
      color = isDark ? "text-amber-400" : "text-amber-600";
    } else {
      display = String(value);
      color = "";
    }

    return (
      <div className="flex gap-1 text-xs font-mono leading-5 pl-4">
        {label !== undefined && (
          <span className={isDark ? "text-neutral-300" : "text-neutral-700"}>
            {label}:
          </span>
        )}
        <span className={color}>{display}</span>
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries = isArray
    ? (value as unknown[]).map((v, i) => [String(i), v] as [string, unknown])
    : Object.entries(value as Record<string, unknown>);
  const count = entries.length;
  const bracket = isArray ? ["[", "]"] : ["{", "}"];

  return (
    <div className="text-xs font-mono">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cx(
          "flex items-center gap-1 leading-5 pl-1 hover:bg-white/5 rounded w-full text-left",
          isDark ? "text-neutral-300" : "text-neutral-700"
        )}
      >
        <span className="w-3 text-center text-neutral-500 shrink-0">
          {open ? "▾" : "▸"}
        </span>
        {label !== undefined && <span>{label}:</span>}
        <span className="text-neutral-500">
          {bracket[0]} {count} {isArray ? "items" : "keys"} {bracket[1]}
        </span>
      </button>
      {open && (
        <div className="ml-4 border-l border-white/5 pl-1">
          {entries.map(([k, v]) => (
            <TreeNode key={k} label={isArray ? undefined : k} value={v} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─── */

type ViewMode = "formatted" | "tree";

export function JsonFormatterTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [indent, setIndent] = useState<IndentStyle>("2");
  const [viewMode, setViewMode] = useState<ViewMode>("formatted");
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Load saved text
  useEffect(() => {
    const saved = localStorage.getItem("fmc_jf_text");
    if (saved) setText(saved);
  }, []);

  // Persist text
  useEffect(() => {
    localStorage.setItem("fmc_jf_text", text);
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

  // Parse and format
  const result = useMemo(() => {
    if (!text.trim()) return null;
    const parsed = parseJson(text);
    if (parsed.ok) {
      return {
        valid: true as const,
        data: parsed.data,
        formatted: JSON.stringify(parsed.data, null, indentStr(indent)),
        minified: JSON.stringify(parsed.data),
        stats: jsonStats(parsed.data),
        error: null,
        errorLine: null,
      };
    }
    return {
      valid: false as const,
      data: null,
      formatted: "",
      minified: "",
      stats: null,
      error: parsed.error,
      errorLine: parsed.line,
    };
  }, [text, indent]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1200);
  }, []);

  async function copyText(s: string, label: string) {
    try {
      await navigator.clipboard.writeText(s);
      showToast(`Copied ${label}!`);
    } catch {
      showToast("Copy failed");
    }
  }

  function doFormat() {
    if (result?.valid) {
      setText(result.formatted);
    }
  }

  function doMinify() {
    if (result?.valid) {
      setText(result.minified);
    }
  }

  function doFix() {
    const fixed = tryFixJson(text);
    const parsed = parseJson(fixed);
    if (parsed.ok) {
      setText(JSON.stringify(parsed.data, null, indentStr(indent)));
      showToast("JSON fixed and formatted!");
    } else {
      showToast("Could not auto-fix — check syntax manually");
    }
  }

  function doDownloadFormatted() {
    if (!result?.valid) return;
    const blob = new Blob([result.formatted], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function doExportCsv() {
    if (!result?.valid) return;
    const csv = jsonToCsv(result.data);
    if (csv === null) {
      showToast("JSON must be an array or object for CSV export");
      return;
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
    showToast("CSV downloaded!");
  }

  function clearAll() {
    setText("");
    inputRef.current?.focus();
  }

  const sizeKb = text.length > 0 ? (new Blob([text]).size / 1024).toFixed(1) : "0";

  return (
    <div>
      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          type="button"
          onClick={doFormat}
          disabled={!result?.valid}
          className={cx(
            "rounded-xl px-4 py-2 text-sm border transition-colors",
            result?.valid
              ? isDark
                ? "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 font-semibold"
                : "border-emerald-500/40 bg-emerald-50 hover:bg-emerald-100 font-semibold"
              : "border-white/5 opacity-40 cursor-not-allowed"
          )}
        >
          Format / Beautify
        </button>
        <button
          type="button"
          onClick={doMinify}
          disabled={!result?.valid}
          className={cx(
            "rounded-xl px-4 py-2 text-sm border transition-colors",
            result?.valid
              ? isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              : "border-white/5 opacity-40 cursor-not-allowed"
          )}
        >
          Minify
        </button>
        <button
          type="button"
          onClick={doFix}
          className={cx(
            "rounded-xl px-4 py-2 text-sm border transition-colors",
            isDark ? "border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20" : "border-amber-500/30 bg-amber-50 hover:bg-amber-100"
          )}
        >
          Fix JSON
        </button>
        <button
          type="button"
          onClick={doExportCsv}
          disabled={!result?.valid}
          className={cx(
            "rounded-xl px-4 py-2 text-sm border transition-colors",
            result?.valid
              ? isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              : "border-white/5 opacity-40 cursor-not-allowed"
          )}
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={doDownloadFormatted}
          disabled={!result?.valid}
          className={cx(
            "rounded-xl px-4 py-2 text-sm border transition-colors",
            result?.valid
              ? isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
              : "border-white/5 opacity-40 cursor-not-allowed"
          )}
        >
          Download .json
        </button>
      </div>

      {/* Options row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={cx("text-xs uppercase tracking-wide", isDark ? "text-neutral-400" : "text-neutral-500")}>
            Indent:
          </span>
          {(["2", "4", "tab"] as IndentStyle[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setIndent(s)}
              className={cx(
                "rounded-lg px-2.5 py-1 text-xs border transition-colors",
                indent === s
                  ? isDark
                    ? "border-blue-500/40 bg-blue-500/10 font-semibold"
                    : "border-blue-500/40 bg-blue-50 font-semibold"
                  : isDark
                    ? "border-white/10 hover:bg-white/5"
                    : "border-black/10 hover:bg-black/5"
              )}
            >
              {s === "tab" ? "Tab" : `${s} spaces`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className={cx("text-xs uppercase tracking-wide", isDark ? "text-neutral-400" : "text-neutral-500")}>
            View:
          </span>
          {(["formatted", "tree"] as ViewMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setViewMode(m)}
              className={cx(
                "rounded-lg px-2.5 py-1 text-xs border transition-colors capitalize",
                viewMode === m
                  ? isDark
                    ? "border-blue-500/40 bg-blue-500/10 font-semibold"
                    : "border-blue-500/40 bg-blue-50 font-semibold"
                  : isDark
                    ? "border-white/10 hover:bg-white/5"
                    : "border-black/10 hover:bg-black/5"
              )}
            >
              {m === "formatted" ? "Code" : "Tree"}
            </button>
          ))}
        </div>
      </div>

      {/* Validation status */}
      {text.trim().length > 0 && (
        <div
          className={cx(
            "mb-4 rounded-xl border p-3 text-sm",
            result?.valid
              ? isDark
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                : "border-emerald-500/30 bg-emerald-50 text-emerald-700"
              : isDark
                ? "border-red-500/30 bg-red-500/5 text-red-400"
                : "border-red-500/30 bg-red-50 text-red-700"
          )}
        >
          {result?.valid ? (
            <span>✓ Valid JSON — {formatNumber(result.stats!.keys)} keys, depth {result.stats!.maxDepth}, {sizeKb} KB</span>
          ) : (
            <span>
              ✗ Invalid JSON{result?.errorLine ? ` (near line ${result.errorLine})` : ""}: {result?.error}
            </span>
          )}
        </div>
      )}

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
          <div className="text-sm font-semibold">JSON Input</div>
          <div className="flex items-center gap-2">
            <span className={cx("text-xs tabular-nums", isDark ? "text-neutral-400" : "text-neutral-500")}>
              {sizeKb} KB
            </span>
            <button
              type="button"
              onClick={clearAll}
              className={cx(
                "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
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
            rows={10}
            spellCheck={false}
            placeholder={'{\n  "name": "FlipMyCase",\n  "tools": 7,\n  "free": true\n}'}
            className={cx(
              "w-full resize-y rounded-2xl border px-3 py-2 text-sm leading-6 outline-none font-mono",
              isDark
                ? "border-white/10 bg-neutral-950 focus:ring-2 focus:ring-white/10"
                : "border-black/10 bg-neutral-50 focus:ring-2 focus:ring-black/10"
            )}
          />
        </div>
      </div>

      {/* Output */}
      {result?.valid && (
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
              {viewMode === "tree" ? "Tree View" : "Formatted Output"}
            </div>
            <div className="flex items-center gap-2">
              {viewMode === "formatted" && (
                <>
                  <button
                    type="button"
                    onClick={() => copyText(result.formatted, "formatted")}
                    className={cx(
                      "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                      isDark
                        ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                        : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100"
                    )}
                  >
                    Copy Formatted
                  </button>
                  <button
                    type="button"
                    onClick={() => copyText(result.minified, "minified")}
                    className={cx(
                      "text-sm rounded-xl px-3 py-1.5 border transition-colors",
                      isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                    )}
                  >
                    Copy Minified
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="p-3">
            {viewMode === "formatted" ? (
              <pre
                className={cx(
                  "whitespace-pre-wrap break-words text-sm leading-6 font-mono max-h-[500px] overflow-y-auto",
                  isDark ? "text-neutral-200" : "text-neutral-700"
                )}
              >
                {result.formatted}
              </pre>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                <TreeNode value={result.data} depth={0} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      {result?.valid && result.stats && (
        <div className="mt-3">
          <div className={cx("text-xs uppercase tracking-wide mb-2", isDark ? "text-neutral-400" : "text-neutral-500")}>
            JSON Stats
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["Keys", result.stats.keys],
              ["Depth", result.stats.maxDepth],
              ["Objects", result.stats.objects],
              ["Arrays", result.stats.arrays],
              ["Strings", result.stats.strings],
              ["Numbers", result.stats.numbers],
              ["Booleans", result.stats.booleans],
              ["Nulls", result.stats.nulls],
            ]
              .filter(([, v]) => (v as number) > 0)
              .map(([label, count]) => (
                <div
                  key={label as string}
                  className={cx(
                    "rounded-xl border px-3 py-1.5 text-xs",
                    isDark ? "border-white/10 bg-neutral-900" : "border-black/10 bg-white"
                  )}
                >
                  <span className="font-medium">{formatNumber(count as number)}</span>{" "}
                  <span className={isDark ? "text-neutral-400" : "text-neutral-500"}>
                    {label as string}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("mt-3 text-xs text-center", isDark ? "text-neutral-500" : "text-neutral-400")}>
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
