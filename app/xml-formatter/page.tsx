import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { XmlFormatterTool } from "@/components/tools/xml-formatter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("xml-formatter")!;
const pageUrl = buildUrl("/xml-formatter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "xml formatter", "xml beautifier", "xml formatter online", "xml pretty print",
    "xml validator", "xml minifier", "format xml online", "xml indent",
    "xml beautify online", "xml viewer", "xml pretty printer", "minify xml online",
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
    question: "What does an XML formatter do?",
    answer:
      "An XML formatter takes unformatted or poorly formatted XML and adds proper indentation and line breaks so the structure is easy to read. It also validates that the XML is well-formed, catching issues like unclosed tags, mismatched element names, and invalid characters.",
  },
  {
    question: "What is the difference between formatting and minifying XML?",
    answer:
      "Formatting (beautifying) adds indentation and line breaks to make XML human-readable. Minifying removes all unnecessary whitespace, reducing file size. Use formatting during development and debugging. Use minifying for production deployment, API responses, and storage optimization.",
  },
  {
    question: "What makes XML well-formed?",
    answer:
      "Well-formed XML must have a single root element, all opening tags must have matching closing tags (or be self-closing), tags must be properly nested (no overlapping), attribute values must be quoted, and element names are case-sensitive. The XML declaration (<?xml version=\"1.0\"?>) is optional but recommended.",
  },
  {
    question: "Should I use 2 spaces, 4 spaces, or tabs for XML indentation?",
    answer:
      "This is largely a team preference. 2 spaces is the most common convention in web development and keeps deeply nested XML compact. 4 spaces offers more visual distinction between levels. Tabs allow each developer to configure their preferred display width. Choose what matches your project's style guide.",
  },
  {
    question: "What is the difference between XML and HTML?",
    answer:
      "XML is a strict data format where all tags must be closed, attribute values must be quoted, and element names are case-sensitive. HTML is more lenient — browsers can render HTML with unclosed tags and unquoted attributes. XHTML is a strict form of HTML that follows XML rules. XML is used for data exchange, configuration files, and document formats like SVG and SOAP.",
  },
  {
    question: "What is XML used for today?",
    answer:
      "XML remains widely used for SOAP web services, SVG graphics, Android layout files, Maven and Gradle build configurations, RSS and Atom feeds, Microsoft Office file formats (OOXML), SAML authentication, and many enterprise integration systems. While JSON has replaced XML for most web APIs, XML is still dominant in enterprise and document-centric applications.",
  },
  {
    question: "Can this tool fix broken XML?",
    answer:
      "This tool validates and formats well-formed XML, but it cannot fix structural errors like missing closing tags or mismatched element names. If your XML has errors, the tool shows the error message with details about what went wrong, helping you locate and fix the issue manually.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All formatting and validation happens in your browser using the built-in DOMParser API. Your XML data never leaves your device.",
  },
];

export default function XmlFormatterPage() {
  return (
    <>
      <WebAppSchema
        name="Free XML Formatter & Validator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "XML Formatter", href: "/xml-formatter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">XML Formatter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free XML Formatter &amp; Validator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An XML formatter and validator beautifies XML with proper indentation and checks for well-formedness. Paste your XML below to format, validate, or minify it instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the XML Formatter Tool</h2>

          <h2>XML Formatter Features and Options</h2>

          <h2>About the Free Online XML Formatter</h2>

        </div>


        <div className="mt-4">
          <XmlFormatterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="xml-formatter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Format XML Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Click
              Format / Beautify to add proper indentation, or Minify to compress XML
              into a single line with no extra whitespace.
            </p>
            <p>
              <strong className="text-neutral-200">2. Select indentation.</strong> When
              formatting, choose between 2 spaces, 4 spaces, or tabs. The output updates
              instantly when you change this setting.
            </p>
            <p>
              <strong className="text-neutral-200">3. Paste your XML.</strong> The
              formatter processes your input in real time. If the XML is well-formed,
              you see the formatted or minified output. If there are errors, you see a
              detailed error message.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click
              Copy to copy the formatted XML to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            XML Formatting and Validation in Development
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              XML (eXtensible Markup Language) has been a cornerstone of data exchange
              since its introduction by the W3C in 1998. While JSON has become the
              preferred format for web APIs, XML remains deeply embedded in enterprise
              software, document formats, and configuration systems. Being able to
              quickly format and validate XML is a daily need for many developers.
            </p>
            <p>
              <strong className="text-neutral-200">Readability matters for debugging.</strong> XML
              from API responses, log files, and serialized data often arrives as a single
              line with no formatting. Trying to read unformatted XML with deeply nested
              elements is nearly impossible. A formatter adds indentation that reveals the
              document structure instantly, making it easy to find specific elements, spot
              missing closing tags, and understand the data hierarchy.
            </p>
            <p>
              <strong className="text-neutral-200">Validation catches errors early.</strong> A
              single missing closing tag or mismatched element name can cause an entire XML
              document to fail parsing. Unlike HTML, XML parsers are strict — there is no
              error recovery. Validating XML before sending it to an API, importing it into
              a database, or using it in a configuration file prevents cryptic runtime errors
              that can be difficult to trace back to a formatting issue.
            </p>
            <p>
              <strong className="text-neutral-200">Minification reduces payload size.</strong> For
              XML that will be transmitted over a network or stored in a database, removing
              unnecessary whitespace can significantly reduce file size. This is especially
              important for SOAP web services, RSS feeds, and SVG graphics where even small
              size reductions improve performance.
            </p>
            <p>
              Common XML formats you might encounter include SVG (Scalable Vector Graphics),
              SOAP and WSDL for web services, Android layout XML, Maven pom.xml and Gradle
              build files, RSS and Atom feeds, SAML assertions for authentication, and
              Microsoft Office documents (which are ZIP archives containing XML files).
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="xml-formatter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About XML Formatter
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

        <AdSlot slot="before-footer" page="xml-formatter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Format XML here, then use our other tools for JSON, CSV, and data encoding.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
            <Link
              href="/csv-to-json"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📋</div>
              <div className="mt-1 text-sm font-semibold">CSV to JSON</div>
              <p className="mt-1 text-xs text-neutral-400">Convert between CSV and JSON formats</p>
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML entity encoding</p>
            </Link>
            <Link
              href="/text-diff"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔍</div>
              <div className="mt-1 text-sm font-semibold">Text Diff</div>
              <p className="mt-1 text-xs text-neutral-400">Compare two texts side by side</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
