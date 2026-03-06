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
    title: "Free Text Case Converter — Uppercase, Lowercase & More",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case & more instantly. Free online tool — no signup required.",
    emoji: "🔄",
    live: true,
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortName: "Words",
    title: "Free Word Counter — Characters, Sentences & More",
    description:
      "Count words, characters, sentences, paragraphs & reading time. Keyword density included. Free online word counter — no signup.",
    emoji: "📊",
    live: true,
  },
  {
    slug: "text-cleaner",
    name: "Text Cleaner",
    shortName: "Clean",
    title: "Free Text Cleaner — Remove Spaces & Line Breaks",
    description:
      "Remove extra spaces, line breaks, tabs & hidden characters from messy text. Free online cleaner — no signup required.",
    emoji: "🧹",
    live: true,
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum",
    shortName: "Lorem",
    title: "Free Lorem Ipsum Generator — Placeholder Text Online",
    description:
      "Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words. Great for mockups & templates. Free — no signup required.",
    emoji: "📝",
    live: true,
  },
  {
    slug: "duplicate-line-remover",
    name: "Duplicate Remover",
    shortName: "Dedup",
    title: "Free Duplicate Line Remover — Deduplicate Lists",
    description:
      "Remove duplicate lines from any list instantly. Case-insensitive matching, sorting & stats included. Free online tool — no signup.",
    emoji: "🗑️",
    live: true,
  },
  {
    slug: "string-encoder",
    name: "String Encoder",
    shortName: "Encode",
    title: "Free String Encoder & Decoder — Base64, URL & More",
    description:
      "Encode & decode Base64, URL, HTML entities, hex & binary strings instantly. Free online tool — no signup required.",
    emoji: "🔐",
    live: true,
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortName: "JSON",
    title: "Free JSON Formatter & Validator — Beautify Online",
    description:
      "Format, validate, beautify & minify JSON online. Tree view, error detection & CSV export. Free tool — no signup required.",
    emoji: "{ }",
    live: true,
  },
  {
    slug: "text-diff",
    name: "Text Diff",
    shortName: "Diff",
    title: "Free Text Diff — Compare Two Texts Side by Side",
    description:
      "Compare two texts side by side with additions, deletions & changes highlighted. Free online diff tool — no signup required.",
    emoji: "🔍",
    live: true,
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortName: "Password",
    title: "Free Password Generator — Strong & Secure Online",
    description:
      "Generate strong random passwords with custom length, symbols & exclusions. Strength meter included. Free — no signup required.",
    emoji: "🔑",
    live: true,
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    shortName: "Regex",
    title: "Free Regex Tester — Test Regular Expressions Online",
    description:
      "Test regular expressions with real-time highlighting, capture groups & replace mode. Free online regex tool — no signup.",
    emoji: "⚙️",
    live: true,
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    shortName: "Hash",
    title: "Free Hash Generator — MD5, SHA-256, SHA-512 Online",
    description:
      "Generate MD5, SHA-1, SHA-256 & SHA-512 hashes from text or files instantly. Free online tool — no signup required.",
    emoji: "#️⃣",
    live: true,
  },
  {
    slug: "toggle-case-converter",
    name: "Toggle Case",
    shortName: "Toggle",
    title: "Free Toggle Case Converter — Alternating Caps Online",
    description:
      "Convert text to alternating caps (tOgGlE cAsE) for mocking memes & SpongeBob text. Free online tool — no signup required.",
    emoji: "🔄",
    live: true,
  },
  {
    slug: "snake-kebab-converter",
    name: "Snake vs Kebab",
    shortName: "Snake/Kebab",
    title: "Free Snake_case to Kebab-case Converter Online",
    description:
      "Convert between snake_case and kebab-case instantly. Compare naming conventions side by side. Free online tool — no signup required.",
    emoji: "🐍",
    live: true,
  },
  {
    slug: "underscore-conventions",
    name: "Underscore Guide",
    shortName: "Underscore",
    title: "Free Underscore Guide — _private, __dunder & snake_case",
    description:
      "Why do programmers use underscores? Guide to _private, __dunder, snake_case & more with Python & JavaScript examples. Free — no signup.",
    emoji: "📘",
    live: true,
  },
  {
    slug: "all-caps-guide",
    name: "All Caps Guide",
    shortName: "All Caps",
    title: "Free All Caps Guide — When UPPERCASE Is Rude vs OK",
    description:
      "When is ALL CAPS rude vs necessary? Guide to uppercase in emails, social media & code. Free instantly — no signup required.",
    emoji: "🔠",
    live: true,
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    shortName: "Sort",
    title: "Free Text Sorter — Sort Lines Alphabetically Online",
    description:
      "Sort text lines alphabetically, numerically, or randomly. Remove duplicates & reverse order. Free online tool — no signup required.",
    emoji: "📊",
    live: true,
  },
  {
    slug: "text-reverser",
    name: "Text Reverser",
    shortName: "Reverse",
    title: "Free Text Reverser — Reverse Text Online Instantly",
    description:
      "Reverse characters, words, or lines of text instantly. Create backwards & mirror text. Free online tool — no signup required.",
    emoji: "↔️",
    live: true,
  },
  {
    slug: "spongebob-case-converter",
    name: "SpongeBob Case",
    shortName: "SpongeBob",
    title: "Free SpongeBob Case Converter — sPoNgEbOb Text",
    description:
      "Convert text to sPoNgEbOb mocking case for memes & social media. Create viral sarcastic text instantly. Free — no signup required.",
    emoji: "🧽",
    live: true,
  },
  {
    slug: "slug-generator",
    name: "Slug Generator",
    shortName: "Slug",
    title: "Free URL Slug Generator — SEO-Friendly Slugs Online",
    description:
      "Convert any title into a clean, SEO-friendly URL slug instantly. Multiple formats supported. Free online tool — no signup required.",
    emoji: "🔗",
    live: true,
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp",
    shortName: "Timestamp",
    title: "Free Unix Timestamp Converter — Epoch Time Online",
    description:
      "Convert Unix timestamps to human dates and dates to timestamps instantly. Live clock, seconds & milliseconds support. Free online tool — no signup required.",
    emoji: "🕐",
    live: true,
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    shortName: "UUID",
    title: "Free UUID Generator — Generate v4 GUIDs Online",
    description:
      "Generate random UUID v4 identifiers instantly. Bulk generate up to 100, uppercase or lowercase, with or without hyphens. Free online tool — no signup required.",
    emoji: "🆔",
    live: true,
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    shortName: "Base Conv",
    title: "Free Number Base Converter — Binary, Hex, Octal, Decimal",
    description:
      "Convert between binary, octal, decimal & hexadecimal instantly. ASCII text to binary/hex mode included. Free online tool — no signup required.",
    emoji: "🔢",
    live: true,
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
