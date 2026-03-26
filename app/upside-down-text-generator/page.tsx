import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { UpsideDownTextGeneratorTool } from "@/components/tools/upside-down-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("upside-down-text-generator")!;
const pageUrl = buildUrl("/upside-down-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "upside down text generator", "flip text upside down", "upside down letters",
    "flipped text", "inverted text generator", "rotated text", "reversed text",
    "upside down text copy paste", "unicode upside down", "flip words upside down",
    "backwards and upside down text", "upside down font", "text flipper online",
    "mirror text generator", "funny text generator", "upside down characters",
    "unicode text converter", "flip text online free", "social media text effects",
    "cool text generator upside down",
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
    question: "How does the upside down text generator work?",
    answer:
      "The tool maps each character in your text to its Unicode upside-down equivalent (for example, a becomes \u0250, e becomes \u01DD, T becomes \u22A5) and then reverses the entire string order. This creates the illusion that the text has been physically rotated 180 degrees. All processing happens in your browser \u2014 nothing is sent to a server.",
  },
  {
    question: "Can I copy and paste upside down text anywhere?",
    answer:
      "Yes. The upside down characters are standard Unicode, so they work in most apps and platforms including Facebook, Twitter/X, Instagram, TikTok, Discord, WhatsApp, iMessage, email, and text editors. Some fonts may not render every character, but the vast majority of modern systems support them.",
  },
  {
    question: "Does it work with numbers and punctuation?",
    answer:
      "Punctuation marks like ? ! . , ( ) [ ] { } < > and & are all flipped to their rotated equivalents (\u00BF \u00A1 \u02D9 etc.). Numbers do not have standard Unicode upside-down equivalents, so digits 0\u20139 remain unchanged. Letters (both uppercase and lowercase) are fully mapped.",
  },
  {
    question: "Why is the text also reversed?",
    answer:
      "When you physically rotate a page 180 degrees, the last character becomes the first. The tool replicates this by both mapping characters to their flipped forms AND reversing the string order. This gives the most realistic upside-down reading experience.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, completely free with no signup, no account, and no limits. Use it as many times as you want. Your text is processed entirely in your browser and is never sent to any server.",
  },
  {
    question: "What are common uses for upside down text?",
    answer:
      "People use upside down text for fun social media posts, creative usernames, jokes, pranks, unique bios, eye-catching comments, memes, and artistic text effects. It is also used in puzzles, escape room clues, and educational materials about Unicode and character encoding.",
  },
];

export default function UpsideDownTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Upside Down Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Upside Down Text", href: "/upside-down-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Upside Down Text Generator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An upside down text generator flips your text vertically using special Unicode characters. Type your text below to generate upside down text you can copy and paste anywhere.
        </p>

        <ToolAnswerBlock slug="upside-down-text-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Upside Down Text Generator Tool</h2>

          <h2>Upside Down Text Generator Features and Options</h2>

          <h2>About the Free Online Upside Down Text Generator</h2>

        </div>


        <div className="mt-4">
          <UpsideDownTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="upside-down-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Upside Down Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into
              the input box on the left. The tool accepts any text including letters,
              punctuation, and special characters. Click &quot;Load Example&quot; to see a
              demo.
            </p>
            <p>
              <strong className="text-neutral-200">2. See the flipped result instantly.</strong>{" "}
              The output panel on the right updates live as you type. Each character is
              replaced with its Unicode upside-down equivalent and the entire string is
              reversed to simulate a 180-degree rotation.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy and paste.</strong> Click the
              &quot;Copy&quot; button to copy the upside-down text to your clipboard. Paste it
              into social media posts, messages, usernames, bios, or anywhere that accepts
              text.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Upside Down Text and Unicode
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">How flipped characters work:</strong>{" "}
              Upside-down text is not a special font or image. It uses real Unicode
              characters that visually resemble rotated versions of standard Latin letters.
              For example, the letter &quot;a&quot; maps to &quot;\u0250&quot; (Latin Small Letter Turned A),
              and &quot;T&quot; maps to &quot;\u22A5&quot; (Up Tack). These characters are part of the
              Unicode standard and are supported by virtually all modern operating systems,
              browsers, and apps.
            </p>
            <p>
              <strong className="text-neutral-200">Why reverse the string?</strong>{" "}
              Imagine writing a sentence on paper and rotating it 180 degrees. The last
              letter would appear first, and each individual letter would be flipped. This
              tool replicates both effects: it maps each character to its rotated form AND
              reverses the order of the entire string. Without the reversal, the text would
              look like individual flipped letters but still read left-to-right in the
              original order, which breaks the illusion.
            </p>
            <p>
              <strong className="text-neutral-200">Character coverage:</strong> All 26
              lowercase letters (a-z) and all 26 uppercase letters (A-Z) have mapped
              equivalents. Common punctuation marks like periods, commas, question marks,
              exclamation points, brackets, and parentheses are also flipped. Numbers and
              some special symbols do not have standard Unicode rotated forms, so they pass
              through unchanged.
            </p>
            <p>
              <strong className="text-neutral-200">Where you can use it:</strong> Upside
              down text works on Facebook, Twitter/X, Instagram captions and bios, TikTok
              comments, Discord messages, Reddit posts, WhatsApp, iMessage, email subject
              lines, and any platform that supports Unicode text input. It is a great way
              to make your posts stand out or add a playful twist.
            </p>
            <p>
              <strong className="text-neutral-200">Creative applications:</strong> Beyond
              social media, upside-down text is used in puzzle design, escape room clues,
              educational materials about character encoding, typographic experiments, and
              art projects. Teachers use it to create answer keys that students cannot read
              at a glance. Designers use it for visual impact in posters and graphics.
            </p>
            <p>
              <strong className="text-neutral-200">Privacy and speed:</strong> This tool
              runs entirely in your browser using JavaScript. No text is transmitted to any
              server, and nothing is stored beyond your current session (with optional
              localStorage persistence). Processing is instantaneous regardless of input
              length.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="upside-down-text-generator" />

        <AdSlot slot="before-footer" page="upside-down-text-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Upside Down Text Generator
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
            FlipMyCase offers a suite of free browser-based text tools. Generate upside down
            text here, then explore more Unicode text effects and converters.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/fancy-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ✨ Fancy Text Generator
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
