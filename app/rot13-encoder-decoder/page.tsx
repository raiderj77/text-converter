import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { Rot13EncoderDecoderTool } from "@/components/tools/rot13-encoder-decoder";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("rot13-encoder-decoder")!;
const pageUrl = buildUrl("/rot13-encoder-decoder");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "rot13 encoder", "rot13 decoder", "rot13 cipher", "caesar cipher online",
    "rot5 converter", "rot47 encoder", "caesar cipher tool", "letter rotation cipher",
    "rot13 online", "text cipher", "encode decode rot13", "cipher converter",
    "rotation cipher", "simple cipher tool", "free cipher tool",
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
    question: "What is ROT13 and how does it work?",
    answer:
      "ROT13 is a simple letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet. Since the English alphabet has 26 letters, applying ROT13 twice returns the original text. For example, 'Hello' becomes 'Uryyb'. It only affects letters — numbers, spaces, and punctuation remain unchanged.",
  },
  {
    question: "What is the difference between ROT13, ROT5, and ROT47?",
    answer:
      "ROT13 rotates only the 26 English letters by 13 positions. ROT5 rotates only the 10 digits (0-9) by 5 positions, so '0' becomes '5' and '7' becomes '2'. ROT47 rotates all 94 printable ASCII characters (including letters, numbers, and symbols) by 47 positions, providing broader obfuscation.",
  },
  {
    question: "What is a Caesar cipher?",
    answer:
      "A Caesar cipher is a substitution cipher named after Julius Caesar, who reportedly used it to protect military messages. It shifts each letter by a fixed number of positions in the alphabet. ROT13 is actually a specific Caesar cipher with a shift of 13. This tool lets you use any shift from 1 to 25.",
  },
  {
    question: "Is ROT13 encryption secure?",
    answer:
      "No. ROT13 is not encryption and provides no real security. It is trivially easy to reverse since there are only 25 possible shifts to try (brute force). ROT13 is best used for hiding spoilers, puzzle answers, or obscuring text from casual reading — never for protecting sensitive information.",
  },
  {
    question: "How do I decode ROT13 text?",
    answer:
      "Simply apply ROT13 again. Since ROT13 shifts letters by 13 positions and the alphabet has 26 letters, applying it twice returns to the original text. Just paste the encoded text into this tool with ROT13 mode selected, and the decoded text appears instantly.",
  },
  {
    question: "Can I use a custom rotation amount?",
    answer:
      "Yes. Switch to Caesar Cipher mode and use the rotation slider to choose any shift from 1 to 25. You can also toggle between Encode and Decode modes. Encoding shifts letters forward, while decoding shifts them backward by the same amount.",
  },
  {
    question: "Where is ROT13 commonly used?",
    answer:
      "ROT13 is commonly used on forums and social media to hide spoilers, puzzle solutions, and punchlines. It appears in email obfuscation to prevent spam harvesting, in programming challenges, and as an introductory example when teaching cryptography concepts.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All encoding and decoding happens entirely in your browser using JavaScript. Your text never leaves your device.",
  },
];

export default function Rot13EncoderDecoderPage() {
  return (
    <>
      <WebAppSchema
        name="Free ROT13 Encoder Decoder"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "ROT13 Encoder Decoder", href: "/rot13-encoder-decoder" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">ROT13 Encoder Decoder</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free ROT13 Encoder &amp; Decoder
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A ROT13 encoder and decoder applies Caesar cipher rotation to text, with support for ROT5, ROT47, and custom shifts. Enter your text below to encode or decode with ROT13 instantly.
        </p>

        <ToolAnswerBlock slug="rot13-encoder-decoder" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the ROT13 Encoder Decoder Tool</h2>

          <h2>ROT13 Encoder Decoder Features and Options</h2>

          <h2>About the Free Online ROT13 Encoder Decoder</h2>

        </div>


        <div className="mt-4">
          <Rot13EncoderDecoderTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="rot13-encoder-decoder" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the ROT13 Cipher Tool
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your cipher mode.</strong> Select
              ROT13 for standard letter rotation, ROT5 for digits only, ROT47 for all printable
              ASCII characters, or Caesar Cipher for a custom rotation amount.
            </p>
            <p>
              <strong className="text-neutral-200">2. Set Caesar options (if applicable).</strong> In
              Caesar Cipher mode, use the slider to pick a rotation from 1 to 25. Toggle between
              Encode and Decode to shift letters forward or backward.
            </p>
            <p>
              <strong className="text-neutral-200">3. Enter your text.</strong> Type or paste
              the text you want to encode or decode. The transformed output appears instantly
              below the input field.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy the result.</strong> Click the Copy
              button to copy the encoded or decoded text to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The History and Uses of Rotation Ciphers
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Rotation ciphers are among the oldest known encryption techniques. The Caesar
              cipher, named after Julius Caesar, dates back to the first century BC. Caesar
              reportedly used a shift of 3 to encrypt military correspondence, replacing each
              letter with the letter three positions ahead in the alphabet. While primitive by
              modern standards, this technique was effective in an era when most people were
              illiterate.
            </p>
            <p>
              ROT13 is a specific instance of the Caesar cipher that uses a shift of 13. Its
              key property is that it is its own inverse: encoding and decoding use the exact
              same operation. This symmetry made it popular in early internet culture,
              particularly on Usenet newsgroups in the 1980s, where it was used to hide
              spoilers, offensive content, and puzzle answers from casual readers.
            </p>
            <p>
              ROT5 applies the same rotation concept to digits. Because there are 10 digits
              (0 through 9), a rotation of 5 is self-inverse, just like ROT13 is for the 26
              letters. Some systems combine ROT13 and ROT5 together, often called ROT13.5 or
              ROT18, to obfuscate both letters and numbers simultaneously.
            </p>
            <p>
              ROT47 extends the concept further by rotating all 94 printable ASCII characters
              (character codes 33 through 126). This means letters, digits, and symbols like
              exclamation marks, brackets, and ampersands all get shifted. With 94 characters
              in the set and a rotation of 47, ROT47 is also self-inverse. It provides more
              thorough obfuscation than ROT13 since numbers and punctuation are also disguised.
            </p>
            <p>
              Today, rotation ciphers are not used for security. Modern encryption algorithms
              like AES and RSA are vastly more complex. However, rotation ciphers remain
              valuable as educational tools for teaching the fundamentals of cryptography,
              including substitution, key spaces, and brute-force attacks. They also continue
              to serve practical purposes for light obfuscation in forums, email addresses,
              and programming puzzles.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="rot13-encoder-decoder" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About ROT13 Encoder Decoder
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

        <AdSlot slot="before-footer" page="rot13-encoder-decoder" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Encode text with ROT13, then explore our other encoding, hashing, and text tools.
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
              href="/password-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔑</div>
              <div className="mt-1 text-sm font-semibold">Password Generator</div>
              <p className="mt-1 text-xs text-neutral-400">Strong random passwords with custom options</p>
            </Link>
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, octal, decimal & hex conversion</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
