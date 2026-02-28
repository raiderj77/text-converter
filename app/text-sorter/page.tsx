import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TextSorterTool } from "@/components/tools/text-sorter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("text-sorter")!;
const pageUrl = buildUrl("/text-sorter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text sorter", "sort lines alphabetically", "sort text online",
    "alphabetical sorter", "numerical sorter", "random shuffle",
    "sort list online", "sort words alphabetically", "sort lines A to Z",
    "sort lines Z to A", "remove duplicates online", "deduplicate text",
    "text organizer", "list sorter", "online sorter free",
    "sort by length", "sort ascending descending", "text sorting tool",
    "shuffle lines randomly", "randomize list", "sort text lines",
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
    question: "How does this text sorter work?",
    answer:
      "Paste your text with one item per line. The tool instantly sorts lines alphabetically (A-Z or Z-A), numerically, by length, or randomly shuffles them. You can remove duplicates, trim whitespace, ignore case, and handle empty lines. All processing happens in your browser — nothing is sent to a server.",
  },
  {
    question: "What's the difference between alphabetical and numerical sorting?",
    answer:
      "Alphabetical sorting arranges text based on letter order (A comes before B). Numerical sorting extracts numbers from each line and sorts by numeric value (2 comes before 10). If a line contains no numbers, it falls back to alphabetical sorting. For pure number lists, numerical sorting is more accurate.",
  },
  {
    question: "How do I remove duplicates while sorting?",
    answer:
      "Enable the 'Remove duplicates' toggle. The tool will keep only the first occurrence of each unique line. You can also enable 'Ignore case' to treat 'Apple' and 'apple' as duplicates. Empty lines can be kept, removed, or grouped separately using the 'Empty Lines' option.",
  },
  {
    question: "Can I sort by line length?",
    answer:
      "Yes. Select 'Line Length' in the 'Sort By' dropdown. The tool will sort lines from shortest to longest (ascending) or longest to shortest (descending). This is useful for organizing lists by complexity or finding the longest/shortest items.",
  },
  {
    question: "How does random shuffling work?",
    answer:
      "Random shuffle uses the Fisher-Yates algorithm to randomly reorder your lines. Each run produces a different random order. This is perfect for randomizing lists, creating random teams, or shuffling quiz questions.",
  },
  {
    question: "What happens to empty lines?",
    answer:
      "You can choose: 'Keep in place' preserves empty lines where they are, 'Remove all' deletes them, or 'Group at end' moves all empty lines to the bottom (or top if sorting descending). This helps clean up messy lists while maintaining structure if needed.",
  },
  {
    question: "Does the sorter work with large lists?",
    answer:
      "Yes. The tool handles thousands of lines efficiently since all processing happens in your browser. Performance depends on your device, but typical lists (under 10,000 lines) sort instantly. For very large lists, consider breaking them into smaller chunks.",
  },
  {
    question: "Can I sort CSV or tabular data?",
    answer:
      "Yes, but you'll need to sort by a specific column manually. Paste your CSV data, then use another tool to extract the column you want to sort by. For simple comma-separated lists, the sorter works directly on each line as a whole.",
  },
];

