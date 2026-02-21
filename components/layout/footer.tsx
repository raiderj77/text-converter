"use client";

import Link from "next/link";
import { getLiveTools, SITE_NAME } from "@/lib/config";
import { cx } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function Footer() {
  const { isDark } = useTheme();
  const liveTools = getLiveTools();

  return (
    <footer
      className={cx(
        "border-t mt-16",
        isDark ? "border-white/10" : "border-black/10"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {/* Tools column */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-3",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Tools
            </div>
            <div className="space-y-2">
              {liveTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.slug === "" ? "/" : `/${tool.slug}`}
                  className={cx(
                    "block text-sm transition-colors",
                    isDark
                      ? "text-neutral-300 hover:text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources column */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-3",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Resources
            </div>
            <div className="space-y-2">
              <Link
                href="/blog"
                className={cx(
                  "block text-sm transition-colors",
                  isDark
                    ? "text-neutral-300 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                Guides & Blog
              </Link>
              <Link
                href="/learn"
                className={cx(
                  "block text-sm transition-colors",
                  isDark
                    ? "text-neutral-300 hover:text-white"
                    : "text-neutral-600 hover:text-neutral-900"
                )}
              >
                Learn Formats
              </Link>
            </div>
          </div>

          {/* Legal column */}
          <div>
            <div
              className={cx(
                "text-xs uppercase tracking-wide mb-3",
                isDark ? "text-neutral-400" : "text-neutral-500"
              )}
            >
              Legal
            </div>
            <div className="space-y-2">
              {["About", "Contact", "Privacy", "Terms", "Cookies", "Accessibility"].map((page) => (
                <Link
                  key={page}
                  href={`/${page.toLowerCase()}`}
                  className={cx(
                    "block text-sm transition-colors",
                    isDark
                      ? "text-neutral-300 hover:text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  )}
                >
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
            © {new Date().getFullYear()} {SITE_NAME}. Free text tools. No signup required.
          </div>
          <div className={cx("text-xs", isDark ? "text-neutral-400" : "text-neutral-500")}>
            All processing happens in your browser. Your text never leaves your device.
          </div>
        </div>
      </div>
    </footer>
  );
}
