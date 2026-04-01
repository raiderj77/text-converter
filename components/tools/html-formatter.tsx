"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

type IndentStyle = "2" | "4" | "tab";

const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input",
  "link", "meta", "param", "source", "track", "wbr",
]);

function tokenizeHtml(html: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === "<") {
      // Comment
      if (html.slice(i, i + 4) === "<!--") {
        const end = html.indexOf("-->", i + 4);
        if (end === -1) {
          tokens.push(html.slice(i));
          break;
        }
        tokens.push(html.slice(i, end + 3));
        i = end + 3;
      } else {
        const end = html.indexOf(">", i);
        if (end === -1) {
          tokens.push(html.slice(i));
          break;
        }
        tokens.push(html.slice(i, end + 1));
        i = end + 1;
      }
    } else {
      const end = html.indexOf("<", i);
      const text = end === -1 ? html.slice(i) : html.slice(i, end);
      if (text.trim()) tokens.push(text.trim());
      i = end === -1 ? html.length : end;
    }
  }
  return tokens;
}

function getTagName(token: string): string {
  const match = token.match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)/);
  return match ? match[1].toLowerCase() : "";
}

function isClosingTag(token: string): boolean {
  return token.startsWith("</");
}

function isSelfClosing(token: string): boolean {
  return token.endsWith("/>") || VOID_ELEMENTS.has(getTagName(token));
}

function isComment(token: string): boolean {
  return token.startsWith("<!--");
}

function isDoctype(token: string): boolean {
  return token.toLowerCase().startsWith("<!doctype");
}

function formatHtml(html: string, indentStyle: IndentStyle): string {
  const indent = indentStyle === "tab" ? "\t" : " ".repeat(Number(indentStyle));
  const tokens = tokenizeHtml(html);
  const result: string[] = [];
  let depth = 0;

  for (let t = 0; t < tokens.length; t++) {
    const token = tokens[t];

    if (isDoctype(token) || isComment(token)) {
      result.push(indent.repeat(depth) + token);
    } else if (isClosingTag(token)) {
      depth = Math.max(0, depth - 1);
      result.push(indent.repeat(depth) + token);
    } else if (token.startsWith("<")) {
      if (isSelfClosing(token)) {
        result.push(indent.repeat(depth) + token);
      } else {
        const tagName = getTagName(token);
        // Check for inline content: <tag>text</tag>
        if (
          t + 2 < tokens.length &&
          !tokens[t + 1].startsWith("<") &&
          isClosingTag(tokens[t + 2]) &&
          getTagName(tokens[t + 2]) === tagName
        ) {
          result.push(
            indent.repeat(depth) + token + tokens[t + 1] + tokens[t + 2]
          );
          t += 2;
        } else {
          result.push(indent.repeat(depth) + token);
          depth++;
        }
      }
    } else {
      // Text node
      result.push(indent.repeat(depth) + token);
    }
  }

  return result.join("\n");
}

function minifyHtml(html: string): string {
  // Remove comments
  let src = html.replace(/<!--[\s\S]*?-->/g, "");
  // Collapse whitespace between tags
  src = src.replace(/>\s+</g, "><");
  // Collapse remaining whitespace
  src = src.replace(/\s+/g, " ");
  return src.trim();
}

export function HtmlFormatterTool() {
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
    return mode === "format" ? formatHtml(input, indentStyle) : minifyHtml(input);
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
          htmlFor="html-input"
          className="text-sm font-semibold block mb-2"
        >
          Paste HTML
        </label>
        <textarea
          id="html-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            '<!DOCTYPE html>\n<html><head><title>Example</title></head><body><div class="container"><h1>Hello</h1><p>World</p></div></body></html>'
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
                {mode === "format" ? "Formatted HTML" : "Minified HTML"}
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
