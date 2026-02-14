import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug } from "@/lib/config";
import { conversions } from "@/lib/conversions";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CaseConverterTool } from "@/components/tools/case-converter";

const tool = getToolBySlug("")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: SITE_URL,
    type: "website",
  },
};

/**
 * FAQ items — rendered as visible content AND as JSON-LD schema.
 * Google can use these for rich snippets in search results.
 */
const faqItems = [
  {
    question: "Is this text case converter really free?",
    answer:
      "Yes. The tool is completely free with no signup, no account, and no usage limits. It runs in your browser.",
  },
  {
    question: "Does this tool store or send my text anywhere?",
    answer:
      "No. All conversions happen in your browser using JavaScript. Your text never leaves your device. The tool saves your input to localStorage so refreshing the page does not lose your work.",
  },
  {
    question: "What is the difference between camelCase and PascalCase?",
    answer:
      "camelCase starts with a lowercase letter (userName), while PascalCase starts with an uppercase letter (UserName). camelCase is common for JavaScript variables. PascalCase is common for class names and React components.",
  },
  {
    question: "What is a slug and when should I use one?",
    answer:
      "A slug is a URL-friendly version of a string. It uses lowercase letters, numbers, and hyphens. Use slugs for blog post URLs, product page URLs, and any web address that needs to be human-readable.",
  },
  {
    question: "What is the difference between kebab-case and snake_case?",
    answer:
      "kebab-case uses hyphens between words (my-variable) and is common in URLs and CSS class names. snake_case uses underscores (my_variable) and is common in Python, Ruby, and database column names.",
  },
  {
    question: "Can I use this tool on my phone?",
    answer:
      "Yes. The tool is fully responsive and works on any device with a modern browser. Paste text, tap a copy button, and paste the result into your app.",
  },
  {
    question: "What is CONSTANT_CASE used for?",
    answer:
      "CONSTANT_CASE (also called SCREAMING_SNAKE_CASE) uses all uppercase letters with underscores. It is the standard convention for constants in languages like JavaScript, Python, Java, and C.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Structured data for Google */}
      <WebAppSchema
        name="Free Text Case Converter"
        description={tool.description}
        url={SITE_URL}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }]} />

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* H1 — visible to Google in the HTML source, no JS required */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Case Converter
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Paste text once. See every format instantly. Copy with one click. No signup, no limits,
          works entirely in your browser.
        </p>

        {/* Interactive tool — client component */}
        <div className="mt-4">
          <CaseConverterTool />
        </div>

        {/* ========== SEO CONTENT BELOW ========== */}
        {/* Everything below is server-rendered HTML that Google indexes directly */}

        {/* How to use */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Text Case Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input
              box above or type directly. The tool accepts any length of text.
            </p>
            <p>
              <strong className="text-neutral-200">2. See all formats at once.</strong> The
              converter instantly shows your text in uppercase, lowercase, Title Case, Sentence
              case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case,
              alternating case, inverse case, and URL slug format.
            </p>
            <p>
              <strong className="text-neutral-200">3. Click Copy</strong> on any output card to
              copy that format to your clipboard. Paste it wherever you need it.
            </p>
          </div>
        </section>

        {/* Supported formats — gives Google keyword-rich content */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Supported Text Case Formats
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {conversions.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-sm font-semibold">{c.label}</div>
                <p className="mt-1 text-xs text-neutral-400">{c.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases — long-tail keyword content */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Case Converter
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Writing and blogging:</strong> Convert
              headings to Title Case for blog posts, articles, and landing pages. Generate
              URL-friendly slugs from titles for SEO.
            </p>
            <p>
              <strong className="text-neutral-200">Software development:</strong> Convert
              variable names between camelCase, snake_case, PascalCase, and CONSTANT_CASE when
              switching between JavaScript, Python, SQL, and other languages.
            </p>
            <p>
              <strong className="text-neutral-200">Data cleanup:</strong> Normalize messy text
              from PDFs, spreadsheets, or email by converting to lowercase first, then applying
              the format you need.
            </p>
            <p>
              <strong className="text-neutral-200">SEO and URLs:</strong> Generate
              lowercase hyphenated slugs from page titles for clean, crawlable URLs that search
              engines prefer.
            </p>
            <p>
              <strong className="text-neutral-200">Social media:</strong> Use alternating case
              or inverse case for stylistic effect in posts and comments.
            </p>
          </div>
        </section>

        {/* FAQ — visible content that matches the JSON-LD schema */}
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

        {/* Internal linking — critical for SEO authority flow */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            FlipMyCase is building a suite of free browser-based text tools. All tools are free,
            require no signup, and process text entirely in your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📖 Text Case Guides
            </Link>
            <Link
              href="/learn"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📚 Learn the Formats
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
