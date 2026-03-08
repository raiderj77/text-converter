import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { ColorCodeConverterTool } from "@/components/tools/color-code-converter";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";

const tool = getToolBySlug("color-code-converter")!;
const pageUrl = buildUrl("/color-code-converter");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "hex to rgb converter", "rgb to hex", "hsl converter", "cmyk converter",
    "color code converter", "hex to hsl", "rgb to hsl", "color picker online",
    "wcag contrast checker", "color contrast ratio", "hex to cmyk",
    "css color converter", "web color tool", "accessibility color checker",
    "color format converter",
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
    question: "What is the difference between HEX, RGB, and HSL?",
    answer:
      "HEX uses a six-character hexadecimal string (e.g., #3B82F6) to represent red, green, and blue values. RGB uses decimal values from 0 to 255 for each channel (e.g., rgb(59, 130, 246)). HSL represents color as hue (0-360 degrees), saturation (0-100%), and lightness (0-100%), which is often more intuitive for picking and adjusting colors.",
  },
  {
    question: "What is CMYK and when should I use it?",
    answer:
      "CMYK stands for Cyan, Magenta, Yellow, and Key (black). It is a subtractive color model used in print design. When you send designs to a printer, colors are mixed using CMYK inks. Screen colors (RGB/HEX/HSL) can look different when printed, so converting to CMYK before printing helps ensure accurate color reproduction.",
  },
  {
    question: "What is a WCAG contrast ratio?",
    answer:
      "The WCAG (Web Content Accessibility Guidelines) contrast ratio measures the luminance difference between two colors. A ratio of 4.5:1 is required for normal text (AA level), 3:1 for large text (AA), and 7:1 for enhanced contrast (AAA). Higher ratios mean better readability for users with visual impairments.",
  },
  {
    question: "What does AA and AAA mean in WCAG?",
    answer:
      "AA is the minimum accessibility standard most websites should meet. It requires a 4.5:1 contrast ratio for normal text and 3:1 for large text. AAA is a stricter standard requiring 7:1 for normal text and 4.5:1 for large text. Meeting AAA is ideal but not always practical for all design elements.",
  },
  {
    question: "How do I find the HEX code for a color I see on a website?",
    answer:
      "You can use your browser's developer tools (right-click an element and select Inspect) to see CSS color values. Alternatively, use the color picker in this tool to visually match the color, then copy the HEX, RGB, HSL, or CMYK value you need.",
  },
  {
    question: "Can I convert a color from one format to another without losing accuracy?",
    answer:
      "Conversions between HEX, RGB, and HSL are lossless because they all represent the same color space (sRGB). CMYK conversion can introduce slight rounding differences because CMYK is a different color model designed for print. The converted values in this tool are as accurate as the math allows.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All color conversions and contrast calculations happen entirely in your browser using JavaScript. Nothing is sent to any server.",
  },
];

export default function ColorCodeConverterPage() {
  return (
    <>
      <WebAppSchema
        name="Free Color Code Converter"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Color Code Converter", href: "/color-code-converter" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">Color Code Converter</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free Color Code Converter
        </h1>
        <p className="mt-1 text-xs text-neutral-500">Last updated: March 2026</p>
        <p className="mt-2 text-sm text-neutral-300">
          Convert between HEX, RGB, HSL, and CMYK color formats instantly. Use the built-in
          color picker, live swatch preview, and WCAG contrast checker. Free, no signup,
          works entirely in your browser.
        </p>

        <div className="mt-3">
          <ToolActions />
        </div>

        <div className="mt-4">
          <ColorCodeConverterTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="color-code-converter" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Convert Color Codes Online
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Pick or enter a color.</strong> Use the
              HTML color picker to select a color visually, or type a value directly into any
              of the four format fields: HEX, RGB, HSL, or CMYK.
            </p>
            <p>
              <strong className="text-neutral-200">2. Watch all formats update.</strong> When
              you change any field, all other formats update instantly. The live swatch shows
              your current color so you can verify it visually.
            </p>
            <p>
              <strong className="text-neutral-200">3. Check contrast.</strong> The contrast
              checker shows your color&apos;s ratio against white and black backgrounds with WCAG
              AA and AAA pass/fail labels for both normal and large text sizes.
            </p>
            <p>
              <strong className="text-neutral-200">4. Copy your code.</strong> Click the Copy
              button next to any format to copy it to your clipboard, ready to paste into your
              CSS, design tool, or documentation.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Color Models Explained for Designers and Developers
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              Colors on screens and in print use different mathematical models to describe the
              same visual experience. Understanding these models helps you choose the right
              format for your project and ensures your colors look correct across devices and
              media.
            </p>
            <p>
              <strong className="text-neutral-200">RGB and HEX</strong> are the most common
              formats in web development. RGB defines colors by mixing red, green, and blue light
              at intensities from 0 to 255. HEX is simply a compact hexadecimal encoding of those
              same three values. A HEX code like #3B82F6 means 3B (59) red, 82 (130) green, and
              F6 (246) blue. Because monitors emit light, RGB is an additive color model: mixing
              all three channels at full intensity produces white.
            </p>
            <p>
              <strong className="text-neutral-200">HSL (Hue, Saturation, Lightness)</strong> was
              designed to be more intuitive for humans. Hue is the color angle on the color wheel
              (0 is red, 120 is green, 240 is blue). Saturation controls how vivid the color is,
              and lightness controls how bright it is. Designers often prefer HSL because adjusting
              lightness or saturation is more predictable than tweaking individual RGB channels.
              CSS natively supports hsl() syntax, making it easy to build dynamic color palettes
              by rotating the hue value.
            </p>
            <p>
              <strong className="text-neutral-200">CMYK (Cyan, Magenta, Yellow, Key)</strong> is
              a subtractive model used in printing. Unlike RGB, which starts from black and adds
              light, CMYK starts from white paper and subtracts light using ink. The Key channel
              (black) exists because mixing cyan, magenta, and yellow ink produces a muddy brown
              rather than true black. When preparing files for professional printing, converting
              your screen colors to CMYK helps avoid surprises. Colors that look vibrant on screen
              may appear duller in print because CMYK has a smaller color gamut than RGB.
            </p>
            <p>
              <strong className="text-neutral-200">Accessibility matters.</strong> Beyond choosing
              the right format, the contrast between text and background is critical for
              readability. The WCAG 2.1 standard defines minimum contrast ratios to ensure content
              is accessible to people with low vision or color blindness. Using a contrast checker
              during design prevents costly fixes later and makes your content usable by everyone.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="color-code-converter" />

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

        <AdSlot slot="before-footer" page="color-code-converter" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Convert colors here, then check out our other developer and design tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/number-base-converter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔢</div>
              <div className="mt-1 text-sm font-semibold">Number Base Converter</div>
              <p className="mt-1 text-xs text-neutral-400">Binary, hex, octal & decimal conversion</p>
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
              href="/csv-to-json"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">📋</div>
              <div className="mt-1 text-sm font-semibold">CSV to JSON</div>
              <p className="mt-1 text-xs text-neutral-400">Convert between CSV and JSON formats</p>
            </Link>
            <Link
              href="/json-formatter"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">{"{ }"}</div>
              <div className="mt-1 text-sm font-semibold">JSON Formatter</div>
              <p className="mt-1 text-xs text-neutral-400">Format, validate & beautify JSON data</p>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
