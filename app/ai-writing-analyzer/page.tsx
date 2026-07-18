import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AiWritingAnalyzerTool } from "@/components/tools/ai-writing-analyzer";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("ai-writing-analyzer")!;
const pageUrl = buildUrl("/ai-writing-analyzer");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "ai writing pattern analyzer", "check if text sounds like ai",
    "writing pattern checker", "ai text checker free", "writing analysis tool",
    "ai writing detector alternative", "text pattern analysis",
    "writing style analyzer online", "statistical writing analysis",
    "ai filler phrase checker", "vocabulary diversity checker",
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
    question: "What does this tool actually measure?",
    answer:
      "This tool calculates sentence-length variation, vocabulary diversity, transition-word density, repeated phrases, paragraph structure, a passive-voice estimate, punctuation frequency, and matches against a fixed phrase list. Its color bands are product heuristics, not validated authorship thresholds.",
  },
  {
    question: "Can this tool detect AI-written text?",
    answer:
      "No. This tool analyzes statistical writing patterns only. It cannot determine whether text was written by AI or a human. Many factors affect these patterns, including the writer's native language, editing history, writing style, and subject matter. The results should be used as one data point among many — never as proof.",
  },
  {
    question: "What does the Writing Pattern Score mean?",
    answer:
      "The score ranges from 0 to 100 and summarizes how many of the tool's fixed heuristic bands were triggered. It is not a probability, confidence score, or measure of whether a human or AI wrote the text.",
  },
  {
    question: "What does sentence length uniformity show?",
    answer:
      "It describes how much sentence length varies within the sample. Genre, editing style, language fluency, and many other factors can change this measurement, so it cannot establish authorship.",
  },
  {
    question: "What does the phrase-list check do?",
    answer:
      "It counts matches from a short, fixed list including 'in today's world', 'it's crucial to', and 'plays a vital role'. The list is transparent but not a validated detector; people and software can both use these phrases.",
  },
  {
    question: "Can ESL writers get flagged unfairly?",
    answer:
      "Yes. Vocabulary diversity, sentence structure, and phrase choice vary with language background, genre, subject, and editing. The same heuristic band can therefore describe many unrelated kinds of writing and must not be treated as an authorship judgment.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All analysis happens entirely in your browser using JavaScript. Your text never leaves your device. No data is stored, transmitted, or logged.",
  },
  {
    question: "Why does the tool require 100 words?",
    answer:
      "The product requires 100 words so its descriptive measurements are not based on only a few sentences. This minimum does not make the authorship interpretation accurate or validated.",
  },
];

export default function AiWritingAnalyzerPage() {
  return (
    <>
      <WebAppSchema
        name="Free AI Writing Pattern Analyzer"
        description={tool.description}
        url={pageUrl}
        dateModified={"2026-07-12"}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "AI Writing Analyzer", href: "/ai-writing-analyzer" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">AI Writing Analyzer</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          AI Writing Pattern Analyzer
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          This browser-only tool reports writing statistics and transparent heuristic flags. It does not determine whether a human or AI wrote the text.
        </p>

        <ToolAnswerBlock slug="ai-writing-analyzer" />

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <AiWritingAnalyzerTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="ai-writing-analyzer" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Analyze Writing Patterns
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Copy at
              least 100 words into the input area. For more reliable results, use 300+
              words.
            </p>
            <p>
              <strong className="text-neutral-200">2. Review the dashboard.</strong> Each
              metric is color-coded using the product&apos;s fixed lower, middle, and higher
              heuristic bands.
            </p>
            <p>
              <strong className="text-neutral-200">3. Read the explanations.</strong> Each
              metric card explains what it measures and why the ranges differ between AI
              and human text.
            </p>
            <p>
              <strong className="text-neutral-200">4. Consider the full picture.</strong> No
              single metric is definitive. Look at the overall pattern across all metrics
              and remember that many legitimate factors affect writing style.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Writing Pattern Analysis
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Statistical writing analysis examines measurable properties of text —
              sentence structure, word choice diversity, phrase repetition, and
              punctuation habits — to characterize writing style. These techniques
              can characterize a sample&apos;s style. This implementation does not use a
              trained classification model or a validation dataset.
            </p>
            <p>
              <strong className="text-neutral-200">Sentence length variation</strong> is
              reported as a standard deviation. A lower value means sentence lengths are
              more similar within this sample; a higher value means they vary more.
            </p>
            <p>
              <strong className="text-neutral-200">Vocabulary diversity</strong> measures
              the ratio of unique words to total words. The result changes with sample
              length, subject, genre, quotations, and editing style.
            </p>
            <p>
              <strong className="text-neutral-200">Transition words and filler phrases</strong> are
              counted from fixed lists included in the tool. The counts can help an editor
              notice repetitive language, but they do not identify who or what wrote it.
            </p>
            <p>
              It is critical to understand that none of these metrics can prove AI
              authorship. Writing style is influenced by education, native language,
              genre conventions, editing processes, and individual habits. This tool
              provides statistical data points, not conclusions.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="ai-writing-analyzer" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About AI Writing Analyzer
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

        <AdSlot slot="before-footer" page="ai-writing-analyzer" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Analyze writing patterns here, then explore our other text analysis tools.
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
              href="/text-diff"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔍</div>
              <div className="mt-1 text-sm font-semibold">Text Diff</div>
              <p className="mt-1 text-xs text-neutral-400">Compare two texts side by side</p>
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
              href="/"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔄</div>
              <div className="mt-1 text-sm font-semibold">Case Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Convert text case instantly</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
