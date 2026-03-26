import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TextStatisticsTool } from "@/components/tools/text-statistics";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("text-statistics")!;
const pageUrl = buildUrl("/text-statistics");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text analyzer online", "text statistics tool", "writing analysis dashboard",
    "word frequency analyzer", "text analysis tool free", "content analysis tool",
    "writing statistics checker", "text metrics analyzer", "vocabulary richness checker",
    "lexical density calculator", "bigram trigram analyzer",
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
    question: "What statistics does this tool calculate?",
    answer:
      "This tool calculates basic counts (words, characters, sentences, paragraphs, lines), vocabulary metrics (unique words, richness, lexical density), structure metrics (average sentence and paragraph length, min/max), reading and speaking time, Flesch-Kincaid grade level, word frequency, bigrams, trigrams, and sentence length distribution.",
  },
  {
    question: "What is vocabulary richness?",
    answer:
      "Vocabulary richness (also called type-token ratio) is the percentage of unique words out of total words. A score of 70% means 70% of your words are unique. Higher richness indicates more varied vocabulary. Richness naturally decreases in longer texts because common words repeat more.",
  },
  {
    question: "What is lexical density?",
    answer:
      "Lexical density measures the percentage of content words (nouns, verbs, adjectives, adverbs) versus function words (the, a, is, of, etc.). Higher lexical density means more information-packed text. Academic writing typically has higher lexical density (60%+) than casual conversation (40–50%).",
  },
  {
    question: "How are reading and speaking times calculated?",
    answer:
      "Reading time is based on the average silent reading speed of 238 words per minute (the standard used by Medium and other platforms). Speaking time uses 150 words per minute, which is the recommended pace for presentations and public speaking.",
  },
  {
    question: "What are bigrams and trigrams?",
    answer:
      "Bigrams are two-word sequences and trigrams are three-word sequences. Analyzing these reveals common phrases and patterns in your writing. Frequently repeated bigrams and trigrams may indicate areas where you could vary your language for better readability.",
  },
  {
    question: "Why are stop words excluded from the word frequency chart?",
    answer:
      "Stop words (the, a, is, are, etc.) are the most common words in any English text and would dominate the frequency chart without providing useful insights. Excluding them reveals the meaningful content words that characterize your specific text.",
  },
  {
    question: "Can I export the analysis results?",
    answer:
      "Yes. Click the 'Export Report' button to download a complete plain text report with all statistics, top words, bigrams, and trigrams.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All analysis happens entirely in your browser using JavaScript. Your text never leaves your device.",
  },
];

export default function TextStatisticsPage() {
  return (
    <>
      <WebAppSchema
        name="Free Text Statistics Dashboard"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text Statistics", href: "/text-statistics" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Text Statistics</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Text Statistics Dashboard — Free Online
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A text statistics dashboard provides detailed analysis of any text, including word frequency, vocabulary richness, lexical density, and sentence structure. Paste your text below to see comprehensive text statistics instantly.
        </p>

        <ToolAnswerBlock slug="text-statistics" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Text Statistics Tool</h2>

          <h2>Text Statistics Features and Options</h2>

          <h2>About the Free Online Text Statistics</h2>

        </div>


        <div className="mt-4">
          <TextStatisticsTool />
        </div>

        <AdSlot slot="after-tool" page="text-statistics" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Analyze Text Statistics
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Copy any
              text into the input area. The dashboard updates instantly with every
              keystroke.
            </p>
            <p>
              <strong className="text-neutral-200">2. Review the dashboard.</strong> Browse
              through basic counts, vocabulary metrics, time estimates, and readability
              scores in the card grid layout.
            </p>
            <p>
              <strong className="text-neutral-200">3. Explore visualizations.</strong> Scroll
              down to see sentence length distribution, word frequency charts, and
              common phrase analysis.
            </p>
            <p>
              <strong className="text-neutral-200">4. Export your report.</strong> Click
              Export Report to download all statistics as a plain text file.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Text Analysis Metrics
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Text statistics give writers, editors, and researchers quantifiable
              insight into writing style and structure. While word count is the
              most basic metric, deeper analysis reveals patterns in vocabulary
              use, sentence construction, and overall text complexity that are
              invisible to the naked eye.
            </p>
            <p>
              <strong className="text-neutral-200">Vocabulary richness and lexical density</strong> together
              paint a picture of how information-dense your writing is. High
              vocabulary richness means you rarely repeat the same words. High
              lexical density means your text is packed with content words rather
              than structural filler. Academic papers score high on both metrics,
              while conversational writing scores lower.
            </p>
            <p>
              <strong className="text-neutral-200">Sentence length variation</strong> is
              a hallmark of engaging writing. The best prose mixes short, punchy
              sentences with longer, flowing ones. If every sentence in your text
              is roughly the same length, it creates a monotonous rhythm that
              readers subconsciously find tiring.
            </p>
            <p>
              <strong className="text-neutral-200">N-gram analysis</strong> (bigrams and
              trigrams) reveals habitual phrases and repetitive patterns. Every
              writer has go-to phrases they overuse. Seeing your most common two-
              and three-word sequences can help you identify and break these
              patterns, leading to fresher, more varied prose.
            </p>
            <p>
              This tool processes all text locally in your browser. No data is
              sent to any server, making it safe for analyzing confidential
              documents, unpublished manuscripts, or private communications.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-statistics" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Text Statistics
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

        <AdSlot slot="before-footer" page="text-statistics" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Analyze text statistics here, then use our other writing tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📊</div>
              <div className="mt-1 text-sm font-semibold">Word Counter</div>
              <p className="mt-1 text-xs text-neutral-400">Count words, characters & reading time</p>
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
