import type { MetadataRoute } from "next";
import { SITE_URL, tools } from "@/lib/config";

/**
 * Auto-generated sitemap.
 * Includes: all tools, blog index, static pages.
 * Blog posts will be added here once we move to markdown-based blog.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = tools
    .filter((t) => t.live)
    .map((tool) => ({
      url: tool.slug === "" ? SITE_URL : `${SITE_URL}/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: tool.slug === "" ? 1.0 : 0.9,
    }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    "blog",
    "learn",
    "about",
    "contact",
    "privacy",
    "terms",
  ].map((page) => ({
    url: `${SITE_URL}/${page}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page === "blog" ? 0.8 : 0.3,
  }));

  // TODO: Add blog post URLs dynamically once markdown blog is live
  // const blogPosts = getAllPosts().map(post => ({
  //   url: `${SITE_URL}/blog/${post.slug}`,
  //   lastModified: new Date(post.date),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.7,
  // }));

  return [...toolPages, ...staticPages];
}
