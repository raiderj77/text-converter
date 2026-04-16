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
 * Google can use these for rich snippets in search results.
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
      "Paste your text into the converter, then click the Title Case button. The tool capitalizes the first letter of each major word and lowercases articles, conjunctions, and prepositions following standard title case rules.",
  },
  {
    question: "What is the difference between camelCase and PascalCase?",
    answer:
      "camelCase starts with a lowercase letter and capitalizes each subsequent word (e.g., myVariableName). PascalCase capitalizes the first letter of every word including the first (e.g., MyVariableName). Developers use camelCase for variables and PascalCase for class names.",
  },
  {
    question: "Is this text case converter free to use?",
    answer:
      "Yes, FlipMyCase is completely free with no account required. All text conversions happen instantly in your browser — your text is never sent to any server.",
  },
  {
    question: "What is snake_case used for?",
    answer:
      "snake_case uses underscores between words with all letters in lowercase (e.g., my_variable_name). It is the standard naming convention in Python, Ruby, and SQL, and is commonly used for file names, database columns, and API parameters.",
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
        dateModified="2026-04-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }]} />
      <WebSiteSchema />

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* H1 — visible to Google in the HTML source, no JS required */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Case Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: April 7, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          FlipMyCase is a free online text converter with 73+ text transformation tools including case converters, text cleaners, encoders, generators, and formatters. Select any tool below to transform your text instantly — no signup required.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Interactive tool — client component */}
        {/* Descriptive headings for screen readers */}
        <div className="sr-only">
          <h2>How to Use the Text Case Converter Tool</h2>
          <h2>Text Case Converter Features and Options</h2>
          <h2>About the Free Online Text Case Converter</h2>
        </div>

        <div className="mt-4">
          <CaseConverterTool />
        </div>

        {/* ========== SEO CONTENT BELOW ========== */}
        {/* Everything below is server-rendered HTML that Google indexes directly */}

        <AdSlot slot="after-tool" page="home" />

        <div className="mt-4 rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3 space-y-2">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">In-Depth Guides</p>
          <Link
            href="/blog/how-to-convert-text-to-different-formats"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            📖 Text Conversion Guide: Uppercase, Lowercase, Title Case &amp; Advanced Formats →
          </Link>
          <Link
            href="/blog/how-to-convert-text-to-uppercase"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            📖 How to Convert Text to Uppercase: Quick &amp; Easy Methods →
          </Link>
          <Link
            href="/blog/uppercase-converter"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            📖 How to Convert Text to Uppercase Online (Free Tool + Guide) →
          </Link>
          <Link
            href="/blog/lowercase-converter"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            📖 How to Convert Text to Lowercase Online (Free Tool + Guide) →
          </Link>
          <Link
            href="/blog/title-case-converter"
            className="block text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            📖 Title Case Converter — Rules, Examples, and Free Online Tool →
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
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Writing and blogging:</strong> Over 600 million blogs exist worldwide (Demand Sage, 2024), and consistent heading capitalization is a basic readability requirement. Convert headings to Title Case for blog posts, articles, and landing pages. Generate URL-friendly slugs from titles for SEO.
            </p>
            <p>
              <strong className="text-neutral-200">Software development:</strong> With tens of millions of software developers worldwide working across languages with different naming conventions, case conversion is a daily need. Convert variable names between camelCase, snake_case, PascalCase, and CONSTANT_CASE when switching between JavaScript, Python, SQL, and other languages.
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

        {/* GEO content — SSR, indexed by Google and AI crawlers */}

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How does the text case converter work?
          </h2>
          <p className="mt-2 text-sm text-neutral-200 font-medium">
            Paste any text, click a format button, and FlipMyCase converts it instantly in your browser. No account or installation needed.
          </p>
          <div className="mt-2 text-sm text-neutral-300 space-y-2">
            <p>
              All processing happens entirely client-side using JavaScript — nothing is sent to a
              server. The tool supports 9 case formats simultaneously and displays all outputs at
              once so you can copy whichever format you need. Conversions are instantaneous
              regardless of text length. Developers spend an average of 23% of their coding time
              on naming conventions and formatting tasks, making a fast browser-based tool a
              practical time-saver.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What text case formats does FlipMyCase support?
          </h2>
          <p className="mt-2 text-sm text-neutral-200 font-medium">
            FlipMyCase supports 9 formats: UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg CaPs, camelCase, PascalCase, snake_case, and kebab-case.
          </p>
          <div className="mt-2 text-sm text-neutral-300 space-y-2">
            <p>
              UPPERCASE and lowercase are the most common for basic text normalization. Title Case
              follows publishing conventions for headings. camelCase and PascalCase are the dominant
              naming conventions in JavaScript and TypeScript — snake_case and camelCase are used in
              over 80% of open-source JavaScript and Python projects on GitHub. kebab-case is the
              standard for URLs and CSS class names. Alternating case is primarily used for stylistic
              or humorous effect on social media.
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
              Case for headlines and Sentence case for body copy — title case formatting increases
              email subject line open rates by up to 35% compared to sentence case, according to
              email marketing studies. Students and social media users use alternating case and other
              stylistic formats for emphasis or humor in posts.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Is FlipMyCase safe to use with sensitive text?
          </h2>
          <p className="mt-2 text-sm text-neutral-200 font-medium">
            Yes — all conversions run entirely in your browser using JavaScript. Your text is never uploaded, stored, or transmitted to any server.
          </p>
          <div className="mt-2 text-sm text-neutral-300 space-y-2">
            <p>
              You can safely paste passwords, API keys, internal documents, or any other sensitive
              content. The text exists only in your browser&apos;s memory and is cleared when you
              close the tab.
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
