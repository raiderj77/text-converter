import type { MetadataRoute } from "next";
import { SITE_URL, tools } from "@/lib/config";
import { getAllPosts } from "@/lib/blog-md";

/**
 * Auto-generated sitemap.
 * Includes: all live tools, all blog posts, static pages.
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

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog index
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    "learn",
    "about",
    "contact",
    "privacy",
    "terms",
    "cookies",
    "accessibility",
  ].map((page) => ({
    url: `${SITE_URL}/${page}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  return [...toolPages, ...blogIndex, ...blogPosts, ...staticPages];
}
