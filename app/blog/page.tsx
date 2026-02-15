import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog-md";
import { getLiveTools, buildUrl } from "@/lib/config";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { AdSlot } from "@/components/ui/ad-slot";

const pageUrl = buildUrl("/blog");

export const metadata: Metadata = {
  title: "Free Text Tool Guides — Tutorials, Tips & How-Tos",
  description:
    "Practical guides for text conversion, word counting, JSON formatting, text diffing, password generation, and more. Learn how to use every FlipMyCase tool with examples.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Free Text Tool Guides — Tutorials, Tips & How-Tos | FlipMyCase",
    description:
      "Practical guides for every text tool. Learn when and how to use each with examples.",
    url: pageUrl,
    type: "website",
  },
};

export default function BlogIndex() {
  const allPosts = getAllPosts();
  const tools = getLiveTools();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/blog" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Guides & Tutorials
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Practical guides for every text tool. Learn when and how to use each
          with real-world examples, keyboard shortcuts, and best practices.
        </p>

        {/* Featured guides (latest 4) */}
        <div className="mt-6">
          <div className="text-xs uppercase tracking-wide text-neutral-400">
            Latest
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {allPosts.slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors"
              >
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-neutral-400">
                  {p.description}
                </div>
                <div className="mt-3 text-xs text-neutral-500">
                  Read guide →
                </div>
              </Link>
            ))}
          </div>
        </div>

        <AdSlot slot="after-tool" page="blog" />

        {/* All guides */}
        <div className="mt-6">
          <div className="text-xs uppercase tracking-wide text-neutral-400">
            All guides
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {allPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors"
              >
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-neutral-400">
                  {p.description}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <AdSlot slot="mid-content" page="blog" />

        {/* Tools cross-links */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Read the guides, then use the tools. All free, no signup, runs in
            your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={t.slug === "" ? "/" : `/${t.slug}`}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="blog" />
      </div>
    </>
  );
}
