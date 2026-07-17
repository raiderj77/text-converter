import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ExtractEmailsTool } from "@/components/tools/extract-emails";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
const tool = getToolBySlug("extract-emails")!;
const pageUrl = buildUrl("/extract-emails");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "extract emails from text", "email extractor", "email extractor online",
    "find email addresses in text", "extract email addresses", "email finder tool",
    "email scraper online", "pull emails from text", "email address extractor",
    "extract emails free", "email harvester online", "find emails in document",
    "extract email list", "email parser online", "grab emails from text",
    "email extraction tool free",
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
    question: "How do I extract email addresses from text?",
    answer:
      "Paste any text containing email addresses into the input area. The tool uses a regular expression to find all valid email addresses and displays them as a clean list. You can copy the results as a newline-separated or comma-separated list.",
  },
  {
    question: "Does the tool deduplicate email addresses?",
    answer:
      "Yes. The deduplicate option is enabled by default and uses case-insensitive matching. If 'user@example.com' and 'USER@EXAMPLE.COM' both appear in your text, only the first occurrence is kept.",
  },
  {
    question: "Can I sort the extracted emails alphabetically?",
    answer:
      "Yes. Toggle the 'Sort alphabetically' option to sort all extracted emails in A-Z order. Sorting is case-insensitive, so 'alice@example.com' comes before 'Bob@example.com'.",
  },
  {
    question: "What email formats are supported?",
    answer:
      "The tool recognizes standard email formats including addresses with dots, hyphens, underscores, and plus signs in the local part (before the @). It supports all common domain extensions including multi-part TLDs like .co.uk.",
  },
  {
    question: "Can I copy emails as a comma-separated list?",
    answer:
      "Yes. Two copy buttons are provided: 'Copy (newline)' gives you one email per line, and 'Copy (comma)' gives you a comma-separated list. The comma format is useful for pasting into email CC/BCC fields or spreadsheets.",
  },
  {
    question: "Is my text processed securely?",
    answer:
      "Yes. All processing happens entirely in your browser using JavaScript. Your text is never sent to any server. No emails are stored, logged, or transmitted — making it safe for confidential documents and sensitive data.",
  },
  {
    question: "Does the tool extract emails from HTML?",
    answer:
      "Yes. Paste raw HTML and the tool finds email addresses in both visible text and href attributes (mailto: links). It extracts email addresses regardless of where they appear in the markup.",
  },
  {
    question: "Is this tool GDPR compliant?",
    answer:
      "The tool runs entirely in your browser — no data is transmitted or stored. However, how you use extracted emails must comply with GDPR, CAN-SPAM, and other regulations. Only email contacts who have given consent.",
  },
];

