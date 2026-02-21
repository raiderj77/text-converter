"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentPreferences = {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
};

const DEFAULT_CONSENT: ConsentPreferences = {
  essential: true, // Always required
  analytics: false,
  advertising: false,
};

const COOKIE_NAME = "flipmycase_consent";
const COOKIE_EXPIRY_DAYS = 365;

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_CONSENT);
  const [showDetails, setShowDetails] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const savedConsent = getCookie(COOKIE_NAME);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
        // Apply consent to Google Analytics
        updateGtagConsent(parsed);
      } catch (e) {
        console.error("Failed to parse consent cookie", e);
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  // Update Google Tag Manager/Google Analytics consent
  const updateGtagConsent = (consent: ConsentPreferences) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.advertising ? "granted" : "denied",
        ad_user_data: consent.advertising ? "granted" : "denied",
        ad_personalization: consent.advertising ? "granted" : "denied",
      });
    }
  };

  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === "undefined") return;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  };

  const handleAcceptAll = () => {
    const newConsent: ConsentPreferences = {
      essential: true,
      analytics: true,
      advertising: true,
    };
    setPreferences(newConsent);
    setCookie(COOKIE_NAME, JSON.stringify(newConsent), COOKIE_EXPIRY_DAYS);
    updateGtagConsent(newConsent);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    const newConsent: ConsentPreferences = {
      ...preferences,
      essential: true, // Always true
    };
    setPreferences(newConsent);
    setCookie(COOKIE_NAME, JSON.stringify(newConsent), COOKIE_EXPIRY_DAYS);
    updateGtagConsent(newConsent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const newConsent: ConsentPreferences = {
      essential: true,
      analytics: false,
      advertising: false,
    };
    setPreferences(newConsent);
    setCookie(COOKIE_NAME, JSON.stringify(newConsent), COOKIE_EXPIRY_DAYS);
    updateGtagConsent(newConsent);
    setIsVisible(false);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === "essential") return; // Can't toggle essential
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              Your Privacy Choices
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              We use cookies and similar technologies to help our site work, to understand how it is used, and to personalize content and ads. By clicking "Accept All", you agree to the use of all cookies. You can manage your preferences at any time via our{" "}
              <Link href="/cookies" className="text-sage-600 dark:text-sage-400 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
            
            {showDetails && (
              <div className="mt-4 space-y-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">Essential Cookies</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Required for site functionality</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 mr-2">Always on</span>
                    <div className="w-10 h-6 bg-sage-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">✓</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">Analytics Cookies</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Help us improve the site</p>
                  </div>
                  <button
                    onClick={() => togglePreference("analytics")}
                    className={`w-10 h-6 rounded-full transition-colors ${preferences.analytics ? "bg-sage-600" : "bg-neutral-300 dark:bg-neutral-700"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${preferences.analytics ? "translate-x-5" : "translate-x-1"}`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">Advertising Cookies</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Personalize ads and measure effectiveness</p>
                  </div>
                  <button
                    onClick={() => togglePreference("advertising")}
                    className={`w-10 h-6 rounded-full transition-colors ${preferences.advertising ? "bg-sage-600" : "bg-neutral-300 dark:bg-neutral-700"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${preferences.advertising ? "translate-x-5" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-2 text-sm text-sage-600 dark:text-sage-400 hover:underline"
            >
              {showDetails ? "Hide details" : "Show details"}
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={handleAcceptSelected}
              className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Accept Selected
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 text-sm font-medium bg-sage-600 text-white hover:bg-sage-700 rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}