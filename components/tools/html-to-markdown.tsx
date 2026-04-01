"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ===== HTML → Markdown ===== */

function htmlToMarkdown(html: string): string {
  if (!html.trim()) return "";
  let md = html;

  // Horizontal rules
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n");

  // Headings
  for (let i = 6; i >= 1; i--) {
    const re = new RegExp(`<h${i}[^>]*>([\\s\\S]*?)<\\/h${i}>`, "gi");
    md = md.replace(re, (_m, content) => `\n${"#".repeat(i)} ${content.trim()}\n`);
  }

  // Bold
  md = md.replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**");

  // Italic
  md = md.replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*");

  // Inline code
  md = md.replace(/<code>([\s\S]*?)<\/code>/gi, "`$1`");

  // Code blocks (pre > code)
  md = md.replace(/<pre[^>]*>\s*<code[^>]*(?:\s+class="language-(\w+)")?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_m, lang, code) => {
      const decoded = decodeHtmlEntities(code.trim());
      return `\n\`\`\`${lang || ""}\n${decoded}\n\`\`\`\n`;
    }
  );
  // pre without code
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, code) => {
    const decoded = decodeHtmlEntities(code.trim());
    return `\n\`\`\`\n${decoded}\n\`\`\`\n`;
  });

  // Images (before links so <a><img></a> works)
  md = md.replace(/<img[^>]*\ssrc="([^"]*)"[^>]*\salt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img[^>]*\salt="([^"]*)"[^>]*\ssrc="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");
  md = md.replace(/<img[^>]*\ssrc="([^"]*)"[^>]*\/?>/gi, "![]($1)");

  // Links
  md = md.replace(/<a[^>]*\shref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, content) => {
    const lines = content.trim().replace(/<\/?p[^>]*>/gi, "").trim().split("\n");
    return "\n" + lines.map((l: string) => `> ${l.trim()}`).filter((l: string) => l.trim() !== ">").join("\n") + "\n";
  });

  // Tables
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_m, tableContent) => {
    const rows: string[][] = [];
    const rowMatches = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    for (const row of rowMatches) {
      const cells: string[] = [];
      const cellMatches = row.match(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      for (const cell of cellMatches) {
        const content = cell.replace(/<\/?(?:td|th)[^>]*>/gi, "").trim();
        cells.push(content);
      }
      if (cells.length) rows.push(cells);
    }
    if (!rows.length) return "";
    const colCount = Math.max(...rows.map((r) => r.length));
    const lines: string[] = [];
    rows.forEach((row, idx) => {
      const padded = Array.from({ length: colCount }, (_, i) => row[i] || "");
      lines.push("| " + padded.join(" | ") + " |");
      if (idx === 0) {
        lines.push("| " + padded.map(() => "---").join(" | ") + " |");
      }
    });
    return "\n" + lines.join("\n") + "\n";
  });

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_m, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return "\n" + items.map((item: string) => `- ${item.replace(/<\/?li[^>]*>/gi, "").trim()}`).join("\n") + "\n";
  });

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_m, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return "\n" + items.map((item: string, idx: number) => `${idx + 1}. ${item.replace(/<\/?li[^>]*>/gi, "").trim()}`).join("\n") + "\n";
  });

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");

  // Line breaks
  md = md.replace(/<br\s*\/?>/gi, "  \n");

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, "");

  // Decode common HTML entities
  md = decodeHtmlEntities(md);

  // Clean up extra blank lines
  md = md.replace(/\n{3,}/g, "\n\n").trim();

  return md;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

/* ===== Markdown → HTML ===== */

