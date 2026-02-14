import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TextCleanerTool } from "@/components/tools/text-cleaner";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("text-cleaner")!;
const pageUrl = buildUrl("/text-cleaner");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What does this text cleaner do?",
    answer:
      "It removes unwanted whitespace from your text including extra spaces, duplicate blank lines, tabs, trailing spaces, non-breaking spaces, and zero-width characters. You can toggle each cleaning option on or off to control exactly what gets removed.",
  },
  {
    question: "Will this tool change my actual words?",
    answer:
      "No. The text cleaner only removes or replaces whitespace and invisible characters. It never changes your actual words, punctuation, or capitalization. If you also need to change case, use our Case Converter tool.",
  },
  {
    question: "What are non-breaking spaces and zero-width characters?",
    answer:
      "Non-breaking spaces (\\u00A0) look like regular spaces but prevent line breaks. Zero-width spaces are invisible characters that can cause problems when pasting text from websites, PDFs, or Word documents. This tool removes both.",
  },
  {
    question: "Why does text copied from PDFs have extra spaces?",
    answer:
      "PDFs store text as positioned characters on a page, not as flowing text. When you copy from a PDF, the system tries to reconstruct the text and often inserts extra spaces, line breaks at column edges, and invisible characters. This tool fixes all of those issues.",
  },
  {
    question: "What does 'straighten smart quotes' do?",
    answer:
      "Word processors like Microsoft Word and Google Docs automatically convert straight quotes ('\" ) into curly smart quotes (\u201C\u201D \u2018\u2019). This option converts them back to straight quotes, which is essential for code, CSV files, and plain text formats.",
  },
  {
    question: "Can I remove line breaks but keep paragraphs?",
    answer:
      "Yes. Use the 'Collapse blank lines' option (on by default) which keeps paragraph breaks while removing extra blank lines. If you want to join everything into a single paragraph, enable 'Remove all line breaks' instead.",
  },
  {
    question: "Does this tool work on mobile?",
    answer:
      "Yes. The text cleaner is fully responsive and works on any phone, tablet, or desktop with a modern browser. Paste text from any app and copy the cleaned result.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All cleaning happens in your browser using JavaScript. Your text never leaves your device. Nothing is stored or transmitted.",
  },
];

export default function TextCleanerPage() {
  return (
    <>
      <WebAppSchema
        name="Free Text Cleaner"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text Cleaner", href: "/text-cleaner" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Cleaner
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Clean up messy text in one click. Remove extra spaces, blank lines, tabs, trailing
          whitespace, smart quotes, and invisible characters. Free, no signup, works entirely
          in your browser.
        </p>

        <div className="mt-4">
          <TextCleanerTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="text-cleaner" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Clean Text Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your messy text</strong> into the
              input box above. The tool accepts text of any length copied from PDFs, Word
              documents, emails, websites, spreadsheets, or any other source.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose your cleaning options.</strong> Toggle
              each option on or off. The defaults handle the most common issues: trailing spaces,
              collapsed multiple spaces, collapsed blank lines, tabs to spaces, and invisible
              Unicode characters.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the cleaned output</strong> with one
              click. Or click "Apply to Input" to run additional cleaning passes on the result.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What This Text Cleaner Fixes
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Extra Spaces",
                desc: "Collapses runs of multiple spaces into a single space. Fixes text pasted from PDFs, OCR tools, and formatted documents.",
              },
              {
                title: "Trailing Whitespace",
                desc: "Removes invisible spaces and tabs at the end of every line. Essential for clean code, CSV files, and plain text.",
              },
              {
                title: "Multiple Blank Lines",
                desc: "Replaces three or more consecutive blank lines with a single blank line, keeping paragraph structure without excessive gaps.",
              },
              {
                title: "Tab Characters",
                desc: "Converts tab characters to single spaces. Fixes indentation issues from code editors, spreadsheets, and terminal output.",
              },
              {
                title: "Smart Quotes and Dashes",
                desc: "Converts curly quotes, em dashes, en dashes, and ellipsis characters back to their plain ASCII equivalents.",
              },
              {
                title: "Invisible Unicode Characters",
                desc: "Removes non-breaking spaces, zero-width spaces, zero-width joiners, and byte order marks that cause hidden formatting issues.",
              },
              {
                title: "Leading Spaces",
                desc: "Strips spaces and tabs from the beginning of each line. Useful for removing unwanted indentation from pasted code or email replies.",
              },
              {
                title: "Non-ASCII Characters",
                desc: "Strips all characters outside the standard ASCII range. Useful for cleaning text for systems that only accept basic English characters.",
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
            When to Use a Text Cleaner
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Copying from PDFs:</strong> PDF text
              extraction often introduces extra spaces between words, line breaks at column
              edges, and invisible characters. Paste the raw text here and get clean output
              instantly.
            </p>
            <p>
              <strong className="text-neutral-200">Cleaning up code:</strong> Remove trailing
              whitespace, normalize indentation from tabs to spaces, and strip invisible
              characters that cause mysterious bugs.
            </p>
            <p>
              <strong className="text-neutral-200">Preparing data for spreadsheets:</strong> Clean
              text before pasting into Excel or Google Sheets. Remove extra spaces that cause
              duplicate entries, line breaks that split cells, and invisible characters that
              break formulas.
            </p>
            <p>
              <strong className="text-neutral-200">Email formatting:</strong> Clean up text
              from forwarded email chains. Remove excessive blank lines, trailing spaces, and
              inconsistent formatting.
            </p>
            <p>
              <strong className="text-neutral-200">Content migration:</strong> When moving
              content between CMS platforms, text often picks up invisible characters and
              inconsistent whitespace. Clean it here before importing.
            </p>
            <p>
              <strong className="text-neutral-200">Plain text files:</strong> Prepare text for
              README files, commit messages, configuration files, and other contexts that
              require clean, consistently formatted plain text.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-cleaner" />

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

        <AdSlot slot="before-footer" page="text-cleaner" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Clean your text here, then convert the case with our converter or check the word
            count. All tools are free and process text in your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
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
              href="/blog"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📖 Text Guides
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
