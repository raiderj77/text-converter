import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { PigLatinConverterTool } from "@/components/tools/pig-latin-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("pig-latin-converter")!;
const pageUrl = buildUrl("/pig-latin-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "pig latin translator", "pig latin converter", "english to pig latin",
    "pig latin to english", "pig latin generator", "pig latin decoder",
    "pig latin online", "igpay atinlay", "text to pig latin",
    "pig latin tool", "free pig latin translator", "pig latin rules",
    "pig latin converter online", "pig latin text converter",
    "how to speak pig latin",
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
    question: "What are the rules of Pig Latin?",
    answer:
      "Pig Latin has two main rules. For words that start with a consonant or consonant cluster, move the consonant(s) to the end of the word and add 'ay'. For example, 'hello' becomes 'ellohay' and 'string' becomes 'ingstray'. For words that start with a vowel, keep the word as-is and add 'way' to the end. For example, 'apple' becomes 'appleway'.",
  },
  {
    question: "Can this tool convert Pig Latin back to English?",
    answer:
      "Yes. Switch to 'Pig Latin to English' mode and paste your Pig Latin text. The converter uses best-effort reverse translation. Most standard Pig Latin words convert back accurately, but some ambiguous cases (where multiple English words could produce the same Pig Latin) may not be perfect.",
  },
  {
    question: "Does this tool preserve punctuation and capitalization?",
    answer:
      "Yes. Punctuation marks like periods, commas, exclamation points, and question marks stay in their original positions. Capitalization patterns are also preserved, so 'Hello' becomes 'Ellohay' with the capital letter in the same position.",
  },
  {
    question: "What happens with words that start with multiple consonants?",
    answer:
      "The entire consonant cluster moves to the end. For example, 'string' moves 'str' to get 'ingstray', 'three' moves 'thr' to get 'eethray', and 'school' moves 'sch' to get 'oolschay'. The special case 'qu' is treated as a unit, so 'queen' becomes 'eenquay'.",
  },
  {
    question: "Where did Pig Latin come from?",
    answer:
      "Pig Latin has been a popular English language game since at least the late 1800s. References appear in American literature from 1869 onward. It was historically used as a playful secret language among children and has appeared in countless movies, TV shows, and books. Despite the name, it has no connection to Latin or to pigs.",
  },
  {
    question: "Is Pig Latin a real language?",
    answer:
      "No. Pig Latin is a language game or word play, not a real language. It is a systematic transformation of English words following simple rules. It has no grammar, vocabulary, or history of its own beyond the encoding rules applied to English.",
  },
  {
    question: "Can Pig Latin handle numbers and special characters?",
    answer:
      "Numbers and special characters pass through unchanged. Only alphabetic words are transformed. This means email addresses, URLs, and numerical data remain intact in the output.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All conversion happens entirely in your browser using JavaScript. Your text never leaves your device.",
  },
];

export default function PigLatinConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Pig Latin Translator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Pig Latin Converter", href: "/pig-latin-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Pig Latin Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Pig Latin Translator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A Pig Latin translator converts English text to Pig Latin and Pig Latin back to English. Enter your text below to translate to Pig Latin instantly with preserved punctuation and capitalization.
        </p>

        <ToolAnswerBlock slug="pig-latin-converter" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Pig Latin Converter Tool</h2>

          <h2>Pig Latin Converter Features and Options</h2>

          <h2>About the Free Online Pig Latin Converter</h2>

        </div>


        <div className="mt-4">
          <PigLatinConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="pig-latin-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Pig Latin Translator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your direction.</strong> Select
              &quot;English to Pig Latin&quot; to convert normal text, or &quot;Pig Latin to English&quot; to
              reverse-translate Pig Latin back to English.
            </p>
            <p>
              <strong className="text-neutral-200">2. Enter your text.</strong> Type or paste
              any text into the input field. The conversion happens instantly as you type.
            </p>
            <p>
              <strong className="text-neutral-200">3. Review the output.</strong> The converted
              text appears below with punctuation and capitalization preserved. Expand the
              &quot;Pig Latin Rules &amp; Examples&quot; section for a quick reference.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy your result.</strong> Click the Copy
              button to copy the translated text to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The Fascinating History of Pig Latin
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Pig Latin is one of the most enduring language games in English-speaking
              culture. The earliest known reference to a Pig Latin-like language game
              appears in an 1869 article that mentions &quot;hog Latin,&quot; suggesting the concept
              had already been circulating for some time. By the early 20th century, Pig
              Latin was well established as a playground staple among American children.
            </p>
            <p>
              The appeal of Pig Latin lies in its simplicity. The rules are easy enough for
              young children to learn in minutes, yet the resulting text is sufficiently
              scrambled that it sounds like a secret language to the uninitiated. This
              combination of accessibility and apparent secrecy has kept it popular for over
              150 years. Movies, TV shows, and songs have featured Pig Latin prominently,
              from the Three Stooges to modern animated films.
            </p>
            <p>
              Despite its name, Pig Latin has no connection to the Latin language. The
              &quot;Latin&quot; in the name likely references the tradition of using &quot;dog Latin&quot; or
              &quot;hog Latin&quot; as humorous terms for garbled or fake Latin, common in English
              humor since the 16th century. The &quot;Pig&quot; prefix may simply be playful
              embellishment, or it may reference the association of pigs with silliness and
              mischief in English folklore.
            </p>
            <p>
              From a linguistics perspective, Pig Latin is an example of a &quot;ludling&quot; or
              language game. Ludlings exist in many cultures worldwide. French has
              &quot;verlan&quot; (which reverses syllables), Swedish has &quot;allspraket&quot; (which
              inserts &quot;all&quot; after each vowel), and Japanese has &quot;babigo&quot; (which inserts
              &quot;ba-bi-bu-be-bo&quot; after each syllable). These games demonstrate how speakers
              unconsciously understand phonological structure, since you need to identify
              consonants, vowels, and syllable boundaries to play them correctly.
            </p>
            <p>
              In computer science, Pig Latin conversion is a classic programming exercise.
              It teaches string manipulation, conditional logic, and edge case handling.
              The challenge of preserving punctuation and capitalization while transforming
              the core letters makes it more complex than it first appears. This tool
              handles all those edge cases automatically, so you can focus on having fun
              with the language instead of worrying about the implementation details.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="pig-latin-converter" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Pig Latin Converter
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

        <AdSlot slot="before-footer" page="pig-latin-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Translate text to Pig Latin here, then try our other fun text transformation tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/rot13-encoder-decoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔓</div>
              <div className="mt-1 text-sm font-semibold">ROT13 Cipher</div>
              <p className="mt-1 text-xs text-neutral-400">ROT13, ROT5, ROT47 & Caesar ciphers</p>
            </Link>
            <Link
              href="/nato-phonetic-alphabet"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🎖️</div>
              <div className="mt-1 text-sm font-semibold">NATO Phonetic</div>
              <p className="mt-1 text-xs text-neutral-400">Convert text to Alpha, Bravo, Charlie</p>
            </Link>
            <Link
              href="/spongebob-case-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🧽</div>
              <div className="mt-1 text-sm font-semibold">SpongeBob Case</div>
              <p className="mt-1 text-xs text-neutral-400">sPoNgEbOb mocking case text</p>
            </Link>
            <Link
              href="/upside-down-text-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🙃</div>
              <div className="mt-1 text-sm font-semibold">Upside Down Text</div>
              <p className="mt-1 text-xs text-neutral-400">Flip text upside down for fun</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
