import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { HtmlFormatterTool } from "@/components/tools/html-formatter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("html-formatter")!;
const pageUrl = buildUrl("/html-formatter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "html formatter", "html beautifier", "html formatter online", "html pretty print",
    "html minifier", "format html online", "html indent", "beautify html",
    "minify html online", "html formatter free", "html code formatter", "html tidy",
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
    question: "What does an HTML formatter do?",
    answer:
      "An HTML formatter takes unformatted or minified HTML and adds proper indentation and line breaks based on the nesting structure of tags. This makes the document hierarchy visible at a glance, helping you find elements, debug layout issues, and understand the page structure.",
  },
  {
    question: "What is the difference between formatting and minifying HTML?",
    answer:
      "Formatting (beautifying) adds indentation and line breaks to make HTML human-readable. Minifying removes all unnecessary whitespace and comments to reduce file size. Use formatting during development and debugging. Use minifying for production to improve page load times.",
  },
  {
    question: "What are void elements in HTML?",
    answer:
      "Void elements are HTML elements that cannot have child content and do not need closing tags. Examples include <br>, <hr>, <img>, <input>, <meta>, and <link>. The formatter recognizes these and does not increase indentation depth after them.",
  },
  {
    question: "Should I use 2 spaces, 4 spaces, or tabs for HTML indentation?",
    answer:
      "Most web development style guides recommend 2 spaces for HTML because deeply nested markup can push content far to the right with larger indentation. 4 spaces provides clearer visual separation. Tabs allow each developer to configure their own display width. Choose whatever matches your project conventions.",
  },
  {
    question: "Does HTML minification affect how the page renders?",
    answer:
      "In most cases, minifying HTML does not change how the page renders. However, whitespace-sensitive elements like <pre>, <code>, and <textarea> may be affected. Also, inline elements may lose spacing between them when whitespace is removed. Test your minified output to confirm it renders correctly.",
  },
  {
    question: "Can this tool fix broken HTML?",
    answer:
      "This tool formats and indents valid HTML but does not fix structural errors like missing closing tags, mismatched elements, or invalid nesting. If your HTML has errors, the formatter will still attempt to indent it, but the output may not be perfect. Fix structural issues before formatting for best results.",
  },
  {
    question: "Does this tool handle inline JavaScript and CSS?",
    answer:
      "The formatter treats inline <script> and <style> content as regular text nodes. It will indent the opening and closing tags properly but does not reformat the JavaScript or CSS code inside them. Use our dedicated CSS Formatter and JavaScript Formatter for those languages.",
  },
  {
    question: "Is my HTML data sent to a server?",
    answer:
      "No. All formatting and minification happens entirely in your browser using JavaScript regex-based tokenization. Your HTML code never leaves your device.",
  },
];

export default function HtmlFormatterPage() {
  return (
    <>
      <WebAppSchema
        name="Free HTML Formatter & Beautifier"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "HTML Formatter", href: "/html-formatter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">HTML Formatter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free HTML Formatter &amp; Beautifier
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An HTML formatter and beautifier formats HTML with proper indentation and tag structure, or minifies it for production. Paste your HTML below to format, beautify, or minify it instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the HTML Formatter Tool</h2>

          <h2>HTML Formatter Features and Options</h2>

          <h2>About the Free Online HTML Formatter</h2>

        </div>


        <div className="mt-4">
          <HtmlFormatterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="html-formatter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Format HTML Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Click
              Format / Beautify to add proper indentation based on tag nesting, or
              Minify to strip all unnecessary whitespace and comments.
            </p>
            <p>
              <strong className="text-neutral-200">2. Select indentation.</strong> When
              formatting, choose between 2 spaces, 4 spaces, or tabs. The output updates
              instantly when you change this setting.
            </p>
            <p>
              <strong className="text-neutral-200">3. Paste your HTML.</strong> The
              formatter tokenizes tags and text, tracks nesting depth, and produces
              clean indented output in real time.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy to send the formatted HTML to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Clean HTML Formatting Matters
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              HTML is the structural backbone of every web page. Whether you are building
              a simple landing page or a complex web application, the quality of your HTML
              markup directly affects maintainability, accessibility, and debugging speed.
              Properly formatted HTML makes the document structure immediately visible,
              turning a wall of tags into a readable hierarchy.
            </p>
            <p>
              <strong className="text-neutral-200">Indentation reveals structure.</strong> HTML
              documents can be deeply nested — a div inside a section inside a main element,
              with lists, forms, and tables adding more layers. Without indentation, it is
              nearly impossible to tell which closing tag matches which opening tag. Proper
              formatting makes parent-child relationships obvious and helps you spot
              structural problems like missing closing tags or incorrect nesting.
            </p>
            <p>
              <strong className="text-neutral-200">Minification improves performance.</strong> For
              production sites, removing whitespace and comments from HTML can reduce page
              size significantly. While HTML compression is often handled by build tools
              and server-side gzip, having a quick online minifier is valuable for one-off
              tasks, email templates, and situations where you do not have access to a
              full build pipeline.
            </p>
            <p>
              <strong className="text-neutral-200">Void elements need special handling.</strong> HTML
              has self-closing elements like &lt;br&gt;, &lt;hr&gt;, &lt;img&gt;, and &lt;input&gt;
              that do not have closing tags and should not increase indentation depth. A good
              HTML formatter recognizes these void elements and handles them correctly, unlike
              generic text indenters that treat all tags the same way.
            </p>
            <p>
              Whether you are reformatting HTML from a CMS, cleaning up generated markup,
              debugging a page layout, or preparing an email template, having a fast and
              reliable HTML formatter in your browser saves time every day.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="html-formatter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About HTML Formatter
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

        <AdSlot slot="before-footer" page="html-formatter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Format HTML here, then use our other formatters for CSS, JavaScript, JSON, and XML.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/css-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🎨</div>
              <div className="mt-1 text-sm font-semibold">CSS Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, beautify & minify CSS</p>
            </Link>
            <Link
              href="/javascript-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">⚡</div>
              <div className="mt-1 text-sm font-semibold">JS Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, beautify & minify JavaScript</p>
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
              href="/yaml-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📝</div>
              <div className="mt-1 text-sm font-semibold">YAML Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & convert YAML</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
