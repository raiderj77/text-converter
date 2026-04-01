"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&copy;": "\u00A9",
  "&reg;": "\u00AE",
  "&trade;": "\u2122",
  "&mdash;": "\u2014",
  "&ndash;": "\u2013",
  "&laquo;": "\u00AB",
  "&raquo;": "\u00BB",
  "&hellip;": "\u2026",
  "&bull;": "\u2022",
  "&euro;": "\u20AC",
  "&pound;": "\u00A3",
  "&yen;": "\u00A5",
  "&cent;": "\u00A2",
};

function decodeEntities(text: string): string {
  // Named entities
  let decoded = text.replace(/&[a-zA-Z]+;/g, (entity) => {
    const lower = entity.toLowerCase();
    return HTML_ENTITIES[lower] ?? entity;
  });
  // Numeric entities (decimal)
  decoded = decoded.replace(/&#(\d+);/g, (_, num) => {
    const code = parseInt(num, 10);
    return code > 0 && code < 0x10ffff ? String.fromCodePoint(code) : _;
  });
  // Numeric entities (hex)
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    const code = parseInt(hex, 16);
    return code > 0 && code < 0x10ffff ? String.fromCodePoint(code) : _;
  });
  return decoded;
}

function stripHtml(text: string, keepTags: string[]): string {
  if (keepTags.length === 0) {
    return text.replace(/<[^>]*>/g, "");
  }
  // Build regex that matches tags NOT in the keep list
  const keepSet = new Set(keepTags.map((t) => t.toLowerCase().trim()));
  return text.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tagName) => {
    if (keepSet.has(tagName.toLowerCase())) return match;
    return "";
  });
}

export function RemoveHtmlTagsTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [keepTagsStr, setKeepTagsStr] = useState("");
  const [toast, setToast] = useState("");

  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Persist input
  useEffect(() => {
    const saved = localStorage.getItem("fmc_remove_html_text");
    if (saved) setText(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("fmc_remove_html_text", text);
  }, [text]);

  const keepTags = useMemo(() => {
    if (!keepTagsStr.trim()) return [];
    return keepTagsStr
      .split(",")
      .map((t) => t.trim().replace(/^<\/?|\/?>$/g, ""))
      .filter(Boolean);
  }, [keepTagsStr]);

  const output = useMemo(() => {
    if (!text) return "";
    const stripped = stripHtml(text, keepTags);
    return decodeEntities(stripped);
  }, [text, keepTags]);

  const tagCount = useMemo(() => {
    const matches = text.match(/<[^>]*>/g);
    return matches ? matches.length : 0;
  }, [text]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1200);
  }, []);

  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(
      () => showToast("Copied!"),
      () => showToast("Copy failed")
    );
  }, [output, showToast]);

  const handleClear = useCallback(() => {
    setText("");
    setKeepTagsStr("");
  }, []);

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Input HTML</label>
          <span className={cx("text-xs tabular-nums", muted)}>
            {tagCount} tag{tagCount !== 1 ? "s" : ""} found
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder="Paste HTML content here..."
          className={cx(
            "w-full resize-y rounded-lg border px-3 py-2 text-sm leading-6 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
        />
      </div>

      {/* Keep tags option */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label className="text-sm font-semibold block mb-1.5">
          Keep Specific Tags (comma-separated)
        </label>
        <input
          type="text"
          value={keepTagsStr}
          onChange={(e) => setKeepTagsStr(e.target.value)}
          placeholder="e.g. a, strong, em, br"
          className={cx(
            "w-full rounded-lg border px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
          spellCheck={false}
          autoComplete="off"
        />
        <p className={cx("mt-1.5 text-xs", muted)}>
          Leave empty to strip all tags. Tags you list here will be preserved in
          the output.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!output}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm font-semibold transition-colors",
            output
              ? isDark
                ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300"
                : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
              : "opacity-40 cursor-not-allowed border-white/5"
          )}
        >
          Copy Output
        </button>
        <button
          type="button"
          onClick={handleClear}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm transition-colors",
            btnBase
          )}
        >
          Clear
        </button>
      </div>

      {/* Output */}
      {text && (
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">
              Clean Text Output
            </label>
            <span className={cx("text-xs tabular-nums", muted)}>
              {output.length.toLocaleString()} char{output.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div
            aria-live="polite"
            className={cx(
              "rounded-lg border p-3 text-sm whitespace-pre-wrap break-words leading-relaxed max-h-[400px] overflow-y-auto",
              inputBase
            )}
          >
            {output || "\u00A0"}
          </div>
        </div>
      )}

      <div className={cx("text-xs text-center", muted)}>
        Strips HTML/XML tags · Decodes entities · All processing in your browser
        · Ctrl/⌘ + L toggles theme
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
