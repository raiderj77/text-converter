import { SITE_URL, getPostBySlug, posts } from "@/lib/blog";
import { notFound } from "next/navigation";

type ParamsPromise = Promise<{ slug: string }>;

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
  };
}

export default async function BlogPostPage(props: { params: ParamsPromise }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const faqSchema = buildFaqSchema(post.faq);
  const articleSchema = buildArticleSchema(post.title, post.description, url);

  const moreGuides = posts.filter((p) => p.slug !== post.slug);

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.7 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article>{post.content}</article>

      <div style={{ margin: "36px 0" }}>
        <div
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 16,
            padding: 16,
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          Ad slot
        </div>
      </div>

      <h2>More guides</h2>
      <ul style={{ paddingLeft: 18 }}>
        {moreGuides.map((p) => (
          <li key={p.slug} style={{ marginBottom: 10 }}>
            <a href={`/blog/${p.slug}`} style={{ fontWeight: 700 }}>
              {p.title}
            </a>
            <div style={{ opacity: 0.8, marginTop: 4 }}>{p.description}</div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 24 }}>
        <a href="/blog" style={{ textDecoration: "underline", marginRight: 12 }}>
          Back to Blog
        </a>
        <a href="/" style={{ textDecoration: "underline" }}>
          Use the converter
        </a>
      </div>
    </main>
  );
}
