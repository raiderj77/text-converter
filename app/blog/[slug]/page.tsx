import Link from "next/link";
import { getPostBySlug, posts } from "@/lib/blog";
import { SITE_URL, getLiveTools } from "@/lib/config";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ui/ad-slot";

type ParamsPromise = Promise<{ slug: string }>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: ParamsPromise }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
    },
  };
}

function buildFaqSchema(faq: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function buildArticleSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: url,
    publisher: {
      "@type": "Organization",
      name: "FlipMyCase",
      url: SITE_URL,
    },
  };
}

export default async function BlogPostPage(props: { params: ParamsPromise }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const faqSchema = buildFaqSchema(post.faq);
  const articleSchema = buildArticleSchema(post.title, post.description, url);
  const tools = getLiveTools();

  const related =
    post.related && post.related.length
      ? post.related
          .map((s) => posts.find((p) => p.slug === s))
          .filter(Boolean)
      : posts.filter((p) => p.slug !== post.slug).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-neutral-400">
          <Link href="/" className="hover:text-neutral-200">Home</Link>
          <span className="mx-2 text-neutral-600">/</span>
          <Link href="/blog" className="hover:text-neutral-200">Blog</Link>
          <span className="mx-2 text-neutral-600">/</span>
          <span className="text-neutral-300">{post.title}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main content */}
          <div>
            <article className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
              <div className="text-xs uppercase tracking-wide text-neutral-400">
                Guide
              </div>

              <div className="mt-3 space-y-4">
                <div
                  className={cx(
                    "text-neutral-100",
                    "[&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:font-bold [&>h1]:tracking-tight",
                    "[&>h2]:mt-7 [&>h2]:text-lg [&>h2]:font-semibold",
                    "[&>h3]:mt-5 [&>h3]:text-base [&>h3]:font-semibold",
                    "[&>p]:text-sm [&>p]:text-neutral-200 [&>p]:leading-7",
                    "[&>ul]:pl-5 [&>ul]:text-sm [&>ul]:text-neutral-200 [&>ul]:space-y-2 [&>ul]:list-disc",
                    "[&>ol]:pl-5 [&>ol]:text-sm [&>ol]:text-neutral-200 [&>ol]:space-y-2 [&>ol]:list-decimal",
                    "[&>a]:underline"
                  )}
                >
                  {post.content}
                </div>
              </div>
            </article>

            {/* CTA to tool */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <div className="text-sm font-semibold">Use the converter</div>
              <p className="mt-1 text-sm text-neutral-400">
                Paste your text once. Copy the format you need.
              </p>
              <div className="mt-3">
                <Link
                  href="/"
                  className="inline-block rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                >
                  Open the tool
                </Link>
              </div>
            </div>

            <AdSlot slot="after-tool" page={`blog-${slug}`} />

            {/* FAQ */}
            <section className="mt-4 rounded-2xl border border-white/10 bg-neutral-900 p-5">
              <h2 className="text-lg font-semibold">FAQ</h2>
              <div className="mt-4 space-y-3">
                {post.faq.map((f) => (
                  <div key={f.question} className="rounded-xl border border-white/10 bg-neutral-950 p-4">
                    <h3 className="text-sm font-semibold">{f.question}</h3>
                    <p className="mt-2 text-sm text-neutral-400 leading-7">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <AdSlot slot="mid-content" page={`blog-${slug}`} />

            {/* Tools cross-links */}
            <section className="mt-4">
              <div className="text-xs uppercase tracking-wide text-neutral-400 mb-2">
                Free Text Tools
              </div>
              <div className="flex flex-wrap gap-2">
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

            <AdSlot slot="before-footer" page={`blog-${slug}`} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
              <div className="text-sm font-semibold">More guides</div>
              <div className="mt-4 space-y-2">
                {(related as any[]).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block rounded-xl border border-white/10 bg-neutral-950 p-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="mt-1 text-xs text-neutral-400">
                      {p.description}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/blog" className="text-sm text-neutral-400 hover:text-neutral-200">
                  ← All guides
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
