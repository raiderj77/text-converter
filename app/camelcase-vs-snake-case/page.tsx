import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/config";
import { ArticleSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AdSlot } from "@/components/ui/ad-slot";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const pageUrl = `${SITE_URL}/camelcase-vs-snake-case`;

export const metadata: Metadata = {
  title: "camelCase vs snake_case vs kebab-case — Which to Use (2026)",
  description:
    "When to use camelCase, snake_case, or kebab-case in programming. Language conventions, examples, and a free converter tool.",
  alternates: { canonical: pageUrl },
  keywords: [
    "camelCase vs snake_case",
    "kebab-case vs snake_case",
    "naming conventions programming",
    "camelCase JavaScript",
    "snake_case Python",
    "kebab-case CSS",
    "variable naming conventions",
    "code style guide",
  ],
  openGraph: {
    title: "camelCase vs snake_case vs kebab-case — Which to Use (2026)",
    description:
      "When to use camelCase, snake_case, or kebab-case in programming. Language conventions, examples, and a free converter tool.",
    url: pageUrl,
    type: "article",
  },
};

const faqItems = [
  {
    question: "Is camelCase or snake_case more readable?",
    answer:
      "Research suggests snake_case is slightly more readable for non-programmers due to visual word separation. camelCase is more compact. Most developers follow their language convention rather than choosing based on readability alone.",
  },
  {
    question: "Why can't I use kebab-case in JavaScript?",
    answer:
      "Hyphens are interpreted as the subtraction operator in JavaScript. my-variable would be parsed as my minus variable. Use camelCase for JS variables and PascalCase for classes.",
  },
  {
    question: "What is PascalCase?",
    answer:
      "PascalCase (also called UpperCamelCase) capitalizes the first letter of every word including the first (e.g., MyClassName). Used for class names and constructors in most OOP languages, React components, and TypeScript interfaces.",
  },
  {
    question: "What case style does Google recommend for URLs?",
    answer:
      "Google recommends kebab-case for URLs. Google has stated that hyphens are treated as word separators while underscores are not, making kebab-case better for SEO in URL slugs.",
  },
  {
    question: "Can I mix naming conventions in one project?",
    answer:
      "Yes — it is common to use camelCase for JavaScript variables and kebab-case for CSS classes in the same project. The key is consistency within each context (all JS vars in camelCase, all CSS classes in kebab-case).",
  },
];

