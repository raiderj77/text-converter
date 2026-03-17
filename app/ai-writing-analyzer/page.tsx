import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AiWritingAnalyzerTool } from "@/components/tools/ai-writing-analyzer";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

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
      "This tool calculates statistical patterns in your text: sentence length uniformity, vocabulary diversity, transition word density, repeated phrases, paragraph structure, passive voice usage, punctuation frequency, and the presence of common AI filler phrases. Each metric is compared to typical ranges observed in AI-generated and human-written text.",
  },
  {
    question: "Can this tool detect AI-written text?",
    answer:
      "No. This tool analyzes statistical writing patterns only. It cannot determine whether text was written by AI or a human. Many factors affect these patterns, including the writer's native language, editing history, writing style, and subject matter. The results should be used as one data point among many — never as proof.",
  },
  {
    question: "What does the Writing Pattern Score mean?",
    answer:
      "The score ranges from 0 to 100. Lower scores indicate writing patterns that are statistically more common in human-written text. Higher scores indicate patterns more commonly seen in AI-generated text. The score reflects statistical tendencies, not definitive classification.",
  },
  {
    question: "Why is sentence length uniformity important?",
    answer:
      "AI language models tend to generate sentences of similar length, resulting in a low standard deviation. Human writers naturally vary their sentence structure more — mixing short, punchy sentences with longer, complex ones — which produces a higher standard deviation.",
  },
  {
    question: "What are AI filler phrases?",
    answer:
      "These are phrases that appear disproportionately often in AI-generated text compared to human writing. Examples include 'in today's world', 'it's crucial to', 'plays a vital role', 'when it comes to', and 'a wide range of'. Their presence does not prove AI authorship, but high concentrations are statistically unusual in human writing.",
  },
  {
    question: "Can ESL writers get flagged unfairly?",
    answer:
      "Yes, this is a known limitation. Writers using English as a second language may naturally have lower vocabulary diversity or more uniform sentence structures. Academic writers and technical authors may also produce patterns that overlap with AI-typical ranges. This is why the tool clearly states it analyzes patterns, not authorship.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All analysis happens entirely in your browser using JavaScript. Your text never leaves your device. No data is stored, transmitted, or logged.",
  },
  {
    question: "How many words do I need for accurate results?",
    answer:
      "The tool requires a minimum of 100 words. For more statistically meaningful results, paste 300+ words. Short text samples produce less reliable metrics because there is not enough data to calculate meaningful standard deviations and frequency ratios.",
  },
];

export default function AiWritingAnalyzerPage() {
  return (
    <>
      <WebAppSchema
        name="Free AI Writing Pattern Analyzer"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
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
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An AI writing pattern analyzer examines text for statistical patterns common in AI-generated content, including sentence uniformity and vocabulary diversity. Paste your text below to analyze its writing patterns instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the AI Writing Analyzer Tool</h2>

          <h2>AI Writing Analyzer Features and Options</h2>

          <h2>About the Free Online AI Writing Analyzer</h2>

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
              metric is color-coded: green indicates patterns typical of human writing,
              yellow is ambiguous, and red indicates patterns more common in AI-generated
              text.
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
              have been used in computational linguistics and forensic stylometry
              long before AI-generated text existed. What has changed is that
              large language models produce text with statistically distinctive
              patterns that differ from typical human writing.
            </p>
            <p>
              <strong className="text-neutral-200">Sentence length variation</strong> is
              one of the most studied metrics. Human writers naturally alternate between
              short, emphatic sentences and longer, more complex constructions. This
              creates a high standard deviation in sentence length. AI models tend to
              generate sentences of more uniform length, producing a lower standard
              deviation.
            </p>
            <p>
              <strong className="text-neutral-200">Vocabulary diversity</strong> measures
              the ratio of unique words to total words. AI models often reuse the same
              vocabulary across a text, while human writers tend to introduce more
              synonyms and varied word choices, especially in longer passages.
            </p>
            <p>
              <strong className="text-neutral-200">Transition words and filler phrases</strong> are
              connective words like &quot;furthermore,&quot; &quot;moreover,&quot; and
              &quot;additionally&quot; that AI models use at higher rates than most human
              writers. Similarly, certain filler phrases like &quot;in today&apos;s world&quot;
              and &quot;it&apos;s crucial to&quot; appear in AI text far more frequently
              than in human writing samples.
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
