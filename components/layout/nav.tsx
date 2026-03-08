"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import { getLiveTools, getToolsByCategory, TOOL_CATEGORIES, SITE_NAME } from "@/lib/config";
import type { ToolCategory } from "@/lib/config";
import { cx } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function Nav() {
  const { isDark, toggle } = useTheme();
  const pathname = usePathname();
  const liveTools = getLiveTools();
  const grouped = useMemo(() => getToolsByCategory(), []);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("Text Tools");
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  function isActive(slug: string) {
    if (slug === "") return pathname === "/";
    return pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);
  }

  const activeTool = liveTools.find((t) => isActive(t.slug));

  // Filtered tools for search
  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return liveTools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.shortName.toLowerCase().includes(q)
    );
  }, [search, liveTools]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
        setSearch("");
      }
    }
    if (toolsOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [toolsOpen]);

  // Focus search when dropdown opens
  useEffect(() => {
    if (toolsOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [toolsOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
    setSearch("");
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Active category tools (desktop)
  const activeCategoryTools = grouped.find((g) => g.name === activeCategory)?.tools ?? [];

  function ToolLink({ tool, onClick, compact }: { tool: typeof liveTools[0]; onClick?: () => void; compact?: boolean }) {
    const href = tool.slug === "" ? "/" : `/${tool.slug}`;
    const active = isActive(tool.slug);
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cx(
          "flex items-center gap-2.5 rounded-xl px-3 transition-colors group",
          compact ? "py-2" : "py-2.5",
          active
            ? isDark ? "bg-emerald-500/10" : "bg-emerald-50"
            : isDark ? "hover:bg-white/5" : "hover:bg-black/5"
        )}
      >
        <span className={cx(
          "w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 transition-transform group-hover:scale-110",
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
        {active && (
          <span className={cx(
            "ml-auto w-1.5 h-1.5 rounded-full shrink-0",
            isDark ? "bg-emerald-400" : "bg-emerald-500"
          )} />
        )}
      </Link>
    );
  }

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

                {/* Mega menu dropdown */}
                {toolsOpen && (
                  <div className={cx(
                    "absolute top-full right-0 mt-2 rounded-2xl border shadow-xl overflow-hidden",
                    isDark ? "bg-neutral-900 border-white/10" : "bg-white border-black/10"
                  )} style={{ width: "720px" }}>
                    {/* Search box */}
                    <div className={cx("px-3 pt-3 pb-2 border-b", isDark ? "border-white/5" : "border-black/5")}>
                      <div className="relative">
                        <svg className={cx("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4", isDark ? "text-neutral-500" : "text-neutral-400")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input
                          ref={searchRef}
                          type="text"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search tools..."
                          className={cx(
                            "w-full rounded-lg border pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                            isDark
                              ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
                              : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400"
                          )}
                        />
                      </div>
                    </div>

                    {searchResults ? (
                      /* Search results */
                      <div className="p-2 max-h-[400px] overflow-y-auto">
                        {searchResults.length === 0 ? (
                          <div className={cx("text-sm text-center py-6", isDark ? "text-neutral-500" : "text-neutral-400")}>
                            No tools found for &ldquo;{search}&rdquo;
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-1">
                            {searchResults.map((tool) => (
                              <ToolLink key={tool.slug} tool={tool} onClick={() => { setToolsOpen(false); setSearch(""); }} compact />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Category tabs + tools grid */
                      <div className="flex" style={{ minHeight: "360px" }}>
                        {/* Category sidebar */}
                        <div className={cx("w-[180px] shrink-0 border-r py-2 px-1.5 space-y-0.5", isDark ? "border-white/5" : "border-black/5")}>
                          {TOOL_CATEGORIES.map((cat) => (
                            <button
                              key={cat.name}
                              type="button"
                              onClick={() => setActiveCategory(cat.name)}
                              className={cx(
                                "w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                                activeCategory === cat.name
                                  ? isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-700"
                                  : isDark ? "hover:bg-white/5 text-neutral-300" : "hover:bg-black/5 text-neutral-600"
                              )}
                            >
                              <span className="text-base">{cat.emoji}</span>
                              <span>{cat.name}</span>
                              <span className={cx("ml-auto text-xs", isDark ? "text-neutral-600" : "text-neutral-400")}>
                                {grouped.find((g) => g.name === cat.name)?.tools.length}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Tools grid */}
                        <div className="flex-1 p-2 overflow-y-auto max-h-[400px]">
                          <div className="grid grid-cols-2 gap-1">
                            {activeCategoryTools.map((tool) => (
                              <ToolLink key={tool.slug} tool={tool} onClick={() => { setToolsOpen(false); setSearch(""); }} compact />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* All Tools link */}
                    <div className={cx("border-t px-3 py-2.5", isDark ? "border-white/5" : "border-black/5")}>
                      <Link
                        href="/tools"
                        onClick={() => { setToolsOpen(false); setSearch(""); }}
                        className={cx(
                          "flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                          isDark ? "hover:bg-white/5 text-emerald-400" : "hover:bg-black/5 text-emerald-600"
                        )}
                      >
                        Browse all {liveTools.length} tools
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* All Tools link */}
              <Link
                href="/tools"
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                  pathname === "/tools"
                    ? isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"
                    : isDark ? "hover:bg-white/5 text-neutral-300" : "hover:bg-black/5 text-neutral-600"
                )}
              >
                All Tools
              </Link>

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
              {/* Mobile search */}
              <div className="relative mb-3">
                <svg className={cx("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4", isDark ? "text-neutral-500" : "text-neutral-400")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tools..."
                  className={cx(
                    "w-full rounded-lg border pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                    isDark
                      ? "bg-neutral-900 border-white/10 text-neutral-100 placeholder:text-neutral-600"
                      : "bg-white border-black/10 text-neutral-900 placeholder:text-neutral-400"
                  )}
                />
              </div>

              {searchResults ? (
                /* Mobile search results */
                searchResults.length === 0 ? (
                  <div className={cx("text-sm text-center py-6", isDark ? "text-neutral-500" : "text-neutral-400")}>
                    No tools found for &ldquo;{search}&rdquo;
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5">
                    {searchResults.map((tool) => (
                      <ToolLink key={tool.slug} tool={tool} onClick={() => { setMobileOpen(false); setSearch(""); }} />
                    ))}
                  </div>
                )
              ) : (
                /* Mobile categorized list */
                <>
                  {grouped.map((group) => (
                    <MobileCategory
                      key={group.name}
                      label={`${group.emoji} ${group.name}`}
                      count={group.tools.length}
                      isDark={isDark}
                    >
                      <div className="grid grid-cols-2 gap-1.5">
                        {group.tools.map((tool) => (
                          <ToolLink key={tool.slug} tool={tool} onClick={() => { setMobileOpen(false); setSearch(""); }} />
                        ))}
                      </div>
                    </MobileCategory>
                  ))}
                </>
              )}

              <div className={cx("border-t my-3", isDark ? "border-white/10" : "border-black/10")} />

              <Link
                href="/tools"
                onClick={() => setMobileOpen(false)}
                className={cx(
                  "flex items-center gap-2.5 rounded-xl px-3 py-3",
                  pathname === "/tools"
                    ? isDark ? "bg-white/10" : "bg-black/10"
                    : isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
                )}
              >
                <span className={cx("w-8 h-8 rounded-lg flex items-center justify-center text-sm", isDark ? "bg-white/5" : "bg-black/5")}>🧰</span>
                <span className="text-sm font-medium">All Tools</span>
              </Link>

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

/** Collapsible category section for mobile */
function MobileCategory({
  label,
  count,
  isDark,
  children,
}: {
  label: string;
  count: number;
  isDark: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cx(
          "w-full flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition-colors min-h-[44px]",
          open
            ? isDark ? "bg-white/10" : "bg-black/10"
            : isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
        )}
      >
        <span>{label}</span>
        <span className="flex items-center gap-2">
          <span className={cx("text-xs", isDark ? "text-neutral-500" : "text-neutral-400")}>{count}</span>
          <svg
            className={cx("w-3.5 h-3.5 transition-transform", open ? "rotate-180" : "")}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      {open && <div className="mt-1.5">{children}</div>}
    </div>
  );
}
