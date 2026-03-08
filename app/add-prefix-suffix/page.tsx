import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AddPrefixSuffixTool } from "@/components/tools/add-prefix-suffix";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("add-prefix-suffix")!;
const pageUrl = buildUrl("/add-prefix-suffix");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "add prefix suffix to each line", "prepend append text to lines",
    "add text before each line", "add text after each line",
    "prefix suffix tool", "bulk add prefix", "bulk add suffix",
    "wrap lines in quotes", "wrap lines in parentheses",
    "add bullet points to lines", "add HTML li tags",
    "line prefix tool", "line suffix tool", "text prefix online",
    "prepend text to lines", "append text to lines",
    "add comma to each line", "wrap text online free",
    "batch text prefix", "multiline prefix suffix",
    "text line wrapper", "free prefix suffix tool",
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
    question: "How does this prefix/suffix tool work?",
    answer:
      "Paste your text with one item per line, then type a prefix (text added before each line) and/or a suffix (text added after each line). The output updates live as you type. Empty lines are preserved but not modified. All processing happens in your browser — nothing is sent to a server.",
  },
  {
    question: "Can I add both a prefix and suffix at the same time?",
    answer:
      "Yes. Fill in both the prefix and suffix fields to wrap each line. For example, set prefix to '\"' and suffix to '\"' to wrap every line in double quotes. Use one or both fields depending on your needs.",
  },
  {
    question: "What are the preset buttons?",
    answer:
      "Presets are one-click shortcuts for common wrapping patterns: wrap in double quotes, wrap in parentheses, wrap in HTML <li> tags, add a bullet point before each line, or add a comma after each line. Click a preset to fill in the prefix and suffix fields automatically.",
  },
  {
    question: "Does the tool modify empty lines?",
    answer:
      "No. Empty lines (lines with only whitespace) are preserved in the output exactly as they appear in the input. Only lines with actual content receive the prefix and suffix. This keeps your text structure intact.",
  },
  {
    question: "Can I use special characters or HTML in the prefix/suffix?",
    answer:
      "Yes. You can type any text into the prefix and suffix fields, including HTML tags like <li></li>, special characters, Unicode symbols, or even multi-character strings. The tool treats them as plain text and prepends/appends them to each line.",
  },
  {
    question: "Is there a limit on input size?",
    answer:
      "There is no hard limit, but performance depends on your browser and device. The tool handles thousands of lines efficiently since all processing happens in memory. For very large files (50,000+ lines), consider processing in batches.",
  },
];

