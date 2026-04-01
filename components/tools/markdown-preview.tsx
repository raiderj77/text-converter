"use client";

import { useCallback, useMemo, useState, useRef } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ─── Minimal Markdown → HTML parser (zero deps) ────────────────── */
function parseMarkdown(md: string): string {
  let html = md;

  // Escape HTML entities
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Fenced code blocks (```lang\n...\n```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) => {
    return `<pre><code>${code.trimEnd()}</code></pre>`;
  });

  // Horizontal rules (---, ***, ___)
  html = html.replace(/^([-*_]){3,}\s*$/gm, "<hr>");

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Blockquotes (simple single-level)
  html = html.replace(/^&gt;\s+(.+)$/gm, "<blockquote>$1</blockquote>");
  // Merge adjacent blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, "\n");

  // Tables
  html = html.replace(/^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)+)/gm, (_m, headerRow: string, _sep, bodyRows: string) => {
    const headers = headerRow.split("|").filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join("");
    const rows = bodyRows.trim().split("\n").map((row: string) => {
      const cells = row.split("|").filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join("");
      return `<tr>${cells}</tr>`;
    }).join("");
    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Unordered lists
  html = html.replace(/^(?:[*\-+]\s+.+\n?)+/gm, (block) => {
    const items = block.trim().split("\n").map((line) => {
      return `<li>${line.replace(/^[*\-+]\s+/, "")}</li>`;
    }).join("");
    return `<ul>${items}</ul>\n`;
  });

  // Ordered lists
  html = html.replace(/^(?:\d+\.\s+.+\n?)+/gm, (block) => {
    const items = block.trim().split("\n").map((line) => {
      return `<li>${line.replace(/^\d+\.\s+/, "")}</li>`;
    }).join("");
    return `<ol>${items}</ol>\n`;
  });

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%">');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener">$1</a>');

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

  // Inline code (after code blocks to avoid conflicts)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Paragraphs: wrap loose lines not already in block elements
  const lines = html.split("\n");
  const result: string[] = [];
  let inParagraph = false;
  const blockTags = /^<(h[1-6]|ul|ol|li|pre|blockquote|hr|table|thead|tbody|tr|th|td|div)/;
  const closingBlockTags = /^<\/(ul|ol|pre|blockquote|table|thead|tbody|div)/;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inParagraph) { result.push("</p>"); inParagraph = false; }
      continue;
    }
    if (blockTags.test(trimmed) || closingBlockTags.test(trimmed) || trimmed === "<hr>") {
      if (inParagraph) { result.push("</p>"); inParagraph = false; }
      result.push(trimmed);
    } else {
      if (!inParagraph) { result.push("<p>"); inParagraph = true; }
      result.push(trimmed);
    }
  }
  if (inParagraph) result.push("</p>");

  return result.join("\n");
}

/* ─── Preview styles (injected as inline CSS in preview) ──────── */
function previewStyles(isDark: boolean): string {
  const fg = isDark ? "#e5e5e5" : "#171717";
  const fgMuted = isDark ? "#a3a3a3" : "#525252";
  const bg = isDark ? "#0a0a0a" : "#fafafa";
  const border = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const codeBg = isDark ? "#171717" : "#f5f5f5";
  const linkColor = isDark ? "#6ee7b7" : "#059669";
  return `
    body { font-family: system-ui, sans-serif; color: ${fg}; background: ${bg}; line-height: 1.7; margin: 0; padding: 16px; font-size: 14px; }
    h1, h2, h3, h4, h5, h6 { margin: 1em 0 0.5em; line-height: 1.3; }
    h1 { font-size: 1.75em; } h2 { font-size: 1.5em; } h3 { font-size: 1.25em; }
    p { margin: 0.5em 0; }
    a { color: ${linkColor}; }
    code { background: ${codeBg}; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    pre { background: ${codeBg}; padding: 12px; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    blockquote { border-left: 3px solid ${border}; margin: 0.5em 0; padding: 0.5em 1em; color: ${fgMuted}; }
    table { border-collapse: collapse; width: 100%; margin: 0.5em 0; }
    th, td { border: 1px solid ${border}; padding: 6px 12px; text-align: left; }
    th { font-weight: 600; }
    hr { border: none; border-top: 1px solid ${border}; margin: 1.5em 0; }
    ul, ol { padding-left: 1.5em; margin: 0.5em 0; }
    img { max-width: 100%; border-radius: 4px; }
    del { opacity: 0.6; }
  `;
}

export function MarkdownPreviewTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const renderedHtml = useMemo(() => {
    if (!input.trim()) return "";
    return parseMarkdown(input);
  }, [input]);

  const fullHtml = useMemo(() => {
    if (!renderedHtml) return "";
    return `<!DOCTYPE html><html><head><style>${previewStyles(isDark)}</style></head><body>${renderedHtml}</body></html>`;
  }, [renderedHtml, isDark]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "markdown-preview.html";
    a.click();
    URL.revokeObjectURL(url);
  }, [fullHtml]);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        {renderedHtml && (
          <>
            <button
              onClick={() => copyText(renderedHtml, "html")}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              {copied === "html" ? "Copied!" : "Copy HTML"}
            </button>
            <button
              onClick={handleDownload}
              className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", btnBase)}
            >
              Download .html
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

      {/* Split pane: editor + preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className={cx("rounded-xl border p-4", base)}>
          <label htmlFor="md-input" className="text-sm font-semibold block mb-2">
            Markdown Input
          </label>
          <textarea
            id="md-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"# Hello World\n\nWrite some **bold**, *italic*, or `inline code`.\n\n- List item one\n- List item two\n\n```js\nconsole.log('Hello');\n```"}
            className={cx("w-full rounded-lg border px-3 py-2 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500/50", inputBase)}
            style={{ minHeight: "400px" }}
            spellCheck={false}
          />
          <div className={cx("mt-2 text-xs", muted)}>
            {wordCount} word{wordCount !== 1 ? "s" : ""} · {charCount} char{charCount !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Preview */}
        <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
          <h3 className="text-sm font-semibold mb-2">Preview</h3>
          {renderedHtml ? (
            <iframe
              ref={iframeRef}
              srcDoc={fullHtml}
              title="Markdown Preview"
              className="w-full rounded-lg border"
              style={{ minHeight: "400px", border: "none" }}
              sandbox="allow-same-origin"
            />
          ) : (
            <div className={cx("flex items-center justify-center rounded-lg border", inputBase)} style={{ minHeight: "400px" }}>
              <span className={cx("text-sm", muted)}>Preview appears here as you type...</span>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
