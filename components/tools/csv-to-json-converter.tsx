"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type Direction = "csv-to-json" | "json-to-csv";
type Delimiter = "," | "\t" | ";" | "|" | "auto";

const DELIMITER_LABELS: Record<Delimiter, string> = {
  auto: "Auto-detect",
  ",": "Comma (,)",
  "\t": "Tab",
  ";": "Semicolon (;)",
  "|": "Pipe (|)",
};

function detectDelimiter(firstLine: string): string {
  const candidates: Array<{ char: string; count: number }> = [
    { char: "\t", count: (firstLine.match(/\t/g) || []).length },
    { char: "|", count: (firstLine.match(/\|/g) || []).length },
    { char: ";", count: (firstLine.match(/;/g) || []).length },
    { char: ",", count: (firstLine.match(/,/g) || []).length },
  ];
  const best = candidates.sort((a, b) => b.count - a.count)[0];
  return best.count > 0 ? best.char : ",";
}

function parseCSVLine(line: string, delim: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delim) {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current);
  return fields;
}

function csvToJson(csv: string, delim: Delimiter, headersFirst: boolean): { result: string; rows: number; cols: number } | { error: string } {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return { error: "No data found" };

  const actualDelim = delim === "auto" ? detectDelimiter(lines[0]) : delim;
  const parsed = lines.map((line) => parseCSVLine(line, actualDelim));

  if (headersFirst && parsed.length > 0) {
    const headers = parsed[0];
    const dataRows = parsed.slice(1);
    const objects = dataRows.map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h.trim() || `column_${i + 1}`] = row[i] ?? "";
      });
      return obj;
    });
    return { result: JSON.stringify(objects, null, 2), rows: dataRows.length, cols: headers.length };
  }

  return { result: JSON.stringify(parsed, null, 2), rows: parsed.length, cols: parsed[0]?.length ?? 0 };
}

function jsonToCsv(json: string, delim: Delimiter): { result: string; rows: number; cols: number } | { error: string } {
  const actualDelim = delim === "auto" ? "," : delim;

  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { error: "Invalid JSON" };
  }

  if (!Array.isArray(data) || data.length === 0) {
    return { error: "JSON must be a non-empty array" };
  }

  const escapeField = (val: unknown): string => {
    const str = val === null || val === undefined ? "" : String(val);
    if (str.includes(actualDelim) || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  // Array of objects
  if (typeof data[0] === "object" && data[0] !== null && !Array.isArray(data[0])) {
    const headers = Array.from(new Set(data.flatMap((item) => Object.keys(item as Record<string, unknown>))));
    const headerLine = headers.map(escapeField).join(actualDelim);
    const dataLines = data.map((item) => {
      const obj = item as Record<string, unknown>;
      return headers.map((h) => escapeField(obj[h])).join(actualDelim);
    });
    return { result: [headerLine, ...dataLines].join("\n"), rows: data.length, cols: headers.length };
  }

  // Array of arrays
  if (Array.isArray(data[0])) {
    const lines = data.map((row) => (row as unknown[]).map(escapeField).join(actualDelim));
    return { result: lines.join("\n"), rows: data.length, cols: (data[0] as unknown[]).length };
  }

  // Array of primitives
  return { result: data.map(escapeField).join("\n"), rows: data.length, cols: 1 };
}

export function CsvToJsonConverterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<Direction>("csv-to-json");
  const [delimiter, setDelimiter] = useState<Delimiter>("auto");
  const [headersFirst, setHeadersFirst] = useState(true);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const output = useMemo(() => {
    if (!input.trim()) return null;
    if (direction === "csv-to-json") {
      const res = csvToJson(input, delimiter, headersFirst);
      if ("error" in res) return res;
      const formatted = prettyPrint ? res.result : JSON.stringify(JSON.parse(res.result));
      return { result: formatted, rows: res.rows, cols: res.cols };
    } else {
      const res = jsonToCsv(input, delimiter);
      return res;
    }
  }, [input, direction, delimiter, headersFirst, prettyPrint]);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";
  const accent = isDark ? "text-emerald-400" : "text-emerald-600";

  return (
    <div className="space-y-4">
      {/* Direction & options */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setDirection("csv-to-json"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "csv-to-json" ? btnActive : btnBase)}
        >
          CSV to JSON
        </button>
        <button
          onClick={() => { setDirection("json-to-csv"); setInput(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", direction === "json-to-csv" ? btnActive : btnBase)}
        >
          JSON to CSV
        </button>
        <select
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value as Delimiter)}
          className={cx("rounded-lg border px-2 py-1 text-xs min-h-[44px]", inputBase)}
          aria-label="Delimiter"
        >
          {(Object.keys(DELIMITER_LABELS) as Delimiter[]).map((d) => (
            <option key={d} value={d}>{DELIMITER_LABELS[d]}</option>
          ))}
        </select>
        {direction === "csv-to-json" && (
          <>
            <button
              onClick={() => setHeadersFirst(!headersFirst)}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", headersFirst ? btnActive : btnBase)}
            >
              First Row as Headers
            </button>
            <button
              onClick={() => setPrettyPrint(!prettyPrint)}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", prettyPrint ? btnActive : btnBase)}
            >
              {prettyPrint ? "Pretty Print" : "Minified"}
            </button>
          </>
        )}
        <button
          onClick={() => { setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="csv-json-input" className="text-sm font-semibold block mb-2">
          {direction === "csv-to-json" ? "Paste CSV" : "Paste JSON"}
        </label>
        <textarea
          id="csv-json-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            direction === "csv-to-json"
              ? "name,age,city\nAlice,30,New York\nBob,25,London"
              : '[{"name":"Alice","age":30,"city":"New York"},{"name":"Bob","age":25,"city":"London"}]'
          }
          rows={8}
          className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
          style={{ minHeight: "150px" }}
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
                {"error" in output ? "Error" : direction === "csv-to-json" ? "JSON Output" : "CSV Output"}
              </h3>
              {"rows" in output && (
                <span className={cx("text-xs", muted)}>
                  {output.rows} row{output.rows !== 1 ? "s" : ""} · {output.cols} column{output.cols !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {"result" in output && (
              <button
                onClick={() => copyText(output.result, "output")}
                className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
                aria-label="Copy output"
              >
                {copied === "output" ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          {"error" in output ? (
            <p className="text-sm text-red-400">{output.error}</p>
          ) : (
            <pre className={cx("rounded-lg border p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
              {output.result}
            </pre>
          )}
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
