import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { SpongeBobCaseConverterTool } from "@/components/tools/spongebob-case-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("spongebob-case-converter")!;
const pageUrl = buildUrl("/spongebob-case-converter");

export const metadata: Metadata = {
  title: "SpongeBob Case Generator — Free sPoNgEbOb Mocking Text Converter for Memes",
  description: "Generate SpongeBob mocking text for sarcastic posts, ironic comments, and viral memes. Convert any text to sPoNgEbOb case instantly. Perfect for social media banter and attention-grabbing content.",
  alternates: { canonical: pageUrl },
  keywords: [
    "spongebob case converter", "spongebob case generator", "mocking spongebob text maker",
    "sPoNgEbOb cAsE", "spongebob meme text generator", "meme text converter online",
    "alternating case meme creator", "mock text generator free", "ironic text converter tool",
    "spongebob mocking text maker", "online meme maker text", "text formatter for memes free",
    "social media meme text generator", "funny text converter online", "attention grabbing text creator",
    "viral text generator free", "meme caption maker online", "spongebob sarcasm text converter",
    "text case for jokes generator", "online text meme converter free", "free spongebob case tool",
    "mocking spongebob meme generator", "spongebob squarepants text", "sarcastic text converter",
  ],
  openGraph: {
    title: "SpongeBob Case Generator — Free sPoNgEbOb Mocking Text Converter",
    description: "Create SpongeBob mocking text for memes and social media instantly. No signup required.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is SpongeBob case?",
    answer:
      "SpongeBob case (also called mocking SpongeBob or sPoNgEbOb case) is a text style that alternates between uppercase and lowercase letters in a seemingly random pattern. It originated from the 'Mocking SpongeBob' meme and is used to convey sarcasm, irony, or mockery in online communication.",
  },
  {
    question: "How is SpongeBob case different from toggle case?",
    answer:
      "SpongeBob case appears random but follows a deterministic pattern (same input produces same output). Toggle case follows a strict alternating pattern starting with lowercase. SpongeBob case has a more chaotic, meme-like appearance while toggle case looks more structured.",
  },
  {
    question: "When should I use SpongeBob case?",
    answer:
      "Use SpongeBob case for memes, ironic social media posts, sarcastic comments, joke captions, and online banter. It's perfect for conveying mockery, sarcasm, or playful teasing. Avoid using it in formal communication or serious contexts.",
  },
  {
    question: "Does SpongeBob case work with emojis and special characters?",
    answer:
      "Yes. The tool handles Unicode characters, emojis, and special symbols. Non-letter characters (spaces, punctuation, numbers, emojis) remain unchanged and don't affect the alternating pattern. Only letters (a-z, A-Z) are converted to SpongeBob case.",
  },
  {
    question: "Can I use SpongeBob case on all social media platforms?",
    answer:
      "Yes. SpongeBob case works on Instagram, Twitter, TikTok, Facebook, Discord, Reddit, and most platforms that support Unicode text. Some platforms may have character limits, so check your converted text fits within those limits.",
  },
  {
    question: "Is SpongeBob case the same every time?",
    answer:
      "Yes. Our SpongeBob case converter uses a deterministic algorithm, so the same input text will always produce the same SpongeBob case output. This is different from true random case which changes each time.",
  },
  {
    question: "What's the origin of the SpongeBob case meme?",
    answer:
      "The 'Mocking SpongeBob' meme originated from a 2017 episode of SpongeBob SquarePants. The meme format features SpongeBob with a distorted face, and text in alternating case is used to mock or sarcastically repeat something. It became a popular way to convey sarcasm online.",
  },
  {
    question: "Can I convert long paragraphs to SpongeBob case?",
    answer:
      "Yes, but SpongeBob case works best with short phrases (like meme captions). Long paragraphs in SpongeBob case become difficult to read and lose the meme effect. For best results, use SpongeBob case on punchlines, captions, or short sarcastic remarks.",
  },
];

