"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

function extractUrls(text: string): string[] {
  const urlRegex = /(?:https?:\/\/|ftp:\/\/|www\.)[^\s<>"')\]},;]+/gi;
  const matches = text.match(urlRegex) || [];
  return matches.map((url) => {
    // Ensure www. URLs have a protocol
    if (/^www\./i.test(url)) return `https://${url}`;
    return url;
  });
}

function getDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return url;
  }
}

export function ExtractUrlsTool() {
  const { isDark } = useTheme();
  const [text, setText] = useState("");
  const [deduplicate, setDeduplicate] = useState(false);
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
  const btnActive = isDark
    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  // Persist input
  useEffect(() => {
    const saved = localStorage.getItem("fmc_extract_urls_text");
    if (saved) setText(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("fmc_extract_urls_text", text);
  }, [text]);

  const rawUrls = useMemo(() => extractUrls(text), [text]);

  const urls = useMemo(() => {
    if (!deduplicate) return rawUrls;
    const seen = new Set<string>();
    return rawUrls.filter((u) => {
      const lower = u.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
  }, [rawUrls, deduplicate]);

  const domainBreakdown = useMemo(() => {
    const map = new Map<string, number>();
    urls.forEach((u) => {
      const d = getDomain(u);
      map.set(d, (map.get(d) || 0) + 1);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [urls]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1200);
  }, []);

  const handleCopyList = useCallback(() => {
    if (!urls.length) return;
    navigator.clipboard.writeText(urls.join("\n")).then(
      () => showToast("Copied!"),
      () => showToast("Copy failed")
    );
  }, [urls, showToast]);

  const handleClear = useCallback(() => {
    setText("");
  }, []);

  return (
    <div className="space-y-4">
      {/* Input */}
      <div className={cx("rounded-xl border p-4", base)}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold">Input Text</label>
          <span className={cx("text-xs tabular-nums", muted)}>
            {text.length.toLocaleString()} char{text.length !== 1 ? "s" : ""}
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          spellCheck={false}
          placeholder="Paste text containing URLs here..."
          className={cx(
            "w-full resize-y rounded-lg border px-3 py-2 text-sm leading-6 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
            inputBase
          )}
        />
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setDeduplicate(!deduplicate)}
          className={cx(
            "flex items-center gap-2 rounded-xl border px-3 min-h-[44px] text-sm transition-colors",
            deduplicate ? btnActive : btnBase
          )}
        >
          <div
            className={cx(
              "w-4 h-4 rounded border flex items-center justify-center text-xs shrink-0",
              deduplicate
                ? "bg-emerald-500 border-emerald-500 text-white"
                : isDark
                  ? "border-white/20"
                  : "border-black/20"
            )}
          >
            {deduplicate ? "✓" : ""}
          </div>
          Deduplicate
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopyList}
          disabled={!urls.length}
          className={cx(
            "rounded-xl border px-4 min-h-[44px] text-sm font-semibold transition-colors",
            urls.length
              ? isDark
                ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300"
                : "border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
              : "opacity-40 cursor-not-allowed border-white/5"
          )}
        >
          Copy as List
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

      {/* Results */}
      {urls.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">
              Extracted URLs — {urls.length} found
              {deduplicate && rawUrls.length !== urls.length && (
                <span className={cx("ml-2 font-normal", muted)}>
                  ({rawUrls.length - urls.length} duplicate{rawUrls.length - urls.length !== 1 ? "s" : ""} removed)
                </span>
              )}
            </label>
          </div>
          <div
            aria-live="polite"
            className={cx(
              "rounded-lg border p-3 font-mono text-sm whitespace-pre-wrap break-all leading-relaxed max-h-[400px] overflow-y-auto",
              inputBase
            )}
          >
            {urls.join("\n")}
          </div>
        </div>
      )}

      {/* Domain breakdown */}
      {domainBreakdown.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <label className="text-sm font-semibold block mb-2">
            Domain Breakdown — {domainBreakdown.length} unique domain{domainBreakdown.length !== 1 ? "s" : ""}
          </label>
          <div className="space-y-1">
            {domainBreakdown.map(([domain, count]) => (
              <div
                key={domain}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-mono text-xs truncate mr-3">{domain}</span>
                <span className={cx("text-xs tabular-nums shrink-0", muted)}>
                  {count} URL{count !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {text && urls.length === 0 && (
        <div
          aria-live="polite"
          className={cx("text-sm text-center py-4", muted)}
        >
          No URLs found in the input text.
        </div>
      )}

      <div className={cx("text-xs text-center", muted)}>
        Extracts http, https, ftp & www URLs · All processing in your browser ·
        Ctrl/⌘ + L toggles theme
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