export default function AddPrefixSuffixPage() {
  return (
    <>
      <WebAppSchema
        name="Free Add Prefix & Suffix Tool"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Add Prefix/Suffix", href: "/add-prefix-suffix" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Add Prefix & Suffix to Each Line
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Add a prefix, suffix, or both to every line of text. Use preset buttons for quotes, parentheses,
          HTML li tags, bullet points, and commas. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <AddPrefixSuffixTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="add-prefix-suffix" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Add Prefix and Suffix to Text
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input box with one
              item per line. The tool accepts any text: names, URLs, file paths, code snippets, or plain
              words. Use the example button to see a demo list.
            </p>
            <p>
              <strong className="text-neutral-200">2. Enter a prefix and/or suffix.</strong> Type the text
              you want added before each line in the prefix field, and the text you want added after each
              line in the suffix field. Use one or both fields.
            </p>
            <p>
              <strong className="text-neutral-200">3. Use presets for common patterns.</strong> Click a
              preset button to instantly fill in the prefix and suffix for wrapping in quotes, parentheses,
              HTML li tags, bullet points, or trailing commas.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the output.</strong> The right panel updates
              live as you type. Click the copy button to copy the transformed text to your clipboard,
              ready to paste into your editor, spreadsheet, or code file.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Prefix/Suffix Tool
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Programming and development:</strong> Wrap variable
              names in quotes to build SQL IN clauses, add commas to create CSV data, or prepend indentation
              to code blocks. Convert plain lists into HTML list items with &lt;li&gt; tags, or add
              semicolons to the end of CSS property lines.
            </p>
            <p>
              <strong className="text-neutral-200">Data formatting:</strong> Add quotation marks around
              each value for CSV or JSON formatting. Prepend column headers, add delimiters, or wrap
              entries in brackets for array notation. Transform raw data exports into structured formats
              ready for import.
            </p>
            <p>
              <strong className="text-neutral-200">Content creation:</strong> Add bullet points or
              numbered prefixes to plain text lists. Wrap items in parentheses for citations or references.
              Prepend emoji or symbols for social media formatting, or add hashtags before each keyword.
            </p>
            <p>
              <strong className="text-neutral-200">Batch file operations:</strong> Prepend file paths
              or directory names to file lists. Add extensions or suffixes to batch rename files. Build
              command-line arguments by prepending flags like --include= to each line in a list.
            </p>
            <p>
              <strong className="text-neutral-200">Database and SQL:</strong> Wrap values in single
              quotes for SQL INSERT statements. Add commas between values for bulk inserts. Prepend
              table names or schema prefixes to column lists for multi-table queries.
            </p>
            <p>
              <strong className="text-neutral-200">Markdown and documentation:</strong> Add list markers
              (-, *, or numbered) to lines for Markdown lists. Wrap text in backticks for inline code
              formatting. Prepend &gt; for blockquotes or add indentation for nested structures.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="add-prefix-suffix" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Common Prefix/Suffix Patterns
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: 'Wrap in Double Quotes',
                desc: 'Prefix: " Suffix: " — Turns each line into a quoted string. Essential for SQL IN clauses, JSON arrays, and CSV formatting.',
              },
              {
                title: "Wrap in Parentheses",
                desc: "Prefix: ( Suffix: ) — Enclose each line in parentheses for citations, mathematical expressions, or function arguments.",
              },
              {
                title: "HTML List Items",
                desc: "Prefix: <li> Suffix: </li> — Convert plain text lines into HTML list items. Paste into a <ul> or <ol> element for instant lists.",
              },
              {
                title: "Bullet Points",
                desc: "Prefix: \u2022 (bullet) — Add Unicode bullet characters before each line. Great for presentations, documents, and formatted text.",
              },
              {
                title: "Trailing Commas",
                desc: "Suffix: , — Add a comma after each line for creating comma-separated values or array elements in code.",
              },
              {
                title: "Custom Wrappers",
                desc: "Use any text as prefix/suffix: square brackets, curly braces, XML tags, Markdown formatting, or multi-character strings.",
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

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Tips for Power Users
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Chain with other tools:</strong> Use the Text Sorter
              to alphabetize your list first, then add prefixes and suffixes. Or use the Duplicate Remover
              to clean up your list before wrapping each line. Combine tools for complex text workflows.
            </p>
            <p>
              <strong className="text-neutral-200">SQL IN clause trick:</strong> Paste your values, set
              prefix to a single quote and suffix to a single quote followed by a comma. Copy the output,
              remove the trailing comma from the last line, and wrap in parentheses for a ready-to-use
              SQL IN clause.
            </p>
            <p>
              <strong className="text-neutral-200">Build arrays:</strong> Add prefix [ and suffix ],
              then paste the result into your code. For JSON arrays, wrap in quotes first, add commas,
              then manually add the outer brackets. Works for JavaScript, Python, PHP, and more.
            </p>
            <p>
              <strong className="text-neutral-200">HTML generation:</strong> Convert a plain list of
              items into HTML markup instantly. Use &lt;li&gt; tags for lists, &lt;option&gt; tags for
              select dropdowns, or &lt;td&gt; tags for table cells. Save time on repetitive HTML coding.
            </p>
            <p>
              <strong className="text-neutral-200">Markdown lists:</strong> Add "- " as a prefix to
              turn plain text into a Markdown unordered list. Use "1. " for ordered lists. Combine with
              the Text Cleaner to remove existing bullets before adding new formatting.
            </p>
            <p>
              <strong className="text-neutral-200">Batch commands:</strong> Prepend "mv " or "cp " to
              file names to build shell commands. Add target paths as suffixes. Generate entire batch
              scripts from a simple list of file names — just paste the output into your terminal.
            </p>
          </div>
        </section>

        <AdSlot slot="before-footer" page="add-prefix-suffix" />

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
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            FlipMyCase offers a suite of free browser-based text tools. Add prefixes and suffixes here,
            then use other tools for additional text processing.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Text Sorter
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🗑️ Duplicate Remover
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ↔️ Text Reverser
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
