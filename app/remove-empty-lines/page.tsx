import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { RemoveEmptyLinesTool } from "@/components/tools/remove-empty-lines";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
const tool = getToolBySlug("remove-empty-lines")!;
const pageUrl = buildUrl("/remove-empty-lines");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "remove empty lines", "remove blank lines", "remove empty lines online",
    "strip blank lines", "delete empty lines", "remove whitespace lines",
    "clean blank lines", "text empty line remover", "remove blank lines from text",
    "strip empty lines online", "remove extra blank lines", "blank line remover tool",
    "remove empty lines free", "clean text blank lines", "delete blank lines online",
    "whitespace line remover",
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
    question: "How do I remove empty lines from text?",
    answer:
      "Paste your text into the input area. The tool instantly removes all blank lines and shows you the cleaned result with a count of how many lines were removed. Click Copy to grab the output.",
  },
  {
    question: "What's the difference between empty and whitespace-only lines?",
    answer:
      "An empty line contains absolutely nothing — zero characters. A whitespace-only line looks empty but contains spaces, tabs, or other invisible characters. By default, the tool removes both types. Uncheck the option to keep whitespace-only lines.",
  },
  {
    question: "Will this tool change my non-empty lines?",
    answer:
      "No. The tool only filters out empty (and optionally whitespace-only) lines. All other lines are preserved exactly as they are, including their content, indentation, and trailing spaces.",
  },
  {
    question: "Can I use this to clean up code?",
    answer:
      "Yes. Removing excessive blank lines from code is a common formatting task. The tool strips blank lines while keeping all code lines intact. It's useful for cleaning up code before pasting into documentation or emails.",
  },
  {
    question: "How many empty lines can it handle?",
    answer:
      "There's no practical limit. The tool processes text entirely in your browser, so it can handle thousands of lines instantly. Performance depends on your device, but most texts process in under a second.",
  },
  {
    question: "Is my text processed securely?",
    answer:
      "Yes. All processing happens entirely in your browser using JavaScript. Your text is never sent to any server, making it safe for confidential documents, source code, and private content.",
  },
  {
    question: "Can I keep single blank lines but remove extra ones?",
    answer:
      "Yes. Toggle the 'collapse multiple blanks' option to reduce consecutive blank lines to a single blank line. This preserves paragraph spacing while eliminating excess vertical whitespace.",
  },
  {
    question: "How do I remove empty lines in VS Code?",
    answer:
      "Open Find and Replace (Ctrl+H), enable regex mode, search for ^\\s*\\n and replace with nothing. This removes all blank lines. For collapsing, search for \\n{3,} and replace with \\n\\n.",
  },
  {
    question: "What causes empty lines in copied text?",
    answer:
      "Common sources include: spreadsheet rows with empty cells, HTML with empty <p></p> tags, email clients inserting blank lines between quoted sections, and terminal output with spacing between command results.",
  },
];

