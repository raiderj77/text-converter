import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ToggleCaseConverterTool } from "@/components/tools/toggle-case-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("toggle-case-converter")!;
const pageUrl = buildUrl("/toggle-case-converter");

export const metadata: Metadata = {
  title: "Toggle Case Converter: Alternating Caps & SpongeBob Text Generator",
  description: "Free toggle case converter for alternating uppercase/lowercase text. Create SpongeBob meme text, mocking text, and alternating caps instantly. No signup required.",
  alternates: { canonical: pageUrl },
  keywords: [
    "toggle case converter", "alternating caps converter", "sPoNgEbOb text generator", "mocking sponge bob text",
    "alternating uppercase lowercase", "toggle case generator", "alternating case converter online",
    "spongebob meme text maker", "mock text generator", "alternating text converter free",
    "toggle case online tool", "alternating caps maker", "spongebob case converter",
    "alternating letter case tool", "toggle text case free", "alternating case generator",
    "fun text converter online", "meme text generator tool", "alternating caps online converter",
  ],
  openGraph: {
    title: "Toggle Case Converter: Alternating Caps & SpongeBob Text Generator",
    description: "Free toggle case converter for alternating uppercase/lowercase text. Create SpongeBob meme text, mocking text, and alternating caps instantly.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is toggle case?",
    answer:
      "Toggle case (also called alternating case) is a text style where letters alternate between uppercase and lowercase, like 'hElLo wOrLd'. It's commonly associated with the mocking SpongeBob meme (sPoNgEbOb text).",
  },
  {
    question: "How does the toggle case converter work?",
    answer:
      "Paste your text and the tool automatically converts it to alternating uppercase and lowercase letters. You can choose whether to start with uppercase or lowercase, and whether the alternating pattern should continue through spaces or reset for each word.",
  },
  {
    question: "What's the difference between toggle case and inverse case?",
    answer:
      "Toggle case alternates between uppercase and lowercase letters in sequence. Inverse case (or swap case) flips each letter's case individually — uppercase becomes lowercase and lowercase becomes uppercase, without following a pattern.",
  },
  {
    question: "Why would anyone use toggle case?",
    answer:
      "Toggle case is mostly used for fun, memes, and social media. The mocking SpongeBob meme popularized it for sarcastic or mocking text. Developers sometimes use it for placeholder text in UI mockups to make it visually distinct from real content.",
  },
  {
    question: "Can I control whether it starts with uppercase or lowercase?",
    answer:
      "Yes. Use the 'Start with uppercase' option to begin the sequence with an uppercase letter. By default, it starts with lowercase to match the classic sPoNgEbOb style.",
  },
  {
    question: "What does 'Continue sequence through spaces' mean?",
    answer:
      "When enabled, the alternating pattern continues across spaces (e.g., 'hElLo wOrLd'). When disabled, each word starts fresh with the starting case (e.g., 'hElLo WoRlD' if starting with lowercase).",
  },
  {
    question: "Is there a character limit?",
    answer:
      "No. The tool processes text entirely in your browser, so it can handle thousands of characters. Very long texts may be slow depending on your device, but there's no hard limit.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All processing happens in your browser using JavaScript. Your text never leaves your device.",
  },
];

