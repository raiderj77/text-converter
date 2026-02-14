import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl, getLiveTools } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { PasswordGeneratorTool } from "@/components/tools/password-generator";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("password-generator")!;
const pageUrl = buildUrl("/password-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "password generator", "random password generator", "strong password generator",
    "secure password generator", "password generator online", "generate password",
    "password strength checker", "random password", "strong password",
    "password creator", "password maker", "bulk password generator",
    "password generator no symbols", "password entropy calculator",
    "cryptographic random password", "secure random password online free",
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
      "It uses your browser's built-in cryptographic random number generator (crypto.getRandomValues) to produce truly random passwords. You choose the length (4–128 characters) and which character sets to include: uppercase, lowercase, numbers, and symbols. The password is generated entirely in your browser — nothing is sent to any server.",
  },
  {
    question: "Are the passwords truly random?",
    answer:
      "Yes. The generator uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. This is the same randomness source used by password managers like 1Password and Bitwarden. It is far more secure than Math.random().",
  },
  {
    question: "How long should my password be?",
    answer:
      "At least 16 characters for important accounts. 20+ characters is recommended for maximum security. Each additional character exponentially increases the number of possible combinations, making brute-force attacks impractical. A 20-character password with all character sets has over 130 bits of entropy.",
  },
  {
    question: "What is password entropy?",
    answer:
      "Entropy measures the randomness of a password in bits. Higher entropy means more possible combinations and a stronger password. A password with 80+ bits of entropy is considered strong. With 128+ bits, it is practically unbreakable with current technology.",
  },
  {
    question: "Should I include symbols in my password?",
    answer:
      "Yes, when possible. Including symbols increases the character pool from ~62 (letters + numbers) to ~92 characters, significantly increasing entropy per character. However, some systems restrict which symbols are allowed. Use the 'Exclude Characters' field to remove any symbols a specific site does not accept.",
  },
  {
    question: "What are ambiguous characters and why exclude them?",
    answer:
      "Ambiguous characters are those that look similar in many fonts: 0 and O, 1 and l and I, and sometimes 5 and S. Excluding them makes passwords easier to read and type manually when copy-paste is not available, such as on another device.",
  },
  {
    question: "Can I generate multiple passwords at once?",
    answer:
      "Yes. Choose 1, 5, 10, or 25 passwords at a time. All are generated with the same settings and can be copied individually or all at once. This is useful for creating temporary passwords for team members, test accounts, or API keys.",
  },
  {
    question: "Is my password stored anywhere?",
    answer:
      "No. Your password exists only in your browser's memory until you navigate away or generate a new one. Nothing is stored in cookies, localStorage, or sent to any server. The source code is open — you can verify this yourself.",
  },
  {
    question: "What makes a strong password?",
    answer:
      "A strong password is long (16+ characters), random (not based on words or patterns), unique (not reused across sites), and includes a mix of character types (uppercase, lowercase, numbers, symbols). This generator produces all of these qualities automatically.",
  },
  {
    question: "How does the strength meter work?",
    answer:
      "The strength meter calculates entropy based on your password's length and the size of the character pool used. It rates passwords from Very Weak (under 30 bits) to Very Strong (128+ bits). The meter updates in real time as you change settings.",
  },
  {
    question: "Should I use a password manager instead?",
    answer:
      "Ideally, yes — use a password manager like 1Password, Bitwarden, or KeePass to store and auto-fill your passwords. But you still need to generate the passwords. This tool generates passwords using the same cryptographic quality as password managers, so you can use it to create passwords and then save them in your manager.",
  },
  {
    question: "Can I use this for API keys and tokens?",
    answer:
      "Yes. Set a length of 32–64 characters with letters and numbers (disable symbols if the system doesn't support them). The cryptographic randomness makes the output suitable for API keys, session tokens, secret keys, and other security-sensitive strings.",
  },
];

