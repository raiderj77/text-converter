"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  slot: "after-tool" | "mid-content" | "before-footer";
  /** Page identifier for unique ad unit IDs, e.g. "home", "word-counter" */
  page?: string;
};

export function AdSlot({ slot, page = "default" }: AdSlotProps) {
  const id = `ad-${page}-${slot}`;
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded (e.g. ad blocker)
    }
  }, []);

  return (
    <div className="my-8" id={id}>
      <div className="mx-auto max-w-3xl">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-7171402107622932"
          data-ad-slot={id}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
