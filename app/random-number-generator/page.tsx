import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { RandomNumberGeneratorTool } from "@/components/tools/random-number-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

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
];

export default function RandomNumberGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Random Number Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
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
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A random number generator creates random numbers within a custom range with options for bulk generation and no duplicates. Set your range and count below to generate random numbers instantly.
        </p>

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
            How to Generate Random Numbers Online
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

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Randomness and Where It Matters
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Random numbers are fundamental to many areas of computing, science, and everyday
              life. From shuffling a playlist to running Monte Carlo simulations, the ability
              to produce unpredictable values is surprisingly important. But not all randomness
              is created equal, and understanding the differences helps you choose the right
              tool for the job.
            </p>
            <p>
              <strong className="text-neutral-200">Pseudo-random number generators (PRNGs)</strong> like
              the one used in this tool produce sequences that appear random but are actually
              deterministic. They start from a seed value and use mathematical formulas to
              generate each subsequent number. Modern PRNGs like those built into JavaScript
              engines pass rigorous statistical tests and produce output that is indistinguishable
              from true randomness for practical purposes. They are fast, reproducible (given the
              same seed), and perfectly suitable for games, simulations, random sampling, and
              general-purpose tasks.
            </p>
            <p>
              <strong className="text-neutral-200">True random number generators (TRNGs)</strong> derive
              randomness from physical phenomena like atmospheric noise, radioactive decay, or
              thermal fluctuations. These are used in cryptography, security tokens, and lottery
              systems where predictability would be a vulnerability. The Web Crypto API
              (crypto.getRandomValues) provides cryptographically secure random values in
              browsers, bridging the gap between speed and security.
            </p>
            <p>
              <strong className="text-neutral-200">Common applications</strong> of random number
              generation include: statistical sampling and A/B testing, procedural generation in
              games and art, Monte Carlo methods in physics and finance, randomized algorithms in
              computer science, lottery and raffle drawings, dice and card game simulations, and
              creating test data for software development. Each use case has different requirements
              for speed, reproducibility, and unpredictability.
            </p>
            <p>
              <strong className="text-neutral-200">The no-duplicates problem</strong> is a classic
              challenge in computer science. When you need unique random numbers from a range, the
              naive approach of generating and checking for duplicates becomes slow as the count
              approaches the range size. Efficient algorithms like the Fisher-Yates shuffle solve
              this by selecting from a shrinking pool of available values, guaranteeing uniqueness
              in linear time.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="random-number-generator" />

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
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="random-number-generator" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
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
