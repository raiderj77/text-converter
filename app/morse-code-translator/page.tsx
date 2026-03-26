import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { MorseCodeTranslatorTool } from "@/components/tools/morse-code-translator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("morse-code-translator")!;
const pageUrl = buildUrl("/morse-code-translator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "morse code translator", "morse code converter", "text to morse code",
    "morse code to text", "morse code decoder", "morse code encoder",
    "morse code audio", "morse code beep", "learn morse code",
    "international morse code", "morse code chart", "morse code alphabet",
    "morse code online", "morse code generator", "SOS morse code",
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
    question: "How does the Morse code translator work?",
    answer:
      "Type your text in the input box and the translator converts each character to its Morse code equivalent using the International Morse Code standard. Dots (dits) and dashes (dahs) represent each letter. Use the tabs to switch between text-to-Morse and Morse-to-text modes.",
  },
  {
    question: "What is the format for entering Morse code?",
    answer:
      "When decoding Morse to text, use a dot (.) for dit and a dash (-) for dah. Separate letters with a single space and words with a forward slash (/). For example, '.... . .-.. .-.. --- / .-- --- .-. .-.. -..' decodes to 'HELLO WORLD'.",
  },
  {
    question: "How does the audio playback work?",
    answer:
      "The audio playback uses the Web Audio API to generate sine wave beeps directly in your browser. A dit is a short beep and a dah is three times longer, following the international standard 3:1 ratio. You can adjust the speed from 5 to 30 words per minute (WPM) using the slider.",
  },
  {
    question: "What is WPM in Morse code?",
    answer:
      "WPM stands for Words Per Minute and measures Morse code speed. It is calibrated using the word 'PARIS' as a standard reference. At 15 WPM, the word PARIS takes exactly one second to send. Beginners typically start at 5-10 WPM, while experienced operators can exceed 25 WPM.",
  },
  {
    question: "What characters are supported?",
    answer:
      "This translator supports all 26 letters (A-Z), digits (0-9), and common punctuation marks including period, comma, question mark, exclamation mark, slash, parentheses, colon, semicolon, equals sign, plus, minus, underscore, quotation marks, dollar sign, and at sign.",
  },
  {
    question: "What does SOS look like in Morse code?",
    answer:
      "SOS in Morse code is '... --- ...' — three dots, three dashes, three dots. It was chosen as a distress signal because of its distinctive rhythm, not as an abbreviation. It is easy to recognize even in noisy conditions.",
  },
  {
    question: "Is Morse code still used today?",
    answer:
      "Yes. Amateur (ham) radio operators use Morse code worldwide. It is also used in aviation navigation aids (VOR and NDB beacons transmit station identifiers in Morse), accessibility devices for people with limited mobility, and emergency signaling. Many militaries still train operators in Morse code as a backup communication method.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All translation and audio generation happen entirely in your browser using JavaScript and the Web Audio API. Your text never leaves your device.",
  },
];

export default function MorseCodeTranslatorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Morse Code Translator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Morse Code Translator", href: "/morse-code-translator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Morse Code Translator</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Morse Code Translator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A Morse code translator converts text to Morse code and Morse code back to text with audio playback. Enter your text or Morse code below to translate instantly.
        </p>

        <ToolAnswerBlock slug="morse-code-translator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the Morse Code Translator Tool</h2>

          <h2>Morse Code Translator Features and Options</h2>

          <h2>About the Free Online Morse Code Translator</h2>

        </div>


        <div className="mt-4">
          <MorseCodeTranslatorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="morse-code-translator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Morse Code Translator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your direction.</strong> Click
              &quot;Text to Morse&quot; to encode a message, or &quot;Morse to Text&quot; to decode
              Morse code back into readable text.
            </p>
            <p>
              <strong className="text-neutral-200">2. Type or paste your input.</strong> For
              text-to-Morse, simply type any message. For Morse-to-text, enter dots and dashes
              with spaces between letters and forward slashes between words.
            </p>
            <p>
              <strong className="text-neutral-200">3. View the visual output.</strong> Dots
              and dashes are displayed with distinct visual styling so you can see the pattern
              clearly. The text representation is shown below for easy copying.
            </p>
            <p>
              <strong className="text-neutral-200">4. Listen to the audio.</strong> Click Play
              to hear your message as Morse code beeps. Use the WPM slider to adjust playback
              speed from 5 to 30 words per minute.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The History and Science of Morse Code
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Morse code was developed in the 1830s and 1840s by Samuel Morse and Alfred Vail
              for use with the electric telegraph. It was one of the first systems to encode
              text characters as sequences of signals, predating digital communication by over
              a century. The original American Morse code was later refined into International
              Morse Code, which became the global standard and remains in use today.
            </p>
            <p>
              <strong className="text-neutral-200">How the encoding works.</strong> Each letter
              and number is represented by a unique sequence of short signals (dits, written as
              dots) and long signals (dahs, written as dashes). A dah is exactly three times the
              duration of a dit. The gap between symbols within a letter equals one dit length,
              the gap between letters equals three dit lengths, and the gap between words equals
              seven dit lengths. This precise timing structure allows trained operators to decode
              at high speed by ear alone.
            </p>
            <p>
              <strong className="text-neutral-200">Frequency optimization.</strong> Morse and
              Vail designed the code so that the most commonly used letters in English have the
              shortest codes. The letter E, the most frequent in English, is a single dit. The
              letter T is a single dah. Less common letters like Q and Z have longer, more complex
              sequences. This design minimizes average transmission time, a principle that
              anticipated information theory by a century.
            </p>
            <p>
              <strong className="text-neutral-200">Modern applications.</strong> While voice
              and digital communication have replaced Morse code for most purposes, it survives
              in several important niches. Amateur radio operators value it for its ability to
              cut through noise and interference. Aviation navigation beacons still identify
              themselves in Morse code. Emergency signaling with flashlights or mirrors uses
              the universally recognized SOS pattern. Assistive technology allows people with
              limited mobility to communicate using Morse code through simple switches, and
              both Android and iOS support Morse code input as an accessibility feature.
            </p>
            <p>
              <strong className="text-neutral-200">Learning Morse code.</strong> Most people
              learn Morse code by listening rather than reading. The Farnsworth method teaches
              characters at full speed but with extra spacing between them, gradually reducing
              the spacing as proficiency improves. Starting at 5 WPM and working up to 15-20 WPM
              is a common progression. The audio playback feature in this tool lets you practice
              at any speed.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="morse-code-translator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Morse Code Translator
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

        <AdSlot slot="before-footer" page="morse-code-translator" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Translate Morse code here, then explore our other encoding and text conversion tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML, hex & binary encoding</p>
            </Link>
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, octal, decimal & hex conversion</p>
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">↔️</div>
              <div className="mt-1 text-sm font-semibold">Text Reverser</div>
              <p className="mt-1 text-xs text-neutral-400">Reverse characters, words, or lines</p>
            </Link>
            <Link
              href="/hash-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">#️⃣</div>
              <div className="mt-1 text-sm font-semibold">Hash Generator</div>
              <p className="mt-1 text-xs text-neutral-400">MD5, SHA-256, SHA-512 hash generation</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
