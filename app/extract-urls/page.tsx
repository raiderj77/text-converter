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
  {
    question: "How do I extract URLs from text?",
    answer:
      "Paste your text into the input area. The tool uses pattern matching to find all valid URLs starting with http://, https://, or ftp:// and outputs them as a clean, deduplicated list — one per line, ready to copy.",
  },
  {
    question: "Can I extract only URLs from specific domains?",
    answer:
      "The tool extracts all URLs from the text. To filter for specific domains, copy the full list and use Find & Replace or a text editor to filter by domain name. The Regex Tester tool can help you build a domain-specific pattern for advanced filtering.",
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
        dateModified={"2026-07-12"}
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
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A URL extractor finds and pulls all web addresses from any block of text. Paste your text below to extract, deduplicate, and copy all URLs instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <ExtractUrlsTool />
        </div>

        <AdSlot slot="after-tool" page="extract-urls" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is URL Extraction?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              URL extraction scans a body of text and identifies all strings that match URL
              patterns — primarily <code className="text-xs font-mono bg-white/5 px-1 rounded">http://</code> and{" "}
              <code className="text-xs font-mono bg-white/5 px-1 rounded">https://</code> prefixed strings, plus{" "}
              <code className="text-xs font-mono bg-white/5 px-1 rounded">ftp://</code> and bare{" "}
              <code className="text-xs font-mono bg-white/5 px-1 rounded">www.</code> patterns. The extracted URLs
              are collected into a deduplicated list. Good extractors handle query strings, fragments,
              paths with special characters, and URLs embedded in HTML attributes.
            </p>
            <p>
              You would use URL extraction for link auditing (finding all external links in a document),
              site migration (building a complete URL inventory), SEO analysis (mapping internal link
              structure), web scraping (extracting resource URLs from HTML), and content review
              (verifying all referenced links still work).
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Examples for URL Extraction</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <div>
              <h3 className="text-base font-semibold">JavaScript</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-javascript">{`function extractUrls(text) {
  const regex = /https?:\\/\\/[^\\s<>"')\\]]+/gi;
  const matches = text.match(regex) || [];
  // Remove trailing punctuation
  const cleaned = matches.map(url => url.replace(/[.,;:!?)}\\]]+$/, ''));
  // Deduplicate
  return [...new Set(cleaned)];
}

const sample = 'See https://example.com. Also http://other.org/page?q=test';
console.log(extractUrls(sample));
// ['https://example.com', 'http://other.org/page?q=test']

// Extract href attributes from HTML
function extractHrefs(html) {
  const regex = /href=["']([^"']+)["']/gi;
  const urls = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  return [...new Set(urls)];
}`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Python</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-python">{`import re
from urllib.parse import urlparse

def extract_urls(text):
    pattern = r'https?://[^\\s<>"\\')\\]]+'
    matches = re.findall(pattern, text)
    # Remove trailing punctuation
    cleaned = [re.sub(r'[.,;:!?)\\]]+$', '', url) for url in matches]
    # Deduplicate preserving order
    seen = set()
    unique = []
    for url in cleaned:
        if url not in seen:
            seen.add(url)
            unique.append(url)
    return unique

text = "Visit https://example.com. API docs: https://api.example.com/v2?token=xyz"
urls = extract_urls(text)
for url in urls:
    parsed = urlparse(url)
    print(f'{parsed.netloc:30s} {url}')`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Bash</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-bash">{`# Extract URLs from a file
grep -oE 'https?://[^ <>]+' document.txt | sort -u

# Extract href values from HTML
grep -oP 'href="\\K[^"]+' page.html | sort -u

# Check HTTP status of each extracted URL
while read url; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  echo "$status $url"
done < urls.txt

# Count unique domains
grep -oE 'https?://[^/]+' urls.txt | sort -u | wc -l`}</code></pre>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the URL Extractor
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
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
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
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
            Frequently Asked Questions About Extract Urls
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

        <AdSlot slot="before-footer" page="extract-urls" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
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
          <p className="mt-2 text-sm text-neutral-300">
            A list of extracted URLs often contains the same link repeated from multiple paragraphs. The duplicate line remover clears those, and the text sorter groups them by domain when sorted alphabetically.
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
