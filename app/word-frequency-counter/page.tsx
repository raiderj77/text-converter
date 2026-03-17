import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { WordFrequencyCounterTool } from "@/components/tools/word-frequency-counter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("word-frequency-counter")!;
const pageUrl = buildUrl("/word-frequency-counter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "word frequency counter", "word frequency analyzer online", "word count frequency",
    "text word frequency", "word frequency tool", "word frequency checker",
    "count word occurrences", "word frequency analysis", "text analysis tool",
    "word cloud generator", "bigram analyzer", "trigram frequency",
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
    question: "What does the Word Frequency Counter do?",
    answer:
      "It counts how many times each word appears in your text and displays a ranked frequency table with counts, percentages, and visual bars. You can sort by frequency, alphabetically, or by word length, and filter to show the top 10, 25, 50, or all words.",
  },
  {
    question: "What are stop words and why filter them?",
    answer:
      "Stop words are common function words like 'the', 'a', 'is', 'and', 'to' that appear frequently in all English text. Filtering them out (enabled by default) lets you focus on the meaningful content words that distinguish your specific text.",
  },
  {
    question: "What are bigrams and trigrams?",
    answer:
      "Bigrams are two-word sequences and trigrams are three-word sequences found in your text. Analyzing their frequency reveals common phrases, repeated patterns, and habitual expressions in your writing.",
  },
  {
    question: "How does the word cloud work?",
    answer:
      "The word cloud displays your top 40 most frequent words with font size proportional to frequency. More frequent words appear larger. It uses CSS-based rendering, so no images are generated — everything stays in your browser.",
  },
  {
    question: "Can I export the frequency data?",
    answer:
      "Yes. Click 'Export CSV' to download the complete frequency table as a CSV file with rank, word, count, and percentage columns. You can also click 'Copy Table' to copy the data as tab-separated text for pasting into spreadsheets.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All word frequency analysis happens entirely in your browser using JavaScript. Your text never leaves your device, making it safe for confidential or private content.",
  },
  {
    question: "How is word percentage calculated?",
    answer:
      "Each word's percentage represents its share of the total counted words. If stop words are excluded, the percentage is based on the remaining content words only, giving a more accurate picture of meaningful word distribution.",
  },
  {
    question: "Can I analyze text in other languages?",
    answer:
      "The tool counts any words that match Latin alphabet characters. It works well for English and other Latin-script languages. The stop word filter is English-only, so for other languages you may want to turn it off.",
  },
];

export default function WordFrequencyCounterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Word Frequency Counter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Word Frequency Counter", href: "/word-frequency-counter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Word Frequency Counter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Word Frequency Counter — Analyze Text Online Free
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A word frequency counter analyzes text to show how often each word appears, with bigram and trigram analysis. Paste your text below to see word frequency statistics instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Word Frequency Counter Tool</h2>

          <h2>Word Frequency Counter Features and Options</h2>

          <h2>About the Free Online Word Frequency Counter</h2>

        </div>


        <div className="mt-4">
          <WordFrequencyCounterTool />
        </div>

        <AdSlot slot="after-tool" page="word-frequency-counter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Word Frequency Counter
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Copy any
              text — an essay, article, webpage content, or document — into the input area.
              Analysis updates instantly as you type.
            </p>
            <p>
              <strong className="text-neutral-200">2. Review the frequency table.</strong> See
              every word ranked by how often it appears, with count, percentage, and a visual
              bar. Sort by frequency, alphabetically, or by word length.
            </p>
            <p>
              <strong className="text-neutral-200">3. Toggle stop words.</strong> Turn the
              stop word filter on or off to focus on content words or see every word
              including common ones like &ldquo;the&rdquo; and &ldquo;and&rdquo;.
            </p>
            <p>
              <strong className="text-neutral-200">4. Explore n-grams and word cloud.</strong> Switch
              tabs to see bigrams, trigrams, or a visual word cloud of your most
              frequent terms.
            </p>
            <p>
              <strong className="text-neutral-200">5. Export your results.</strong> Download
              the full frequency table as a CSV file or copy it to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Word Frequency Analysis
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Word frequency analysis is a foundational technique in computational
              linguistics and text mining. By counting how often each word appears in
              a document, you reveal patterns that are invisible to casual reading.
              Writers, SEO professionals, researchers, and students all benefit from
              understanding word distribution in their texts.
            </p>
            <p>
              <strong className="text-neutral-200">For writers and editors,</strong> word
              frequency reveals overused words and repetitive language. If a particular
              adjective or verb dominates your text, the frequency table makes it
              immediately obvious. This awareness helps you diversify your vocabulary
              and create more engaging prose.
            </p>
            <p>
              <strong className="text-neutral-200">For SEO professionals,</strong> word
              frequency doubles as a keyword density checker. Seeing which terms appear
              most often helps you verify that your target keywords are present at
              appropriate rates without over-optimization. The bigram and trigram
              analysis adds another dimension by revealing multi-word phrases and
              long-tail keyword opportunities.
            </p>
            <p>
              <strong className="text-neutral-200">For researchers,</strong> frequency
              analysis is a first step in text mining and content analysis. Word
              distributions follow predictable patterns like Zipf&apos;s Law, where
              the most common word appears roughly twice as often as the second most
              common word. Deviations from expected distributions can reveal
              interesting characteristics about a text&apos;s style and subject matter.
            </p>
            <p>
              <strong className="text-neutral-200">The word cloud visualization</strong> provides
              an intuitive, at-a-glance view of your text&apos;s key themes. Larger
              words appear more frequently, making it easy to spot dominant topics.
              Word clouds are particularly useful for presentations, reports, and
              quick content summaries.
            </p>
            <p>
              This tool processes everything locally in your browser. No text is sent
              to any server, so you can safely analyze confidential documents,
              unpublished work, or sensitive communications.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="word-frequency-counter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Word Frequency Counter
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

        <AdSlot slot="before-footer" page="word-frequency-counter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Analyze word frequencies here, then explore our other text analysis tools.
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
              href="/text-statistics"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📈</div>
              <div className="mt-1 text-sm font-semibold">Text Statistics</div>
              <p className="mt-1 text-xs text-neutral-400">Full text analysis dashboard with metrics</p>
            </Link>
            <Link
              href="/readability-analyzer"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📚</div>
              <div className="mt-1 text-sm font-semibold">Readability Analyzer</div>
              <p className="mt-1 text-xs text-neutral-400">7 readability formulas with grade levels</p>
            </Link>
            <Link
              href="/ai-writing-analyzer"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🤖</div>
              <div className="mt-1 text-sm font-semibold">AI Writing Analyzer</div>
              <p className="mt-1 text-xs text-neutral-400">Analyze statistical writing patterns</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
