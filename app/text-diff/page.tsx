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
    "text diff", "diff checker", "compare two texts", "text comparison tool",
    "find differences between two texts", "online diff tool", "side by side text comparison",
    "word level diff", "compare text files online", "text diff online free",
    "code diff checker", "compare documents online", "line by line comparison",
    "text difference finder", "compare paragraphs", "unified diff viewer",
    "file comparison tool free", "diff two strings online",
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
      "Paste the original text in the left box and the modified text in the right box. Differences appear instantly — additions in green, deletions in red, unchanged lines in the default color. No button click needed; the comparison runs as you type.",
  },
  {
    question: "What is word-level highlighting?",
    answer:
      "Most free diff tools only highlight entire lines as added or removed. Our tool goes further — when a line has been modified (not fully replaced), it highlights the specific words that changed within that line. This makes it easy to spot a single word change inside a long paragraph.",
  },
  {
    question: "What is the difference between side-by-side and inline view?",
    answer:
      "Side-by-side (split) view shows the original and modified text in two columns so you can compare them in parallel. Inline (unified) view shows everything in a single column with + and - markers, similar to git diff output. Use side-by-side for visual comparison and inline for copying.",
  },
  {
    question: "What does 'Focus changes' do?",
    answer:
      "The 'Focus changes' option collapses consecutive unchanged lines into a single row showing '··· N unchanged lines ···'. This lets you skip straight to the parts that actually changed, which is especially useful when comparing large files with small edits.",
  },
  {
    question: "Can I navigate between differences?",
    answer:
      "Yes. Use the Prev/Next buttons in the stats bar to jump between changes. The counter shows which difference you are viewing and the total count. The view scrolls to center each difference on screen.",
  },
  {
    question: "Can I ignore case and whitespace differences?",
    answer:
      "Yes. 'Ignore case' treats uppercase and lowercase letters as equal. 'Ignore whitespace' collapses multiple spaces, tabs, and leading/trailing whitespace. Both options are useful when comparing code after reformatting or text with inconsistent capitalization.",
  },
  {
    question: "What is the similarity percentage?",
    answer:
      "The similarity score shows what fraction of lines are identical between the two texts. 100% means the texts are identical. A low similarity (under 30%) suggests the texts are too different for meaningful line-by-line comparison.",
  },
  {
    question: "Can I use this to compare code?",
    answer:
      "Yes. This tool works with any plain text including source code in any programming language, configuration files (JSON, YAML, TOML, .env), SQL queries, HTML, CSS, Markdown, and CSV data. Use 'Ignore whitespace' when comparing code with different indentation.",
  },
  {
    question: "Can I copy the diff output?",
    answer:
      "Yes. Click 'Copy Diff' to copy the entire comparison in unified diff format with + for additions, - for deletions, and spaces for unchanged lines. This format is compatible with patch files, code reviews, and documentation.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing runs entirely in your browser using JavaScript. Your text never leaves your device. Nothing is logged, stored, or transmitted to any server. The source code is open for verification.",
  },
  {
    question: "How does this compare to Diffchecker?",
    answer:
      "Diffchecker is a popular diff tool, but many of its best features — word-level diff, merge, collapsible sections — require a paid Pro subscription. Our tool provides word-level highlighting, side-by-side and inline views, focus mode, similarity scoring, and diff navigation completely free with no account required.",
  },
  {
    question: "What algorithm does this tool use?",
    answer:
      "The tool uses a Longest Common Subsequence (LCS) algorithm for line-level comparison, the same foundational approach used by git diff and the Unix diff utility. It then runs a second LCS pass at the word level within modified lines for granular highlighting.",
  },
];

