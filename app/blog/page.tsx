import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Text Case Converter",
  description:
    "Short, practical guides for uppercase, lowercase, Title Case, sentence case, camelCase, snake_case, kebab-case, and URL slugs.",
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function BlogIndex() {
  const items = posts.slice().sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Text Case Guides
            </h1>
            <p className="mt-2 text-sm text-neutral-300">
              Fast answers, examples, and naming rules. Built to help you pick the right case style
              in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-xl px-3 py-2 text-sm border border-white/10 hover:bg-white/10"
            >
              Open tool
            </Link>
            <Link
              href="/learn"
              className="rounded-xl px-3 py-2 text-sm border border-white/10 hover:bg-white/10"
            >
              Learn
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900 p-4">
          <div className="text-xs uppercase tracking-wide text-neutral-400">
            Start here
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {items.slice(0, 6).map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-2xl border border-white/10 bg-neutral-950 p-4 hover:bg-white/5"
              >
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-neutral-300">{p.description}</div>
                <div className="mt-3 text-xs text-neutral-400">Read guide</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="text-xs uppercase tracking-wide text-neutral-400">
            All guides
          </div>

          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className={cx(
                  "rounded-2xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5"
                )}
              >
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-neutral-300">{p.description}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Read</span>
                  <span className="text-xs text-neutral-400">/blog/{p.slug}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900 p-5">
          <div className="text-sm font-semibold">Keep reading</div>
          <p className="mt-2 text-sm text-neutral-300">
            Open a guide, then use the tool. Each guide links to related pages so people move
            through the site.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10"
            >
              Use the converter
            </Link>
            <Link
              href="/learn"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10"
            >
              Learn the formats
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