export default function TextSorterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Text Sorter"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text Sorter", href: "/text-sorter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Sorter
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Sort text lines alphabetically, numerically, by length, or randomly shuffle. Remove duplicates,
          handle empty lines, and customize sorting options. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <TextSorterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="text-sorter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Sort Text Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your list</strong> with one item per line.
              The tool accepts any text: names, email addresses, keywords, numbers, or mixed content.
              Use the example button to see a demo list.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose sorting options.</strong> Select alphabetical
              (A-Z or Z-A), numerical, length-based, or random shuffle. Toggle duplicate removal, case
              sensitivity, and empty line handling to match your needs.
            </p>
            <p>
              <strong className="text-neutral-200">3. Get sorted output instantly.</strong> The right panel
              updates in real-time as you type or change options. Copy the sorted text with one click.
              Use the swap button to move output back to input for further sorting.
            </p>
            <p>
              <strong className="text-neutral-200">4. Clean and organize.</strong> The stats show line counts,
              unique items, and reduction percentage. Use the trim and deduplicate features to clean messy data
              before sorting.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Text Sorter
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Data cleaning:</strong> Sort and deduplicate email lists,
              contact databases, keyword research, or survey responses. Remove duplicates to create clean
              mailing lists or unique keyword sets.
            </p>
            <p>
              <strong className="text-neutral-200">Content organization:</strong> Alphabetize bibliographies,
              reference lists, glossaries, or indexes. Sort product names, menu items, or directory listings
              for consistent navigation.
            </p>
            <p>
              <strong className="text-neutral-200">Programming and development:</strong> Sort CSS properties,
              JavaScript imports, environment variables, or configuration options. Organize code snippets,
              function names, or variable declarations.
            </p>
            <p>
              <strong className="text-neutral-200">Education and research:</strong> Sort student names,
              research participants, or experimental data. Randomize lists for blind studies or create
              randomized test groups.
            </p>
            <p>
              <strong className="text-neutral-200">Personal organization:</strong> Sort to-do lists, grocery
              items, packing lists, or book collections. Alphabetize DVD collections, music playlists, or
              recipe ingredients.
            </p>
            <p>
              <strong className="text-neutral-200">SEO and marketing:</strong> Sort keyword lists by search
              volume, competition, or alphabetical order. Organize hashtags, social media handles, or
              influencer lists for campaigns.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-sorter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Sorting Algorithms Explained
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Alphabetical (A-Z)",
                desc: "Standard dictionary order. Uppercase letters sort before lowercase unless 'Ignore case' is enabled. Punctuation and symbols sort based on Unicode values.",
              },
              {
                title: "Alphabetical (Z-A)",
                desc: "Reverse dictionary order. Useful for descending lists or when you want most recent/important items first based on name.",
              },
              {
                title: "Numerical",
                desc: "Extracts numbers from each line and sorts by numeric value. 'Item 10' comes after 'Item 2'. Non-numeric lines fall back to alphabetical sorting.",
              },
              {
                title: "Line Length",
                desc: "Sorts by character count. Shortest lines first (ascending) or longest first (descending). Helpful for organizing by complexity or finding outliers.",
              },
              {
                title: "Random Shuffle",
                desc: "Fisher-Yates algorithm for true random permutation. Each item has equal chance of any position. Different result each time unless same random seed.",
              },
              {
                title: "Case Sensitive",
                desc: "When disabled, 'Apple' and 'apple' are equal. When enabled, uppercase sorts before lowercase: 'Apple' comes before 'apple' in A-Z order.",
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
            Common Sorting Scenarios
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Email list deduplication:</strong> Paste raw email addresses
              (one per line), enable 'Remove duplicates' and 'Ignore case', sort A-Z. Result: clean, unique,
              alphabetized list ready for import.
            </p>
            <p>
              <strong className="text-neutral-200">Keyword organization:</strong> Paste hundreds of keywords
              from research tools. Sort alphabetically to group similar terms, or by length to identify
              short-tail vs long-tail keywords.
            </p>
            <p>
              <strong className="text-neutral-200">Student name randomization:</strong> Paste class roster,
              use random shuffle to create random presentation order, study groups, or seating charts.
              Shuffle multiple times for different arrangements.
            </p>
            <p>
              <strong className="text-neutral-200">Code organization:</strong> Paste CSS properties from a
              messy stylesheet. Sort alphabetically to follow style guide conventions, making properties
              easier to find and maintain.
            </p>
            <p>
              <strong className="text-neutral-200">Product inventory:</strong> Paste SKU numbers with
              descriptions. Sort numerically by SKU for inventory checks, or alphabetically by description
              for customer-facing lists.
            </p>
            <p>
              <strong className="text-neutral-200">Research data:</strong> Paste participant IDs or response
              codes. Sort to identify patterns, remove duplicate entries, or prepare data for statistical
              analysis in other tools.
            </p>
          </div>
        </section>

        <AdSlot slot="before-footer" page="text-sorter" />

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
            FlipMyCase offers a suite of free browser-based text tools. Sort lists here, then use other tools
            for additional text processing.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🗑️ Duplicate Remover
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ↔️ Text Reverser
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Word Counter
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}