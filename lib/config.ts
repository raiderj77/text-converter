/**
 * Site-wide configuration.
 * Every URL, title, and metadata default references this file.
 * When you switch from the Vercel subdomain to flipmycase.com,
 * change SITE_URL here and everything updates.
 */

export const SITE_URL = "https://flipmycase.com";

export const SITE_NAME = "FlipMyCase";

export const SITE_DESCRIPTION =
  "Free online text tools. Convert case, count words, clean text, and more. No signup. Works in your browser.";

export const SITE_TWITTER = "@flipmycase"; // Update when you create the account

export const GA_ID = "G-JQHRPJ9YLF";

/**
 * Tool registry. Every tool in the suite is defined here.
 * Nav, sitemap, internal linking, and schema all read from this.
 */
export type Tool = {
  slug: string;       // URL path segment (e.g. "" for homepage, "word-counter" for /word-counter)
  name: string;       // Display name in nav
  shortName: string;  // Compact name for mobile nav
  title: string;      // SEO <title> tag
  description: string; // SEO meta description
  emoji: string;      // Visual identifier in nav
  live: boolean;      // Only show in nav when true
};

export const tools: Tool[] = [
  {
    slug: "",
    name: "Case Converter",
    shortName: "Case",
    title: "Free Text Case Converter — Uppercase, Title Case, camelCase, snake_case Online",
    description:
      "Convert text to uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and more. Free, instant, no signup. Paste once, copy any format.",
    emoji: "🔄",
    live: true,
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortName: "Words",
    title: "Free Word Counter — Count Words, Characters & Sentences Online",
    description:
      "Count words, characters, sentences, and paragraphs instantly. Reading time, speaking time, and keyword density. Free, no signup.",
    emoji: "📊",
    live: true,
  },
  {
    slug: "text-cleaner",
    name: "Text Cleaner",
    shortName: "Clean",
    title: "Free Text Cleaner — Remove Extra Spaces, Line Breaks & Tabs Online",
    description:
      "Clean up messy text instantly. Remove extra spaces, line breaks, tabs, and trailing whitespace. Free, no signup.",
    emoji: "🧹",
    live: true,
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum",
    shortName: "Lorem",
    title: "Free Lorem Ipsum Generator — Placeholder Text for Designers",
    description:
      "Generate customizable Lorem Ipsum placeholder text by paragraphs, sentences, or words. Free, no signup.",
    emoji: "📝",
    live: true,
  },
  {
    slug: "duplicate-line-remover",
    name: "Duplicate Remover",
    shortName: "Dedup",
    title: "Free Duplicate Line Remover — Remove Duplicate Lines Online",
    description:
      "Remove duplicate lines from text instantly. Paste a list, get unique lines. Free, no signup.",
    emoji: "🗑️",
    live: true,
  },
  {
    slug: "string-encoder",
    name: "String Encoder",
    shortName: "Encode",
    title: "Free String Encoder/Decoder — Base64, URL, HTML Entities Online",
    description:
      "Encode and decode strings: Base64, URL encoding, HTML entities. Free, instant, no signup.",
    emoji: "🔐",
    live: true,
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortName: "JSON",
    title: "Free JSON Formatter, Validator & Beautifier — Pretty Print, Minify, Fix JSON Online",
    description:
      "Format, validate, beautify, and minify JSON online. Tree view, error line numbers, fix broken JSON, export to CSV. Free JSON lint with no signup.",
    emoji: "{ }",
    live: true,
  },
  {
    slug: "text-diff",
    name: "Text Diff",
    shortName: "Diff",
    title: "Free Text Diff Tool — Compare Two Texts Online",
    description:
      "Compare two blocks of text and see differences highlighted. Free, instant, no signup.",
    emoji: "🔍",
    live: false,
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortName: "Password",
    title: "Free Password Generator — Strong Random Passwords Online",
    description:
      "Generate strong, random passwords with customizable length and character sets. Free, no signup.",
    emoji: "🔑",
    live: false,
  },
];

/** Get only tools that are live (shown in nav) */
export function getLiveTools() {
  return tools.filter((t) => t.live);
}

/** Get a tool by its slug */
export function getToolBySlug(slug: string) {
  return tools.find((t) => t.slug === slug) || null;
}

/** Build full URL from a path */
export function buildUrl(path: string = "") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}
