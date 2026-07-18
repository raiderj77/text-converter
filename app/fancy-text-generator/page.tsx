import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { FancyTextGeneratorTool } from "@/components/tools/fancy-text-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("fancy-text-generator")!;
const pageUrl = buildUrl("/fancy-text-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "fancy text generator", "cool text generator", "unicode text styles",
    "bold text generator", "italic text generator", "fancy fonts copy paste",
    "aesthetic text generator", "stylish text online", "unicode font converter",
    "text style changer", "bubble text generator", "small caps generator",
    "strikethrough text", "underline text generator", "fullwidth text",
    "monospace text generator", "upside down text", "superscript generator",
    "social media fonts", "cool fonts for instagram", "fancy letters copy paste",
    "unicode text converter", "free text generator",
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
    question: "How does the fancy text generator work?",
    answer:
      "The tool maps each letter you type to its Unicode equivalent across 12 different mathematical and decorative character blocks. The resulting characters are real Unicode code points, not images or custom fonts, so they render correctly in any app that supports Unicode. The mapping runs entirely in your browser with no server involved.",
  },
  {
    question: "Can I use fancy text on social media?",
    answer:
      "Yes. Because these are standard Unicode characters, they work on Instagram bios, Twitter/X posts, Facebook, TikTok, Discord, WhatsApp, Telegram, YouTube comments, and virtually any platform that supports text input. Some platforms may render certain characters differently depending on the font used.",
  },
  {
    question: "Are these custom fonts?",
    answer:
      "No. These are not fonts at all \u2014 they are Unicode characters from mathematical, phonetic, and symbol blocks that visually resemble styled versions of regular letters. Because they are real characters, they copy and paste anywhere without needing font installation.",
  },
  {
    question: "Why do some characters not convert?",
    answer:
      "Numbers, punctuation, and some special characters may not have equivalents in certain Unicode blocks. For example, Math Bold has bold digits (0\u20139), but Small Caps only covers lowercase letters. Characters without a mapping pass through unchanged.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Completely free, no signup, no account required. Use it as many times as you want. Your text is never sent to a server \u2014 everything runs in your browser.",
  },
  {
    question: "What styles are available?",
    answer:
      "The tool includes 12 styles: Math Bold, Math Italic, Bold Italic, Underline (combining character), Strikethrough (combining character), Small Caps, Superscript, Bubble/Circled, Wide/Fullwidth, Upside Down, Sans-Serif Bold, and Monospace. Each has a copy button and some link to dedicated tool pages.",
  },
  {
    question: "Can I use multiple styles at once?",
    answer:
      "Each style card shows your text in that specific style with its own copy button. You can copy any style independently. Some styles like underline and strikethrough use combining characters that can technically be layered, but that is best done by applying one, then pasting the result back in.",
  },
  {
    question: "Do these characters affect SEO or accessibility?",
    answer:
      "Unicode styled text is not readable by screen readers as normal text and is not indexed well by search engines. Use it for decorative purposes in social media, usernames, and bios. Avoid using it for important content, navigation, or body text on websites.",
  },
];

export default function FancyTextGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free Fancy Text Generator"
        description={tool.description}
        url={pageUrl}
        dateModified={"2026-07-12"}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Fancy Text Generator", href: "/fancy-text-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Fancy Text Generator — Cool Fonts Copy &amp; Paste
        </h1>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A fancy text generator transforms plain text into 12+ Unicode font styles including bold, italic, script, bubble, and more. Type your text below to see all available styles and copy any of them instantly.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <FancyTextGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="fancy-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">What Is a Fancy Text Generator?</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              A fancy text generator maps each regular letter (A&ndash;Z, a&ndash;z) to its
              equivalent in a Unicode mathematical or decorative character block. Regular
              &ldquo;A&rdquo; becomes Mathematical Bold &ldquo;𝐀&rdquo; (U+1D400), or Mathematical
              Script &ldquo;𝒜&rdquo; (U+1D49C), or Fraktur &ldquo;𝔄&rdquo; (U+1D504). These are
              real Unicode characters &mdash; not images, not fonts &mdash; so they copy and paste
              into any text field on any platform.
            </p>
            <p>
              You would use fancy text for social media bios (Instagram, TikTok, Twitter/X),
              distinctive usernames and display names, creative posts and comments, marketing copy
              on platforms without formatting, and branding elements. Because these are standard
              Unicode characters, the styling travels with the text regardless of the
              destination platform&apos;s formatting support.
            </p>
            <p>
              Underline and strikethrough use a different technique: combining characters. A
              combining character (like U+0332 for underline) is placed after each regular
              character, and the renderer draws them overlapping. This creates the visual effect
              without requiring a dedicated character block.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Code Examples for Unicode Text Transformation</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <div>
              <h3 className="text-base font-semibold">JavaScript</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-javascript">{`function toBoldUnicode(text) {
  return [...text].map(char => {
    const code = char.codePointAt(0);
    if (code >= 65 && code <= 90)  return String.fromCodePoint(code - 65 + 0x1D400); // A-Z
    if (code >= 97 && code <= 122) return String.fromCodePoint(code - 97 + 0x1D41A); // a-z
    if (code >= 48 && code <= 57)  return String.fromCodePoint(code - 48 + 0x1D7CE); // 0-9
    return char;
  }).join('');
}

