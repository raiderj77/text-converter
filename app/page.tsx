import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug } from "@/lib/config";
import { conversions } from "@/lib/conversions";
import { WebAppSchema, WebSiteSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CaseConverterTool } from "@/components/tools/case-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("")!;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: SITE_URL },
  keywords: [
    "text case converter", "uppercase converter", "lowercase converter",
    "title case converter", "sentence case converter", "camelCase converter",
    "PascalCase converter", "snake_case converter", "kebab-case converter",
    "text to uppercase", "text to lowercase", "convert text case online",
    "change text case", "toggle case", "capitalize text online",
    "URL slug generator", "text formatter", "case changer online free",
  ],
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: SITE_URL,
    type: "website",
  },
};

/**
 * FAQ items — rendered as visible content AND as JSON-LD schema.
 * Markup describes the visible questions; rich-result display is not promised.
 */
const faqItems = [
  {
    question: "What is a text case converter?",
    answer:
      "A text case converter is a free online tool that instantly transforms your text between formats including UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. No software installation required.",
  },
  {
    question: "How do I convert text to title case?",
    answer:
      "Paste your text and copy the Title Case output. This is a basic English capitalization heuristic with a fixed minor-word list, not a complete AP or Chicago style implementation. Review names, acronyms and punctuation manually.",
  },
  {
    question: "What is the difference between camelCase and PascalCase?",
    answer:
      "camelCase starts with a lowercase letter and capitalizes each subsequent word (e.g., myVariableName). PascalCase capitalizes the first letter of every word including the first (e.g., MyVariableName). Developers use camelCase for variables and PascalCase for class names.",
  },
  {
    question: "Is this text case converter free to use?",
    answer:
      "Yes. FlipMyCase is free and requires no account. The converter processes text in your browser and does not intentionally send tool input to FlipMyCase or analytics.",
  },
  {
    question: "What is snake_case used for?",
    answer:
      "snake_case uses underscores between words with all letters in lowercase (e.g., my_variable_name). Python's PEP 8 recommends this style for function and variable names. Other languages, databases and projects have their own conventions.",
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
        dateModified={"2026-09-07"}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }]} />
      <WebSiteSchema />

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* H1 — visible to Google in the HTML source, no JS required */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Case Converter
        </h1>
        <p className="text-sm text-gray-400 mt-1 mb-4 text-center">Last reviewed: September 7, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          FlipMyCase is a free online text converter with 75 interactive tools and 3 reference guides, including case converters, text cleaners, encoders, generators, and formatters. Select a tool below to transform your text — no signup required.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Interactive tool — client component */}

        <div className="mt-4">
          <CaseConverterTool />
        </div>

        {/* ========== SEO CONTENT BELOW ========== */}
        {/* Everything below is server-rendered HTML that Google indexes directly */}

        <AdSlot slot="after-tool" page="home" />

        <div className="mt-4 rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3 space-y-2">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Popular Tools</p>
          <Link
            href="/text-cleaner"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clean extra spaces, line breaks, and hidden characters →
          </Link>
          <Link
            href="/word-counter"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Count words, characters, sentences, and reading time →
          </Link>
          <Link
            href="/slug-generator"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Create a clean URL slug from any title →
          </Link>
          <Link
            href="/json-formatter"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Format, validate, and minify JSON →
          </Link>
          <Link
            href="/tools"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Browse every available tool →
          </Link>
        </div>

        {/* How to use */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Text Case Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input
              box above or type directly. Large inputs can slow the browser; work in smaller sections if needed.
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

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Case Converter
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Writing and blogging:</strong> Convert headings
              to Title Case for articles and landing pages, normalize inconsistent capitalization,
              or generate a URL-friendly slug from a draft title.
            </p>
            <p>
              <strong className="text-neutral-200">Software development:</strong> Convert identifiers
              between camelCase, snake_case, PascalCase, and CONSTANT_CASE when moving between
              JavaScript, Python, SQL, and other naming conventions.
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

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How does the text case converter work?
          </h2>
          <p className="mt-2 text-sm text-neutral-200 font-medium">
            Paste or type text and compare all output cards. Use Copy on the format you need. No account or installation needed.
          </p>
          <div className="mt-2 text-sm text-neutral-300 space-y-2">
            <p>
              The converter provides 16 JavaScript outputs in the page and
              shows every result together, so you can compare formats before copying one. Tool input
              is not intentionally sent to FlipMyCase or analytics. Very large text can take longer
              to render, depending on the device and browser.
            </p>
            <p>Random case can change when the input is edited. Identifier formats split common ASCII word boundaries, but do not validate programming-language syntax or preserve all Unicode characters. <Link href="/articles/convert-identifiers-without-losing-word-boundaries" className="underline">See tested examples and limitations.</Link></p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What text case formats does FlipMyCase support?
          </h2>
          <p className="mt-2 text-sm text-neutral-200 font-medium">
            FlipMyCase supports 16 outputs, including UPPERCASE, lowercase, Title Case, Sentence
            case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, inverse
            case, alternating styles, and a URL slug.
          </p>
          <div className="mt-2 text-sm text-neutral-300 space-y-2">
            <p>
              UPPERCASE and lowercase are the most common for basic text normalization. Title Case
              uses a basic English heuristic. camelCase and PascalCase are widely used in
              JavaScript and TypeScript, snake_case is common in Python and SQL, and kebab-case is
              common in URLs and CSS class names. Alternating and random-looking styles are primarily
              useful for informal or decorative text.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Who uses a text case converter?
          </h2>
          <p className="mt-2 text-sm text-neutral-200 font-medium">
            Developers, writers, students, and social media managers use text case converters to reformat copy quickly without manual editing.
          </p>
          <div className="mt-2 text-sm text-neutral-300 space-y-2">
            <p>
              Software developers use it to rename variables, database columns, and API fields when
              switching between languages with different naming conventions. Content writers use Title
              Case for headlines, document titles, and formal headings where capitalization
              conventions signal professionalism and readability. Students and social media users use
              alternating case and other stylistic formats for emphasis or humor in posts.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How does FlipMyCase handle sensitive text?
          </h2>
          <p className="mt-2 text-sm text-neutral-200 font-medium">
            Case conversion runs in your browser. The case converter does not send pasted text to
            FlipMyCase servers or save it in browser storage.
          </p>
          <div className="mt-2 text-sm text-neutral-300 space-y-2">
            <p>
              Local processing reduces network exposure, but it cannot protect you from a compromised
              device, browser extension, shared clipboard, or screen capture. Do not paste passwords,
              private keys, active access tokens, or other secrets into any website. Use the Clear
              control when you are finished with ordinary private text.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Further Reading</h2>
          <ul className="mt-2 text-sm text-neutral-300 space-y-1 list-disc list-inside">
            <li>
              <a
                href="https://google.github.io/styleguide/jsguide.html#naming-camel-case-defined"
                rel="nofollow noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Google JavaScript Style Guide — camelCase naming rules
              </a>
            </li>
            <li>
              <a
                href="https://peps.python.org/pep-0008/#function-and-variable-names"
                rel="nofollow noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Python PEP 8 — snake_case for function and variable names
              </a>
            </li>
            <li>
              <a
                href="https://www.chicagomanualofstyle.org/qanda/data/faq/topics/CapitalizationTitles.html"
                rel="nofollow noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Chicago Manual of Style — Title Case capitalization rules
              </a>
            </li>
          </ul>
        </section>

        <AdSlot slot="mid-content" page="home" />

        {/* FAQ — visible content that matches the JSON-LD schema */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Text Case Converter
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

        <AdSlot slot="before-footer" page="home" />

        {/* Internal linking — critical for SEO authority flow */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Most people who convert case also need to clean up extra spaces or check how long the result is. The text cleaner removes spacing artifacts from copy-pasted text, and the word counter shows length, reading time, and keyword density.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/tools"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Browse All Tools
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
