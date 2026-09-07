import type { MetadataRoute } from "next";
import { SITE_URL, tools } from "@/lib/config";
import { getPublishedArticles } from "@/lib/articles";

const reviewed = new Date("2026-08-02");
const updatedToday = new Date("2026-08-03");
const publishingRelease = new Date("2026-09-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const contentSlugSet = new Set([
    "learn",
    "all-caps-guide",
    "underscore-conventions",
    "camelcase-vs-snake-case",
    "text-tools-for-developers",
    "json-vs-yaml-vs-xml",
  ]);

  const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.live && !contentSlugSet.has(tool.slug))
    .map((tool) => ({
      url: tool.slug === "" ? SITE_URL : `${SITE_URL}/${tool.slug}`,
      lastModified: ["", "snake-kebab-converter"].includes(tool.slug) ? publishingRelease : reviewed,
      changeFrequency: "monthly" as const,
      priority: tool.slug === "" ? 1 : 0.8,
    }));

  const contentPages = [...contentSlugSet].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: slug === "learn" ? publishingRelease : reviewed,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const trustPagesUpdatedToday = new Set([
    "tools",
    "about",
    "privacy",
    "privacy-and-testing",
    "terms",
  ]);

  const trustPages = [
    "tools",
    "about",
    "contact",
    "privacy",
    "privacy-and-testing",
    "terms",
    "cookies",
    "accessibility",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: trustPagesUpdatedToday.has(slug) ? updatedToday : reviewed,
    changeFrequency: "monthly" as const,
    priority: slug === "tools" ? 0.9 : 0.4,
  }));

  const articles = getPublishedArticles().map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.reviewedAt),
  }));
  const articleIndexModified = new Date(Math.max(publishingRelease.getTime(), ...articles.map((article) => article.lastModified.getTime())));
  return [...toolPages, ...contentPages, ...trustPages,
    { url: `${SITE_URL}/articles`, lastModified: articleIndexModified },
    { url: `${SITE_URL}/editorial-policy`, lastModified: publishingRelease },
    ...articles,
  ];
}
