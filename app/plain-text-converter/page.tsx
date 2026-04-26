import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { PlainTextConverterTool } from "@/components/tools/plain-text-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("plain-text-converter")!;
const pageUrl = buildUrl("/plain-text-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "plain text converter", "plain text converter online", "strip text formatting",
    "remove formatting from text", "remove html tags online", "strip html tags",
    "convert smart quotes", "remove rich text formatting", "plain text tool",
    "convert to plain text", "remove text formatting online", "clean text formatting",
    "strip formatting free", "paste as plain text", "remove curly quotes",
    "convert em dash", "remove urls from text",
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
    question: "What does this plain text converter do?",
    answer:
      "It strips formatting from text by removing HTML tags, converting smart/curly quotes to straight quotes, converting em dashes and en dashes to hyphens, removing invisible Unicode characters, and optionally stripping URLs, email addresses, and non-ASCII characters. The result is clean, plain text.",
  },
  {
    question: "Why do I get curly quotes when I copy text?",
    answer:
      "Word processors like Microsoft Word, Google Docs, and Apple Pages automatically convert straight quotes into curly (smart) quotes. These look nicer in documents but cause problems in code, CSV files, and plain text formats. This tool converts them back to straight quotes instantly.",
  },
  {
    question: "What is the difference between an em dash and an en dash?",
    answer:
      "An em dash (\u2014) is the longer dash used to set off clauses in a sentence. An en dash (\u2013) is shorter and typically used for ranges like 2020\u20132025. This tool converts em dashes to double hyphens (--) and en dashes to single hyphens (-) for plain text compatibility.",
  },
  {
    question: "Will this tool remove my paragraph breaks?",
    answer:
      "No. The plain text converter preserves your line breaks and paragraph structure. It only removes formatting characters like HTML tags, smart quotes, and special Unicode characters. Your text structure stays intact.",
  },
  {
    question: "Can I remove URLs and email addresses from text?",
    answer:
      "Yes. Toggle on the 'Remove URLs' and 'Remove email addresses' options to strip all http/https URLs and email addresses from your text. These options are off by default so you can control exactly what gets removed.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All conversion happens in your browser using JavaScript. Your text never leaves your device. Nothing is stored, transmitted, or logged. The tool works completely offline once the page loads.",
  },
];

export default function PlainTextConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Plain Text Converter"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Plain Text Converter", href: "/plain-text-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Plain Text Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A plain text converter strips all formatting, HTML tags, smart quotes, and special characters from rich text. Paste your formatted text below to get clean plain text instantly.
        </p>

        <ToolAnswerBlock slug="plain-text-converter" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Plain Text Converter Tool</h2>

          <h2>Plain Text Converter Features and Options</h2>

          <h2>About the Free Online Plain Text Converter</h2>

        </div>


        <div className="mt-4">
          <PlainTextConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="plain-text-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Text to Plain Text
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your formatted text</strong> into the
              input box above. The tool accepts text copied from websites, Word documents, Google
              Docs, emails, PDFs, or any other source with rich formatting.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose your conversion options.</strong> The
              defaults handle the most common issues: HTML tags, smart quotes, em/en dashes,
              ellipsis characters, and invisible Unicode. Toggle additional options like removing
              URLs, emails, or non-ASCII characters as needed.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the plain text output</strong> with one
              click. The result is clean, portable text compatible with any system.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why You Need a Plain Text Converter
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Every time you copy text from a website, email, or document, invisible formatting
              comes along for the ride. HTML tags hide in clipboard data. Word processors inject
              smart quotes, em dashes, and non-breaking spaces that look identical to their plain
              equivalents but cause problems in code editors, databases, and terminal commands.
            </p>
            <p>
              <strong className="text-neutral-200">For developers:</strong> Smart quotes in
              configuration files, JSON, or SQL queries cause syntax errors that are nearly
              impossible to spot by eye. A stray em dash in a command-line argument will silently
              fail. Non-breaking spaces break regex patterns and string comparisons. Converting
              to plain text before pasting into code eliminates an entire class of bugs.
            </p>
            <p>
              <strong className="text-neutral-200">For content creators:</strong> When migrating
              content between CMS platforms, rich text formatting often corrupts during import.
              Markdown editors choke on HTML tags. Email newsletters render curly quotes as
              garbled characters on older email clients. Converting to plain text first gives you
              a clean starting point.
            </p>
            <p>
              <strong className="text-neutral-200">For data work:</strong> CSV files with smart
              quotes break column parsing. Spreadsheet formulas fail when cells contain invisible
              Unicode characters. Database imports reject non-ASCII text. Stripping formatting
              before importing data prevents hours of debugging.
            </p>
            <p>
              <strong className="text-neutral-200">For everyday use:</strong> Forum posts,
              social media updates, chat messages, and form submissions all expect plain text.
              Pasting formatted text into these fields produces garbled output, broken links, or
              unexpected line breaks. This tool gives you clean text every time.
            </p>
            <p>
              The plain text converter handles all of these cases in one step. Paste your
              text, choose your options, and copy the result. No signup, no installation, no
              data sent to any server.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="plain-text-converter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Plain Text Converter
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

        <AdSlot slot="before-footer" page="plain-text-converter" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert your text to plain format here, then use our other tools to clean, compare,
            encode, or convert it further. All tools are free and process text in your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔐 String Encoder
            </Link>
            <Link
              href="/text-diff"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔍 Text Diff
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
