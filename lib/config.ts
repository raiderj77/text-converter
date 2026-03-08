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
};

export const tools: Tool[] = [
  {
    slug: "",
    name: "Case Converter",
    shortName: "Case",
    title: "Text Case Converter — camelCase, snake_case, Title Case & More | Free",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case & more instantly. Free online tool — no signup required.",
    emoji: "🔄",
    category: "Text Tools",
    live: true,
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    shortName: "Words",
    title: "Word Counter & Character Count — Free Online Tool",
    description:
      "Count words, characters, sentences, paragraphs & reading time. Keyword density included. Free online word counter — no signup.",
    emoji: "📊",
    category: "Analysis",
    live: true,
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
  },
  {
    slug: "string-encoder",
    name: "String Encoder",
    shortName: "Encode",
    title: "String Encoder & Decoder — Base64, URL & More Free",
    description:
      "Encode & decode Base64, URL, HTML entities, hex & binary strings instantly. Free online tool — no signup required.",
    emoji: "🔐",
    category: "Encoding",
    live: true,
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortName: "JSON",
    title: "JSON Formatter & Validator — Pretty Print or Minify JSON Free",
    description:
      "Format, validate, beautify & minify JSON online. Tree view, error detection & CSV export. Free tool — no signup required.",
    emoji: "{ }",
    category: "Developer",
    live: true,
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
  },
  { slug: "morse-code-translator", name: "Morse Code", shortName: "Morse", title: "Morse Code Translator — Encode & Decode Free", description: "Translate text to Morse code and back. Audio playback, speed control & reference chart. Free online Morse code translator — no signup.", emoji: "📡", category: "Encoding",
    live: true },
  { slug: "rot13-encoder-decoder", name: "ROT13 Cipher", shortName: "ROT13", title: "ROT13 Encoder Decoder — Caesar Cipher Free", description: "Encode and decode ROT13, ROT5, ROT47 & custom Caesar ciphers. Free online cipher tool — no signup required.", emoji: "🔓", category: "Encoding",
    live: true },
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
  },
  { slug: "nato-phonetic-alphabet", name: "NATO Phonetic", shortName: "NATO", title: "NATO Phonetic Alphabet Converter — Free Tool", description: "Convert text to NATO phonetic alphabet (Alpha, Bravo, Charlie). Full reference table included. Free — no signup required.", emoji: "🎖️", category: "Encoding",
    live: true },
  { slug: "pig-latin-converter", name: "Pig Latin", shortName: "Pig Latin", title: "Pig Latin Translator — Convert Text Free", description: "Convert English to Pig Latin and back. Preserves punctuation & capitalization. Free online Pig Latin translator — no signup.", emoji: "🐷", category: "Encoding",
    live: true },
  { slug: "sql-formatter", name: "SQL Formatter", shortName: "SQL", title: "SQL Formatter & Beautifier — Free Online", description: "Format SQL with uppercase keywords, proper indentation & minification. Free online SQL formatter — no signup required.", emoji: "🗄️", category: "Developer",
    live: true },
  { slug: "html-to-markdown", name: "HTML↔Markdown", shortName: "HTML/MD", title: "HTML to Markdown Converter — Free Online", description: "Convert HTML to Markdown and Markdown to HTML. Handles headings, lists, links, code & tables. Free online converter — no signup.", emoji: "📝", category: "Developer",
    live: true },
  { slug: "cron-expression-builder", name: "Cron Builder", shortName: "Cron", title: "Cron Expression Builder — Generator Free", description: "Build cron expressions visually with presets, natural language descriptions & next execution times. Free online cron generator — no signup.", emoji: "⏰", category: "Developer",
    live: true },
  { slug: "jwt-decoder", name: "JWT Decoder", shortName: "JWT", title: "JWT Decoder — Decode JWT Tokens Free", description: "Decode JWT tokens to see header and payload. Expiration status, issued time & algorithm. Free online JWT decoder — no signup.", emoji: "🔑", category: "Developer",
    live: true },
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
  },
  { slug: "remove-line-breaks", name: "Remove Lines", shortName: "Rm Lines", title: "Remove Line Breaks — Join Lines Online Free", description: "Remove line breaks and join lines with spaces, commas or custom separators. Preserve paragraph breaks option. Free — no signup.", emoji: "↩️", category: "Text Tools",
    live: true },
  { slug: "remove-empty-lines", name: "Remove Empty Lines", shortName: "Rm Empty", title: "Remove Empty Lines — Clean Text Online Free", description: "Remove blank and empty lines from text. Option to strip whitespace-only lines too. Free online tool — no signup required.", emoji: "🧹", category: "Text Tools",
    live: true },
  { slug: "extract-emails", name: "Extract Emails", shortName: "Emails", title: "Extract Email Addresses from Text — Free Tool", description: "Extract all email addresses from any text. Deduplicate, sort & copy as list. Free online email extractor — no signup required.", emoji: "📧", category: "Text Tools",
    live: true },
  { slug: "extract-urls", name: "Extract URLs", shortName: "URLs", title: "Extract URLs from Text — Free Online Tool", description: "Extract all URLs from any text block. Deduplicate, domain breakdown & copy as list. Free online URL extractor — no signup.", emoji: "🔗", category: "Text Tools",
    live: true },
  { slug: "remove-html-tags", name: "Remove HTML", shortName: "Rm HTML", title: "Remove HTML Tags — Strip Tags Online Free", description: "Strip HTML and XML tags from text. Keep specific tags, decode entities. Free online HTML tag remover — no signup required.", emoji: "🏷️", category: "Text Tools",
    live: true },
  { slug: "text-to-list", name: "Text to List", shortName: "To List", title: "Text to List Converter — Free Online Tool", description: "Convert paragraphs to bullet points, numbered lists, HTML or Markdown lists. Free online text to list converter — no signup.", emoji: "📋", category: "Text Tools",
    live: true },
  { slug: "list-to-text", name: "List to Text", shortName: "To Text", title: "List to Text Converter — Remove Bullets Free", description: "Convert bulleted or numbered lists to flowing text. Auto-strips bullets, numbers & dashes. Free online tool — no signup required.", emoji: "📝", category: "Text Tools",
    live: true },
  { slug: "roman-numeral-converter", name: "Roman Numerals", shortName: "Roman", title: "Roman Numeral Converter — Free Online Tool", description: "Convert numbers to Roman numerals and back. Date mode, reference table. Free online Roman numeral converter — no signup.", emoji: "🏛️", category: "Generators",
    live: true },
  { slug: "qr-code-generator", name: "QR Code", shortName: "QR Code", title: "QR Code Generator — Create QR Codes Free", description: "Generate QR codes for URLs, text, email, phone & WiFi. Download as PNG. Free online QR code generator — no signup required.", emoji: "📱", category: "Generators",
    live: true },
  { slug: "emoji-picker", name: "Emoji Picker", shortName: "Emoji", title: "Emoji Picker — Copy & Paste Emojis Free", description: "Search and copy emojis by name or category. Code points & shortcodes shown. Free online emoji picker — no signup required.", emoji: "😀", category: "Generators",
    live: true },
  { slug: "smart-quotes-converter", name: "Smart Quotes", shortName: "Quotes", title: "Smart Quotes Converter — Curly to Straight Free", description: "Convert curly quotes to straight or straight to typographic quotes. Em dash conversion included. Free — no signup required.", emoji: "❝", category: "Text Tools",
    live: true },
  { slug: "unicode-lookup", name: "Unicode Lookup", shortName: "Unicode", title: "Unicode Character Lookup — Symbol Finder Free", description: "Search and copy Unicode characters by name or category. Code points, HTML entities & CSS values. Free — no signup required.", emoji: "🔍", category: "Generators",
    live: true },
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
