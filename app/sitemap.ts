import type { MetadataRoute } from "next";
import { SITE_URL, tools } from "@/lib/config";
import { getAllMarkdownPosts } from "@/lib/blog-markdown";

/**
 * Auto-generated sitemap.
 * Includes: all live tools, all blog posts, static pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Content slugs handled separately with different priority
  const contentSlugSet = new Set([
    "learn",
    "all-caps-guide",
    "underscore-conventions",
    "camelcase-vs-snake-case",
    "text-tools-for-developers",
    "json-vs-yaml-vs-xml",
  ]);

  // Tool pages (exclude content pages handled below)
  const toolPages: MetadataRoute.Sitemap = tools
    .filter((t) => t.live && !contentSlugSet.has(t.slug))
    .map((tool) => ({
      url: tool.slug === "" ? SITE_URL : `${SITE_URL}/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: tool.slug === "" ? 1.0 : 0.9,
    }));

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = getAllMarkdownPosts().map((post) => ({
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

  // Content pages (educational/comparison — explicit priority)
  const contentSlugs = [
    "learn",
    "all-caps-guide",
    "underscore-conventions",
    "camelcase-vs-snake-case",
    "text-tools-for-developers",
    "json-vs-yaml-vs-xml",
  ];
  const contentPages: MetadataRoute.Sitemap = contentSlugs.map((page) => ({
    url: `${SITE_URL}/${page}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Tools listing page
  const toolsIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Legal/info pages
  const legalPages: MetadataRoute.Sitemap = [
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

  return [...toolPages, ...toolsIndex, ...blogIndex, ...blogPosts, ...contentPages, ...legalPages];
}
