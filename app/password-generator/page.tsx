import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { PasswordGeneratorTool } from "@/components/tools/password-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("password-generator")!;
const pageUrl = buildUrl("/password-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "password generator", "random password generator", "strong password generator",
    "secure password generator online", "password generator free", "passphrase generator",
    "memorable passphrase generator", "random passphrase", "PIN generator",
    "password strength checker", "password entropy calculator", "how long to crack my password",
    "bulk password generator", "generate password no symbols", "cryptographic random password",
    "password generator exclude characters", "password maker online free",
    "wifi password generator",
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
    question: "How does this password generator work?",
    answer:
      "It uses crypto.getRandomValues to obtain cryptographically strong pseudorandom values from your browser. Rejection sampling gives each allowed character an equal chance of selection. You choose the length, character sets, and exclusions, and generation happens entirely in your browser.",
  },
  {
    question: "What is a passphrase and why is it better?",
    answer:
      "A passphrase is a sequence of random words like 'Lamp-Frog-Quilt-Mist-Arrow' that is both long and easier to remember. Five words from this tool's 928-word list provide about 49 bits of entropy before the optional random number; each additional word adds about 9.9 bits. For a high-value master password, choose eight words, include the optional number, and follow your password provider's guidance.",
  },
  {
    question: "What is the PIN generator for?",
    answer:
      "PIN mode generates 4, 6, 8, 10, or 12-digit numeric codes for systems that let you choose a PIN. It does not replace recovery or two-factor backup codes issued by a service.",
  },
  {
    question: "How long should my password be?",
    answer:
      "This tool defaults to 20 characters, and 16 or more is a practical choice for important accounts. NIST SP 800-63B-4 requires a password used as a single authentication factor to be at least 15 characters; when a password is used only as part of multi-factor authentication, the required minimum may be 8 characters. A randomly generated 20-character password using all 91 available characters has about 130 bits of entropy.",
  },
  {
    question: "What is password entropy?",
    answer:
      "Entropy measures the size of the random choice space in bits. For this generator, the password estimate is length × log2(pool size). The displayed ratings are an illustrative guide for uniformly generated output, not a guarantee against phishing, malware, reuse, or weak storage by a website.",
  },
  {
    question: "How does the crack time estimate work?",
    answer:
      "The estimate divides the full combination count by an illustrative rate of 10 billion guesses per second. It shows maximum exhaustive-search time; finding a password would take about half that time on average. Real rates vary greatly with the target system, password hashing, hardware, and rate limits.",
  },
  {
    question: "Should I include symbols in my password?",
    answer:
      "Yes, when the target system accepts them. Symbols increase this tool's character pool from 62 letters and digits to 91 total characters, adding about 0.55 bits of entropy per character. Use Exclude Characters for symbols a specific site rejects; generation is disabled if exclusions remove the entire enabled pool.",
  },
  {
    question: "What are ambiguous characters?",
    answer:
      "Characters that look similar in many fonts: 0 and O, 1 and l and I, sometimes 5 and S. Excluding them (type '0OlI1' in the exclude field) makes passwords easier to read and type manually when copy-paste is unavailable.",
  },
  {
    question: "Can I generate multiple passwords at once?",
    answer:
      "Yes. Choose 1, 5, 10, or 25 at a time. All are generated with the same settings. Copy individually or use 'Copy All' to get all passwords separated by newlines. Results created with the Generate button are added to in-memory history, up to 50 passwords.",
  },
  {
    question: "What is the password history feature?",
    answer:
      "Results created with the Generate button are kept in an in-memory history of up to 50 passwords; automatic previews created after settings change are not added. The history disappears when the page is reloaded or closed and is not written to cookies or localStorage.",
  },
  {
    question: "Is this safe to use? Is my password stored?",
    answer:
      "Generation happens locally in your browser, and this tool does not send output to a server or save it in cookies or localStorage. Generate-button results remain in temporary in-memory history until the page is reloaded or closed, and copied values remain in your system clipboard until replaced. A web tool cannot protect a password from a compromised browser, extension, or device.",
  },
  {
    question: "How does this compare to Bitwarden or 1Password password generators?",
    answer:
      "This standalone page uses the browser's Web Crypto API and does not store or autofill credentials. Password-manager apps may use different platform-specific random generators and also provide encrypted storage, autofill, breach alerts, and account recovery features. Prefer your trusted password manager's built-in generator when it is available.",
  },
];

