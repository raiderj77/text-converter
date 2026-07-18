import type { MetadataRoute } from "next";
import { SITE_URL, tools } from "@/lib/config";

const reviewed = new Date("2026-07-12");

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
      lastModified: reviewed,
      changeFrequency: "monthly" as const,
      priority: tool.slug === "" ? 1 : 0.8,
    }));

  const contentPages = [...contentSlugSet].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: reviewed,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const trustPages = [
    "tools",
    "about",
    "contact",
    "privacy",
    "terms",
    "cookies",
    "accessibility",
  ].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: reviewed,
    changeFrequency: "monthly" as const,
    priority: slug === "tools" ? 0.9 : 0.4,
  }));

  return [...toolPages, ...contentPages, ...trustPages];
}
