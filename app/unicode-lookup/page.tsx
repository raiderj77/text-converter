import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { UnicodeLookupTool } from "@/components/tools/unicode-lookup";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("unicode-lookup")!;
const pageUrl = buildUrl("/unicode-lookup");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "unicode character lookup", "unicode symbol finder", "unicode search",
    "copy unicode character", "unicode code point", "html entity lookup",
    "css content value", "unicode arrows", "unicode math symbols",
    "unicode currency symbols", "unicode checkmarks", "unicode stars",
    "unicode box drawing", "special characters", "symbol finder",
  ],
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is Unicode?",
    answer:
      "Unicode is the universal character encoding standard that assigns a unique code point to every character across all writing systems and symbol sets. It includes over 149,000 characters covering 161 modern and historic scripts, plus emoji and technical symbols. Unicode ensures that text looks the same regardless of the platform, device, or program being used.",
  },
  {
    question: "What is a code point (U+XXXX)?",
    answer:
      "A code point is the unique hexadecimal identifier assigned to each Unicode character. For example, the check mark is U+2713. The \"U+\" prefix indicates a Unicode code point. You can use code points in HTML (&#x2713;), CSS (content: \"\\2713\"), JavaScript (\"\\u2713\"), and most programming languages.",
  },
  {
    question: "How do I use the HTML entity?",
    answer:
      "HTML entities let you insert special characters in HTML documents. Named entities like &hearts; use memorable names. Numeric entities like &#10003; use the decimal code point. Both produce the same character in the browser. Use them when your HTML file encoding might not support the character directly.",
  },
  {
    question: "How do I use the CSS content value?",
    answer:
      "The CSS content property with Unicode escape sequences lets you insert characters in pseudo-elements (::before, ::after). For example: .icon::before { content: \"\\2714\"; } displays a heavy check mark. This is useful for decorative icons without adding extra HTML markup.",
  },
  {
    question: "Why do some characters look different across devices?",
    answer:
      "Unicode defines what a character means, not how it looks. Each operating system, browser, and font renders characters using its own glyph designs. Emoji are especially variable: Apple, Google, Microsoft, and Samsung all have distinct emoji art. Box drawing and math symbols are more consistent because fonts follow stricter conventions for these.",
  },
  {
    question: "Can I copy and paste these characters anywhere?",
    answer:
      "Yes. Click any character card to copy it to your clipboard. You can paste Unicode characters into most modern applications including text editors, word processors, social media, messaging apps, spreadsheets, and code editors. However, the character will only display correctly if the recipient's system has a font that includes that glyph.",
  },
  {
    question: "How many characters does this tool include?",
    answer:
      "This tool includes approximately 200 of the most commonly used Unicode characters across seven categories: Arrows, Math, Currency, Checkmarks, Stars & Shapes, Box Drawing, and Punctuation. These cover the vast majority of symbols that developers, designers, and writers need in everyday work.",
  },
];

export default function UnicodeLookupPage() {
  return (
    <>
      <WebAppSchema
        name="Free Unicode Character Lookup"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Unicode Lookup", href: "/unicode-lookup" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Unicode Lookup</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Unicode Character Lookup
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Search and copy Unicode characters by name or category. See code points,
          HTML entities, and CSS content values. Click any character to copy it.
          Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <UnicodeLookupTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="unicode-lookup" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use Unicode Lookup
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Search or browse.</strong> Type a
              character name in the search box (e.g., &quot;check mark&quot;, &quot;arrow&quot;,
              &quot;heart&quot;) or click a category tab to browse by type.
            </p>
            <p>
              <strong className="text-neutral-200">2. Find your character.</strong> Each
              result card shows the character in large format, its official Unicode name,
              code point (U+XXXX), HTML entity, and CSS content value.
            </p>
            <p>
              <strong className="text-neutral-200">3. Click to copy.</strong> Click any
              character card to copy the character to your clipboard. A toast notification
              confirms the copy.
            </p>
            <p>
              <strong className="text-neutral-200">4. Use the code.</strong> Use the code
              point, HTML entity, or CSS content value in your code. Each format works in
              different contexts: HTML entities in web pages, CSS values in stylesheets,
              and code points in programming languages.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            A Developer&#39;s Guide to Unicode Characters
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Unicode is the backbone of modern text handling. Before Unicode, dozens of
              competing character encoding standards (ASCII, ISO-8859, Windows-1252, Shift-JIS)
              made it nearly impossible to exchange text reliably between different systems and
              languages. Unicode solved this by assigning a unique number to every character in
              every writing system, creating a single universal standard that all modern
              software supports.
            </p>
            <p>
              <strong className="text-neutral-200">Encoding vs. characters.</strong> Unicode
              defines characters and their code points, but the actual bytes stored in a file
              depend on the encoding used. UTF-8, the most popular encoding on the web, uses
              one to four bytes per character. ASCII characters (U+0000 to U+007F) use a single
              byte, making UTF-8 backward-compatible with ASCII. Characters like arrows, math
              symbols, and currency signs use two or three bytes. Understanding this distinction
              matters when working with file sizes, database column lengths, and string
              manipulation in code.
            </p>
            <p>
              <strong className="text-neutral-200">Using symbols in web development.</strong> Web
              developers have three main ways to insert special characters. Direct Unicode
              characters work in any UTF-8 encoded HTML file. HTML entities (&amp;hearts; or
              &amp;#9829;) are useful when you want the character to be readable in the source
              code. CSS content values (content: &quot;\2665&quot;) let you add decorative characters
              through pseudo-elements without cluttering the HTML. Each approach has trade-offs
              in readability, maintainability, and accessibility.
            </p>
            <p>
              <strong className="text-neutral-200">Accessibility considerations.</strong> When
              using Unicode symbols as functional icons (like a checkmark for &quot;complete&quot;
              or an X for &quot;delete&quot;), always provide an accessible label via aria-label
              or visually hidden text. Screen readers may not announce Unicode symbols
              consistently, and some symbols have ambiguous pronunciations. For decorative
              symbols, use aria-hidden=&quot;true&quot; to prevent screen readers from
              announcing them at all.
            </p>
            <p>
              <strong className="text-neutral-200">Font coverage.</strong> Not every font
              includes glyphs for all Unicode characters. System fonts on modern operating
              systems cover the most common symbols, but box drawing characters, mathematical
              operators, and currency signs may require specific fonts. When using uncommon
              characters on the web, test across platforms or specify fallback fonts in your
              CSS font stack to ensure consistent rendering.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="unicode-lookup" />

        {/* FAQ */}
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

        <AdSlot slot="before-footer" page="unicode-lookup" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Look up Unicode characters here, then explore our other text tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/smart-quotes-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">&ldquo;</div>
              <div className="mt-1 text-sm font-semibold">Smart Quotes Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Convert curly and straight quotes</p>
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Encode &amp; decode Base64, URL, HTML &amp; more</p>
            </Link>
            <Link
              href="/hex-text-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔣</div>
              <div className="mt-1 text-sm font-semibold">Hex Text Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Convert text to hex and back</p>
            </Link>
            <Link
              href="/html-to-markdown"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📝</div>
              <div className="mt-1 text-sm font-semibold">HTML to Markdown</div>
              <p className="mt-1 text-xs text-neutral-400">Convert between HTML and Markdown</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
