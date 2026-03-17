import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { FancyTextGeneratorTool } from "@/components/tools/fancy-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("fancy-text-generator")!;
const pageUrl = buildUrl("/fancy-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "fancy text generator", "cool text generator", "unicode text styles",
    "bold text generator", "italic text generator", "fancy fonts copy paste",
    "aesthetic text generator", "stylish text online", "unicode font converter",
    "text style changer", "bubble text generator", "small caps generator",
    "strikethrough text", "underline text generator", "fullwidth text",
    "monospace text generator", "upside down text", "superscript generator",
    "social media fonts", "cool fonts for instagram", "fancy letters copy paste",
    "unicode text converter", "free text generator",
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
    question: "How does the fancy text generator work?",
    answer:
      "The tool converts your text into 12+ Unicode text styles using mathematical symbols, combining characters, and special Unicode blocks. These are real Unicode characters, not images or custom fonts, so they work anywhere you can paste text. All processing happens in your browser.",
  },
  {
    question: "Can I use fancy text on social media?",
    answer:
      "Yes. Because these are standard Unicode characters, they work on Instagram bios, Twitter/X posts, Facebook, TikTok, Discord, WhatsApp, Telegram, YouTube comments, and virtually any platform that supports text input. Some platforms may render certain characters differently depending on the font used.",
  },
  {
    question: "Are these custom fonts?",
    answer:
      "No. These are not fonts at all \u2014 they are Unicode characters from mathematical, phonetic, and symbol blocks that visually resemble styled versions of regular letters. Because they are real characters, they copy and paste anywhere without needing font installation.",
  },
  {
    question: "Why do some characters not convert?",
    answer:
      "Numbers, punctuation, and some special characters may not have equivalents in certain Unicode blocks. For example, Math Bold has bold digits (0\u20139), but Small Caps only covers lowercase letters. Characters without a mapping pass through unchanged.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Completely free, no signup, no account required. Use it as many times as you want. Your text is never sent to a server \u2014 everything runs in your browser.",
  },
  {
    question: "What styles are available?",
    answer:
      "The tool includes 12 styles: Math Bold, Math Italic, Bold Italic, Underline (combining character), Strikethrough (combining character), Small Caps, Superscript, Bubble/Circled, Wide/Fullwidth, Upside Down, Sans-Serif Bold, and Monospace. Each has a copy button and some link to dedicated tool pages.",
  },
  {
    question: "Can I use multiple styles at once?",
    answer:
      "Each style card shows your text in that specific style with its own copy button. You can copy any style independently. Some styles like underline and strikethrough use combining characters that can technically be layered, but that is best done by applying one, then pasting the result back in.",
  },
  {
    question: "Do these characters affect SEO or accessibility?",
    answer:
      "Unicode styled text is not readable by screen readers as normal text and is not indexed well by search engines. Use it for decorative purposes in social media, usernames, and bios. Avoid using it for important content, navigation, or body text on websites.",
  },
];

