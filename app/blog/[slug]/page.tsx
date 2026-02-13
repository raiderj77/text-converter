import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

function renderParagraphs(content: string) {
  const blocks = content.split("\n\n").map((b) => b.trim()).filter(Boolean);

  return blocks.map((b, i) => {
    const isList =
      b.includes("\n") &&
      b.split("\n").every((line) => {
        const t = line.trim();
        return t.length > 0 && !t.includes(".");
      });

    if (isList) {
      const items = b.split("\n").map((x) => x.trim()).filter(Boolean);
      return (
        <ul key={i} style={{ paddingLeft: 18, marginTop: 12 }}>
          {items.map((it, idx) => (
            <li key={idx} style={{ marginTop: 6, opacity: 0.9 }}>
              {it}
            </li>
          ))}
        </ul>
      );
    }

    const isHeading =
      b.length < 60 &&
      b === b.toUpperCase() === false &&
      !b.endsWith(".") &&
      !b.includes("?") &&
      !b.includes(",");

    if (isHeading) {
      return (
        <h2 key={i} style={{ marginTop: 18, fontSize: 18 }}>
          {b}
        </h2>
      );
    }

    return (
      <p key={i} style={{ marginTop: 12, opacity: 0.9, lineHeight: 1.7 }}>
        {b}
      </p>
    );
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
        <h1>Post not found</h1>
        <a href="/blog">Back to blog</a>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <a href="/blog">Back to blog</a>

      <h1 style={{ marginTop: 12 }}>{post.title}</h1>
      <p style={{ opacity: 0.75, marginTop: 8 }}>{post.description}</p>
      <div style={{ opacity: 0.6, marginTop: 10, fontSize: 12 }}>{post.date}</div>

      <div style={{ marginTop: 18 }}>{renderParagraphs(post.content)}</div>

      <div style={{ marginTop: 24 }}>
        <a href="/">Use the converter</a>
      </div>
    </main>
  );
}
