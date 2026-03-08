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
];

export default function EmojiPickerPage() {
  return (
    <>
      <WebAppSchema
        name="Free Emoji Picker"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
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
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Search and copy emojis by name or category. See Unicode code points
          and shortcodes for every emoji. Click to copy. Free, no signup,
          works entirely in your browser.
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

        <AdSlot slot="before-footer" page="emoji-picker" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
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
