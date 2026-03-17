import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CssFormatterTool } from "@/components/tools/css-formatter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("css-formatter")!;
const pageUrl = buildUrl("/css-formatter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "css formatter", "css beautifier", "css formatter online", "css pretty print",
    "css minifier", "format css online", "css indent", "beautify css",
    "minify css online", "css formatter free", "css code formatter", "css cleanup",
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
    question: "What does a CSS formatter do?",
    answer:
      "A CSS formatter takes unformatted or minified CSS and adds proper indentation, line breaks, and consistent spacing so the code is easy to read. It can also minify CSS by removing all unnecessary whitespace to reduce file size for production.",
  },
  {
    question: "What is the difference between formatting and minifying CSS?",
    answer:
      "Formatting (beautifying) adds indentation and line breaks to make CSS human-readable. Minifying removes all whitespace, comments, and unnecessary characters to reduce file size. Use formatting during development and minifying for production deployments.",
  },
  {
    question: "Should I use 2 spaces, 4 spaces, or tabs for CSS indentation?",
    answer:
      "This depends on your team's style guide. 2 spaces is the most common convention in modern web development and keeps nested selectors compact. 4 spaces provides more visual separation. Tabs let each developer set their preferred display width. Most popular CSS style guides (like Google's) recommend 2 spaces.",
  },
  {
    question: "Should I preserve or remove comments when formatting CSS?",
    answer:
      "During development, preserve comments — they document your code, explain workarounds, and mark sections. When minifying for production, remove comments to reduce file size. Build tools like PostCSS and cssnano handle this automatically in most production workflows.",
  },
  {
    question: "How does CSS minification reduce file size?",
    answer:
      "CSS minification removes whitespace, line breaks, comments, and trailing semicolons. It can reduce CSS file size by 20-50% depending on how the original file was formatted. Combined with gzip compression on the server, minification significantly improves page load times.",
  },
  {
    question: "Can this tool fix CSS syntax errors?",
    answer:
      "This tool reformats valid CSS but does not fix syntax errors like missing semicolons, unmatched braces, or invalid property names. If your CSS has errors, you will need to fix them manually before formatting. The tool uses regex-based formatting so it is lenient with structure.",
  },
  {
    question: "Does this tool support SCSS or Less?",
    answer:
      "This tool is designed for standard CSS. SCSS and Less files may partially format correctly since they share similar syntax, but nested rules, variables, and mixins may not be handled perfectly. For SCSS/Less, consider using dedicated preprocessor tools.",
  },
  {
    question: "Is my CSS data sent to a server?",
    answer:
      "No. All formatting and minification happens entirely in your browser using JavaScript. Your CSS code never leaves your device.",
  },
];

export default function CssFormatterPage() {
  return (
    <>
      <WebAppSchema
        name="Free CSS Formatter & Minifier"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "CSS Formatter", href: "/css-formatter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">CSS Formatter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free CSS Formatter &amp; Minifier
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A CSS formatter and beautifier formats CSS with proper indentation and structure, or minifies it for production. Paste your CSS below to format, beautify, or minify it instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the CSS Formatter Tool</h2>

          <h2>CSS Formatter Features and Options</h2>

          <h2>About the Free Online CSS Formatter</h2>

        </div>


        <div className="mt-4">
          <CssFormatterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="css-formatter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Format CSS Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Click
              Format / Beautify to add proper indentation, or Minify to compress CSS
              into the smallest possible output.
            </p>
            <p>
              <strong className="text-neutral-200">2. Select indentation.</strong> When
              formatting, choose between 2 spaces, 4 spaces, or tabs. The output updates
              instantly when you change this setting.
            </p>
            <p>
              <strong className="text-neutral-200">3. Toggle comments.</strong> Choose
              whether to preserve or strip CSS comments from the output. Useful for
              cleaning up production CSS.
            </p>
            <p>
              <strong className="text-neutral-200">4. Paste your CSS.</strong> The
              formatter processes your input in real time. You see the formatted or
              minified output immediately.
            </p>
            <p>
              <strong className="text-neutral-200">5. Copy the result.</strong> Click
              Copy to send the formatted CSS to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why CSS Formatting Matters for Development
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              CSS formatting is one of those small practices that has an outsized impact
              on development speed. Well-formatted stylesheets are easier to scan, debug,
              and maintain. When every rule follows the same indentation pattern, you can
              quickly identify which properties belong to which selector, spot missing
              closing braces, and understand the cascade at a glance.
            </p>
            <p>
              <strong className="text-neutral-200">Consistent formatting reduces bugs.</strong> Many
              CSS bugs come from misplaced braces or properties applied to the wrong
              selector. When your code is properly indented, these structural issues become
              visually obvious. A missing closing brace stands out when the indentation
              suddenly shifts. A property that should be inside a media query is easy to
              spot when the nesting is clear.
            </p>
            <p>
              <strong className="text-neutral-200">Minification is essential for performance.</strong> In
              production, every byte matters. CSS minification typically reduces file size
              by 20-50% before gzip compression. For large stylesheets, this translates to
              measurably faster page loads, especially on mobile connections. Modern build
              tools automate minification, but having a quick online tool is invaluable for
              one-off tasks, debugging production CSS, or working outside your normal
              build pipeline.
            </p>
            <p>
              <strong className="text-neutral-200">Comment management is a balancing act.</strong> During
              development, comments explain why certain overrides exist, document browser-specific
              workarounds, and mark sections of a large stylesheet. But in production, comments
              add unnecessary weight. This tool lets you toggle comments on or off, making it
              easy to switch between development-friendly and production-ready output.
            </p>
            <p>
              Whether you are reformatting a vendor stylesheet, cleaning up legacy CSS,
              debugging a minified production file, or just standardizing indentation across
              a project, a quick CSS formatter saves time and reduces the friction of working
              with stylesheets.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="css-formatter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About CSS Formatter
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

        <AdSlot slot="before-footer" page="css-formatter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Format CSS here, then use our other formatters for HTML, JavaScript, JSON, and more.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/html-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🌐</div>
              <div className="mt-1 text-sm font-semibold">HTML Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, beautify & minify HTML</p>
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
              href="/xml-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📄</div>
              <div className="mt-1 text-sm font-semibold">XML Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, beautify & minify XML data</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
