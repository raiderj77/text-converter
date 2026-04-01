import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolsByCategory } from "@/lib/config";
import { WebAppSchema, BreadcrumbSchema } from "@/components/seo/schema";

const pageUrl = `${SITE_URL}/tools`;

export const metadata: Metadata = {
  title: "All Free Text Tools — FlipMyCase | Developer & Writer Utilities",
  description:
    "Browse all free browser-based text tools. Case converters, JSON formatter, regex tester, hash generator, text diff, and more. No signup.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "All Free Text Tools — FlipMyCase",
    description:
      "Browse all free browser-based text tools. Case converters, JSON formatter, regex tester, hash generator, text diff, and more. No signup.",
    url: pageUrl,
    type: "website",
  },
};

/** Map internal categories to the 4 directory categories */
const DIRECTORY_CATEGORIES = [
  {
    label: "Text Case & Formatting",
    description: "Convert, format, and transform text case and styling.",
    match: ["Text Tools", "Font Styles"],
  },
  {
    label: "Developer & Code Tools",
    description: "Formatters, validators, and utilities for developers.",
    match: ["Developer"],
  },
  {
    label: "Analysis & Counting",
    description: "Count words, analyze readability, compare text, and more.",
    match: ["Analysis"],
  },
  {
    label: "Fun & Encoding",
    description: "Encoders, decoders, generators, and fun text transformations.",
    match: ["Encoding", "Generators"],
  },
];

export default function ToolsPage() {
  const grouped = getToolsByCategory();

  const directoryGroups = DIRECTORY_CATEGORIES.map((dir) => {
    const tools = grouped
      .filter((g) => dir.match.includes(g.name))
      .flatMap((g) => g.tools);
    return { ...dir, tools };
  });

  const totalTools = directoryGroups.reduce((sum, g) => sum + g.tools.length, 0);

  return (
    <>
      <WebAppSchema
        name="FlipMyCase — All Free Text Tools"
        description="Browse all free browser-based text tools. Case converters, JSON formatter, regex tester, hash generator, text diff, and more."
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "All Tools", href: "/tools" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          All Free Text Tools
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          {totalTools} free browser-based tools for developers and writers. No signup, no
          limits — everything runs in your browser.
        </p>

        {directoryGroups.map((group) => (
          <section key={group.label} className="mt-10">
            <h2 className="text-lg sm:text-xl font-semibold">{group.label}</h2>
            <p className="mt-1 text-sm text-neutral-300">{group.description}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.tools.map((tool) => {
                const href = tool.slug === "" ? "/" : `/${tool.slug}`;
                return (
                  <Link
                    key={tool.slug}
                    href={href}
                    className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tool.emoji}</span>
                      <span className="text-sm font-semibold group-hover:text-emerald-400 transition-colors">
                        {tool.name}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2">
                      {tool.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
