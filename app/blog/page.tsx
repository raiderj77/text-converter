import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Short guides on text formatting, case styles, and writing and developer workflows.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1>Blog</h1>
      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Guides and examples for text case formats and clean writing workflows.
      </p>

      <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
        {posts.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            style={{
              display: "block",
              padding: 16,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(10,10,10,0.6)",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>{p.title}</div>
            <div style={{ opacity: 0.8, marginTop: 6 }}>{p.description}</div>
            <div style={{ opacity: 0.6, marginTop: 10, fontSize: 12 }}>{p.date}</div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <a href="/">Back to converter</a>
      </div>
    </main>
  );
}
