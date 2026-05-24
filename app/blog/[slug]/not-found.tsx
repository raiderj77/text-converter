import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm uppercase tracking-wide text-neutral-400">Article removed</p>
      <h1 className="mt-4 text-2xl font-bold">This article is no longer available</h1>
      <p className="mt-3 text-sm text-neutral-400">
        It may have been merged into a tool page or taken down for quality reasons.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/blog"
          className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
        >
          ← All guides
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
        >
          Text tools →
        </Link>
      </div>
    </div>
  );
}
