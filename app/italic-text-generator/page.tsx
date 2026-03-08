import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ItalicTextGeneratorTool } from "@/components/tools/italic-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("italic-text-generator")!;
const pageUrl = buildUrl("/italic-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "italic text generator", "italic unicode text", "italic font generator",
    "copy paste italic text", "italic text for instagram", "italic text for twitter",
    "italic text for facebook", "unicode italic converter", "italic font copy paste",
    "mathematical italic unicode", "fancy italic text", "italic text maker",
    "italic letters generator", "italic text online free", "social media italic text",
    "italic bio text", "unicode text converter", "fancy text generator",
    "italic text for social media", "free italic text tool",
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
    question: "How does the italic text generator work?",
    answer:
      "This tool maps regular Latin letters (A-Z, a-z) to their Unicode Mathematical Italic equivalents. These are real Unicode characters, not HTML formatting or CSS styles. The italic characters are part of the Unicode standard and can be copied and pasted into any text field that supports Unicode.",
  },
  {
    question: "Where can I use italic Unicode text?",
    answer:
      "You can paste italic Unicode text into social media bios (Instagram, Twitter/X, TikTok, Facebook), messaging apps (WhatsApp, Telegram, Discord), YouTube comments, email subject lines, forum posts, and anywhere else that accepts plain text. Since these are real characters, they work without any special formatting support.",
  },
  {
    question: "Why do some characters not convert to italic?",
    answer:
      "Only the 26 uppercase (A-Z) and 26 lowercase (a-z) Latin letters have Unicode Mathematical Italic equivalents. Numbers, punctuation, spaces, accented characters, and non-Latin scripts pass through unchanged because Unicode does not define italic variants for them.",
  },
  {
    question: "Is italic Unicode text accessible to screen readers?",
    answer:
      "Screen reader support for Mathematical Italic Unicode characters varies. Some screen readers read them correctly, while others may spell out the Unicode character names or skip them entirely. For accessibility-critical content, consider using standard text with HTML or CSS italic formatting instead.",
  },
  {
    question: "What is the difference between Unicode italic and HTML italic?",
    answer:
      "HTML italic (<em> or <i> tags) and CSS font-style: italic are rendering instructions that tell the browser to display text in italic. Unicode italic characters are distinct code points that look italic regardless of formatting. Unicode italic works in plain text contexts where HTML and CSS are not available, like social media bios.",
  },
  {
    question: "Why does the lowercase 'h' look different?",
    answer:
      "The lowercase italic 'h' maps to U+210E, the Planck constant symbol (ℎ), which is the designated Unicode character for italic lowercase h. This is the standard defined by the Unicode Consortium, and it is used instead of a Mathematical Italic Small H because that code point was reserved for the Planck constant in physics notation.",
  },
];