function markdownToHtml(md: string): string {
  if (!md.trim()) return "";
  let html = md;

  // Preserve code blocks first
  const codeBlocks: string[] = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    const escaped = escapeHtml(code.trimEnd());
    const langAttr = lang ? ` class="language-${lang}"` : "";
    codeBlocks.push(`<pre><code${langAttr}>${escaped}</code></pre>`);
    return `__CODEBLOCK${codeBlocks.length - 1}__`;
  });

  // Inline code (before other inline formatting)
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr>");
  html = html.replace(/^\*\*\*$/gm, "<hr>");
  html = html.replace(/^___$/gm, "<hr>");

  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/(?:^>\s?.+\n?)+/gm, (match) => {
    const content = match.replace(/^>\s?/gm, "").trim();
    return `<blockquote><p>${content}</p></blockquote>`;
  });

  // Tables
  html = html.replace(/(?:^\|.+\|$\n?)+/gm, (match) => {
    const rows = match.trim().split("\n").filter((r) => r.trim());
    if (rows.length < 2) return match;
    // Check if second row is separator
    const isSep = /^\|[\s-:|]+\|$/.test(rows[1]);
    if (!isSep) return match;
    const headerCells = rows[0].split("|").filter((c) => c.trim() !== "").map((c) => c.trim());
    const headerHtml = "<tr>" + headerCells.map((c) => `<th>${c}</th>`).join("") + "</tr>";
    const bodyRows = rows.slice(2).map((row) => {
      const cells = row.split("|").filter((c) => c.trim() !== "").map((c) => c.trim());
      return "<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>";
    }).join("");
    return `<table><thead>${headerHtml}</thead><tbody>${bodyRows}</tbody></table>`;
  });

  // Unordered lists
  html = html.replace(/(?:^[-*+]\s+.+\n?)+/gm, (match) => {
    const items = match.trim().split("\n").map((l) => l.replace(/^[-*+]\s+/, "").trim());
    return "<ul>" + items.map((i) => `<li>${i}</li>`).join("") + "</ul>";
  });

  // Ordered lists
  html = html.replace(/(?:^\d+\.\s+.+\n?)+/gm, (match) => {
    const items = match.trim().split("\n").map((l) => l.replace(/^\d+\.\s+/, "").trim());
    return "<ol>" + items.map((i) => `<li>${i}</li>`).join("") + "</ol>";
  });

  // Paragraphs — wrap remaining loose lines
  html = html.replace(/^(?!<[a-z]|__CODEBLOCK)(.+)$/gm, "<p>$1</p>");

  // Line breaks
  html = html.replace(/ {2}\n/g, "<br>\n");

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    html = html.replace(`<p>__CODEBLOCK${i}__</p>`, block);
    html = html.replace(`__CODEBLOCK${i}__`, block);
  });

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, "");
  html = html.replace(/\n{3,}/g, "\n\n");
  html = html.trim();

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type TabMode = "html-to-md" | "md-to-html";

export function HtmlToMarkdownTool() {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<TabMode>("html-to-md");
  const [copied, setCopied] = useState("");

  const copyText = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return tab === "html-to-md" ? htmlToMarkdown(input) : markdownToHtml(input);
  }, [input, tab]);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lineCount = output ? output.split("\n").length : 0;

  const base = isDark ? "bg-neutral-900 border-white/10 text-neutral-100" : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600" : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark ? "bg-white/10 hover:bg-white/15 border-white/10" : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  const placeholder = tab === "html-to-md"
    ? '<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> and <em>italic</em> paragraph.</p>\n<ul>\n  <li>Item one</li>\n  <li>Item two</li>\n</ul>'
    : '# Hello World\n\nThis is a **bold** and *italic* paragraph.\n\n- Item one\n- Item two';

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setTab("html-to-md"); setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", tab === "html-to-md" ? btnActive : btnBase)}
        >
          HTML → Markdown
        </button>
        <button
          onClick={() => { setTab("md-to-html"); setInput(""); setCopied(""); }}
          className={cx("rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]", tab === "md-to-html" ? btnActive : btnBase)}
        >
          Markdown → HTML
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
        <label htmlFor="html-md-input" className="text-sm font-semibold block mb-2">
          {tab === "html-to-md" ? "Paste HTML" : "Paste Markdown"}
        </label>
        <textarea
          id="html-md-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
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
                {tab === "html-to-md" ? "Markdown Output" : "HTML Output"}
              </h3>
              <span className={cx("text-xs", muted)}>
                {output.length} char{output.length !== 1 ? "s" : ""} · {lineCount} line{lineCount !== 1 ? "s" : ""}
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
          <pre className={cx("rounded-lg border p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap", isDark ? "border-white/5 bg-neutral-950" : "border-black/5 bg-neutral-50")}>
            {output}
          </pre>
        </div>
      )}

      {/* Keyboard shortcut hint */}
      <div className={cx("text-xs text-center", muted)}>
        Press <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>Ctrl</kbd> + <kbd className={cx("rounded border px-1.5 py-0.5 text-xs", isDark ? "border-white/10" : "border-black/10")}>K</kbd> to focus input
      </div>
    </div>
  );
}