export default function TextDiffPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Free Text Diff — Compare Two Texts Side by Side Online"
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
          Free Text Diff — Compare Two Texts Side by Side Online
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Compare two blocks of text and instantly see every difference highlighted with
          word-level precision. Side-by-side and inline views. Collapse unchanged lines to
          focus on changes. Navigate between diffs. Ignore case and whitespace. Copy unified
          diff output. Free, no signup, 100% client-side.
        </p>

        <div className="mt-4">
          <TextDiffTool />
        </div>

        <AdSlot slot="after-tool" page="text-diff" />

        {/* Feature grid — what competitors charge for */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Everything You Need — Free, No Pro Plan Required
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Other diff checkers lock their best features behind paid plans. We give you everything
            for free, right in your browser.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { emoji: "🔤", title: "Word-Level Highlighting", desc: "See exactly which words changed within each modified line — not just the whole line turning red or green." },
              { emoji: "↔️", title: "Side-by-Side & Inline Views", desc: "Toggle between split (parallel columns) and unified (single column with +/- markers) views instantly." },
              { emoji: "🔢", title: "Line Numbers", desc: "Every line in the original and modified text is numbered so you can reference exact positions." },
              { emoji: "🎯", title: "Focus Mode", desc: "Collapse unchanged lines to jump straight to the changes. Essential for large files with small edits." },
              { emoji: "📊", title: "Similarity Score", desc: "See what percentage of lines match between your two texts at a glance." },
              { emoji: "⬆️⬇️", title: "Diff Navigation", desc: "Prev/Next buttons jump between changes with a counter showing your position." },
              { emoji: "🔠", title: "Ignore Case & Whitespace", desc: "Filter out capitalization and spacing differences to focus on real content changes." },
              { emoji: "📋", title: "Copy Unified Diff", desc: "Export the comparison in standard unified diff format — paste into PRs, docs, or emails." },
              { emoji: "🔒", title: "100% Private", desc: "All processing in your browser. No uploads, no server, no tracking. Your text never leaves your device." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <div className="text-lg mb-1">{f.emoji}</div>
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-neutral-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Compare Two Texts Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your original text</strong> in
              the left box. This is the &ldquo;before&rdquo; version — the baseline you are comparing
              against. The line count updates as you type.
            </p>
            <p>
              <strong className="text-neutral-200">2. Paste your modified text</strong> in
              the right box. This is the &ldquo;after&rdquo; version with your changes. The diff
              output updates instantly.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the highlighted differences.</strong> Green
              = added, red = removed. Within modified lines, changed words are highlighted
              with a stronger background so you can spot the exact edit.
            </p>
            <p>
              <strong className="text-neutral-200">4. Switch views.</strong> Use &ldquo;Side by Side&rdquo;
              for visual comparison or &ldquo;Inline&rdquo; for unified diff format. Enable &ldquo;Focus
              changes&rdquo; to collapse unchanged regions.
            </p>
            <p>
              <strong className="text-neutral-200">5. Navigate and copy.</strong> Use Prev/Next
              to jump between changes. Click &ldquo;Copy Diff&rdquo; to export in unified format.
              Click &ldquo;Swap&rdquo; to reverse the comparison direction.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Text Diff Checker
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Code review:</strong> Compare two versions of a source
              file to see exactly what changed before committing. Works with JavaScript, Python, TypeScript,
              Rust, Go, HTML, CSS, SQL, and every other language.
            </p>
            <p>
              <strong className="text-neutral-200">Document editing:</strong> Track changes between
              drafts of articles, contracts, emails, reports, or README files. Spot every addition and
              deletion without reading both versions word by word.
            </p>
            <p>
              <strong className="text-neutral-200">Configuration debugging:</strong> Compare config files
              (.env, nginx.conf, tsconfig.json, docker-compose.yml) between environments to find the one
              setting that differs between staging and production.
            </p>
            <p>
              <strong className="text-neutral-200">API response validation:</strong> Compare JSON or XML
              responses from different API versions or environments to verify that changes are expected
              and nothing unexpected slipped through.
            </p>
            <p>
              <strong className="text-neutral-200">Database migrations:</strong> Compare SQL schema dumps
              before and after a migration to verify that only intended columns and indexes were changed.
            </p>
            <p>
              <strong className="text-neutral-200">SEO and content updates:</strong> Compare meta titles,
              descriptions, H1 tags, or page copy before and after edits to verify that only intended
              changes shipped.
            </p>
            <p>
              <strong className="text-neutral-200">Translation QA:</strong> Compare original and translated
              text side by side to check that no paragraphs were skipped, duplicated, or mistranslated.
            </p>
            <p>
              <strong className="text-neutral-200">Merge conflict resolution:</strong> Paste the two
              conflicting versions to see all differences, decide which changes to keep, and copy the
              resolved output.
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
              <div key={faq.question} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
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
            Compare text here, then clean, convert, format, or encode it with our other free tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link key={t.slug} href={t.slug === "" ? "/" : `/${t.slug}`} className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors">
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
