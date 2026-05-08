"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const STORAGE_KEY = "flipmycase-consent";

function isGPCActive(): boolean {
  if (typeof navigator === "undefined") return false;
  // @ts-expect-error — globalPrivacyControl not yet in TS lib
  if (navigator.globalPrivacyControl === true) return true;
  try {
    return document.cookie.split(";").some((c) => c.trim().startsWith("empire_gpc=1"));
  } catch {
    return false;
  }
}

function getSavedConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "accepted" || val === "rejected") return val;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function grantAll() {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isGPCActive()) {
      try { localStorage.setItem(STORAGE_KEY, "rejected"); } catch { /* noop */ }
      return;
    }
    const saved = getSavedConsent();
    if (saved === "accepted") {
      grantAll();
    } else if (saved === null) {
      setVisible(true);
    }
  }, []);

  const handleReject = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, "rejected"); } catch { /* noop */ }
    setVisible(false);
  }, []);

  const handleAccept = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, "accepted"); } catch { /* noop */ }
    grantAll();
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleReject();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, handleReject]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-800 bg-neutral-900 shadow-lg"
    >
      <div className="mx-auto max-w-4xl px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="flex-1 text-sm text-neutral-300">
            We use cookies for analytics and ads. You can accept all or reject
            non-essential.{" "}
            <Link
              href="/privacy"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Learn more
            </Link>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={handleReject}
              className="rounded-lg border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
            >
              Reject non-essential
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
