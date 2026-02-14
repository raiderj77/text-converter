import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { DuplicateRemoverTool } from "@/components/tools/duplicate-remover";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("duplicate-line-remover")!;
const pageUrl = buildUrl("/duplicate-line-remover");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "duplicate line remover", "remove duplicate lines", "deduplicate text",
    "remove duplicates from list", "unique lines", "duplicate remover online",
    "remove duplicate emails", "deduplicate list online", "delete duplicate lines",
    "unique line filter", "remove repeated lines", "text deduplication tool",
    "remove duplicate rows", "clean duplicate entries", "sort and deduplicate",
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
    question: "How does this duplicate line remover work?",
    answer:
      "Paste your list with one item per line. The tool compares each line and keeps only the first occurrence of each unique line. Duplicates are removed instantly. You can choose case-sensitive or case-insensitive matching, trim whitespace, remove empty lines, and sort the results.",
  },
  {
    question: "Is the comparison case-sensitive?",
    answer:
      "By default, no. 'Apple' and 'apple' are treated as the same line and the duplicate is removed. Enable the 'Case sensitive' option if you need to keep lines that differ only in capitalization.",
  },
  {
    question: "Does this tool preserve the original order?",
    answer:
      "Yes, by default. Lines appear in the same order as the input, with duplicates removed. You can also sort the results alphabetically (A to Z or Z to A) using the sort options.",
  },
  {
    question: "What happens to blank lines?",
    answer:
      "By default, blank lines and lines containing only whitespace are removed. Disable the 'Remove empty lines' option if you want to keep them.",
  },
  {
    question: "Can I see which lines were duplicated the most?",
    answer:
      "Yes. The 'Most Duplicated' section below the options shows the top 5 most frequently repeated lines and how many times each appeared in the original input.",
  },
  {
    question: "Is there a line limit?",
    answer:
      "No hard limit. The tool processes text entirely in your browser, so it can handle thousands of lines. Very large lists (100,000+ lines) may be slow depending on your device.",
  },
  {
    question: "Can I use this to deduplicate email lists?",
    answer:
      "Yes. Paste your email addresses one per line and the tool will remove duplicates. Enable 'Case sensitive' off (the default) since email addresses are case-insensitive. Enable 'Trim whitespace' to handle extra spaces.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
];

export default function DuplicateRemoverPage() {
  return (
    <>
      <WebAppSchema
        name="Free Duplicate Line Remover"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Duplicate Line Remover", href: "/duplicate-line-remover" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Duplicate Line Remover
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Remove duplicate lines from any list instantly. Paste your text, get unique lines
          with one click. Supports case-insensitive matching, sorting, and whitespace
          trimming. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-4">
          <DuplicateRemoverTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="duplicate-remover" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Remove Duplicate Lines Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your list</strong> into the input
              box above with one item per line. The tool works with any text: email addresses,
              names, URLs, product SKUs, keywords, or any other list.
            </p>
            <p>
              <strong className="text-neutral-200">2. Configure options.</strong> Choose
              whether to trim whitespace, remove empty lines, use case-sensitive matching, and
              how to sort the output. The defaults handle most use cases automatically.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the unique lines</strong> with one
              click. The output shows only the first occurrence of each line with all
              duplicates removed.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Duplicate Remover
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Email lists:</strong> Clean up mailing
              lists by removing duplicate email addresses before importing into Mailchimp,
              SendGrid, or any email marketing platform. Prevents sending duplicate messages.
            </p>
            <p>
              <strong className="text-neutral-200">Spreadsheet data:</strong> Copy a column
              from Excel or Google Sheets, paste it here to remove duplicates, then paste the
              clean list back. Faster than spreadsheet formulas for quick deduplication.
            </p>
            <p>
              <strong className="text-neutral-200">SEO keyword lists:</strong> Merge keyword
              lists from multiple tools (Ahrefs, SEMrush, Google Keyword Planner) and remove
              duplicates to get a clean, unique keyword list.
            </p>
            <p>
              <strong className="text-neutral-200">Log files:</strong> Paste server logs,
              error messages, or IP addresses to find unique entries and identify the most
              common duplicates.
            </p>
            <p>
              <strong className="text-neutral-200">Code cleanup:</strong> Remove duplicate
              imports, CSS classes, configuration entries, or any repeated lines from source
              code files.
            </p>
            <p>
              <strong className="text-neutral-200">Survey responses:</strong> Deduplicate
              free-text survey responses to identify unique answers and count their frequency.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Features
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Case-Insensitive Matching",
                desc: "By default, 'Apple' and 'apple' are treated as duplicates. Enable case-sensitive mode when capitalization matters.",
              },
              {
                title: "Whitespace Trimming",
                desc: "Automatically trims spaces and tabs from the beginning and end of each line before comparing. Catches duplicates that differ only by whitespace.",
              },
              {
                title: "Empty Line Removal",
                desc: "Removes blank lines and lines containing only whitespace. Keep them by toggling the option off.",
              },
              {
                title: "Sorting Options",
                desc: "Keep original order, or sort alphabetically A-Z or Z-A. Sorting makes it easy to scan the list visually.",
              },
              {
                title: "Duplicate Statistics",
                desc: "See how many total lines, unique lines, and duplicates were found. The 'Most Duplicated' section shows which lines appeared most often.",
              },
              {
                title: "Apply to Input",
                desc: "Click 'Apply to Input' to replace your original text with the deduplicated result. Useful for running additional cleaning passes.",
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

        <AdSlot slot="mid-content" page="duplicate-remover" />

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

        <AdSlot slot="before-footer" page="duplicate-remover" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Deduplicate your list here, then use our other tools to convert case, count
            words, clean up formatting, or generate placeholder text.
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
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
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
