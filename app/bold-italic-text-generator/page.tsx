import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { BoldItalicTextGeneratorTool } from "@/components/tools/bold-italic-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("bold-italic-text-generator")!;
const pageUrl = buildUrl("/bold-italic-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "bold italic text generator", "bold italic unicode text",
    "bold italic font copy paste", "bold italic text for social media",
    "unicode bold italic letters", "mathematical bold italic",
    "bold italic instagram bio", "bold italic twitter text",
    "fancy bold italic text", "bold italic font generator online",
    "unicode text converter", "bold italic copy paste free",
    "social media bold italic text", "bold italic text maker",
    "bold italic text formatter", "unicode bold italic alphabet",
    "bold italic text online free", "bold italic font online",
    "bold italic text creator", "free bold italic text tool",
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
    question: "How does the bold italic text generator work?",
    answer:
      "This tool maps each letter you type to its Unicode Mathematical Bold Italic equivalent. Uppercase A-Z becomes characters U+1D468 to U+1D481, and lowercase a-z becomes U+1D482 to U+1D49B. Numbers, spaces, punctuation, and other characters pass through unchanged. The conversion happens instantly in your browser — nothing is sent to a server.",
  },
  {
    question: "Where can I use bold italic Unicode text?",
    answer:
      "Bold italic Unicode text works on most platforms that support Unicode, including Instagram bios, Twitter/X posts, Facebook updates, LinkedIn profiles, WhatsApp messages, Discord chats, YouTube comments, TikTok bios, and email subject lines. It renders as styled text without any special formatting support from the platform.",
  },
  {
    question: "Why do some characters not convert to bold italic?",
    answer:
      "The Unicode Mathematical Bold Italic block only defines mappings for the 26 English letters (A-Z and a-z). Numbers, punctuation, spaces, accented characters, and non-Latin scripts do not have bold italic Unicode equivalents, so they pass through unchanged. This is a limitation of the Unicode standard, not the tool.",
  },
  {
    question: "Is bold italic Unicode text accessible to screen readers?",
    answer:
      "Screen readers may handle Unicode mathematical symbols differently than regular text. Some screen readers read the characters correctly, while others may spell out the Unicode block name. For accessibility-critical content, use platform-native formatting (HTML bold/italic tags) instead of Unicode substitution.",
  },
  {
    question: "Will bold italic text affect my SEO or search ranking?",
    answer:
      "Unicode bold italic characters are different code points than regular letters, so search engines may not treat them as equivalent text. Avoid using Unicode styled text for important keywords on web pages. It is best suited for social media bios, display names, and decorative text where search indexing is not a concern.",
  },
  {
    question: "Can I convert bold italic text back to normal text?",
    answer:
      "This tool converts normal text to bold italic. To reverse the process, you can paste bold italic text into the Case Converter tool on FlipMyCase or use any plain text converter to strip Unicode formatting. The Plain Text Converter tool on this site can also help.",
  },
];

