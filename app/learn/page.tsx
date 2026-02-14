import Link from "next/link";
import type { Metadata } from "next";
import { getLiveTools, buildUrl } from "@/lib/config";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/schema";
import { AdSlot } from "@/components/ui/ad-slot";

const pageUrl = buildUrl("/learn");

export const metadata: Metadata = {
  title: "Learn Text Case Styles — When to Use Each Format",
  description:
    "Clear examples and use cases for uppercase, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, and URL slugs.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Learn Text Case Styles | FlipMyCase",
    description:
      "Clear examples and use cases for every text case format. From writing to code.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "Why do symbols disappear in camelCase and PascalCase?",
    answer:
      "Those formats are used for code identifiers. Symbols and extra separators are removed so the result stays valid for variables, classes, and functions.",
  },
  {
    question: "Why do URLs prefer kebab-case?",
    answer:
      "Hyphens are widely supported, easy to read, and recommended by Google for URL structure. They also work well in file names across all operating systems.",
  },
  {
    question: "What is the difference between kebab-case and a slug?",
    answer:
      "They look similar. A slug applies extra cleanup like removing quotes, special characters, and trimming repeated separators to produce a clean URL-safe string.",
  },
  {
    question: "Should I use Title Case or Sentence case for headings?",
    answer:
      "Pick one style and be consistent. Title Case is traditional for blog titles and book chapters. Sentence case is common in modern app interfaces and is easier to read.",
  },
];

function Ex(props: { label: string; useFor: string; example: string; notes?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
      <div className="text-sm font-semibold">{props.label}</div>
      <div className="mt-2 text-sm text-neutral-400">{props.useFor}</div>
      <div className="mt-3 rounded-xl border border-white/10 bg-neutral-950 px-3 py-2 text-sm font-mono break-words">
        {props.example}
      </div>
      {props.notes ? (
        <div className="mt-2 text-xs text-neutral-500">{props.notes}</div>
      ) : null}
    </div>
  );
}

export default function LearnPage() {
  const tools = getLiveTools();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Learn", href: "/learn" },
        ]}
      />
      <FaqSchema items={faqItems} />

      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Learn Text Case Styles
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          Text casing shows up everywhere — headings, emails, spreadsheets, code variables,
          file names, and URLs. This guide explains what each case is, where it is used, and
          how to avoid common mistakes.
        </p>

        {/* Quick definitions */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Quick Definitions</h2>
          <div className="mt-3 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <div className="text-sm font-semibold">Case</div>
              <p className="mt-2 text-sm text-neutral-400">
                A case style is a consistent way to format letters, word boundaries, and
                separators. The goal is clarity and consistency.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
              <div className="text-sm font-semibold">Separators</div>
              <p className="mt-2 text-sm text-neutral-400">
                Some formats use separators like underscores or hyphens. Others remove
                separators and use capital letters to mark word boundaries.
              </p>
            </div>
          </div>
        </section>

        <AdSlot slot="after-tool" page="learn" />

        {/* Common writing cases */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Common Writing Cases</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Use these formats for documents, emails, headings, and general readability.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <Ex
              label="UPPERCASE"
              useFor="Labels, warnings, and short emphasis."
              example="WARNING: DO NOT SHARE PASSWORDS."
              notes="Avoid long all-caps paragraphs. They reduce readability."
            />
            <Ex
              label="lowercase"
              useFor="Normalization, consistency, and casual writing."
              example="normalize product names to lowercase before comparing."
              notes="Lowercase is common for tags, identifiers, and cleanup steps."
            />
            <Ex
              label="Title Case"
              useFor="Headings, titles, and navigation labels."
              example="How to Convert Text Case Online"
              notes="Different style guides treat minor words (a, the, in, on) differently."
            />
            <Ex
              label="Sentence case"
              useFor="Normal writing, UI labels, and short descriptions."
              example="This is a normal sentence with only the first word capitalized."
              notes="Modern apps and websites increasingly prefer sentence case for headings."
            />
          </div>
        </section>

        {/* Developer cases */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Developer Cases</h2>
          <p className="mt-2 text-sm text-neutral-400">
            These formats are used for variables, file names, URLs, and code.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <Ex
              label="camelCase"
              useFor="JavaScript variables, JSON keys, and many APIs."
              example="userName, totalPrice, isLoggedIn"
              notes="First word starts lowercase. Each next word starts uppercase."
            />
            <Ex
              label="PascalCase"
              useFor="Class names, types, and React components."
              example="UserProfile, CheckoutForm, PaymentStatus"
              notes="Same as camelCase but first word also starts uppercase."
            />
            <Ex
              label="snake_case"
              useFor="Python variables, database fields, and ETL pipelines."
              example="user_name, total_price, created_at"
              notes="Words separated by underscores. Simple and readable."
            />
            <Ex
              label="kebab-case"
              useFor="URLs, CSS class names, and file paths."
              example="text-case-converter, my-blog-post, getting-started"
              notes="Words separated by hyphens. Recommended by Google for URLs."
            />
            <Ex
              label="CONSTANT_CASE"
              useFor="Constants in JavaScript, Python, Java, and C."
              example="MAX_RETRIES, API_BASE_URL, DEFAULT_TIMEOUT"
              notes="All uppercase with underscores. Also called SCREAMING_SNAKE_CASE."
            />
            <Ex
              label="dot.case"
              useFor="Java packages, configuration keys, and object paths."
              example="com.example.app, user.settings.theme"
              notes="All lowercase with dots between words."
            />
            <Ex
              label="slug"
              useFor="URL-friendly page names and product pages."
              example="how-to-format-text, json-formatter-online"
              notes="Lowercase with hyphens. Symbols and special characters removed."
            />
          </div>
        </section>

        <AdSlot slot="mid-content" page="learn" />

        {/* Common mistakes / FAQ */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Common Questions</h2>
          <div className="mt-3 grid gap-3">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why a converter helps */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Why a Converter Saves Time</h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>Paste text once and see every format instantly. No manual retyping.</p>
            <p>Copy output with one click. Fewer manual edits means fewer mistakes.</p>
            <p>Normalize messy text from PDFs, spreadsheets, and emails in seconds.</p>
            <p>Generate clean URL slugs for posts and products without thinking about formatting rules.</p>
          </div>
        </section>

        {/* Tools cross-links */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Try the Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            All tools are free, require no signup, and process text entirely in your browser.
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
            <Link
              href="/blog"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📖 Read Guides
            </Link>
          </div>
        </section>

        <AdSlot slot="before-footer" page="learn" />
      </div>
    </>
  );
}
