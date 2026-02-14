import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { LoremIpsumTool } from "@/components/tools/lorem-ipsum";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("lorem-ipsum-generator")!;
const pageUrl = buildUrl("/lorem-ipsum-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: tool.title,
    description: tool.description,
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is placeholder text used in design and publishing since the 1500s. It resembles Latin but is intentionally scrambled so it does not distract from the visual layout. Designers use it to fill space in mockups, prototypes, and templates before real content is ready.",
  },
  {
    question: "Why use Lorem Ipsum instead of real text?",
    answer:
      "Real text draws attention to the content itself rather than the design. Lorem Ipsum lets designers, clients, and developers evaluate layout, typography, and spacing without being distracted by readable words. It also avoids the bias of using draft content that might be mistaken for final copy.",
  },
  {
    question: "Can I generate a specific number of words?",
    answer:
      "Yes. Switch the mode to 'words' and set the exact number you need. The generator supports up to 500 words in a single generation. You can also generate by paragraphs (up to 20) or sentences (up to 50).",
  },
  {
    question: "Is this real Latin?",
    answer:
      "No. Lorem Ipsum is derived from a passage by Cicero written in 45 BC, but the text has been altered and scrambled over centuries. The words resemble Latin but many are not actual Latin words. The purpose is visual similarity, not linguistic accuracy.",
  },
  {
    question: "Does the classic opening always start the same way?",
    answer:
      "When the 'Start with classic Lorem ipsum' option is enabled, the text always begins with 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' This is the traditional opening used since the 1960s. You can disable this option for fully randomized text.",
  },
  {
    question: "Can I use this generated text commercially?",
    answer:
      "Yes. Lorem Ipsum is in the public domain and has no copyright restrictions. You can use the generated placeholder text in any project, commercial or personal, without attribution.",
  },
  {
    question: "How many words are in a typical paragraph?",
    answer:
      "Each generated paragraph contains 4-8 sentences with 6-16 words per sentence, resulting in roughly 40-100 words per paragraph. This mirrors the length of a natural English paragraph for realistic layout testing.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes. The generator is completely free with no signup, no limits, and no ads. It runs entirely in your browser and your generated text is never sent to a server.",
  },
];

export default function LoremIpsumPage() {
  return (
    <>
      <WebAppSchema
        name="Free Lorem Ipsum Generator"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Lorem Ipsum Generator", href: "/lorem-ipsum-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Lorem Ipsum Generator
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Generate customizable Lorem Ipsum placeholder text by paragraphs, sentences, or
          words. Perfect for designers, developers, and content creators. Free, no signup,
          works entirely in your browser.
        </p>

        <div className="mt-4">
          <LoremIpsumTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="lorem-ipsum" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Generate Lorem Ipsum Text
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Generate by
              paragraphs, sentences, or exact word count. Paragraphs are best for filling page
              layouts. Sentences work for headlines and short blocks. Word count gives you
              precise control.
            </p>
            <p>
              <strong className="text-neutral-200">2. Set the amount.</strong> Use the slider
              or type a number. Generate up to 20 paragraphs, 50 sentences, or 500 words at a
              time.
            </p>
            <p>
              <strong className="text-neutral-200">3. Click Regenerate</strong> to get a new
              random variation. Each generation produces different text while maintaining the
              Lorem Ipsum style.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy with one click.</strong> The
              generated text is ready to paste into Figma, Sketch, Adobe XD, HTML, WordPress,
              or any other tool.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use Lorem Ipsum
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Web design mockups:</strong> Fill page
              layouts in Figma, Sketch, or Adobe XD to show clients how the final site will
              look before copywriting begins.
            </p>
            <p>
              <strong className="text-neutral-200">Frontend development:</strong> Populate
              components, cards, and templates with realistic-length text while building the UI.
              Test how layouts handle different content lengths.
            </p>
            <p>
              <strong className="text-neutral-200">Print design:</strong> Fill brochures,
              magazines, and book layouts with placeholder text to evaluate typography,
              margins, and column widths.
            </p>
            <p>
              <strong className="text-neutral-200">WordPress and CMS themes:</strong> Add
              placeholder content to theme demos and previews so buyers can visualize the
              layout before purchasing.
            </p>
            <p>
              <strong className="text-neutral-200">Presentations:</strong> Fill slide layouts
              with placeholder text to demonstrate templates and visual designs.
            </p>
            <p>
              <strong className="text-neutral-200">Email templates:</strong> Test responsive
              email layouts with different content lengths to ensure they render correctly
              across email clients.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The History of Lorem Ipsum
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              Lorem Ipsum has been the standard placeholder text since the 1500s when an
              unknown printer scrambled a passage from Cicero's "De Finibus Bonorum et
              Malorum" (On the Ends of Good and Evil), written in 45 BC.
            </p>
            <p>
              The text became widely used in the typesetting industry and survived the
              transition to electronic typesetting in the 1960s. Letraset sheets containing
              Lorem Ipsum passages were used by designers worldwide, and it was later
              adopted by desktop publishing software like Aldus PageMaker.
            </p>
            <p>
              Today, Lorem Ipsum remains the industry standard for placeholder text. Its
              Latin-like appearance provides a natural distribution of letters and word
              lengths that closely resembles English text, making it ideal for evaluating
              visual design.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="lorem-ipsum" />

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

        <AdSlot slot="before-footer" page="lorem-ipsum" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Generate placeholder text here, then use our other tools to convert case, count
            words, or clean up formatting. All tools are free and run in your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Word Counter
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
