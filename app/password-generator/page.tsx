import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { PasswordGeneratorTool } from "@/components/tools/password-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

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
    "API key generator", "wifi password generator",
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
      "It uses your browser's built-in cryptographic random number generator (crypto.getRandomValues) to produce truly random passwords. This is the same randomness source used by password managers like 1Password and Bitwarden. You choose the length, character sets, and exclusions — the password is generated entirely in your browser.",
  },
  {
    question: "What is a passphrase and why is it better?",
    answer:
      "A passphrase is a sequence of random words like 'Lamp-Frog-Quilt-Mist-Arrow' that is both long and easy to remember. Because it is much longer than a typical password, it has extremely high entropy. A 5-word passphrase from our 1,000+ word list has over 50 bits of entropy, and each additional word adds roughly 10 more bits. Passphrases are ideal for master passwords, WiFi keys, and any login you need to type manually.",
  },
  {
    question: "What is the PIN generator for?",
    answer:
      "The PIN mode generates numeric-only codes for bank PINs, phone unlock codes, two-factor backup codes, and any system that requires digits only. You can generate 4, 6, 8, 10, or 12-digit PINs with cryptographic randomness.",
  },
  {
    question: "How long should my password be?",
    answer:
      "At least 16 characters for important accounts, 20+ for maximum security. The 2025 NIST guidelines recommend a minimum of 12-16 characters. Each additional character exponentially increases the number of possible combinations. A 20-character password with all character sets has over 130 bits of entropy.",
  },
  {
    question: "What is password entropy?",
    answer:
      "Entropy measures randomness in bits. Higher entropy means more possible combinations and a harder-to-crack password. The formula is: bits = length × log2(pool_size). A password with 80+ bits is considered strong. With 128+ bits, it would take billions of years to crack at 10 billion guesses per second.",
  },
  {
    question: "How does the crack time estimate work?",
    answer:
      "We calculate how long it would take to brute-force your password at 10 billion guesses per second, which represents a well-funded attacker using high-end GPUs. A 20-character password with all character sets would take trillions of years to crack at this rate.",
  },
  {
    question: "Should I include symbols in my password?",
    answer:
      "Yes, when possible. Symbols increase the character pool from ~62 (letters + numbers) to ~92, adding about 0.6 extra bits of entropy per character. However, some systems restrict certain symbols — use the Exclude Characters field to remove any that a specific site rejects.",
  },
  {
    question: "What are ambiguous characters?",
    answer:
      "Characters that look similar in many fonts: 0 and O, 1 and l and I, sometimes 5 and S. Excluding them (type '0OlI1' in the exclude field) makes passwords easier to read and type manually when copy-paste is unavailable.",
  },
  {
    question: "Can I generate multiple passwords at once?",
    answer:
      "Yes. Choose 1, 5, 10, or 25 at a time. All are generated with the same settings. Copy individually or use 'Copy All' to get all passwords separated by newlines. Your history keeps the last 50 generated passwords in this session.",
  },
  {
    question: "What is the password history feature?",
    answer:
      "Every password you generate is stored in a session history (up to 50). Click the 'History' button to browse and copy any previously generated password. History is stored only in memory and disappears when you close the tab — nothing is saved to disk or sent to a server.",
  },
  {
    question: "Is this safe to use? Is my password stored?",
    answer:
      "Yes, it is completely safe. Passwords are generated using the Web Crypto API in your browser. Nothing is stored in cookies, localStorage, or sent to any server. Your password exists only in browser memory until you navigate away or close the tab.",
  },
  {
    question: "How does this compare to Bitwarden or 1Password password generators?",
    answer:
      "We use the same cryptographic randomness (crypto.getRandomValues). The difference is that our tool is a standalone web page — no app install, no account, no cost. We also offer passphrase generation with customizable separators and capitalization, PIN generation, bulk generation up to 25, crack time estimates, and a session history — features that most password managers don't expose in their free web generators.",
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
        <p className="mt-2 text-sm text-neutral-400">
          Generate strong, random passwords using cryptographic randomness. Create random
          passwords with customizable character sets, memorable passphrases from random
          words, or numeric PINs. See real-time strength rating and crack time estimate.
          Generate up to 25 at once with session history. Free, no signup, nothing leaves
          your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <PasswordGeneratorTool />
        </div>

        <AdSlot slot="after-tool" page="password-generator" />

        {/* Feature grid */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Three Generators in One — Passwords, Passphrases &amp; PINs
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Most generators only do random character strings. We give you three modes
            optimized for different use cases, all powered by the same cryptographic engine.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                emoji: "🔑", title: "Random Password",
                desc: "Classic random mix of uppercase, lowercase, numbers, and symbols. Customize length from 4-128 characters. Exclude specific characters. Maximum entropy per character.",
                use: "Best for: Logins, app passwords, encryption keys, API secrets",
              },
              {
                emoji: "📝", title: "Passphrase",
                desc: "Random words from a 1,000+ word list connected by your choice of separator. Customize word count (3-8), capitalization, and optional numbers. Easy to type and remember.",
                use: "Best for: Master passwords, WiFi keys, SSH passphrases, any password you type manually",
              },
              {
                emoji: "🔢", title: "PIN",
                desc: "Numeric-only codes from 4 to 12 digits using cryptographic randomness — not Math.random(). Much more secure than choosing a PIN based on a birthday or pattern.",
                use: "Best for: Bank PINs, phone unlock codes, 2FA backup codes, door codes",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <div className="text-2xl mb-2">{f.emoji}</div>
                <h3 className="text-sm font-semibold">{f.title}</h3>
                <p className="mt-1 text-xs text-neutral-400">{f.desc}</p>
                <p className="mt-2 text-xs text-neutral-500 italic">{f.use}</p>
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
              { emoji: "⏱️", title: "Crack Time Estimate", desc: "See how long it would take to brute-force your password at 10 billion guesses per second — from 'Instant' to 'trillions of years'." },
              { emoji: "📊", title: "Entropy Score", desc: "Real-time entropy calculation in bits. Rated from Very Weak to Very Strong with a visual strength bar." },
              { emoji: "📦", title: "Bulk Generation", desc: "Generate 1, 5, 10, or 25 passwords at once. Copy individually or all at once." },
              { emoji: "🕘", title: "Session History", desc: "Last 50 generated passwords saved in memory. Browse and copy any previous result. Clears when you close the tab." },
              { emoji: "🚫", title: "Exclude Characters", desc: "Remove ambiguous characters (0OlI1) or specific symbols that certain websites reject." },
              { emoji: "🔒", title: "100% Client-Side", desc: "Uses crypto.getRandomValues() — the same Web Crypto API used by password managers. Nothing leaves your device." },
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
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
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
              real-world implications of your entropy level.
            </p>
            <p>
              <strong className="text-neutral-200">4. Generate and copy.</strong> Click Generate
              or change any setting — passwords update automatically. Click Copy to save to
              clipboard. Store it in your password manager immediately.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Password Strength Guide
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Entropy increases with length and character pool size. Here is the approximate
            entropy and crack time for passwords using all four character sets (~92 characters)
            at 10 billion guesses per second:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-neutral-900 text-left">
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Length</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Entropy</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Rating</th>
                  <th className="px-3 py-2 border-b border-white/10 font-semibold">Crack Time</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">8</td><td className="px-3 py-2">~52 bits</td><td className="px-3 py-2 text-amber-400">Medium</td><td className="px-3 py-2">~7 minutes</td></tr>
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">12</td><td className="px-3 py-2">~78 bits</td><td className="px-3 py-2 text-green-400">Strong</td><td className="px-3 py-2">~958 years</td></tr>
                <tr className="border-b border-white/5"><td className="px-3 py-2 font-mono">16</td><td className="px-3 py-2">~104 bits</td><td className="px-3 py-2 text-green-400">Strong</td><td className="px-3 py-2">~643M years</td></tr>
                <tr><td className="px-3 py-2 font-mono">20</td><td className="px-3 py-2">~130 bits</td><td className="px-3 py-2 text-emerald-400">Very Strong</td><td className="px-3 py-2">~4.3T years</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Password Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Every new account:</strong> Generate a unique
              random password for each signup. Never reuse passwords — if one site is breached,
              attackers try the same credentials everywhere (credential stuffing).
            </p>
            <p>
              <strong className="text-neutral-200">Replacing weak passwords:</strong> If you are
              using common passwords, dictionary words, dates, or anything shorter than 12 characters,
              replace them with generated passwords immediately.
            </p>
            <p>
              <strong className="text-neutral-200">Master passwords:</strong> Use the Passphrase
              mode to create a memorable but strong master password for your password manager.
              A 5-word passphrase is both easy to type and extremely difficult to crack.
            </p>
            <p>
              <strong className="text-neutral-200">API keys and secrets:</strong> Use Password mode
              with 32-64 characters, letters and numbers only (disable symbols if the system requires
              alphanumeric). The cryptographic quality makes the output suitable for JWT secrets, webhook
              tokens, and encryption keys.
            </p>
            <p>
              <strong className="text-neutral-200">WiFi passwords:</strong> Use Passphrase mode
              to generate a readable 5-6 word passphrase for your home or office WiFi network.
              Easy to share with guests, hard to brute-force.
            </p>
            <p>
              <strong className="text-neutral-200">Team onboarding:</strong> Use the bulk generator
              to create 10 or 25 temporary passwords for new employee accounts, test environments,
              or staging credentials.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="password-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                <h3 className="text-sm font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="password-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
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
