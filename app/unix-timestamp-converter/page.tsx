import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { UnixTimestampConverterTool } from "@/components/tools/unix-timestamp-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("unix-timestamp-converter")!;
const pageUrl = buildUrl("/unix-timestamp-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "unix timestamp converter", "epoch converter", "timestamp to date",
    "date to timestamp", "unix time converter", "epoch time converter",
    "timestamp converter online", "unix epoch converter", "milliseconds to date",
    "utc timestamp converter", "unix time to date", "epoch to human date",
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
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC, known as the Unix epoch. It provides a single integer that represents a specific moment in time, regardless of timezone.",
  },
  {
    question: "What is the Unix epoch?",
    answer:
      "The Unix epoch is January 1, 1970 at 00:00:00 UTC. It was chosen as the reference point for Unix time because it was close to when Unix was created. All Unix timestamps are calculated as seconds before or after this moment.",
  },
  {
    question: "What is the difference between seconds and milliseconds timestamps?",
    answer:
      "Standard Unix timestamps count seconds since the epoch (10 digits, like 1709683200). Millisecond timestamps count milliseconds (13 digits, like 1709683200000) and are commonly used in JavaScript (Date.now()), Java (System.currentTimeMillis()), and many APIs. This tool supports both formats.",
  },
  {
    question: "What is the Year 2038 problem?",
    answer:
      "The Year 2038 problem (Y2K38) occurs on January 19, 2038 at 03:14:07 UTC, when the Unix timestamp exceeds the maximum value of a 32-bit signed integer (2,147,483,647). Systems using 32-bit integers for time will overflow and may interpret the date as December 13, 1901. Most modern systems use 64-bit integers, which will not overflow for 292 billion years.",
  },
  {
    question: "How do I get the current Unix timestamp in code?",
    answer:
      "In JavaScript: Math.floor(Date.now() / 1000). In Python: import time; time.time(). In PHP: time(). In Java: System.currentTimeMillis() / 1000. In Bash: date +%s. All return seconds since the Unix epoch.",
  },
  {
    question: "Can Unix timestamps be negative?",
    answer:
      "Yes. Negative timestamps represent dates before January 1, 1970. For example, -86400 represents December 31, 1969. This allows Unix timestamps to represent dates as far back as the system supports, though very old dates may have reduced precision.",
  },
  {
    question: "Why do developers use Unix timestamps?",
    answer:
      "Unix timestamps are timezone-independent (always UTC), easy to compare mathematically (simple integer comparison), compact to store (a single number), and universally supported across programming languages and databases. They avoid the complexities of date string parsing and timezone conversion.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversions happen in your browser using JavaScript. Your timestamps and dates never leave your device.",
  },
];

export default function UnixTimestampConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Unix Timestamp Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Unix Timestamp Converter", href: "/unix-timestamp-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Unix Timestamp Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Unix Timestamp Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A Unix timestamp converter transforms epoch time to human-readable dates and dates to Unix timestamps. Enter a timestamp or date below to convert instantly.
        </p>

        <ToolAnswerBlock slug="unix-timestamp-converter" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Unix Timestamp Converter Tool</h2>

          <h2>Unix Timestamp Converter Features and Options</h2>

          <h2>About the Free Online Unix Timestamp Converter</h2>

        </div>


        <div className="mt-4">
          <UnixTimestampConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="unix-timestamp-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Unix Timestamps Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your unit.</strong> Select
              whether your timestamp is in seconds (10 digits, standard Unix time) or
              milliseconds (13 digits, used in JavaScript and Java).
            </p>
            <p>
              <strong className="text-neutral-200">2. Convert timestamp to date.</strong> Paste
              a Unix timestamp into the first input and instantly see the date in local time,
              UTC, and ISO 8601 format. Click Now to load the current timestamp.
            </p>
            <p>
              <strong className="text-neutral-200">3. Convert date to timestamp.</strong> Use
              the date picker in the second section to select any date and time. The
              corresponding Unix timestamp appears instantly.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy your result.</strong> Each output
              has a Copy button. The live clock at the top always shows the current epoch time
              and can also be copied with one click.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Unix Time and Epoch Timestamps
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Unix time is the system most computers use to track time internally. Rather
              than storing dates as complex strings with years, months, days, and timezones,
              Unix time reduces everything to a single integer: the number of seconds since
              January 1, 1970 at midnight UTC. This simplicity is what makes it so widely
              adopted across every programming language, database, and operating system.
            </p>
            <p>
              <strong className="text-neutral-200">Why a single number matters.</strong> When
              you need to compare two dates, store a timestamp in a database, or transmit
              time across an API, a single integer is far simpler than a formatted date
              string. There are no timezone ambiguities, no daylight saving time
              complications, and no date format conflicts (is 01/02/03 January 2nd or
              February 1st?). Unix timestamps are always UTC, always unambiguous, and always
              just math.
            </p>
            <p>
              <strong className="text-neutral-200">Seconds vs milliseconds.</strong> The
              original Unix timestamp uses seconds, but many modern systems use milliseconds
              for greater precision. JavaScript&apos;s Date.now() returns milliseconds, as do
              Java&apos;s System.currentTimeMillis() and most modern APIs. You can convert
              between them by multiplying or dividing by 1000. This tool supports both
              formats automatically.
            </p>
            <p>
              <strong className="text-neutral-200">The Year 2038 problem</strong> is the
              biggest known issue with Unix timestamps. Systems storing timestamps as 32-bit
              signed integers will overflow on January 19, 2038 at 03:14:07 UTC. The maximum
              32-bit value (2,147,483,647) will roll over to a negative number, potentially
              displaying dates in 1901. Most modern systems already use 64-bit integers,
              which extend the range to approximately 292 billion years, but embedded systems
              and legacy software remain at risk.
            </p>
            <p>
              Developers encounter Unix timestamps daily in server logs, database records,
              API responses, JWT tokens, file metadata, and cron job configurations.
              Understanding how to read and convert them quickly is a fundamental skill for
              backend development, DevOps, and debugging.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="unix-timestamp-converter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Unix Timestamp Converter
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

        <AdSlot slot="before-footer" page="unix-timestamp-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert timestamps here, then use our other developer tools for encoding,
            formatting, and data conversion.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/uuid-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🆔</div>
              <div className="mt-1 text-sm font-semibold">UUID Generator</div>
              <p className="mt-1 text-xs text-neutral-400">Generate random v4 UUIDs in bulk</p>
            </Link>
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, octal, decimal & hex conversions</p>
            </Link>
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML, hex & binary encoding</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
