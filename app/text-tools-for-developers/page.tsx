import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/config";
import { FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AdSlot } from "@/components/ui/ad-slot";

const pageUrl = `${SITE_URL}/text-tools-for-developers`;

export const metadata: Metadata = {
  title: "Text Tools for Developers: Free Browser Tools (2026)",
  description:
    "Free browser-based text tools for developers. JSON formatter, regex tester, hash generator, UUID, JWT decoder, and 20+ more. No signup required.",
  alternates: { canonical: pageUrl },
  keywords: [
    "developer text tools",
    "free JSON formatter",
    "regex tester online",
    "hash generator",
    "UUID generator",
    "JWT decoder",
    "online developer tools",
    "code formatter free",
    "browser-based dev tools",
  ],
  robots: { index: true, follow: true, "max-snippet": -1 as unknown as undefined },
  openGraph: {
    title: "Text Tools for Developers: Free Browser Tools (2026)",
    description:
      "Free browser-based text tools for developers. JSON formatter, regex tester, hash generator, UUID, JWT decoder, and 20+ more. No signup required.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "Are these tools safe to use with sensitive data?",
    answer:
      "Yes. All FlipMyCase tools process text entirely in your browser using client-side JavaScript. No data is sent to any server. You can verify this by using the tools while offline after the page has loaded.",
  },
  {
    question: "Do these tools work offline?",
    answer:
      "Most tools work offline once the page has loaded, since all processing is client-side JavaScript. A few tools that generate visual output (like the QR code generator) may require an internet connection for specific features.",
  },
  {
    question: "Is there an API for these tools?",
    answer:
      "FlipMyCase does not currently offer an API. All tools are browser-based. For programmatic use, most of these functions are available in standard libraries for Python, Node.js, Go, and other languages.",
  },
  {
    question: "What is the largest text size these tools can handle?",
    answer:
      "Most tools handle texts up to several megabytes without issues. Performance depends on your browser and device. For very large files (100MB+), a command-line tool may be more efficient.",
  },
  {
    question: "Are these tools free forever?",
    answer:
      "Yes. FlipMyCase is free with no premium tier or paywalls. The site is supported by non-intrusive advertising.",
  },
];

