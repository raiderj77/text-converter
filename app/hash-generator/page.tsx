import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { HashGeneratorTool } from "@/components/tools/hash-generator";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("hash-generator")!;
const pageUrl = buildUrl("/hash-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "hash generator", "md5 hash generator", "sha256 hash generator",
    "sha1 hash generator", "sha512 hash generator", "online hash generator",
    "md5 checksum", "sha256 checksum", "file checksum calculator",
    "hash compare tool", "hmac generator", "hmac sha256 online",
    "text to hash", "hash calculator online", "checksum generator",
    "sha384 hash generator", "md5 online", "verify file checksum",
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
    question: "What is a hash and what is it used for?",
    answer:
      "A hash is a fixed-length string generated from input data using a mathematical algorithm. The same input always produces the same hash, but you cannot reverse a hash to recover the original input. Hashes are used for data integrity verification (checking if a file has been altered), password storage (storing hashes instead of plain-text passwords), digital signatures, and checksums for downloads.",
  },
  {
    question: "What algorithms does this tool support?",
    answer:
      "This tool generates MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), SHA-384 (384-bit), and SHA-512 (512-bit) hashes simultaneously. SHA-256 and SHA-512 are part of the SHA-2 family and are the current industry standard. MD5 and SHA-1 are included for legacy compatibility but should not be used for security-critical applications.",
  },
  {
    question: "What is the difference between MD5, SHA-1, and SHA-256?",
    answer:
      "MD5 produces a 32-character hex string and is fast but cryptographically broken — collisions can be created easily. SHA-1 produces a 40-character hex string and is also deprecated for security. SHA-256 produces a 64-character hex string and is currently secure — it is used in Bitcoin, TLS certificates, and most modern security applications. SHA-512 produces a 128-character hex string and offers an even larger output.",
  },
  {
    question: "How do I verify a file checksum?",
    answer:
      "Drop or select a file using the file upload area. The tool generates all five hash algorithms for the file. Then enable Compare Hash mode, paste the checksum provided by the file's publisher, and the tool will tell you if it matches any of the generated hashes. A match confirms the file has not been altered.",
  },
  {
    question: "What is HMAC and when should I use it?",
    answer:
      "HMAC (Hash-based Message Authentication Code) combines a secret key with the hash function to produce a keyed hash. It verifies both data integrity and authenticity — only someone with the secret key can produce the same HMAC. Use HMAC for API authentication, webhook signature verification, JWT signing, and any scenario where you need to prove a message has not been tampered with.",
  },
  {
    question: "How does HMAC differ from a regular hash?",
    answer:
      "A regular hash only proves data integrity — anyone can compute it. HMAC adds a secret key, so only parties who know the key can produce or verify the hash. This prevents an attacker from modifying the data and recomputing the hash. HMAC also protects against length extension attacks that affect plain SHA-256.",
  },
  {
    question: "Is MD5 still safe to use?",
    answer:
      "Not for security. MD5 collisions have been demonstrated since 2004, meaning two different inputs can produce the same hash. It should not be used for password hashing, digital signatures, or certificate validation. MD5 is still acceptable for non-security uses like cache keys, content-addressable storage, and quick file deduplication where collision attacks are not a concern.",
  },
  {
    question: "Can I hash a large file?",
    answer:
      "Yes. File hashing runs entirely in your browser using the Web Crypto API. Performance depends on your device — modern browsers can hash files of several hundred MB in seconds. For very large files (1 GB+), there may be a brief delay. No file data is uploaded to any server.",
  },
  {
    question: "What is the uppercase/lowercase toggle for?",
    answer:
      "Hash values are hexadecimal strings that can be displayed in either case. Some tools and systems use uppercase (A-F) while others use lowercase (a-f). The toggle lets you match whichever format your target system expects. Both representations are identical — they encode the same bytes.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All hashing runs entirely in your browser using the Web Crypto API (for SHA algorithms) and a JavaScript MD5 implementation. Your text and files never leave your device. The tool works offline as a PWA.",
  },
  {
    question: "How does Compare Hash mode work?",
    answer:
      "Paste any hash into the Compare field. The tool checks it against all generated hashes (both text and file) and tells you which algorithm matches. If no match is found, either the input data differs or the hash was generated with a different algorithm. The comparison is case-insensitive.",
  },
  {
    question: "What hash algorithm should I use for passwords?",
    answer:
      "None of these directly. For password storage, use bcrypt, scrypt, or Argon2 — specialized algorithms designed to be slow and memory-hard. SHA-256 and MD5 are too fast for passwords, making them vulnerable to brute-force attacks. This tool is for checksums, data integrity, and HMAC — not password hashing.",
  },
];

