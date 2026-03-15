import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { BubbleTextGeneratorTool } from "@/components/tools/bubble-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("bubble-text-generator")!;
const pageUrl = buildUrl("/bubble-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "bubble text generator", "circled text", "copy paste bubble text",
    "circled letters unicode", "bubble letters", "enclosed alphanumerics",
    "bubble font generator", "circle text online", "unicode circle letters",
    "free bubble text maker", "filled circle letters", "negative circled letters",
    "bubble text for instagram", "bubble text for twitter", "circled numbers unicode",
    "aesthetic bubble text", "bubble text converter", "bubble font online",
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
    question: "What is bubble text?",
    answer:
      "Bubble text uses Unicode circled (enclosed) characters to make letters appear inside circles. For example, A becomes Ⓐ and a becomes ⓐ. These are real Unicode characters, not images, so they can be copied and pasted anywhere that supports Unicode text.",
  },
  {
    question: "What is the difference between empty and filled bubbles?",
    answer:
      "Empty/outlined bubbles (Ⓐⓑⓒ) show the letter inside a thin circle outline — these support both uppercase and lowercase. Filled/negative bubbles (\uD83C\uDD50\uD83C\uDD51\uD83C\uDD52) show white letters on a dark circle background — these are uppercase only. Toggle between styles using the buttons above the input.",
  },
  {
    question: "Do bubble letters work on social media?",
    answer:
      "Yes. Bubble text works on Twitter/X, Instagram, Facebook, Reddit, Discord, WhatsApp, Telegram, and most other platforms. Empty circles (Ⓐ) have the widest support. Filled circles (\uD83C\uDD50) may render differently on some older devices since they use higher Unicode code points.",
  },
  {
    question: "Are numbers supported?",
    answer:
      "Yes. Digits 0-9 are converted to circled numbers: 0→⓪, 1→①, 2→②, and so on through 9→⑨. These use the same Unicode enclosed alphanumerics block as the circled letters.",
  },
  {
    question: "What characters are NOT converted?",
    answer:
      "Punctuation, spaces, and special characters pass through unchanged. Only A-Z, a-z, and 0-9 have circled Unicode equivalents. Spaces and line breaks are preserved as-is so your text structure stays intact.",
  },
  {
    question: "Can I use bubble text in my username or bio?",
    answer:
      "Yes, many platforms allow Unicode characters in display names and bios. Bubble text is popular for making usernames stand out on Instagram, Twitter/X, Discord, and TikTok. Check each platform's character rules — some may restrict certain Unicode ranges.",
  },
];

export default function BubbleTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Bubble Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Bubble Text Generator", href: "/bubble-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Bubble Text Generator
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A bubble text generator converts regular text into circled Unicode characters. Type your text below to generate bubble text you can copy and paste anywhere.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <BubbleTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="bubble-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Bubble Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your style</strong> — click Empty
              Circles for outlined bubble letters (Ⓐⓑⓒ) or Filled Circles for negative/filled
              bubble letters ({"\uD83C\uDD50\uD83C\uDD51\uD83C\uDD52"}). You can switch between styles at any time.
            </p>
            <p>
              <strong className="text-neutral-200">2. Type or paste your text</strong> into the input
              box on the left. The bubble conversion happens live as you type — no submit button
              needed.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result</strong> by clicking the Copy
              button. The bubble text is on your clipboard, ready to paste into social media bios,
              usernames, messages, or any application that supports Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Try the example</strong> by clicking Load
              Example to see how letters and numbers are converted. Use Clear All to reset both
              panels.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Bubble / Circled Unicode Text
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">How bubble text works:</strong> Bubble text
              uses the Unicode &quot;Enclosed Alphanumerics&quot; block (U+2460-U+24FF) which
              contains letters and numbers inside circles. These characters were originally designed
              for list numbering in East Asian typography but have become popular for decorative
              text across social media and messaging platforms.
            </p>
            <p>
              <strong className="text-neutral-200">Empty vs. filled circles:</strong> Empty/outlined
              circles (like Ⓐ at U+24B6) show the letter with a circle border around it. Filled or
              &quot;negative circled&quot; letters (like {"\uD83C\uDD50"} at U+1F150) show a white letter on a
              solid dark circle. The filled variants are in a higher Unicode block and may not display
              on all devices — empty circles have broader compatibility.
            </p>
            <p>
              <strong className="text-neutral-200">Case handling:</strong> Empty circles preserve
              case — uppercase A becomes Ⓐ while lowercase a becomes ⓐ. Filled circles only exist
              in uppercase form, so both &quot;A&quot; and &quot;a&quot; map to the same filled
              character. This is a limitation of the Unicode standard.
            </p>
            <p>
              <strong className="text-neutral-200">Number circles:</strong> Circled numbers ①-⑨ and
              ⓪ are among the most widely supported Unicode symbols. They appear correctly on
              virtually every platform and are commonly used for step-by-step instructions, numbered
              lists, and decorative labeling in documents.
            </p>
            <p>
              <strong className="text-neutral-200">Popular use cases:</strong> Bubble text is
              commonly used in social media bios, decorative usernames, aesthetic text posts,
              numbered lists in plain text, logo-style text, and creative messaging. The circular
              framing makes text visually distinctive without requiring any special fonts or images.
            </p>
            <p>
              <strong className="text-neutral-200">Accessibility note:</strong> Screen readers
              typically read circled characters as &quot;circled letter A&quot; or &quot;circled
              digit one.&quot; While this is functional, it can make long passages harder to follow
              for users relying on assistive technology. Use bubble text for short, decorative
              purposes rather than full paragraphs.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="bubble-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Bubble Text Character Reference
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Uppercase Empty (A-Z)",
                desc: "A→Ⓐ B→Ⓑ C→Ⓒ D→Ⓓ ... Z→Ⓩ. Unicode range U+24B6 to U+24CF. Outlined circle with uppercase letter inside.",
              },
              {
                title: "Lowercase Empty (a-z)",
                desc: "a→ⓐ b→ⓑ c→ⓒ d→ⓓ ... z→ⓩ. Unicode range U+24D0 to U+24E9. Outlined circle with lowercase letter inside.",
              },
              {
                title: "Circled Numbers (0-9)",
                desc: "0→⓪ 1→① 2→② 3→③ 4→④ 5→⑤ 6→⑥ 7→⑦ 8→⑧ 9→⑨. Works in both empty and filled modes.",
              },
              {
                title: "Filled Letters (A-Z)",
                desc: "A→\uD83C\uDD50 B→\uD83C\uDD51 C→\uD83C\uDD52 ... Z→\uD83C\uDD69. Unicode range U+1F150 to U+1F169. White letter on dark circle.",
              },
              {
                title: "Social Media Use",
                desc: "Bubble text makes your bio, username, or posts stand out. Works on Instagram, Twitter/X, Discord, Reddit, TikTok, and more.",
              },
              {
                title: "Passthrough Characters",
                desc: "Spaces, punctuation, emoji, and special characters are not converted — they pass through as-is to preserve your text structure.",
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

        <AdSlot slot="before-footer" page="bubble-text-generator" />

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
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            FlipMyCase offers a suite of free browser-based text tools. Generate bubble text
            here, then explore more Unicode and text styling tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/superscript-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#x02E2; Superscript Generator
            </Link>
            <Link
              href="/subscript-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#8322; Subscript Generator
            </Link>
            <Link
              href="/wide-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#65335; Wide Text
            </Link>
            <Link
              href="/bold-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#x1D401; Bold Text
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
