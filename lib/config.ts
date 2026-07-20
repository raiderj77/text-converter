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

// Author identity (per Empire policy: named author for E-E-A-T across all sites)
export const AUTHOR_NAME = "Your Friendly Developer";
export const AUTHOR_URL = `${SITE_URL}/about`;
export const AUTHOR_JOB_TITLE = "Web Developer";

export const GA_ID = "G-3X4SDLV60C";

/**
 * Tool registry. Every tool in the suite is defined here.
 * Nav, sitemap, internal linking, and schema all read from this.
 */
export type ToolCategory =
  | "Text Tools"
  | "Analysis"
  | "Font Styles"
  | "Developer"
  | "Encoding"
  | "Generators";

export type Tool = {
  slug: string;       // URL path segment (e.g. "" for homepage, "word-counter" for /word-counter)
  name: string;       // Display name in nav
  shortName: string;  // Compact name for mobile nav
  title: string;      // SEO <title> tag
  description: string; // SEO meta description
  emoji: string;      // Visual identifier in nav
  live: boolean;      // Only show in nav when true
  category: ToolCategory; // Navigation category grouping
  audience?: string;  // Overrides category-level audienceMap in ToolAnswerBlock
  bottomLine?: string; // Overrides generic hardcoded fallback in ToolAnswerBlock
};

