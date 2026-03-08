"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type IndentStyle = "2" | "4" | "tab";

function formatJs(js: string, indentStyle: IndentStyle): string {
  const indent = indentStyle === "tab" ? "\t" : " ".repeat(Number(indentStyle));
  let src = js.trim();

  // Preserve string literals by replacing them with placeholders
  const strings: string[] = [];
  src = src.replace(/(["'`])(?:(?!\1|\\).|\\.)*\1/g, (match) => {
    strings.push(match);
    return `__STR_${strings.length - 1}__`;
  });

  // Remove single-line comments (but not inside strings — already replaced)
  src = src.replace(/\/\/.*$/gm, "");
  // Remove multi-line comments
  src = src.replace(/\/\*[\s\S]*?\*\//g, "");

  // Normalize whitespace
  src = src.replace(/\s+/g, " ");

  // Add newlines around structural chars
  src = src.replace(/\s*\{\s*/g, " {\n");
  src = src.replace(/\s*\}\s*/g, "\n}\n");
  src = src.replace(/\s*;\s*/g, ";\n");

  const lines = src
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  let depth = 0;
  const result: string[] = [];

  for (const line of lines) {
    if (line === "}") {
      depth = Math.max(0, depth - 1);
      result.push(indent.repeat(depth) + "}");
    } else if (line === "},") {
      depth = Math.max(0, depth - 1);
      result.push(indent.repeat(depth) + "},");
    } else if (line.endsWith("{")) {
      result.push(indent.repeat(depth) + line);
      depth++;
    } else if (line.endsWith("}") && !line.endsWith("${")) {
      const idx = line.lastIndexOf("}");
      const before = line.slice(0, idx).trim();
      if (before) {
        result.push(indent.repeat(depth) + before);
      }
      depth = Math.max(0, depth - 1);
      result.push(indent.repeat(depth) + "}");
    } else {
      result.push(indent.repeat(depth) + line);
    }
  }

  // Restore string literals
  let output = result.join("\n");
  strings.forEach((s, i) => {
    output = output.replace(`__STR_${i}__`, s);
  });

  return output;
}

function minifyJs(js: string): string {
  let src = js;

  // Preserve string literals
  const strings: string[] = [];
  src = src.replace(/(["'`])(?:(?!\1|\\).|\\.)*\1/g, (match) => {
    strings.push(match);
    return `__STR_${strings.length - 1}__`;
  });

  // Remove single-line comments
  src = src.replace(/\/\/.*$/gm, "");
  // Remove multi-line comments
  src = src.replace(/\/\*[\s\S]*?\*\//g, "");
  // Collapse whitespace
  src = src.replace(/\s+/g, " ");
  // Remove spaces around operators and structural chars
  src = src.replace(/\s*\{\s*/g, "{");
  src = src.replace(/\s*\}\s*/g, "}");
  src = src.replace(/\s*;\s*/g, ";");
  src = src.replace(/\s*\(\s*/g, "(");
  src = src.replace(/\s*\)\s*/g, ")");
  src = src.replace(/\s*,\s*/g, ",");
  src = src.replace(/\s*=\s*/g, "=");
  // Remove trailing semicolons before }
  src = src.replace(/;}/g, "}");

  // Restore string literals
  strings.forEach((s, i) => {
    src = src.replace(`__STR_${i}__`, s);
  });

  return src.trim();
}

export function JavascriptFormatterTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [indentStyle, setIndentStyle] = useState<IndentStyle>("2");
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const output = useMemo(() => {
    if (!input.trim()) return null;
    return mode === "format" ? formatJs(input, indentStyle) : minifyJs(input);
  }, [input, indentStyle, mode]);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lineCount = output ? output.split("\n").length : 0;

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark
    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode("format")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            mode === "format" ? btnActive : btnBase
          )}
        >
          Format / Beautify
        </button>
        <button
          onClick={() => setMode("minify")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            mode === "minify" ? btnActive : btnBase
          )}
        >
          Minify
        </button>
        {mode === "format" && (
          <select
            value={indentStyle}
            onChange={(e) => setIndentStyle(e.target.value as IndentStyle)}
            className={cx(
              "rounded-lg border px-2 py-1 text-xs min-h-[44px]",
              inputBase
            )}
            aria-label="Indentation style"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tabs</option>
          </select>
        )}
        <button
          onClick={() => {
            setInput("");
            setCopied("");
          }}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            btnBase
          )}
        >
          Clear
        </button>
      </div>

      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label
          htmlFor="js-input"
          className="text-sm font-semibold block mb-2"
        >
          Paste JavaScript
        </label>
        <textarea
          id="js-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            'function greet(name) { console.log("Hello, " + name); } const arr = [1, 2, 3]; arr.forEach(function(item) { console.log(item); });'
          }
          rows={10}
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
          style={{ minHeight: "150px" }}
          spellCheck={false}
        />
        <div className={cx("mt-2 text-xs", muted)}>
          {wordCount} word{wordCount !== 1 ? "s" : ""} · {input.length} char
          {input.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">
                {mode === "format" ? "Formatted JavaScript" : "Minified JavaScript"}
              </h3>
              <span className={cx("text-xs", muted)}>
                {output.length} char{output.length !== 1 ? "s" : ""}
                {mode === "format" &&
                  ` · ${lineCount} line${lineCount !== 1 ? "s" : ""}`}
              </span>
            </div>
            <button
              onClick={() => copyText(output, "output")}
              className={cx(
                "rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]",
                btnBase
              )}
              aria-label="Copy output"
            >
              {copied === "output" ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre
            className={cx(
              "rounded-lg border p-3 text-xs font-mono overflow-x-auto whitespace-pre",
              isDark
                ? "border-white/5 bg-neutral-950"
                : "border-black/5 bg-neutral-50"
            )}
          >
            {output}
          </pre>
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press{" "}
        <kbd
          className={cx(
            "rounded border px-1.5 py-0.5 text-xs",
            isDark ? "border-white/10" : "border-black/10"
          )}
        >
          Ctrl
        </kbd>{" "}
        +{" "}
        <kbd
          className={cx(
            "rounded border px-1.5 py-0.5 text-xs",
            isDark ? "border-white/10" : "border-black/10"
          )}
        >
          K
        </kbd>{" "}
        to focus input
      </div>
    </div>
  );
}
