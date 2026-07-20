"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { GA_ID } from "@/lib/config";

type Consent = "granted" | "denied";

const STORAGE_KEY = "flipmycase:analytics-consent";
const SCRIPT_ID = "flipmycase-google-analytics";

function setDisabled(disabled: boolean) {
  (window as typeof window & Record<string, unknown>)[`ga-disable-${GA_ID}`] = disabled;
}

function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter((name): name is string => Boolean(name && (name === "_ga" || name.startsWith("_ga_"))));

  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${window.location.hostname}; SameSite=Lax`;
  }
}

function queuePageView() {
  window.gtag?.("event", "page_view", {
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

function enableAnalytics() {
  setDisabled(false);
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    personalization_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }
}

function disableAnalytics() {
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  setDisabled(true);
  clearAnalyticsCookies();
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null | "loading">("loading");
  const [showChoices, setShowChoices] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        setConsent(stored === "granted" || stored === "denied" ? stored : null);
      } catch {
        setConsent(null);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    enableAnalytics();
    if (lastPath.current !== pathname) {
      queuePageView();
      lastPath.current = pathname;
    }
  }, [consent, pathname]);

  function choose(next: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The current page can still honor the visitor's choice.
    }
    if (next === "denied") disableAnalytics();
    setConsent(next);
    setShowChoices(false);
  }

  if (consent === "loading") return null;

  if (consent !== null && !showChoices) {
    return (
      <button
        type="button"
        onClick={() => setShowChoices(true)}
        className="fixed bottom-4 left-4 z-50 rounded-full border border-white/20 bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        Privacy choices
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Analytics choices"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-white/20 bg-neutral-950 p-5 text-white shadow-2xl"
    >
      <p className="font-bold">Optional, privacy-limited analytics</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">
        If you allow it, Google Analytics receives only this page&apos;s title and path after the URL
        query string is removed. Text, files, generated output, and tool settings stay out of analytics.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-lg border border-white/30 bg-neutral-950 px-4 py-2 text-sm font-semibold hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Continue without analytics
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Allow analytics
        </button>
        <a className="self-center text-sm font-semibold underline" href="/privacy">
          Privacy details
        </a>
      </div>
    </div>
  );
}
