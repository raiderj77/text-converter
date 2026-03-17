import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CsvToJsonConverterTool } from "@/components/tools/csv-to-json-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("csv-to-json")!;
const pageUrl = buildUrl("/csv-to-json");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "csv to json converter", "json to csv converter", "csv to json online",
    "json to csv online", "convert csv to json", "convert json to csv",
    "csv json converter", "csv to json free", "tsv to json",
    "csv parser online", "json to csv export", "csv converter online",
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
    question: "What is CSV format?",
    answer:
      "CSV (Comma-Separated Values) is a plain text format where each row is a line of text and values within a row are separated by commas. The first row typically contains column headers. CSV is widely used for spreadsheet exports, database dumps, and data exchange between applications.",
  },
  {
    question: "What is JSON format?",
    answer:
      "JSON (JavaScript Object Notation) is a lightweight data format that uses key-value pairs and arrays. It is the standard for web APIs, configuration files, and data storage. JSON supports strings, numbers, booleans, null values, arrays, and nested objects.",
  },
  {
    question: "What delimiters does this tool support?",
    answer:
      "This tool supports comma (,), tab, semicolon (;), and pipe (|) delimiters. The auto-detect option examines the first line of your CSV and chooses the most likely delimiter based on character frequency.",
  },
  {
    question: "How does first row as headers work?",
    answer:
      "When enabled, the first row of your CSV is used as property names in the JSON output, creating an array of objects. When disabled, the output is an array of arrays where each inner array represents a row. For most data, headers should be enabled.",
  },
  {
    question: "Can I convert JSON back to CSV?",
    answer:
      "Yes. Click the JSON to CSV button and paste your JSON. The tool accepts an array of objects (with automatic header extraction) or an array of arrays. Object keys become the CSV header row, and values become the data rows.",
  },
  {
    question: "How does the tool handle quoted fields?",
    answer:
      "The parser correctly handles CSV fields enclosed in double quotes, including fields containing commas, newlines, and escaped quotes (two consecutive double quotes represent a literal quote). This follows the RFC 4180 CSV standard.",
  },
  {
    question: "Is there a size limit?",
    answer:
      "Since all processing happens in your browser, the practical limit depends on your device's available memory. Most devices can handle files up to several megabytes without issues. For very large files, consider using a command-line tool like jq or csvkit.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversion happens in your browser using JavaScript. Your CSV and JSON data never leave your device.",
  },
];

export default function CsvToJsonPage() {
  return (
    <>
      <WebAppSchema
        name="Free CSV to JSON Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "CSV to JSON Converter", href: "/csv-to-json" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">CSV to JSON Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free CSV to JSON Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A CSV to JSON converter transforms comma-separated data into JSON format and vice versa. Paste your CSV or JSON below to convert between formats instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the CSV To JSON Tool</h2>

          <h2>CSV To JSON Features and Options</h2>

          <h2>About the Free Online CSV To JSON</h2>

        </div>


        <div className="mt-4">
          <CsvToJsonConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="csv-to-json" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert CSV to JSON Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your direction.</strong> Click
              CSV to JSON to convert spreadsheet data into JSON, or JSON to CSV to
              convert API data into a spreadsheet-friendly format.
            </p>
            <p>
              <strong className="text-neutral-200">2. Set your options.</strong> Select
              the delimiter if your data uses tabs, semicolons, or pipes instead of
              commas. Enable &quot;First Row as Headers&quot; to use column names as JSON keys.
            </p>
            <p>
              <strong className="text-neutral-200">3. Paste your data.</strong> The
              converter processes your input instantly. For CSV to JSON, the output is
              formatted JSON. For JSON to CSV, the output includes headers extracted from
              object keys.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy to copy the converted output to your clipboard, ready to paste into
              your project or application.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            CSV and JSON: When to Use Each Format
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              CSV and JSON are two of the most common data exchange formats in software
              development, yet they serve different purposes and have distinct strengths.
              Understanding when to use each format — and how to convert between them —
              is a practical skill that comes up frequently in data processing, API
              integration, and everyday development work.
            </p>
            <p>
              <strong className="text-neutral-200">CSV excels at tabular data.</strong> When
              your data fits neatly into rows and columns — like a database table, spreadsheet
              export, or log file — CSV is hard to beat. It is compact, human-readable,
              universally supported by spreadsheet applications (Excel, Google Sheets,
              LibreOffice), and easy to generate from SQL queries. CSV files are also
              significantly smaller than equivalent JSON files because they avoid the overhead
              of repeated key names.
            </p>
            <p>
              <strong className="text-neutral-200">JSON excels at structured data.</strong> When
              your data has nested relationships, varying fields per record, or complex types
              beyond simple strings, JSON is the better choice. JSON natively supports nested
              objects, arrays, booleans, numbers, and null values. It is the standard format
              for REST APIs, configuration files, NoSQL databases like MongoDB, and modern
              web application data exchange.
            </p>
            <p>
              <strong className="text-neutral-200">Converting between them</strong> is one of
              the most common data wrangling tasks. You might export a CSV from your database
              and need JSON for an API import. Or you might receive JSON from an API and need
              to analyze the data in a spreadsheet. This converter handles both directions,
              properly parsing quoted fields, auto-detecting delimiters, and extracting
              headers from JSON object keys.
            </p>
            <p>
              For production data pipelines, tools like jq, csvkit, and pandas offer more
              advanced features. But for quick one-off conversions, checking data formats,
              and prototyping API payloads, a browser-based converter saves time and avoids
              installing dependencies.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="csv-to-json" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About CSV To JSON
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

        <AdSlot slot="before-footer" page="csv-to-json" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert data formats here, then use our other developer tools for formatting,
            encoding, and text manipulation.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📊</div>
              <div className="mt-1 text-sm font-semibold">Text Sorter</div>
              <p className="mt-1 text-xs text-neutral-400">Sort lines alphabetically or numerically</p>
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🗑️</div>
              <div className="mt-1 text-sm font-semibold">Duplicate Remover</div>
              <p className="mt-1 text-xs text-neutral-400">Remove duplicate lines from any list</p>
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML, hex & binary encoding</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
