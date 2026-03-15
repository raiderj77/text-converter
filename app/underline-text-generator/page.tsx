import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { UnderlineTextGeneratorTool } from "@/components/tools/underline-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("underline-text-generator")!;
const pageUrl = buildUrl("/underline-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "underline text generator", "underlined text copy paste",
    "unicode underline text", "underline text online",
    "combining underline character", "underline text for social media",
    "underline text for Instagram", "underline text for Twitter",
    "underline text for Facebook", "free underline text tool",
    "underline text unicode", "text underline converter",
    "underline font generator", "underline text maker",
    "copy paste underline text", "underline text effect",
    "underline text formatter", "unicode text effects",
    "underline text without HTML", "browser underline text generator",
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
    question: "How does the underline text generator work?",
    answer:
      "The tool adds the Unicode combining underline character (U+0332) after each character in your text. This creates a visual underline effect that works in most platforms and apps, because the underline is part of the text itself rather than HTML formatting.",
  },
  {
    question: "Can I use underlined text on social media?",
    answer:
      "Yes. Because the underline is created with Unicode combining characters, it works on most social media platforms including Instagram, Twitter/X, Facebook, TikTok, and LinkedIn. Simply copy the output and paste it into your post or bio.",
  },
  {
    question: "Why does my underlined text look different on some devices?",
    answer:
      "Unicode combining characters are rendered differently depending on the font, browser, and operating system. Some fonts display a continuous underline, while others show gaps between characters. Mobile devices and desktop browsers may also render them differently.",
  },
  {
    question: "Is this the same as HTML underline?",
    answer:
      "No. HTML uses the <u> tag or CSS text-decoration to underline text, but that only works in web pages. This tool uses Unicode combining characters that are embedded in the text itself, so the underline travels with the text when you copy and paste it anywhere.",
  },
  {
    question: "Does the tool work with emojis and special characters?",
    answer:
      "The combining underline character is applied to every character in the input. It works well with standard letters, numbers, and punctuation. With emojis and complex Unicode characters, the visual result may vary depending on the platform rendering them.",
  },
  {
    question: "Is there a character limit?",
    answer:
      "There is no hard limit. The tool processes text entirely in your browser, so performance depends on your device. It handles thousands of characters efficiently. For very long texts (100,000+ characters), you may notice a slight delay.",
  },
];

export default function UnderlineTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Underline Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Underline Text Generator", href: "/underline-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Underline Text Generator — Copy & Paste
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An underline text generator adds a line under your text using Unicode combining characters. Type your text below to generate underlined text you can copy and paste anywhere.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <UnderlineTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="underline-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Underline Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the
              input box on the left. You can enter any text — words, sentences, paragraphs, or even
              single characters.
            </p>
            <p>
              <strong className="text-neutral-200">2. See the underlined result instantly.</strong>{" "}
              The output panel on the right updates live as you type. Each character gets the Unicode
              combining underline character (U+0332) appended to it, creating the underlined effect.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy and paste anywhere.</strong> Click the
              Copy button to copy the underlined text to your clipboard. Paste it into social media
              posts, messaging apps, email subjects, bios, or any text field that supports Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Note about rendering.</strong> The underline
              effect relies on Unicode combining characters, which means the visual result may vary
              slightly between platforms, fonts, and devices. Test on your target platform to ensure
              it looks the way you want.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Unicode Underline Text
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">What are combining characters?</strong> Unicode
              includes a category of characters called combining characters. These are special
              characters that attach to the previous character rather than appearing on their own.
              The combining low line (U+0332) is one such character — it draws a line below the
              character it follows. When applied to every character in a word, it creates the
              appearance of continuous underlined text.
            </p>
            <p>
              <strong className="text-neutral-200">Why use Unicode underlines?</strong> Most text
              fields on the internet do not support HTML formatting or rich text. Social media
              platforms like Instagram, Twitter/X, and Facebook strip HTML tags from posts and bios.
              Unicode combining characters bypass this limitation because they are part of the text
              data itself. The underline effect travels with the text wherever you paste it.
            </p>
            <p>
              <strong className="text-neutral-200">Where does this work?</strong> Unicode underline
              text works in most modern platforms: social media bios and posts, messaging apps like
              WhatsApp and Telegram, email subject lines, forum posts, Discord messages, and any
              text field that accepts Unicode input. The visual quality depends on the font used by
              each platform.
            </p>
            <p>
              <strong className="text-neutral-200">Limitations to be aware of:</strong> Not all
              fonts render combining underlines identically. Some fonts show gaps between characters,
              while others display a continuous line. Monospaced fonts tend to show more uniform
              results. Screen readers may announce combining characters differently, so consider
              accessibility when using decorative text effects in important communications.
            </p>
            <p>
              <strong className="text-neutral-200">Combining vs. HTML underlines:</strong> HTML uses
              the &lt;u&gt; tag or the CSS property text-decoration: underline to create underlined
              text. These approaches only work within web pages and are stripped when you copy text
              to other applications. Unicode combining underlines are fundamentally different — they
              modify the character data itself, making them portable across any text environment.
            </p>
            <p>
              <strong className="text-neutral-200">Character count impact:</strong> Each combining
              underline character adds one character to the output, doubling the character count of
              your text. Most platforms have generous character limits, but if you are working with
              a strict limit (like Twitter/X&apos;s 280 characters), keep in mind that underlined text
              uses twice as many characters as plain text. The stats panel below the tool shows you
              the exact character counts for both input and output.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="underline-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Popular Uses for Underline Text
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Social Media Bios",
                desc: "Stand out on Instagram, TikTok, and Twitter/X with underlined text in your bio. Highlight your name, tagline, or key information to draw attention.",
              },
              {
                title: "Messaging Apps",
                desc: "Add emphasis to WhatsApp, Telegram, or Discord messages. Use underlined text to highlight important details without shouting in ALL CAPS.",
              },
              {
                title: "Forum Posts & Comments",
                desc: "Make your Reddit, Quora, or forum comments more readable by underlining key terms or important links in plain text discussions.",
              },
              {
                title: "Email Subject Lines",
                desc: "Grab attention in crowded inboxes with underlined keywords in email subjects. Works in most email clients that support Unicode display.",
              },
              {
                title: "Creative Writing",
                desc: "Use underline effects for artistic text, poetry formatting, or stylized headings. Create visual emphasis without relying on HTML or rich text editors.",
              },
              {
                title: "Annotations & Notes",
                desc: "Mark important terms in plain text notes and study materials. Underlined text makes key concepts easy to find when scanning documents.",
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

        <AdSlot slot="before-footer" page="underline-text-generator" />

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
            FlipMyCase offers a suite of free browser-based text tools. Generate underlined text
            here, then explore other Unicode text effects and formatting tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/strikethrough-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              T̶ Strikethrough
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
              href="/text-reverser"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ↔️ Text Reverser
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