export default function FancyTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Fancy Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Fancy Text Generator", href: "/fancy-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Fancy Text Generator — Cool Fonts Copy &amp; Paste
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A fancy text generator transforms plain text into 12+ Unicode font styles including bold, italic, script, bubble, and more. Type your text below to see all available styles and copy any of them instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Fancy Text Generator Tool</h2>

          <h2>Fancy Text Generator Features and Options</h2>

          <h2>About the Free Online Fancy Text Generator</h2>

        </div>


        <div className="mt-4">
          <FancyTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="fancy-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Fancy Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into
              the input box at the top. The tool accepts any text including letters,
              numbers, and punctuation. Click &quot;Load Example&quot; to see a demo.
            </p>
            <p>
              <strong className="text-neutral-200">2. Browse the style grid.</strong> Below
              the input, you will see 12 cards, each showing your text in a different
              Unicode style. All cards update live as you type.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy any style.</strong> Click the
              &quot;Copy&quot; button on any card to copy that styled text to your clipboard.
              Paste it into Instagram bios, Twitter posts, Discord messages, or anywhere.
            </p>
            <p>
              <strong className="text-neutral-200">4. Explore individual tools.</strong>{" "}
              Some style cards include an &quot;Open Tool&quot; link that takes you to a
              dedicated page for that style with more features and options.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Unicode Text Styles
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">What is Unicode text styling?</strong>{" "}
              Unicode is the universal character encoding standard that defines over
              150,000 characters across every writing system. Within Unicode, there are
              mathematical and phonetic symbol blocks that contain characters visually
              identical to styled versions of the Latin alphabet. For example, the
              Mathematical Bold block (U+1D400) contains bold versions of A-Z that look
              like bold text but are technically different characters.
            </p>
            <p>
              <strong className="text-neutral-200">How is this different from HTML/CSS styling?</strong>{" "}
              When you bold text in a word processor or on a website, you are applying
              formatting to the same characters. Unicode styled text uses entirely
              different characters that happen to look bold, italic, etc. This means the
              styling travels with the text when you copy and paste it, regardless of the
              destination platform&apos;s formatting support.
            </p>
            <p>
              <strong className="text-neutral-200">Combining characters explained:</strong>{" "}
              Underline and strikethrough use a different technique called combining
              characters. A combining character (like U+0332 for underline) is placed after
              each regular character, and the renderer draws them overlapping. This creates
              the visual effect of underline or strikethrough without using a special
              character block.
            </p>
            <p>
              <strong className="text-neutral-200">Platform compatibility:</strong>{" "}
              Unicode styled text works on nearly all modern platforms including iOS,
              Android, Windows, macOS, and Linux. However, the visual rendering depends on
              the fonts installed on the viewer&apos;s device. Most systems ship with fonts
              that cover mathematical symbols, but some older devices or niche platforms
              may show placeholder boxes for unsupported characters.
            </p>
            <p>
              <strong className="text-neutral-200">Best practices:</strong> Use fancy text
              sparingly for visual impact — in usernames, bios, social media posts,
              comments, or creative projects. Avoid using it for body text on websites, as
              it hurts accessibility (screen readers cannot interpret styled Unicode as
              regular text) and search engines do not index it properly. Keep important
              content in plain text.
            </p>
            <p>
              <strong className="text-neutral-200">Privacy:</strong> This tool runs
              entirely in your browser using JavaScript. No text is transmitted to any
              server, and nothing is stored beyond your current session with optional
              localStorage persistence. Processing is instant regardless of input length.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="fancy-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            All Available Unicode Text Styles
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Math Bold",
                desc: "Uses the Mathematical Bold block (U+1D400+). Covers A-Z, a-z, and 0-9. Perfect for making text stand out in social media posts and bios.",
              },
              {
                title: "Math Italic",
                desc: "Uses the Mathematical Italic block (U+1D434+). Covers A-Z and a-z. Adds elegance to text for creative posts and artistic captions.",
              },
              {
                title: "Bold Italic",
                desc: "Combines bold and italic from the Mathematical Bold Italic block (U+1D468+). Maximum emphasis for headings and key phrases.",
              },
              {
                title: "Underline & Strikethrough",
                desc: "Uses combining characters (U+0332 and U+0336) placed after each character. Works with any text and stacks visually in most renderers.",
              },
              {
                title: "Small Caps & Superscript",
                desc: "Small caps maps lowercase to phonetic small capital letters. Superscript maps to modifier letters. Both create distinctive, compact text styles.",
              },
              {
                title: "Bubble, Fullwidth, Monospace",
                desc: "Bubble wraps letters in circles (U+24B6+). Fullwidth stretches characters (U+FF01+). Monospace uses the Mathematical Monospace block (U+1D670+).",
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

        <AdSlot slot="before-footer" page="fancy-text-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Fancy Text Generator
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

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            FlipMyCase offers a suite of free browser-based text tools. Generate fancy text
            here, then explore individual style tools and other text utilities.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/upside-down-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🙃 Upside Down Text
            </Link>
            <Link
              href="/bold-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ✏️ Bold Text Generator
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ↔️ Text Reverser
            </Link>
            <Link
              href="/spongebob-case-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧽 SpongeBob Case
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
