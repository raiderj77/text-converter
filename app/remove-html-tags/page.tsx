import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { RemoveHtmlTagsTool } from "@/components/tools/remove-html-tags";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("remove-html-tags")!;
const pageUrl = buildUrl("/remove-html-tags");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "remove html tags", "strip html tags", "html tag remover",
    "strip tags online", "remove html from text", "html to plain text",
    "remove xml tags", "strip html tags free", "html cleaner",
    "remove html formatting", "strip tags no signup", "decode html entities",
    "html entity decoder", "clean html online", "remove markup from text",
    "convert html to text",
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
    question: "What tags does this tool remove?",
    answer:
      "By default, the tool removes all HTML and XML tags from the text, including opening tags, closing tags, and self-closing tags. It handles standard HTML elements, custom elements, and XML-style tags. Only the tags themselves are removed — the text content between them is preserved.",
  },
  {
    question: "How do I keep specific tags?",
    answer:
      "Enter the tag names you want to preserve in the 'Keep Specific Tags' field, separated by commas. For example, entering 'a, strong, em' will strip all tags except anchor links, bold text, and italicized text. You can enter tag names with or without angle brackets — both 'a' and '<a>' work.",
  },
  {
    question: "Does it decode HTML entities?",
    answer:
      "Yes. After stripping tags, the tool decodes common HTML entities like &amp; to &, &lt; to <, &gt; to >, &nbsp; to a space, and many more. It also handles numeric entities (&#169;) and hexadecimal entities (&#x00A9;).",
  },
  {
    question: "Will it remove inline styles and attributes?",
    answer:
      "Yes. When a tag is removed, everything inside the angle brackets is removed, including class names, inline styles, data attributes, and event handlers. Only the text content outside the tags remains.",
  },
  {
    question: "Can I use this to clean email HTML?",
    answer:
      "Absolutely. Paste the HTML source of an email and the tool strips out all the table layouts, inline styles, tracking pixels, and formatting tags, leaving you with just the readable text content. This is great for archiving email content or extracting text for further processing.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing runs entirely in your browser using JavaScript. Your text never leaves your device. Nothing is logged, stored, or transmitted to any server. The tool works offline once loaded.",
  },
];

export default function RemoveHtmlTagsPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Remove HTML Tags — Strip Tags Online Free"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Remove HTML", href: "/remove-html-tags" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Remove HTML Tags — Strip Tags Online Free
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An HTML tag remover strips all HTML and XML tags from text while preserving the readable content. Paste your HTML below to remove tags and get clean plain text instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Remove HTML Tags Tool</h2>

          <h2>Remove HTML Tags Features and Options</h2>

          <h2>About the Free Online Remove HTML Tags</h2>

        </div>


        <div className="mt-4">
          <RemoveHtmlTagsTool />
        </div>

        <AdSlot slot="after-tool" page="remove-html-tags" />

        {/* How to Use */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the HTML Tag Remover
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your HTML.</strong> Drop
              HTML source code, rich text, or any markup-containing text into the
              input box. The tag count updates immediately.
            </p>
            <p>
              <strong className="text-neutral-200">2. Optionally keep specific tags.</strong>{" "}
              If you want to preserve certain tags (like links or bold text), enter
              their names in the Keep Specific Tags field, separated by commas.
            </p>
            <p>
              <strong className="text-neutral-200">3. View clean output.</strong> The
              output box shows your text with tags stripped and HTML entities decoded.
              Everything updates in real time as you type.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy Output to copy the clean text to your clipboard. Paste it into
              any document, editor, or other tool.
            </p>
          </div>
        </section>

        {/* Educational content */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Strip HTML Tags
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Content extraction:</strong>{" "}
              When copying text from web pages, the clipboard often includes HTML
              formatting tags. Stripping these tags gives you clean plain text you
              can paste into emails, documents, or text editors without carrying
              over unwanted formatting like fonts, colors, or table structures.
            </p>
            <p>
              <strong className="text-neutral-200">Data processing:</strong>{" "}
              Web scraping and data collection frequently produce text mixed with
              HTML markup. Before analyzing text content, performing NLP tasks, or
              importing data into databases, you need to remove the markup layer.
              This tool handles the stripping and entity decoding in one step.
            </p>
            <p>
              <strong className="text-neutral-200">Email archiving:</strong>{" "}
              Modern emails use complex HTML with nested tables, inline CSS, and
              tracking pixels. Stripping all tags extracts just the human-readable
              content, making emails easier to store, search, and reference. The
              decoded entities ensure special characters display correctly.
            </p>
            <p>
              <strong className="text-neutral-200">CMS migration:</strong>{" "}
              Moving content between content management systems sometimes requires
              stripping old formatting. You might need to remove all styling tags
              while keeping structural elements like links and headings. The keep
              tags feature lets you preserve exactly the elements you need.
            </p>
            <p>
              <strong className="text-neutral-200">Accessibility testing:</strong>{" "}
              Viewing text without HTML tags shows you what screen readers and
              text-only browsers see. This helps identify content that relies too
              heavily on visual formatting and may be inaccessible to users who
              depend on plain text output.
            </p>
            <p>
              <strong className="text-neutral-200">Security sanitization:</strong>{" "}
              Stripping HTML tags from user-submitted content is a common defense
              against XSS (cross-site scripting) attacks. While production
              applications should use server-side sanitization libraries, this
              tool is useful for quickly inspecting what plain text remains after
              removing all markup from suspicious content.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="remove-html-tags" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Remove HTML Tags
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

        <AdSlot slot="before-footer" page="remove-html-tags" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Strip HTML tags here, then clean, format, or convert your content with
            our other free tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { slug: "plain-text-converter", emoji: "📄", name: "Plain Text", desc: "Strip all formatting and convert to clean plain text." },
              { slug: "html-formatter", emoji: "🌐", name: "HTML Formatter", desc: "Format, beautify, and minify HTML with proper indentation." },
              { slug: "extract-urls", emoji: "🔗", name: "Extract URLs", desc: "Extract all URLs from text with deduplication and domain breakdown." },
              { slug: "text-cleaner", emoji: "🧹", name: "Text Cleaner", desc: "Remove extra spaces, line breaks, and hidden characters." },
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
            Strip HTML here, then use our other free tools to convert, format,
            encode, or analyze your content.
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
