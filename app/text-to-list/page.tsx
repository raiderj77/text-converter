import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TextToListTool } from "@/components/tools/text-to-list";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("text-to-list")!;
const pageUrl = buildUrl("/text-to-list");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text to list", "text to list converter", "paragraph to bullet points",
    "text to bullet list", "convert text to list", "text to numbered list",
    "text to html list", "text to markdown list", "paragraph to list",
    "convert text to bullet points", "text to ul li", "text to ordered list",
    "split text into list", "text to list free", "text to list online",
    "convert paragraph to list no signup",
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
    question: "What split modes are available?",
    answer:
      "The tool offers four split modes: By Line (splits on line breaks), By Sentence (splits after periods, exclamation marks, and question marks), By Comma (splits on commas), and Custom (splits on any delimiter you specify, such as a pipe, semicolon, or multi-character string).",
  },
  {
    question: "What output formats can I choose?",
    answer:
      "Five output formats are available: Bullet points using the bullet character (•), Numbered list (1. 2. 3.), HTML unordered list (<ul><li>), Markdown unordered list (- item), and Markdown ordered list (1. item). Each format is ready to paste into its target context.",
  },
  {
    question: "Does the tool remove empty items?",
    answer:
      "Yes. After splitting, the tool trims whitespace from each item and removes any that are empty. This means blank lines, trailing commas, or extra delimiters will not produce blank list items in the output.",
  },
  {
    question: "Can I use a multi-character delimiter?",
    answer:
      "Yes. In Custom split mode, you can enter any string as a delimiter — single characters like | or ;, or multi-character strings like :: or --> or even words. The tool splits the text exactly where that string appears.",
  },
  {
    question: "How does sentence splitting work?",
    answer:
      "Sentence mode splits text after punctuation marks (. ! ?) followed by whitespace. This handles most standard English prose. It may not perfectly handle abbreviations (Dr., U.S.) or decimal numbers, but works well for paragraphs of regular text.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing runs entirely in your browser using JavaScript. Your text never leaves your device. Nothing is logged, stored, or transmitted to any server. The tool works offline once loaded.",
  },
];

export default function TextToListPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Text to List Converter — Free Online Tool"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text to List", href: "/text-to-list" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Text to List Converter — Free Online Tool
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A text to list converter transforms paragraphs and sentences into bullet points, numbered lists, or Markdown lists. Paste your text below to convert it to a formatted list instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Text To List Tool</h2>

          <h2>Text To List Features and Options</h2>

          <h2>About the Free Online Text To List</h2>

        </div>


        <div className="mt-4">
          <TextToListTool />
        </div>

        <AdSlot slot="after-tool" page="text-to-list" />

        {/* How to Use */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Text to List Converter
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Drop
              your paragraph, data, or any text into the input box. It can be
              multiple lines, a comma-separated string, or sentences in a paragraph.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose a split mode.</strong>{" "}
              Select how the tool should break your text apart: by line breaks, by
              sentence endings, by commas, or by a custom delimiter you specify.
            </p>
            <p>
              <strong className="text-neutral-200">3. Pick an output format.</strong>{" "}
              Choose bullet points, numbered list, HTML ul/li, Markdown unordered, or
              Markdown ordered. The output updates instantly as you change the format.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy Output to copy the formatted list to your clipboard. Paste it into
              your document, email, blog post, or code editor.
            </p>
          </div>
        </section>

        {/* Educational content */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Convert Text to Lists?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Better readability:</strong>{" "}
              Dense paragraphs are harder to scan than structured lists. Research
              shows that readers process bulleted and numbered lists faster than
              continuous prose. Converting key points into list items makes your
              content more accessible and easier to digest, whether it is a blog
              post, presentation, or internal document.
            </p>
            <p>
              <strong className="text-neutral-200">Meeting notes to action items:</strong>{" "}
              After a meeting, you often have a block of notes with tasks mixed
              into sentences. Splitting by sentence and converting to a numbered
              list turns those notes into a clear action item checklist. Each
              item stands alone, making it easy to assign owners and track
              completion.
            </p>
            <p>
              <strong className="text-neutral-200">CSV data formatting:</strong>{" "}
              Comma-separated values are common in spreadsheets and databases,
              but they are hard to read as raw text. Splitting by comma and
              formatting as a bulleted list makes the data human-readable
              instantly. This is useful for quick data reviews, email summaries,
              or documentation.
            </p>
            <p>
              <strong className="text-neutral-200">HTML and Markdown authoring:</strong>{" "}
              Writing HTML list markup by hand is tedious, especially for long
              lists. Paste your items (one per line or comma-separated), select
              HTML ul/li format, and get properly structured markup ready to
              drop into your web page. The same applies to Markdown lists for
              GitHub READMEs, documentation, and static site generators.
            </p>
            <p>
              <strong className="text-neutral-200">Presentation preparation:</strong>{" "}
              Slide decks work best with concise bullet points. Take your draft
              paragraph, split it by sentence, and each sentence becomes a
              bullet point you can refine for your slides. This workflow is
              faster than manually breaking apart text in your presentation
              software.
            </p>
            <p>
              <strong className="text-neutral-200">Data pipeline preprocessing:</strong>{" "}
              When preparing text data for processing pipelines, you often need
              to split content by specific delimiters. The custom delimiter
              option handles pipe-separated values, tab-separated data, or any
              other format. The clean output with empty items removed is ready
              for the next step in your pipeline.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-to-list" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Text To List
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

        <AdSlot slot="before-footer" page="text-to-list" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert text to lists here, then sort, clean, format, or number your
            content with our other free tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { slug: "text-sorter", emoji: "📊", name: "Text Sorter", desc: "Sort lines alphabetically, numerically, or randomly." },
              { slug: "add-line-numbers", emoji: "🔢", name: "Add Line Numbers", desc: "Add or remove line numbers with custom formatting." },
              { slug: "add-prefix-suffix", emoji: "➕", name: "Add Prefix/Suffix", desc: "Add prefix or suffix to every line of text." },
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
            Convert text to lists here, then use our other free tools to convert,
            format, encode, or analyze your content.
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
