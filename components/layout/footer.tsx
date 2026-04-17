"use client";

import Link from "next/link";
import { getToolsByCategory, SITE_NAME } from "@/lib/config";
import { cx } from "@/lib/utils";
import { useTheme } from "./theme-provider";
import { useMemo } from "react";

export function Footer() {
  const { isDark } = useTheme();
  const grouped = useMemo(() => getToolsByCategory(), []);

  const linkClass = cx(
    "block text-sm transition-colors",
    isDark ? "text-neutral-300 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
  );

  const headingClass = cx(
    "text-xs uppercase tracking-wide mb-3",
    isDark ? "text-neutral-400" : "text-neutral-500"
  );

  return (
    <footer
      className={cx(
        "border-t mt-16",
        isDark ? "border-white/10" : "border-black/10"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Tool categories grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {grouped.map((group) => (
            <div key={group.name}>
              <div className={headingClass}>
                {group.emoji} {group.name}
              </div>
              <div className="space-y-2">
                {group.tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.slug === "" ? "/" : `/${tool.slug}`}
                    className={linkClass}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Resources column */}
          <div>
            <div className={headingClass}>Resources</div>
            <div className="space-y-2">
              <Link href="/blog" className={linkClass}>Guides & Blog</Link>
              <Link href="/learn" className={linkClass}>Learn Formats</Link>
            </div>
          </div>

          {/* Legal column */}
          <div>
            <div className={headingClass}>Legal</div>
            <div className="space-y-2">
              {["About", "Contact", "Privacy", "Terms", "Cookies", "Accessibility"].map((page) => (
                <Link key={page} href={`/${page.toLowerCase()}`} className={linkClass}>
                  {page}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={cx(
            "mt-8 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2",
            isDark ? "border-white/5" : "border-black/5"
          )}
        >
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            &copy; {new Date().getFullYear()} FlipMyCase. All rights reserved.
          </div>
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            All processing happens in your browser. Your text never leaves your device.
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            More Free Tools:{" "}
            <a href="https://creatorrevenuecalculator.com" className="hover:underline">Creator Revenue Calculator</a>
            {" · "}
            <a href="https://fibertools.app" className="hover:underline">FiberTools</a>
            {" · "}
            <a href="https://mindchecktools.com" className="hover:underline">MindCheck Tools</a>
            {" · "}
            <a href="https://flipmycase.com" className="hover:underline">FlipMyCase</a>
            {" · "}
            <a href="https://contractextract.com" className="hover:underline">ContractExtract</a>
            {" · "}
            <a href="https://medicalbillreader.com" className="hover:underline">Medical Bill Reader</a>
            {" · "}
            <a href="https://taxbreaktools.com" className="hover:underline">TaxBreakTools</a>
            {" · "}
            <a href="https://524tracker.com" className="hover:underline">524 Tracker</a>
            {" · "}
            <a href="https://aibusinessalternative.com" className="hover:underline">AI Business Alternative</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
