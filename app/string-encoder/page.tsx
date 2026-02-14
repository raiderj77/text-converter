import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { StringEncoderTool } from "@/components/tools/string-encoder";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("string-encoder")!;
const pageUrl = buildUrl("/string-encoder");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "base64 encoder", "base64 decoder", "url encoder", "url decoder",
    "html entity encoder", "html entity decoder", "string encoder online",
    "base64 encode online", "base64 decode online", "url encode online",
    "percent encoding", "encode decode string", "hex encoder",
    "binary to text", "text to binary", "unicode escape online",
    "encode special characters", "decode url string",
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
    question: "What is Base64 encoding?",
    answer:
      "Base64 converts binary data into a text format using 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It is commonly used to embed images in HTML and CSS, send binary data in JSON and XML, encode email attachments (MIME), and pass data in URLs and cookies.",
  },
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (percent-encoding) replaces unsafe characters in URLs with a percent sign followed by their hex value. For example, a space becomes %20 and an ampersand becomes %26. This ensures URLs are valid and can be parsed correctly by browsers and servers.",
  },
  {
    question: "What is the difference between URL Encode and URL Encode (full)?",
    answer:
      "URL Encode (encodeURIComponent) encodes all special characters including slashes, colons, and question marks. URL Encode full (encodeURI) preserves URL structure characters like ://?#@, only encoding characters that are not valid anywhere in a URL. Use the first for query parameter values, the second for complete URLs.",
  },
  {
    question: "What are HTML entities?",
    answer:
      "HTML entities replace characters that have special meaning in HTML. For example, < becomes &lt; and & becomes &amp;. This prevents browsers from interpreting your text as HTML code, which is essential for displaying code snippets and preventing XSS attacks.",
  },
  {
    question: "What is Unicode escape?",
    answer:
      "Unicode escape represents non-ASCII characters as \\uXXXX sequences where XXXX is the hexadecimal code point. This is used in JavaScript strings, JSON, and other formats that need to represent international characters in pure ASCII text.",
  },
  {
    question: "When would I need hex or binary encoding?",
    answer:
      "Hex encoding is useful for debugging, viewing raw byte values, working with color codes, and cryptographic hashes. Binary encoding shows the actual bits and is useful for understanding how text is stored at the lowest level. Both are common in programming and security work.",
  },
  {
    question: "Does this tool handle Unicode and emoji?",
    answer:
      "Yes. All encoding methods support full Unicode including emoji, CJK characters, Arabic, Cyrillic, and other scripts. The tool uses UTF-8 encoding internally, which is the standard for web content.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All encoding and decoding happens in your browser using JavaScript. Your text never leaves your device.",
  },
];

export default function StringEncoderPage() {
  return (
    <>
      <WebAppSchema
        name="Free String Encoder & Decoder"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "String Encoder", href: "/string-encoder" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free String Encoder &amp; Decoder
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Encode and decode strings instantly. Supports Base64, URL encoding, HTML entities,
          Unicode escape, hexadecimal, and binary. Switch between encode and decode with one
          click. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-4">
          <StringEncoderTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="string-encoder" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Encode and Decode Strings Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose encode or decode.</strong> Click
              the Encode button to convert plain text into an encoded format. Click Decode to
              convert encoded text back to readable text.
            </p>
            <p>
              <strong className="text-neutral-200">2. Select an encoding type.</strong> Choose
              from Base64, URL Encode, URL Encode (full), HTML Entities, Unicode Escape, Hex,
              or Binary. Each format serves a different purpose.
            </p>
            <p>
              <strong className="text-neutral-200">3. Paste or type your text.</strong> The
              output updates instantly as you type. Click Copy to copy the result to your
              clipboard.
            </p>
            <p>
              <strong className="text-neutral-200">4. Use the swap button</strong> to flip
              between encode and decode. The current output becomes the new input, making it
              easy to verify round-trip encoding.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Supported Encoding Formats
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Base64",
                desc: "Converts text to a safe ASCII representation using 64 characters. Used for embedding images, email attachments, JWT tokens, and data URIs.",
              },
              {
                title: "URL Encode (Component)",
                desc: "Encodes all special characters for use in URL query parameters. Spaces become %20, ampersands become %26. Use this for individual parameter values.",
              },
              {
                title: "URL Encode (Full URI)",
                desc: "Encodes a complete URL while preserving structure characters like :, /, ?, and #. Use this when encoding an entire URL string.",
              },
              {
                title: "HTML Entities",
                desc: "Escapes characters that have special meaning in HTML: <, >, &, quotes. Essential for displaying code in web pages and preventing XSS.",
              },
              {
                title: "Unicode Escape",
                desc: "Converts non-ASCII characters to \\uXXXX sequences. Used in JavaScript, JSON, and systems that only support ASCII.",
              },
              {
                title: "Hexadecimal",
                desc: "Shows the hex byte values of each character in UTF-8. Useful for debugging, viewing raw data, and working with binary protocols.",
              },
              {
                title: "Binary (UTF-8)",
                desc: "Shows the binary representation of each byte. Useful for understanding character encoding at the bit level.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <p className="mt-1 text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use String Encoding
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Web development:</strong> Encode user
              input for safe inclusion in URLs, HTML, and JavaScript. Prevent XSS
              vulnerabilities by encoding HTML entities before rendering user content.
            </p>
            <p>
              <strong className="text-neutral-200">API development:</strong> Base64 encode
              credentials for HTTP Basic Auth headers. URL encode query parameters before
              sending API requests. Decode API responses that return encoded data.
            </p>
            <p>
              <strong className="text-neutral-200">Data transfer:</strong> Base64 encode
              binary data (images, files) for embedding in JSON, XML, or email. Decode Base64
              strings received from APIs and webhooks.
            </p>
            <p>
              <strong className="text-neutral-200">Debugging:</strong> Decode URL-encoded
              strings from browser address bars and server logs. View hex and binary
              representations to diagnose character encoding issues.
            </p>
            <p>
              <strong className="text-neutral-200">Security:</strong> Decode suspicious
              Base64 or URL-encoded strings to inspect their contents. Encode payloads for
              safe transmission in security testing.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="string-encoder" />

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
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="string-encoder" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Encode strings here, then use our other tools to convert case, count words, clean
            text, or remove duplicates.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Word Counter
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🗑️ Duplicate Remover
            </Link>
            <Link
              href="/lorem-ipsum-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📝 Lorem Ipsum
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
