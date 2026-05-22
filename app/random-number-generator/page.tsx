import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { RandomNumberGeneratorTool } from "@/components/tools/random-number-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("random-number-generator")!;
const pageUrl = buildUrl("/random-number-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "random number generator", "random number", "dice roller online",
    "random number picker", "bulk random numbers", "d20 roller",
    "random integer generator", "no duplicates random", "rng online",
    "random number generator free", "dice roller d6 d20",
    "random number between", "number randomizer", "lottery number generator",
    "random number no repeats",
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
    question: "How does this random number generator work?",
    answer:
      "This tool uses JavaScript's Math.random() function, which produces pseudo-random numbers. For most uses like games, simulations, and picking random values, this provides excellent randomness. It should not be used for cryptographic purposes where true randomness is required.",
  },
  {
    question: "Can I generate numbers without duplicates?",
    answer:
      "Yes. Toggle the 'No Duplicates' option to ensure every generated number is unique. If your count exceeds the possible unique numbers in your range (e.g., requesting 200 unique numbers between 1 and 100), the tool will cap at the maximum possible unique values.",
  },
  {
    question: "What is the maximum number of random numbers I can generate at once?",
    answer:
      "You can generate up to 1,000 numbers in a single batch. This is enough for most practical uses including simulations, statistical sampling, and lottery-style drawings. The results can be sorted ascending, descending, or left unsorted.",
  },
  {
    question: "How does the dice roller work?",
    answer:
      "The dice roller simulates standard tabletop RPG dice: d4 (4-sided), d6 (6-sided), d8, d10, d12, and d20. Each click generates a random result between 1 and the number of sides. Roll history is kept so you can track your results.",
  },
  {
    question: "Is this truly random?",
    answer:
      "Math.random() produces pseudo-random numbers using a deterministic algorithm seeded by the system. For games, drawings, and general-purpose randomness, it is more than sufficient. For security-sensitive applications like encryption keys, use a cryptographically secure random number generator instead.",
  },
  {
    question: "Can I use negative numbers?",
    answer:
      "Yes. Both the Min and Max fields accept negative numbers. For example, you can generate random numbers between -100 and 100, or between -50 and -1. The only requirement is that Min must be less than or equal to Max.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All random number generation happens entirely in your browser using JavaScript. Nothing is sent to any server. Your settings are saved to your browser's local storage for convenience.",
  },
  {
    question: "Can I use this for passwords or security tokens?",
    answer:
      "No. Math.random() is a pseudo-random generator — its output is deterministic and not suitable for security-sensitive values like passwords, session tokens, API keys, or cryptographic material. For those use cases, your browser's Web Crypto API (crypto.getRandomValues()) is the correct choice. It draws from the operating system's entropy pool and meets cryptographic security standards. This tool is designed for games, simulations, sampling, and general-purpose use only.",
  },
  {
    question: "Why might my random numbers look biased?",
    answer:
      "If you map raw random values to a range using the modulo operator (%), you can introduce modulo bias — values at the low end of your range appear slightly more often than the rest. For example, mapping a random byte (0–255) to 1–6 with %6 over-represents 1 through 4 because 256 does not divide evenly by 6. This tool avoids bias by using rejection sampling internally, discarding any draw that falls in the uneven tail and retrying, so every value in your range has equal probability.",
  },
];

