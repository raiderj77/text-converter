import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { JsonFormatterTool } from "@/components/tools/json-formatter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("json-formatter")!;
const pageUrl = buildUrl("/json-formatter");

export const metadata: Metadata = {
  title: "Free JSON Formatter, Validator & Beautifier — Pretty Print JSON Online",
  description:
    "Format, validate, beautify, and minify JSON online. Tree view, error line numbers, fix broken JSON, export to CSV. Free JSON lint with no signup. Runs in your browser.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Free JSON Formatter, Validator & Beautifier Online",
    description:
      "Format, validate, and beautify JSON instantly. Tree view, fix broken JSON, export CSV. No ads, no signup.",
    url: pageUrl,
    type: "website",
  },
  keywords: [
    "json formatter",
    "json validator",
    "json beautifier",
    "pretty print json",
    "json minifier",
    "json lint online",
    "fix json online",
    "json to csv",
    "json tree viewer",
    "validate json api response",
    "format json online free",
    "json syntax checker",
    "json pretty print",
    "minify json online",
    "json fixer",
  ],
};

const faqItems = [
  {
    question: "What does this JSON formatter do?",
    answer:
      "It formats (beautifies), validates, minifies, and fixes JSON in your browser. You can pretty-print with 2 spaces, 4 spaces, or tabs. It also provides a collapsible tree view, detailed error messages with line numbers, JSON stats (keys, depth, types), and CSV export for array data.",
  },
  {
    question: "How do I validate JSON online?",
    answer:
      "Paste your JSON into the input box. The tool instantly validates it against the JSON specification (RFC 8259). If valid, you see a green checkmark with key and depth stats. If invalid, you see the exact error message and the line number where the problem occurs.",
  },
  {
    question: "Can this tool fix broken JSON?",
    answer:
      "Yes. Click the 'Fix JSON' button to automatically repair common issues: trailing commas, single quotes instead of double quotes, JavaScript-style comments, and unquoted keys. The tool parses the fixed JSON and formats it if successful.",
  },
  {
    question: "How do I pretty print JSON?",
    answer:
      "Paste your minified JSON into the input, choose your indentation (2 spaces, 4 spaces, or tabs), and click 'Format / Beautify'. The output is instantly formatted with proper indentation and line breaks. Click 'Copy Formatted' to copy the result.",
  },
  {
    question: "How do I minify JSON?",
    answer:
      "Paste your JSON, then click 'Minify'. All whitespace, indentation, and line breaks are removed to produce the smallest possible JSON string. This is useful for reducing payload size in API requests and configuration files.",
  },
  {
    question: "Can I export JSON to CSV?",
    answer:
      "Yes. If your JSON contains an array of objects, click 'Export CSV' to download a CSV file. Nested objects are flattened using dot notation (e.g., 'address.city'). The CSV can be opened in Excel, Google Sheets, or any spreadsheet application.",
  },
  {
    question: "What is the tree view?",
    answer:
      "The tree view displays your JSON as a collapsible hierarchy. Click the arrow next to any object or array to expand or collapse it. This makes it easy to navigate deeply nested structures and understand the shape of your data without scrolling through thousands of lines.",
  },
  {
    question: "Does this tool handle large JSON files?",
    answer:
      "Yes. All processing happens in your browser using native JavaScript parsing, which handles files up to several megabytes without issue. There is no file upload or server processing, so performance depends only on your device.",
  },
  {
    question: "Is my JSON data sent to a server?",
    answer:
      "No. All formatting, validation, fixing, and conversion happens entirely in your browser. Your data never leaves your device. Nothing is logged, stored, or transmitted.",
  },
  {
    question: "What JSON errors can the validator detect?",
    answer:
      "The validator detects all JSON syntax errors including: missing or extra commas, mismatched brackets and braces, unquoted keys, single quotes instead of double quotes, trailing commas, invalid escape sequences, and malformed numbers. Each error includes a description and approximate line number.",
  },
  {
    question: "Can I use this as a JSON lint tool?",
    answer:
      "Yes. This tool functions as a JSON linter — it checks your JSON for syntax errors and reports them with line numbers, similar to JSONLint. It goes further by also offering formatting, minification, tree view, fix, and CSV export in one tool.",
  },
  {
    question: "What is the difference between JSON formatting and JSON beautifying?",
    answer:
      "They are the same thing. Formatting (also called beautifying or pretty printing) adds indentation and line breaks to make JSON human-readable. Minifying is the opposite — it removes all whitespace to reduce file size.",
  },
];

