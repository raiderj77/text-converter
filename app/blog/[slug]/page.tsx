import Link from "next/link";
import { getAllMarkdownPosts, getMarkdownPost } from "@/lib/blog-markdown";
import { SITE_URL, getLiveTools } from "@/lib/config";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ui/ad-slot";

type ParamsPromise = Promise<{ slug: string }>;

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export async function generateStaticParams() {
  return getAllMarkdownPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: ParamsPromise }) {
  const { slug } = await props.params;
  const post = await getMarkdownPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description || undefined,
    keywords: post.keywords.length ? post.keywords : undefined,
    robots: { index: true, follow: true, googleBot: { "max-snippet": -1 } },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || undefined,
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

export default async function BlogPostPage(props: { params: ParamsPromise }) {
  const { slug } = await props.params;
  const post = await getMarkdownPost(slug);

  if (!post) return notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const tools = getLiveTools();
  const allPosts = getAllMarkdownPosts();

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || undefined,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: "FlipMyCase",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "FlipMyCase",
      url: SITE_URL,
    },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  const faqSchema = post.faq.length ? buildFaqSchema(post.faq) : null;

  // Related posts: use explicit list, or fall back to latest posts
  const related = post.related.length
    ? post.related
        .map((s) => allPosts.find((p) => p.slug === s))
        .filter(Boolean)
    : allPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  // Find the linked tool for CTA
  const linkedTool = post.toolSlug
    ? tools.find((t) => t.slug === post.toolSlug)
    : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-300">
          <Link href="/" className="hover:text-neutral-200">
            Home
          </Link>
          <span className="mx-2 text-neutral-600">/</span>
          <Link href="/blog" className="hover:text-neutral-200">
            Guides
          </Link>
          <span className="mx-2 text-neutral-600">/</span>
          <span className="text-neutral-300">{post.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main content */}
          <div>
            <article className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 mb-3">
                <span className="uppercase tracking-wide">Guide</span>
                {post.date && (
                  <>
                    <span className="text-neutral-600">·</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </>
                )}
                <span className="text-neutral-600">·</span>
                <span>Built by an experienced web developer</span>
              </div>

              <div
                className={cx(
                  "mt-3 text-neutral-100 prose-blog",
                  "prose prose-invert prose-sm max-w-none",
                  "[&>h1]:text-2xl [&>h1]:sm:text-3xl [&>h1]:font-bold [&>h1]:tracking-tight",
                  "[&>h2]:mt-7 [&>h2]:text-lg [&>h2]:font-semibold",
                  "[&>h3]:mt-5 [&>h3]:text-base [&>h3]:font-semibold",
                  "[&>p]:text-sm [&>p]:text-neutral-200 [&>p]:leading-7",
                  "[&>ul]:pl-5 [&>ul]:text-sm [&>ul]:text-neutral-200 [&>ul]:space-y-2 [&>ul]:list-disc",
                  "[&>ol]:pl-5 [&>ol]:text-sm [&>ol]:text-neutral-200 [&>ol]:space-y-2 [&>ol]:list-decimal",
                  "[&>table]:text-sm [&>table]:w-full [&>table]:border-collapse",
                  "[&_th]:text-left [&_th]:text-neutral-300 [&_th]:border-b [&_th]:border-white/10 [&_th]:py-2 [&_th]:px-3",
                  "[&_td]:text-neutral-300 [&_td]:border-b [&_td]:border-white/5 [&_td]:py-2 [&_td]:px-3",
                  "[&>pre]:bg-neutral-950 [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:text-sm [&>pre]:overflow-x-auto",
                  "[&_code]:text-emerald-400 [&_code]:text-xs",
                  "[&>blockquote]:border-l-2 [&>blockquote]:border-emerald-500 [&>blockquote]:pl-4 [&>blockquote]:text-neutral-300",
                  "[&_a]:text-emerald-400 [&_a]:underline"
                )}
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />
            </article>

            {/* CTA to tool */}
            {linkedTool && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-900 p-4">
                <div className="text-sm font-semibold">
                  {linkedTool.emoji} Try {linkedTool.name}
                </div>
                <p className="mt-1 text-sm text-neutral-300">
                  Free, no signup, runs in your browser. Try it now.
                </p>
                <div className="mt-3">
                  <Link
                    href={linkedTool.slug === "" ? "/" : `/${linkedTool.slug}`}
                    className="inline-block rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                  >
                    Open {linkedTool.name} →
                  </Link>
                </div>
              </div>
            )}

            <AdSlot slot="after-tool" page={`blog-${slug}`} />

            {/* FAQ */}
            {post.faq.length > 0 && (
              <section className="mt-4 rounded-2xl border border-white/10 bg-neutral-900 p-5">
                <h2 className="text-lg font-semibold">
                  Frequently Asked Questions
                </h2>
                <div className="mt-4 space-y-3">
                  {post.faq.map((f) => (
                    <div
                      key={f.question}
                      className="rounded-xl border border-white/10 bg-neutral-950 p-4"
                    >
                      <h3 className="text-sm font-semibold">{f.question}</h3>
                      <p className="mt-2 text-sm text-neutral-300 leading-7">
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

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
                {(related as NonNullable<typeof related[number]>[]).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="block rounded-xl border border-white/10 bg-neutral-950 p-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="mt-1 text-xs text-neutral-400 line-clamp-2">
                      {p.excerpt}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/blog"
                  className="text-sm text-neutral-300 hover:text-neutral-200"
                >
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
