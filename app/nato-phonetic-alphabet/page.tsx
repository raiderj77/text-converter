import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { NatoPhoneticAlphabetTool } from "@/components/tools/nato-phonetic-alphabet";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("nato-phonetic-alphabet")!;
const pageUrl = buildUrl("/nato-phonetic-alphabet");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "nato phonetic alphabet", "phonetic alphabet converter", "alpha bravo charlie",
    "nato alphabet", "military alphabet", "spelling alphabet", "phonetic alphabet chart",
    "nato phonetic alphabet list", "phonetic alphabet tool", "radio alphabet",
    "icao phonetic alphabet", "aviation alphabet", "text to nato", "phonetic spelling",
    "free phonetic alphabet converter",
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
    question: "What is the NATO phonetic alphabet?",
    answer:
      "The NATO phonetic alphabet is a standardized set of 26 code words assigned to the letters A through Z. Each word (Alpha, Bravo, Charlie, etc.) begins with the corresponding letter and was chosen to be easily distinguishable when spoken over radio, phone, or noisy environments. It is officially known as the International Radiotelephony Spelling Alphabet.",
  },
  {
    question: "Why is the number 9 pronounced 'Niner'?",
    answer:
      "The number 9 is pronounced 'Niner' to distinguish it from 'No' or 'Nein' (German for 'no') in radio communications. This avoids dangerous misunderstandings in international military and aviation contexts where clarity is critical.",
  },
  {
    question: "Who uses the NATO phonetic alphabet?",
    answer:
      "The NATO phonetic alphabet is used by military forces worldwide, commercial aviation (pilots and air traffic controllers), maritime shipping, law enforcement, emergency services, telecommunications, and anyone who needs to spell out words clearly over voice communication. It is the international standard adopted by NATO, ICAO, and the ITU.",
  },
  {
    question: "Is this the same as the ICAO phonetic alphabet?",
    answer:
      "Yes. The NATO phonetic alphabet and the ICAO (International Civil Aviation Organization) phonetic alphabet are the same set of code words. ICAO adopted the alphabet in 1956, and NATO subsequently adopted the same standard. It is also endorsed by the International Telecommunication Union (ITU).",
  },
  {
    question: "How do I spell out a word using the phonetic alphabet?",
    answer:
      "Replace each letter with its corresponding code word. For example, 'CAT' becomes 'Charlie Alpha Tango'. Numbers are spoken as individual digits: '42' becomes 'Four Two'. This tool converts any text automatically — just type or paste your text and copy the result.",
  },
  {
    question: "What about special characters and punctuation?",
    answer:
      "The standard NATO phonetic alphabet covers only the 26 English letters and digits 0-9. Special characters, punctuation, and symbols do not have official NATO code words. This tool passes them through unchanged so you can see them in context.",
  },
  {
    question: "Can I copy the output as a formatted list?",
    answer:
      "Yes. This tool provides two copy options. 'Copy Inline' gives you the NATO words in a single line separated by spaces. 'Copy List' gives you each character and its NATO code word on a separate line, which is useful for reference sheets or documentation.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. All conversion happens entirely in your browser using JavaScript. Your text never leaves your device.",
  },
  {
    question: "Do numbers have phonetic equivalents?",
    answer:
      "NATO protocol pronounces numbers distinctively: 0=Zero, 1=One, 2=Two, 3=Three, 4=Four, 5=Five, 6=Six, 7=Seven, 8=Eight, 9=Niner. The pronunciation 'Niner' for 9 avoids confusion with the German word 'Nein' (no) in international radio communication.",
  },
];