export default function JsonFormatterPage() {
  return (
    <>
      <WebAppSchema
        name="Free JSON Formatter, Validator & Beautifier"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "JSON Formatter", href: "/json-formatter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free JSON Formatter, Validator &amp; Beautifier
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Format, validate, beautify, and minify JSON online. Fix broken JSON automatically.
          Explore data with a collapsible tree view. Export JSON to CSV. See exact error line
          numbers. All free, no signup, no ads — runs entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <JsonFormatterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="json-formatter" />

        {/* Section 1: How to — targets "how to format json online", "how to validate json", "how to pretty print json" */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Format and Validate JSON Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your JSON</strong> into the input
              box. Paste raw API responses, minified config files, or any JSON string. The
              tool validates your JSON instantly as you type.
            </p>
            <p>
              <strong className="text-neutral-200">2. Click Format / Beautify</strong> to
              pretty print your JSON with proper indentation. Choose 2 spaces, 4 spaces, or
              tab indentation to match your project style.
            </p>
            <p>
              <strong className="text-neutral-200">3. Switch to Tree View</strong> to explore
              deeply nested structures. Click any object or array to expand or collapse it.
              Perfect for navigating large API responses.
            </p>
            <p>
              <strong className="text-neutral-200">4. Fix broken JSON</strong> with one
              click. The auto-fixer repairs trailing commas, single quotes, comments, and
              unquoted keys — the four most common JSON syntax errors.
            </p>
            <p>
              <strong className="text-neutral-200">5. Export, copy, or download.</strong> Copy
              formatted or minified JSON to your clipboard. Download as a .json file. Export
              array data to CSV for spreadsheets.
            </p>
          </div>
        </section>

        {/* Section 2: Features — targets feature-specific long-tail keywords */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Everything You Need in One JSON Tool
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Most developers use 3-4 different tools to work with JSON. This one does it all.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "JSON Formatter & Beautifier",
                desc: "Pretty print JSON with 2-space, 4-space, or tab indentation. Matches your project conventions. Formats instantly — no waiting, no loading.",
              },
              {
                title: "JSON Validator & Lint",
                desc: "Validates against RFC 8259 with exact error messages and line numbers. Catches missing commas, mismatched brackets, invalid strings, and malformed numbers.",
              },
              {
                title: "JSON Minifier",
                desc: "Compress JSON by removing all whitespace. Reduces payload size for API responses, config files, and data transfer. One-click copy of minified output.",
              },
              {
                title: "Fix Broken JSON",
                desc: "Auto-repair trailing commas, single quotes, JavaScript comments, and unquoted keys. Fixes the 4 most common reasons JSON parsing fails.",
              },
              {
                title: "Collapsible Tree View",
                desc: "Explore JSON as an interactive tree. Expand and collapse objects and arrays. Navigate deeply nested structures without scrolling through walls of text.",
              },
              {
                title: "JSON to CSV Export",
                desc: "Convert JSON arrays to CSV files. Nested objects are flattened with dot notation. Open in Excel, Google Sheets, or any spreadsheet tool.",
              },
              {
                title: "JSON Stats & Analysis",
                desc: "See total keys, nesting depth, and type counts (objects, arrays, strings, numbers, booleans, nulls). Understand the shape of your data at a glance.",
              },
              {
                title: "100% Private — No Server",
                desc: "All processing happens in your browser. Your JSON never leaves your device. No data is logged, stored, or transmitted. Zero server calls.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <p className="mt-1 text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Use cases — targets "validate json api response", "format json config file", etc. */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a JSON Formatter
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Debugging API responses:</strong> Paste
              raw JSON from Postman, curl, browser DevTools, or server logs. Format it
              instantly to find the field you need. Use tree view for deeply nested responses.
            </p>
            <p>
              <strong className="text-neutral-200">Validating JSON config files:</strong> Check
              package.json, tsconfig.json, .eslintrc.json, and other config files for syntax
              errors before deploying. Catch missing commas and brackets before they break
              your build.
            </p>
            <p>
              <strong className="text-neutral-200">Fixing JSON from AI tools:</strong> ChatGPT,
              Claude, and other AI tools sometimes output JSON with trailing commas,
              comments, or single quotes. Paste it here and click Fix to clean it up
              automatically.
            </p>
            <p>
              <strong className="text-neutral-200">Optimizing API payloads:</strong> Minify
              JSON before sending it in API requests or storing it in databases. Smaller
              payloads mean faster transfers and lower bandwidth costs.
            </p>
            <p>
              <strong className="text-neutral-200">Converting JSON to spreadsheets:</strong> Export
              JSON arrays (API data, database exports, webhook payloads) to CSV for analysis
              in Excel or Google Sheets. No code required.
            </p>
            <p>
              <strong className="text-neutral-200">Learning and teaching JSON:</strong> Use
              the tree view to visualize JSON structure. See exactly how objects nest, how
              arrays contain items, and how different data types are represented.
            </p>
            <p>
              <strong className="text-neutral-200">Comparing JSON structures:</strong> Format
              two JSON documents with the same indentation, then use a text diff tool (like
              our Text Diff tool, coming soon) to spot the differences.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="json-formatter" />

        {/* Section 4: Common JSON errors — targets "json syntax error", "fix json trailing comma", etc. */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Common JSON Errors and How to Fix Them
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Trailing Commas",
                bad: '{ "a": 1, "b": 2, }',
                fix: "Remove the comma after the last property. The Fix JSON button does this automatically.",
              },
              {
                title: "Single Quotes",
                bad: "{ 'name': 'John' }",
                fix: "JSON requires double quotes for all strings and keys. Fix JSON converts single quotes to double quotes.",
              },
              {
                title: "Unquoted Keys",
                bad: '{ name: "John" }',
                fix: "All keys must be wrapped in double quotes. Fix JSON adds quotes to bare keys automatically.",
              },
              {
                title: "Comments in JSON",
                bad: '{ "port": 3000 // dev server }',
                fix: "Standard JSON does not support comments. Fix JSON strips single-line (//) and multi-line (/* */) comments.",
              },
              {
                title: "Missing Commas",
                bad: '{ "a": 1 "b": 2 }',
                fix: "Each property must be separated by a comma. The validator shows the exact line where the comma is missing.",
              },
              {
                title: "Mismatched Brackets",
                bad: '{ "items": [1, 2, 3 }',
                fix: "Every opening bracket [ or brace { must have a matching closing bracket ] or brace }. The validator identifies the mismatch location.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <code className="mt-2 block text-xs text-red-400 font-mono bg-neutral-950 rounded-lg px-3 py-2">
                  {item.bad}
                </code>
                <p className="mt-2 text-xs text-neutral-400">{item.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ — targets question-based queries */}
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
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="json-formatter" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Developer Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Format JSON here, then use our other tools to encode strings, convert text case,
            clean text, count words, or remove duplicates.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔐 String Encoder
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Word Counter
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🗑️ Duplicate Remover
            </Link>
            <Link
              href="/lorem-ipsum-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📝 Lorem Ipsum
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
