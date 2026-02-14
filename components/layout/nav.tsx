"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getLiveTools, SITE_NAME } from "@/lib/config";
import { cx } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function Nav() {
  const { isDark, toggle } = useTheme();
  const pathname = usePathname();
  const liveTools = getLiveTools();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function isActive(slug: string) {
    if (slug === "") return pathname === "/";
    return pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);
  }

  // Get the currently active tool for the button label
  const activeTool = liveTools.find((t) => isActive(t.slug));

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    if (toolsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [toolsOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
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
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className={cx(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105",
                isDark ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-500/10 text-emerald-600"
              )}>
                F
              </div>
              <span className="text-base font-bold tracking-tight hidden sm:inline">{SITE_NAME}</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {/* Tools dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={cx(
                    "flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                    toolsOpen || activeTool
                      ? isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"
                      : isDark ? "hover:bg-white/5 text-neutral-300" : "hover:bg-black/5 text-neutral-600"
                  )}
                >
                  {activeTool ? (
                    <>
                      <span>{activeTool.emoji}</span>
                      <span>{activeTool.name}</span>
                    </>
                  ) : (
                    <span>Tools</span>
                  )}
                  <svg
                    className={cx("w-3.5 h-3.5 transition-transform", toolsOpen ? "rotate-180" : "")}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown panel */}
                {toolsOpen && (
                  <div className={cx(
                    "absolute top-full left-0 mt-2 w-[480px] rounded-2xl border p-2 shadow-xl",
                    isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
                  )}>
                    <div className="grid grid-cols-2 gap-1">
                      {liveTools.map((tool) => {
                        const href = tool.slug === "" ? "/" : `/${tool.slug}`;
                        const active = isActive(tool.slug);
                        return (
                          <Link
                            key={tool.slug}
                            href={href}
                            onClick={() => setToolsOpen(false)}
                            className={cx(
                              "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors group",
                              active
                                ? isDark ? "bg-emerald-500/10" : "bg-emerald-50"
                                : isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                            )}
                          >
                            <span className={cx(
                              "w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0 transition-transform group-hover:scale-110",
                              active
                                ? isDark ? "bg-emerald-500/20" : "bg-emerald-100"
                                : isDark ? "bg-white/5" : "bg-black/5"
                            )}>
                              {tool.emoji}
                            </span>
                            <div className="min-w-0">
                              <div className={cx(
                                "text-sm font-medium truncate",
                                active ? isDark ? "text-emerald-400" : "text-emerald-700" : ""
                              )}>
                                {tool.name}
                              </div>
                            </div>
                            {active && (
                              <div className={cx(
                                "ml-auto w-1.5 h-1.5 rounded-full shrink-0",
                                isDark ? "bg-emerald-400" : "bg-emerald-500"
                              )} />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Guides link */}
              <Link
                href="/blog"
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/blog")
                    ? isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"
                    : isDark ? "hover:bg-white/5 text-neutral-300" : "hover:bg-black/5 text-neutral-600"
                )}
              >
                Guides
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggle}
                className={cx(
                  "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm border transition-colors",
                  isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                )}
                aria-label="Toggle theme"
              >
                {isDark ? "☀️" : "🌙"}
              </button>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cx(
                  "md:hidden shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-colors",
                  mobileOpen
                    ? isDark ? "border-emerald-500/40 bg-emerald-500/10" : "border-emerald-500/40 bg-emerald-50"
                    : isDark ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"
                )}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Menu panel */}
          <div className={cx(
            "relative w-full max-h-[calc(100vh-3.5rem)] overflow-y-auto",
            isDark ? "bg-neutral-950" : "bg-neutral-50"
          )}>
            <div className="p-4 space-y-2">
              <div className={cx("text-xs font-semibold uppercase tracking-wider px-2 pb-2", isDark ? "text-neutral-500" : "text-neutral-400")}>
                Tools
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {liveTools.map((tool) => {
                  const href = tool.slug === "" ? "/" : `/${tool.slug}`;
                  const active = isActive(tool.slug);
                  return (
                    <Link
                      key={tool.slug}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cx(
                        "flex items-center gap-2.5 rounded-xl px-3 py-3 transition-colors",
                        active
                          ? isDark ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-emerald-50 border border-emerald-200"
                          : isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                      )}
                    >
                      <span className={cx(
                        "w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0",
                        active
                          ? isDark ? "bg-emerald-500/20" : "bg-emerald-100"
                          : isDark ? "bg-white/5" : "bg-black/5"
                      )}>
                        {tool.emoji}
                      </span>
                      <span className={cx(
                        "text-sm font-medium truncate",
                        active ? isDark ? "text-emerald-400" : "text-emerald-700" : ""
                      )}>
                        {tool.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className={cx("border-t my-3", isDark ? "border-white/10" : "border-black/10")} />

              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className={cx(
                  "flex items-center gap-2.5 rounded-xl px-3 py-3",
                  pathname.startsWith("/blog")
                    ? isDark ? "bg-white/10" : "bg-black/10"
                    : isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                )}
              >
                <span className={cx("w-8 h-8 rounded-lg flex items-center justify-center text-sm", isDark ? "bg-white/5" : "bg-black/5")}>📖</span>
                <span className="text-sm font-medium">Guides</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
