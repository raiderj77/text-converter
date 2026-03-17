import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { SmartQuotesConverterTool } from "@/components/tools/smart-quotes-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("smart-quotes-converter")!;
const pageUrl = buildUrl("/smart-quotes-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "smart quotes converter", "curly quotes to straight", "straight quotes to curly",
    "typographic quotes", "convert smart quotes", "em dash converter",
    "curly apostrophe converter", "straight quotes converter", "typeset quotes",
    "smart quotes to dumb quotes", "fix smart quotes", "remove curly quotes",
    "en dash to hyphen", "em dash to double hyphen", "free quotes converter",
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
    question: "What are smart quotes vs. straight quotes?",
    answer:
      "Smart quotes (also called curly quotes or typographic quotes) are the curved quotation marks used in professional typesetting: \u201Clike this\u201D and \u2018like this.\u2019 Straight quotes are the simple vertical marks used in programming: \"like this\" and 'like this.' Most word processors automatically convert straight quotes to smart quotes as you type.",
  },
  {
    question: "When should I use straight quotes instead of curly?",
    answer:
      "Use straight quotes in code, configuration files, HTML/CSS/JavaScript, Markdown, plain text emails, and any context where curly quotes could cause parsing errors. Straight quotes are ASCII-safe and universally compatible across all systems and encodings.",
  },
  {
    question: "When should I use smart quotes?",
    answer:
      "Use smart (curly) quotes in published content like books, magazines, websites, presentations, and formal documents. Typographic quotes look more professional and are the standard in editorial and publishing workflows. Most modern browsers and fonts render them correctly.",
  },
  {
    question: "What is the difference between an em dash and an en dash?",
    answer:
      "An em dash (\u2014) is the longer dash used to set off parenthetical phrases or mark a break in thought\u2014like this. An en dash (\u2013) is slightly shorter and is used for ranges (pages 10\u201315) and compound adjectives (New York\u2013London flight). In Straighten mode, em dashes become double hyphens (--) and en dashes become single hyphens (-).",
  },
  {
    question: "Does this tool handle apostrophes?",
    answer:
      "Yes. In Straighten mode, curly apostrophes (\u2019) are converted to straight apostrophes ('). In Typeset mode, straight apostrophes are intelligently converted to curly ones based on context\u2014after a letter it becomes a closing/apostrophe mark, and at the start of a word it becomes an opening single quote.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All conversion happens entirely in your browser using JavaScript. Your text never leaves your device. The tool also saves your last input to local storage for convenience, which you can clear at any time.",
  },
];

export default function SmartQuotesConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Smart Quotes Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Smart Quotes Converter", href: "/smart-quotes-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Smart Quotes Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Smart Quotes Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A smart quotes converter transforms curly typographic quotes into straight quotes or straight quotes into curly ones. Paste your text below to convert quote styles instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Smart Quotes Converter Tool</h2>

          <h2>Smart Quotes Converter Features and Options</h2>

          <h2>About the Free Online Smart Quotes Converter</h2>

        </div>


        <div className="mt-4">
          <SmartQuotesConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="smart-quotes-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Smart Quotes
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Select
              &quot;Straighten&quot; to convert curly/smart quotes to straight ASCII quotes,
              or &quot;Typeset&quot; to convert straight quotes to typographic curly quotes.
            </p>
            <p>
              <strong className="text-neutral-200">2. Paste your text.</strong> Paste or
              type the text you want to convert into the input box. The tool processes
              your text instantly as you type.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the substitution counts.</strong> The
              stats bar shows exactly how many quotes, apostrophes, and dashes were converted,
              so you can verify the changes before copying.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click the
              Copy button to copy the converted text to your clipboard. Paste it wherever
              you need it.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Typographic Quotes and Dashes
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Typography has a rich history of using different punctuation marks for different
              purposes. In the era of typewriters, a single key served double duty for both
              opening and closing quotation marks. When digital typesetting arrived, software
              like Microsoft Word and Google Docs began automatically converting these
              &quot;dumb quotes&quot; into their typographically correct counterparts. While
              this produces beautiful text for reading, it can create problems when that text
              is pasted into code editors, terminals, or systems that expect ASCII characters.
            </p>
            <p>
              <strong className="text-neutral-200">The smart quotes problem.</strong> Curly
              quotes use Unicode code points (U+201C, U+201D for double; U+2018, U+2019 for
              single) that are distinct from the ASCII straight quote characters (U+0022 and
              U+0027). When you copy text from a word processor into a code file, these
              invisible differences can cause syntax errors, broken strings, and hard-to-debug
              issues. JSON parsers, SQL queries, and shell scripts are particularly sensitive
              to this distinction. A single curly quote in a JSON file will make the entire
              file invalid.
            </p>
            <p>
              <strong className="text-neutral-200">Dashes matter too.</strong> Similar
              confusion arises with dashes. The em dash (\u2014) and en dash (\u2013) are
              distinct Unicode characters that look similar to hyphens but behave differently.
              An em dash copied from a Word document into a URL, filename, or command-line
              argument can cause silent failures. This tool converts em dashes to double
              hyphens (--) and en dashes to regular hyphens (-) in Straighten mode, and
              reverses the process in Typeset mode.
            </p>
            <p>
              <strong className="text-neutral-200">When to typeset.</strong> If you are
              preparing content for publication\u2014a blog post, newsletter, book manuscript,
              or marketing copy\u2014typographic quotes and proper em dashes signal attention
              to detail and professionalism. The Typeset mode converts your plain-text drafts
              into publication-ready text with proper curly quotes and em dashes, saving you
              from manually inserting special characters.
            </p>
            <p>
              <strong className="text-neutral-200">Best practice.</strong> Write in whatever
              environment is most comfortable, then use this tool to convert quotes and dashes
              to match your target format. Developers straighten quotes before pasting into
              code. Writers and editors typeset quotes before publishing. Either way, the
              substitution counts let you verify exactly what changed.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="smart-quotes-converter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Smart Quotes Converter
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

        <AdSlot slot="before-footer" page="smart-quotes-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert quotes here, then explore our other text processing tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/plain-text-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📄</div>
              <div className="mt-1 text-sm font-semibold">Plain Text Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Strip formatting and clean text</p>
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🧹</div>
              <div className="mt-1 text-sm font-semibold">Text Cleaner</div>
              <p className="mt-1 text-xs text-neutral-400">Remove extra spaces and line breaks</p>
            </Link>
            <Link
              href="/find-and-replace"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔎</div>
              <div className="mt-1 text-sm font-semibold">Find &amp; Replace</div>
              <p className="mt-1 text-xs text-neutral-400">Find and replace with regex support</p>
            </Link>
            <Link
              href="/unicode-lookup"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔍</div>
              <div className="mt-1 text-sm font-semibold">Unicode Lookup</div>
              <p className="mt-1 text-xs text-neutral-400">Search and copy Unicode characters</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
