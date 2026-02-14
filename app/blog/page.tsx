import { posts } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Practical guides for text case conversion and naming conventions.",
};

export default function BlogIndex() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, lineHeight: 1.7 }}>
      <h1>Text Case Guides</h1>
      <p>
        Guides and examples for uppercase, lowercase, Title Case, sentence case, camelCase,
        snake_case, kebab-case, and URL slugs.
      </p>

      <ul style={{ paddingLeft: 18, marginTop: 16 }}>
        {posts.map((post) => (
          <li key={post.slug} style={{ marginBottom: 14 }}>
            <a href={`/blog/${post.slug}`} style={{ fontWeight: 700 }}>
              {post.title}
            </a>
            <div style={{ opacity: 0.8, marginTop: 4 }}>{post.description}</div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 24 }}>
        <a href="/" style={{ textDecoration: "underline" }}>
          Back to the converter
        </a>
      </div>
    </main>
  );
}
