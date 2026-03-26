import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("uuid-generator")!;
const pageUrl = buildUrl("/uuid-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "uuid generator", "guid generator", "uuid v4 generator", "random uuid",
    "uuid generator online", "guid generator online", "bulk uuid generator",
    "uuid without hyphens", "generate guid", "unique identifier generator",
    "uuid creator", "random guid", "uuid v4 online",
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
    question: "What is a UUID?",
    answer:
      "UUID stands for Universally Unique Identifier. It is a 128-bit value used to uniquely identify information in software systems. UUIDs are formatted as 32 hexadecimal digits displayed in five groups separated by hyphens, like 550e8400-e29b-41d4-a716-446655440000. They are designed to be unique across all systems without requiring a central registry.",
  },
  {
    question: "What is the difference between UUID and GUID?",
    answer:
      "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) are the same thing. UUID is the term used in the RFC 4122 standard and in most programming languages. GUID is the term Microsoft uses in Windows and .NET. They use the same format and generation algorithms.",
  },
  {
    question: "What is UUID v4?",
    answer:
      "UUID version 4 generates identifiers using random or pseudo-random numbers. Of the 128 bits, 122 are randomly generated, 4 bits indicate the version (4), and 2 bits indicate the variant (RFC 4122). This creates 5.3 x 10^36 possible UUIDs, making collisions virtually impossible.",
  },
  {
    question: "Can two UUIDs ever be the same?",
    answer:
      "While theoretically possible, the probability is astronomically low. With 122 random bits, you would need to generate about 2.71 x 10^18 (2.71 quintillion) UUIDs to have a 50% chance of a single collision. In practice, UUID v4 collisions are considered impossible for any realistic workload.",
  },
  {
    question: "Should I use UUIDs with or without hyphens?",
    answer:
      "Both formats are valid. The hyphenated form (8-4-4-4-12) is the standard RFC 4122 format and is more readable. The non-hyphenated form saves 4 characters and is useful for compact storage, filenames, and URL parameters. Most databases and APIs accept both formats.",
  },
  {
    question: "What are UUIDs used for?",
    answer:
      "UUIDs are used as database primary keys, API request identifiers, session tokens, file names for uploaded content, distributed system identifiers, message queue correlation IDs, and anywhere you need a unique identifier without checking a central database.",
  },
  {
    question: "Are these UUIDs cryptographically secure?",
    answer:
      "Yes. This generator uses the Web Crypto API (crypto.randomUUID or crypto.getRandomValues), which provides cryptographically secure random numbers. The UUIDs generated are suitable for use as unique identifiers in any application.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All UUID generation happens in your browser using the Web Crypto API. Nothing is sent to any server.",
  },
];

export default function UuidGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free UUID Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "UUID Generator", href: "/uuid-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">UUID Generator</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free UUID/GUID Generator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A UUID generator creates random v4 universally unique identifiers for use in databases, APIs, and applications. Click generate to create one or more UUIDs instantly.
        </p>

        <ToolAnswerBlock slug="uuid-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the UUID Generator Tool</h2>

          <h2>UUID Generator Features and Options</h2>

          <h2>About the Free Online UUID Generator</h2>

        </div>


        <div className="mt-4">
          <UuidGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="uuid-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Generate UUIDs Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Set the quantity.</strong> Enter how
              many UUIDs you need, from 1 to 100. The default is 1 for quick single-use
              generation.
            </p>
            <p>
              <strong className="text-neutral-200">2. Click Generate.</strong> Your UUIDs
              appear instantly, each with its own Copy button for quick clipboard access.
            </p>
            <p>
              <strong className="text-neutral-200">3. Choose your format.</strong> Toggle
              between uppercase and lowercase, and between hyphenated and non-hyphenated
              formats. Changes apply to all generated UUIDs immediately.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy your UUIDs.</strong> Click Copy
              on any individual UUID, or use Copy All to get all UUIDs separated by newlines.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding UUIDs in Software Development
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              UUIDs (Universally Unique Identifiers) solve a fundamental problem in software
              engineering: how to create unique identifiers without a central authority. In
              distributed systems where multiple servers, services, or devices need to create
              identifiers independently, sequential IDs like auto-incrementing integers break
              down. UUIDs allow any system to generate an identifier with virtual certainty
              that it will never collide with an identifier created anywhere else.
            </p>
            <p>
              <strong className="text-neutral-200">UUID versions</strong> serve different
              purposes. Version 1 uses the MAC address and timestamp, making it unique but
              revealing hardware information. Version 3 and 5 generate deterministic UUIDs
              from namespace and name inputs using MD5 and SHA-1 respectively. Version 4,
              which this tool generates, uses 122 random bits, making it the most widely used
              version for general-purpose unique identifiers. The newer Version 7 (RFC 9562)
              combines a Unix timestamp with random data, providing both uniqueness and
              chronological sorting.
            </p>
            <p>
              <strong className="text-neutral-200">Database primary keys</strong> are one of
              the most common uses for UUIDs. Unlike auto-incrementing integers, UUIDs can be
              generated on the client side before inserting into the database. This simplifies
              distributed architectures, allows offline ID generation, and prevents
              information leakage (sequential IDs reveal how many records exist). The trade-off
              is larger storage size (16 bytes vs 4-8 bytes for integers) and less efficient
              indexing due to randomness.
            </p>
            <p>
              <strong className="text-neutral-200">API design</strong> frequently uses UUIDs
              as resource identifiers in RESTful endpoints. Using UUIDs in URLs like
              /api/users/550e8400-e29b-41d4-a716-446655440000 is more secure than sequential
              IDs because they cannot be guessed or enumerated. This prevents IDOR
              (Insecure Direct Object Reference) vulnerabilities where attackers iterate
              through sequential IDs to access other users&apos; data.
            </p>
            <p>
              Beyond databases and APIs, UUIDs are used for browser session tokens, file
              upload naming, message queue correlation, distributed tracing, and idempotency
              keys that prevent duplicate API operations. Any situation where you need a
              unique identifier without consulting a central database is a good fit for UUIDs.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="uuid-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About UUID Generator
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

        <AdSlot slot="before-footer" page="uuid-generator" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Generate UUIDs here, then use our other developer tools for hashing, encoding,
            and password generation.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/password-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔑</div>
              <div className="mt-1 text-sm font-semibold">Password Generator</div>
              <p className="mt-1 text-xs text-neutral-400">Strong random passwords with custom options</p>
            </Link>
            <Link
              href="/hash-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">#️⃣</div>
              <div className="mt-1 text-sm font-semibold">Hash Generator</div>
              <p className="mt-1 text-xs text-neutral-400">MD5, SHA-256, SHA-512 hash generation</p>
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML, hex & binary encoding</p>
            </Link>
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, octal, decimal & hex conversions</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