export default function RemoveEmptyLinesPage() {
  return (
    <>
      <WebAppSchema
        name="Free Remove Empty Lines Tool"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Remove Empty Lines", href: "/remove-empty-lines" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Remove Empty Lines</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Remove Empty Lines — Clean Text Online Free
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An empty line remover strips blank lines and whitespace-only lines from any block of text. Paste your text below to remove empty lines and clean up your text instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <RemoveEmptyLinesTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="remove-empty-lines" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is Blank Line Removal?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Blank line removal is the process of filtering out empty lines — lines containing
              no characters at all — from a block of text. Most tools also treat whitespace-only
              lines (lines with only spaces or tabs) as blank, since they appear visually empty
              but can trip up text parsers and import tools.
            </p>
            <p>
              There are two common modes. <strong className="text-neutral-200">Remove all blank
              lines</strong> deletes every empty line so the output has no vertical spacing between
              content lines. <strong className="text-neutral-200">Collapse multiple blank lines</strong>{" "}
              reduces runs of two or more consecutive blank lines to a single blank line — preserving
              paragraph spacing while eliminating excess whitespace.
            </p>
            <p>
              Blank lines accumulate when copying from web pages, exporting from spreadsheets,
              editing in multiple tools, or converting between document formats. They are harmless
              to human readers but cause real problems in data pipelines, code formatters, and
              import tools that treat each line as a record.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Examples for Removing Empty Lines</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <div>
              <h3 className="text-base font-semibold">JavaScript</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-javascript">{`// Remove all empty and whitespace-only lines
function removeEmptyLines(text) {
  return text.split('\\n').filter(line => line.trim() !== '').join('\\n');
}

// Collapse multiple blank lines to a single blank line
function collapseBlankLines(text) {
  return text.replace(/\\n{3,}/g, '\\n\\n');
}

// Remove only truly empty lines (keep whitespace-only lines)
function removeTrulyEmptyLines(text) {
  return text.split('\\n').filter(line => line !== '').join('\\n');
}`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Python</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-python">{`import re

# Remove all empty and whitespace-only lines
def remove_empty_lines(text):
    return '\\n'.join(line for line in text.split('\\n') if line.strip())

# Collapse multiple blank lines to a single blank line
def collapse_blank_lines(text):
    return re.sub(r'\\n{3,}', '\\n\\n', text)

# Process a file
with open('input.txt', 'r') as f:
    content = f.read()

cleaned = remove_empty_lines(content)

with open('output.txt', 'w') as f:
    f.write(cleaned)`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Bash</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-bash">{`# Remove truly empty lines (grep -v inverts match)
grep -v '^$' input.txt > output.txt

# Remove empty and whitespace-only lines
grep -v '^\\s*$' input.txt > output.txt

# Collapse multiple blank lines to one (cat -s squeezes blank lines)
cat -s input.txt > output.txt

# In-place removal with sed
sed -i '/^\\s*$/d' input.txt`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Remove Empty Lines from Text Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input
              area. The tool accepts any plain text — code, logs, documents, data files, or
              anything with unwanted blank lines. Use the example button to see a demo.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose your options.</strong> By default,
              both truly empty lines and whitespace-only lines are removed. Uncheck
              &ldquo;Also remove whitespace-only lines&rdquo; if you only want to strip
              completely empty lines.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the result.</strong> The cleaned
              output appears instantly below the input with a count of how many lines were
              removed. All non-empty lines are preserved exactly as they were.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click the Copy
              button to copy the cleaned text to your clipboard for pasting into documents,
              code editors, or anywhere else.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Remove Empty Lines from Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Empty lines accumulate in text for many reasons. Copy-pasting between
              applications, converting document formats, exporting from databases, or editing
              in multiple tools — all of these introduce unwanted blank lines. While a few
              blank lines are fine for readability, excessive empty lines make text harder to
              read, inflate file sizes, and cause issues when importing into other systems.
            </p>
            <p>
              <strong className="text-neutral-200">Cleaning up code:</strong> Source code often
              accumulates extra blank lines as developers add and remove blocks. Code style
              guides typically limit consecutive blank lines to one or two. This tool strips
              all blank lines at once, giving you a clean starting point for reformatting.
              It is especially useful before pasting code into documentation, emails, or
              presentation slides where space is limited.
            </p>
            <p>
              <strong className="text-neutral-200">Processing log files:</strong> Server logs,
              application output, and build logs often contain empty lines between entries.
              Removing them makes it easier to scan for errors, count entries, or pipe the
              output into other tools like grep or awk. Whitespace-only lines are particularly
              sneaky in logs — they look empty but contain spaces or tabs that trip up
              simple filtering.
            </p>
            <p>
              <strong className="text-neutral-200">Data cleanup:</strong> When preparing data
              for CSV imports, database inserts, or API payloads, empty lines can cause
              parsing errors or create phantom records. Stripping blank lines ensures every
              line in your data file represents a real record.
            </p>
            <p>
              <strong className="text-neutral-200">Document formatting:</strong> Text copied
              from web pages, PDFs, or rich-text editors often includes extra blank lines
              from layout spacing. Removing them produces clean, compact text that is ready
              for repurposing in any context.
            </p>
            <p>
              This tool processes everything locally in your browser. No data is uploaded,
              no account is required, and there are no limits on text length. Paste, clean,
              copy, done.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="remove-empty-lines" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Remove Empty Lines
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

        <AdSlot slot="before-footer" page="remove-empty-lines" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Remove empty lines here, then use our other tools for additional text processing.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/remove-line-breaks"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">↩️</div>
              <div className="mt-1 text-sm font-semibold">Remove Line Breaks</div>
              <p className="mt-1 text-xs text-neutral-400">Join lines with spaces, commas, or custom separators</p>
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
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🗑️</div>
              <div className="mt-1 text-sm font-semibold">Duplicate Remover</div>
              <p className="mt-1 text-xs text-neutral-400">Remove duplicate lines from any list</p>
            </Link>
            <Link
              href="/line-counter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📏</div>
              <div className="mt-1 text-sm font-semibold">Line Counter</div>
              <p className="mt-1 text-xs text-neutral-400">Count total, empty & non-empty lines</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
