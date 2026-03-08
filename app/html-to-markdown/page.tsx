import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { HtmlToMarkdownTool } from "@/components/tools/html-to-markdown";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("html-to-markdown")!;
const pageUrl = buildUrl("/html-to-markdown");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "html to markdown", "markdown to html", "html to md converter", "convert html to markdown",
    "markdown converter online", "html markdown converter", "md to html", "html2markdown",
    "markdown to html online", "convert markdown to html", "free markdown converter",
    "html to markdown online",
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
    question: "What HTML elements does this converter support?",
    answer:
      "This converter handles headings (h1–h6), bold (strong, b), italic (em, i), links (a), images (img), ordered and unordered lists (ol, ul, li), code blocks (pre > code), inline code (code), blockquotes (blockquote), tables (table, tr, th, td), horizontal rules (hr), and paragraphs (p). Any unrecognized tags are stripped from the output.",
  },
  {
    question: "Can I convert Markdown back to HTML?",
    answer:
      "Yes. This is a bidirectional converter. Use the HTML → Markdown tab to convert HTML source code into Markdown, or switch to the Markdown → HTML tab to convert Markdown syntax into clean HTML. Both directions handle the same set of elements.",
  },
  {
    question: "How does the converter handle nested HTML?",
    answer:
      "The converter processes elements from the inside out using regex patterns. Nested structures like bold text inside a link, or lists inside blockquotes, are converted correctly in most cases. For extremely deep or unusual nesting, you may need minor manual adjustments.",
  },
  {
    question: "Does this converter use any external libraries?",
    answer:
      "No. All conversion is done with pure regex-based JavaScript running in your browser. There are no external dependencies, no server calls, and no data leaves your device. The converter is self-contained and works offline.",
  },
  {
    question: "How are tables converted between HTML and Markdown?",
    answer:
      "HTML tables are converted to Markdown pipe tables with a header separator row (using ---). The first row of the HTML table becomes the Markdown header. When converting from Markdown to HTML, pipe tables are converted to proper HTML table elements with thead and tbody sections.",
  },
  {
    question: "What happens to HTML attributes during conversion?",
    answer:
      "Most HTML attributes are stripped during conversion because Markdown does not support them. The exceptions are href on links and src/alt on images, which are preserved in the Markdown link and image syntax. Class names, IDs, styles, and data attributes are removed.",
  },
  {
    question: "Can I convert HTML emails to Markdown?",
    answer:
      "You can paste HTML email source code and convert the text content to Markdown. However, complex email layouts with tables-for-layout, inline styles, and nested divs may not convert perfectly since these are presentational constructs without Markdown equivalents. The converter works best with semantic HTML.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversion happens entirely in your browser using JavaScript regex transformations. Your HTML and Markdown content never leaves your device. There is no server-side processing, no logging, and no data storage.",
  },
];

export default function HtmlToMarkdownPage() {
  return (
    <>
      <WebAppSchema
        name="Free HTML to Markdown Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "HTML↔Markdown", href: "/html-to-markdown" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">HTML↔Markdown</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free HTML to Markdown Converter
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Convert HTML to Markdown and Markdown to HTML with bidirectional tabs.
          Handles headings, bold, italic, links, images, lists, code blocks, tables,
          and blockquotes. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <HtmlToMarkdownTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="html-to-markdown" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert HTML and Markdown
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your direction.</strong> Click
              HTML → Markdown to convert HTML source code into Markdown syntax, or
              Markdown → HTML to convert Markdown into clean HTML elements.
            </p>
            <p>
              <strong className="text-neutral-200">2. Paste your content.</strong> Drop
              your HTML or Markdown into the input box. The converter processes it in
              real time, handling headings, formatting, links, images, lists, code
              blocks, tables, and blockquotes.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the output.</strong> The
              converted result appears below with proper syntax. Check that nested
              elements and special characters are handled correctly.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy to copy the converted output to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding HTML and Markdown Conversion
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              HTML and Markdown are two of the most common text markup formats on
              the web. HTML (HyperText Markup Language) is the foundation of every
              web page, using angle-bracket tags to define structure and formatting.
              Markdown, created by John Gruber in 2004, is a lightweight syntax
              designed to be readable as plain text while converting cleanly to HTML.
              Converting between them is a daily task for content creators, developers,
              and technical writers.
            </p>
            <p>
              <strong className="text-neutral-200">Markdown simplifies content authoring.</strong> Writing
              content in HTML requires opening and closing tags for every element — a
              heading needs both &lt;h1&gt; and &lt;/h1&gt;, bold text needs
              &lt;strong&gt; tags. Markdown replaces these with simple characters: #
              for headings, ** for bold, * for italic, and - for list items. This
              makes Markdown significantly faster to write and easier to read in its
              raw form, which is why it has become the default format for README files,
              documentation sites, and content management systems.
            </p>
            <p>
              <strong className="text-neutral-200">HTML provides precise control.</strong> While
              Markdown covers the most common formatting needs, HTML supports
              attributes, classes, IDs, and custom elements that Markdown cannot
              express. When you need a specific class on a div, an inline style, or
              a custom data attribute, HTML is the only option. Converting Markdown
              to HTML is essential when publishing content to websites, email
              templates, or any system that expects HTML input.
            </p>
            <p>
              <strong className="text-neutral-200">Bidirectional conversion is practical.</strong> Developers
              often need to go both ways. A blog post written in Markdown needs to
              become HTML for the web. An HTML snippet from a web page needs to become
              Markdown for documentation. API responses in HTML need to be stored as
              Markdown in a CMS. Having both directions in one tool eliminates the
              need to switch between separate converters.
            </p>
            <p>
              Common use cases include migrating blog content between platforms,
              converting HTML documentation to Markdown for GitHub repos, preparing
              Markdown drafts for CMS systems that render HTML, extracting readable
              text from HTML email templates, and converting web page snippets into
              documentation format.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="html-to-markdown" />

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

        <AdSlot slot="before-footer" page="html-to-markdown" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert HTML and Markdown here, then use our other tools for formatting and encoding.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/markdown-preview"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📖</div>
              <div className="mt-1 text-sm font-semibold">Markdown Preview</div>
              <p className="mt-1 text-xs text-neutral-400">Live Markdown editor with rendered preview</p>
            </Link>
            <Link
              href="/sql-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🗄️</div>
              <div className="mt-1 text-sm font-semibold">SQL Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format SQL with uppercase keywords</p>
            </Link>
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/plain-text-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📄</div>
              <div className="mt-1 text-sm font-semibold">Plain Text Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Strip formatting and HTML tags</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
