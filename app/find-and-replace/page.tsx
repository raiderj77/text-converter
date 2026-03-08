import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { FindAndReplaceTool } from "@/components/tools/find-and-replace";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("find-and-replace")!;
const pageUrl = buildUrl("/find-and-replace");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "find and replace", "find and replace online", "text find replace",
    "find and replace text tool", "find replace free", "search and replace text",
    "find and replace online text tool", "text find replace free",
    "bulk find and replace", "regex find and replace", "case sensitive find replace",
    "whole word find replace", "find and replace in text online",
    "text search and replace tool", "replace all occurrences",
    "find replace with regex", "online text replacement tool",
    "find and replace no signup",
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
    question: "How do I find and replace text online?",
    answer:
      "Paste your text in the input box, type the word or phrase you want to find in the Find field, type the replacement in the Replace field, and click Replace All. All matches are replaced instantly. You can see a live preview of matches highlighted in yellow before replacing.",
  },
  {
    question: "What does the Case Sensitive option do?",
    answer:
      "When Case Sensitive is enabled, the tool only matches text with the exact same uppercase and lowercase letters. For example, searching for 'Hello' will not match 'hello' or 'HELLO'. When disabled (the default), all case variations are matched.",
  },
  {
    question: "What does Whole Word matching do?",
    answer:
      "Whole Word mode only matches the search term when it appears as a complete word, not as part of a longer word. For example, searching for 'cat' with Whole Word enabled will match 'cat' but not 'category' or 'concatenate'. This uses word boundary detection.",
  },
  {
    question: "How does Regex Mode work?",
    answer:
      "Regex Mode lets you use regular expression patterns in the Find field. You can use patterns like \\d+ to match numbers, [A-Z] to match uppercase letters, or (foo|bar) to match alternatives. In the Replace field, use $1, $2, etc. to reference capture groups from your pattern.",
  },
  {
    question: "Can I undo a replacement?",
    answer:
      "Yes. After clicking Replace All, the Undo Last Replace button becomes active. Click it to restore your text to the state it was in before the last replacement. This works for one level of undo — if you need multiple undos, consider copying your original text before making changes.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing runs entirely in your browser using JavaScript. Your text never leaves your device. Nothing is logged, stored, or transmitted to any server. The tool works offline once loaded.",
  },
];

export default function FindAndReplacePage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Find and Replace Text Online — Free Tool"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Find & Replace", href: "/find-and-replace" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Find and Replace Text Online — Free Tool
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Find and replace text with live match highlighting, regex support, case-sensitive
          matching, and whole-word options. See every match highlighted before you replace.
          Undo any replacement instantly. Free, no signup, 100% client-side.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <FindAndReplaceTool />
        </div>

        <AdSlot slot="after-tool" page="find-and-replace" />

        {/* How to Use */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Find and Replace Tool
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Drop your text
              into the input box. The word and character count updates as you type. Your text is
              saved locally so it persists across page reloads.
            </p>
            <p>
              <strong className="text-neutral-200">2. Enter a search term.</strong> Type the word
              or phrase you want to find. Matches are counted and highlighted live in the preview
              area below — no button click needed.
            </p>
            <p>
              <strong className="text-neutral-200">3. Set your options.</strong> Toggle Case
              Sensitive to match exact capitalization. Enable Whole Word to avoid partial matches.
              Turn on Regex Mode for pattern-based searching with full regular expression support.
            </p>
            <p>
              <strong className="text-neutral-200">4. Enter replacement text.</strong> Type what
              you want to replace the matches with. Leave it empty to delete all matches. In Regex
              Mode, use $1, $2 for capture group backreferences.
            </p>
            <p>
              <strong className="text-neutral-200">5. Click Replace All.</strong> All matches are
              replaced in one click. The button shows the match count. If something goes wrong,
              click Undo Last Replace to restore the previous version.
            </p>
          </div>
        </section>

        {/* Educational content */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use Find and Replace
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Editing documents:</strong> Rename a character
              in a story, update a company name across a contract, or fix a repeated typo in an
              article. Paste the full text, search for the old term, and replace it everywhere in
              one click — no manual scrolling required.
            </p>
            <p>
              <strong className="text-neutral-200">Cleaning data:</strong> Remove unwanted
              characters, normalize formatting, or strip HTML tags from pasted content. Use regex
              mode to match patterns like extra whitespace, special characters, or repeated
              punctuation and replace them with clean alternatives.
            </p>
            <p>
              <strong className="text-neutral-200">Code refactoring:</strong> Rename a variable,
              function, or class across a code snippet. Whole Word mode ensures you only replace
              exact identifiers — searching for &ldquo;id&rdquo; won&rsquo;t accidentally change
              &ldquo;width&rdquo; or &ldquo;hidden&rdquo;.
            </p>
            <p>
              <strong className="text-neutral-200">CSV and data processing:</strong> Replace
              delimiters (commas to tabs, semicolons to commas), update column values in bulk, or
              fix inconsistent date formats. Regex mode handles complex patterns like reformatting
              dates from MM/DD/YYYY to YYYY-MM-DD.
            </p>
            <p>
              <strong className="text-neutral-200">Email and content templates:</strong> Replace
              placeholder tokens like {"{"}{"{"}&nbsp;name&nbsp;{"}"}{"}"} or {"{"}{"{"}&nbsp;company&nbsp;{"}"}{"}"}
              with actual values. Prepare mass email content or fill in template variables before
              sending.
            </p>
            <p>
              <strong className="text-neutral-200">Translation and localization:</strong> Swap
              terms between languages, replace US English spellings with UK English (color to
              colour, organize to organise), or update locale-specific terminology across
              documentation.
            </p>
            <p>
              <strong className="text-neutral-200">Log analysis:</strong> Extract or redact
              sensitive information from log files. Use regex to find IP addresses, email
              addresses, or API keys and replace them with masked values like [REDACTED] for safe
              sharing.
            </p>
            <p>
              <strong className="text-neutral-200">Markdown and HTML editing:</strong> Convert
              heading levels, swap link formats, or replace inline styles with CSS classes. Regex
              patterns can target specific HTML attributes or Markdown syntax for precise bulk
              edits.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="find-and-replace" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="find-and-replace" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Find and replace text here, then clean, compare, test patterns, or deduplicate
            with our other free tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { slug: "text-cleaner", emoji: "🧹", name: "Text Cleaner", desc: "Remove extra spaces, line breaks, and hidden characters from messy text." },
              { slug: "regex-tester", emoji: "⚙️", name: "Regex Tester", desc: "Test regex patterns with real-time highlighting and capture group display." },
              { slug: "text-diff", emoji: "🔍", name: "Text Diff", desc: "Compare two texts side by side and see every difference highlighted." },
              { slug: "duplicate-line-remover", emoji: "🗑️", name: "Duplicate Remover", desc: "Remove duplicate lines from any list with one click." },
            ].map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
              >
                <div className="text-lg mb-1">{t.emoji}</div>
                <h3 className="text-sm font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs text-neutral-400">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* All tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Find and replace text here, then use our other free tools to convert, format,
            encode, or analyze your content.
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