export default function ItalicTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Italic Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Italic Text Generator", href: "/italic-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Italic Text Generator — Copy & Paste Free
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-400">
          Convert regular text into 𝘪𝘵𝘢𝘭𝘪𝘤 Unicode characters you can copy and paste anywhere.
          Works on Instagram, Twitter/X, Facebook, Discord, and more. Free, no signup, runs entirely
          in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <ItalicTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="italic-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Italic Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the
              input box on the left. The tool accepts any text including letters, numbers,
              punctuation, and special characters.
            </p>
            <p>
              <strong className="text-neutral-200">2. See the italic output instantly.</strong> As
              you type, every letter (A-Z, a-z) converts to its Unicode Mathematical Italic
              equivalent in real time. Numbers and symbols pass through unchanged.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result.</strong> Click the copy
              button to copy the italic text to your clipboard. Paste it into any social media bio,
              comment, message, or text field.
            </p>
            <p>
              <strong className="text-neutral-200">4. Use the example button</strong> to see how
              italic conversion works with a sample sentence before entering your own text.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What Is Unicode Italic Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              Unicode italic text uses characters from the Mathematical Alphanumeric Symbols block
              (U+1D400-U+1D7FF) in the Unicode standard. Unlike regular italic formatting that
              depends on HTML or CSS, these are standalone characters that carry their italic
              appearance as part of their identity. When you type &quot;hello&quot; and convert it,
              each letter becomes a different Unicode code point that inherently looks italic.
            </p>
            <p>
              <strong className="text-neutral-200">Social media and messaging:</strong> Most social
              media platforms strip HTML formatting from posts and bios. Unicode italic characters
              bypass this limitation because they are treated as regular text characters. This makes
              them ideal for adding emphasis to Instagram bios, Twitter/X display names, Facebook
              posts, LinkedIn headlines, and Discord messages without relying on platform-specific
              formatting tools.
            </p>
            <p>
              <strong className="text-neutral-200">Mathematical origins:</strong> The Unicode
              Mathematical Italic characters were originally designed for mathematical notation, where
              italic variables are standard (like 𝘹 for an unknown or 𝘧 for a function). The
              Unicode Consortium included these characters so mathematical documents could be
              represented in plain text without requiring special rendering. The fact that they look
              like regular italic letters makes them useful far beyond mathematics.
            </p>
            <p>
              <strong className="text-neutral-200">How the mapping works:</strong> Uppercase letters
              A through Z map to code points U+1D434 through U+1D44D. Lowercase letters a through z
              map to U+1D44E through U+1D467, with one exception: the lowercase letter h maps to
              U+210E (the Planck constant symbol), which is the Unicode-designated italic h. All
              non-letter characters — digits, punctuation, spaces, emoji — pass through unchanged
              because Unicode does not define italic variants for them.
            </p>
            <p>
              <strong className="text-neutral-200">Compatibility considerations:</strong> Unicode
              italic characters display correctly on most modern devices, browsers, and operating
              systems. However, some older systems or specialized software may render them as boxes
              or question marks if the required fonts are not installed. Screen readers may also
              handle them differently than regular text, so avoid using Unicode italic for
              accessibility-critical content. For web content where you control the rendering
              environment, standard HTML italic tags (&lt;em&gt;) remain the better choice.
            </p>
            <p>
              <strong className="text-neutral-200">Plain text advantage:</strong> The key benefit of
              Unicode italic is that it works in plain text contexts. Email subject lines, text
              messages, file names, code comments, and any other context that accepts Unicode text
              can display italic characters. This is something CSS and HTML italic cannot do,
              making Unicode italic a unique tool for text styling in constrained environments.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="italic-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Popular Uses for Italic Unicode Text
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Instagram Bios",
                desc: "Stand out with italic text in your Instagram bio. Since Instagram does not support formatting, Unicode italic is the only way to add visual emphasis to your profile description.",
              },
              {
                title: "Twitter/X Display Names",
                desc: "Use italic characters in your Twitter/X display name or bio to differentiate your profile. Works in tweets and replies too.",
              },
              {
                title: "Discord Messages",
                desc: "While Discord supports Markdown italic (*text*), Unicode italic works in server names, channel topics, and other places where Markdown is not parsed.",
              },
              {
                title: "Email Subject Lines",
                desc: "Add subtle emphasis to email subject lines with italic Unicode. Most email clients render these characters correctly, making your subject line visually distinct.",
              },
              {
                title: "YouTube Comments",
                desc: "YouTube comments do not support rich text formatting. Unicode italic lets you add emphasis and style to comments that would otherwise be plain text.",
              },
              {
                title: "Creative Writing",
                desc: "Use italic Unicode for book titles, foreign words, or emphasis in plain text documents where standard italic formatting is not available.",
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

        <AdSlot slot="before-footer" page="italic-text-generator" />

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
            FlipMyCase offers a suite of free browser-based text tools. Generate italic text here,
            then explore other tools for case conversion, text formatting, and more.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
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
            <Link
              href="/toggle-case-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Toggle Case
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
