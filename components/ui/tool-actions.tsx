"use client";

import { useCallback } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

export function ToolActions() {
  const { isDark } = useTheme();

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById("share-btn");
      if (btn) {
        const original = btn.textContent;
        btn.textContent = "Link copied!";
        setTimeout(() => {
          btn.textContent = original;
        }, 2000);
      }
    } catch {
      // Clipboard API not available
    }
  }, []);

  const btnClass = cx(
    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors",
    isDark
      ? "border-white/10 text-neutral-300 hover:bg-white/5 hover:text-white"
      : "border-black/10 text-neutral-600 hover:bg-black/5 hover:text-neutral-900"
  );

  return (
    <div className="flex gap-2">
      <button onClick={handlePrint} className={btnClass} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3h12v6"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
      <button onClick={handleShare} className={btnClass} type="button" id="share-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Share link
      </button>
    </div>
  );
}
