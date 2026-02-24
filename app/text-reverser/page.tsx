import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TextReverserTool } from "@/components/tools/text-reverser";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("text-reverser")!;
const pageUrl = buildUrl("/text-reverser");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "text reverser", "reverse text online", "backwards text generator",
    "reverse word order", "reverse lines", "mirror text",
    "palindrome generator", "text backwards", "reverse string",
    "reverse characters", "reverse sentence", "reverse paragraph",
    "text flip", "reverse tool", "online text reverser free",
    "reverse text for fun", "coding reverse text", "creative writing reverse",
    "reverse text puzzle", "text transformation", "reverse text converter",
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
    question: "How does this text reverser work?",
    answer:
      "Paste your text and choose a reversal mode: characters (backwards text), words (reverse word order), lines (reverse line order), or mirror (create palindrome-style text). The tool processes text instantly in your browser with no server upload. All options like preserving spacing and line breaks work in real-time.",
  },
  {
    question: "What's the difference between character and word reversal?",
    answer:
      "Character reversal makes text backwards letter-by-letter: 'Hello' becomes 'olleH'. Word reversal changes word order: 'Hello world' becomes 'world Hello'. Character reversal is for puzzles and codes; word reversal is for restructuring sentences or lists.",
  },
  {
    question: "What is mirror text mode?",
    answer:
      "Mirror text creates palindrome-style output by showing original text followed by its reverse, separated by a pipe: 'ABC' becomes 'ABC | CBA'. This is useful for creating symmetrical designs, testing palindromes, or creative writing effects. You can choose to preserve or remove punctuation.",
  },
  {
    question: "Can I reverse text while preserving formatting?",
    answer:
      "Yes. Enable 'Preserve spacing' to keep exact spaces between words when reversing characters. Enable 'Preserve line breaks' to reverse each line separately instead of treating all text as one block. These options maintain your original text structure while reversing content.",
  },
  {
    question: "How do I create a palindrome?",
    answer:
      "Use the 'Palindromes' example button to load classic palindromes like 'A man a plan a canal Panama'. Then use mirror mode to see the symmetrical structure. For creating new palindromes, type your text and check mirror output to see if it reads the same forwards and backwards.",
  },
  {
    question: "What are practical uses for text reversal?",
    answer:
      "Developers use it for string manipulation testing and algorithm challenges. Writers use it for creative exercises and breaking writer's block. Educators use it for language puzzles and cognitive exercises. Designers use mirror text for symmetrical layouts and artistic effects.",
  },
  {
    question: "Does the tool work with special characters and emojis?",
    answer:
      "Yes. The tool handles Unicode characters, emojis, and special symbols. However, some complex emojis or combined characters may not reverse perfectly due to Unicode complexity. For most text including accented letters and common symbols, reversal works correctly.",
  },
  {
    question: "Can I reverse very large texts?",
    answer:
      "Yes, but performance depends on your device and browser. The tool processes text entirely in memory, so extremely large documents (10,000+ lines) may slow down. For best results with large texts, process in sections or use the line reversal mode which is more efficient.",
  },
];

