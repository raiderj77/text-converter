import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { StrikethroughTextGeneratorTool } from "@/components/tools/strikethrough-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("strikethrough-text-generator")!;
const pageUrl = buildUrl("/strikethrough-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "strikethrough text generator", "strikethrough text copy paste",
    "unicode strikethrough text", "strikethrough text online",
    "crossout text generator", "crossed out text",
    "strikethrough text for social media", "strikethrough text for Instagram",
    "strikethrough text for Twitter", "strikethrough text for Facebook",
    "free strikethrough tool", "strikethrough font generator",
    "text strikethrough converter", "strikethrough text maker",
    "copy paste strikethrough", "strikethrough text effect",
    "strikethrough text formatter", "unicode text effects",
    "strikethrough without HTML", "online strikethrough generator",
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
    question: "How does the strikethrough text generator work?",
    answer:
      "The tool adds the Unicode combining long stroke overlay character (U+0336) after each character in your text. This draws a horizontal line through each character, creating the classic strikethrough effect. The result is plain text that works anywhere Unicode is supported.",
  },
  {
    question: "Can I use strikethrough text on social media?",
    answer:
      "Yes. Unicode strikethrough text works on most social media platforms including Instagram, Twitter/X, Facebook, TikTok, LinkedIn, and Reddit. Simply copy the output and paste it into your post, comment, or bio. Some platforms may render it slightly differently depending on their font.",
  },
  {
    question: "What is the difference between Unicode strikethrough and HTML strikethrough?",
    answer:
      "HTML uses the <s> or <del> tags and CSS text-decoration: line-through to create strikethrough text, but that only works in web pages. Unicode strikethrough uses combining characters embedded in the text itself, so the effect travels with the text when you copy and paste it into any application.",
  },
  {
    question: "Does strikethrough text double the character count?",
    answer:
      "Yes. Each combining strikethrough character adds one character to the output, so the output is roughly twice the length of the input. Keep this in mind if you are working with character limits like Twitter/X's 280-character limit.",
  },
  {
    question: "Can I use this for corrections or edits?",
    answer:
      "Absolutely. Strikethrough text is commonly used to show corrections, redactions, or removed content. Instead of deleting text, you can strike it through to show what was changed while keeping the original visible. This is useful in changelogs, editing notes, and before-and-after comparisons.",
  },
  {
    question: "Does the tool work with all languages?",
    answer:
      "The combining strikethrough character works with most Unicode characters, including Latin, Cyrillic, Greek, and many other scripts. Results with complex scripts like Arabic or CJK characters may vary depending on the font and rendering engine used by your device.",
  },
];

export default function StrikethroughTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Strikethrough Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Strikethrough Text Generator", href: "/strikethrough-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Strikethrough Text Generator — Copy & Paste
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A strikethrough text generator adds a line through your text using Unicode combining characters. Type your text below to generate strikethrough text you can copy and paste anywhere.
        </p>

        <ToolAnswerBlock slug="strikethrough-text-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Strikethrough Text Generator Tool</h2>

          <h2>Strikethrough Text Generator Features and Options</h2>

          <h2>About the Free Online Strikethrough Text Generator</h2>

        </div>


        <div className="mt-4">
          <StrikethroughTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="strikethrough-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Strikethrough Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the
              input box on the left. Enter any text you want to strike through — a single word, a
              sentence, or multiple paragraphs.
            </p>
            <p>
              <strong className="text-neutral-200">2. See the strikethrough result instantly.</strong>{" "}
              The output panel on the right updates live as you type. Each character gets the Unicode
              combining long stroke overlay (U+0336) appended, creating a line through every character.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy and paste anywhere.</strong> Click the
              Copy button to copy the strikethrough text to your clipboard. Paste it into social
              media posts, messages, emails, documents, or any text field that supports Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Use for corrections and emphasis.</strong>{" "}
              Strikethrough text is perfect for showing edits, crossed-out prices, humorous
              redactions, or indicating removed content while keeping it visible for context.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Use Strikethrough Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Show corrections transparently.</strong>{" "}
              Strikethrough text is the standard way to indicate deleted or corrected content.
              Instead of erasing mistakes, crossing them out shows what changed and what replaced
              it. This is common in legal documents, academic editing, and collaborative writing
              where change tracking matters.
            </p>
            <p>
              <strong className="text-neutral-200">Create humor and sarcasm.</strong> On social
              media and in casual writing, strikethrough text adds a layer of humor. Writers use it
              to show what they &quot;really&quot; think before saying something more polite, or to
              create comedic redactions. The crossed-out text remains readable, which is the point —
              it invites the reader to see both the original and the replacement.
            </p>
            <p>
              <strong className="text-neutral-200">Marketing and pricing.</strong> Strikethrough is
              widely used in marketing to show original prices alongside discounted prices. The
              crossed-out original price creates a visual anchor that makes the new price feel like
              a better deal. Unicode strikethrough lets you use this effect in plain text contexts
              where HTML formatting is not available.
            </p>
            <p>
              <strong className="text-neutral-200">Changelogs and release notes.</strong> Software
              developers use strikethrough text in changelogs to indicate removed features or
              deprecated functionality. It communicates clearly what has been taken away without
              losing the historical record of what existed before.
            </p>
            <p>
              <strong className="text-neutral-200">Task management.</strong> Crossing off completed
              items is a satisfying way to track progress. Use strikethrough text in to-do lists,
              project updates, or status reports to visually mark tasks as done while keeping them
              in the list for reference.
            </p>
            <p>
              <strong className="text-neutral-200">Unicode portability.</strong> Unlike HTML or
              Markdown strikethrough (which require specific rendering engines), Unicode combining
              characters work everywhere text is displayed. Your strikethrough text will appear
              correctly in social media posts, text messages, email subjects, forum comments, and
              any other Unicode-compatible text field.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="strikethrough-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Where to Use Strikethrough Text
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Social Media Posts",
                desc: "Add humor, sarcasm, or corrections to your Instagram, Twitter/X, and Facebook posts. Strikethrough text grabs attention and adds personality to your writing.",
              },
              {
                title: "Messaging & Chat",
                desc: "Use in WhatsApp, Telegram, Discord, and Slack messages to show corrections, cross out mistakes, or add comedic effect to conversations.",
              },
              {
                title: "Pricing & Deals",
                desc: "Show original prices crossed out next to sale prices in plain text. Perfect for product listings, email marketing, and social media promotions.",
              },
              {
                title: "Editing & Proofreading",
                desc: "Mark deleted text in editing notes and revision comments. Show what was removed while keeping the original visible for comparison and context.",
              },
              {
                title: "To-Do Lists",
                desc: "Cross off completed tasks in plain text to-do lists. Keep finished items visible for reference while clearly marking them as done.",
              },
              {
                title: "Changelogs & Documentation",
                desc: "Indicate removed features, deprecated APIs, or deleted functionality in software documentation and release notes.",
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

        <AdSlot slot="before-footer" page="strikethrough-text-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Strikethrough Text Generator
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
            FlipMyCase offers a suite of free browser-based text tools. Generate strikethrough text
            here, then explore other Unicode text effects and formatting tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/underline-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              T̲ Underline Text
            </Link>
            <Link
              href="/small-caps-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ꜱᴄ Small Caps
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
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
