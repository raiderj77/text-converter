import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { SuperscriptGeneratorTool } from "@/components/tools/superscript-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("superscript-generator")!;
const pageUrl = buildUrl("/superscript-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "superscript text generator", "superscript unicode", "copy paste superscript",
    "superscript letters", "superscript numbers", "unicode superscript converter",
    "superscript text online", "free superscript generator", "superscript symbols",
    "small text generator", "tiny text superscript", "exponent text generator",
    "superscript font", "superscript copy paste", "math superscript text",
    "unicode small letters", "superscript text maker", "online superscript tool",
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
    question: "What is superscript text?",
    answer:
      "Superscript text consists of small characters positioned above the normal text baseline. This tool uses Unicode superscript characters — not HTML tags — so the output works anywhere you can paste text: social media, messaging apps, bios, emails, and documents.",
  },
  {
    question: "Which characters can be converted to superscript?",
    answer:
      "All lowercase letters except q, all digits 0-9, and the symbols + - = ( ) have Unicode superscript equivalents. The letter q has no standard Unicode superscript and will pass through unchanged. Uppercase letters are converted using their lowercase superscript form.",
  },
  {
    question: "Why does the letter q not convert?",
    answer:
      "Unicode does not include a superscript version of the letter q. This is a limitation of the Unicode standard, not this tool. The letter q will appear in its normal form in the output. All other letters have superscript equivalents.",
  },
  {
    question: "Where can I use superscript text?",
    answer:
      "Superscript Unicode text works on most platforms that support Unicode: Twitter/X, Instagram bios, Facebook, Reddit, Discord, Telegram, WhatsApp, emails, and documents. It may not render correctly in very old systems or monospace-only terminals.",
  },
  {
    question: "Is this the same as HTML superscript?",
    answer:
      "No. HTML <sup> tags only work in web pages and require a browser to render. This tool generates Unicode characters that look like superscript everywhere — no HTML needed. The characters are actual Unicode code points, not formatting tags.",
  },
  {
    question: "Can I use superscript for math notation?",
    answer:
      "Yes, superscript Unicode is commonly used for simple math expressions like x² + y² = z², exponents, and footnote markers. For complex mathematical notation, consider LaTeX or MathML instead, but for quick inline expressions, Unicode superscript works well.",
  },
];

export default function SuperscriptGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Superscript Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Superscript Generator", href: "/superscript-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Superscript Text Generator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A superscript text generator converts regular text into Unicode superscript characters that can be copied and pasted anywhere. Type your text below to generate superscript text instantly.
        </p>

        <ToolAnswerBlock slug="superscript-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Superscript Generator Tool</h2>

          <h2>Superscript Generator Features and Options</h2>

          <h2>About the Free Online Superscript Generator</h2>

        </div>


        <div className="mt-4">
          <SuperscriptGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="superscript-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Superscript Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the input
              box on the left. The superscript conversion happens live as you type — there is no
              submit button to click.
            </p>
            <p>
              <strong className="text-neutral-200">2. View the superscript output</strong> in the
              right panel. Every supported character is replaced with its Unicode superscript
              equivalent. Characters without superscript forms (like q) pass through unchanged.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the result</strong> by clicking the Copy
              button. The superscript text is now on your clipboard, ready to paste into social media,
              messaging apps, documents, or anywhere else that supports Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Try the example</strong> by clicking Load
              Example to see how letters, numbers, and symbols are converted. Use Clear All to reset
              both panels.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Unicode Superscript Characters
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">What makes superscript text special:</strong>{" "}
              Unlike HTML &lt;sup&gt; tags that only work on web pages, Unicode superscript characters
              are real characters defined in the Unicode standard. They render as small, raised text
              on any platform that supports Unicode — which includes virtually every modern device
              and application.
            </p>
            <p>
              <strong className="text-neutral-200">How it works technically:</strong> Each superscript
              character has its own Unicode code point. For example, the superscript &quot;2&quot; is U+00B2
              (the character used in m&sup2;), and the superscript &quot;n&quot; is U+207F. These are not
              styled versions of normal letters — they are distinct characters recognized by text
              systems worldwide.
            </p>
            <p>
              <strong className="text-neutral-200">Common uses:</strong> Superscript text is widely
              used for mathematical exponents (x&sup2;), ordinal indicators (1ˢᵗ, 2ⁿᵈ, 3ʳᵈ), footnote
              markers, chemical formulas, and stylistic text in social media bios and usernames. It
              adds visual variety without requiring any special formatting tools.
            </p>
            <p>
              <strong className="text-neutral-200">Coverage limitations:</strong> The Unicode standard
              includes superscript forms for most lowercase Latin letters, all digits, and several
              common symbols. However, the letter q has no superscript equivalent. Uppercase letters
              are mapped through their lowercase superscript forms since separate uppercase superscripts
              do not exist in Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">Platform compatibility:</strong> Superscript Unicode
              characters display correctly on iOS, Android, Windows, macOS, and Linux. They work in
              Twitter/X, Instagram, Facebook, Reddit, Discord, Slack, WhatsApp, Telegram, email clients,
              and word processors. Rendering may vary slightly between fonts, but the characters are
              universally supported.
            </p>
            <p>
              <strong className="text-neutral-200">Superscript vs. subscript:</strong> Superscript
              characters appear above the baseline (like exponents), while subscript characters appear
              below (like chemical formula numbers). Both use dedicated Unicode code points. This tool
              focuses on superscript — check out the Subscript Generator for below-baseline text.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="superscript-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Superscript Character Reference Table
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Letters (a-z)",
                desc: "a→ᵃ b→ᵇ c→ᶜ d→ᵈ e→ᵉ f→ᶠ g→ᵍ h→ʰ i→ⁱ j→ʲ k→ᵏ l→ˡ m→ᵐ n→ⁿ o→ᵒ p→ᵖ r→ʳ s→ˢ t→ᵗ u→ᵘ v→ᵛ w→ʷ x→ˣ y→ʸ z→ᶻ. Note: q has no superscript equivalent.",
              },
              {
                title: "Digits (0-9)",
                desc: "0→⁰ 1→¹ 2→² 3→³ 4→⁴ 5→⁵ 6→⁶ 7→⁷ 8→⁸ 9→⁹. All digits have full superscript support in Unicode.",
              },
              {
                title: "Symbols",
                desc: "+→⁺ -→⁻ =→⁼ (→⁽ )→⁾. These symbols let you write complete mathematical expressions in superscript.",
              },
              {
                title: "Unsupported Characters",
                desc: "The letter q, uppercase-specific forms, and most punctuation marks pass through unchanged. Spaces and line breaks are preserved as-is.",
              },
              {
                title: "Math Expressions",
                desc: "Write x² + y² = z² or E = mc² using superscript digits and symbols. Perfect for inline math notation without LaTeX.",
              },
              {
                title: "Social Media Use",
                desc: "Add superscript to your Twitter/X bio, Instagram name, Discord username, or Reddit flair for a unique typographic style.",
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

        <AdSlot slot="before-footer" page="superscript-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Superscript Generator
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
            FlipMyCase offers a suite of free browser-based text tools. Generate superscript text
            here, then explore more Unicode and text conversion tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
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
