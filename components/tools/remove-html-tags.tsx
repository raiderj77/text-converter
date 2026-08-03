"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { decodeHtmlEntitiesOnce, stripMarkupTags, tokenizeMarkup } from "@/lib/markup-text";
import { useTheme } from "@/components/layout/theme-provider";

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
  const muted = isDark ? "text-neutral-400" : "text-neutral-600";

  const keepTags = useMemo(() => {
    if (!keepTagsStr.trim()) return [];
    return keepTagsStr
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => /^[a-z][a-z0-9]*$/.test(tag));
  }, [keepTagsStr]);

  const output = useMemo(() => {
    if (!text) return "";
    return decodeHtmlEntitiesOnce(stripMarkupTags(text, keepTags));
  }, [text, keepTags]);

  const tagCount = useMemo(() => {
    return tokenizeMarkup(text).filter((token) => token.type === "tag").length;
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
          aria-label="HTML content"
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
          aria-label="HTML tags to keep"
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
          <output
            aria-live="polite"
            className={cx(
              "block rounded-lg border p-3 text-sm whitespace-pre-wrap break-words leading-relaxed max-h-[400px] overflow-y-auto",
              inputBase
            )}
          >
            {output || "\u00A0"}
          </output>
        </div>
      )}

      <div className={cx("text-xs text-center", muted)}>
        Strips HTML/XML tags · Decodes entities · All processing in your browser
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
