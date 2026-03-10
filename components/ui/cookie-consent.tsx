"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";

type ConsentChoice = "granted" | "denied";

function updateGtagConsent(choice: ConsentChoice) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
      functionality_storage: choice,
      personalization_storage: choice,
    });
  }
}

function getSavedConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "granted" || val === "denied") return val;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function saveConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // localStorage unavailable
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const saved = getSavedConsent();
    if (saved) {
      updateGtagConsent(saved);
    } else {
      setIsVisible(true);
    }
  }, []);

  // Expose a global function to re-open the consent banner (GDPR requirement)
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as Window & { reopenCookieConsent?: () => void }).reopenCookieConsent = () => {
        setIsVisible(true);
      };
    }
  }, []);

  const handleAccept = () => {
    saveConsent("granted");
    updateGtagConsent("granted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    saveConsent("denied");
    updateGtagConsent("denied");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-lg"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              We use cookies to understand how this site is used and to personalize ads. See our{" "}
              <Link href="/cookies" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ManageCookiePreferences() {
  return (
    <p style={{ marginTop: 16 }}>
      <button
        onClick={() => {
          const win = window as Window & { reopenCookieConsent?: () => void };
          win.reopenCookieConsent?.();
        }}
        className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
      >
        Manage Cookie Preferences
      </button>
    </p>
  );
}
