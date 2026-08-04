import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/config";
import { WebAppSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { interactiveToolsByCategory, referenceGuides } from "@/lib/tool-inventory";

const pageUrl = `${SITE_URL}/tools`;

export const metadata: Metadata = {
  title: "75 Free Interactive Text Tools & 3 Reference Guides",
  description:
    "Browse 75 free interactive text tools and 3 reference guides, including case converters, formatters, validators, and developer utilities.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "75 Free Interactive Text Tools & 3 Reference Guides | FlipMyCase",
    description:
      "Browse 75 free interactive text tools and 3 reference guides for developers and writers.",
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
  const grouped = interactiveToolsByCategory;

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
        name="FlipMyCase — 75 Interactive Text Tools"
        description="Browse 75 free interactive text tools and 3 reference guides, including case converters, formatters, validators, and developer utilities."
        url={pageUrl}
        dateModified={"2026-08-03"}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "All Tools", href: "/tools" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Interactive Text Tools &amp; Reference Guides
        </h1>
        <p className="mt-2 text-sm text-neutral-300">
          {totalTools} free interactive tools for developers and writers, plus{" "}
          {referenceGuides.length} reference guides. No signup is required.
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

        <section className="mt-10" aria-labelledby="reference-guides-heading">
          <h2 id="reference-guides-heading" className="text-lg sm:text-xl font-semibold">
            Reference guides
          </h2>
          <p className="mt-1 text-sm text-neutral-300">
            Three reviewed explainers support the interactive developer tools.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {referenceGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${guide.slug}`}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4 transition-colors hover:bg-white/5"
              >
                <span className="text-sm font-semibold text-white">{guide.name}</span>
                <p className="mt-1.5 text-xs text-neutral-400">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
