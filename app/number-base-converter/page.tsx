import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { NumberBaseConverterTool } from "@/components/tools/number-base-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("number-base-converter")!;
const pageUrl = buildUrl("/number-base-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "binary to decimal converter", "hex converter", "number base converter",
    "binary to hex", "decimal to binary", "hex to decimal", "octal converter",
    "base converter online", "binary converter", "hexadecimal converter",
    "decimal to hex", "binary to octal", "ascii to binary", "text to hex",
    "number system converter",
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
    question: "How do I convert binary to decimal?",
    answer:
      "Each binary digit represents a power of 2, starting from the right. For example, binary 1011 = (1 x 8) + (0 x 4) + (1 x 2) + (1 x 1) = 11 in decimal. This converter does it instantly — just select Binary as your input base and type your number.",
  },
  {
    question: "What is hexadecimal and why do developers use it?",
    answer:
      "Hexadecimal (base 16) uses digits 0-9 and letters A-F to represent values. Developers use it because each hex digit maps to exactly 4 binary digits, making it a compact way to represent binary data. It is commonly used for memory addresses, color codes (like #FF5733), and byte values.",
  },
  {
    question: "What is the difference between binary, octal, decimal, and hexadecimal?",
    answer:
      "These are number systems with different bases. Binary (base 2) uses 0-1 and is what computers use internally. Octal (base 8) uses 0-7 and was historically used in Unix file permissions. Decimal (base 10) uses 0-9 and is what humans use daily. Hexadecimal (base 16) uses 0-9 and A-F and is widely used in programming.",
  },
  {
    question: "What does the ASCII text mode do?",
    answer:
      "ASCII text mode converts each character in your text into its numeric code in all four bases. For example, the letter 'A' is 65 in decimal, 01000001 in binary, 101 in octal, and 41 in hexadecimal. This is useful for understanding how text is stored in computer memory.",
  },
  {
    question: "Can this tool handle large numbers?",
    answer:
      "Yes, this tool handles numbers up to JavaScript's safe integer limit (2^53 - 1, or 9,007,199,254,740,991 in decimal). For most programming tasks, this range is more than sufficient. Numbers beyond this limit may lose precision.",
  },
  {
    question: "What are common uses for number base conversion?",
    answer:
      "Common uses include debugging memory addresses (hex), understanding file permissions (octal in Unix/Linux), analyzing network protocols (binary), working with color codes in CSS (hex), interpreting byte values in data files, and understanding how computers store data at the hardware level.",
  },
  {
    question: "How do hex color codes work?",
    answer:
      "Hex color codes like #FF5733 represent RGB values in hexadecimal. FF = 255 red, 57 = 87 green, 33 = 51 blue. Each pair of hex digits represents one byte (0-255) for a color channel. You can use this converter to decode individual hex values to decimal to understand the exact color intensity.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversions happen in your browser using JavaScript. Your numbers and text never leave your device.",
  },
];

export default function NumberBaseConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Number Base Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Number Base Converter", href: "/number-base-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Number Base Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Number Base Converter
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A number base converter transforms values between binary, octal, decimal, and hexadecimal number systems. Enter a number below and select the base to convert instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <NumberBaseConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="number-base-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Number Bases Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Use Number
              Mode to convert a single number between bases. Use ASCII Text Mode to see the
              binary, octal, decimal, and hex codes for each character in a string.
            </p>
            <p>
              <strong className="text-neutral-200">2. Select your input base.</strong> In
              Number Mode, choose whether you are entering a binary, octal, decimal, or
              hexadecimal number from the dropdown.
            </p>
            <p>
              <strong className="text-neutral-200">3. Type or paste your number.</strong> The
              converter shows results in all four bases simultaneously as you type. Invalid
              digits for the selected base are flagged immediately.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy your result.</strong> Click Copy
              next to any output to copy it to your clipboard. Use the reference table below
              the converter for quick lookups of common values.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Number Systems in Computing
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Every number system uses a set of digits and a base (also called radix) that
              determines how values increase at each position. The decimal system you use
              every day has base 10 with digits 0 through 9. Computers, however, operate on
              binary (base 2) because transistors have two states: on and off, represented as
              1 and 0.
            </p>
            <p>
              <strong className="text-neutral-200">Binary (base 2)</strong> is the foundation
              of all digital computing. Every piece of data in a computer, from text to images
              to video, is ultimately stored as a sequence of binary digits (bits). A single
              byte consists of 8 bits, giving it 256 possible values (0 to 255). While binary
              is fundamental, it is difficult for humans to read because even small numbers
              require long strings of digits.
            </p>
            <p>
              <strong className="text-neutral-200">Hexadecimal (base 16)</strong> solves the
              readability problem. Because 16 is a power of 2, each hex digit maps to exactly
              4 binary digits. This makes hex a compact shorthand for binary data. A single
              byte can be written as two hex digits instead of eight binary digits. This is
              why hex is the standard format for memory addresses, color codes in CSS and
              design tools, MAC addresses, and byte-level data inspection.
            </p>
            <p>
              <strong className="text-neutral-200">Octal (base 8)</strong> was historically
              important in early computing when systems used 12-bit, 24-bit, or 36-bit words
              that divided evenly into 3-bit groups. Today, octal is most commonly seen in
              Unix and Linux file permissions, where the three permission categories (owner,
              group, others) each use a single octal digit to represent read, write, and
              execute permissions. For example, chmod 755 sets rwxr-xr-x permissions.
            </p>
            <p>
              Understanding how to convert between these systems is essential for programming,
              networking, cybersecurity, and systems administration. Whether you are reading
              hex dumps, setting file permissions, debugging memory, or working with color
              values, fluency in number bases makes you a more effective developer.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="number-base-converter" />

        {/* FAQ */}
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
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="number-base-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert number bases here, then use our other developer tools for encoding,
            hashing, and formatting.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML, hex & binary encoding</p>
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
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/regex-tester"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">⚙️</div>
              <div className="mt-1 text-sm font-semibold">Regex Tester</div>
              <p className="mt-1 text-xs text-neutral-400">Test regular expressions with live matching</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
