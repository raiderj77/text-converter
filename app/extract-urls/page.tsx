import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ExtractUrlsTool } from "@/components/tools/extract-urls";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("extract-urls")!;
const pageUrl = buildUrl("/extract-urls");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "extract urls", "extract urls from text", "url extractor",
    "find urls in text", "pull links from text", "extract links online",
    "url finder", "extract hyperlinks", "get urls from text",
    "extract all links", "url extractor online free", "link extractor tool",
    "copy urls from text", "find links in text online",
    "extract urls no signup", "domain breakdown",
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
    question: "What types of URLs does this tool extract?",
    answer:
      "The tool extracts URLs starting with http://, https://, ftp://, and www. It recognizes full URLs with paths, query strings, and fragments. URLs starting with www. are automatically prefixed with https:// in the output.",
  },
  {
    question: "How does the deduplicate toggle work?",
    answer:
      "When deduplication is enabled, the tool removes duplicate URLs from the results. Comparison is case-insensitive, so https://Example.com and https://example.com are treated as the same URL. The count of removed duplicates is shown in the output header.",
  },
  {
    question: "What is the domain breakdown?",
    answer:
      "The domain breakdown shows every unique domain found in the extracted URLs along with how many URLs belong to each domain. Domains are sorted by count (most frequent first), making it easy to see which sites are linked most often in your text.",
  },
  {
    question: "Can I extract URLs from HTML source code?",
    answer:
      "Yes. The tool scans the raw text for URL patterns, so it will find URLs inside href attributes, src attributes, or anywhere else they appear in HTML source code. It extracts the URL itself, not the surrounding HTML markup.",
  },
  {
    question: "Does this tool handle shortened URLs?",
    answer:
      "Yes, shortened URLs like bit.ly/abc123 or t.co/xyz are extracted as long as they include a protocol prefix (http:// or https://). The tool does not expand shortened URLs — it returns them as found in the text.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing runs entirely in your browser using JavaScript. Your text never leaves your device. Nothing is logged, stored, or transmitted to any server. The tool works offline once loaded.",
  },
];

export default function ExtractUrlsPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Extract URLs from Text — Free Online Tool"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Extract URLs", href: "/extract-urls" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Extract URLs from Text — Free Online Tool
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Paste any text and instantly extract every URL. Deduplicate results, see a
          domain breakdown, and copy as a clean list. Free, no signup, 100%
          client-side.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <ExtractUrlsTool />
        </div>

        <AdSlot slot="after-tool" page="extract-urls" />

        {/* How to Use */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the URL Extractor
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text.</strong> Drop
              any text containing URLs into the input box — emails, HTML source,
              documents, chat logs, or raw data. The character count updates live.
            </p>
            <p>
              <strong className="text-neutral-200">2. Review extracted URLs.</strong>{" "}
              All URLs found are listed in the output box immediately. The count shows
              how many were found.
            </p>
            <p>
              <strong className="text-neutral-200">3. Toggle deduplication.</strong>{" "}
              Enable the Deduplicate checkbox to remove duplicate URLs. The tool shows
              how many duplicates were removed.
            </p>
            <p>
              <strong className="text-neutral-200">4. Check domain breakdown.</strong>{" "}
              See which domains appear most frequently, sorted by count. Useful for
              analyzing link profiles or checking external references.
            </p>
            <p>
              <strong className="text-neutral-200">5. Copy as list.</strong> Click Copy
              as List to copy all extracted URLs to your clipboard, one per line. Paste
              them into a spreadsheet, document, or any other tool.
            </p>
          </div>
        </section>

        {/* Educational content */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Extract URLs from Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">SEO auditing:</strong> When
              reviewing a web page or blog post, extracting all URLs helps you
              identify every outbound link. You can check that links point to
              the right destinations, spot broken references, and analyze the
              link profile. Domain breakdown shows which sites you link to most
              frequently, which is valuable for SEO link equity analysis.
            </p>
            <p>
              <strong className="text-neutral-200">Content migration:</strong>{" "}
              Moving content between platforms often requires updating links.
              Extract all URLs from your existing content, check each one, and
              create a redirect map. This prevents broken links after migration
              and preserves the SEO value of your existing pages.
            </p>
            <p>
              <strong className="text-neutral-200">Research and bookmarking:</strong>{" "}
              When reading through long research documents, meeting notes, or
              email threads, extracting URLs saves you from manually scrolling
              through looking for links. Pull out every URL at once and organize
              them into your bookmark manager or reference list.
            </p>
            <p>
              <strong className="text-neutral-200">Data cleaning:</strong>{" "}
              Working with scraped data or log files often means dealing with
              text full of embedded URLs. Extract them for analysis, verification,
              or removal. The deduplication feature is especially useful when the
              same link appears dozens of times in a log file.
            </p>
            <p>
              <strong className="text-neutral-200">Security analysis:</strong>{" "}
              When reviewing phishing emails or suspicious documents, extracting
              all URLs lets you quickly identify potentially malicious links.
              The domain breakdown reveals unfamiliar or suspicious domains that
              deserve closer inspection before anyone clicks them.
            </p>
            <p>
              <strong className="text-neutral-200">Link validation:</strong>{" "}
              Technical writers, documentation teams, and web developers can
              extract all links from their content and verify each one still
              works. Combined with a link checker, this process catches 404 errors,
              moved pages, and expired resources before readers encounter them.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="extract-urls" />

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

        <AdSlot slot="before-footer" page="extract-urls" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Extract URLs here, then clean, format, or analyze your content with
            our other free tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { slug: "remove-html-tags", emoji: "🏷️", name: "Remove HTML", desc: "Strip HTML and XML tags from text and decode entities." },
              { slug: "find-and-replace", emoji: "🔎", name: "Find & Replace", desc: "Find and replace text with regex support and live highlighting." },
              { slug: "duplicate-line-remover", emoji: "🗑️", name: "Duplicate Remover", desc: "Remove duplicate lines from any list with one click." },
              { slug: "text-cleaner", emoji: "🧹", name: "Text Cleaner", desc: "Remove extra spaces, line breaks, and hidden characters from messy text." },
            ].map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4 hover:bg-white/5 transition-colors block"
              >
                <div className="text-lg mb-1">{t.emoji}</div>
                <h3 className="text-sm font-semibold">{t.name}</h3>
                <p className="mt-1 text-xs text-neutral-400">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* All tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Extract URLs here, then use our other free tools to convert, format,
            encode, or analyze your content.
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
          </div>
        </section>
      </div>
    </>
  );
}
