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
    title: "Free Text Case Converter — UPPERCASE, lowercase, Title Case, camelCase, snake_case & More Online",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and URL slugs instantly. Free, no signup, runs in your browser.",
    emoji: "🔄",
    live: true,
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortName: "Words",
    title: "Free Word Counter — Count Words, Characters, Sentences & Reading Time Online",
    description:
      "Count words, characters, sentences, paragraphs, and reading time instantly. Keyword density analysis and social media character limits. Free online word counter, no signup.",
    emoji: "📊",
    live: true,
  },
  {
    slug: "text-cleaner",
    name: "Text Cleaner",
    shortName: "Clean",
    title: "Free Text Cleaner — Remove Extra Spaces, Line Breaks, Tabs & Hidden Characters Online",
    description:
      "Clean messy text from PDFs, emails, and websites. Remove extra spaces, line breaks, tabs, smart quotes, non-breaking spaces, and zero-width characters. Free, no signup.",
    emoji: "🧹",
    live: true,
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum",
    shortName: "Lorem",
    title: "Free Lorem Ipsum Generator — Placeholder Text by Paragraphs, Sentences, or Words Online",
    description:
      "Generate customizable Lorem Ipsum placeholder text by paragraphs, sentences, or words. Perfect for web design, mockups, and templates. Free, no signup.",
    emoji: "📝",
    live: true,
  },
  {
    slug: "duplicate-line-remover",
    name: "Duplicate Remover",
    shortName: "Dedup",
    title: "Free Duplicate Line Remover — Remove Duplicate Lines, Deduplicate Lists Online",
    description:
      "Remove duplicate lines from any list instantly. Deduplicate email lists, keywords, URLs, and data. Case-insensitive matching, sorting, and stats. Free, no signup.",
    emoji: "🗑️",
    live: true,
  },
  {
    slug: "string-encoder",
    name: "String Encoder",
    shortName: "Encode",
    title: "Free String Encoder & Decoder — Base64, URL Encode, HTML Entities, Hex, Binary Online",
    description:
      "Encode and decode strings instantly. Base64, URL encoding, HTML entities, Unicode escape, hexadecimal, and binary. Free, no signup, runs in your browser.",
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
    title: "Free Text Diff Tool — Compare Two Texts Side by Side, Find Differences Online",
    description:
      "Compare two blocks of text and see additions, deletions, and changes highlighted side by side. Line-by-line and word-level diff. Free, no signup.",
    emoji: "🔍",
    live: true,
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortName: "Password",
    title: "Free Password Generator — Strong, Random, Secure Passwords Online",
    description:
      "Generate strong random passwords with customizable length, uppercase, lowercase, numbers, symbols, and exclusions. Strength meter included. Free, no signup.",
    emoji: "🔑",
    live: true,
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    shortName: "Regex",
    title: "Free Regex Tester — Test Regular Expressions Online, Match & Replace with Highlighting",
    description:
      "Test regular expressions with real-time match highlighting, capture groups, replace mode, and flag toggles. Supports JavaScript regex. Free, no signup, runs in your browser.",
    emoji: "⚙️",
    live: true,
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    shortName: "Hash",
    title: "Free Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online Checksum Calculator",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or files instantly. Compare hashes, HMAC mode, bulk hashing. Free, no signup, runs in your browser.",
    emoji: "#️⃣",
    live: true,
  },
  {
    slug: "toggle-case-converter",
    name: "Toggle Case",
    shortName: "Toggle",
    title: "Free Toggle Case Converter — sPoNgEbOb Text, Alternating Caps, Mocking SpongeBob Meme Generator Online",
    description:
      "Convert text to toggle case (alternating caps) instantly. Create sPoNgEbOb text, mocking SpongeBob meme text, and alternating uppercase/lowercase letters. Free, no signup, runs in your browser.",
    emoji: "🔄",
    live: true,
  },
  {
    slug: "snake-kebab-converter",
    name: "Snake vs Kebab",
    shortName: "Snake/Kebab",
    title: "Free Snake_case vs Kebab-case Converter — Compare, Convert & Choose Between Underscores & Hyphens Online",
    description:
      "Convert text between snake_case and kebab-case instantly. Compare both formats side by side, see examples, and choose the right naming convention for your code. Free, no signup, runs in your browser.",
    emoji: "🐍",
    live: true,
  },
  {
    slug: "underscore-conventions",
    name: "Underscore Guide",
    shortName: "Underscore",
    title: "Why Programmers Use Underscores in Variable Names — Complete Guide to _private, __dunder & snake_case",
    description:
      "Learn why programmers use underscores in variable names. Complete guide to _private, __dunder, snake_case, and trailing underscores. Examples for Python, JavaScript, and other languages. Free online guide.",
    emoji: "📘",
    live: true,
  },
  {
    slug: "all-caps-guide",
    name: "All Caps Guide",
    shortName: "All Caps",
    title: "All Caps in Writing: When It's Rude vs Necessary — Complete Guide to UPPERCASE Usage",
    description:
      "Learn when ALL CAPS is rude vs necessary in writing. Complete guide to uppercase usage in emails, social media, coding, and professional communication. Free online guide with examples.",
    emoji: "🔠",
    live: true,
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    shortName: "Sort",
    title: "Free Text Sorter — Sort Lines Alphabetically, Numerically, or Randomly Online",
    description:
      "Sort text lines alphabetically (A-Z or Z-A), numerically (ascending or descending), or shuffle randomly. Remove duplicates, reverse order, and customize sorting options. Free, no signup.",
    emoji: "📊",
    live: true,
  },
  {
    slug: "text-reverser",
    name: "Text Reverser",
    shortName: "Reverse",
    title: "Free Text Reverser — Reverse Characters, Words, or Lines Online",
    description:
      "Reverse text in multiple ways: reverse characters (backwards text), reverse word order, reverse lines, or mirror text. Perfect for coding, puzzles, and creative writing. Free, no signup.",
    emoji: "↔️",
    live: true,
  },
  {
    slug: "spongebob-case-converter",
    name: "SpongeBob Case",
    shortName: "SpongeBob",
    title: "Free SpongeBob Case Converter — sPoNgEbOb CaSe Text Online",
    description:
      "Convert text to SpongeBob case (random-looking alternating uppercase/lowercase). Create meme text, ironic posts, and attention-grabbing content. Free, no signup.",
    emoji: "🧽",
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