export default function ToggleCaseConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Toggle Case Converter"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Toggle Case Converter", href: "/toggle-case-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Toggle Case Converter: Alternating Caps & SpongeBob Text Generator
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Convert text to toggle case (alternating caps) instantly. Generate sPoNgEbOb text,
          create mocking SpongeBob meme text, and produce alternating uppercase/lowercase letters.
          Free tool, no signup required, works entirely in your browser.
          Try our <Link href="/spongebob-case-converter" className="text-blue-400 hover:text-blue-300">SpongeBob case converter</Link> for meme-style text too.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <ToggleCaseConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="toggle-case-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What Is Toggle Case (Alternating Caps)?
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Toggle case</strong>, also known as{" "}
              <strong>alternating caps</strong> or <strong>sPoNgEbOb case</strong>, is a text
              style where letters alternate between uppercase and lowercase. The classic
              example is &quot;hElLo wOrLd&quot; — starting with lowercase, then uppercase, then
              lowercase, and so on.
            </p>
            <p>
              This style gained popularity through the{" "}
              <strong>mocking SpongeBob meme</strong> (also called &quot;Mocking SpongeBob&quot; or
              &quot;sarcastic SpongeBob&quot;), where text is written in alternating caps to convey
              sarcasm, mockery, or playful teasing. The meme typically uses the lowercase
              start pattern to match how the SpongeBob character appears in the meme.
            </p>
            <p>
              While primarily used for memes and social media, toggle case can also be
              useful for designers and developers who need visually distinct placeholder
              text in UI mockups, or for creating unique text effects in digital art.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Toggle Case Converter
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste your text</strong> into the input
              box above. You can type directly or paste from any source — emails, documents,
              social media, or code.
            </p>
            <p>
              <strong className="text-neutral-200">2. Configure options.</strong> Choose
              whether to start with uppercase or lowercase, and whether the alternating
              pattern should continue through spaces. The defaults produce classic
              sPoNgEbOb-style text.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy the converted text</strong> with
              one click. Use the &quot;Copy&quot; button below each output format, or click &quot;Apply to
              Input&quot; to replace your original text with the toggle case version for further
              editing.
            </p>
            <p>
              <strong className="text-neutral-200">4. Try the examples</strong> in the Quick
              Examples section to see different toggle case variations instantly.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Toggle Case vs Other Case Styles
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Toggle Case",
                example: "hElLo wOrLd",
                desc: "Alternates between uppercase and lowercase letters in sequence. Used for memes and visual distinction.",
              },
              {
                title: "Inverse Case",
                example: "hELLO wORLD",
                desc: "Swaps each letter's case individually — uppercase becomes lowercase and vice versa.",
              },
              {
                title: "Title Case",
                example: "Hello World",
                desc: "First letter of each major word capitalized. Used for headings and titles.",
              },
              {
                title: "sPoNgEbOb Case",
                example: "sPoNgEbOb mEmE",
                desc: "Toggle case starting with lowercase, popularized by the mocking SpongeBob meme.",
              },
              {
                title: "UPPERCASE",
                example: "HELLO WORLD",
                desc: "All letters capitalized. Used for emphasis, acronyms, and shouting in text.",
              },
              {
                title: "lowercase",
                example: "hello world",
                desc: "All letters in lowercase. Standard for most body text and casual writing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="mt-1 font-mono text-sm">{item.example}</div>
                <p className="mt-2 text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="mid-content" page="toggle-case-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Creative Uses for Toggle Case Text
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Social media memes:</strong> Create
              mocking SpongeBob-style text for Twitter, Instagram, or TikTok. The alternating
              caps visually convey sarcasm or playful teasing in comments and posts.
            </p>
            <p>
              <strong className="text-neutral-200">UI/UX design mockups:</strong> Use toggle
              case as placeholder text in wireframes and prototypes. The distinct appearance
              helps stakeholders recognize it as sample content rather than final copy.
            </p>
            <p>
              <strong className="text-neutral-200">Digital art and graphics:</strong>
              Incorporate alternating caps into logos, banners, or digital artwork for a
              unique typographic effect. The irregular pattern can add visual interest.
            </p>
            <p>
              <strong className="text-neutral-200">Code documentation:</strong> Highlight
              example text or placeholder values in documentation with toggle case to make
              them stand out from explanatory prose.
            </p>
            <p>
              <strong className="text-neutral-200">Educational materials:</strong> Create
              spelling or grammar exercises where students need to correct toggle case text
              back to standard capitalization.
            </p>
            <p>
              <strong className="text-neutral-200">Password generation:</strong> While not
              recommended for serious security, toggle case can create memorable yet
              complex-looking text for low-stakes passwords or temporary codes.
            </p>
          </div>
        </section>

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

        <AdSlot slot="before-footer" page="toggle-case-converter" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Convert to toggle case here, then use our other tools for different case styles,
            text cleaning, or word counting.
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
              href="/snake-kebab-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🐍 Snake vs Kebab
            </Link>
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Text Sorter
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ↔️ Text Reverser
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Word Counter
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
