import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TextDiffTool } from "@/components/tools/text-diff";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("text-diff")!;
const pageUrl = buildUrl("/text-diff");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text diff", "compare two texts", "diff checker online", "text comparison tool",
    "find differences between two texts", "online diff tool", "compare text files",
    "side by side text comparison", "text diff online free", "diff two strings",
    "compare documents online", "line by line comparison", "code diff online",
    "file comparison tool", "compare paragraphs online", "text difference finder",
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
    question: "How do I compare two texts online?",
    answer:
      "Paste your original text in the left box and the modified text in the right box. The tool instantly highlights additions in green and deletions in red. Unchanged lines are shown in the default color.",
  },
  {
    question: "What types of differences does this tool detect?",
    answer:
      "The tool performs a line-by-line comparison and detects three types of changes: additions (lines present only in the modified text), deletions (lines present only in the original text), and unchanged lines (identical in both texts).",
  },
  {
    question: "Can I ignore case differences when comparing?",
    answer:
      "Yes. Enable the 'Ignore case' option to treat uppercase and lowercase letters as equal. This is useful when comparing text where capitalization has changed but the content is the same.",
  },
  {
    question: "Can I ignore whitespace differences?",
    answer:
      "Yes. Enable the 'Ignore whitespace' option to collapse multiple spaces, tabs, and leading/trailing whitespace before comparing. This is useful for comparing code or formatted text where indentation has changed.",
  },
  {
    question: "Can I copy the diff output?",
    answer:
      "Yes. Click the 'Copy Diff' button to copy the entire diff in a standard unified format with + for additions, - for deletions, and spaces for unchanged lines. You can paste this into emails, pull requests, or documentation.",
  },
  {
    question: "What is a diff or text comparison?",
    answer:
      "A diff (short for difference) is a comparison between two versions of text that shows exactly what changed. It is commonly used in software development to review code changes, in editing to track document revisions, and in data processing to verify updates.",
  },
  {
    question: "Can I compare code with this tool?",
    answer:
      "Yes. This tool works with any plain text including source code, configuration files, CSV data, JSON, HTML, Markdown, and more. Use the 'Ignore whitespace' option when comparing code with different indentation styles.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All comparison processing happens entirely in your browser using JavaScript. Your text never leaves your device. Nothing is logged, stored, or transmitted.",
  },
  {
    question: "How large can the texts be?",
    answer:
      "The tool handles texts up to several thousand lines without issues. All processing runs in your browser, so performance depends on your device. For very large files (10,000+ lines), a desktop browser will perform best.",
  },
  {
    question: "What is the difference between line-level and word-level diff?",
    answer:
      "Line-level diff compares entire lines and marks them as added, removed, or unchanged. Word-level diff goes further by highlighting the specific words that changed within a line. This tool uses line-level diff for clarity and speed.",
  },
];

export default function TextDiffPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Free Text Diff — Compare Two Texts Online"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text Diff", href: "/text-diff" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Diff — Compare Two Texts Online
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Compare two blocks of text and instantly see every difference highlighted.
          Additions shown in green, deletions in red. Ignore case and whitespace.
          Copy the diff output. Free, no signup, runs entirely in your browser.
        </p>

        <div className="mt-4">
          <TextDiffTool />
        </div>

        <AdSlot slot="after-tool" page="text-diff" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Compare Two Texts Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your original text</strong> in
              the left box. This is the "before" version — the baseline you are comparing
              against.
            </p>
            <p>
              <strong className="text-neutral-200">2. Paste your modified text</strong> in
              the right box. This is the "after" version — the updated content you want to
              check for changes.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the diff output.</strong> Lines
              added to the modified text appear in green with a + symbol. Lines removed from
              the original appear in red with a - symbol. Unchanged lines are shown normally.
            </p>
            <p>
              <strong className="text-neutral-200">4. Adjust comparison options.</strong> Toggle
              "Ignore case" to treat uppercase and lowercase as equal. Toggle "Ignore whitespace"
              to ignore spacing and indentation changes.
            </p>
            <p>
              <strong className="text-neutral-200">5. Copy or swap.</strong> Click "Copy Diff"
              to copy the output in unified diff format. Click "Swap" to reverse original
              and modified texts.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Text Diff Tool
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Code review:</strong> Compare two versions
              of a file to see exactly what changed before committing. Works with JavaScript,
              Python, HTML, CSS, JSON, YAML, and any programming language.
            </p>
            <p>
              <strong className="text-neutral-200">Document editing:</strong> Track changes
              between drafts of articles, contracts, emails, or reports. Spot every addition
              and deletion without reading both versions word by word.
            </p>
            <p>
              <strong className="text-neutral-200">Data validation:</strong> Compare CSV
              exports, database dumps, or API responses to verify that data updates are
              correct and no unexpected changes slipped through.
            </p>
            <p>
              <strong className="text-neutral-200">Configuration debugging:</strong> Compare
              config files (nginx.conf, .env, tsconfig.json) between environments to find
              the setting that is different between staging and production.
            </p>
            <p>
              <strong className="text-neutral-200">SEO and content:</strong> Compare meta
              descriptions, title tags, or page copy before and after edits. Verify that
              only the intended changes were made.
            </p>
            <p>
              <strong className="text-neutral-200">Translation verification:</strong> Compare
              the original and translated text side by side to check that no paragraphs
              were accidentally skipped or duplicated.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-diff" />

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

        <AdSlot slot="before-footer" page="text-diff" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Compare text here, then use our other tools to clean, convert, format, or
            encode it.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={t.slug === "" ? "/" : `/${t.slug}`}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