export default function PasswordGeneratorPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Free Password Generator — Passwords, Passphrases & PINs"
        description={tool.description}
        url={pageUrl}
        dateModified={"2026-08-01"}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Password Generator", href: "/password-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Password Generator — Strong Passwords, Passphrases &amp; PINs
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A password generator creates secure, random passwords with customizable length, character sets, and complexity. Set your requirements below and click generate to create a strong password instantly.
        </p>

        <ToolAnswerBlock slug="password-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <PasswordGeneratorTool />
        </div>

        <AdSlot slot="after-tool" page="password-generator" />
        <div className="mt-4 rounded-xl border border-white/10 bg-neutral-900/50 px-4 py-3">
          <Link
            href="/blog/password-generator-guide"
            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            📖 Full Guide: Password Generator — Strong Passwords, Passphrases, and PINs →
          </Link>
        </div>

        {/* Feature grid */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Three Generators in One — Passwords, Passphrases &amp; PINs
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Most generators only do random character strings. We give you three modes
            optimized for different use cases, all powered by the same cryptographic engine.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                emoji: "🔑", title: "Random Password",
                desc: "Classic random mix of uppercase, lowercase, numbers, and symbols. Customize length from 4-128 characters. Exclude specific characters. Maximum entropy per character.",
                use: "Best for: Logins, app passwords, and systems that explicitly accept a user-created text secret",
              },
              {
                emoji: "📝", title: "Passphrase",
                desc: "Random words from a 928-word list connected by your choice of separator. Customize word count (3-8), capitalization, and optional numbers. Easy to type and remember.",
                use: "Best for: Manually entered passwords; use eight words plus the optional number for higher-value accounts",
              },
              {
                emoji: "🔢", title: "PIN",
                desc: "Numeric-only codes from 4 to 12 digits using cryptographic randomness — not Math.random(). Much more secure than choosing a PIN based on a birthday or pattern.",
                use: "Best for: Systems that let you choose a numeric PIN; not issuer-generated recovery or backup codes",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <div className="text-2xl mb-2">{f.emoji}</div>
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-neutral-400">{f.desc}</p>
                <p className="mt-2 text-xs text-neutral-400 italic">{f.use}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Features That Go Beyond Basic Generators
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { emoji: "⏱️", title: "Crack Time Estimate", desc: "See a simplified maximum exhaustive-search estimate at 10 billion guesses per second. Actual attack rates vary by system." },
              { emoji: "📊", title: "Entropy Score", desc: "Real-time entropy calculation in bits. Rated from Very Weak to Very Strong with a visual strength bar." },
              { emoji: "📦", title: "Bulk Generation", desc: "Generate 1, 5, 10, or 25 passwords at once. Copy individually or all at once." },
              { emoji: "🕘", title: "Session History", desc: "Up to 50 passwords created with the Generate button are kept in memory. Automatic previews are not added; reload or close to clear." },
              { emoji: "🚫", title: "Exclude Characters", desc: "Remove ambiguous characters (0OlI1) or specific symbols that certain websites reject." },
              { emoji: "🔒", title: "100% Client-Side", desc: "Uses cryptographically strong pseudorandom values from crypto.getRandomValues(). Generated output is not sent to our server." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <div className="text-lg mb-1">{f.emoji}</div>
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-neutral-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Generate a Strong Password
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your mode.</strong> Use Password
              for maximum entropy, Passphrase for memorability, or PIN for numeric-only codes.
            </p>
            <p>
              <strong className="text-neutral-200">2. Adjust settings.</strong> Set the length
              (16-20 for passwords, 5-6 words for passphrases). Enable all character sets for
              maximum strength. Exclude characters that specific sites reject.
            </p>
            <p>
              <strong className="text-neutral-200">3. Check the strength meter.</strong> Aim
              for Strong (80+ bits) or Very Strong (128+ bits). The crack time estimate shows
              a simplified offline-guessing model, not protection against phishing, malware, or reuse.
            </p>
            <p>
              <strong className="text-neutral-200">4. Generate and copy.</strong> Click Generate
              to add results to temporary history; changing settings creates a fresh preview without
              adding it to history. Click Copy, then store the result in your password manager.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Password Strength Assessment Guide
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Entropy increases with length and character pool size. Here is the approximate
            entropy and maximum exhaustive-search time for passwords using all four character
            sets (91 characters) at 10 billion guesses per second. The average search would take
            about half as long:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-neutral-900 text-left">
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Length</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Entropy</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Rating</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Maximum Time</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">8</td><td className="px-3 py-2">~52 bits</td><td className="px-3 py-2 text-amber-400">Medium</td><td className="px-3 py-2">~5.4 days</td></tr>
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">12</td><td className="px-3 py-2">~78 bits</td><td className="px-3 py-2 text-amber-400">Medium</td><td className="px-3 py-2">~1.0 million years</td></tr>
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">16</td><td className="px-3 py-2">~104 bits</td><td className="px-3 py-2 text-green-400">Strong</td><td className="px-3 py-2">~70 trillion years</td></tr>
                <tr><td className="px-3 py-2 font-mono">20</td><td className="px-3 py-2">~130 bits</td><td className="px-3 py-2 text-emerald-400">Very Strong</td><td className="px-3 py-2">~4.8 sextillion years</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Password Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Every new account:</strong> Generate a unique
              random password for each signup. Never reuse passwords — if one site is breached,
              attackers try the same credentials everywhere (credential stuffing).
            </p>
            <p>
              <strong className="text-neutral-200">Replacing weak passwords:</strong> If you are
              using common passwords, dictionary words, dates, or a password that is too short for the service,
              replace them with generated passwords immediately.
            </p>
            <p>
              <strong className="text-neutral-200">Master passwords:</strong> Use the Passphrase
              mode with eight words and the optional number, then follow your password manager's
              guidance. The five-word default is only medium-strength under this page's model.
            </p>
            <p>
              <strong className="text-neutral-200">User-created text secrets:</strong> Use Password
              mode only when a target system explicitly asks you to create a text secret, and follow its
              length and character rules. Do not substitute this output for system-issued API tokens,
              recovery codes, JWT signing keys, encryption keys, or other cryptographic key material.
            </p>
            <p>
              <strong className="text-neutral-200">WiFi passwords:</strong> Use Passphrase mode
              to generate a readable eight-word passphrase for your home or office WiFi network.
              Easy to share with guests, hard to brute-force.
            </p>
            <p>
              <strong className="text-neutral-200">Team onboarding:</strong> Use the bulk generator
              only if your administration system accepts user-created temporary passwords. Require a
              change at first sign-in and distribute credentials through an approved secure channel.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="password-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Password Generator
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="password-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Generate passwords here, then encode strings, format JSON, compare text, and more
            with our other free tools.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link key={t.slug} href={t.slug === "" ? "/" : `/${t.slug}`} className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors">
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
