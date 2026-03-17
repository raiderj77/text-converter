import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { BoldTextGeneratorTool } from "@/components/tools/bold-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("bold-text-generator")!;
const pageUrl = buildUrl("/bold-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "bold text generator", "bold unicode text", "bold text copy paste",
    "bold font generator", "bold text for instagram", "bold text for twitter",
    "bold text for facebook", "bold text for bio", "unicode bold converter",
    "mathematical bold text", "sans-serif bold text", "bold text online",
    "copy paste bold text", "bold letter generator", "bold text maker",
    "social media bold text", "free bold text generator", "bold font online",
    "unicode text converter", "bold text formatter",
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
    question: "How does the bold text generator work?",
    answer:
      "This tool maps regular Latin letters (A-Z, a-z) and digits (0-9) to their Unicode Mathematical Bold or Sans-Serif Bold equivalents. These are real Unicode characters, not HTML formatting, so they work anywhere you can paste text — social media, bios, messages, and more. All processing happens in your browser.",
  },
  {
    question: "What is the difference between Serif Bold and Sans-Serif Bold?",
    answer:
      "Serif Bold uses the Mathematical Bold range (U+1D400–U+1D433) and has small decorative strokes on letters, similar to Times New Roman bold. Sans-Serif Bold uses the Mathematical Sans-Serif Bold range (U+1D5D4–U+1D607) and looks cleaner without decorative strokes, similar to Arial or Helvetica bold.",
  },
  {
    question: "Will bold text work on Instagram, Twitter, and Facebook?",
    answer:
      "Yes. Because these are real Unicode characters (not HTML or CSS), they display correctly on most platforms that support Unicode, including Instagram bios, Twitter/X posts, Facebook posts, LinkedIn profiles, YouTube comments, TikTok bios, and messaging apps like WhatsApp and Telegram.",
  },
  {
    question: "Why do some characters not change to bold?",
    answer:
      "Only the standard Latin letters (A-Z, a-z) and digits (0-9) have Unicode bold equivalents. Punctuation, spaces, emojis, and characters from other scripts (Chinese, Arabic, Cyrillic, etc.) pass through unchanged because the Unicode standard does not define bold variants for them.",
  },
  {
    question: "Are bold Unicode characters accessible to screen readers?",
    answer:
      "Screen reader support varies. Some screen readers read Mathematical Bold letters as their plain equivalents, while others may announce them as 'mathematical bold capital A' or skip them. For accessibility-critical content, use standard text with HTML/CSS bold formatting instead.",
  },
  {
    question: "Is there a character limit?",
    answer:
      "There is no hard limit in this tool. You can paste entire paragraphs and the conversion happens instantly in your browser. However, keep in mind that some platforms have their own character limits for posts or bios, and bold Unicode characters count the same as regular characters on most platforms.",
  },
];

export default function BoldTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Bold Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Bold Text Generator", href: "/bold-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Bold Text Generator — Copy &amp; Paste Free
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A bold text generator converts regular text into Unicode bold characters that can be copied and pasted anywhere. Type your text below to generate bold text you can use on social media and bios.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Bold Text Generator Tool</h2>

          <h2>Bold Text Generator Features and Options</h2>

          <h2>About the Free Online Bold Text Generator</h2>

        </div>


        <div className="mt-4">
          <BoldTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="bold-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Bold Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the
              input box. The tool accepts any text including letters, numbers, spaces, and
              punctuation.
            </p>
            <p>
              <strong className="text-neutral-200">2. See both bold styles instantly.</strong> The
              tool generates two versions of your text: Bold (Serif) using Mathematical Bold
              Unicode characters, and Bold (Sans-Serif) using Sans-Serif Bold Unicode characters.
              Both update live as you type.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the style you prefer.</strong> Click
              the copy button on either output box to copy the bold text to your clipboard. Paste
              it into any text field — social media posts, bios, messages, or documents.
            </p>
            <p>
              <strong className="text-neutral-200">4. Characters without bold mappings pass
              through unchanged.</strong> Spaces, punctuation, emojis, and non-Latin characters
              stay the same so your text remains readable.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What Is Unicode Bold Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Unicode bold text is not formatting — it is
              a set of distinct characters.</strong> The Unicode standard includes separate code
              points for mathematical symbols, and among these are complete sets of bold Latin
              letters and digits. When you type "Hello" and convert it, each letter is replaced
              by a different Unicode character that happens to look bold.
            </p>
            <p>
              <strong className="text-neutral-200">This distinction matters.</strong> Regular
              bold text in a word processor or web page uses CSS or rich text formatting, which
              is stripped away when you paste into a plain text field like an Instagram bio or
              a tweet. Unicode bold characters survive because they are plain text — each bold
              letter is its own character with its own code point, just like the letter &quot;A&quot;
              is different from &quot;B&quot;.
            </p>
            <p>
              <strong className="text-neutral-200">The Mathematical Bold range</strong> was
              originally defined for use in mathematical notation, where bold italic variables
              have specific meaning. Type designers ensured these characters render with serif
              strokes, resembling bold Times New Roman. The Sans-Serif Bold range followed the
              same pattern but with a clean, stroke-free design closer to bold Helvetica or
              Arial.
            </p>
            <p>
              <strong className="text-neutral-200">Platform support is near-universal.</strong> Any
              modern operating system (Windows 10+, macOS, iOS, Android) includes fonts that
              cover the Mathematical Alphanumeric Symbols block. This means bold Unicode text
              displays correctly on virtually every device your audience uses, from desktop
              browsers to mobile apps.
            </p>
            <p>
              <strong className="text-neutral-200">Common uses include social media bios,</strong> post
              headings, profile names, YouTube comments, Discord messages, and any platform
              where you want text to stand out but cannot use HTML or CSS formatting. Many
              content creators use bold text to highlight key phrases in captions, making their
              posts more scannable in crowded feeds.
            </p>
            <p>
              <strong className="text-neutral-200">Keep accessibility in mind.</strong> While
              bold Unicode text is widely supported visually, screen readers may not interpret
              these characters as their plain-text equivalents. For content that needs to be
              accessible to all users, consider using platform-native formatting options when
              available, and reserve Unicode bold for decorative or supplementary emphasis.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="bold-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Where to Use Bold Unicode Text
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Instagram Bios & Captions",
                desc: "Make your Instagram bio stand out with bold text. Highlight your name, tagline, or call-to-action. Bold text in captions draws attention to key points in longer posts.",
              },
              {
                title: "Twitter / X Posts",
                desc: "Bold text in tweets makes your content more eye-catching in the timeline. Use it for headings in threads, key statistics, or important announcements.",
              },
              {
                title: "Facebook & LinkedIn",
                desc: "Add emphasis to Facebook posts and LinkedIn updates. Bold text helps important information stand out in professional contexts and social feeds.",
              },
              {
                title: "YouTube & TikTok",
                desc: "Use bold text in video titles, descriptions, and comments. Bold characters in YouTube comments help your response stand out among hundreds of replies.",
              },
              {
                title: "Messaging Apps",
                desc: "WhatsApp, Telegram, Discord, and other messaging apps display Unicode bold characters correctly. Emphasize key words in group chats and announcements.",
              },
              {
                title: "Emails & Documents",
                desc: "When rich formatting is not available (plain text emails, text files), Unicode bold gives you a way to add visual emphasis without any special tools.",
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

        <AdSlot slot="before-footer" page="bold-text-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Bold Text Generator
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

        {/* Related tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            FlipMyCase offers a suite of free browser-based text tools. Generate bold text here,
            then explore other text conversion and formatting tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
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
            <Link
              href="/toggle-case-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Toggle Case
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