export default function NatoPhoneticAlphabetPage() {
  return (
    <>
      <WebAppSchema
        name="Free NATO Phonetic Alphabet Converter"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "NATO Phonetic Alphabet", href: "/nato-phonetic-alphabet" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">NATO Phonetic Alphabet</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free NATO Phonetic Alphabet Converter
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A NATO phonetic alphabet converter spells out text using the military alphabet (Alpha, Bravo, Charlie). Enter your text below to convert it to NATO phonetic spelling instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the NATO Phonetic Alphabet Tool</h2>

          <h2>NATO Phonetic Alphabet Features and Options</h2>

          <h2>About the Free Online NATO Phonetic Alphabet</h2>

        </div>


        <div className="mt-4">
          <NatoPhoneticAlphabetTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="nato-phonetic-alphabet" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is the NATO Phonetic Alphabet?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              The NATO phonetic alphabet (formally the International Radiotelephony Spelling
              Alphabet) assigns 26 code words to the 26 English letters: Alpha, Bravo, Charlie,
              Delta, Echo, Foxtrot, Golf, Hotel, India, Juliet, Kilo, Lima, Mike, November, Oscar,
              Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.
              Each word was chosen for distinctiveness across languages and in noisy environments.
            </p>
            <p>
              You would use the phonetic alphabet when spelling names and addresses over the phone,
              reading serial numbers and confirmation codes, communicating over radio (aviation,
              maritime, military), dictating passwords and API keys to colleagues, and working in
              any environment where verbal clarity is critical. Every time you spell your email or
              confirmation code over the phone, the phonetic alphabet eliminates confusion between
              letters that sound alike &mdash; M and N, B and D, S and F.
            </p>
            <p>
              The current alphabet was adopted in 1956 after extensive testing across 31 nations.
              Words were selected for distinctiveness when spoken in noisy conditions by speakers
              of different native languages. &ldquo;Juliet&rdquo; replaced &ldquo;Jig&rdquo; because
              it performed better with international speakers.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Examples for NATO Phonetic Translation</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <div>
              <h3 className="text-base font-semibold">JavaScript</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-javascript">{`const NATO = {
  A:'Alpha', B:'Bravo', C:'Charlie', D:'Delta', E:'Echo',
  F:'Foxtrot', G:'Golf', H:'Hotel', I:'India', J:'Juliet',
  K:'Kilo', L:'Lima', M:'Mike', N:'November', O:'Oscar',
  P:'Papa', Q:'Quebec', R:'Romeo', S:'Sierra', T:'Tango',
  U:'Uniform', V:'Victor', W:'Whiskey', X:'X-ray', Y:'Yankee', Z:'Zulu',
};

function toNATO(text) {
  return [...text.toUpperCase()].map(char => {
    if (NATO[char]) return NATO[char];
    if (char === ' ') return '(space)';
    return char;
  }).join(' ');
}

console.log(toNATO('Hello'));  // Hotel Echo Lima Lima Oscar
console.log(toNATO('SOS'));    // Sierra Oscar Sierra`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Python</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-python">{`NATO = {
    'A':'Alpha','B':'Bravo','C':'Charlie','D':'Delta','E':'Echo',
    'F':'Foxtrot','G':'Golf','H':'Hotel','I':'India','J':'Juliet',
    'K':'Kilo','L':'Lima','M':'Mike','N':'November','O':'Oscar',
    'P':'Papa','Q':'Quebec','R':'Romeo','S':'Sierra','T':'Tango',
    'U':'Uniform','V':'Victor','W':'Whiskey','X':'X-ray','Y':'Yankee','Z':'Zulu',
}

def to_nato(text):
    result = []
    for char in text.upper():
        if char in NATO:
            result.append(NATO[char])
        elif char == ' ':
            result.append('(space)')
        else:
            result.append(char)
    return ' '.join(result)

print(to_nato('Hello World'))
# Hotel Echo Lima Lima Oscar (space) Whiskey Oscar Romeo Lima Delta`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Bash</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-bash">{`nato() {
  echo "$1" | tr '[:lower:]' '[:upper:]' | fold -w1 | while read c; do
    case $c in
      A) echo -n "Alpha ";; B) echo -n "Bravo ";;
      C) echo -n "Charlie ";; D) echo -n "Delta ";;
      E) echo -n "Echo ";; F) echo -n "Foxtrot ";;
      G) echo -n "Golf ";; H) echo -n "Hotel ";;
      I) echo -n "India ";; J) echo -n "Juliet ";;
      K) echo -n "Kilo ";; L) echo -n "Lima ";;
      M) echo -n "Mike ";; N) echo -n "November ";;
      O) echo -n "Oscar ";; P) echo -n "Papa ";;
      Q) echo -n "Quebec ";; R) echo -n "Romeo ";;
      S) echo -n "Sierra ";; T) echo -n "Tango ";;
      U) echo -n "Uniform ";; V) echo -n "Victor ";;
      W) echo -n "Whiskey ";; X) echo -n "X-ray ";;
      Y) echo -n "Yankee ";; Z) echo -n "Zulu ";;
      *) echo -n "$c ";;
    esac
  done; echo
}

