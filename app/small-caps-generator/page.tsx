import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { SmallCapsGeneratorTool } from "@/components/tools/small-caps-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("small-caps-generator")!;
const pageUrl = buildUrl("/small-caps-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "small caps generator", "small caps text copy paste",
    "unicode small caps", "small caps online",
    "small capital letters generator", "small caps font generator",
    "small caps for social media", "small caps for Instagram",
    "small caps for Twitter", "small caps text converter",
    "free small caps tool", "small caps copy paste",
    "small caps text maker", "small caps Unicode text",
    "petite caps generator", "small caps formatter",
    "small caps text effect", "copy paste small caps",
    "small caps without CSS", "online small caps generator",
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
    question: "How does the small caps generator work?",
    answer:
      "The tool maps each lowercase letter to its Unicode small capital equivalent. For example, 'a' becomes 'ᴀ', 'b' becomes 'ʙ', and so on. Uppercase letters pass through unchanged, creating a natural look where capital letters are full-size and lowercase letters appear as smaller capitals.",
  },
  {
    question: "Can I use small caps text on social media?",
    answer:
      "Yes. Because small caps are created using Unicode characters, they work on most social media platforms including Instagram, Twitter/X, Facebook, TikTok, and LinkedIn. Simply copy the output and paste it into your post, bio, or comment.",
  },
  {
    question: "Why do some letters look different than expected?",
    answer:
      "Unicode does not have a perfect small capital equivalent for every letter. The letter 'x' has no distinct small capital form and passes through as-is. The letter 'q' uses a close approximation (ǫ). These minor differences are inherent to the Unicode standard and are consistent across platforms.",
  },
  {
    question: "Is this the same as CSS font-variant: small-caps?",
    answer:
      "No. CSS small-caps is a font rendering instruction that only works in web pages. This tool uses actual Unicode characters that are part of the text data itself. The small caps effect travels with the text when you copy and paste it into any application, regardless of CSS support.",
  },
  {
    question: "Do small caps work with numbers and punctuation?",
    answer:
      "Numbers, punctuation, and special characters pass through unchanged. Only lowercase letters a-z are converted to their small capital equivalents. This means your numbers, spaces, commas, and other characters remain exactly as you typed them.",
  },
  {
    question: "Can screen readers read small caps text?",
    answer:
      "Screen reader behavior varies. Some screen readers may announce Unicode small capitals differently than regular letters, as they are technically different Unicode code points. For accessibility-critical content, consider using regular text. Small caps are best suited for decorative or stylistic purposes.",
  },
];

export default function SmallCapsGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Small Caps Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Small Caps Generator", href: "/small-caps-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Small Caps Generator — Copy & Paste
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-400">
          Generate small caps Unicode text (Sᴍᴀʟʟ Cᴀᴘꜱ) you can copy and paste anywhere — social
          media, messaging apps, design projects, and more. Free, no signup, works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <SmallCapsGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="small-caps-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Small Caps Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into the
              input box on the left. The tool accepts any text — words, sentences, or paragraphs.
              Uppercase letters will remain full-size while lowercase letters convert to small capitals.
            </p>
            <p>
              <strong className="text-neutral-200">2. See the small caps result instantly.</strong>{" "}
              The output panel on the right updates live as you type. Each lowercase letter is
              replaced with its Unicode small capital equivalent, while uppercase letters, numbers,
              and punctuation remain unchanged.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy and paste anywhere.</strong> Click the
              Copy button to copy the small caps text to your clipboard. Paste it into social media
              bios, posts, messaging apps, documents, or any text field that supports Unicode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Mix with regular text.</strong> Small caps
              look best when used alongside regular uppercase letters. Type &quot;Hello World&quot;
              to get &quot;Hᴇʟʟᴏ Wᴏʀʟᴅ&quot; — the capital H and W stay full-size while the rest
              becomes small capitals, creating an elegant typographic effect.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What Are Small Caps and Why Use Them?
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">A typographic tradition.</strong> Small capitals
              have been used in typography for centuries. They are uppercase letterforms that are
              drawn at the same height as lowercase letters. In traditional print, they add elegance
              to headings, acronyms, and proper nouns without the visual weight of full capitals.
              This tool brings that typographic tradition to digital text using Unicode characters.
            </p>
            <p>
              <strong className="text-neutral-200">Aesthetic appeal.</strong> Small caps create a
              refined, professional appearance that sits between the casualness of lowercase and the
              intensity of uppercase. Designers and typographers use them for headers, logos,
              monograms, and brand names. With Unicode small caps, you can achieve this look in any
              text field — no special fonts or CSS required.
            </p>
            <p>
              <strong className="text-neutral-200">Social media styling.</strong> Platforms like
              Instagram, Twitter/X, and TikTok do not offer built-in text formatting options. Unicode
              small caps give you a way to style your bio, display name, or posts without relying on
              platform-specific features. They work because they are real Unicode characters, not
              formatting instructions.
            </p>
            <p>
              <strong className="text-neutral-200">Acronyms and abbreviations.</strong> In
              professional writing, small caps are traditionally used for acronyms to prevent them
              from dominating the visual flow of text. Instead of &quot;NASA&quot; in full capitals,
              typographers write it in small caps so it blends more naturally with surrounding text.
            </p>
            <p>
              <strong className="text-neutral-200">Unicode implementation.</strong> The Unicode
              standard includes small capital letters as part of the International Phonetic Alphabet
              (IPA) and other linguistic extensions. This tool repurposes those characters for
              decorative text generation. While they were designed for phonetic transcription, they
              work perfectly as visual small capitals in any context.
            </p>
            <p>
              <strong className="text-neutral-200">Limitations.</strong> Unicode small caps are not
              available for every letter — &quot;x&quot; has no distinct small capital form and passes
              through unchanged. The letter &quot;q&quot; uses a close approximation. Additionally,
              screen readers may not pronounce Unicode small capitals the same way as regular letters,
              so use them for decorative purposes rather than accessibility-critical content.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="small-caps-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Creative Uses for Small Caps
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Social Media Bios",
                desc: "Create an elegant, distinctive bio on Instagram, TikTok, or Twitter/X. Small caps add a professional, designer touch that makes your profile stand out from plain text.",
              },
              {
                title: "Brand Names & Logos",
                desc: "Style brand names, product names, or personal branding with small caps for a refined typographic look. Works in any text field without special fonts.",
              },
              {
                title: "Headings & Titles",
                desc: "Use small caps for headings in plain text documents, emails, or forum posts. They provide visual hierarchy without the visual loudness of full uppercase.",
              },
              {
                title: "Design Mockups",
                desc: "Generate small caps text for design prototypes and wireframes. Copy Unicode small caps directly into Figma, Sketch, or other design tools for realistic typography previews.",
              },
              {
                title: "Academic Writing",
                desc: "Use small caps for author names in bibliographies, time periods (ᴀ.ᴅ., ʙ.ᴄ.), and abbreviations, following traditional typographic conventions in scholarly work.",
              },
              {
                title: "Invitations & Formal Text",
                desc: "Add a classic, formal feel to digital invitations, announcements, and formal communications. Small caps evoke the elegance of traditional letterpress printing.",
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

        <AdSlot slot="before-footer" page="small-caps-generator" />

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
            FlipMyCase offers a suite of free browser-based text tools. Generate small caps text
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
              href="/strikethrough-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              T̶ Strikethrough
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
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
