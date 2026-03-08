import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AddLineNumbersTool } from "@/components/tools/add-line-numbers";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("add-line-numbers")!;
const pageUrl = buildUrl("/add-line-numbers");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "add line numbers to text", "number lines of text", "add line numbers online",
    "line numbering tool", "number lines online", "text line numbering",
    "add line numbers to text online", "remove line numbers from text",
    "strip line numbers", "line number generator", "number text lines",
    "prepend line numbers", "zero padded line numbers", "custom line numbering",
    "line number formatter", "add numbers to lines free",
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
    question: "How do I add line numbers to text?",
    answer:
      "Paste your text into the input area and the tool instantly adds sequential line numbers to every line. You can customize the starting number, separator style (period, parenthesis, tab, or colon), and enable zero padding for consistent formatting.",
  },
  {
    question: "What separator options are available?",
    answer:
      "Four separator styles are available: period (1. text), parenthesis (1) text), tab (1\\ttext), and colon (1: text). The period format is the most common for numbered lists, while tab separators are useful for importing into spreadsheets.",
  },
  {
    question: "What does zero padding do?",
    answer:
      "Zero padding adds leading zeros so all line numbers have the same width. For example, in a 100-line document, line 1 becomes 001 and line 10 becomes 010. This keeps text aligned and is useful for code listings, legal documents, and data files.",
  },
  {
    question: "Can I start numbering from a number other than 1?",
    answer:
      "Yes. Change the Starting Number field to any number (0 or higher). This is useful when you need to continue numbering from a previous section or start from zero for programming contexts.",
  },
  {
    question: "How do I remove line numbers from text?",
    answer:
      "Switch to 'Remove Line Numbers' mode. The tool detects and strips common line number patterns including periods (1.), parentheses (1)), colons (1:), and tabs. It handles both padded (01.) and unpadded (1.) formats.",
  },
  {
    question: "Is my text processed securely?",
    answer:
      "Yes. All processing happens entirely in your browser using JavaScript. Your text is never sent to any server, making it safe for confidential documents, legal text, code, and private content.",
  },
];

export default function AddLineNumbersPage() {
  return (
    <>
      <WebAppSchema
        name="Free Add Line Numbers Tool"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Add Line Numbers", href: "/add-line-numbers" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Add Line Numbers</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Add Line Numbers to Text — Free Online
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-400">
          Add or remove line numbers from any text instantly. Customize the starting number,
          separator style, and zero padding. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <AddLineNumbersTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="add-line-numbers" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Add Line Numbers to Text Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input
              area. The tool accepts any plain text: code snippets, legal documents, poetry,
              transcripts, or data files. Use the example button to see a demo.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose your options.</strong> Set the
              starting number, pick a separator style (period, parenthesis, tab, or colon),
              and toggle zero padding for uniform width. Switch to remove mode to strip
              existing numbers.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result.</strong> The numbered
              output appears instantly below the input. Click the Copy button to copy the
              result to your clipboard for pasting into documents, emails, or code editors.
            </p>
            <p>
              <strong className="text-neutral-200">4. Remove numbers when needed.</strong> Switch
              to Remove mode to strip line numbers from previously numbered text. The tool
              detects common formats automatically.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Add Line Numbers to Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              Line numbers are essential for referencing specific parts of a document.
              Whether you are reviewing code, editing legal contracts, discussing poetry
              in a literature class, or collaborating on scripts, line numbers let everyone
              point to the exact same place in the text. Without them, phrases like
              &ldquo;near the middle of the page&rdquo; lead to confusion and wasted time.
            </p>
            <p>
              <strong className="text-neutral-200">Code review and programming:</strong> When
              sharing code snippets in emails, chat, or documentation, adding line numbers
              makes it easy to reference specific lines. Code review comments like
              &ldquo;check line 42&rdquo; are far more precise than &ldquo;look at the
              function near the top.&rdquo; Many style guides recommend numbered code blocks
              in technical documentation.
            </p>
            <p>
              <strong className="text-neutral-200">Legal and academic documents:</strong> Legal
              briefs, court transcripts, depositions, and academic manuscripts use line
              numbering for precise citation. Zero-padded numbers maintain consistent
              formatting across long documents, and the colon or period separators match
              standard legal formatting conventions.
            </p>
            <p>
              <strong className="text-neutral-200">Creative writing and education:</strong> Poetry
              analysis, screenplay review, and essay workshops all benefit from line numbers.
              Teachers can reference &ldquo;line 14&rdquo; instead of reading the entire
              passage. Students can cite specific lines in their analysis without ambiguity.
            </p>
            <p>
              <strong className="text-neutral-200">Data processing:</strong> Adding line
              numbers to CSV files, log outputs, or configuration files helps track entries
              during debugging. Tab-separated numbering integrates cleanly with spreadsheet
              software, and zero padding ensures proper sorting in file systems.
            </p>
            <p>
              This tool processes everything locally in your browser. No data is uploaded,
              no account is required, and there are no limits on text length. Paste, number,
              copy, and move on.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="add-line-numbers" />

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

        <AdSlot slot="before-footer" page="add-line-numbers" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Add line numbers here, then use our other tools for additional text processing.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📊</div>
              <div className="mt-1 text-sm font-semibold">Text Sorter</div>
              <p className="mt-1 text-xs text-neutral-400">Sort lines alphabetically, numerically, or randomly</p>
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
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📊</div>
              <div className="mt-1 text-sm font-semibold">Word Counter</div>
              <p className="mt-1 text-xs text-neutral-400">Count words, characters & reading time</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
