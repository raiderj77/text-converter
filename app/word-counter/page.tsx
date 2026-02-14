import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { WordCounterTool } from "@/components/tools/word-counter";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("word-counter")!;
const pageUrl = buildUrl("/word-counter");

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
    question: "How does this word counter work?",
    answer:
      "Paste or type your text into the input box. The tool instantly counts words, characters (with and without spaces), sentences, paragraphs, and lines. It also calculates reading time, speaking time, average word length, and keyword density. All processing happens in your browser — nothing is sent to a server.",
  },
  {
    question: "Is the character count accurate for social media posts?",
    answer:
      "Yes. The character count includes all characters including spaces, punctuation, and special characters. The social media limits section shows exactly how close you are to the limit for Twitter/X (280), Instagram captions (2,200), LinkedIn posts (3,000), and more.",
  },
  {
    question: "How is reading time calculated?",
    answer:
      "Reading time is calculated at 238 words per minute, which is the average adult reading speed for non-fiction text. The result is rounded up to the nearest minute. For a 500-word article, the estimated reading time would be approximately 3 minutes.",
  },
  {
    question: "How is speaking time calculated?",
    answer:
      "Speaking time is calculated at 150 words per minute, which is the average speaking rate for presentations and speeches. A 1,500-word speech would take approximately 10 minutes to deliver.",
  },
  {
    question: "What are stop words and why are they excluded from keywords?",
    answer:
      "Stop words are common words like 'the', 'and', 'is', 'in', 'to', etc. that appear in almost every text. Excluding them from keyword analysis shows you the meaningful words that make your content unique. You can toggle stop words on or off in the keyword section.",
  },
  {
    question: "Can I use this to check my SEO meta description length?",
    answer:
      "Yes. The social media limits section includes a 'Meta Description (SEO)' counter set to 160 characters, which is the recommended maximum for search engine meta descriptions. Google typically displays up to 155-160 characters in search results.",
  },
  {
    question: "Does this word counter work on mobile?",
    answer:
      "Yes. The tool is fully responsive and works on any phone, tablet, or desktop with a modern browser. Paste text from any app and get instant counts.",
  },
  {
    question: "What counts as a sentence?",
    answer:
      "A sentence is counted when text ends with a period (.), exclamation mark (!), or question mark (?). Abbreviations like 'U.S.' may count as extra sentences. For most standard text, the sentence count is accurate.",
  },
];

export default function WordCounterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Word Counter"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Word Counter", href: "/word-counter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Word Counter
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Count words, characters, sentences, and paragraphs instantly. See reading time,
          speaking time, social media limits, and keyword density. Free, no signup, works
          entirely in your browser.
        </p>

        <div className="mt-4">
          <WordCounterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="word-counter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Count Words Online
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Paste or type your text</strong> into
              the input box above. The tool accepts any length of text including entire
              articles, essays, and manuscripts.
            </p>
            <p>
              <strong className="text-neutral-200">2. See all counts instantly.</strong> Words,
              characters, characters without spaces, sentences, paragraphs, and lines update
              in real-time as you type. Reading time and speaking time are calculated
              automatically.
            </p>
            <p>
              <strong className="text-neutral-200">3. Check social media limits.</strong> The
              progress bars show exactly how close your text is to the character limit for
              Twitter/X, Instagram, LinkedIn, YouTube, TikTok, Pinterest, and SEO meta
              descriptions.
            </p>
            <p>
              <strong className="text-neutral-200">4. Analyze keywords.</strong> The top
              keywords section shows your most-used words with frequency counts and keyword
              density percentages. Toggle stop words on or off to focus on meaningful content
              words.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            What This Word Counter Measures
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Word Count",
                desc: "Total number of words separated by spaces. Hyphenated words like 'well-known' count as one word.",
              },
              {
                title: "Character Count",
                desc: "Total characters including spaces, punctuation, and special characters. Essential for social media limits and SEO.",
              },
              {
                title: "Characters Without Spaces",
                desc: "Character count excluding all whitespace. Useful for translation pricing (many languages charge per character).",
              },
              {
                title: "Sentence Count",
                desc: "Number of sentences, counted by periods, exclamation marks, and question marks followed by a space or end of text.",
              },
              {
                title: "Paragraph Count",
                desc: "Paragraphs separated by blank lines. A standard paragraph contains 3-5 sentences.",
              },
              {
                title: "Reading Time",
                desc: "Estimated at 238 words per minute (average adult non-fiction reading speed). A 1,000-word article takes about 5 minutes.",
              },
              {
                title: "Speaking Time",
                desc: "Estimated at 150 words per minute (average presentation speed). A 10-minute speech needs approximately 1,500 words.",
              },
              {
                title: "Keyword Density",
                desc: "Percentage each keyword appears relative to total words. SEO best practice suggests keeping primary keyword density between 1-3%.",
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

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Word Counter
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Academic writing:</strong> Essays,
              research papers, and dissertations often have strict word count requirements.
              Paste your draft to check if you meet the minimum or need to trim.
            </p>
            <p>
              <strong className="text-neutral-200">Blog posts and SEO content:</strong> Most
              SEO guides recommend 1,500-2,500 words for in-depth articles. Check your word
              count and keyword density to optimize for search engines.
            </p>
            <p>
              <strong className="text-neutral-200">Social media:</strong> Each platform has
              different character limits. Check your post against Twitter/X (280), LinkedIn
              (3,000), or Instagram caption (2,200) limits before posting.
            </p>
            <p>
              <strong className="text-neutral-200">Freelance writing:</strong> Many clients
              pay per word. Use the word counter to track your output and invoice accurately.
              The character count is useful for translation projects billed by character.
            </p>
            <p>
              <strong className="text-neutral-200">Presentations and speeches:</strong> A
              5-minute presentation needs roughly 750 words. A 20-minute keynote needs about
              3,000 words. Use the speaking time estimate to calibrate your content.
            </p>
            <p>
              <strong className="text-neutral-200">Email and cover letters:</strong> Keep
              cover letters under 400 words and cold emails under 150 words. The word counter
              helps you stay concise.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="word-counter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Common Word Count References
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Twitter/X post:</strong> 280 characters
              maximum. Shorter tweets (under 100 characters) tend to get more engagement.
            </p>
            <p>
              <strong className="text-neutral-200">Blog post (short):</strong> 300-600 words.
              Good for news updates, announcements, and quick tips.
            </p>
            <p>
              <strong className="text-neutral-200">Blog post (standard):</strong> 1,000-1,500
              words. Suitable for tutorials, how-to guides, and opinion pieces.
            </p>
            <p>
              <strong className="text-neutral-200">Long-form content:</strong> 2,000-3,000+
              words. Best for comprehensive guides, research, and pillar content. Tends to
              rank higher in search results.
            </p>
            <p>
              <strong className="text-neutral-200">College essay:</strong> 250-650 words
              (Common App). Graduate school essays typically range from 500-1,000 words.
            </p>
            <p>
              <strong className="text-neutral-200">Novel:</strong> 70,000-100,000 words for
              most genres. Young adult novels average 50,000-80,000 words.
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

        <AdSlot slot="before-footer" page="word-counter" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            FlipMyCase offers a suite of free browser-based text tools. Count words here,
            then convert text case with our case converter.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/blog"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📖 Text Guides
            </Link>
            <Link
              href="/learn"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📚 Learn Formats
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
