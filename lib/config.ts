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
    slug: "yaml-formatter",
    name: "YAML Formatter",
    shortName: "YAML",
    title: "Free YAML Formatter & Validator — YAML to JSON Online",
    description:
      "Format, validate & convert YAML online. YAML to JSON and JSON to YAML conversion included. Free online tool — no signup required.",
    emoji: "📝",
    live: true,
  },
  {
    slug: "xml-formatter",
    name: "XML Formatter",
    shortName: "XML",
    title: "Free XML Formatter & Validator — Beautify Online",
    description:
      "Format, beautify & minify XML online with error detection. Choose 2/4 spaces or tabs for indentation. Free online tool — no signup required.",
    emoji: "📄",
    live: true,
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    shortName: "CSV/JSON",
    title: "Free CSV to JSON Converter — Bidirectional Online",
    description:
      "Convert CSV to JSON and JSON to CSV instantly. Auto-detect delimiters, first row as headers, pretty print or minified. Free online tool — no signup required.",
    emoji: "📋",
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
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    shortName: "Markdown",
    title: "Markdown Preview — Live Editor Online Free",
    description:
      "Write Markdown and see a live rendered preview. Copy HTML or download as .html. Supports tables, code blocks, lists & more. Free — no signup required.",
    emoji: "📖",
    live: true,
  },
  {
    slug: "word-frequency-counter",
    name: "Word Frequency",
    shortName: "Frequency",
    title: "Word Frequency Counter — Analyze Text Online Free",
    description:
      "Count word frequency, analyze bigrams & trigrams, generate word clouds. Export as CSV. Free online word frequency counter — no signup required.",
    emoji: "📊",
    live: true,
  },
  {
    slug: "ai-writing-analyzer",
    name: "AI Writing Analyzer",
    shortName: "AI Analyzer",
    title: "AI Writing Pattern Analyzer — Free Online Tool",
    description:
      "Analyze statistical writing patterns in any text. Check sentence uniformity, vocabulary diversity & filler phrases. Free, private, browser-only.",
    emoji: "🤖",
    live: true,
  },
  {
    slug: "readability-analyzer",
    name: "Readability Analyzer",
    shortName: "Readability",
    title: "Readability Score Analyzer — Free Online Tool",
    description:
      "Check readability with Flesch-Kincaid, Gunning Fog, SMOG, Coleman-Liau, ARI & Dale-Chall. Instant grade level & sentence analysis. Free — no signup.",
    emoji: "📚",
    live: true,
  },
  {
    slug: "text-statistics",
    name: "Text Statistics",
    shortName: "Stats",
    title: "Text Statistics Dashboard — Free Online Tool",
    description:
      "Analyze text with word frequency, vocabulary richness, lexical density, sentence structure, bigrams, trigrams & more. Export reports. Free — no signup.",
    emoji: "📈",
    live: true,
  },
  {
    slug: "line-counter",
    name: "Line Counter",
    shortName: "Lines",
    title: "Line Counter — Count Lines of Text Online Free",
    description:
      "Count total lines, empty lines & non-empty lines. See line length stats and distribution. Free online line counter — no signup required.",
    emoji: "📏",
    live: true,
  },
  {
    slug: "text-repeater",
    name: "Text Repeater",
    shortName: "Repeat",
    title: "Text Repeater — Repeat Text Online Free",
    description:
      "Repeat any text up to 1000 times with custom separators. Number repetitions, preview output. Free online text repeater — no signup required.",
    emoji: "🔁",
    live: true,
  },
  {
    slug: "plain-text-converter",
    name: "Plain Text",
    shortName: "Plain",
    title: "Plain Text Converter — Strip Formatting Free",
    description:
      "Strip formatting, remove HTML tags, convert smart quotes & dashes to plain text. Free online plain text converter — no signup required.",
    emoji: "📄",
    live: true,
  },
  {
    slug: "add-line-numbers",
    name: "Add Line Numbers",
    shortName: "Line #s",
    title: "Add Line Numbers to Text — Free Online Tool",
    description:
      "Add or remove line numbers from text. Custom start number, separators & zero padding. Free online tool — no signup required.",
    emoji: "🔢",
    live: true,
  },
  {
    slug: "find-and-replace",
    name: "Find & Replace",
    shortName: "Find/Replace",
    title: "Find and Replace Text Online — Free Tool",
    description:
      "Find and replace text with regex support, case matching & whole word options. Highlight matches live. Free online find and replace — no signup.",
    emoji: "🔎",
    live: true,
  },
  {
    slug: "add-prefix-suffix",
    name: "Add Prefix/Suffix",
    shortName: "Prefix",
    title: "Add Prefix & Suffix to Each Line — Free Tool",
    description:
      "Add prefix or suffix to every line of text. Preset buttons for quotes, parentheses, HTML li & more. Free online tool — no signup required.",
    emoji: "➕",
    live: true,
  },
  {
    slug: "bold-text-generator",
    name: "Bold Text",
    shortName: "Bold",
    title: "Bold Text Generator — Copy & Paste Free",
    description:
      "Generate bold Unicode text (𝗕𝗼𝗹𝗱) you can copy and paste anywhere. Works on social media, bios & more. Free — no signup required.",
    emoji: "𝗕",
    live: true,
  },
  {
    slug: "bold-italic-text-generator",
    name: "Bold Italic",
    shortName: "Bold Italic",
    title: "Bold Italic Text Generator — Copy & Paste Free",
    description:
      "Generate bold italic Unicode text (𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘) you can copy and paste. Works on social media & bios. Free — no signup required.",
    emoji: "𝘽",
    live: true,
  },
  {
    slug: "italic-text-generator",
    name: "Italic Text",
    shortName: "Italic",
    title: "Italic Text Generator — Copy & Paste Free",
    description:
      "Generate italic Unicode text (𝘐𝘵𝘢𝘭𝘪𝘤) you can copy and paste anywhere. Works on social media & bios. Free — no signup required.",
    emoji: "𝘐",
    live: true,
  },
  {
    slug: "superscript-generator",
    name: "Superscript",
    shortName: "Super",
    title: "Superscript Text Generator — Copy & Paste Free",
    description:
      "Generate superscript Unicode text (ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ) you can copy and paste. Free online superscript generator — no signup required.",
    emoji: "ˢ",
    live: true,
  },
  {
    slug: "strikethrough-text-generator",
    name: "Strikethrough",
    shortName: "Strike",
    title: "Strikethrough Text Generator — Copy & Paste Free",
    description:
      "Generate strikethrough Unicode text (T̶e̶x̶t̶) you can copy and paste anywhere. Free online strikethrough generator — no signup required.",
    emoji: "T̶",
    live: true,
  },
  {
    slug: "underline-text-generator",
    name: "Underline Text",
    shortName: "Underline",
    title: "Underline Text Generator — Copy & Paste Free",
    description:
      "Generate underlined Unicode text (T̲e̲x̲t̲) you can copy and paste anywhere. Free online underline text generator — no signup required.",
    emoji: "T̲",
    live: true,
  },
  {
    slug: "upside-down-text-generator",
    name: "Upside Down",
    shortName: "Upside Down",
    title: "Upside Down Text Generator — Copy & Paste Free",
    description:
      "Generate upside down text (ʇxǝʇ uʍop ǝpᴉsdn) you can copy and paste. Free online upside down text generator — no signup required.",
    emoji: "🙃",
    live: true,
  },
  {
    slug: "small-caps-generator",
    name: "Small Caps",
    shortName: "Small Caps",
    title: "Small Caps Generator — Copy & Paste Free",
    description:
      "Generate small caps Unicode text (Sᴍᴀʟʟ Cᴀᴘꜱ) you can copy and paste anywhere. Free online small caps generator — no signup required.",
    emoji: "ꜱᴄ",
    live: true,
  },
  {
    slug: "subscript-generator",
    name: "Subscript",
    shortName: "Sub",
    title: "Subscript Text Generator — Copy & Paste Free",
    description:
      "Generate subscript Unicode text with numbers and available letters. Free online subscript generator — no signup required.",
    emoji: "₂",
    live: true,
  },
  {
    slug: "fancy-text-generator",
    name: "Fancy Text",
    shortName: "Fancy",
    title: "Fancy Text Generator — Cool Fonts Copy & Paste",
    description:
      "Generate 12+ Unicode text styles instantly. Bold, italic, bubble, upside down & more. Copy and paste anywhere. Free — no signup required.",
    emoji: "✨",
    live: true,
  },
  {
    slug: "bubble-text-generator",
    name: "Bubble Text",
    shortName: "Bubble",
    title: "Bubble Text Generator — Copy & Paste Free",
    description:
      "Generate bubble/circled Unicode text (Ⓑⓤⓑⓑⓛⓔ) you can copy and paste. Free online bubble text generator — no signup required.",
    emoji: "Ⓑ",
    live: true,
  },
  {
    slug: "wide-text-generator",
    name: "Wide Text",
    shortName: "Wide",
    title: "Wide Text Generator — Vaporwave Aesthetic Free",
    description:
      "Generate fullwidth vaporwave text (Ｗｉｄｅ　Ｔｅｘｔ) you can copy and paste. Free aesthetic text generator — no signup required.",
    emoji: "Ｗ",
    live: true,
  },
  {
    slug: "color-code-converter",
    name: "Color Converter",
    shortName: "Color",
    title: "Color Code Converter — HEX RGB HSL Free",
    description:
      "Convert between HEX, RGB, HSL & CMYK color codes. Contrast checker with WCAG pass/fail. Free online color converter — no signup.",
    emoji: "🎨",
    live: true,
  },
  {
    slug: "random-number-generator",
    name: "Random Number",
    shortName: "Random",
    title: "Random Number Generator — Dice Roller Free",
    description:
      "Generate random numbers with custom ranges. Bulk mode, no duplicates & dice roller. Free online random number generator — no signup.",
    emoji: "🎲",
    live: true,
  },
  { slug: "morse-code-translator", name: "Morse Code", shortName: "Morse", title: "Morse Code Translator — Encode & Decode Free", description: "Translate text to Morse code and back. Audio playback, speed control & reference chart. Free online Morse code translator — no signup.", emoji: "📡", live: true },
  { slug: "rot13-encoder-decoder", name: "ROT13 Cipher", shortName: "ROT13", title: "ROT13 Encoder Decoder — Caesar Cipher Free", description: "Encode and decode ROT13, ROT5, ROT47 & custom Caesar ciphers. Free online cipher tool — no signup required.", emoji: "🔓", live: true },
  {
    slug: "binary-text-converter",
    name: "Binary Text",
    shortName: "Binary",
    title: "Binary Text Converter — Text to Binary Free",
    description:
      "Convert text to binary and binary to text. Per-character breakdown table. Free online binary converter — no signup required.",
    emoji: "0️⃣",
    live: true,
  },
  {
    slug: "hex-text-converter",
    name: "Hex Text",
    shortName: "Hex",
    title: "Hex Text Converter — Text to Hex Free",
    description:
      "Convert text to hexadecimal and hex to text. Per-character breakdown table. Free online hex converter — no signup required.",
    emoji: "🔣",
    live: true,
  },
  { slug: "nato-phonetic-alphabet", name: "NATO Phonetic", shortName: "NATO", title: "NATO Phonetic Alphabet Converter — Free Tool", description: "Convert text to NATO phonetic alphabet (Alpha, Bravo, Charlie). Full reference table included. Free — no signup required.", emoji: "🎖️", live: true },
  { slug: "pig-latin-converter", name: "Pig Latin", shortName: "Pig Latin", title: "Pig Latin Translator — Convert Text Free", description: "Convert English to Pig Latin and back. Preserves punctuation & capitalization. Free online Pig Latin translator — no signup.", emoji: "🐷", live: true },
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