export const tools: Tool[] = [
  {
    slug: "",
    name: "Case Converter",
    shortName: "Case",
    title: "Free Online Text Case Converter",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case & more instantly. Free online tool — no signup required.",
    emoji: "🔄",
    category: "Text Tools",
    live: true,
    audience: "Writers, students, and coders who need text in a specific case without retyping it from scratch",
    bottomLine: "Converts to 9 case styles at once including camelCase, snake_case, and Title Case",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortName: "Words",
    title: "Free Word & Character Counter",
    description:
      "Count words, characters, sentences, paragraphs & reading time. Keyword density included. Free online word counter — no signup.",
    emoji: "📊",
    category: "Analysis",
    live: true,
    audience: "Students hitting essay minimums, freelancers tracking billable words, and bloggers checking post length",
    bottomLine: "Counts words, characters, sentences, reading time, and keyword density for any pasted text",
  },
  {
    slug: "text-cleaner",
    name: "Text Cleaner",
    shortName: "Clean",
    title: "Text Cleaner — Remove Spaces & Line Breaks Free",
    description:
      "Remove extra spaces, line breaks, tabs & hidden characters from messy text. Free online cleaner — no signup required.",
    emoji: "🧹",
    category: "Text Tools",
    live: true,
    audience: "Anyone pasting from Word, Google Docs, or PDFs where extra spaces and line breaks tag along",
    bottomLine: "Strips invisible junk from copy-pasted text so it pastes clean anywhere",
  },
  {
    slug: "lorem-ipsum-generator",
    name: "Lorem Ipsum",
    shortName: "Lorem",
    title: "Lorem Ipsum Generator — Placeholder Text Free",
    description:
      "Generate placeholder text in 5 styles: Lorem Ipsum, Hipster, Office, Pirate & Cat Ipsum. Free online placeholder text generator — no signup required.",
    emoji: "📝",
    category: "Generators",
    live: true,
    audience: "Designers and developers who need placeholder text for mockups, prototypes, and layout testing",
    bottomLine: "Generates placeholder text in five flavors: Classic, Hipster, Office, Pirate, and Cat Ipsum",
  },
  {
    slug: "duplicate-line-remover",
    name: "Duplicate Remover",
    shortName: "Dedup",
    title: "Duplicate Line Remover — Deduplicate Lists Free",
    description:
      "Remove duplicate lines from any list instantly. Case-insensitive matching, sorting & stats included. Free online tool — no signup.",
    emoji: "🗑️",
    category: "Text Tools",
    live: true,
    audience: "Data wranglers, devs, and list curators who need a clean unique set of items with no repeated entries",
    bottomLine: "Removes every repeated line from a list, with sort and case-ignore options",
  },
  {
    slug: "string-encoder",
    name: "String Encoder",
    shortName: "Encode",
    title: "String Encoder & Decoder — Free",
    description:
      "Encode & decode Base64, URL, HTML entities, hex & binary strings instantly. Free online tool — no signup required.",
    emoji: "🔐",
    category: "Encoding",
    live: true,
    audience: "Developers who handle URL encoding, HTML entities, Base64 data, and hex strings in regular work",
    bottomLine: "Encodes and decodes Base64, URL, HTML entities, hex, and binary in both directions",
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortName: "JSON",
    title: "JSON Formatter & Validator — Free",
    description:
      "Format, validate, beautify & minify JSON online. Tree view, error detection & CSV export. Free tool — no signup required.",
    emoji: "{ }",
    category: "Developer",
    live: true,
    audience: "Backend developers and API testers who receive minified JSON and need to read or validate it fast",
    bottomLine: "Formats, validates, and minifies JSON with tree view and error detection in the browser",
  },
  {
    slug: "text-diff",
    name: "Text Diff",
    shortName: "Diff",
    title: "Text Diff — Compare Two Texts Side by Side Free",
    description:
      "Compare two texts side by side with additions, deletions & changes highlighted. Free online diff tool — no signup required.",
    emoji: "🔍",
    category: "Analysis",
    live: true,
    audience: "Writers comparing draft revisions and developers reviewing config or code changes between two versions",
    bottomLine: "Highlights every addition, deletion, and change between two text blocks side by side",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortName: "Password",
    title: "Password Generator — Strong & Secure Free Online",
    description:
      "Generate strong random passwords with custom length, symbols & exclusions. Strength meter included. Free — no signup required.",
    emoji: "🔑",
    category: "Generators",
    live: true,
    audience: "Anyone creating a new account who wants a strong random password they did not come up with themselves",
    bottomLine: "Creates random passwords with custom length, symbols, and character exclusions",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    shortName: "Regex",
    title: "Regex Tester Online — Test Regular Expressions Free",
    description:
      "Test regular expressions with real-time highlighting, capture groups & replace mode. Free online regex tool — no signup.",
    emoji: "⚙️",
    category: "Developer",
    live: true,
    audience: "Developers and data engineers who write regular expressions and want to see match results live as they type",
    bottomLine: "Tests regex patterns with live match highlighting, capture groups, and replace preview",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    shortName: "Hash",
    title: "Hash Generator — MD5, SHA-256, SHA-512 Free Online",
    description:
      "Generate MD5, SHA-1, SHA-256 & SHA-512 hashes from text or files instantly. Free online tool — no signup required.",
    emoji: "#️⃣",
    category: "Developer",
    live: true,
    audience: "Developers verifying file integrity and security researchers who need checksums from text or uploaded files",
    bottomLine: "Generates MD5, SHA-1, SHA-256, and SHA-512 hashes from any text or file you provide",
  },
  {
    slug: "toggle-case-converter",
    name: "Toggle Case",
    shortName: "Toggle",
    title: "Toggle Case Converter — Alternating Caps Free",
    description:
      "Convert text to alternating caps (tOgGlE cAsE) for mocking memes & SpongeBob text. Free online tool — no signup required.",
    emoji: "🔄",
    category: "Text Tools",
    live: true,
    audience: "Meme creators and social media users who want the SpongeBob alternating caps effect instantly",
    bottomLine: "Flips every character's case to create classic alternating mocking text",
  },
  {
    slug: "snake-kebab-converter",
    name: "Snake vs Kebab",
    shortName: "Snake/Kebab",
    title: "Snake_case to Kebab-case Converter — Free Online",
    description:
      "Convert between snake_case and kebab-case instantly. Compare naming conventions side by side. Free online tool — no signup required.",
    emoji: "🐍",
    category: "Text Tools",
    live: true,
    audience: "Programmers converting variable names between snake_case and kebab-case across a codebase",
    bottomLine: "Converts any identifier between snake_case and kebab-case in one click",
  },
  {
    slug: "underscore-conventions",
    name: "Underscore Guide",
    shortName: "Underscore",
    title: "Underscore Guide — _private, __dunder & snake_case",
    description:
      "Why do programmers use underscores? Guide to _private, __dunder, snake_case & more with Python & JavaScript examples. Free — no signup.",
    emoji: "📘",
    category: "Generators",
    live: true,
    audience: "Python and JavaScript beginners learning what _single, __double, and snake_case underscores mean",
    bottomLine: "Reference guide explaining every underscore convention in Python and JavaScript with code examples",
  },
  {
    slug: "all-caps-guide",
    name: "All Caps Guide",
    shortName: "All Caps",
    title: "All Caps Guide — When UPPERCASE Is Rude vs OK",
    description:
      "When is ALL CAPS rude vs necessary? Guide to uppercase in emails, social media & code. Free instantly — no signup required.",
    emoji: "🔠",
    category: "Generators",
    live: true,
    audience: "Writers and office workers unsure when ALL CAPS is appropriate versus when it reads as shouting",
    bottomLine: "Reference guide covering when ALL CAPS is appropriate, when it reads as shouting, and how to use it in context",
  },
  {
    slug: "camelcase-vs-snake-case",
    name: "camelCase vs snake_case",
    shortName: "Case Compare",
    title: "camelCase vs snake_case vs kebab-case — Which to Use (2026)",
    description:
      "When to use camelCase, snake_case, or kebab-case in programming. Language conventions, examples, and a free converter tool.",
    emoji: "⚖️",
    category: "Generators",
    live: true,
    audience: "Junior developers learning which naming convention their language or framework expects by default",
    bottomLine: "Reference guide comparing camelCase, snake_case, and kebab-case with usage rules for major programming languages",
  },
  {
    slug: "text-tools-for-developers",
    name: "Developer Tools",
    shortName: "Dev Tools",
    title: "Text Tools for Developers: Free Browser Tools (2026)",
    description:
      "Free browser-based text tools for developers. JSON formatter, regex tester, hash generator, UUID, JWT decoder, and 20+ more. No signup required.",
    emoji: "💻",
    category: "Developer",
    live: true,
    audience: "Full-stack developers looking for a reference index of browser-based text and code utilities in one place",
    bottomLine: "Index page linking the JSON, regex, hash, UUID, and timestamp tools devs reach for most",
  },
  {
    slug: "json-vs-yaml-vs-xml",
    name: "JSON vs YAML vs XML",
    shortName: "Format Compare",
    title: "JSON vs YAML vs XML: Differences & When to Use Each (2026)",
    description:
      "JSON vs YAML vs XML comparison — syntax differences, use cases, performance, and when to choose each format for your project.",
    emoji: "📊",
    category: "Developer",
    live: true,
    audience: "Backend developers and DevOps engineers choosing a data serialization format for a new project or API",
    bottomLine: "Compares JSON, YAML, and XML on syntax, file size, tooling support, and ideal use cases",
  },
  {
    slug: "text-sorter",
    name: "Text Sorter",
    shortName: "Sort",
    title: "Text Sorter — Sort Lines Alphabetically Free",
    description:
      "Sort text lines alphabetically, numerically, or randomly. Remove duplicates & reverse order. Free online tool — no signup required.",
    emoji: "📊",
    category: "Text Tools",
    live: true,
    audience: "Editors, researchers, and developers who need a list alphabetized or numerically ordered right now",
    bottomLine: "Sorts lines A-Z, Z-A, numerically, or randomly, with duplicate removal built in",
  },
  {
    slug: "text-reverser",
    name: "Text Reverser",
    shortName: "Reverse",
    title: "Text Reverser — Reverse Text Online Free",
    description:
      "Reverse characters, words, or lines of text instantly. Create backwards & mirror text. Free online tool — no signup required.",
    emoji: "↔️",
    category: "Text Tools",
    live: true,
    audience: "Puzzle builders, developers testing string logic, and anyone creating backwards or mirror text",
    bottomLine: "Reverses characters, words, or entire lines of any pasted text",
  },
  {
    slug: "spongebob-case-converter",
    name: "SpongeBob Case",
    shortName: "SpongeBob",
    title: "SpongeBob Case Converter — sPoNgEbOb Text Free",
    description:
      "Convert text to sPoNgEbOb mocking case for memes & social media. Create viral sarcastic text instantly. Free — no signup required.",
    emoji: "🧽",
    category: "Text Tools",
    live: true,
    audience: "Meme fans who want the sPoNgEbOb mocking-text look for Reddit, Discord, and Twitter posts",
    bottomLine: "Creates alternating-cap mocking text for viral memes in under two seconds",
  },
  {
    slug: "slug-generator",
    name: "Slug Generator",
    shortName: "Slug",
    title: "URL Slug Generator — SEO-Friendly Slugs Free",
    description:
      "Convert any title into a clean, SEO-friendly URL slug instantly. Multiple formats supported. Free online tool — no signup required.",
    emoji: "🔗",
    category: "Developer",
    live: true,
    audience: "Bloggers, CMS editors, and developers who need clean URL slugs from titles without thinking about the rules",
    bottomLine: "Converts any title into a lowercase, hyphenated, SEO-safe URL slug in one click",
  },
  {
    slug: "yaml-formatter",
    name: "YAML Formatter",
    shortName: "YAML",
    title: "YAML Formatter & Validator — YAML to JSON Free",
    description:
      "Format, validate & convert YAML online. YAML to JSON and JSON to YAML conversion included. Free online tool — no signup required.",
    emoji: "📝",
    category: "Developer",
    live: true,
    audience: "DevOps engineers working with Kubernetes configs, GitHub Actions, and other YAML-based configuration files",
    bottomLine: "Formats and validates YAML, and converts it to JSON or back in either direction",
  },
  {
    slug: "xml-formatter",
    name: "XML Formatter",
    shortName: "XML",
    title: "XML Formatter & Validator — Beautify Free Online",
    description:
      "Format, beautify & minify XML online with error detection. Choose 2/4 spaces or tabs for indentation. Free online tool — no signup required.",
    emoji: "📄",
    category: "Developer",
    live: true,
    audience: "Backend developers and QA testers who need to read or validate minified XML API responses",
    bottomLine: "Formats and validates XML with custom indentation, and minifies it back for production",
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    shortName: "CSV/JSON",
    title: "CSV to JSON Converter — Bidirectional Free Online",
    description:
      "Convert CSV to JSON and JSON to CSV instantly. Auto-detect delimiters, first row as headers, pretty print or minified. Free online tool — no signup required.",
    emoji: "📋",
    category: "Developer",
    live: true,
    audience: "Data engineers and developers converting spreadsheet exports to JSON for APIs or reverse",
    bottomLine: "Converts CSV to JSON and JSON to CSV, with auto-detected delimiters and first-row headers",
  },
  {
    slug: "unix-timestamp-converter",
    name: "Unix Timestamp",
    shortName: "Timestamp",
    title: "Unix Timestamp Converter — Epoch Time Free Online",
    description:
      "Convert Unix timestamps to human dates and dates to timestamps instantly. Live clock, seconds & milliseconds support. Free online tool — no signup required.",
    emoji: "🕐",
    category: "Generators",
    live: true,
    audience: "Developers debugging APIs, reading log files, and working with epoch timestamps in database schemas",
    bottomLine: "Converts Unix timestamps to readable dates and dates to epoch, with live millisecond support",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    shortName: "UUID",
    title: "UUID Generator — Generate v4 GUIDs Free Online",
    description:
      "Generate random UUID v4 identifiers instantly. Bulk generate up to 100, uppercase or lowercase, with or without hyphens. Free online tool — no signup required.",
    emoji: "🆔",
    category: "Generators",
    live: true,
    audience: "Developers who need unique identifiers for database records, API keys, or test fixtures on demand",
    bottomLine: "Generates UUID v4 identifiers instantly, with bulk mode for up to 100 at once",
  },
  {
    slug: "number-base-converter",
    name: "Number Base Converter",
    shortName: "Base Conv",
    title: "Number Base Converter — Binary, Hex, Octal Free",
    description:
      "Convert between binary, octal, decimal & hexadecimal instantly. ASCII text to binary/hex mode included. Free online tool — no signup required.",
    emoji: "🔢",
    category: "Encoding",
    live: true,
    audience: "CS students, embedded developers, and anyone converting between binary, octal, decimal, and hex",
    bottomLine: "Converts numbers between binary, octal, decimal, and hexadecimal, with ASCII conversion too",
  },
  {
    slug: "markdown-preview",
    name: "Markdown Preview",
    shortName: "Markdown",
    title: "Markdown Preview — Live Editor Online Free",
    description:
      "Write Markdown and see a live rendered preview. Copy HTML or download as .html. Supports tables, code blocks, lists & more. Free — no signup required.",
    emoji: "📖",
    category: "Developer",
    live: true,
    audience: "Technical writers and developers who write Markdown docs and want to confirm how the output renders",
    bottomLine: "Shows a live rendered Markdown preview with support for tables, code blocks, and lists",
  },
  {
    slug: "word-frequency-counter",
    name: "Word Frequency",
    shortName: "Frequency",
    title: "Word Frequency Counter — Analyze Text Online Free",
    description:
      "Count word frequency, analyze bigrams & trigrams, generate word clouds. Export as CSV. Free online word frequency counter — no signup required.",
    emoji: "📊",
    category: "Analysis",
    live: true,
    audience: "SEO writers checking keyword repetition and editors spotting overused words in long-form drafts",
    bottomLine: "Shows how often each word appears, plus bigrams, trigrams, and a visual word cloud",
  },
  {
    slug: "ai-writing-analyzer",
    name: "AI Writing Analyzer",
    shortName: "AI Analyzer",
    title: "AI Writing Pattern Analyzer — Free Online Tool",
    description:
      "Analyze statistical writing patterns in any text. Check sentence uniformity, vocabulary diversity & filler phrases. Free, private, browser-only.",
    emoji: "🤖",
    category: "Analysis",
    live: true,
    audience: "Writers and editors checking whether a passage shows statistical patterns typical of AI-generated prose",
    bottomLine: "Scans sentence uniformity, vocabulary diversity, and filler phrases that signal AI writing",
  },
  {
    slug: "readability-analyzer",
    name: "Readability Analyzer",
    shortName: "Readability",
    title: "Readability Score Analyzer — Free Online Tool",
    description:
      "Check readability with Flesch-Kincaid, Gunning Fog, SMOG, Coleman-Liau, ARI & Dale-Chall. Instant grade level & sentence analysis. Free — no signup.",
    emoji: "📚",
    category: "Analysis",
    live: true,
    audience: "Content strategists, educators, and UX writers who need text to land at a specific reading level",
    bottomLine: "Scores text with Flesch-Kincaid, Gunning Fog, SMOG, and three other established formulas",
  },
  {
    slug: "text-statistics",
    name: "Text Statistics",
    shortName: "Stats",
    title: "Text Statistics Dashboard — Free Online Tool",
    description:
      "Analyze text with word frequency, vocabulary richness, lexical density, sentence structure, bigrams, trigrams & more. Export reports. Free — no signup.",
    emoji: "📈",
    category: "Analysis",
    live: true,
    audience: "Researchers and serious writers who want a deep breakdown of vocabulary richness and sentence patterns",
    bottomLine: "Measures lexical density, vocabulary richness, sentence distribution, and bigrams in one report",
  },
  {
    slug: "line-counter",
    name: "Line Counter",
    shortName: "Lines",
    title: "Line Counter — Count Lines of Text Online Free",
    description:
      "Count total lines, empty lines & non-empty lines. See line length stats and distribution. Free online line counter — no signup required.",
    emoji: "📏",
    category: "Analysis",
    live: true,
    audience: "Developers counting lines in log output and anyone tracking row counts in large text files",
    bottomLine: "Counts total lines, blank lines, and non-empty lines, with a line-length distribution chart",
  },
  {
    slug: "text-repeater",
    name: "Text Repeater",
    shortName: "Repeat",
    title: "Text Repeater — Repeat Text Online Free",
    description:
      "Repeat any text up to 1000 times with custom separators. Number repetitions, preview output. Free online text repeater — no signup required.",
    emoji: "🔁",
    category: "Text Tools",
    live: true,
    audience: "Developers filling test fixtures, teachers making worksheets, and anyone who needs text looped many times",
    bottomLine: "Repeats any phrase up to 1,000 times with a custom separator between each copy",
  },
  {
    slug: "plain-text-converter",
    name: "Plain Text",
    shortName: "Plain",
    title: "Plain Text Converter — Strip Formatting Free",
    description:
      "Strip formatting, remove HTML tags, convert smart quotes & dashes to plain text. Free online plain text converter — no signup required.",
    emoji: "📄",
    category: "Text Tools",
    live: true,
    audience: "Anyone pasting from a rich-text editor who needs clean unformatted text to paste somewhere else",
    bottomLine: "Strips HTML tags, smart quotes, and rich formatting down to pure plain text",
  },
  {
    slug: "add-line-numbers",
    name: "Add Line Numbers",
    shortName: "Line #s",
    title: "Add Line Numbers to Text — Free Online Tool",
    description:
      "Add or remove line numbers from text. Custom start number, separators & zero padding. Free online tool — no signup required.",
    emoji: "🔢",
    category: "Text Tools",
    live: true,
    audience: "Developers and technical writers who need numbered source code or enumerated text blocks",
    bottomLine: "Adds sequential line numbers to any text, with custom start number and separator",
  },
  {
    slug: "find-and-replace",
    name: "Find & Replace",
    shortName: "Find/Replace",
    title: "Find and Replace Text Online — Free Tool",
    description:
      "Find and replace text with regex support, case matching & whole word options. Highlight matches live. Free online find and replace — no signup.",
    emoji: "🔎",
    category: "Text Tools",
    live: true,
    audience: "Writers and developers who need to swap a word or pattern across a large block of text at once",
    bottomLine: "Replaces every match with regex support, case sensitivity, and whole-word options",
  },
  {
    slug: "add-prefix-suffix",
    name: "Add Prefix/Suffix",
    shortName: "Prefix",
    title: "Add Prefix & Suffix to Each Line — Free Tool",
    description:
      "Add prefix or suffix to every line of text. Preset buttons for quotes, parentheses, HTML li & more. Free online tool — no signup required.",
    emoji: "➕",
    category: "Text Tools",
    live: true,
    audience: "Developers wrapping SQL rows, Markdown list items, or CSV values with consistent formatting on every line",
    bottomLine: "Adds your prefix and suffix to every line at once, with presets for quotes and HTML tags",
  },
  {
    slug: "bold-text-generator",
    name: "Bold Text",
    shortName: "Bold",
    title: "Bold Text Generator — Copy & Paste Free",
    description:
      "Generate bold Unicode text (𝗕𝗼𝗹𝗱) you can copy and paste anywhere. Works on social media, bios & more. Free — no signup required.",
    emoji: "𝗕",
    category: "Font Styles",
    live: true,
    audience: "Instagram and LinkedIn users who want bold text in bios where the platform has no bold button",
    bottomLine: "Makes Unicode bold text you can paste directly into any social media profile or caption",
  },
  {
    slug: "bold-italic-text-generator",
    name: "Bold Italic",
    shortName: "Bold Italic",
    title: "Bold Italic Text Generator — Copy & Paste Free",
    description:
      "Generate bold italic Unicode text (𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘) you can copy and paste. Works on social media & bios. Free — no signup required.",
    emoji: "𝘽",
    category: "Font Styles",
    live: true,
    audience: "Social media creators who want the strongest emphasis style available in plain-text environments",
    bottomLine: "Creates bold italic Unicode text that pastes into any social app with no formatting required",
  },
  {
    slug: "italic-text-generator",
    name: "Italic Text",
    shortName: "Italic",
    title: "Italic Text Generator — Copy & Paste Free",
    description:
      "Generate italic Unicode text (𝘐𝘵𝘢𝘭𝘪𝘤) you can copy and paste anywhere. Works on social media & bios. Free — no signup required.",
    emoji: "𝘐",
    category: "Font Styles",
    live: true,
    audience: "Twitter, Instagram, and LinkedIn users who want italic-style text where the platform has no native option",
    bottomLine: "Generates copy-paste italic Unicode text that renders in any app or profile field",
  },
  {
    slug: "superscript-generator",
    name: "Superscript",
    shortName: "Super",
    title: "Superscript Text Generator — Copy & Paste Free",
    description:
      "Generate superscript Unicode text (ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ) you can copy and paste. Free online superscript generator — no signup required.",
    emoji: "ˢ",
    category: "Font Styles",
    live: true,
    audience: "Science students and math writers who need raised characters like footnote markers and exponents",
    bottomLine: "Converts text to Unicode superscript characters you can paste into any plain-text field",
  },
  {
    slug: "strikethrough-text-generator",
    name: "Strikethrough",
    shortName: "Strike",
    title: "Strikethrough Text Generator — Copy & Paste Free",
    description:
      "Generate strikethrough Unicode text (T̶e̶x̶t̶) you can copy and paste anywhere. Free online strikethrough generator — no signup required.",
    emoji: "T̶",
    category: "Font Styles",
    live: true,
    audience: "Twitter users, Discord members, and meme creators who want strikethrough text in any plain-text environment",
    bottomLine: "Creates Unicode strikethrough text that pastes into social media, Slack, and Discord",
  },
  {
    slug: "underline-text-generator",
    name: "Underline Text",
    shortName: "Underline",
    title: "Underline Text Generator — Copy & Paste Free",
    description:
      "Generate underlined Unicode text (T̲e̲x̲t̲) you can copy and paste anywhere. Free online underline text generator — no signup required.",
    emoji: "T̲",
    category: "Font Styles",
    live: true,
    audience: "Social media users who want underlined text in posts and bios where only plain text is accepted",
    bottomLine: "Produces Unicode underlined text that copies into Twitter, Instagram, Discord, and more",
  },
  {
    slug: "upside-down-text-generator",
    name: "Upside Down",
    shortName: "Upside Down",
    title: "Upside Down Text Generator — Copy & Paste Free",
    description:
      "Generate upside down text (ʇxǝʇ uʍop ǝpᴉsdn) you can copy and paste. Free online upside down text generator — no signup required.",
    emoji: "🙃",
    category: "Font Styles",
    live: true,
    audience: "Social media users and puzzle fans who want flipped text for creative posts and profile bios",
    bottomLine: "Flips your text upside down using Unicode character mappings, copyable anywhere",
  },
  {
    slug: "small-caps-generator",
    name: "Small Caps",
    shortName: "Small Caps",
    title: "Small Caps Generator — Copy & Paste Free",
    description:
      "Generate small caps Unicode text (Sᴍᴀʟʟ Cᴀᴘꜱ) you can copy and paste anywhere. Free online small caps generator — no signup required.",
    emoji: "ꜱᴄ",
    category: "Font Styles",
    live: true,
    audience: "Typography enthusiasts who want the refined small-capitals style in social profiles and article headers",
    bottomLine: "Generates Unicode small caps text that renders correctly in most social apps and platforms",
  },
  {
    slug: "subscript-generator",
    name: "Subscript",
    shortName: "Sub",
    title: "Subscript Text Generator — Copy & Paste Free",
    description:
      "Generate subscript Unicode text with numbers and available letters. Free online subscript generator — no signup required.",
    emoji: "₂",
    category: "Font Styles",
    live: true,
    audience: "Chemistry students who need subscript characters for formulas like H₂O outside of LaTeX",
    bottomLine: "Creates Unicode subscript numbers and letters you can paste into any plain-text field",
  },
  {
    slug: "fancy-text-generator",
    name: "Fancy Text",
    shortName: "Fancy",
    title: "Fancy Text Generator — Cool Fonts Copy & Paste",
    description:
      "Generate 12+ Unicode text styles instantly. Bold, italic, bubble, upside down & more. Copy and paste anywhere. Free — no signup required.",
    emoji: "✨",
    category: "Font Styles",
    live: true,
    audience: "Social media users who want to preview multiple decorative Unicode styles at once before picking one",
    bottomLine: "Shows your text in 12 different Unicode styles simultaneously so you can copy the right one",
  },
  {
    slug: "bubble-text-generator",
    name: "Bubble Text",
    shortName: "Bubble",
    title: "Bubble Text Generator — Copy & Paste Free",
    description:
      "Generate bubble/circled Unicode text (Ⓑⓤⓑⓑⓛⓔ) you can copy and paste. Free online bubble text generator — no signup required.",
    emoji: "Ⓑ",
    category: "Font Styles",
    live: true,
    audience: "Instagram, Twitter, and Discord users who want the circled bubble-letter look for posts and bios",
    bottomLine: "Wraps every letter in a Unicode circle, creating bubble text you can copy and paste anywhere",
  },
  {
    slug: "wide-text-generator",
    name: "Wide Text",
    shortName: "Wide",
    title: "Wide Text Generator — Vaporwave Aesthetic Free",
    description:
      "Generate fullwidth vaporwave text (Ｗｉｄｅ　Ｔｅｘｔ) you can copy and paste. Free aesthetic text generator — no signup required.",
    emoji: "Ｗ",
    category: "Font Styles",
    live: true,
    audience: "Aesthetic and vaporwave fans who want the fullwidth character look for social posts and profiles",
    bottomLine: "Converts text to fullwidth Unicode characters for the vaporwave aesthetic anywhere you paste",
  },
  {
    slug: "color-code-converter",
    name: "Color Converter",
    shortName: "Color",
    title: "Color Code Converter — HEX RGB HSL Free",
    description:
      "Convert between HEX, RGB, HSL & CMYK color codes. Contrast checker with WCAG pass/fail. Free online color converter — no signup.",
    emoji: "🎨",
    category: "Encoding",
    live: true,
    audience: "Designers and frontend developers converting color codes between HEX, RGB, HSL, and CMYK",
    bottomLine: "Converts between four color formats and checks WCAG contrast ratios between any two colors",
  },
  {
    slug: "random-number-generator",
    name: "Random Number",
    shortName: "Random",
    title: "Random Number Generator — Dice Roller Free",
    description:
      "Generate random numbers with custom ranges. Bulk mode, no duplicates & dice roller. Free online random number generator — no signup.",
    emoji: "🎲",
    category: "Generators",
    live: true,
    audience: "Teachers picking students, board game players rolling dice, and developers seeding randomized test data",
    bottomLine: "Generates random numbers in any range, with bulk mode, no-duplicate option, and a dice roller",
  },
  {
    slug: "morse-code-translator",
    name: "Morse Code",
    shortName: "Morse",
    title: "Morse Code Translator — Encode & Decode Free",
    description:
      "Translate text to Morse code and back. Audio playback, speed control & reference chart. Free online Morse code translator — no signup.",
    emoji: "📡",
    category: "Encoding",
    live: true,
    audience: "Ham radio enthusiasts, students learning Morse code, and hobbyists encoding or decoding messages",
    bottomLine: "Translates text to Morse and back, with audio playback and adjustable speed control",
  },
  {
    slug: "rot13-encoder-decoder",
    name: "ROT13 Cipher",
    shortName: "ROT13",
    title: "ROT13 Encoder Decoder — Caesar Cipher Free",
    description:
      "Encode and decode ROT13, ROT5, ROT47 & custom Caesar ciphers. Free online cipher tool — no signup required.",
    emoji: "🔓",
    category: "Encoding",
    live: true,
    audience: "Puzzle fans, hobbyist cryptographers, and developers working with ROT-encoded strings in legacy systems",
    bottomLine: "Encodes and decodes ROT13, ROT5, ROT47, and custom Caesar ciphers in both directions",
  },
  {
    slug: "binary-text-converter",
    name: "Binary Text",
    shortName: "Binary",
    title: "Binary Text Converter — Text to Binary Free",
    description:
      "Convert text to binary and binary to text. Per-character breakdown table. Free online binary converter — no signup required.",
    emoji: "0️⃣",
    category: "Encoding",
    live: true,
    audience: "CS students and developers who need to convert text to binary or decode binary strings back to text",
    bottomLine: "Converts text to binary and binary to text, with a per-character breakdown table",
  },
  {
    slug: "hex-text-converter",
    name: "Hex Text",
    shortName: "Hex",
    title: "Hex Text Converter — Text to Hex Free",
    description:
      "Convert text to hexadecimal and hex to text. Per-character breakdown table. Free online hex converter — no signup required.",
    emoji: "🔣",
    category: "Encoding",
    live: true,
    audience: "Developers debugging network packets or encoding strings for configuration files in hexadecimal",
    bottomLine: "Converts text to hexadecimal and hex back to readable text, with a character-level table",
  },
  {
    slug: "nato-phonetic-alphabet",
    name: "NATO Phonetic",
    shortName: "NATO",
    title: "NATO Phonetic Alphabet Converter — Free Tool",
    description:
      "Convert text to NATO phonetic alphabet (Alpha, Bravo, Charlie). Full reference table included. Free — no signup required.",
    emoji: "🎖️",
    category: "Encoding",
    live: true,
    audience: "Call center agents, pilots, radio operators, and anyone spelling out text using the NATO alphabet",
    bottomLine: "Converts any text to NATO phonetic words, with a full alphabet reference table",
  },
  {
    slug: "pig-latin-converter",
    name: "Pig Latin",
    shortName: "Pig Latin",
    title: "Pig Latin Translator — Convert Text Free",
    description:
      "Convert English to Pig Latin and back. Preserves punctuation & capitalization. Free online Pig Latin translator — no signup.",
    emoji: "🐷",
    category: "Encoding",
    live: true,
    audience: "Kids, language learners, and puzzle fans who want to convert English text to Pig Latin and back",
    bottomLine: "Converts English to Pig Latin and back, preserving punctuation and capitalization",
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    shortName: "SQL",
    title: "SQL Formatter & Beautifier — Free Online",
    description:
      "Format SQL with uppercase keywords, proper indentation & minification. Free online SQL formatter — no signup required.",
    emoji: "🗄️",
    category: "Developer",
    live: true,
    audience: "Developers and DBAs who receive or write dense unformatted SQL queries that are hard to scan",
    bottomLine: "Reformats SQL with uppercase keywords and proper indentation, and minifies it back too",
  },
  {
    slug: "html-to-markdown",
    name: "HTML↔Markdown",
    shortName: "HTML/MD",
    title: "HTML to Markdown Converter — Free Online",
    description:
      "Convert HTML to Markdown and Markdown to HTML. Handles headings, lists, links, code & tables. Free online converter — no signup.",
    emoji: "📝",
    category: "Developer",
    live: true,
    audience: "Content migrators converting CMS HTML into Markdown for documentation or static-site generators",
    bottomLine: "Converts HTML to clean Markdown and Markdown back to HTML, handling tables and code blocks",
  },
  {
    slug: "cron-expression-builder",
    name: "Cron Builder",
    shortName: "Cron",
    title: "Cron Expression Builder — Generator Free",
    description:
      "Build cron expressions visually with presets, natural language descriptions & next execution times. Free online cron generator — no signup.",
    emoji: "⏰",
    category: "Developer",
    live: true,
    audience: "Developers and sysadmins who need to build or decode cron schedule strings without memorizing the syntax",
    bottomLine: "Builds valid cron expressions visually with natural-language descriptions and next run previews",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    shortName: "JWT",
    title: "JWT Decoder — Decode JWT Tokens Free",
    description:
      "Decode JWT tokens to see header and payload. Expiration status, issued time & algorithm. Free online JWT decoder — no signup.",
    emoji: "🔑",
    category: "Developer",
    live: true,
    audience: "Backend developers and security engineers who need to inspect JWT payloads during API debugging",
    bottomLine: "Decodes any JWT to reveal its header, payload, expiration time, and signing algorithm",
  },
  {
    slug: "css-formatter",
    name: "CSS Formatter",
    shortName: "CSS",
    title: "CSS Formatter & Minifier — Beautify Free",
    description:
      "Format, beautify & minify CSS online. Choose indent style, preserve or remove comments. Free online CSS formatter — no signup.",
    emoji: "🎨",
    category: "Developer",
    live: true,
    audience: "Frontend developers who need to beautify or minify stylesheet code before committing or shipping",
    bottomLine: "Formats and minifies CSS with your choice of indent style and comment handling options",
  },
  {
    slug: "html-formatter",
    name: "HTML Formatter",
    shortName: "HTML",
    title: "HTML Formatter & Beautifier — Free Online",
    description:
      "Format, beautify & minify HTML online. Proper indentation with customizable spacing. Free online HTML formatter — no signup.",
    emoji: "🌐",
    category: "Developer",
    live: true,
    audience: "Web developers and email template authors who need properly indented HTML for readability",
    bottomLine: "Formats and minifies HTML with customizable indentation to make messy markup scannable",
  },
  {
    slug: "javascript-formatter",
    name: "JS Formatter",
    shortName: "JS",
    title: "JavaScript Formatter & Minifier — Free Online",
    description:
      "Format, beautify & minify JavaScript online. Basic code formatting with indent options. Free online JS formatter — no signup.",
    emoji: "⚡",
    category: "Developer",
    live: true,
    audience: "Frontend developers who need to quickly beautify a minified JavaScript snippet for reading or debugging",
    bottomLine: "Reformats JavaScript with proper indentation and can minify it back down with one click",
  },
  {
    slug: "remove-line-breaks",
    name: "Remove Lines",
    shortName: "Rm Lines",
    title: "Remove Line Breaks — Join Lines Online Free",
    description:
      "Remove line breaks and join lines with spaces, commas or custom separators. Preserve paragraph breaks option. Free — no signup.",
    emoji: "↩️",
    category: "Text Tools",
    live: true,
    audience: "Anyone who needs to join multi-line text into a single paragraph or comma-separated string",
    bottomLine: "Joins all lines into one block with any separator you choose between them",
  },
  {
    slug: "remove-empty-lines",
    name: "Remove Empty Lines",
    shortName: "Rm Empty",
    title: "Remove Empty Lines — Clean Text Online Free",
    description:
      "Remove blank and empty lines from text. Option to strip whitespace-only lines too. Free online tool — no signup required.",
    emoji: "🧹",
    category: "Text Tools",
    live: true,
    audience: "Developers cleaning up logs, code output, or pasted lists that have blank rows scattered throughout",
    bottomLine: "Deletes every blank line, including lines that contain only spaces or tabs",
  },
  {
    slug: "extract-emails",
    name: "Extract Emails",
    shortName: "Emails",
    title: "Extract Email Addresses from Text — Free Tool",
    description:
      "Extract all email addresses from any text. Deduplicate, sort & copy as list. Free online email extractor — no signup required.",
    emoji: "📧",
    category: "Text Tools",
    live: true,
    audience: "Marketers and recruiters pulling contact addresses out of raw text, web copy, or message threads",
    bottomLine: "Finds every valid email in pasted text and lists them clean, with optional deduplication",
  },
  {
    slug: "extract-urls",
    name: "Extract URLs",
    shortName: "URLs",
    title: "Extract URLs from Text — Free Online Tool",
    description:
      "Extract all URLs from any text block. Deduplicate, domain breakdown & copy as list. Free online URL extractor — no signup.",
    emoji: "🔗",
    category: "Text Tools",
    live: true,
    audience: "Content auditors and link checkers who need all URLs stripped from a block of mixed text",
    bottomLine: "Pulls every URL from messy text and lists them cleanly, with a domain-count breakdown",
  },
  {
    slug: "remove-html-tags",
    name: "Remove HTML",
    shortName: "Rm HTML",
    title: "Remove HTML Tags — Strip Tags Online Free",
    description:
      "Strip HTML and XML tags from text. Keep specific tags, decode entities. Free online HTML tag remover — no signup required.",
    emoji: "🏷️",
    category: "Text Tools",
    live: true,
    audience: "Content editors who receive HTML source code and just need the readable text without the markup",
    bottomLine: "Strips every HTML and XML tag, leaving only the visible text content behind",
  },
  {
    slug: "text-to-list",
    name: "Text to List",
    shortName: "To List",
    title: "Text to List Converter — Free Online Tool",
    description:
      "Convert paragraphs to bullet points, numbered lists, HTML or Markdown lists. Free online text to list converter — no signup.",
    emoji: "📋",
    category: "Text Tools",
    live: true,
    audience: "Writers who draft in prose but need to deliver bullet points or numbered lists for a doc or slide",
    bottomLine: "Converts flowing paragraph text into bullet, numbered, HTML, or Markdown list format",
  },
  {
    slug: "list-to-text",
    name: "List to Text",
    shortName: "To Text",
    title: "List to Text Converter — Remove Bullets Free",
    description:
      "Convert bulleted or numbered lists to flowing text. Auto-strips bullets, numbers & dashes. Free online tool — no signup required.",
    emoji: "📝",
    category: "Text Tools",
    live: true,
    audience: "Anyone converting a bulleted or numbered list back into readable paragraph prose",
    bottomLine: "Removes bullet symbols and numbers, joining list items into flowing connected text",
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numerals",
    shortName: "Roman",
    title: "Roman Numeral Converter — Free Online Tool",
    description:
      "Convert numbers to Roman numerals and back. Date mode, reference table. Free online Roman numeral converter — no signup.",
    emoji: "🏛️",
    category: "Generators",
    live: true,
    audience: "Students, publishers, and designers converting between Arabic numbers and Roman numeral notation",
    bottomLine: "Converts numbers to Roman numerals and back, with a date mode and reference chart",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code",
    shortName: "QR Code",
    title: "QR Code Generator — Create QR Codes Free",
    description:
      "Generate QR codes for URLs, text, email, phone & WiFi. Download as PNG. Free online QR code generator — no signup required.",
    emoji: "📱",
    category: "Generators",
    live: true,
    audience: "Business owners, event organizers, and marketers who need a printable QR code for a link or contact",
    bottomLine: "Generates QR codes for URLs, email, phone, WiFi, and plain text, downloadable as PNG",
  },
  {
    slug: "emoji-picker",
    name: "Emoji Picker",
    shortName: "Emoji",
    title: "Emoji Picker — Copy & Paste Emojis Free",
    description:
      "Search and copy emojis by name or category. Code points & shortcodes shown. Free online emoji picker — no signup required.",
    emoji: "😀",
    category: "Generators",
    live: true,
    audience: "Social media managers and chat users who need to find and copy the right emoji quickly by name",
    bottomLine: "Searches every emoji by name or category, with Unicode code points and shortcodes shown",
  },
  {
    slug: "smart-quotes-converter",
    name: "Smart Quotes",
    shortName: "Quotes",
    title: "Smart Quotes Converter — Curly to Straight Free",
    description:
      "Convert curly quotes to straight or straight to typographic quotes. Em dash conversion included. Free — no signup required.",
    emoji: "❝",
    category: "Text Tools",
    live: true,
    audience: "Writers and web developers who need consistent quotation mark style or need curly quotes removed",
    bottomLine: "Converts curly to straight quotes (or the reverse), with em-to-hyphen conversion included",
  },
  {
    slug: "unicode-lookup",
    name: "Unicode Lookup",
    shortName: "Unicode",
    title: "Unicode Character Lookup — Symbol Finder Free",
    description:
      "Search and copy Unicode characters by name or category. Code points, HTML entities & CSS values. Free — no signup required.",
    emoji: "🔍",
    category: "Generators",
    live: true,
    audience: "Developers and typographers who need to find obscure Unicode characters and their HTML or CSS values",
    bottomLine: "Searches Unicode by character name or category, showing code points, entities, and CSS escapes",
  },
];

/** Category display order and emoji labels */
export const TOOL_CATEGORIES: { name: ToolCategory; emoji: string }[] = [
  { name: "Text Tools", emoji: "📝" },
  { name: "Analysis", emoji: "📊" },
  { name: "Font Styles", emoji: "✨" },
  { name: "Developer", emoji: "⚡" },
  { name: "Encoding", emoji: "🔐" },
  { name: "Generators", emoji: "🎲" },
];

/** Get only tools that are live (shown in nav) */
export function getLiveTools() {
  return tools.filter((t) => t.live);
}

/** Get live tools grouped by category (in display order) */
export function getToolsByCategory() {
  const live = getLiveTools();
  return TOOL_CATEGORIES.map((cat) => ({
    ...cat,
    tools: live.filter((t) => t.category === cat.name),
  }));
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
