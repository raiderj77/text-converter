import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { HexTextConverterTool } from "@/components/tools/hex-text-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("hex-text-converter")!;
const pageUrl = buildUrl("/hex-text-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text to hex converter", "hex to text converter", "hexadecimal translator",
    "text to hexadecimal", "hex to text", "hex converter online",
    "convert text to hex", "convert hex to text", "hex encoding",
    "ascii to hex", "hex to ascii", "hex string converter",
    "hexadecimal text tool", "hex decoder", "free hex converter",
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
    question: "How does text to hex conversion work?",
    answer:
      "Each character in text has a numeric code (ASCII or Unicode code point). The converter takes that number and expresses it in base 16 (hexadecimal), using digits 0-9 and letters A-F. For example, the letter 'A' has ASCII code 65, which is 41 in hexadecimal.",
  },
  {
    question: "What is the 0x prefix in hexadecimal?",
    answer:
      "The 0x prefix is a convention used in programming languages like C, Java, JavaScript, and Python to indicate that a number is in hexadecimal format. For example, 0x41 means hexadecimal 41, not decimal 41. The prefix helps distinguish hex values from decimal numbers in code.",
  },
  {
    question: "How do I convert hex back to text?",
    answer:
      "Switch to Hex to Text mode and paste your hex string. The converter parses the hex values (with or without 0x prefixes and spaces), converts each to its decimal equivalent, and maps it to the corresponding ASCII/Unicode character. Both space-separated and continuous hex input are supported.",
  },
  {
    question: "Where is hexadecimal used in real-world applications?",
    answer:
      "Hexadecimal is used extensively in CSS color codes (#FF5733), memory addresses, MAC addresses, Unicode code points (U+0041), hex dumps for file inspection, cryptographic hashes (SHA-256 outputs), and byte-level data representation in networking protocols.",
  },
  {
    question: "What does the per-character breakdown table show?",
    answer:
      "The breakdown table displays each character from your input alongside its decimal (ASCII/Unicode) code and hexadecimal representation. This helps you understand how individual characters map to hex values and is useful for learning or verifying conversions.",
  },
  {
    question: "Can I convert emoji or non-English characters to hex?",
    answer:
      "Yes, the converter handles any Unicode character. Characters outside the basic ASCII range will have hex codes larger than FF (255). Emoji and CJK characters typically have 4 or 5 hex digit code points. The converter shows the full code point for each character.",
  },
  {
    question: "What is the difference between space-separated and continuous hex?",
    answer:
      "Space-separated hex places a space between each character's hex code (e.g., 48 65 6C 6C 6F), making individual characters easy to identify. Continuous hex removes spaces (e.g., 48656C6C6F), producing a compact string often used in programming and data formats.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversions happen entirely in your browser using JavaScript. Your text and hex data never leave your device.",
  },
];

export default function HexTextConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Hex Text Converter"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Hex Text Converter", href: "/hex-text-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Hex Text Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Hex Text Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A hex text converter transforms text into hexadecimal representation and hex back into readable text. Enter your text or hex string below to convert instantly with a per-character breakdown.
        </p>

        <ToolAnswerBlock slug="hex-text-converter" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Hex Text Converter Tool</h2>

          <h2>Hex Text Converter Features and Options</h2>

          <h2>About the Free Online Hex Text Converter</h2>

        </div>


        <div className="mt-4">
          <HexTextConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="hex-text-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Text to Hex Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your direction.</strong> Select
              &quot;Text to Hex&quot; to convert readable text into hexadecimal codes, or &quot;Hex
              to Text&quot; to decode hexadecimal back into characters.
            </p>
            <p>
              <strong className="text-neutral-200">2. Set your options.</strong> In Text to Hex
              mode, toggle the 0x prefix on or off and choose whether to separate each
              character&apos;s hex value with spaces.
            </p>
            <p>
              <strong className="text-neutral-200">3. Type or paste your input.</strong> The
              converter processes your input in real time. For text input, each character is
              converted to its hex equivalent. For hex input, the codes are decoded back to
              readable characters.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy your result.</strong> Click the Copy
              button to copy the output to your clipboard. Use the per-character breakdown table
              to study individual character codes.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Hexadecimal in Computing: Why Developers Use Hex
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Hexadecimal (base 16) is one of the most important number systems in computing.
              While computers operate in binary, hex provides a human-friendly way to represent
              binary data. Each hex digit corresponds to exactly four binary bits, making
              conversion between the two trivial. A single byte (8 bits) can always be written
              as exactly two hex digits, which is why hex is the standard for representing
              raw data in a compact, readable format.
            </p>
            <p>
              <strong className="text-neutral-200">Color codes</strong> are one of the most
              visible uses of hex in everyday development. CSS color values like #FF5733 encode
              red, green, and blue channel intensities as three pairs of hex digits. FF equals
              255 (maximum intensity) for red, 57 equals 87 for green, and 33 equals 51 for
              blue. Designers and developers work with these hex codes constantly, and
              understanding the underlying math helps when adjusting colors programmatically
              or creating color palettes.
            </p>
            <p>
              <strong className="text-neutral-200">Memory and data inspection</strong> tools
              display data in hexadecimal. Hex editors, debugger memory views, and network
              packet analyzers all show raw bytes as hex values. When you inspect a file in a
              hex editor, each byte is displayed as a two-digit hex number, with the
              corresponding ASCII character shown alongside. This dual representation makes
              it possible to spot patterns, identify file signatures (magic bytes), and
              diagnose data corruption.
            </p>
            <p>
              <strong className="text-neutral-200">Cryptography and hashing</strong> algorithms
              produce outputs in hex format. When you see an SHA-256 hash like
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855, each pair of
              characters represents one byte of the 32-byte hash. Hex encoding is used because
              it is unambiguous, compact, and easy to copy and compare. The same goes for UUIDs,
              MAC addresses, and API keys that use hex formatting.
            </p>
            <p>
              Understanding hexadecimal and how text maps to hex codes is a foundational skill
              for any developer. Whether you are debugging encoding issues, working with binary
              protocols, customizing design tokens, or analyzing security hashes, fluency in hex
              makes you more effective and reduces errors when working with low-level data.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="hex-text-converter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Hex Text Converter
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

        <AdSlot slot="before-footer" page="hex-text-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert text to hex here, then explore our other encoding and conversion tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/binary-text-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">0️⃣</div>
              <div className="mt-1 text-sm font-semibold">Binary Text Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Convert text to binary and back</p>
            </Link>
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, octal, decimal & hex conversion</p>
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
              href="/hash-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">#️⃣</div>
              <div className="mt-1 text-sm font-semibold">Hash Generator</div>
              <p className="mt-1 text-xs text-neutral-400">MD5, SHA-256, SHA-512 hash generation</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
