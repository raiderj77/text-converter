"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT", "RIGHT", "INNER", "OUTER",
  "ON", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING", "INSERT", "INTO",
  "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "ALTER", "DROP", "TABLE",
  "INDEX", "AS", "IN", "NOT", "NULL", "IS", "LIKE", "BETWEEN", "UNION",
  "DISTINCT", "LIMIT", "OFFSET", "CASE", "WHEN", "THEN", "ELSE", "END",
];

/** Keywords that start a new major clause (get a newline before them) */
const CLAUSE_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
  "OUTER JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "ORDER BY", "GROUP BY",
  "HAVING", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE",
  "ALTER", "DROP", "UNION", "LIMIT", "OFFSET",
];

/** Sub-clause keywords that get indented */
const INDENT_KEYWORDS = ["AND", "OR", "ON", "WHEN", "THEN", "ELSE", "END"];

function uppercaseKeywords(sql: string): string {
  // Build a regex that matches keywords as whole words (case-insensitive)
  // Sort by length descending so "ORDER BY" matches before "ORDER"
  const sorted = [...SQL_KEYWORDS].sort((a, b) => b.length - a.length);
  let result = sql;

  for (const kw of sorted) {
    const pattern = new RegExp(`\\b${kw.replace(/ /g, "\\s+")}\\b`, "gi");
    result = result.replace(pattern, kw);
  }

  return result;
}

function formatSql(sql: string): string {
  if (!sql.trim()) return "";

  // First, uppercase all keywords
  let formatted = uppercaseKeywords(sql);

  // Normalize whitespace but preserve string literals
  const strings: string[] = [];
  formatted = formatted.replace(/'[^']*'/g, (match) => {
    strings.push(match);
    return `__STR${strings.length - 1}__`;
  });

  // Normalize whitespace
  formatted = formatted.replace(/\s+/g, " ").trim();

  // Add newlines before major clause keywords
  const clauseSorted = [...CLAUSE_KEYWORDS].sort((a, b) => b.length - a.length);
  for (const kw of clauseSorted) {
    const pattern = new RegExp(`\\b(${kw.replace(/ /g, "\\s+")})\\b`, "g");
    formatted = formatted.replace(pattern, `\n$1`);
  }

  // Indent sub-clause keywords
  for (const kw of INDENT_KEYWORDS) {
    const pattern = new RegExp(`\\b(${kw})\\b`, "g");
    formatted = formatted.replace(pattern, `\n  $1`);
  }

  // Ensure commas in SELECT lists produce newlines with indentation
  // Split by lines, find SELECT clause, and indent its columns
  const lines = formatted.split("\n").filter((l) => l.trim());
  const result: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("SELECT")) {
      // Split SELECT columns by comma
      const selectContent = line.replace(/^SELECT\s*/, "");
      const cols = selectContent.split(",").map((c) => c.trim()).filter(Boolean);
      if (cols.length > 1) {
        result.push("SELECT");
        cols.forEach((col, idx) => {
          result.push(`  ${col}${idx < cols.length - 1 ? "," : ""}`);
        });
      } else {
        result.push(line);
      }
    } else {
      result.push(line);
    }
  }

  formatted = result.join("\n");

  // Restore string literals
  strings.forEach((s, i) => {
    formatted = formatted.replace(`__STR${i}__`, s);
  });

  // Clean up leading newline
  formatted = formatted.replace(/^\n+/, "").trimEnd();

  return formatted;
}

function minifySql(sql: string): string {
  if (!sql.trim()) return "";

  // Preserve string literals
  const strings: string[] = [];
  let result = sql.replace(/'[^']*'/g, (match) => {
    strings.push(match);
    return `__STR${strings.length - 1}__`;
  });

  // Collapse all whitespace to single spaces
  result = result.replace(/\s+/g, " ").trim();

  // Remove spaces around parentheses and commas where safe
  result = result.replace(/\s*\(\s*/g, "(");
  result = result.replace(/\s*\)\s*/g, ") ");
  result = result.replace(/\s*,\s*/g, ",");
  result = result.replace(/\s+;/g, ";");
  result = result.trim();

  // Restore string literals
  strings.forEach((s, i) => {
    result = result.replace(`__STR${i}__`, s);
  });

  return result;
}

export function SqlFormatterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return mode === "format" ? formatSql(input) : minifySql(input);
  }, [input, mode]);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lineCount = output ? output.split("\n").length : 0;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode("format")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === "format" ? btnActive : btnBase)}
        >
          Format / Beautify
        </button>
        <button
          onClick={() => setMode("minify")}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", mode === "minify" ? btnActive : btnBase)}
        >
          Minify
        </button>
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="sql-input" className="text-sm font-semibold block mb-2">
          Paste SQL
        </label>
        <textarea
          id="sql-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"SELECT id, name, email FROM users WHERE status = 'active' AND created_at > '2024-01-01' ORDER BY name LIMIT 10;"}
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "120px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {wordCount} word{wordCount !== 1 ? "s" : ""} · {input.length} char{input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">
                {mode === "format" ? "Formatted SQL" : "Minified SQL"}
              </h3>
              <span className={cx("text-xs", muted)}>
                {output.length} char{output.length !== 1 ? "s" : ""}
                {mode === "format" && ` · ${lineCount} line${lineCount !== 1 ? "s" : ""}`}
              </span>
            </div>
            <button
              onClick={() => copyText(output, "output")}
              className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
              aria-label="Copy output"
            >
              {copied === "output" ? "Copied!" : "Copy"}
            </button>
          </div>
          <output aria-live="polite" className={cx("block rounded-lg border p-3 text-xs font-mono overflow-x-auto whitespace-pre", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
            {output}
          </output>
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
