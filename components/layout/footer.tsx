"use client";

import Link from "next/link";
import { cx } from "@/lib/utils";
import { useTheme } from "./theme-provider";

const featuredTools = [
  { href: "/", label: "Case Converter" },
  { href: "/word-counter", label: "Word Counter" },
  { href: "/text-cleaner", label: "Text Cleaner" },
  { href: "/json-formatter", label: "JSON Formatter" },
  { href: "/password-generator", label: "Password Generator" },
  { href: "/qr-code-generator", label: "QR Code Generator" },
];

export function Footer() {
  const { isDark } = useTheme();

  const linkClass = cx(
    "inline-flex min-h-8 items-center text-sm transition-colors",
    isDark
      ? "text-neutral-300 hover:text-white"
      : "text-neutral-600 hover:text-neutral-900"
  );

  const headingClass = cx(
    "mb-3 text-xs uppercase tracking-wide",
    isDark ? "text-neutral-400" : "text-neutral-500"
  );

  return (
    <footer
      className={cx(
        "mt-16 border-t",
        isDark ? "border-white/10" : "border-black/10"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className={headingClass}>Popular tools</div>
            <div className="grid grid-cols-2 gap-x-4 sm:block sm:space-y-1">
              {featuredTools.map((tool) => (
                <Link key={tool.href} href={tool.href} className={linkClass}>
                  {tool.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className={headingClass}>Resources</div>
            <div className="space-y-1">
              <Link href="/tools" className={linkClass}>All Tools</Link>
              <Link href="/learn" className={linkClass}>Learn Text Formats</Link>
              <Link href="/articles" className={linkClass}>Articles</Link>
              <Link href="/editorial-policy" className={linkClass}>Editorial Policy</Link>
              <Link href="/about" className={linkClass}>About FlipMyCase</Link>
            </div>
          </div>

          <div>
            <div className={headingClass}>Trust and legal</div>
            <div className="space-y-1">
              <Link href="/contact" className={linkClass}>Contact</Link>
              <Link href="/privacy" className={linkClass}>Privacy</Link>
              <Link href="/privacy-and-testing" className={linkClass}>Privacy &amp; Test Center</Link>
              <Link href="/terms" className={linkClass}>Terms</Link>
              <Link href="/cookies" className={linkClass}>Cookies</Link>
              <Link href="/accessibility" className={linkClass}>Accessibility</Link>
            </div>
          </div>
        </div>

        <div
          className={cx(
            "mt-8 flex flex-col items-center justify-between gap-2 border-t pt-4 sm:flex-row",
            isDark ? "border-white/5" : "border-black/5"
          )}
        >
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            &copy; {new Date().getFullYear()} FlipMyCase. All rights reserved.
          </div>
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            Tool input is processed in your browser and is not intentionally sent to FlipMyCase.
          </div>
        </div>
      </div>
    </footer>
  );
}
