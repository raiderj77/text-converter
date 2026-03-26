import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ReadabilityAnalyzerTool } from "@/components/tools/readability-analyzer";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("readability-analyzer")!;
const pageUrl = buildUrl("/readability-analyzer");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "readability checker", "readability score tool", "flesch kincaid calculator",
    "readability analyzer online", "gunning fog index calculator",
    "readability test online free", "smog index calculator",
    "coleman liau index", "dale chall readability", "text readability checker",
    "reading level checker", "grade level checker for text",
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
    question: "What is the Flesch Reading Ease score?",
    answer:
      "The Flesch Reading Ease score rates text on a 0–100 scale, where higher scores mean easier reading. Scores of 60–70 are considered standard for general audiences. Scores above 80 are very easy (suitable for 6th graders), while scores below 30 indicate very difficult academic or technical writing.",
  },
  {
    question: "What grade level should I target?",
    answer:
      "For general audiences, target grade 8 (the level recommended by most plain language guidelines). Blog posts and marketing copy work best at grades 6–8. Business communication typically falls at grades 8–10. Academic writing may range from grade 12 to 16+.",
  },
  {
    question: "What is the Gunning Fog Index?",
    answer:
      "The Gunning Fog Index estimates the years of formal education needed to understand text on first reading. It weighs sentence length and the percentage of complex words (three or more syllables). A fog index of 12 means roughly college-level reading. Most popular writing targets a fog index of 8–10.",
  },
  {
    question: "How is the SMOG Index different?",
    answer:
      "SMOG (Simple Measure of Gobbledygook) focuses specifically on polysyllabic words (3+ syllables) and is considered one of the most accurate readability formulas for health-related content. It was designed to predict the grade level a reader needs to comprehend text fully, making it the standard for medical and public health communications.",
  },
  {
    question: "What does the Dale-Chall score mean?",
    answer:
      "The Dale-Chall formula compares words against a list of 3,000 words that most 4th-grade students know. The more 'difficult' words (not on the list), the higher the score. Scores below 5.0 are easily understood by 4th graders. Scores of 9.0+ are college-level. It is particularly useful for assessing readability for younger or less experienced readers.",
  },
  {
    question: "Why do the different formulas give different grades?",
    answer:
      "Each formula weighs different factors. Flesch-Kincaid focuses on sentence length and syllable count. Coleman-Liau uses character count instead of syllables. SMOG emphasizes polysyllabic words. Dale-Chall uses a familiar word list. The average across all formulas gives the most balanced estimate.",
  },
  {
    question: "What do the sentence colors mean?",
    answer:
      "When you enable sentence analysis, each sentence is colored by its individual grade level. Uncolored sentences are grade 8 or below (easy). Yellow sentences are grade 9–12 (moderate). Red sentences are grade 13+ (difficult). This helps you identify specific sentences that could be simplified.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All readability calculations happen entirely in your browser. Your text is never transmitted, stored, or logged.",
  },
];

export default function ReadabilityAnalyzerPage() {
  return (
    <>
      <WebAppSchema
        name="Free Readability Score Analyzer"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Readability Analyzer", href: "/readability-analyzer" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Readability Analyzer</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Readability Score Analyzer — Free Online
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A readability analyzer calculates reading level scores using Flesch-Kincaid, Gunning Fog, SMOG, and other formulas. Paste your text below to check its readability grade level instantly.
        </p>

        <ToolAnswerBlock slug="readability-analyzer" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Readability Analyzer Tool</h2>

          <h2>Readability Analyzer Features and Options</h2>

          <h2>About the Free Online Readability Analyzer</h2>

        </div>


        <div className="mt-4">
          <ReadabilityAnalyzerTool />
        </div>

        <AdSlot slot="after-tool" page="readability-analyzer" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Check Readability Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Copy at
              least 30 words into the input area. Longer texts (200+ words) produce
              more accurate readability scores.
            </p>
            <p>
              <strong className="text-neutral-200">2. Review the scores.</strong> See your
              average grade level and Flesch Reading Ease at a glance, then explore
              individual formula scores in the card grid.
            </p>
            <p>
              <strong className="text-neutral-200">3. Compare to benchmarks.</strong> Use
              the comparison panel to see how your text compares to Harry Potter,
              The New York Times, and academic journals.
            </p>
            <p>
              <strong className="text-neutral-200">4. Find difficult sentences.</strong> Click
              &quot;Show Sentence Analysis&quot; to see which specific sentences push
              your grade level higher, so you can simplify them.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Readability Scores Matter
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Readability determines whether your audience actually reads and
              understands your content. Studies consistently show that simpler
              writing reaches more people, increases engagement, and improves
              comprehension. The average American adult reads at an 8th-grade
              level, which is why the U.S. government, healthcare organizations,
              and major publications all target this level.
            </p>
            <p>
              <strong className="text-neutral-200">Content marketing and SEO.</strong> Google
              has repeatedly emphasized that content should be written for users
              first. Pages with clearer, more readable content tend to have lower
              bounce rates and higher engagement metrics. While readability is not
              a direct ranking factor, its effects on user behavior signals are
              well documented.
            </p>
            <p>
              <strong className="text-neutral-200">Healthcare and legal communication.</strong> The
              SMOG formula was specifically designed for health literacy assessment.
              The CDC, NIH, and many hospitals require patient materials to be
              written at a 6th-grade level. Legal plain language initiatives also
              push for lower grade levels to ensure contracts and notices are
              understandable.
            </p>
            <p>
              <strong className="text-neutral-200">Academic and technical writing.</strong> While
              academic writing naturally scores at higher grade levels, awareness
              of readability helps researchers communicate findings more effectively.
              Many journals now encourage authors to include plain-language
              summaries alongside technical abstracts.
            </p>
            <p>
              The most actionable readability improvement is sentence length. Long,
              compound sentences with multiple clauses are the primary driver of
              high grade levels. Breaking long sentences into two shorter ones
              almost always improves readability without losing meaning.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="readability-analyzer" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Readability Analyzer
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

        <AdSlot slot="before-footer" page="readability-analyzer" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Check readability here, then explore our other writing analysis tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