export default function ExtractEmailsPage() {
  return (
    <>
      <WebAppSchema
        name="Free Extract Emails Tool"
        description={tool.description}
        url={pageUrl}
        dateModified={"2026-07-12"}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Extract Emails", href: "/extract-emails" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Extract Emails</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Extract Email Addresses from Text — Free Tool
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An email extractor finds and pulls all email addresses from any block of text. Paste your text below to extract, deduplicate, and copy all email addresses instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <ExtractEmailsTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="extract-emails" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is Email Extraction?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Email extraction scans a body of text and identifies all strings that match the format
              of a valid email address — a local part, an @ symbol, and a domain with at least one
              dot. The extracted addresses are collected into a deduplicated list ready for import
              into CRM, email platforms, or spreadsheets.
            </p>
            <p>
              You would use email extraction when building contact lists from unstructured data,
              cleaning CRM imports that contain emails mixed with other text, parsing log files for
              user identifiers, extracting contacts from email threads, and auditing documents for
              PII (personally identifiable information).
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Examples for Email Extraction</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <div>
              <h3 className="text-base font-semibold">JavaScript</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-javascript">{`function extractEmails(text) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
  const matches = text.match(regex) || [];
  const seen = new Set();
  return matches.filter(email => {
    const lower = email.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });
}

const text = "Contact: support@example.com, sales@example.com\\n" +
  "Duplicate: SUPPORT@EXAMPLE.COM\\n" +
  "Personal: alice.smith+work@gmail.com";

console.log(extractEmails(text));
// ['support@example.com', 'sales@example.com', 'alice.smith+work@gmail.com']

// Extract from HTML
const html = '<a href="mailto:contact@site.com">Email us</a> or bob@site.com';
console.log(extractEmails(html));
// ['contact@site.com', 'bob@site.com']`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Python</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-python">{`import re
from collections import OrderedDict

def extract_emails(text):
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
    matches = re.findall(pattern, text)
    seen = OrderedDict()
    for email in matches:
        lower = email.lower()
        if lower not in seen:
            seen[lower] = email
    return list(seen.values())

text = "alice@example.com, bob@example.com, ALICE@EXAMPLE.COM"
print(extract_emails(text))
# ['alice@example.com', 'bob@example.com']

# Extract from file and write to CSV
import csv
with open('document.txt', 'r') as f:
    emails = extract_emails(f.read())
with open('emails.csv', 'w', newline='') as f:
    csv.writer(f).writerows([['email']] + [[e] for e in emails])`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Bash</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-bash">{`# Extract emails from a file
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' document.txt | sort -uf

# Extract from multiple files
grep -roE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' /path/to/docs/ | \\
  cut -d: -f2 | sort -uf

# Count unique emails
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' data.txt | sort -uf | wc -l

# Extract and save
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' input.txt | sort -uf > emails.txt`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Common Email Extraction Mistakes</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">False positives with technical strings.</strong>{" "}
              File references like <code className="text-neutral-200">user@localhost</code>, version
              strings like <code className="text-neutral-200">v2.0@release</code>, and internal
              identifiers may match the email pattern but are not actual email addresses. Review
              extracted lists before sending to them.
            </p>
            <p>
              <strong className="text-neutral-200">Case normalization for deduplication.</strong>{" "}
              <code className="text-neutral-200">User@Example.COM</code> and{" "}
              <code className="text-neutral-200">user@example.com</code> are the same address,
              but string comparison treats them as different. Always lowercase before deduplicating.
              This tool handles that automatically.
            </p>
            <p>
              <strong className="text-neutral-200">Legal compliance is your responsibility.</strong>{" "}
              Extracting emails is a technical operation; using them for unsolicited communication
              may violate GDPR, CAN-SPAM, CASL, or other regulations. Only email contacts who have
              given explicit consent.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Extract Emails from Text Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input
              area. The tool accepts any text — emails, documents, web page content, CSV files,
              or raw data. Use the example button to see how it works.
            </p>
            <p>
              <strong className="text-neutral-200">2. Configure your options.</strong> Enable
              deduplication to remove duplicate addresses (case-insensitive). Enable sorting
              to get an alphabetical list.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the results.</strong> The tool
              shows all found email addresses with a count. Each email appears on its own
              line for easy reading.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy in your preferred format.</strong> Use
              &ldquo;Copy (newline)&rdquo; for one email per line, or &ldquo;Copy (comma)&rdquo;
              for a comma-separated list suitable for email clients, spreadsheets, or databases.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Extract Emails from Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Email addresses are scattered throughout documents, web pages, spreadsheets,
              and message threads. Manually picking them out is tedious and error-prone,
              especially when dealing with large volumes of text. An email extractor automates
              this process, finding every valid address in seconds and giving you a clean,
              deduplicated list ready for use.
            </p>
            <p>
              <strong className="text-neutral-200">Building contact lists:</strong> When you
              receive a document or spreadsheet with contact information mixed into free-form
              text, extracting emails manually means scanning every line. This tool pulls
              every address into a clean list, making it easy to import into your CRM,
              email client, or marketing platform.
            </p>
            <p>
              <strong className="text-neutral-200">Processing business communications:</strong> Long
              email threads, meeting notes, and project documents often contain email addresses
              scattered throughout the text. Extracting them lets you quickly build a
              distribution list for follow-ups or identify all stakeholders mentioned in a
              conversation.
            </p>
            <p>
              <strong className="text-neutral-200">Data cleanup and migration:</strong> When
              migrating data between systems, email addresses may be embedded in notes fields,
              comment columns, or unstructured text. Extracting them into a separate column
              ensures clean data migration and prevents addresses from being lost in
              free-text fields.
            </p>
            <p>
              <strong className="text-neutral-200">Research and auditing:</strong> Security
              researchers, compliance teams, and data auditors often need to identify all
              email addresses in a dataset. The deduplication and sorting features make it
              easy to get a definitive list of unique addresses for review or reporting.
            </p>
            <p>
              This tool processes everything locally in your browser. No data is uploaded,
              no emails are stored or transmitted, and no account is required. Paste, extract,
              copy, done.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="extract-emails" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Extract Emails
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

        <AdSlot slot="before-footer" page="extract-emails" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Extract emails here, then use our other tools for additional text processing.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/find-and-replace"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔎</div>
              <div className="mt-1 text-sm font-semibold">Find & Replace</div>
              <p className="mt-1 text-xs text-neutral-400">Find and replace with regex support</p>
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🗑️</div>
              <div className="mt-1 text-sm font-semibold">Duplicate Remover</div>
              <p className="mt-1 text-xs text-neutral-400">Remove duplicate lines from any list</p>
            </Link>
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📊</div>
              <div className="mt-1 text-sm font-semibold">Text Sorter</div>
              <p className="mt-1 text-xs text-neutral-400">Sort lines alphabetically, numerically, or randomly</p>
            </Link>
            <Link
              href="/regex-tester"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">⚙️</div>
              <div className="mt-1 text-sm font-semibold">Regex Tester</div>
              <p className="mt-1 text-xs text-neutral-400">Test regular expressions with real-time highlighting</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
