import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { BinaryTextConverterTool } from "@/components/tools/binary-text-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("binary-text-converter")!;
const pageUrl = buildUrl("/binary-text-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text to binary converter", "binary to text converter", "binary translator",
    "text to binary", "binary to text", "binary code translator",
    "binary converter online", "convert text to binary", "convert binary to text",
    "binary encoding", "ascii to binary", "binary to ascii",
    "8-bit binary converter", "binary text tool", "free binary converter",
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
    question: "How does text to binary conversion work?",
    answer:
      "Each character in text is represented by a numeric code (ASCII or Unicode). The converter takes that numeric code and expresses it in base 2 (binary). For example, the letter 'A' has ASCII code 65, which is 01000001 in 8-bit binary. Each character becomes a group of 0s and 1s.",
  },
  {
    question: "What is the difference between 7-bit and 8-bit binary?",
    answer:
      "7-bit binary can represent values from 0 to 127, which covers the original ASCII character set (English letters, digits, punctuation). 8-bit binary can represent values from 0 to 255, covering extended ASCII characters including accented letters and special symbols. Most modern systems use 8-bit bytes.",
  },
  {
    question: "How do I convert binary back to text?",
    answer:
      "Switch to Binary to Text mode and paste your binary string. The converter splits the binary into 8-bit (or 7-bit) groups, converts each group to its decimal equivalent, and then maps that to the corresponding ASCII character. Spaces between groups are optional but help readability.",
  },
  {
    question: "Why is binary important in computing?",
    answer:
      "Binary is the fundamental language of computers. Every processor operates on binary signals — electrical on (1) and off (0) states. All data, from text files to images to video, is ultimately stored and processed as binary. Understanding binary helps you grasp how computers work at the hardware level.",
  },
  {
    question: "What does the per-character breakdown table show?",
    answer:
      "The breakdown table shows each character from your input along with its decimal (ASCII/Unicode) code and its binary representation. This is useful for learning how individual characters map to binary and for verifying conversions character by character.",
  },
  {
    question: "Can I convert emoji or special characters to binary?",
    answer:
      "Yes, the converter handles any Unicode character. However, characters outside the basic ASCII range (codes above 127) will require more than 8 bits to represent fully. The converter shows each character's code point in binary, which may be longer than 8 bits for emoji and non-Latin scripts.",
  },
  {
    question: "What is space-separated vs continuous binary?",
    answer:
      "Space-separated binary places a space between each character's binary representation (e.g., 01001000 01101001), making it easier to read and identify individual characters. Continuous binary removes the spaces (e.g., 0100100001101001), which is a more compact format often used in data transmission.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversions happen entirely in your browser using JavaScript. Your text and binary data never leave your device.",
  },
];

export default function BinaryTextConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Binary Text Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Binary Text Converter", href: "/binary-text-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Binary Text Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Binary Text Converter
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A binary text converter transforms text into binary code and binary back into readable text. Enter your text or binary string below to convert instantly with a per-character breakdown.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Binary Text Converter Tool</h2>

          <h2>Binary Text Converter Features and Options</h2>

          <h2>About the Free Online Binary Text Converter</h2>

        </div>


        <div className="mt-4">
          <BinaryTextConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="binary-text-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Text to Binary Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your direction.</strong> Select
              &quot;Text to Binary&quot; to convert readable text into binary code, or &quot;Binary
              to Text&quot; to decode binary back into characters.
            </p>
            <p>
              <strong className="text-neutral-200">2. Set your options.</strong> In Text to Binary
              mode, choose between 7-bit or 8-bit encoding and whether you want spaces between
              each character&apos;s binary representation.
            </p>
            <p>
              <strong className="text-neutral-200">3. Type or paste your input.</strong> The
              converter processes your input in real time. For text input, each character is
              converted to its binary equivalent. For binary input, the string is decoded back
              to readable text.
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
            Understanding Binary Encoding and Text Representation
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Binary is the most fundamental number system in computing. Every digital device,
              from smartphones to supercomputers, processes information as sequences of binary
              digits (bits). A bit can be either 0 or 1, corresponding to the two electrical
              states that transistors can hold. When we type text on a keyboard, the computer
              translates each character into a numeric code, which is then stored and
              processed in binary form.
            </p>
            <p>
              <strong className="text-neutral-200">ASCII encoding</strong> is the most widely
              known standard for mapping characters to numbers. The original ASCII table defines
              128 characters using 7 bits, covering uppercase and lowercase English letters,
              digits 0 through 9, punctuation marks, and control characters. For example, the
              capital letter &quot;A&quot; is assigned the decimal value 65 (binary 1000001), while
              the lowercase &quot;a&quot; is 97 (binary 1100001). The digit &quot;0&quot; is 48 (binary
              0110000), not to be confused with the actual value zero.
            </p>
            <p>
              <strong className="text-neutral-200">Extended ASCII and Unicode</strong> expanded
              this system. Extended ASCII uses 8 bits per character (one byte), allowing 256
              possible values. This added support for accented characters, currency symbols, and
              box-drawing characters used in early terminal interfaces. Unicode goes even further,
              supporting over 149,000 characters across 161 scripts, including emoji, mathematical
              symbols, and historical writing systems. UTF-8, the dominant encoding on the web,
              uses variable-length sequences of 1 to 4 bytes per character.
            </p>
            <p>
              <strong className="text-neutral-200">Practical applications</strong> of binary text
              conversion are everywhere. Network protocols transmit data as binary streams.
              Cryptography operates on binary representations of text. File formats like images,
              audio, and executables are all binary at their core. Understanding how text maps to
              binary helps developers debug encoding issues, work with low-level protocols, and
              build systems that handle text correctly across different languages and platforms.
            </p>
            <p>
              Whether you are a student learning computer science fundamentals, a developer
              debugging character encoding problems, or just curious about how computers
              represent text, converting between text and binary builds a deeper understanding
              of how digital information works at its most basic level.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="binary-text-converter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Binary Text Converter
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

        <AdSlot slot="before-footer" page="binary-text-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert text to binary here, then explore our other encoding and conversion tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/hex-text-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔣</div>
              <div className="mt-1 text-sm font-semibold">Hex Text Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Convert text to hexadecimal and back</p>
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