export default function TextReverserPage() {
  return (
    <>
      <WebAppSchema
        name="Free Text Reverser"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Text Reverser", href: "/text-reverser" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Text Reverser
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Reverse text in multiple ways: characters (backwards), words, lines, or mirror text. Preserve spacing,
          line breaks, and punctuation. Perfect for coding, puzzles, and creative writing. Free, no signup.
        </p>

        <div className="mt-4">
          <TextReverserTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="text-reverser" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Reverse Text Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste or type your text</strong> into the input box.
              Use the example buttons for quick demos or the palindrome examples for classic symmetrical text.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose reversal mode.</strong> Select character reversal
              for backwards text, word reversal to flip word order, line reversal to reorder lines, or mirror
              mode for palindrome-style output.
            </p>
            <p>
              <strong className="text-neutral-200">3. Adjust preservation options.</strong> Toggle spacing
              preservation to keep exact spaces between words. Enable line break preservation to reverse each
              line separately. For mirror mode, choose whether to preserve punctuation.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy and use reversed text.</strong> The output updates
              instantly. Use the copy button or swap button to move reversed text back to input for further
              transformations. Try the uppercase/lowercase buttons for additional formatting.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Text Reverser
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Programming and development:</strong> Test string
              manipulation functions, debug reversal algorithms, or prepare test data. Reverse text to check
              encoding issues or create challenging test cases for interview questions.
            </p>
            <p>
              <strong className="text-neutral-200">Creative writing:</strong> Break writer's block by seeing
              text from a new perspective. Create palindrome poetry, mirrored lyrics, or backward messages in
              stories. Use mirror text for artistic effects in digital art or graphic design.
            </p>
            <p>
              <strong className="text-neutral-200">Education and puzzles:</strong> Create language puzzles,
              cryptograms, or decoding exercises for students. Demonstrate palindrome concepts in linguistics
              or mathematics classes. Use reversed text as a cognitive exercise.
            </p>
            <p>
              <strong className="text-neutral-200">Social media and fun:</strong> Create backwards messages
              for TikTok videos, Instagram stories, or Twitter posts. Generate mirror text for bios or
              profile descriptions. Make secret messages that require reversal to read.
            </p>
            <p>
              <strong className="text-neutral-200">Data processing:</strong> Reverse lists for LIFO (last-in,
              first-out) processing, undo operations, or historical timeline displays. Flip chronological
              data to show most recent first or reorder log files.
            </p>
            <p>
              <strong className="text-neutral-200">Accessibility testing:</strong> Check how screen readers
              or braille displays handle reversed text. Test bidirectional text support in multilingual
              applications or right-to-left language interfaces.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="text-reverser" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Reversal Modes Explained
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Character Reversal",
                desc: "Flips text letter-by-letter: 'Hello' → 'olleH'. Preserves spaces and punctuation positions. Useful for codes, puzzles, and testing string functions.",
              },
              {
                title: "Word Reversal",
                desc: "Reverses word order while keeping words intact: 'The quick brown' → 'brown quick The'. Maintains spacing between words. Good for sentence restructuring.",
              },
              {
                title: "Line Reversal",
                desc: "Reverses line order in multi-line text: Line 1 becomes last line. Preserves content within each line. Perfect for reordering lists or logs.",
              },
              {
                title: "Mirror Text",
                desc: "Creates palindrome-style output: 'ABC' → 'ABC | CBA'. Shows original and reversed text side-by-side. Useful for design symmetry and palindrome checking.",
              },
              {
                title: "Space Preservation",
                desc: "When enabled, exact spaces are maintained during character reversal. When disabled, spaces are removed and reinserted at original positions after reversal.",
              },
              {
                title: "Line Break Preservation",
                desc: "When enabled, each line is reversed separately. When disabled, all text is treated as one block and line breaks become regular characters in the reversal.",
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
            Fun with Reversed Text
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Create secret messages:</strong> Write normal text, reverse
              it, and share with friends to decode. Add a clue like 'read backwards' for easy puzzles or leave
              it as a challenge for clever friends.
            </p>
            <p>
              <strong className="text-neutral-200">Palindrome challenges:</strong> Try to create sentences
              that read the same forwards and backwards. Start with short palindromes like 'racecar' or 'level',
              then attempt longer phrases. Use mirror mode to check your work.
            </p>
            <p>
              <strong className="text-neutral-200">Backwards poetry:</strong> Write a poem, reverse it, and
              see if it creates new meaning or interesting word combinations. Some poets use reversal as a
              constraint to generate unexpected imagery.
            </p>
            <p>
              <strong className="text-neutral-200">Coding interview prep:</strong> Practice writing reversal
              algorithms by hand, then use this tool to check your work. Test edge cases: empty strings,
              single characters, punctuation, Unicode, and very long texts.
            </p>
            <p>
              <strong className="text-neutral-200">Social media bios:</strong> Add mirrored text to your
              Instagram or TikTok bio for visual interest. Use character-reversed text for mysterious
              captions that encourage engagement (people love to decode secrets).
            </p>
            <p>
              <strong className="text-neutral-200">Art and design:</strong> Create symmetrical text layouts
              for posters, logos, or digital art. Mirror text can create balanced designs or represent
              reflection concepts in visual projects.
            </p>
          </div>
        </section>

        <AdSlot slot="before-footer" page="text-reverser" />

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

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            FlipMyCase offers a suite of free browser-based text tools. Reverse text here, then use other tools
            for additional transformations.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Text Sorter
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔐 String Encoder
            </Link>
            <Link
              href="/text-diff"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔍 Text Diff
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}