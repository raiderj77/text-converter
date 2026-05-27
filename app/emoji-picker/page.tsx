import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { EmojiPickerTool } from "@/components/tools/emoji-picker";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
const tool = getToolBySlug("emoji-picker")!;
const pageUrl = buildUrl("/emoji-picker");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "emoji picker", "copy paste emoji", "emoji search", "emoji keyboard online",
    "emoji unicode", "emoji shortcode", "emoji code point", "free emoji picker",
    "emoji list", "emoji categories", "emoji copy", "emoji tool online",
    "emoji name search", "smiley emoji", "flag emoji", "animal emoji",
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
    question: "How do I copy an emoji?",
    answer:
      "Click any emoji in the grid and it is instantly copied to your clipboard. You can then paste it anywhere with Ctrl+V (or Cmd+V on Mac). A brief confirmation message appears when the copy succeeds.",
  },
  {
    question: "What are emoji shortcodes?",
    answer:
      "Shortcodes like :thumbsup: or :fire: are text aliases used on platforms such as Slack, Discord, and GitHub. Instead of searching for the visual emoji, you type the shortcode and it converts automatically. This tool shows the shortcode for every emoji so you can use it on supported platforms.",
  },
  {
    question: "What is a Unicode code point?",
    answer:
      "A Unicode code point is the unique identifier assigned to each character in the Unicode standard. For example, the grinning face emoji has the code point U+1F600. Developers use code points when they need to reference emojis in source code, HTML entities, or documentation. This tool displays the code point for every emoji.",
  },
  {
    question: "How does the search work?",
    answer:
      "The search bar filters emojis by name, shortcode, or category in real time. For example, typing 'heart' shows all heart-related emojis, typing ':fire:' finds the fire emoji by shortcode, and typing 'food' shows the entire Food category. The search is case-insensitive.",
  },
  {
    question: "Does this tool store my recently used emojis?",
    answer:
      "Recently used emojis are stored in your browser session only. They appear in a dedicated section at the top for quick access. When you close the tab or refresh the page, the recently used list resets. Nothing is saved to your device or sent to any server.",
  },
  {
    question: "How many emojis are included?",
    answer:
      "This tool includes approximately 300 of the most popular and commonly used emojis across eight categories: Smileys, People, Animals, Food, Travel, Objects, Symbols, and Flags. The selection covers the emojis you are most likely to need for messaging, social media, and development.",
  },
  {
    question: "Can I use these emojis on social media?",
    answer:
      "Yes. Emojis copied from this tool are standard Unicode characters that work on virtually every platform including Twitter/X, Instagram, Facebook, TikTok, LinkedIn, WhatsApp, and iMessage. How the emoji looks may vary slightly between platforms because each one uses its own emoji font.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. This tool runs entirely in your browser. The emoji data is hardcoded in the page, the search is performed client-side, and the clipboard copy uses the browser Clipboard API. Nothing you search or copy is sent to any server.",
  },
  {
    question: "Do emojis look the same on all devices?",
    answer:
      "No. Apple, Google, Microsoft, and Samsung each design their own emoji art for the same Unicode code points. A grinning face (U+1F600) looks slightly different on iPhone vs Android vs Windows, though the meaning stays the same.",
  },
  {
    question: "Can I use emojis in code and databases?",
    answer:
      "Yes, but ensure your database uses UTF-8 (or utf8mb4 in MySQL). Emojis are multi-byte Unicode characters. Databases using latin1 or basic utf8 encoding will corrupt or reject emoji characters. In JavaScript, note that .length counts UTF-16 code units, not characters — use [...str].length for the true count.",
  },
  {
    question: "How do I open the emoji keyboard on my computer?",
    answer:
      "On Windows, press Win+. (period). On Mac, press Ctrl+Cmd+Space. On Linux, it varies by desktop environment. For a browser-based picker with search that works everywhere, use this tool.",
  },
  {
    question: "Can I use emojis in email subject lines?",
    answer:
      "Yes, and they can improve open rates. However, some email clients render emojis as squares or question marks. Stick to widely supported emojis (hearts, stars, arrows) and test across Gmail, Outlook, and Apple Mail before sending campaigns.",
  },
];

