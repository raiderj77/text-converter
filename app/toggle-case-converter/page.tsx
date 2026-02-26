import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ToggleCaseConverterTool } from "@/components/tools/toggle-case-converter";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("toggle-case-converter")!;
const pageUrl = buildUrl("/toggle-case-converter");

export const metadata: Metadata = {
  title: "Toggle Case Converter Online — Free tOgGlE cAsE Text Generator for Memes & Social Media",
  description: "Create attention-grabbing toggle case text for memes, social media, and creative projects. Convert text to alternating lowercase/uppercase instantly. No signup required.",
  alternates: { canonical: pageUrl },
  keywords: [
    "toggle case converter", "toggle case generator", "alternating case converter",
    "tOgGlE cAsE", "text toggle case", "toggle text online free",
    "alternating uppercase lowercase", "meme text generator online",
    "social media text formatter", "funny text converter tool",
    "text case alternator", "online toggle case converter",
    "free toggle case tool", "text formatting generator",
    "creative text case maker", "attention grabbing text creator",
    "text case changer online", "toggle case for memes generator",
    "toggle case for social media posts", "viral text formatter",
    "alternating text case converter", "text style generator",
  ],
  openGraph: {
    title: "Toggle Case Converter Online — Free tOgGlE cAsE Text Generator",
    description: "Generate toggle case text for memes, social media, and creative projects instantly. No signup required.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "What is toggle case?",
    answer:
      "Toggle case (also called alternating case) converts text to alternate between lowercase and uppercase letters, starting with lowercase. For example: 'hello world' becomes 'hElLo wOrLd'. It's often used for memes, social media posts, and creative text formatting.",
  },
  {
    question: "How is toggle case different from alternating case?",
    answer:
      "Toggle case specifically starts with lowercase and alternates each letter (tOgGlE). Some alternating case tools might start with uppercase or follow different patterns. Our toggle case converter consistently applies the lowercase-first alternating pattern for predictable results.",
  },
  {
    question: "What is toggle case used for?",
    answer:
      "Toggle case is popular for memes, ironic social media posts, attention-grabbing text, creative writing, and online gaming usernames. It adds visual interest and can make text stand out in feeds and comments. Some people use it for coding variable names in creative projects.",
  },
  {
    question: "Does toggle case work with special characters and emojis?",
    answer:
      "Yes. The tool handles Unicode characters, emojis, and special symbols. Non-letter characters (spaces, punctuation, numbers, emojis) remain unchanged and don't affect the alternating pattern. Only letters (a-z, A-Z) are toggled between uppercase and lowercase.",
  },
  {
    question: "Can I convert large amounts of text to toggle case?",
    answer:
      "Yes, but very large documents (10,000+ characters) may slow down slightly as processing happens in your browser. For best performance with large texts, process in sections. The tool works entirely in memory with no server upload.",
  },
  {
    question: "How do I use toggle case for social media?",
    answer:
      "Paste your caption, bio, or comment into the tool, convert to toggle case, then copy and paste into your social media platform. Toggle case works on Instagram, Twitter, TikTok, Facebook, Discord, and most platforms that support Unicode text.",
  },
  {
    question: "Is there a keyboard shortcut for toggle case?",
    answer:
      "No standard keyboard shortcut exists for toggle case in most applications. That's why this online tool is useful—you can quickly convert text without memorizing complex keyboard combinations or installing special software.",
  },
  {
    question: "Can I use toggle case in programming?",
    answer:
      "While not standard, some developers use toggle case for creative variable names in personal projects, game development, or experimental code. However, most style guides recommend camelCase or snake_case for production code readability.",
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
          Toggle Case Converter — Create tOgGlE cAsE Text Instantly
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Generate attention-grabbing toggle case text perfect for memes, social media posts, and creative projects.
          Our free converter alternates lowercase and uppercase letters starting with lowercase. No signup, works right in your browser.
          Try our <Link href="/spongebob-case-converter" className="text-blue-400 hover:text-blue-300">SpongeBob case converter</Link> for meme-style text too.
        </p>

        <div className="mt-4">
          <ToggleCaseConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="toggle-case-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Create Toggle Case Text in Seconds
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste or type your text</strong> into the input box above.
              Try famous quotes, meme phrases, or your own social media captions to see the transformation instantly.
              The example buttons give you a head start with popular toggle case templates.
            </p>
            <p>
              <strong className="text-neutral-200">2. Watch the magic happen.</strong> Select toggle case mode for
              the classic lowercase-first alternating pattern (tOgGlE). Your text converts in real-time as you type—
              no submit button needed. Experiment with different phrases to find the perfect rhythm.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy and paste your transformed text.</strong> The output updates
              instantly. Use the copy button for quick sharing, or swap text between boxes to try different variations.
              Explore our other case options like <Link href="/spongebob-case-converter" className="text-blue-400 hover:text-blue-300">SpongeBob case</Link> or <Link href="/" className="text-blue-400 hover:text-blue-300">alternating case</Link> for more creative possibilities.
            </p>
            <p>
              <strong className="text-neutral-200">4. Share across platforms.</strong> Toggle case works everywhere—
              Instagram, Twitter, TikTok, Facebook, Discord, and all major messaging apps. Save your favorite toggle
              case phrases for quick reuse in memes, comments, and online banter.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Perfect Uses for Toggle Case Text
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Social media and meme culture:</strong> Craft attention-grabbing
              captions, ironic comments, or viral meme text. Toggle case adds visual punch that cuts through
              crowded feeds on Twitter, Instagram, TikTok, and Discord. It signals playful, informal communication.
            </p>
            <p>
              <strong className="text-neutral-200">Gaming identities and usernames:</strong> Generate distinctive
              gamer tags, character names, or clan tags that stand out. Many gaming platforms fully support toggle
              case in usernames, giving your profile instant recognizability in leaderboards and chat.
            </p>
            <p>
              <strong className="text-neutral-200">Creative writing and digital art:</strong> Employ toggle case for
              stylistic effects in poetry, experimental fiction, or multimedia projects. The alternating pattern
              visually represents duality, technological themes, or cognitive dissonance in artistic works.
            </p>
            <p>
              <strong className="text-neutral-200">Youth-focused marketing:</strong> Create eye-catching headlines,
              call-to-action buttons, or promotional copy that resonates with younger demographics. Toggle case
              injects energy and modernity into otherwise conventional text.
            </p>
            <p>
              <strong className="text-neutral-200">Educational engagement:</strong> Highlight key terminology,
              create memorable slide titles, or make learning materials more visually dynamic. The alternating
              pattern aids information retention by breaking visual monotony.
            </p>
            <p>
              <strong className="text-neutral-200">Creative coding and prototyping:</strong> While not for production
              code, toggle case works wonderfully for creative variable names in personal projects, game jams, or
              experimental programming. Developers often use it for placeholder text, example code, or conceptual projects.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="toggle-case-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Toggle Case Examples
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                original: "hello world",
                toggle: "hElLo wOrLd",
                description: "Basic phrase showing the alternating pattern",
              },
              {
                original: "toggle case is fun",
                toggle: "tOgGlE cAsE iS fUn",
                description: "Demonstrates how spaces don't break the pattern",
              },
              {
                original: "MEME TEXT GENERATOR",
                toggle: "mEmE tExT gEnErAtOr",
                description: "All caps input becomes properly alternating",
              },
              {
                original: "Social Media 2024",
                toggle: "sOcIaL mEdIa 2024",
                description: "Numbers remain unchanged in the output",
              },
              {
                original: "What's up?",
                toggle: "wHaT's uP?",
                description: "Punctuation and apostrophes are preserved",
              },
              {
                original: "Programming is awesome!",
                toggle: "pRoGrAmMiNg iS aWeSoMe!",
                description: "Longer sentence with exclamation mark",
              },
            ].map((example, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-xs text-neutral-400 mb-1">Original:</div>
                <div className="font-mono text-sm mb-2">{example.original}</div>
                <div className="text-xs text-neutral-400 mb-1">Toggle Case:</div>
                <div className="font-mono text-sm font-semibold">{example.toggle}</div>
                <p className="mt-2 text-xs text-neutral-400">{example.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Tips for Using Toggle Case Effectively
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Keep it short:</strong> Toggle case works best with short phrases
              (3-7 words). Long paragraphs in toggle case become difficult to read and lose their impact. Use toggle
              case for headlines, captions, or key phrases rather than entire articles.
            </p>
            <p>
              <strong className="text-neutral-200">Consider your audience:</strong> Toggle case has a casual, playful
              tone. It's perfect for social media, memes, and informal communication but may not be appropriate for
              formal documents, professional emails, or academic writing.
            </p>
            <p>
              <strong className="text-neutral-200">Combine with other styles:</strong> Mix toggle case with other
              text effects like bold, italics, or emojis for maximum impact. For example: "<strong>tOgGlE cAsE</strong> + 🔥 = viral potential".
            </p>
            <p>
              <strong className="text-neutral-200">Test readability:</strong> Before posting, check that your toggle
              case text is still readable. Some letter combinations (like "Il1" or "O0") can be confusing in toggle
              case. Adjust if necessary.
            </p>
            <p>
              <strong className="text-neutral-200">Save templates:</strong> Create and save commonly used toggle case
              phrases (like "tHaNk YoU" or "aMaZiNg") for quick access. Many social media managers keep a list of
              pre-formatted toggle case phrases for consistent branding.
            </p>
            <p>
              <strong className="text-neutral-200">Use sparingly:</strong> Like any text effect, toggle case loses
              impact if overused. Reserve it for special announcements, key points, or when you really want to
              grab attention.
            </p>
          </div>
        </section>

        <AdSlot slot="before-footer" page="toggle-case-converter" />

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
            FlipMyCase offers a suite of free browser-based text tools. Convert to toggle case here, then use other tools
            for additional transformations.
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