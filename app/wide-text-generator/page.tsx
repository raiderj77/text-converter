import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { WideTextGeneratorTool } from "@/components/tools/wide-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("wide-text-generator")!;
const pageUrl = buildUrl("/wide-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "wide text generator", "vaporwave text", "fullwidth text generator",
    "aesthetic text generator", "wide font generator", "vaporwave text converter",
    "fullwidth unicode", "aesthetic font", "wide text copy paste",
    "vaporwave aesthetic text", "wide letters", "fullwidth characters",
    "stretched text generator", "aesthetic text copy paste", "wide text online",
    "vaporwave font", "full width text", "japanese wide text",
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
    question: "What is wide/vaporwave text?",
    answer:
      "Wide text uses Unicode fullwidth characters that take up the same space as East Asian characters. Each ASCII character (letters, numbers, symbols) is mapped to a fullwidth equivalent, making text appear stretched and spaced out. This style is associated with the vaporwave aesthetic.",
  },
  {
    question: "How does fullwidth conversion work?",
    answer:
      "ASCII characters 33-126 (! through ~) each have a fullwidth counterpart in Unicode range U+FF01-U+FF5E. The space character is replaced with the ideographic space (U+3000), which is wider than a normal space. Characters outside ASCII 32-126 pass through unchanged.",
  },
  {
    question: "Where can I use wide text?",
    answer:
      "Fullwidth text works on Twitter/X, Instagram, Facebook, Reddit, Discord, Telegram, WhatsApp, and most modern platforms. It is widely supported because fullwidth characters are part of the CJK (Chinese/Japanese/Korean) Unicode standard used by billions of devices.",
  },
  {
    question: "What is vaporwave aesthetic?",
    answer:
      "Vaporwave is an internet microgenre and visual art movement from the early 2010s characterized by nostalgia for 80s/90s technology, Japanese text, and a dreamy aesthetic. Fullwidth text became a signature element because it mimics the spacing of Japanese characters, evoking that retro-digital feel.",
  },
  {
    question: "Does wide text affect SEO or readability?",
    answer:
      "Search engines treat fullwidth and halfwidth characters differently. Fullwidth text in page content may not be indexed the same way as regular ASCII. For social media posts and bios it is fine, but avoid using it for website body text that needs to be searchable.",
  },
  {
    question: "Can I convert wide text back to normal?",
    answer:
      "Yes — the conversion is reversible. Fullwidth characters U+FF01-U+FF5E can be mapped back to ASCII 33-126, and ideographic space U+3000 back to a regular space. You can paste wide text into this tool's input to see the original, or use a text cleaner to strip fullwidth formatting.",
  },
];

export default function WideTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Wide Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Wide Text Generator", href: "/wide-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Wide Text Generator &mdash; Vaporwave Aesthetic
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A wide text generator converts regular text into fullwidth characters for a vaporwave aesthetic. Type your text below to generate wide text you can copy and paste anywhere.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <WideTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="wide-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Wide Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the input
              box on the left. The fullwidth conversion happens live as you type — no submit button
              needed.
            </p>
            <p>
              <strong className="text-neutral-200">2. View the wide text output</strong> in the right
              panel. Every ASCII character is replaced with its fullwidth Unicode counterpart, and
              spaces become wide ideographic spaces. The text appears stretched and spaced out.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result</strong> by clicking the Copy
              button. The wide text is on your clipboard, ready to paste into social media posts, bios,
              usernames, Discord messages, or any platform that supports Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Try the example</strong> by clicking Load
              Example to see the vaporwave aesthetic in action. Use Clear All to reset both panels.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Fullwidth Unicode and Vaporwave Text
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">What is fullwidth text:</strong> Fullwidth
              characters occupy the same width as East Asian (CJK) characters — exactly twice the
              width of standard ASCII. They were originally created so Latin letters and numbers
              could align properly in vertical Japanese and Chinese text layouts. Each ASCII printable
              character (code points 33-126) has a fullwidth counterpart in the Unicode block
              U+FF01-U+FF5E.
            </p>
            <p>
              <strong className="text-neutral-200">The vaporwave connection:</strong> Vaporwave is an
              internet-born art movement from the early 2010s that blends nostalgia, consumerism, and
              retro-futuristic aesthetics. Fullwidth text became a signature style because it mimics
              Japanese character spacing, evoking the retro-digital, mall-culture feel central to
              vaporwave. Album titles, song names, and social media posts in the genre commonly use
              fullwidth characters.
            </p>
            <p>
              <strong className="text-neutral-200">Technical details:</strong> The conversion
              formula is simple: for any ASCII character with code point C (where 33 &le; C &le; 126),
              the fullwidth equivalent is at code point U+FF01 + (C - 33). The regular space (U+0020)
              maps to the ideographic space (U+3000), which is the standard wide space used in CJK
              typography.
            </p>
            <p>
              <strong className="text-neutral-200">Wide support:</strong> Because fullwidth characters
              are part of the CJK Compatibility block — used daily by billions of people in East
              Asia — they have excellent rendering support across all modern operating systems,
              browsers, and applications. They display correctly on iOS, Android, Windows, macOS,
              and Linux.
            </p>
            <p>
              <strong className="text-neutral-200">Creative uses:</strong> Beyond vaporwave,
              fullwidth text is used for aesthetic social media posts, attention-grabbing headlines,
              retro-themed designs, album and playlist names, Discord server names and channel topics,
              creative writing projects, and anywhere you want text to feel spacious and deliberate.
            </p>
            <p>
              <strong className="text-neutral-200">Limitations:</strong> Fullwidth text takes up
              roughly twice the horizontal space of normal text, so long passages can be hard to
              read. Some platforms may count fullwidth characters as two characters toward length
              limits. Screen readers will typically read fullwidth characters normally, but the
              stretched visual effect is lost in audio output.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="wide-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Wide Text Character Examples
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Letters",
                desc: "A→\uFF21 B→\uFF22 C→\uFF23 ... Z→\uFF3A and a→\uFF41 b→\uFF42 c→\uFF43 ... z→\uFF5A. All 52 Latin letters have fullwidth forms.",
              },
              {
                title: "Digits",
                desc: "0→\uFF10 1→\uFF11 2→\uFF12 ... 9→\uFF19. Fullwidth digits align perfectly with CJK characters in mixed-script text.",
              },
              {
                title: "Punctuation & Symbols",
                desc: "!→\uFF01 ?→\uFF1F @→\uFF20 #→\uFF03 $→\uFF04 and more. Every printable ASCII symbol has a fullwidth equivalent.",
              },
              {
                title: "Spaces",
                desc: "Regular space → ideographic space (U+3000). This wide space is the standard spacing character in CJK typography, twice the width of a normal space.",
              },
              {
                title: "Vaporwave Style",
                desc: "The signature aesthetic: \uFF36\uFF21\uFF30\uFF2F\uFF32\uFF37\uFF21\uFF36\uFF25. Pair with Japanese characters for the full retro-digital vibe.",
              },
              {
                title: "Passthrough",
                desc: "Characters outside ASCII 32-126 (accented letters, emoji, CJK characters, etc.) pass through unchanged. Newlines and tabs are preserved.",
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

        <AdSlot slot="before-footer" page="wide-text-generator" />

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
            FlipMyCase offers a suite of free browser-based text tools. Generate wide/vaporwave text
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
              href="/bubble-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              &#9399; Bubble Text
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
