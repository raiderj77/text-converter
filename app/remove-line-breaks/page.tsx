import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { RemoveLineBreaksTool } from "@/components/tools/remove-line-breaks";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("remove-line-breaks")!;
const pageUrl = buildUrl("/remove-line-breaks");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "remove line breaks", "remove line breaks online", "join lines",
    "remove newlines", "remove carriage returns", "merge lines",
    "join lines with spaces", "join lines with commas", "line break remover",
    "remove line breaks from text", "join text lines", "merge text lines",
    "preserve paragraph breaks", "text line joiner", "remove returns from text",
    "clean line breaks free",
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
    question: "How do I remove line breaks from text?",
    answer:
      "Paste your text into the input area. The tool instantly removes all line breaks and joins lines using your chosen separator — spaces, commas, or a custom character. Click Copy to grab the result.",
  },
  {
    question: "What does 'Preserve paragraph breaks' do?",
    answer:
      "When enabled, double line breaks (paragraph boundaries) are kept as single line breaks in the output, while single line breaks within paragraphs are replaced with your chosen separator. This keeps paragraphs distinct while removing unwanted wrapping.",
  },
  {
    question: "Can I join lines with a custom separator?",
    answer:
      "Yes. Select the 'Custom' option and type any separator you want — semicolons, pipes, dashes, or any string. The tool replaces every line break with your custom separator.",
  },
  {
    question: "Why does pasted text have unwanted line breaks?",
    answer:
      "Text copied from PDFs, emails, or terminal output often includes hard line breaks at the end of every visual line. These breaks were added for display width, not for meaning. This tool removes them so the text flows naturally.",
  },
  {
    question: "Does this tool handle Windows and Mac line endings?",
    answer:
      "Yes. The tool normalizes all line ending styles — Windows (\\r\\n), old Mac (\\r), and Unix (\\n) — before processing. You get consistent output regardless of where the text originated.",
  },
  {
    question: "Is my text processed securely?",
    answer:
      "Yes. All processing happens entirely in your browser using JavaScript. Your text is never sent to any server, making it safe for confidential documents, emails, and private content.",
  },
];

export default function RemoveLineBreaksPage() {
  return (
    <>
      <WebAppSchema
        name="Free Remove Line Breaks Tool"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Remove Line Breaks", href: "/remove-line-breaks" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Remove Line Breaks</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Remove Line Breaks — Join Lines Online Free
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A line break remover joins multiple lines of text into a single line using spaces, commas, or custom separators. Paste your text below to remove line breaks and join lines instantly.
        </p>

        <ToolAnswerBlock slug="remove-line-breaks" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Remove Line Breaks Tool</h2>

          <h2>Remove Line Breaks Features and Options</h2>

          <h2>About the Free Online Remove Line Breaks</h2>

        </div>


        <div className="mt-4">
          <RemoveLineBreaksTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="remove-line-breaks" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Remove Line Breaks from Text Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input
              area. The tool handles text from any source — PDFs, emails, terminal output,
              documents, or web pages. Use the example button to see a demo.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose your separator.</strong> Pick
              spaces to merge lines into flowing prose, commas for creating CSV-style lists,
              or enter a custom separator like semicolons or pipes.
            </p>
            <p>
              <strong className="text-neutral-200">3. Toggle paragraph preservation.</strong> Enable
              &ldquo;Preserve paragraph breaks&rdquo; to keep paragraph boundaries intact while
              removing line wrapping within each paragraph.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> The cleaned output
              appears instantly below the input with a before/after line count. Click Copy to
              grab it for pasting into documents, emails, or code editors.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Remove Line Breaks from Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Line breaks are one of the most common sources of messy text. When you copy text
              from PDFs, emails, or terminal output, each visual line often ends with a hard
              line break. These breaks made sense on the original screen, but when you paste
              the text elsewhere it looks fragmented — sentences cut short, paragraphs split
              into dozens of tiny lines, and formatting that looked fine in the source turns
              into an unreadable mess.
            </p>
            <p>
              <strong className="text-neutral-200">Cleaning up PDF text:</strong> PDF documents
              are notorious for inserting line breaks at the edge of every page column. When
              you copy a paragraph from a PDF, each line ends with a break. This tool removes
              those breaks so the text flows as a proper paragraph, ready for editing in Word,
              Google Docs, or any text editor.
            </p>
            <p>
              <strong className="text-neutral-200">Email and messaging cleanup:</strong> Plain-text
              emails often wrap at 72 or 80 characters, inserting breaks mid-sentence. Forwarded
              messages accumulate layers of wrapping. Removing these breaks makes the text
              readable again and suitable for quoting or reformatting.
            </p>
            <p>
              <strong className="text-neutral-200">Data preparation:</strong> When preparing text
              for spreadsheets, databases, or code, you often need each record on a single line.
              Joining lines with commas creates CSV-ready data; joining with custom separators
              creates delimiter-separated values for any system.
            </p>
            <p>
              <strong className="text-neutral-200">Preserving paragraph structure:</strong> The
              paragraph preservation option is key for longer documents. It keeps the logical
              structure (paragraphs separated by blank lines) while removing the cosmetic
              wrapping within each paragraph. The result is clean, flowing text that still
              respects the author&apos;s intended paragraph divisions.
            </p>
            <p>
              Everything runs locally in your browser. No data leaves your machine, there are
              no limits on text length, and no account is needed. Paste, clean, copy, done.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="remove-line-breaks" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Remove Line Breaks
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

        <AdSlot slot="before-footer" page="remove-line-breaks" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Remove line breaks here, then use our other tools for additional text processing.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/remove-empty-lines"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🧹</div>
              <div className="mt-1 text-sm font-semibold">Remove Empty Lines</div>
              <p className="mt-1 text-xs text-neutral-400">Strip blank and whitespace-only lines</p>
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
              href="/add-line-numbers"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Add Line Numbers</div>
              <p className="mt-1 text-xs text-neutral-400">Add or remove line numbers from text</p>
            </Link>
            <Link
              href="/find-and-replace"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔎</div>
              <div className="mt-1 text-sm font-semibold">Find & Replace</div>
              <p className="mt-1 text-xs text-neutral-400">Find and replace with regex support</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