nato "Hello"
# Hotel Echo Lima Lima Oscar`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the NATO Phonetic Alphabet Converter
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Enter your text.</strong> Type or paste
              any text, word, name, or code into the input field. Letters and numbers are
              converted instantly.
            </p>
            <p>
              <strong className="text-neutral-200">2. Read the phonetic output.</strong> Each
              letter is displayed as its NATO code word (e.g., A = Alpha, B = Bravo). Numbers
              are shown as their spoken forms (e.g., 9 = Niner).
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy your result.</strong> Use &quot;Copy
              Inline&quot; for a single-line format or &quot;Copy List&quot; for a character-by-character
              breakdown. Both formats are ready to paste into emails, documents, or messages.
            </p>
            <p>
              <strong className="text-neutral-200">4. Browse the reference table.</strong> Click
              &quot;Show Reference Table&quot; to view the complete A-Z and 0-9 NATO phonetic alphabet
              chart at any time.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            A Brief History of the NATO Phonetic Alphabet
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              The need for a standardized spelling alphabet arose in the early days of radio
              communication when static, noise, and accent differences made it difficult to
              distinguish similar-sounding letters like B, D, E, and P over voice channels.
              Miscommunication could lead to navigation errors, friendly fire incidents, or
              failed emergency responses.
            </p>
            <p>
              The first widely adopted phonetic alphabet was developed by the International
              Telecommunication Union (ITU) in the 1920s. However, it proved problematic
              because many code words were difficult for non-English speakers to pronounce.
              During World War II, the US military and the Royal Air Force each developed
              their own versions, leading to confusion between allied forces.
            </p>
            <p>
              In 1956, the International Civil Aviation Organization (ICAO) finalized the
              current alphabet after extensive testing across 31 countries. Each code word
              was chosen for international intelligibility, meaning speakers of French,
              Spanish, Portuguese, and other major languages could pronounce and distinguish
              them clearly. NATO adopted the same alphabet shortly after, giving it the name
              most people recognize today.
            </p>
            <p>
              The alphabet has remained unchanged since 1956, a testament to how well the
              original selections work. Every code word was tested to ensure it sounds
              distinct from every other code word, even through heavy radio static or poor
              phone connections. For example, &quot;Alpha&quot; was chosen over &quot;Able&quot; because it
              tested better with international speakers, and &quot;Juliet&quot; replaced &quot;Jig&quot; for
              the same reason.
            </p>
            <p>
              Beyond military and aviation use, the NATO phonetic alphabet has become a
              universal tool for anyone who needs to communicate precise letter sequences.
              Customer service agents use it to verify account numbers and email addresses.
              IT professionals use it to read out serial numbers, MAC addresses, and
              verification codes. Emergency dispatchers use it to spell street names and
              license plates. Its clarity and universality make it indispensable in any
              situation where accuracy matters more than speed.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="nato-phonetic-alphabet" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About NATO Phonetic Alphabet
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

        <AdSlot slot="before-footer" page="nato-phonetic-alphabet" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert text to NATO phonetic alphabet here, then try our other text transformation tools.
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
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Base64, URL, HTML, hex & binary encoding</p>
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔄</div>
              <div className="mt-1 text-sm font-semibold">Case Converter</div>
              <p className="mt-1 text-xs text-neutral-400">UPPERCASE, lowercase, Title Case & more</p>
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">↔️</div>
              <div className="mt-1 text-sm font-semibold">Text Reverser</div>
              <p className="mt-1 text-xs text-neutral-400">Reverse characters, words, or lines</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