export default function RandomNumberGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Random Number Generator"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Random Number Generator", href: "/random-number-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Random Number Generator</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Random Number Generator
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          This free random number generator instantly produces integers within any range you set — single picks, bulk batches up to 1,000, or dice rolls. It runs entirely in your browser using JavaScript; no data is ever sent to a server.
        </p>

        <ToolAnswerBlock slug="random-number-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>



        <div className="mt-4">
          <RandomNumberGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="random-number-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Is Math.random() Actually Random?
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              JavaScript&apos;s <code className="text-neutral-200">Math.random()</code> is a
              pseudo-random number generator (PRNG), not a true random source. It uses a
              deterministic algorithm — typically xorshift128+ or a similar design — seeded by
              engine state at startup. Every call produces a number in [0, 1) by advancing
              internal state through a fixed mathematical transformation. Given the same starting
              seed you would get the exact same sequence every time.
            </p>
            <p>
              For the vast majority of everyday uses — games, simulations, random sampling,
              picking a winner, rolling dice — this is completely fine. The output passes
              rigorous statistical randomness tests and is indistinguishable from true randomness
              for those purposes. The determinism only matters if an adversary can observe enough
              outputs to reconstruct your seed, which is the threat model of cryptography.
            </p>
            <p>
              <strong className="text-neutral-200">Do not use Math.random() for:</strong> passwords,
              session tokens, API keys, OAuth secrets, cryptographic nonces, or anything where
              predictability is a security risk.{" "}
              <strong className="text-neutral-200">Do use it for:</strong> games, dice rolls,
              random sampling, shuffles, simulations, and test data generation. For
              security-sensitive values, the browser&apos;s <code className="text-neutral-200">
              crypto.getRandomValues()</code> draws from the OS entropy pool and is
              cryptographically secure.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The Modulo Bias Trap
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              A common mistake when mapping random bytes to a custom range is using the modulo
              operator (<code className="text-neutral-200">%</code>). The problem: modulo
              produces bias unless your source space divides evenly into your target range.
              Consider mapping a random byte (0–255, so 256 possible values) to a die face
              (1–6). You might write{" "}
              <code className="text-neutral-200">result = (byte % 6) + 1</code>. The byte values
              0–251 map cleanly across six faces 42 times each. But 252, 253, 254, and 255 map
              to faces 1, 2, 3, and 4 respectively — giving those four faces one extra hit each.
              Faces 1–4 appear 43 times per 256 draws; faces 5–6 appear only 42 times. That is
              modulo bias.
            </p>
            <p>
              The correct fix is rejection sampling: if the drawn byte falls in the biased
              tail (here, values ≥ 252), discard it and draw again. Repeat until you get a
              value in the unbiased portion. Each retry is independent, so the expected number
              of extra draws is tiny — less than one on average for most practical ranges. The
              result is that every outcome in your target range has exactly equal probability,
              with no skew toward the low end.
            </p>
            <p>
              This tool handles the bias problem internally so you never have to think about it.
              Every number in your Min–Max range has equal probability regardless of how the
              range size aligns with the underlying random source.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Why Retry-on-Collision Fails for No-Duplicates
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              The obvious way to generate <em>n</em> unique random numbers is to generate one,
              check if you&apos;ve seen it before, and retry if you have. This works fine when
              you need a handful of values from a large range — collisions are rare and retries
              are cheap. But performance degrades sharply as the count approaches the range
              size, for the same reason the birthday problem surprises people: once you&apos;ve
              filled roughly 50% of the available slots, about half of all draws are collisions,
              so you&apos;re doing roughly two draws per accepted value. At 90% fill, nine out
              of ten draws are wasted. Near 100%, the retry loop runs for an arbitrarily long
              time and the behavior becomes unpredictable.
            </p>
            <p>
              The Fisher-Yates shuffle sidesteps this entirely. It works by maintaining a
              virtual pool of all available values and swapping each selected value out of the
              pool permanently. Each draw is O(1) with zero chance of collision because you
              are always picking from the remaining unchosen values. The full algorithm runs
              in O(n) time — linear in the count you want — regardless of how close that count
              is to the range size. There is no retry logic and no worst-case blowup.
            </p>
            <p>
              This tool uses Fisher-Yates for no-duplicates mode, which is why it handles
              requests like &quot;999 unique numbers from 1–1000&quot; just as quickly as
              &quot;5 unique numbers from 1–1000.&quot;
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Generate Random Numbers Here
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Set your range.</strong> Enter a minimum
              and maximum value. The generator will produce numbers within this range (inclusive).
              Both positive and negative numbers are supported.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose single or bulk mode.</strong> Set
              Count to 1 for a single number, or increase it up to 1,000 for bulk generation.
              Single mode shows a large, prominent result; bulk mode displays all numbers in a
              compact grid.
            </p>
            <p>
              <strong className="text-neutral-200">3. Configure options.</strong> Toggle
              &quot;No Duplicates&quot; to ensure unique numbers. Choose ascending, descending,
              or unsorted order. The tool remembers your preferences between visits.
            </p>
            <p>
              <strong className="text-neutral-200">4. Roll dice.</strong> Use the dice roller
              section to simulate standard RPG dice. Click any die button to roll it, and view
              your complete roll history. Copy or clear results anytime.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="random-number-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Random Number Generator
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

        <AdSlot slot="before-footer" page="random-number-generator" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Generate random numbers here, then explore our other utility tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/uuid-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🆔</div>
              <div className="mt-1 text-sm font-semibold">UUID Generator</div>
              <p className="mt-1 text-xs text-neutral-400">Generate random UUID v4 identifiers</p>
            </Link>
            <Link
              href="/password-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔑</div>
              <div className="mt-1 text-sm font-semibold">Password Generator</div>
              <p className="mt-1 text-xs text-neutral-400">Generate strong random passwords</p>
            </Link>
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, hex, octal & decimal conversion</p>
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
