import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { RomanNumeralConverterTool } from "@/components/tools/roman-numeral-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("roman-numeral-converter")!;
const pageUrl = buildUrl("/roman-numeral-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "roman numeral converter", "roman numerals", "convert to roman numerals",
    "roman numeral to number", "number to roman numeral", "roman numeral chart",
    "roman numeral translator", "year in roman numerals", "MMXXIV",
    "roman numeral date converter", "roman numerals 1-100",
    "roman numeral calculator", "roman numeral generator", "roman numerals free",
    "what is in roman numerals",
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
    question: "What is the range of Roman numerals supported?",
    answer:
      "This converter supports numbers from 1 to 3,999 (I to MMMCMXCIX). Traditional Roman numerals do not have a standard representation for zero or numbers above 3,999, as there is no single-character symbol for 5,000 in the classic system.",
  },
  {
    question: "How do I convert a year to Roman numerals?",
    answer:
      "Use the Date Mode tab. Enter any year between 1 and 3999, and the tool will display the Roman numeral equivalent. For example, 2024 becomes MMXXIV. This is commonly used for movie credits, building cornerstones, and clock faces.",
  },
  {
    question: "What are the basic Roman numeral symbols?",
    answer:
      "The seven basic symbols are: I (1), V (5), X (10), L (50), C (100), D (500), and M (1,000). All other numbers are formed by combining these symbols using addition and subtraction rules.",
  },
  {
    question: "How does subtractive notation work?",
    answer:
      "When a smaller value appears before a larger value, it is subtracted. For example, IV = 5 - 1 = 4, IX = 10 - 1 = 9, XL = 50 - 10 = 40, XC = 100 - 10 = 90, CD = 500 - 100 = 400, and CM = 1000 - 100 = 900. Only I, X, and C can be used subtractively.",
  },
  {
    question: "Can I click the reference table values?",
    answer:
      "Yes. Clicking any value in the reference table automatically fills the input field with that number (or Roman numeral, depending on your current mode). This makes it easy to test conversions and learn the patterns.",
  },
  {
    question: "Does this tool validate Roman numeral input?",
    answer:
      "Yes. The tool validates Roman numeral input by converting it to a number and then back to a Roman numeral. If the round-trip does not match (e.g., \"IIII\" instead of the correct \"IV\"), it reports an invalid numeral. Only properly formed Roman numerals are accepted.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversions happen entirely in your browser. Nothing is uploaded or transmitted. Your last input is saved to local storage for convenience, but it never leaves your device.",
  },
];

export default function RomanNumeralConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Roman Numeral Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Roman Numeral Converter", href: "/roman-numeral-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Roman Numeral Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Roman Numeral Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A Roman numeral converter transforms numbers into Roman numerals (I, V, X, L, C, D, M) and back. Enter a number or Roman numeral below to convert instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Roman Numeral Converter Tool</h2>

          <h2>Roman Numeral Converter Features and Options</h2>

          <h2>About the Free Online Roman Numeral Converter</h2>

        </div>


        <div className="mt-4">
          <RomanNumeralConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="roman-numeral-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Roman Numeral Converter
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your direction.</strong> Select
              &quot;Number &rarr; Roman&quot; to convert a decimal number to Roman numerals,
              &quot;Roman &rarr; Number&quot; to convert Roman numerals to a decimal, or
              &quot;Date Mode&quot; to convert a year.
            </p>
            <p>
              <strong className="text-neutral-200">2. Enter your value.</strong> Type a
              number between 1 and 3,999 or a valid Roman numeral string. The conversion
              happens instantly as you type.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result.</strong> Click the
              Copy button to copy the converted value to your clipboard. Use the reference
              table to explore common values and learn Roman numeral patterns.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            A Brief History of Roman Numerals
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Roman numerals originated in ancient Rome and were the dominant number system
              across Europe for nearly two thousand years. Unlike our modern positional
              decimal system where the position of a digit determines its value, Roman
              numerals use a combination of letters to represent values. The system is
              additive and subtractive: you add values when a smaller symbol follows a
              larger one (VI = 5 + 1 = 6), and subtract when a smaller symbol precedes a
              larger one (IV = 5 - 1 = 4).
            </p>
            <p>
              <strong className="text-neutral-200">The seven symbols.</strong> Roman
              numerals use only seven symbols: I (1), V (5), X (10), L (50), C (100),
              D (500), and M (1,000). Every number from 1 to 3,999 can be expressed using
              combinations of these characters. The system has no symbol for zero, which
              is one reason it was eventually replaced by the Hindu-Arabic numeral system
              we use today. The concept of zero was revolutionary for mathematics and was
              one of the key advantages of the positional system.
            </p>
            <p>
              <strong className="text-neutral-200">Modern usage.</strong> Despite being
              replaced for arithmetic, Roman numerals remain widely used today. They appear
              on clock faces, in movie and book sequels (Star Wars Episode IV, Chapter IX),
              for Super Bowl numbering (Super Bowl LVIII), on building cornerstones and
              monuments to indicate construction years, in outlines and legal documents for
              hierarchical numbering, and in academic contexts for preliminary pages. The
              British monarchy uses Roman numerals in regnal names (Elizabeth II, Charles III).
            </p>
            <p>
              <strong className="text-neutral-200">Subtractive notation rules.</strong> Not
              every smaller-before-larger combination is valid. Only I can be subtracted
              from V and X; only X can be subtracted from L and C; and only C can be
              subtracted from D and M. This means you write 99 as XCIX (not IC), and 999
              as CMXCIX (not IM). The converter validates these rules automatically, so you
              can trust that the output follows standard Roman numeral conventions.
            </p>
            <p>
              <strong className="text-neutral-200">Limitations.</strong> Traditional Roman
              numerals cannot represent zero, negative numbers, fractions, or very large
              numbers above 3,999 without extending the system with vinculum notation
              (a bar over a symbol to multiply by 1,000). For practical purposes, the range
              of 1 to 3,999 covers the vast majority of real-world uses, including all
              historical dates in the Common Era.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="roman-numeral-converter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Roman Numeral Converter
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

        <AdSlot slot="before-footer" page="roman-numeral-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert Roman numerals here, then explore our other conversion tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, hex, octal & decimal conversion</p>
            </Link>
            <Link
              href="/unix-timestamp-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🕐</div>
              <div className="mt-1 text-sm font-semibold">Unix Timestamp</div>
              <p className="mt-1 text-xs text-neutral-400">Convert timestamps to human-readable dates</p>
            </Link>
            <Link
              href="/binary-text-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">0️⃣</div>
              <div className="mt-1 text-sm font-semibold">Binary Text Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Convert text to binary and back</p>
            </Link>
            <Link
              href="/hex-text-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔣</div>
              <div className="mt-1 text-sm font-semibold">Hex Text Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Convert text to hexadecimal and back</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