export default function PasswordGeneratorPage() {
  const tools = getLiveTools();

  return (
    <>
      <WebAppSchema
        name="Free Password Generator — Strong, Random, Secure"
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
          Free Password Generator — Strong, Random &amp; Secure
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Generate strong, random passwords using cryptographic randomness. Customize length
          (4–128 characters), character sets, and exclusions. See password strength in real
          time. Generate up to 25 passwords at once. Free, no signup, no data leaves your
          browser.
        </p>

        <div className="mt-4">
          <PasswordGeneratorTool />
        </div>

        <AdSlot slot="after-tool" page="password-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Generate a Strong Password
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Set the length.</strong> Use the slider
              or type a number between 4 and 128. For most accounts, 20 characters provides
              excellent security. For master passwords or encryption keys, use 32+.
            </p>
            <p>
              <strong className="text-neutral-200">2. Choose character sets.</strong> Enable
              uppercase (A-Z), lowercase (a-z), numbers (0-9), and symbols (!@#$%). All four
              enabled gives the highest entropy per character.
            </p>
            <p>
              <strong className="text-neutral-200">3. Exclude problematic characters.</strong> Type
              characters to exclude in the field (e.g., 0OlI1 to remove ambiguous characters,
              or specific symbols a website does not accept).
            </p>
            <p>
              <strong className="text-neutral-200">4. Generate and copy.</strong> Click the
              generate button or adjust any setting — passwords regenerate automatically.
              Click Copy next to any password to copy it to your clipboard.
            </p>
            <p>
              <strong className="text-neutral-200">5. Check the strength meter.</strong> The
              meter shows entropy in bits and a strength rating. Aim for Strong (80+ bits)
              or Very Strong (128+ bits) for important accounts.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Password Strength by Length
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Entropy increases with length and character pool size. Here is the approximate
            entropy for passwords using all four character sets (~92 characters):
          </p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { len: 8, bits: 52, label: "Medium", cls: "text-amber-400" },
              { len: 12, bits: 78, label: "Strong", cls: "text-green-400" },
              { len: 16, bits: 104, label: "Strong", cls: "text-green-400" },
              { len: 20, bits: 130, label: "Very Strong", cls: "text-emerald-400" },
            ].map((item) => (
              <div key={item.len} className="rounded-xl border border-white/10 bg-neutral-900 p-3 text-center">
                <div className="text-xl font-bold font-mono">{item.len}</div>
                <div className="text-xs text-neutral-400 mt-1">characters</div>
                <div className={`text-sm font-medium mt-2 ${item.cls}`}>
                  ~{item.bits} bits
                </div>
                <div className="text-xs text-neutral-500">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When to Use a Password Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">New accounts:</strong> Generate a unique
              random password for every new account. Never reuse passwords across sites —
              if one is breached, all your accounts are at risk.
            </p>
            <p>
              <strong className="text-neutral-200">Replacing weak passwords:</strong> If you
              are using common passwords, dictionary words, or passwords shorter than 12
              characters, replace them with generated passwords immediately.
            </p>
            <p>
              <strong className="text-neutral-200">Team and admin accounts:</strong> Generate
              strong passwords for shared accounts, admin panels, database access, and server
              SSH keys. Use the bulk generator to create multiple passwords at once.
            </p>
            <p>
              <strong className="text-neutral-200">API keys and tokens:</strong> Generate
              32–64 character alphanumeric strings for API keys, webhook secrets, JWT secrets,
              and session tokens. Disable symbols if the system requires alphanumeric only.
            </p>
            <p>
              <strong className="text-neutral-200">WiFi passwords:</strong> Generate a
              readable 20+ character password for your home or office WiFi. Exclude ambiguous
              characters to make it easier to type on devices without copy-paste.
            </p>
            <p>
              <strong className="text-neutral-200">Encryption passphrases:</strong> For
              full-disk encryption, password-protected archives, or GPG keys, use 32+
              character passwords with maximum entropy for the strongest possible protection.
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

        <AdSlot slot="before-footer" page="password-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Generate passwords here, then use our other tools to encode strings, format
            JSON, compare text, and more.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={t.slug === "" ? "/" : `/${t.slug}`}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
              >
                {t.emoji} {t.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
