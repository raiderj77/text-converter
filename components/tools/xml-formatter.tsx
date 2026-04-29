"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type IndentStyle = "2" | "4" | "tab";

function formatXml(xml: string, indentStyle: IndentStyle): { result: string; error: string | null } {
  const indent = indentStyle === "tab" ? "\t" : " ".repeat(Number(indentStyle));

  // Try parsing with DOMParser first for validation
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const parseError = doc.querySelector("parsererror");

  if (parseError) {
    // Extract error message
    const errorText = parseError.textContent || "Invalid XML";
    // Still try manual formatting for display
    return { result: "", error: errorText };
  }

  // Manual formatting for clean output
  let formatted = "";
  let depth = 0;
  const trimmed = xml.replace(/>\s+</g, "><").trim();

  // Tokenize
  const tokens: string[] = [];
  let i = 0;
  while (i < trimmed.length) {
    if (trimmed[i] === "<") {
      const end = trimmed.indexOf(">", i);
      if (end === -1) break;
      tokens.push(trimmed.slice(i, end + 1));
      i = end + 1;
    } else {
      const end = trimmed.indexOf("<", i);
      const text = end === -1 ? trimmed.slice(i) : trimmed.slice(i, end);
      if (text.trim()) tokens.push(text.trim());
      i = end === -1 ? trimmed.length : end;
    }
  }

  for (let t = 0; t < tokens.length; t++) {
    const token = tokens[t];

    if (token.startsWith("<?") || token.startsWith("<!")) {
      // Processing instruction or doctype/comment
      formatted += indent.repeat(depth) + token + "\n";
    } else if (token.startsWith("</")) {
      // Closing tag
      depth = Math.max(0, depth - 1);
      formatted += indent.repeat(depth) + token + "\n";
    } else if (token.startsWith("<") && token.endsWith("/>")) {
      // Self-closing tag
      formatted += indent.repeat(depth) + token + "\n";
    } else if (token.startsWith("<")) {
      // Opening tag — check if next token is text followed by closing tag (inline)
      const tagName = token.match(/^<(\S+)/)?.[1] || "";
      if (
        t + 2 < tokens.length &&
        !tokens[t + 1].startsWith("<") &&
        tokens[t + 2] === `</${tagName}>`
      ) {
        formatted += indent.repeat(depth) + token + tokens[t + 1] + tokens[t + 2] + "\n";
        t += 2;
      } else {
        formatted += indent.repeat(depth) + token + "\n";
        depth++;
      }
    } else {
      // Text node
      formatted += indent.repeat(depth) + token + "\n";
    }
  }

  return { result: formatted.trimEnd(), error: null };
}

function minifyXml(xml: string): { result: string; error: string | null } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "application/xml");
  const parseError = doc.querySelector("parsererror");

  if (parseError) {
    return { result: "", error: parseError.textContent || "Invalid XML" };
  }

  const minified = xml
    .replace(/>\s+</g, "><")
    .replace(/\s*\n\s*/g, "")
    .trim();

  return { result: minified, error: null };
}

export function XmlFormatterTool() {
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
    return mode === "format" ? formatXml(input, indentStyle) : minifyXml(input);
  }, [input, indentStyle, mode]);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lineCount = output?.result ? output.result.split("\n").length : 0;

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
        {mode === "format" && (
          <select
            value={indentStyle}
            onChange={(e) => setIndentStyle(e.target.value as IndentStyle)}
            className={cx("rounded-lg border px-2 py-1 text-xs min-h-[44px]", inputBase)}
            aria-label="Indentation style"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tabs</option>
          </select>
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
        <label htmlFor="xml-input" className="text-sm font-semibold block mb-2">
          Paste XML
        </label>
        <textarea
          id="xml-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'<?xml version="1.0"?>\n<root>\n  <item id="1"><name>Example</name></item>\n</root>'}
          rows={10}
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
                {output.error ? "Validation Error" : mode === "format" ? "Formatted XML" : "Minified XML"}
              </h3>
              {output.result && !output.error && (
                <span className={cx("text-xs", muted)}>
                  {output.result.length} char{output.result.length !== 1 ? "s" : ""}
                  {mode === "format" && ` · ${lineCount} line${lineCount !== 1 ? "s" : ""}`}
                </span>
              )}
            </div>
            {output.result && !output.error && (
              <button
                onClick={() => copyText(output.result, "output")}
                className={cx("rounded-md border px-3 py-1 text-xs transition-colors min-h-[44px]", btnBase)}
                aria-label="Copy output"
              >
                {copied === "output" ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          {output.error ? (
            <div className={cx("rounded-lg border p-3 text-xs font-mono whitespace-pre-wrap", isDark ? "border-red-500/30 bg-red-950/30 text-red-300" : "border-red-500/30 bg-red-50 text-red-700")}>
              {output.error}
            </div>
          ) : (
            <output aria-live="polite" className={cx("block rounded-lg border p-3 text-xs font-mono overflow-x-auto whitespace-pre", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
              {output.result}
            </output>
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