export default function EmojiPickerPage() {
  return (
    <>
      <WebAppSchema
        name="Free Emoji Picker"
        description={tool.description}
        url={pageUrl}
        dateModified={new Date().toISOString().substring(0,10)}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Emoji Picker", href: "/emoji-picker" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Emoji Picker</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Emoji Picker
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          An emoji picker lets you search, browse, and copy emojis by name or category with code points and shortcodes. Search or browse below to find and copy any emoji instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <EmojiPickerTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="emoji-picker" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is an Emoji Picker?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              An emoji picker is a searchable interface for browsing, finding, and copying emoji
              characters. Unlike image-based emoji references, a proper picker copies the actual
              Unicode character to your clipboard so you can paste it into any text field — social
              media, code editors, terminals, documents, and databases. Search by name
              (&quot;rocket&quot;), browse by category (smileys, animals, food, travel), and see the
              Unicode code point for each character.
            </p>
            <p>
              You would use an emoji picker when composing social media posts, adding emojis to
              commit messages and PR descriptions, inserting symbols into documents, finding the exact
              emoji among thousands of options, and looking up code points for development work.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Examples for Working with Emojis</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <div>
              <h3 className="text-base font-semibold">JavaScript</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-javascript">{`// Emoji is a Unicode character
const rocket = '🚀';
console.log(rocket.codePointAt(0).toString(16)); // 1f680
console.log('\\u{1F680}');                       // 🚀

// .length counts UTF-16 code units, not characters
console.log('🚀'.length);            // 2 (not 1!)
console.log([...'🚀'].length);       // 1 (correct)

// Detect emojis
const hasEmoji = (str) => /\\p{Extended_Pictographic}/u.test(str);

// Strip emojis
const removeEmojis = (str) =>
  str.replace(/\\p{Extended_Pictographic}/gu, '').trim();`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Python</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-python">{`# Emoji is a Unicode character — Python 3 handles length correctly
rocket = '🚀'
print(f'U+{ord(rocket):04X}')   # U+1F680
print(len('Hello 🚀'))          # 7 (correct)

# pip install emoji
import emoji
print(emoji.emojize(':rocket:'))         # 🚀
print(emoji.demojize('🚀'))             # :rocket:
print(emoji.emoji_count('Hello 🚀🌍')) # 2`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Go</h3>
              <pre className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-go">{`package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    rocket := "🚀"
    fmt.Printf("Code point: U+%04X\\n", []rune(rocket)[0]) // U+1F680

    text := "Hello 🚀"
    fmt.Println("Bytes:", len(text))                    // 10
    fmt.Println("Runes:", utf8.RuneCountInString(text)) // 7
}`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Real-World Emoji Use Cases</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">Social media content creation.</strong>{" "}
              Emojis increase engagement by 25–50% according to multiple studies. Use the emoji
              picker to find the perfect emoji without scrolling through a phone keyboard.
            </p>
            <p>
              <strong className="text-neutral-200">Git commits and PR descriptions.</strong>{" "}
              Many teams use emoji conventions: 🐛 bug fixes, ✨ new features, 🔧 config changes,
              📝 documentation. Search by name instead of memorizing code points.
            </p>
            <p>
              <strong className="text-neutral-200">Documentation and README files.</strong>{" "}
              GitHub renders emojis in Markdown. Adding ✅, ⚠️, and 📌 to READMEs improves
              scannability.
            </p>
            <p>
              <strong className="text-neutral-200">Database encoding verification.</strong>{" "}
              MySQL requires <code className="text-neutral-200">utf8mb4</code> charset (not{" "}
              <code className="text-neutral-200">utf8</code>, which only handles 3-byte characters)
              to store emoji characters correctly.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Common Emoji Mistakes</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">JavaScript .length is unreliable for emojis.</strong>{" "}
              The emoji &apos;🚀&apos; has <code className="text-neutral-200">.length</code> of 2
              because it uses a UTF-16 surrogate pair. Use{" "}
              <code className="text-neutral-200">[...str].length</code> for the true character count.
            </p>
            <p>
              <strong className="text-neutral-200">MySQL utf8 does not support emojis.</strong>{" "}
              Standard MySQL utf8 only handles 3-byte characters. Use{" "}
              <code className="text-neutral-200">utf8mb4</code> charset and{" "}
              <code className="text-neutral-200">utf8mb4_unicode_ci</code> collation.
            </p>
            <p>
              <strong className="text-neutral-200">Compound emojis have multiple code points.</strong>{" "}
              The family emoji 👨‍👩‍👧‍👦 is four people joined by zero-width joiners (ZWJ).
              Splitting or reversing these strings breaks them into individual components.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Emoji Picker
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Browse or search.</strong> Use
              the category tabs to browse emojis by group (Smileys, People, Animals,
              Food, Travel, Objects, Symbols, Flags) or type a keyword in the search
              bar to filter by name, shortcode, or category.
            </p>
            <p>
              <strong className="text-neutral-200">2. Click to copy.</strong> Click
              any emoji to copy it to your clipboard instantly. A brief confirmation
              appears so you know the copy worked.
            </p>
            <p>
              <strong className="text-neutral-200">3. Check details.</strong> Every
              emoji you click appears in the Emoji Details table below the grid,
              showing the emoji, its official name, Unicode code point, and shortcode.
            </p>
            <p>
              <strong className="text-neutral-200">4. Reuse quickly.</strong> Your
              recently used emojis appear at the top of the page for quick access.
              Click any of them to copy again without scrolling.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How Emojis Work Under the Hood
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Emojis are not images. They are Unicode characters, just like letters
              and numbers. When you type the letter &quot;A,&quot; your device looks up the
              character at code point U+0041 and renders it in the current font.
              Emojis work the same way. The grinning face is code point U+1F600, the
              red heart is U+2764, and the thumbs up is U+1F44D. Your operating
              system or app renders each code point as a colorful glyph using a
              built-in emoji font such as Apple Color Emoji, Noto Color Emoji
              (Android/Linux), or Segoe UI Emoji (Windows).
            </p>
            <p>
              <strong className="text-neutral-200">The Unicode Consortium.</strong> The
              nonprofit Unicode Consortium decides which emojis exist. Every year they
              review proposals and add new emojis in a major Unicode release. Once
              approved, operating system vendors design their own visual
              representations. That is why the same emoji can look different on an
              iPhone versus an Android phone or a Windows PC. The underlying code
              point is identical; only the rendering differs.
            </p>
            <p>
              <strong className="text-neutral-200">Shortcodes and platforms.</strong> Platforms
              like Slack, Discord, and GitHub introduced shortcodes (e.g., :fire:,
              :thumbsup:) as a quick way to insert emojis from a keyboard. You type
              the shortcode surrounded by colons and the platform replaces it with the
              corresponding emoji. Shortcodes are not standardized across platforms,
              so :thumbsup: on Slack might be :+1: on GitHub. This tool shows the
              most common shortcode variant for each emoji.
            </p>
            <p>
              <strong className="text-neutral-200">Combining characters and sequences.</strong> Some
              emojis are formed by combining multiple code points. Skin tone modifiers
              (U+1F3FB through U+1F3FF) attach to a base emoji to change its
              appearance. Flag emojis use two Regional Indicator Symbol letters
              (e.g., U+1F1FA U+1F1F8 for the US flag). The zero-width joiner (U+200D)
              glues characters together to create family, profession, and other
              compound emojis. This is why a single visible emoji can actually consist
              of several code points under the hood.
            </p>
            <p>
              <strong className="text-neutral-200">Emoji in development.</strong> Developers
              encounter emojis in APIs, databases, and user-generated content.
              Handling emoji correctly requires UTF-8 encoding (or UTF-16 in
              JavaScript), awareness that a single emoji can span multiple code units,
              and testing for proper rendering across platforms. When storing emojis
              in a MySQL database, the utf8mb4 character set is required because
              standard utf8 only supports code points up to U+FFFF, while most
              emojis live above U+1F000.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="emoji-picker" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Emoji Picker
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

        <AdSlot slot="before-footer" page="emoji-picker" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Copy emojis here, then explore our other text and Unicode tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/fancy-text-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">&#x2728;</div>
              <div className="mt-1 text-sm font-semibold">Fancy Text Generator</div>
              <p className="mt-1 text-xs text-neutral-400">12+ Unicode text styles to copy & paste</p>
            </Link>
            <Link
              href="/bold-text-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">&#x1D5D5;</div>
              <div className="mt-1 text-sm font-semibold">Bold Text Generator</div>
              <p className="mt-1 text-xs text-neutral-400">Generate bold Unicode text for social media</p>
            </Link>
            <Link
              href="/upside-down-text-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">&#x1F643;</div>
              <div className="mt-1 text-sm font-semibold">Upside Down Text</div>
              <p className="mt-1 text-xs text-neutral-400">Flip your text upside down for fun</p>
            </Link>
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">&#x1F510;</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Encode & decode Base64, URL, HTML & more</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
