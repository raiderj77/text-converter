import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { JavascriptFormatterTool } from "@/components/tools/javascript-formatter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("javascript-formatter")!;
const pageUrl = buildUrl("/javascript-formatter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "javascript formatter", "js formatter", "javascript beautifier", "javascript formatter online",
    "js beautifier", "javascript minifier", "format javascript online", "js pretty print",
    "minify javascript online", "javascript code formatter", "js formatter free", "beautify js",
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
    question: "What does a JavaScript formatter do?",
    answer:
      "A JavaScript formatter takes unformatted or minified code and adds proper indentation, line breaks, and consistent spacing based on the code structure (braces, semicolons). This makes the code easier to read, debug, and maintain.",
  },
  {
    question: "What is the difference between formatting and minifying JavaScript?",
    answer:
      "Formatting (beautifying) adds indentation and line breaks to make code human-readable. Minifying removes all comments, unnecessary whitespace, and line breaks to reduce file size. Use formatting during development and minifying for production bundles.",
  },
  {
    question: "How accurate is regex-based JavaScript formatting?",
    answer:
      "Regex-based formatting handles common patterns well — function declarations, object literals, control structures, and basic nesting. However, it may not handle every edge case like template literals with nested expressions, complex destructuring, or unusual formatting. For production-grade formatting, use tools like Prettier or ESLint.",
  },
  {
    question: "Does this tool handle ES6+ syntax?",
    answer:
      "The formatter handles arrow functions, template literals, const/let declarations, destructuring, and other ES6+ syntax. Since it works by splitting on structural characters like braces and semicolons, most modern JavaScript patterns are formatted correctly.",
  },
  {
    question: "Should I use 2 spaces, 4 spaces, or tabs for JavaScript?",
    answer:
      "2 spaces is the most popular convention in the JavaScript ecosystem, used by React, Vue, Angular, and most major open source projects. 4 spaces is common in some enterprise codebases. Tabs allow personal preference for display width. Check your project's ESLint or Prettier config for the standard.",
  },
  {
    question: "How much does JavaScript minification reduce file size?",
    answer:
      "Minification typically reduces JavaScript file size by 30-60% before gzip compression. The savings come from removing comments, whitespace, and line breaks. Professional minifiers like Terser also shorten variable names and perform dead code elimination, which this basic tool does not do.",
  },
  {
    question: "Does this tool handle TypeScript?",
    answer:
      "TypeScript shares the same structural syntax as JavaScript (braces, semicolons, parentheses), so basic formatting works. However, type annotations, interfaces, and generics may not be formatted perfectly. For TypeScript-specific formatting, use Prettier with TypeScript support.",
  },
  {
    question: "Is my JavaScript code sent to a server?",
    answer:
      "No. All formatting and minification happens entirely in your browser. Your code never leaves your device. String literals are preserved using placeholder substitution to prevent them from being modified during formatting.",
  },
];

export default function JavascriptFormatterPage() {
  return (
    <>
      <WebAppSchema
        name="Free JavaScript Formatter & Minifier"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "JS Formatter", href: "/javascript-formatter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">JS Formatter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free JavaScript Formatter &amp; Minifier
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A JavaScript formatter and beautifier formats JS code with proper indentation, or minifies it for production. Paste your JavaScript below to format, beautify, or minify it instantly.
        </p>

        <ToolAnswerBlock slug="javascript-formatter" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Javascript Formatter Tool</h2>

          <h2>Javascript Formatter Features and Options</h2>

          <h2>About the Free Online Javascript Formatter</h2>

        </div>


        <div className="mt-4">
          <JavascriptFormatterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="javascript-formatter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Format JavaScript Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Click
              Format / Beautify to add proper indentation based on braces and semicolons,
              or Minify to strip all comments, whitespace, and line breaks.
            </p>
            <p>
              <strong className="text-neutral-200">2. Select indentation.</strong> When
              formatting, choose between 2 spaces, 4 spaces, or tabs. The output updates
              instantly.
            </p>
            <p>
              <strong className="text-neutral-200">3. Paste your JavaScript.</strong> The
              formatter processes your code in real time. String literals are preserved
              intact while structural formatting is applied.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy to send the formatted JavaScript to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            JavaScript Formatting in Modern Development
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              JavaScript is the most widely used programming language in the world, powering
              web browsers, servers (Node.js), mobile apps (React Native), and desktop
              applications (Electron). With such broad adoption, maintaining consistent
              code formatting across teams and projects is critical for collaboration and
              code quality.
            </p>
            <p>
              <strong className="text-neutral-200">Readable code is maintainable code.</strong> When
              JavaScript is properly formatted with consistent indentation, developers can
              quickly understand the control flow — which blocks are nested inside if
              statements, where function bodies begin and end, and how callbacks and
              promises chain together. Unformatted or minified code hides this structure,
              making debugging and code review significantly harder.
            </p>
            <p>
              <strong className="text-neutral-200">Minification is a production essential.</strong> Every
              JavaScript file sent to a browser adds to page load time. Minification reduces
              file size by removing comments, whitespace, and line breaks. Combined with gzip
              or Brotli compression on the server, minified JavaScript loads significantly
              faster. While bundlers like Webpack and Vite handle this automatically, a quick
              online minifier is useful for snippets, email templates, bookmarklets, and
              debugging production bundles.
            </p>
            <p>
              <strong className="text-neutral-200">String literal preservation matters.</strong> A
              common pitfall with naive code formatters is breaking string content by
              collapsing whitespace inside quotes. This tool uses placeholder substitution
              to extract string literals before formatting and restore them afterward,
              ensuring your strings remain exactly as written.
            </p>
            <p>
              For production-grade formatting with full AST parsing, tools like Prettier
              and ESLint are the standard. But for quick formatting tasks, debugging
              minified code, or formatting snippets outside your development environment,
              a fast browser-based formatter gets the job done in seconds.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="javascript-formatter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Javascript Formatter
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

        <AdSlot slot="before-footer" page="javascript-formatter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Format JavaScript here, then use our other formatters for CSS, HTML, JSON, and YAML.
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
              href="/html-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🌐</div>
              <div className="mt-1 text-sm font-semibold">HTML Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, beautify & minify HTML</p>
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
