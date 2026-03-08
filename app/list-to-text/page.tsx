import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ListToTextTool } from "@/components/tools/list-to-text";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("list-to-text")!;
const pageUrl = buildUrl("/list-to-text");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "list to text converter", "remove bullets from list", "convert list to paragraph",
    "strip bullet points", "list to sentence", "remove numbering from list",
    "bulleted list to text", "numbered list to text", "list to prose",
    "convert list to comma separated", "remove dashes from list",
    "list to flowing text", "bullet remover online", "list converter free",
    "join list items",
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
    question: "What bullet formats does this tool strip?",
    answer:
      "The tool automatically removes common bullet characters including dots (•), dashes (-), asterisks (*), en-dashes (–), em-dashes (—), arrows (>), and various geometric symbols (▪, ▸, ►, ●, ○, ◦, ■, □). It also strips numbered formats like \"1.\" and \"1)\" patterns.",
  },
  {
    question: "Can I use a custom separator to join list items?",
    answer:
      "Yes. Choose the \"Custom\" join option and enter any separator you want — semicolons, pipes, newlines, or any character sequence. The tool provides Space and Comma+Space as quick presets, with Custom for anything else.",
  },
  {
    question: "Does this tool handle nested or indented lists?",
    answer:
      "The tool flattens all list items regardless of indentation. Each non-empty line is treated as a separate item, with leading whitespace and bullet characters removed. If you need to preserve hierarchy, consider formatting manually after conversion.",
  },
  {
    question: "What happens to empty lines in my list?",
    answer:
      "Empty lines and lines that contain only whitespace are automatically removed during conversion. Only lines with actual content after bullet stripping are included in the output.",
  },
  {
    question: "Can I convert text back to a list?",
    answer:
      "This tool is designed for one-way conversion from list to flowing text. For the reverse direction — splitting text into a list — you can use our Text Cleaner or Add Prefix/Suffix tools to add bullets or numbers to each line.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All processing happens entirely in your browser using JavaScript. Nothing is uploaded or stored on any server. Your input is saved to local storage so it persists between visits, but never leaves your device.",
  },
];

export default function ListToTextPage() {
  return (
    <>
      <WebAppSchema
        name="Free List to Text Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "List to Text", href: "/list-to-text" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">List to Text</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free List to Text Converter
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Convert bulleted or numbered lists into flowing prose. Auto-strips bullets,
          numbers, and dashes. Join items with spaces, commas, or a custom separator.
          Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <ListToTextTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="list-to-text" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert a List to Flowing Text
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your list.</strong> Copy any
              bulleted or numbered list into the input area. The tool accepts bullet
              characters like &bull;, -, *, and numbered formats like &quot;1.&quot; or
              &quot;1)&quot;.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose a join method.</strong> Select
              how you want list items connected: a single space for flowing prose, comma +
              space for comma-separated values, or enter a custom separator like semicolons
              or pipes.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result.</strong> The tool
              converts in real time. Click the Copy button to grab the cleaned text and
              paste it wherever you need it.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Convert Lists to Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Lists are great for organizing information, but they do not always fit the
              context where you need to use them. When writing emails, social media posts,
              or prose paragraphs, bullet points can feel choppy and disconnected. Converting
              a list to flowing text creates a more natural reading experience that works
              better in narrative contexts.
            </p>
            <p>
              <strong className="text-neutral-200">Email and messaging.</strong> When you
              have notes in bullet form but need to send them as a coherent paragraph in an
              email, this tool bridges the gap. Instead of manually deleting each bullet and
              joining sentences, paste your list and get clean prose instantly. This is
              especially useful when summarizing meeting notes or project updates.
            </p>
            <p>
              <strong className="text-neutral-200">Data formatting.</strong> Developers and
              data analysts frequently need to convert lists into comma-separated values
              (CSV), pipe-delimited strings, or other structured formats. The custom
              separator option handles any delimiter you need. This saves time when
              preparing data for import, building SQL IN clauses, or creating configuration
              values.
            </p>
            <p>
              <strong className="text-neutral-200">Content creation.</strong> Writers often
              brainstorm in list form before crafting final copy. Converting a list of key
              points into a joined string gives you a starting point for polishing into a
              finished paragraph. It removes the mechanical work of stripping formatting
              so you can focus on refining the language and flow.
            </p>
            <p>
              <strong className="text-neutral-200">Accessibility and readability.</strong> In
              some contexts, particularly screen readers and simplified views, long bulleted
              lists can be harder to parse than concise sentences. Converting lists to text
              can improve the experience for users who rely on assistive technology or prefer
              continuous reading formats.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="list-to-text" />

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
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="list-to-text" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert lists to text here, then explore our other formatting tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🧹</div>
              <div className="mt-1 text-sm font-semibold">Text Cleaner</div>
              <p className="mt-1 text-xs text-neutral-400">Remove extra spaces, breaks & hidden characters</p>
            </Link>
            <Link
              href="/add-prefix-suffix"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">➕</div>
              <div className="mt-1 text-sm font-semibold">Add Prefix/Suffix</div>
              <p className="mt-1 text-xs text-neutral-400">Add text to the start or end of each line</p>
            </Link>
            <Link
              href="/remove-line-breaks"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">↩️</div>
              <div className="mt-1 text-sm font-semibold">Remove Line Breaks</div>
              <p className="mt-1 text-xs text-neutral-400">Join lines with spaces or custom separators</p>
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🗑️</div>
              <div className="mt-1 text-sm font-semibold">Duplicate Remover</div>
              <p className="mt-1 text-xs text-neutral-400">Remove duplicate lines from any list</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