console.log(toBoldUnicode('Hello World'));  // 𝐇𝐞𝐥𝐥𝐨 𝐖𝐨𝐫𝐥𝐝

// Multiple styles via code point offset
const styles = {
  bold:      (c) => c >= 65 && c <= 90 ? c - 65 + 0x1D400 : c >= 97 && c <= 122 ? c - 97 + 0x1D41A : c,
  italic:    (c) => c >= 65 && c <= 90 ? c - 65 + 0x1D434 : c >= 97 && c <= 122 ? c - 97 + 0x1D44E : c,
  fraktur:   (c) => c >= 65 && c <= 90 ? c - 65 + 0x1D504 : c >= 97 && c <= 122 ? c - 97 + 0x1D51E : c,
  monospace: (c) => c >= 65 && c <= 90 ? c - 65 + 0x1D670 : c >= 97 && c <= 122 ? c - 97 + 0x1D68A : c,
};

function transform(text, style) {
  const fn = styles[style];
  return [...text].map(ch => {
    const code = ch.codePointAt(0);
    const mapped = fn(code);
    return mapped !== code ? String.fromCodePoint(mapped) : ch;
  }).join('');
}

console.log(transform('Hello', 'fraktur'));    // 𝔅𝔢𝔩𝔩𝔬
console.log(transform('Hello', 'monospace'));  // 𝙷𝚎𝚕𝚕𝚘`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Python</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-python">{`def to_bold(text):
    result = []
    for char in text:
        code = ord(char)
        if 65 <= code <= 90:     # A-Z
            result.append(chr(code - 65 + 0x1D400))
        elif 97 <= code <= 122:  # a-z
            result.append(chr(code - 97 + 0x1D41A))
        elif 48 <= code <= 57:   # 0-9
            result.append(chr(code - 48 + 0x1D7CE))
        else:
            result.append(char)
    return ''.join(result)

def to_bubble(text):
    result = []
    for char in text:
        code = ord(char)
        if 65 <= code <= 90:     # A-Z -> Ⓐ-Ⓩ
            result.append(chr(code - 65 + 0x24B6))
        elif 97 <= code <= 122:  # a-z -> ⓐ-ⓩ
            result.append(chr(code - 97 + 0x24D0))
        else:
            result.append(char)
    return ''.join(result)