export default function HashGeneratorPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Free Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Hash Generator", href: "/hash-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Hash Generator — MD5, SHA-1, SHA-256, SHA-512 Online
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes from text or files
          instantly. All five algorithms run simultaneously — see every hash at once.
          Compare hashes to verify file integrity, generate HMAC signatures with a secret
          key, and toggle between uppercase and lowercase output. Free, no signup, everything
          runs in your browser.
        </p>

        <div className="mt-4">
          <HashGeneratorTool />
        </div>

        <AdSlot slot="after-tool" page="hash-generator" />

        {/* Feature grid */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Five Algorithms, One Tool — All Hashes at Once
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            No need to switch between tools or run each algorithm separately. Type or paste
            text and get all five hashes instantly.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { emoji: "#️⃣", title: "5 Algorithms Simultaneously", desc: "MD5, SHA-1, SHA-256, SHA-384, and SHA-512 all computed at once. Copy individual hashes or all five with one click." },
              { emoji: "📁", title: "File Checksums", desc: "Drop any file to generate checksums. Verify downloads by comparing against the publisher's hash. No file size limit — runs locally." },
              { emoji: "🔑", title: "HMAC Mode", desc: "Generate keyed hashes (HMAC) with a secret key for API authentication, webhook verification, and JWT signing." },
              { emoji: "🔍", title: "Compare Hash", desc: "Paste a hash to check it against all generated values. Instantly know if your file or text matches the expected checksum." },
              { emoji: "🔠", title: "Case Toggle", desc: "Switch between lowercase and UPPERCASE hex output to match whatever format your system expects." },
              { emoji: "🔒", title: "100% Client-Side", desc: "Uses the Web Crypto API for SHA hashes. Your text and files never leave your device. Works offline as a PWA." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <div className="text-lg mb-1">{f.emoji}</div>
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-neutral-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Hash Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Enter text or drop a file.</strong> Type
              or paste text into the input field — hashes generate in real time as you type.
              Or drop a file (any format, any size) to generate file checksums.
            </p>
            <p>
              <strong className="text-neutral-200">2. Copy the hash you need.</strong> Click
              Copy next to any algorithm to copy that hash to your clipboard. Click Copy All
              to get all five hashes on separate lines.
            </p>
            <p>
              <strong className="text-neutral-200">3. Verify with Compare.</strong> Enable
              Compare Hash mode and paste a known hash. The tool highlights which algorithm
              matches, confirming your data is identical to the source.
            </p>
            <p>
              <strong className="text-neutral-200">4. Use HMAC for keyed hashes.</strong> Enable
              HMAC Mode, enter your secret key, and the tool generates HMAC versions of all
              five algorithms. Use these for API signatures and webhook verification.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Hash Algorithm Comparison
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Each algorithm produces a different length output. Longer hashes provide more
            collision resistance but are slower to compute.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-neutral-900 text-left">
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Algorithm</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Output</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Hex Length</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">MD5</td><td className="px-3 py-2">128 bits</td><td className="px-3 py-2">32 chars</td><td className="px-3 py-2 text-red-400">Broken — legacy only</td></tr>
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">SHA-1</td><td className="px-3 py-2">160 bits</td><td className="px-3 py-2">40 chars</td><td className="px-3 py-2 text-amber-400">Deprecated</td></tr>
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">SHA-256</td><td className="px-3 py-2">256 bits</td><td className="px-3 py-2">64 chars</td><td className="px-3 py-2 text-emerald-400">Recommended</td></tr>
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">SHA-384</td><td className="px-3 py-2">384 bits</td><td className="px-3 py-2">96 chars</td><td className="px-3 py-2 text-emerald-400">Secure</td></tr>
                <tr><td className="px-3 py-2 font-mono">SHA-512</td><td className="px-3 py-2">512 bits</td><td className="px-3 py-2">128 chars</td><td className="px-3 py-2 text-emerald-400">Secure</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Hash Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Verifying downloads:</strong> Software publishers
              provide SHA-256 checksums for their downloads. Generate the hash of your downloaded
              file and compare it to the published value to ensure the file was not corrupted or
              tampered with during transfer.
            </p>
            <p>
              <strong className="text-neutral-200">API authentication:</strong> Many APIs (Stripe,
              GitHub, Shopify) sign webhooks with HMAC-SHA256. Use HMAC mode to compute the expected
              signature and compare it to the one received in the webhook header.
            </p>
            <p>
              <strong className="text-neutral-200">Data deduplication:</strong> Hash files or content
              to generate unique identifiers. If two files produce the same SHA-256 hash, they are
              identical — no need to compare byte-by-byte.
            </p>
            <p>
              <strong className="text-neutral-200">Content integrity:</strong> Store a SHA-256 hash
              alongside important documents. Recompute the hash later to verify the document has not
              been modified.
            </p>
            <p>
              <strong className="text-neutral-200">Legacy system compatibility:</strong> Some older
              systems still require MD5 or SHA-1 hashes. Generate these alongside modern SHA-256
              hashes to support both old and new workflows.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="hash-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="hash-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Developer Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Generate hashes here, then encode strings, test regex, format JSON, compare
            text, and more with our other free tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link key={t.slug} href={t.slug === "" ? "/" : `/${t.slug}`} className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors">
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