export default function CamelCaseVsSnakeCasePage() {
  return (
    <>
      <ArticleSchema
        title="camelCase vs snake_case vs kebab-case — Which to Use (2026)"
        description="When to use camelCase, snake_case, or kebab-case in programming. Language conventions, examples, and a free converter tool."
        url={pageUrl}
        datePublished="2026-03-11"
        dateModified="2026-03-11"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "camelCase vs snake_case", href: "/camelcase-vs-snake-case" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          camelCase vs snake_case vs kebab-case: Which to Use
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          This guide compares camelCase, snake_case, and kebab-case naming conventions and explains which to use in each programming language. Read on to learn the conventions and try the free converter tool.
        </p>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="camelcase-vs-snake-case" />

        <section className="mt-10">
          <ToolAnswerBlock slug="camelcase-vs-snake-case" />

          <h2 className="text-lg sm:text-xl font-semibold">What Is the camelCase Convention?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              camelCase joins words with no spaces, capitalizing each new word except the first
              (e.g., <code className="text-neutral-200">myVariableName</code>). It is the dominant
              naming convention in JavaScript, Java, TypeScript, Swift, and most object-oriented
              languages for variables, functions, and method names.
            </p>
            <p>
              <strong className="text-neutral-200">JavaScript:</strong>{" "}
              <code className="text-neutral-200">const firstName = &quot;Alice&quot;;</code>
            </p>
            <p>
              <strong className="text-neutral-200">Java:</strong>{" "}
              <code className="text-neutral-200">String firstName = &quot;Alice&quot;;</code>
            </p>
            <p>
              There is an important distinction between <strong className="text-neutral-200">lowerCamelCase</strong> and{" "}
              <strong className="text-neutral-200">UpperCamelCase (PascalCase)</strong>. PascalCase
              capitalizes the first letter too (e.g.,{" "}
              <code className="text-neutral-200">UserProfile</code>). PascalCase is used for class
              names, constructors, React components, and TypeScript interfaces.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is the snake_case Convention?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              snake_case joins words with underscores, all lowercase (e.g.,{" "}
              <code className="text-neutral-200">my_variable_name</code>). It is the standard
              naming convention in Python, Ruby, PHP variables, and SQL column names.
            </p>
            <p>
              <strong className="text-neutral-200">Python:</strong>{" "}
              <code className="text-neutral-200">first_name = &quot;Alice&quot;</code>
            </p>
            <p>
              <strong className="text-neutral-200">SQL:</strong>{" "}
              <code className="text-neutral-200">SELECT first_name FROM users</code>
            </p>
            <p>
              There is also <strong className="text-neutral-200">SCREAMING_SNAKE_CASE</strong>,
              which uses all uppercase letters with underscores. It is the universal convention for
              constants across nearly all programming languages:{" "}
              <code className="text-neutral-200">MAX_RETRIES = 3</code>
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is the kebab-case Convention?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              kebab-case joins words with hyphens, all lowercase (e.g.,{" "}
              <code className="text-neutral-200">my-variable-name</code>). It is used in CSS
              properties, HTML attributes, URL slugs, and file names.
            </p>
            <p>
              <strong className="text-neutral-200">CSS:</strong>{" "}
              <code className="text-neutral-200">background-color: #fff;</code>
            </p>
            <p>
              <strong className="text-neutral-200">URL:</strong>{" "}
              <code className="text-neutral-200">https://example.com/my-blog-post</code>
            </p>
            <p>
              kebab-case cannot be used for variable names in most programming languages because
              hyphens are interpreted as the subtraction operator. Writing{" "}
              <code className="text-neutral-200">my-variable</code> would be parsed as{" "}
              <code className="text-neutral-200">my minus variable</code>, causing a syntax error.
              This is why kebab-case is restricted to contexts like CSS, URLs, and file naming.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Which Convention Should You Use?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              The answer depends on the language or context. Here is a quick reference for the most
              common scenarios:
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-2 pr-4 text-left text-neutral-200">Language / Context</th>
                  <th className="py-2 pr-4 text-left text-neutral-200">Convention</th>
                  <th className="py-2 text-left text-neutral-200">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">JavaScript variables</td>
                  <td className="py-2 pr-4 text-neutral-300">camelCase</td>
                  <td className="py-2 text-neutral-400"><code>firstName</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">JavaScript classes</td>
                  <td className="py-2 pr-4 text-neutral-300">PascalCase</td>
                  <td className="py-2 text-neutral-400"><code>UserProfile</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">Python variables</td>
                  <td className="py-2 pr-4 text-neutral-300">snake_case</td>
                  <td className="py-2 text-neutral-400"><code>first_name</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">Python constants</td>
                  <td className="py-2 pr-4 text-neutral-300">SCREAMING_SNAKE_CASE</td>
                  <td className="py-2 text-neutral-400"><code>MAX_VALUE</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">SQL columns</td>
                  <td className="py-2 pr-4 text-neutral-300">snake_case</td>
                  <td className="py-2 text-neutral-400"><code>first_name</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">CSS properties</td>
                  <td className="py-2 pr-4 text-neutral-300">kebab-case</td>
                  <td className="py-2 text-neutral-400"><code>background-color</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">HTML attributes</td>
                  <td className="py-2 pr-4 text-neutral-300">kebab-case</td>
                  <td className="py-2 text-neutral-400"><code>data-user-id</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">URL slugs</td>
                  <td className="py-2 pr-4 text-neutral-300">kebab-case</td>
                  <td className="py-2 text-neutral-400"><code>my-blog-post</code></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-neutral-300">File names</td>
                  <td className="py-2 pr-4 text-neutral-300">kebab-case or snake_case</td>
                  <td className="py-2 text-neutral-400"><code>my-component.tsx</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdSlot slot="mid-content" page="camelcase-vs-snake-case" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Converting Between Different Case Styles</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Switching between naming conventions is common when working across languages or APIs.
              A JavaScript frontend using camelCase often consumes a Python API that returns
              snake_case keys. Similarly, CSS class names in kebab-case need to be referenced as
              camelCase strings in JavaScript style objects.
            </p>
            <p>
              Serialization libraries (like <code className="text-neutral-200">humps</code> for JS
              or <code className="text-neutral-200">pydantic</code> alias generators in Python) can
              automate these conversions. For quick one-off transforms, you can use our free
              converter:
            </p>
            <p>
              <Link
                href="/snake-kebab-converter"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Convert your text instantly with our free Snake/Kebab Case Converter &rarr;
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Camelcase Vs Snake Case
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

        <AdSlot slot="before-footer" page="camelcase-vs-snake-case" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Explore naming conventions and convert text with our other free tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Case Converter
            </Link>
            <Link
              href="/snake-kebab-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Snake vs Kebab Converter
            </Link>
            <Link
              href="/slug-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Slug Generator
            </Link>
            <Link
              href="/underscore-conventions"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Underscore Conventions
            </Link>
            <Link
              href="/learn"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              Learn
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
