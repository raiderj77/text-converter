import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { LineCounterTool } from "@/components/tools/line-counter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("line-counter")!;
const pageUrl = buildUrl("/line-counter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "line counter online", "count lines of text free", "line counter tool",
    "count lines in text", "online line counter", "text line counter",
    "count empty lines", "count non-empty lines", "line length statistics",
    "line length distribution", "number lines of text",
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
    question: "How does the line counter count lines?",
    answer:
      "The line counter splits your text on newline characters (\\n). Every line break creates a new line, so pasting 5 lines of text produces a count of 5. A single line with no line breaks counts as 1.",
  },
  {
    question: "What is the difference between empty lines and whitespace-only lines?",
    answer:
      "Empty lines contain zero characters — they are completely blank. Whitespace-only lines contain spaces, tabs, or other invisible characters but no visible text. Both types are counted separately so you can identify hidden whitespace in your data.",
  },
  {
    question: "What does the line length distribution show?",
    answer:
      "The histogram groups lines by character count into buckets and shows how many lines fall into each range. This helps you spot patterns — for example, whether your lines are uniformly short (like a list) or vary widely (like prose).",
  },
  {
    question: "How does the number lines feature work?",
    answer:
      "Click the 'Number Lines' button to see your text with a line number prefix on every line. The numbered output can be copied to clipboard for use in code reviews, documentation, or error reports.",
  },
  {
    question: "Can I use this to count lines in code files?",
    answer:
      "Yes. Paste any code, log file, CSV, or configuration file. The tool counts all lines regardless of content type. The empty vs non-empty breakdown is especially useful for code files where blank lines are used for readability.",
  },
  {
    question: "What are the longest and shortest line stats useful for?",
    answer:
      "These stats help identify outliers. A very long line in code may violate style guides (like the 80 or 120 character limit). In data files, an unusually short or long line may indicate a formatting error or missing data.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All counting and analysis happens entirely in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Is there a limit to how much text I can analyze?",
    answer:
      "There is no hard limit. The tool runs in your browser, so performance depends on your device. It handles tens of thousands of lines comfortably on modern devices.",
  },
];

export default function LineCounterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Line Counter Online"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Line Counter", href: "/line-counter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Line Counter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Line Counter — Count Lines of Text Online Free
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-400">
          Count total lines, non-empty lines, empty lines, and whitespace-only lines.
          See average line length, longest and shortest lines, and a visual line length
          distribution. Number your lines with one click. Free, no signup, browser-only.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <LineCounterTool />
        </div>

        <AdSlot slot="after-tool" page="line-counter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Line Counter
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Copy any
              text — code, logs, CSV data, prose — into the input area. Line counts
              and statistics update instantly as you type.
            </p>
            <p>
              <strong className="text-neutral-200">2. Review the counts.</strong> See
              total lines, non-empty lines, empty lines, and whitespace-only lines at a
              glance in the card grid.
            </p>
            <p>
              <strong className="text-neutral-200">3. Check line statistics.</strong> View
              the average characters per line, the longest line (with its content preview),
              and the shortest non-empty line.
            </p>
            <p>
              <strong className="text-neutral-200">4. Explore the distribution.</strong> The
              histogram shows how line lengths are distributed, helping you spot outliers
              and patterns.
            </p>
            <p>
              <strong className="text-neutral-200">5. Number your lines.</strong> Toggle
              line numbering to see each line prefixed with its number, then copy the
              result.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Line Counting Matters
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              Line counting is one of the most fundamental text analysis operations,
              yet it comes up constantly in software development, data processing,
              and content editing. Developers use line counts to estimate code
              complexity, enforce style guidelines, and track file size. Data
              engineers count lines to verify record counts in CSV exports, log
              files, and database dumps.
            </p>
            <p>
              <strong className="text-neutral-200">Code quality and style guides</strong> often
              enforce maximum line lengths — 80 characters for traditional terminals,
              120 for modern editors. This tool instantly reveals which lines exceed
              your threshold and shows the distribution of line lengths so you can
              assess how consistently your code follows the guideline.
            </p>
            <p>
              <strong className="text-neutral-200">Empty line analysis</strong> is
              surprisingly useful. In code, blank lines separate logical blocks and
              improve readability, but too many consecutive blank lines suggest sloppy
              formatting. In data files, unexpected empty lines can break parsers or
              indicate missing records. Whitespace-only lines are even more insidious
              because they look empty but contain hidden spaces or tabs that can cause
              subtle bugs.
            </p>
            <p>
              <strong className="text-neutral-200">Line numbering</strong> makes it easy to
              reference specific lines when discussing code in reviews, filing bug
              reports, or annotating text for editing. Instead of saying &quot;somewhere
              in the middle,&quot; you can point to exact line numbers.
            </p>
            <p>
              The line length distribution histogram reveals the shape of your text.
              Code tends to have a wide spread with most lines between 20 and 80
              characters. Prose paragraphs often produce a spike at longer lengths.
              Lists and configuration files cluster at shorter lengths. Recognizing
              these patterns helps you understand and clean your data faster.
            </p>
            <p>
              This tool processes everything locally in your browser. No data is
              transmitted to any server, making it safe for proprietary code,
              confidential logs, and sensitive data files.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="line-counter" />

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

        <AdSlot slot="before-footer" page="line-counter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Count lines here, then use our other text analysis tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📊</div>
              <div className="mt-1 text-sm font-semibold">Word Counter</div>
              <p className="mt-1 text-xs text-neutral-400">Count words, characters & reading time</p>
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
              href="/text-cleaner"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🧹</div>
              <div className="mt-1 text-sm font-semibold">Text Cleaner</div>
              <p className="mt-1 text-xs text-neutral-400">Remove extra spaces & hidden characters</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
