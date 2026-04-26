import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { MarkdownPreviewTool } from "@/components/tools/markdown-preview";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("markdown-preview")!;
const pageUrl = buildUrl("/markdown-preview");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "markdown preview online", "markdown editor live preview", "markdown to html",
    "markdown renderer online", "markdown viewer", "live markdown editor",
    "markdown preview tool", "markdown editor online free", "markdown to html converter",
    "markdown preview free", "online markdown editor", "markdown formatter",
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
    question: "What is Markdown?",
    answer:
      "Markdown is a lightweight markup language created by John Gruber in 2004. It uses simple syntax like # for headings, ** for bold, and * for italic to format plain text. Markdown is widely used for documentation, README files, blog posts, and technical writing because it is easy to read and write without a visual editor.",
  },
  {
    question: "What Markdown features does this tool support?",
    answer:
      "This tool supports standard Markdown features including headings (H1–H6), bold, italic, bold italic, strikethrough, inline code, fenced code blocks, ordered and unordered lists, links, images, blockquotes, tables, and horizontal rules. The preview updates live as you type.",
  },
  {
    question: "Can I copy the rendered HTML?",
    answer:
      "Yes. Click the 'Copy HTML' button to copy the rendered HTML markup to your clipboard. You can also download the complete preview as an .html file using the 'Download .html' button.",
  },
  {
    question: "Does this tool support GitHub Flavored Markdown?",
    answer:
      "This tool supports core GFM features including fenced code blocks with language hints, tables, strikethrough text, and task lists. It covers the most commonly used Markdown syntax for README files, documentation, and technical writing.",
  },
  {
    question: "Is my text processed on a server?",
    answer:
      "No. All Markdown parsing and HTML rendering happens entirely in your browser. Your text never leaves your device, making this tool safe for sensitive content like private documentation or unreleased project notes.",
  },
  {
    question: "What is the difference between Markdown and HTML?",
    answer:
      "Markdown is a simplified writing format that gets converted to HTML. Where HTML requires tags like <strong> for bold text, Markdown uses **bold**. Markdown is designed for writing speed and readability, while HTML offers complete control over page structure and styling. Most Markdown ultimately becomes HTML for display in browsers.",
  },
  {
    question: "Where is Markdown commonly used?",
    answer:
      "Markdown is the standard format for GitHub README files, pull request descriptions, and issue comments. It is also used by documentation tools like MkDocs and Docusaurus, static site generators like Hugo and Jekyll, note-taking apps like Obsidian and Notion, and messaging platforms like Discord and Slack.",
  },
  {
    question: "Can I use this for writing blog posts?",
    answer:
      "Absolutely. Many blogging platforms and static site generators accept Markdown as input. Write your content here with live preview, then copy the Markdown source or the rendered HTML to paste into your publishing platform.",
  },
];

export default function MarkdownPreviewPage() {
  return (
    <>
      <WebAppSchema
        name="Free Markdown Preview — Live Editor Online"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Markdown Preview", href: "/markdown-preview" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Markdown Preview</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Markdown Preview — Live Editor Online
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A Markdown preview editor lets you write Markdown and see a live rendered preview side by side. Type or paste your Markdown below to see it rendered instantly.
        </p>

        <ToolAnswerBlock slug="markdown-preview" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Markdown Preview Tool</h2>

          <h2>Markdown Preview Features and Options</h2>

          <h2>About the Free Online Markdown Preview</h2>

        </div>


        <div className="mt-4">
          <MarkdownPreviewTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="markdown-preview" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Preview Markdown Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste Markdown.</strong> Enter
              your Markdown text in the left editor pane. The syntax is simple:
              use # for headings, ** for bold, * for italic, and ``` for code blocks.
            </p>
            <p>
              <strong className="text-neutral-200">2. See the live preview.</strong> The
              right pane renders your Markdown as formatted HTML in real time.
              Every change you make is reflected instantly.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy or download.</strong> Click
              &quot;Copy HTML&quot; to copy the rendered HTML markup to your clipboard.
              Click &quot;Download .html&quot; to save a complete HTML file to your device.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Use a Markdown Preview Tool?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Markdown has become the universal language for technical writing.
              GitHub, GitLab, Stack Overflow, Reddit, Discord, and countless
              documentation platforms all support Markdown. Yet writing Markdown
              without seeing the rendered output can lead to formatting mistakes
              that are only caught after publishing. A live preview tool solves
              this by showing you exactly how your text will look.
            </p>
            <p>
              <strong className="text-neutral-200">README files and documentation.</strong> Every
              GitHub repository starts with a README.md file. Getting the heading
              hierarchy, code block formatting, table alignment, and link syntax
              right on the first commit saves time and makes your project look
              professional. This tool lets you iterate on your README locally
              before pushing.
            </p>
            <p>
              <strong className="text-neutral-200">Blog posts and articles.</strong> Static
              site generators like Hugo, Jekyll, Gatsby, and Astro use Markdown
              as their primary content format. Writing in a live preview editor
              lets you focus on content while confirming that formatting, images,
              and code snippets render correctly before building your site.
            </p>
            <p>
              <strong className="text-neutral-200">Technical notes and knowledge bases.</strong> Tools
              like Obsidian, Notion, and Confluence support Markdown for fast
              note-taking. When you need to share formatted notes outside those
              platforms, this tool converts your Markdown to clean HTML that can
              be pasted anywhere.
            </p>
            <p>
              All processing happens in your browser. Your text is never sent to
              a server, so this tool is safe for sensitive documentation, private
              project notes, and unreleased content. The parsed HTML can be
              copied directly or downloaded as a standalone file for offline use.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="markdown-preview" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Markdown Preview
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

        <AdSlot slot="before-footer" page="markdown-preview" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Preview Markdown here, then use our other tools for formatting and conversion.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/yaml-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📝</div>
              <div className="mt-1 text-sm font-semibold">YAML Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & convert YAML</p>
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
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML entity encoding</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
