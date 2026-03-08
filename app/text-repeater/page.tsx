import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TextRepeaterTool } from "@/components/tools/text-repeater";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("text-repeater")!;
const pageUrl = buildUrl("/text-repeater");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text repeater", "repeat text online", "text repeater tool",
    "repeat text generator free", "repeat text multiple times",
    "copy paste repeater", "text multiplier", "repeat words online",
    "repeat sentence tool", "text duplicator", "repeat string online",
    "bulk text repeater", "text repeater with separator",
    "numbered text repeater", "repeat text with numbering",
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
    question: "How many times can I repeat text?",
    answer:
      "You can repeat any text from 1 to 1,000 times. Use the slider or type a number directly into the count field. The tool generates the full output instantly in your browser with no server processing or file size limits.",
  },
  {
    question: "What separator options are available?",
    answer:
      "You can separate repeated text with a new line, space, comma, tab, or a custom separator of your choice. Custom separators let you use any character or string, such as pipes, dashes, semicolons, or even HTML tags.",
  },
  {
    question: "Can I number each repetition?",
    answer:
      "Yes. Enable the 'Number each repetition' toggle to add sequential numbering (1. 2. 3. ...) before each repeated line. This is useful for creating numbered lists, test data, or ordered sequences.",
  },
  {
    question: "Why does the preview only show 10 items?",
    answer:
      "When you repeat text more than 10 times, the tool shows a preview of the first 10 repetitions to keep the page responsive. The full output is still generated and can be copied with the 'Copy All' button.",
  },
  {
    question: "Is my text stored or sent to a server?",
    answer:
      "No. All processing happens entirely in your browser using JavaScript. Your text is never sent to any server. The tool saves your input to local storage so it persists between visits, but this data stays on your device.",
  },
  {
    question: "What are common uses for a text repeater?",
    answer:
      "Text repeaters are used for software testing (generating test data), filling templates, creating practice typing exercises, generating placeholder content, building repetitive patterns for design, and producing bulk text for stress testing applications.",
  },
];

export default function TextRepeaterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Text Repeater"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text Repeater", href: "/text-repeater" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Repeater
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Repeat any text up to 1,000 times with custom separators. Number repetitions,
          preview output, and copy with one click. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <TextRepeaterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="text-repeater" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Text Repeater
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Enter your text.</strong> Type or paste
              the text you want to repeat into the input field. It can be a single word, a
              sentence, a paragraph, or any string of characters.
            </p>
            <p>
              <strong className="text-neutral-200">2. Set the repetition count.</strong> Use
              the slider or type a number between 1 and 1,000. The preview updates instantly as
              you adjust the count.
            </p>
            <p>
              <strong className="text-neutral-200">3. Choose a separator.</strong> Select how
              repeated items are separated: new line, space, comma, tab, or enter a custom
              separator string.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              &quot;Copy All&quot; to copy the full output to your clipboard, ready to paste
              anywhere you need it.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Text Repeater
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Software testing:</strong> Generate
              repetitive test data to stress test input fields, databases, APIs, and text
              processing systems. Repeat strings hundreds of times to check for buffer
              overflows, truncation issues, or performance bottlenecks in your application.
            </p>
            <p>
              <strong className="text-neutral-200">Content creation:</strong> Create
              repetitive patterns for design mockups, social media posts, or artistic text
              layouts. Repeat decorative characters, emojis, or separator lines to build
              visual patterns quickly.
            </p>
            <p>
              <strong className="text-neutral-200">Education and practice:</strong> Generate
              practice text for typing exercises, handwriting practice sheets, or language
              learning drills. Numbered repetitions help students track their progress through
              exercises.
            </p>
            <p>
              <strong className="text-neutral-200">Data preparation:</strong> Build CSV rows,
              SQL insert statements, or configuration entries by repeating a template string
              with custom separators. Use numbered repetitions to create sequential IDs or
              indexed data.
            </p>
            <p>
              <strong className="text-neutral-200">Placeholder content:</strong> Fill layouts,
              templates, and wireframes with repeated text blocks. Unlike Lorem Ipsum, a text
              repeater lets you use your own words, giving a more realistic preview of the
              final design.
            </p>
            <p>
              <strong className="text-neutral-200">Chat and social media:</strong> Create
              dramatic emphasis by repeating words or phrases. Build text art, ASCII patterns,
              or decorative borders for messages, bios, and profile descriptions.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-repeater" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Tips for Effective Text Repetition
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Use custom separators for structured data.</strong>{" "}
              Need comma-separated values? Set the separator to comma. Building a JSON array?
              Use a custom separator like &quot;, &quot; with quotes around your text. Tab
              separators work great for spreadsheet-compatible output.
            </p>
            <p>
              <strong className="text-neutral-200">Numbered repetitions for sequential data.</strong>{" "}
              Enable numbering to create ordered lists, test sequences, or indexed entries.
              Each line gets a prefix like &quot;1. &quot;, &quot;2. &quot;, &quot;3. &quot;
              making it easy to generate numbered test cases or ordered content.
            </p>
            <p>
              <strong className="text-neutral-200">Combine with other tools.</strong> After
              repeating text, use the Text Cleaner to adjust spacing, the Text Sorter to
              reorder lines, or the Duplicate Line Remover to verify uniqueness. Chain tools
              together for complex text transformations.
            </p>
            <p>
              <strong className="text-neutral-200">Performance considerations.</strong> The
              tool handles up to 1,000 repetitions smoothly. For very long input text repeated
              many times, the preview shows only the first 10 repetitions to keep the interface
              responsive, while the full output is available via the copy button.
            </p>
          </div>
        </section>

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
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="text-repeater" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Repeat text here, then use our other tools to clean, sort, deduplicate, or generate
            placeholder content. All tools are free and run in your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/lorem-ipsum-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📝 Lorem Ipsum Generator
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🗑️ Duplicate Remover
            </Link>
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Text Sorter
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
