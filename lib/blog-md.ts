import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  toolSlug: string; // links back to the tool page
  faq: { question: string; answer: string }[];
  related: string[];
  contentHtml: string;
};

export type BlogPostMeta = Omit<BlogPost, "contentHtml">;

/**
 * Get all post slugs (for generateStaticParams)
 */
export function getAllSlugs(): string[] {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Get metadata for all posts (sorted by date, newest first)
 */
export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllSlugs();
  return slugs
    .map((slug) => {
      const { data } = matter(
        fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf-8")
      );
      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        keywords: data.keywords ?? [],
        toolSlug: data.toolSlug ?? "",
        faq: data.faq ?? [],
        related: data.related ?? [],
        contentHtml: "", // not needed for listing
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a single post with rendered HTML content
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    keywords: data.keywords ?? [],
    toolSlug: data.toolSlug ?? "",
    faq: data.faq ?? [],
    related: data.related ?? [],
    contentHtml: processed.toString(),
  };
}
