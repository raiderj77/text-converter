import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "About FlipMyCase — Free Text Conversion Tools",
  description:
    "FlipMyCase offers 73+ free browser-based text tools for developers, writers, and content creators. All processing happens client-side — your text never leaves your device.",
  alternates: { canonical: `${SITE_URL}/about` },
  keywords: [
    "about flipmycase", "free text tools", "online text converter",
    "browser-based text tools", "developer text tools",
  ],
  openGraph: {
    title: "About FlipMyCase — Free Text Conversion Tools",
    description:
      "73+ free browser-based text tools for developers, writers, and content creators. No signup, no data collection.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <OrganizationSchema />
      <main className="mx-auto max-w-3xl px-4 py-8" style={{ lineHeight: 1.7 }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">About FlipMyCase</h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>

        {/* Section 1 — What FlipMyCase is */}
        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">What Is FlipMyCase?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              FlipMyCase is a free, no-signup suite of text conversion and formatting tools built for
              developers, writers, and content creators. The site currently offers 73+ tools covering
              case conversion, code formatting, text encoding, data analysis, and more.
            </p>
            <p>
              Every tool runs entirely in your browser. No text is ever sent to a server, stored in a
              database, or logged anywhere. You can verify this by using any tool while completely
              offline — once the page loads, no network connection is required for processing.
            </p>
            <p>
              The core case converter supports uppercase, lowercase, Title Case, Sentence case,
              camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, alternating
              case, inverse case, and URL slug format. Beyond case conversion, you will find JSON,
              CSS, HTML, SQL, XML, and YAML formatters, a regex tester, hash generators, encoding
              tools, readability analyzers, and dozens of other utilities.
            </p>
          </div>
        </section>

        {/* Section 2 — Who we built this for */}
        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">Who We Built This For</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              <strong className="text-neutral-200">Developers</strong> who need quick code formatting
              and encoding tools without leaving the browser — JSON validation, regex testing, hash
              generation, JWT decoding, UUID generation, Base64 encoding, and cron expression building.
            </p>
            <p>
              <strong className="text-neutral-200">Writers and editors</strong> who need case
              conversion, word counts, readability scores, text cleanup, and duplicate removal to
              polish drafts before publishing.
            </p>
            <p>
              <strong className="text-neutral-200">Social media managers</strong> who need fancy
              Unicode text styles, bold and italic generators, strikethrough text, bubble text, and
              character counters for platform-specific limits.
            </p>
            <p>
              <strong className="text-neutral-200">Students and professionals</strong> who need quick
              data conversion between formats — CSV to JSON, HTML to Markdown, binary to text, hex
              encoding, and number base conversion.
            </p>
          </div>
        </section>

        {/* Section 3 — Editorial approach */}
        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">Our Editorial Approach</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              Every tool page on FlipMyCase includes educational content that explains what the tool
              does, when you should use it, and how the underlying technology works. We do not publish
              thin pages with just a text box and a button — each page is a complete resource with
              frequently asked questions, use-case examples, and links to related tools.
            </p>
            <p>
              For developer tools, we verify technical accuracy against official specifications.
              Regex syntax follows the ECMAScript standard. Hash algorithms match the Web Crypto API
              output. Encoding tools conform to RFC 4648 (Base64), RFC 3986 (URL encoding), and
              the HTML Living Standard (HTML entities). JSON formatting follows ECMA-404.
            </p>
            <p>
              Written and maintained by an experienced web developer with over 10 years of experience
              building developer tools and web applications.
            </p>
          </div>
        </section>

        {/* Section 4 — Privacy commitment */}
        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">Privacy Commitment</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              All text processing on FlipMyCase is client-side JavaScript. We do not log, store, or
              transmit any text you enter into our tools. Your input stays in your browser tab and is
              never sent over the network.
            </p>
            <p>
              The site uses Google Analytics for aggregate traffic trends and Google AdSense for
              non-intrusive advertising. Both are configured with Google Consent Mode v2 and respect
              Global Privacy Control (GPC) signals. No personally identifiable text content is ever
              collected by any analytics or advertising service.
            </p>
            <p>
              For full details, see our{" "}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </section>

        {/* Section 5 — Suggest a tool */}
        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">Suggest a Tool or Report a Bug</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-3">
            <p>
              FlipMyCase is actively developed. If you have an idea for a new tool, found a bug, or
              want to suggest an improvement, we would like to hear from you. Visit
              our{" "}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Contact page
              </Link>{" "}
              for instructions on submitting feedback through GitHub Issues. Include a small example
              input and the output you expected so we can reproduce and fix the issue quickly.
            </p>
          </div>
        </section>

        <p className="mt-8 text-xs text-neutral-500">Last updated: March 11, 2026</p>
      </main>
    </>
  );
}
