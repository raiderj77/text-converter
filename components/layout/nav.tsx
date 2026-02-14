"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLiveTools, SITE_NAME } from "@/lib/config";
import { cx } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function Nav() {
  const { isDark, toggle } = useTheme();
  const pathname = usePathname();
  const liveTools = getLiveTools();

  function isActive(slug: string) {
    if (slug === "") return pathname === "/";
    return pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);
  }

  return (
    <nav
      className={cx(
        "sticky top-0 z-50 border-b backdrop-blur-md",
        isDark
          ? "bg-neutral-950/90 border-white/10"
          : "bg-neutral-50/90 border-black/10"
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Site name */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold tracking-tight">{SITE_NAME}</span>
          </Link>

          {/* Tool links */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {liveTools.map((tool) => {
              const href = tool.slug === "" ? "/" : `/${tool.slug}`;
              const active = isActive(tool.slug);
              return (
                <Link
                  key={tool.slug}
                  href={href}
                  className={cx(
                    "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors",
                    active
                      ? isDark
                        ? "bg-white/10 font-semibold"
                        : "bg-black/10 font-semibold"
                      : isDark
                        ? "hover:bg-white/5 text-neutral-300"
                        : "hover:bg-black/5 text-neutral-600"
                  )}
                >
                  <span className="hidden sm:inline">{tool.emoji} </span>
                  <span className="sm:hidden">{tool.shortName}</span>
                  <span className="hidden sm:inline">{tool.name}</span>
                </Link>
              );
            })}

            {/* Blog link */}
            <Link
              href="/blog"
              className={cx(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors",
                pathname.startsWith("/blog")
                  ? isDark
                    ? "bg-white/10 font-semibold"
                    : "bg-black/10 font-semibold"
                  : isDark
                    ? "hover:bg-white/5 text-neutral-300"
                    : "hover:bg-black/5 text-neutral-600"
              )}
            >
              <span className="hidden sm:inline">📖 </span>Guides
            </Link>
          </div>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            className={cx(
              "shrink-0 rounded-lg px-3 py-1.5 text-sm border transition-colors",
              isDark
                ? "border-white/10 hover:bg-white/10"
                : "border-black/10 hover:bg-black/5"
            )}
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