export default function TextToolsForDevelopersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free Text Tools for Developers",
            description: metadata.description,
            url: pageUrl,
          }),
        }}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text Tools for Developers", href: "/text-tools-for-developers" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Tools for Developers
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          This page lists free browser-based text tools built for developers, including JSON formatter, regex tester, hash generator, and 20+ more utilities. Browse the tools below and start using them instantly — no signup required.
        </p>

        {/* ========== Code Formatting Tools ========== */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Formatting Tools</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">JSON Formatter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Format, validate, beautify, and minify JSON. Fix common syntax errors,
                explore data with tree view, export to CSV.
              </p>
            </Link>
            <Link
              href="/css-formatter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">CSS Formatter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Beautify or minify CSS with customizable indentation. Preserves string
                literals and comments.
              </p>
            </Link>
            <Link
              href="/html-formatter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">HTML Formatter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Format and beautify HTML with proper indentation. Handles void elements
                and minification.
              </p>
            </Link>
            <Link
              href="/javascript-formatter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">JavaScript Formatter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Beautify or minify JavaScript with string literal preservation and
                configurable indent.
              </p>
            </Link>
            <Link
              href="/sql-formatter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">SQL Formatter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Format SQL with uppercase keywords, proper indentation, and minification
                option.
              </p>
            </Link>
            <Link
              href="/xml-formatter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">XML Formatter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Format, validate, and minify XML with customizable indentation.
              </p>
            </Link>
            <Link
              href="/yaml-formatter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">YAML Formatter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Format and validate YAML. Convert between YAML and JSON bidirectionally.
              </p>
            </Link>
            <Link
              href="/markdown-preview"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Markdown Preview</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Live Markdown editor with HTML export and GitHub Flavored Markdown support.
              </p>
            </Link>
          </div>
        </section>

        <AdSlot slot="after-tool" page="text-tools-for-developers" />

        {/* ========== Encoding & Conversion Tools ========== */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Encoding &amp; Conversion Tools
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href="/binary-text-converter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Binary Text Converter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Convert text to binary (8-bit or 7-bit) and binary back to text with
                per-character breakdown.
              </p>
            </Link>
            <Link
              href="/hex-text-converter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Hex Text Converter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Convert text to hexadecimal and hex back to text with 0x prefix option.
              </p>
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">String Encoder</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Encode and decode text in Base64, URL, HTML entities, Unicode escape, hex,
                and binary formats.
              </p>
            </Link>
            <Link
              href="/rot13-encoder-decoder"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">ROT13 Cipher</h3>
              <p className="mt-1 text-xs text-neutral-400">
                ROT13, ROT5, ROT47, and custom Caesar cipher with adjustable rotation
                slider.
              </p>
            </Link>
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Number Base Converter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Convert between binary, octal, decimal, and hexadecimal with ASCII text
                mode.
              </p>
            </Link>
            <Link
              href="/unicode-lookup"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Unicode Lookup</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Search and copy Unicode characters by name, code point, or category.
              </p>
            </Link>
          </div>
        </section>

        {/* ========== Developer Utility Tools ========== */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Developer Utility Tools</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href="/hash-generator"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Hash Generator</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes. Supports file
                hashing, HMAC mode, and hash comparison.
              </p>
            </Link>
            <Link
              href="/password-generator"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Password Generator</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Generate strong passwords, passphrases, and PINs with entropy calculation
                and crack-time estimates.
              </p>
            </Link>
            <Link
              href="/uuid-generator"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">UUID Generator</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Generate random UUID v4 identifiers for databases, APIs, and distributed
                systems.
              </p>
            </Link>
            <Link
              href="/jwt-decoder"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">JWT Decoder</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Decode JWT tokens showing header, payload, algorithm, and expiration
                status.
              </p>
            </Link>
            <Link
              href="/regex-tester"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Regex Tester</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Test regex patterns with live highlighting, capture groups, replace mode,
                and common presets.
              </p>
            </Link>
            <Link
              href="/cron-expression-builder"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Cron Expression Builder</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Visual cron expression builder with natural language descriptions and next
                5 execution times.
              </p>
            </Link>
            <Link
              href="/unix-timestamp-converter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Unix Timestamp Converter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Convert Unix timestamps to human-readable dates and vice versa.
              </p>
            </Link>
            <Link
              href="/color-code-converter"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Color Code Converter</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Convert between HEX, RGB, HSL, and CMYK color formats with WCAG contrast
                checking.
              </p>
            </Link>
            <Link
              href="/slug-generator"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Slug Generator</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Convert titles and text to URL-friendly slugs in multiple formats.
              </p>
            </Link>
            <Link
              href="/qr-code-generator"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">QR Code Generator</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Generate QR codes for URLs, text, email, phone, and WiFi configurations.
              </p>
            </Link>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-tools-for-developers" />

        {/* ========== Data Tools ========== */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Data Tools</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href="/csv-to-json"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">CSV to JSON</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Bidirectional CSV to JSON converter with auto-delimiter detection and RFC
                4180 support.
              </p>
            </Link>
            <Link
              href="/html-to-markdown"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">HTML to Markdown</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Bidirectional HTML to Markdown converter supporting headings, links,
                images, lists, code, and tables.
              </p>
            </Link>
            <Link
              href="/text-diff"
              className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
            >
              <h3 className="text-sm font-semibold">Text Diff</h3>
              <p className="mt-1 text-xs text-neutral-400">
                Compare two texts side by side with word-level highlighting of additions,
                deletions, and changes.
              </p>
            </Link>
          </div>
        </section>

        {/* ========== Why Browser-Based Tools? ========== */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Browser-Based Tools?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">No install required</strong> — works
              in any modern browser on any operating system.
            </p>
            <p>
              <strong className="text-neutral-200">No account or signup</strong> — start
              using tools immediately.
            </p>
            <p>
              <strong className="text-neutral-200">Private by design</strong> — all
              processing happens in your browser, no data is ever sent to a server.
            </p>
            <p>
              <strong className="text-neutral-200">Fast for quick tasks</strong> — paste,
              convert, copy in seconds without switching to a terminal.
            </p>
            <p>
              <strong className="text-neutral-200">Works offline</strong> — most tools
              continue working after the page loads, even without an internet connection.
            </p>
          </div>
        </section>

        {/* ========== FAQ ========== */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="text-tools-for-developers" />

        {/* ========== Internal Linking ========== */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Explore our full collection of free browser-based text tools for developers
            and writers.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Case Converter
            </Link>
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              JSON Formatter
            </Link>
            <Link
              href="/regex-tester"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Regex Tester
            </Link>
            <Link
              href="/hash-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Hash Generator
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Word Counter
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Text Cleaner
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
