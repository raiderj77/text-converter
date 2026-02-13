export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: "text-case-converter-guide",
    title: "Text Case Converter Guide: Uppercase, Title Case, camelCase, snake_case, and Slugs",
    description:
      "A practical guide to text case formats, when to use each one, and how to convert them fast.",
    date: "2026-02-12",
    content: `
If you work with text every day, you keep hitting the same problem. Your text is in the wrong format. You need it fixed fast, and you do not want to fight with manual edits.

This guide explains the most common case formats. It also explains when to use each one, and the mistakes people make.

Common writing cases

UPPERCASE
Use uppercase for labels, short headers, and emphasis. Avoid full uppercase paragraphs. They are harder to read.

lowercase
Use lowercase when you need consistency. This is common in data cleanup, email normalization, and quick drafts.

Title Case
Use title case for headlines, page titles, and article headings. It is common in blogs and marketing pages.

Sentence case
Use sentence case for normal writing. It is best for paragraphs, documentation, and any long-form text.

Developer formats

camelCase
camelCase is common in JavaScript and many APIs. Variable names often use it. Example: userName, totalPrice, photoLocationMap.

PascalCase
PascalCase is common for component names and class names. Example: TextCaseConverter, UserProfileCard.

snake_case
snake_case is common in Python and databases. Example: user_name, total_price, created_at.

kebab-case
kebab-case is common in URLs and file names. Example: text-case-converter, photo-location-map.

Slug
A slug is a URL-friendly string. It usually removes punctuation and converts spaces to hyphens. It is used for blog URLs and product URLs.

When you should use a case converter

You are formatting blog titles fast.
You are converting variable names without mistakes.
You are generating URL slugs for SEO-friendly pages.
You are cleaning up messy text copied from PDFs or emails.

Quick tips

Keep one clear source text, then copy the format you need.
Use slugs for URLs. Do not use spaces in URLs.
Pick one case style per system. Stay consistent.

If you want the fastest workflow, paste once and copy the output you need. This is why simple tools win. They remove friction.
`.trim(),
  },
];

export function getAllPosts() {
  return posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}