print(to_bold('Hello World'))    # 𝐇𝐞𝐥𝐥𝐨 𝐖𝐨𝐫𝐥𝐝
print(to_bubble('Hello World'))  # Ⓗⓔⓛⓛⓞ Ⓦⓞⓡⓛⓓ`}</code></pre>
            </div>
            <div>
              <h3 className="text-base font-semibold">Go</h3>
              <pre tabIndex={0} className="mt-2 rounded-lg bg-neutral-950 border border-white/10 p-4 text-xs font-mono overflow-x-auto"><code className="language-go">{`package main

import (
    "fmt"
    "strings"
)

func toBold(text string) string {
    var result strings.Builder
    for _, r := range text {
        switch {
        case r >= 'A' && r <= 'Z':
            result.WriteRune(r - 'A' + 0x1D400)
        case r >= 'a' && r <= 'z':
            result.WriteRune(r - 'a' + 0x1D41A)
        case r >= '0' && r <= '9':
            result.WriteRune(r - '0' + 0x1D7CE)
        default:
            result.WriteRune(r)
        }
    }
    return result.String()
}

func main() {
    fmt.Println(toBold("Hello World")) // 𝐇𝐞𝐥𝐥𝐨 𝐖𝐨𝐫𝐥𝐝
}`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Use the Fancy Text Generator
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Type or paste your text</strong> into
              the input box at the top. The tool accepts any text including letters,
              numbers, and punctuation. Click &quot;Load Example&quot; to see a demo.
            </p>
            <p>
              <strong className="text-neutral-200">2. Browse the style grid.</strong> Below
              the input, you will see 12 cards, each showing your text in a different
              Unicode style. All cards update live as you type.
            </p>
            <p>
              <strong className="text-neutral-200">3. Copy any style.</strong> Click the
              &quot;Copy&quot; button on any card to copy that styled text to your clipboard.
              Paste it into Instagram bios, Twitter posts, Discord messages, or anywhere.
            </p>
            <p>
              <strong className="text-neutral-200">4. Explore individual tools.</strong>{" "}
              Some style cards include an &quot;Open Tool&quot; link that takes you to a
              dedicated page for that style with more features and options.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding Unicode Text Styles
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">What is Unicode text styling?</strong>{" "}
              Unicode is the universal character encoding standard that defines over
              150,000 characters across every writing system. Within Unicode, there are
              mathematical and phonetic symbol blocks that contain characters visually
              identical to styled versions of the Latin alphabet. For example, the
              Mathematical Bold block (U+1D400) contains bold versions of A-Z that look
              like bold text but are technically different characters.
            </p>
            <p>
              <strong className="text-neutral-200">How is this different from HTML/CSS styling?</strong>{" "}
              When you bold text in a word processor or on a website, you are applying
              formatting to the same characters. Unicode styled text uses entirely
              different characters that happen to look bold, italic, etc. This means the
              styling travels with the text when you copy and paste it, regardless of the
              destination platform&apos;s formatting support.
            </p>
            <p>
              <strong className="text-neutral-200">Combining characters explained:</strong>{" "}
              Underline and strikethrough use a different technique called combining
              characters. A combining character (like U+0332 for underline) is placed after
              each regular character, and the renderer draws them overlapping. This creates
              the visual effect of underline or strikethrough without using a special
              character block.
            </p>
            <p>
              <strong className="text-neutral-200">Platform compatibility:</strong>{" "}
              Unicode styled text works on nearly all modern platforms including iOS,
              Android, Windows, macOS, and Linux. However, the visual rendering depends on
              the fonts installed on the viewer&apos;s device. Most systems ship with fonts
              that cover mathematical symbols, but some older devices or niche platforms
              may show placeholder boxes for unsupported characters.
            </p>
            <p>
              <strong className="text-neutral-200">Best practices:</strong> Use fancy text
              sparingly for visual impact — in usernames, bios, social media posts,
              comments, or creative projects. Avoid using it for body text on websites, as
              it hurts accessibility (screen readers cannot interpret styled Unicode as
              regular text) and search engines do not index it properly. Keep important
              content in plain text.
            </p>
            <p>
              <strong className="text-neutral-200">Privacy:</strong> This tool runs
              entirely in your browser using JavaScript. No text is transmitted to any
              server, and nothing is stored beyond your current session with optional
              localStorage persistence. Processing is instant regardless of input length.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="fancy-text-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            All Available Unicode Text Styles
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                title: "Math Bold",
                desc: "Uses the Mathematical Bold block (U+1D400+). Covers A-Z, a-z, and 0-9. Perfect for making text stand out in social media posts and bios.",
              },
              {
                title: "Math Italic",
                desc: "Uses the Mathematical Italic block (U+1D434+). Covers A-Z and a-z. Adds elegance to text for creative posts and artistic captions.",
              },
              {
                title: "Bold Italic",
                desc: "Combines bold and italic from the Mathematical Bold Italic block (U+1D468+). Maximum emphasis for headings and key phrases.",
              },
              {
                title: "Underline & Strikethrough",
                desc: "Uses combining characters (U+0332 and U+0336) placed after each character. Works with any text and stacks visually in most renderers.",
              },
              {
                title: "Small Caps & Superscript",
                desc: "Small caps maps lowercase to phonetic small capital letters. Superscript maps to modifier letters. Both create distinctive, compact text styles.",
              },
              {
                title: "Bubble, Fullwidth, Monospace",
                desc: "Bubble wraps letters in circles (U+24B6+). Fullwidth stretches characters (U+FF01+). Monospace uses the Mathematical Monospace block (U+1D670+).",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-3"
              >
                <div className="text-sm font-semibold">{item.title}</div>
                <p className="mt-1 text-xs text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="fancy-text-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About Fancy Text Generator
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

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Each style shown here has its own dedicated generator — bold, italic, bubble, wide, and small caps all go deeper than the preview above. Reach for those if you need multiple copy variants of one specific style.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/upside-down-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🙃 Upside Down Text
            </Link>
            <Link
              href="/bold-text-generator"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ✏️ Bold Text Generator
            </Link>
            <Link
              href="/text-reverser"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              ↔️ Text Reverser
            </Link>
            <Link
              href="/spongebob-case-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧽 SpongeBob Case
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