export default function SpongeBobCaseConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free SpongeBob Case Converter"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "SpongeBob Case Converter", href: "/spongebob-case-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          SpongeBob Case Generator — Create Mocking sPoNgEbOb Text
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Generate authentic SpongeBob mocking text (sPoNgEbOb CaSe) for sarcastic posts, ironic comments, and viral memes.
          Our free converter creates that distinctive random-looking alternating case from the classic meme. No signup,
          works instantly. Also try our <Link href="/toggle-case-converter" className="text-blue-400 hover:text-blue-300">toggle case converter</Link> for more text styles.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <SpongeBobCaseConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="spongebob-case-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The Mocking SpongeBob Meme: A Brief History
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              The "Mocking SpongeBob" meme originated from a 2017 episode of <em>SpongeBob SquarePants</em> titled
              "Little Yellow Book." In the scene, SpongeBob mockingly repeats something Patrick says while making
              an exaggerated facial expression.
            </p>
            <p>
              The meme format exploded online when paired with alternating case text (sPoNgEbOb cAsE) to convey
              sarcastic repetition or mockery. The distinctive text style became inseparable from the meme itself,
              creating a visual shorthand for irony across social media platforms.
            </p>
            <p>
              Today, SpongeBob case text works even without the accompanying image—the alternating capitalization
              alone signals playful mockery to internet-savvy audiences. It's become a staple of online communication,
              especially among millennials and Gen Z who grew up with the show.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Create SpongeBob Case Text
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste or type your text</strong> into the input box.
              Use the example buttons for classic SpongeBob meme phrases or try your own sarcastic remarks.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose SpongeBob case mode.</strong> The tool automatically
              converts text to the signature sPoNgEbOb alternating pattern. You can also try toggle case or
              random case for variation.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy and use your meme text.</strong> The output updates
              instantly. Use the copy button or swap button to move converted text back to input. Try the
              uppercase/lowercase buttons for additional formatting options.
            </p>
            <p>
              <strong className="text-neutral-200">4. Share your meme.</strong> Paste the SpongeBob case text
              into social media posts, comments, captions, or messages. Add the Mocking SpongeBob image for
              maximum meme impact.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use SpongeBob Case
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Memes and viral content:</strong> Create Mocking SpongeBob
              memes, sarcastic image captions, or ironic social media posts. SpongeBob case instantly signals
              mockery or sarcasm to online audiences familiar with the meme.
            </p>
            <p>
              <strong className="text-neutral-200">Social media comments:</strong> Use SpongeBob case to
              playfully mock friends, respond to ridiculous takes, or add sarcastic humor to discussions.
              Perfect for Twitter threads, Instagram comments, and Reddit replies.
            </p>
            <p>
              <strong className="text-neutral-200">Gaming and streaming:</strong> Streamers and gamers use
              SpongeBob case for funny in-game names, ironic chat messages, or mocking opponent trash talk.
              Works in most game chats and streaming platforms.
            </p>
            <p>
              <strong className="text-neutral-200">Messaging and group chats:</strong> Add humor to WhatsApp,
              Discord, Telegram, or SMS conversations. SpongeBob case conveys tone that might be missed in
              plain text, helping avoid misunderstandings in digital communication.
            </p>
            <p>
              <strong className="text-neutral-200">Content creation:</strong> YouTubers, TikTok creators, and
              influencers use SpongeBob case for engaging captions, video titles, or community interactions.
              The meme format increases engagement and shareability.
            </p>
            <p>
              <strong className="text-neutral-200">Creative writing and humor:</strong> Writers and comedians
              use SpongeBob case for satirical pieces, humorous dialogue, or character voices in digital
              stories. The distinctive text style adds personality to written content.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="spongebob-case-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            SpongeBob Case Examples
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                original: "how original",
                spongebob: "hOw OrIgInAl",
                description: "Classic Mocking SpongeBob phrase",
              },
              {
                original: "what an amazing idea",
                spongebob: "wHaT aN aMaZiNg IdEa",
                description: "Sarcastic praise in SpongeBob case",
              },
              {
                original: "nobody has ever done that before",
                spongebob: "nObOdY hAs EvEr DoNe ThAt BeFoRe",
                description: "Mocking exaggeration",
              },
              {
                original: "wow so creative",
                spongebob: "wOw So CrEaTiVe",
                description: "Ironic compliment",
              },
              {
                original: "you must be so proud",
                spongebob: "yOu MuSt Be So PrOuD",
                description: "Sarcastic congratulations",
              },
              {
                original: "truly groundbreaking",
                spongebob: "tRuLy GrOuNdBrEaKiNg",
                description: "Mocking innovation",
              },
            ].map((example, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-xs text-neutral-400 mb-1">Original:</div>
                <div className="font-mono text-sm mb-2">{example.original}</div>
                <div className="text-xs text-neutral-400 mb-1">SpongeBob Case:</div>
                <div className="font-mono text-sm font-semibold">{example.spongebob}</div>
                <p className="mt-2 text-xs text-neutral-400">{example.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Tips for Using SpongeBob Case Effectively
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Know the meme:</strong> SpongeBob case references a specific
              meme format. Use it when you want to convey sarcasm, mockery, or ironic praise. It may confuse
              people unfamiliar with internet meme culture.
            </p>
            <p>
              <strong className="text-neutral-200">Keep it short:</strong> SpongeBob case works best with
              short phrases (2-5 words). Long sentences lose impact and become hard to read. Use it for
              punchlines, captions, or quick retorts rather than lengthy explanations.
            </p>
            <p>
              <strong className="text-neutral-200">Consider your audience:</strong> SpongeBob case has a very
              specific tone (sarcastic/mocking). It's perfect for informal online communication but
              inappropriate for professional, academic, or serious contexts.
            </p>
            <p>
              <strong className="text-neutral-200">Pair with the image:</strong> For maximum meme impact,
              combine SpongeBob case text with the Mocking SpongeBob image. The visual reinforces the sarcastic
              tone and makes your meme more recognizable.
            </p>
            <p>
              <strong className="text-neutral-200">Use sparingly:</strong> Like any meme format, SpongeBob case
              loses impact if overused. Reserve it for moments when sarcasm or mockery is genuinely called for,
              rather than using it as your default text style.
            </p>
            <p>
              <strong className="text-neutral-200">Understand the response:</strong> When you use SpongeBob
              case, expect similar sarcastic responses. It often kicks off playful banter rather than serious
              discussion. Make sure you're ready for that type of interaction.
            </p>
          </div>
        </section>

        <AdSlot slot="before-footer" page="spongebob-case-converter" />

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
            FlipMyCase offers a suite of free browser-based text tools. Create SpongeBob case text here, then use
            other tools for additional transformations.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
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
              🔀 Toggle Case
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ↔️ Text Reverser
            </Link>
            <Link
              href="/text-sorter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Text Sorter
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}