export default function BoldItalicTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Bold Italic Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Bold Italic Text Generator", href: "/bold-italic-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Bold Italic Text Generator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A bold italic text generator converts regular text into Unicode bold italic characters that can be copied and pasted anywhere. Type your text below to generate bold italic text for social media and bios.
        </p>

        <ToolAnswerBlock slug="bold-italic-text-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Bold Italic Text Generator Tool</h2>

          <h2>Bold Italic Text Generator Features and Options</h2>

          <h2>About the Free Online Bold Italic Text Generator</h2>

        </div>


        <div className="mt-4">
          <BoldItalicTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="bold-italic-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Bold Italic Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the
              input box on the left. The tool accepts any text: words, sentences, paragraphs, or
              even single letters. Use the example button to see a demo.
            </p>
            <p>
              <strong className="text-neutral-200">2. See the bold italic output instantly.</strong>{" "}
              As you type, the right panel shows your text converted to Unicode Mathematical Bold
              Italic characters. The conversion is live with zero delay.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result.</strong> Click the copy
              button to copy the bold italic text to your clipboard. Paste it into any app or
              platform that supports Unicode text.
            </p>
            <p>
              <strong className="text-neutral-200">4. Paste anywhere.</strong> The output uses
              real Unicode characters, not formatting tags. This means it works on social media,
              messaging apps, email, and anywhere that accepts text input.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What Is Unicode Bold Italic Text?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Unicode mathematical symbols:</strong> The
              Unicode standard includes a set of characters called Mathematical Alphanumeric
              Symbols (block U+1D400 to U+1D7FF). Within this block, there are complete alphabets
              rendered in various styles: bold, italic, bold italic, script, fraktur, double-struck,
              monospace, and more. This tool uses the Bold Italic subset specifically.
            </p>
            <p>
              <strong className="text-neutral-200">How it differs from HTML formatting:</strong>{" "}
              When you bold or italicize text in a word processor or on a website, the platform
              applies styling to regular characters. Unicode bold italic text uses entirely different
              code points. The letter &quot;A&quot; (U+0041) and the bold italic &quot;𝑨&quot;
              (U+1D468) are different characters to a computer, even though they represent the same
              letter visually.
            </p>
            <p>
              <strong className="text-neutral-200">Platform compatibility:</strong> Because these
              are real Unicode characters, they render on any system with a font that includes the
              Mathematical Alphanumeric Symbols block. Modern operating systems (Windows 10+, macOS,
              iOS, Android) and modern browsers all support these characters. Older systems or
              specialized environments may show placeholder boxes instead.
            </p>
            <p>
              <strong className="text-neutral-200">Social media use cases:</strong> Most social
              media platforms strip HTML formatting from user input, but they preserve Unicode
              characters. This makes Unicode bold italic text a popular way to add visual emphasis
              to bios, posts, and comments on Instagram, Twitter/X, Facebook, LinkedIn, TikTok, and
              YouTube without any special formatting tools.
            </p>
            <p>
              <strong className="text-neutral-200">Limitations to be aware of:</strong> Only the 26
              English letters (uppercase and lowercase) have bold italic Unicode equivalents. Numbers,
              punctuation, accented characters, and non-Latin scripts are not part of the
              Mathematical Bold Italic block. Screen readers may not interpret these characters as
              regular text, so avoid using them for accessibility-critical content.
            </p>
            <p>
              <strong className="text-neutral-200">Creative applications:</strong> Beyond social
              media, bold italic Unicode text is used in mathematical notation, academic papers
              (to denote vectors or tensors), creative writing, branding, display names in gaming
              platforms, and decorative text in messaging apps. The characters carry semantic meaning
              in mathematics, where bold italic typically represents matrix or tensor quantities.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="bold-italic-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Popular Uses for Bold Italic Text
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Instagram Bios",
                desc: "Make your Instagram bio stand out with bold italic text. Add emphasis to your name, tagline, or call-to-action without relying on Instagram's limited formatting options.",
              },
              {
                title: "Twitter/X Posts",
                desc: "Grab attention in a crowded feed by using bold italic text in tweets. Highlight key phrases, quotes, or announcements to increase engagement and readability.",
              },
              {
                title: "Facebook Updates",
                desc: "Add visual emphasis to Facebook posts and comments. Bold italic text works in status updates, group posts, and page descriptions without any special tools.",
              },
              {
                title: "LinkedIn Profiles",
                desc: "Enhance your LinkedIn headline, summary, or post content with bold italic text. Stand out to recruiters and connections with styled text in your profile.",
              },
              {
                title: "Discord & Chat Apps",
                desc: "Use bold italic Unicode text in Discord server names, channel topics, and messages. It works alongside Discord's native Markdown formatting for extra flair.",
              },
              {
                title: "Email Subject Lines",
                desc: "Catch attention in crowded inboxes with bold italic characters in email subject lines. Note: some email clients may not render all Unicode characters consistently.",
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

        <AdSlot slot="before-footer" page="bold-italic-text-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Bold Italic Text Generator
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
            FlipMyCase offers a full suite of free browser-based text tools. Generate bold italic
            text here, then explore other converters and formatters.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/spongebob-case-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧽 SpongeBob Case
            </Link>
            <Link
              href="/plain-text-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📄 Plain Text
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
