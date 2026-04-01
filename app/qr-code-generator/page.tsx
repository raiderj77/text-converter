import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { QrCodeGeneratorTool } from "@/components/tools/qr-code-generator";
import { AdSlot } from "@/components/ui/ad-slot";
import { ToolActions } from "@/components/ui/tool-actions";
import ToolAnswerBlock from "@/components/ToolAnswerBlock";

const tool = getToolBySlug("qr-code-generator")!;
const pageUrl = buildUrl("/qr-code-generator");

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  alternates: { canonical: pageUrl },
  keywords: [
    "qr code generator", "qr code maker", "create qr code free",
    "qr code for url", "qr code for wifi", "qr code for email",
    "qr code for phone number", "download qr code png", "qr code online",
    "free qr code generator", "qr code creator", "generate qr code",
    "wifi qr code", "qr code no signup", "custom qr code",
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
    question: "What types of content can I encode in a QR code?",
    answer:
      "This tool supports five content types: URLs (website links), plain text, email addresses (creates a mailto: link), phone numbers (creates a tel: link), and WiFi credentials (SSID, password, and security type). Each format uses the appropriate protocol prefix for maximum scanner compatibility.",
  },
  {
    question: "What size QR code should I choose?",
    answer:
      "128px works well for small displays and digital use. 256px is the default and works for most purposes including printing on documents. 512px provides the highest quality for large prints, posters, and banners. For print, a larger size ensures the code remains scannable even at a distance.",
  },
  {
    question: "What does error correction level mean?",
    answer:
      "Error correction allows a QR code to remain scannable even if part of it is damaged or obscured. Low (L) recovers 7% of data, Medium (M) recovers 15%, Quartile (Q) recovers 25%, and High (H) recovers 30%. Higher correction means a denser code but better resilience. Medium is recommended for most uses.",
  },
  {
    question: "Can I download the QR code?",
    answer:
      "Yes. Click the \"Download PNG\" button to save the QR code as a PNG image file at your selected resolution. You can also copy the QR code image directly to your clipboard using the Copy button.",
  },
  {
    question: "How do WiFi QR codes work?",
    answer:
      "WiFi QR codes encode your network name (SSID), password, and security type (WPA/WPA2, WEP, or open) in a special format. When someone scans the code with their phone camera, it automatically offers to connect to your network without typing the password. This is perfect for guest networks, offices, and events.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "The QR code is generated client-side using a JavaScript library loaded from a CDN. Your input data is never sent to any server. The library runs entirely in your browser, and your settings are saved to local storage for convenience.",
  },
  {
    question: "What is the maximum content length for a QR code?",
    answer:
      "QR codes can technically hold up to about 4,296 alphanumeric characters, but practical limits depend on the error correction level and the scanner being used. For best results, keep URLs under 500 characters and text under 1,000 characters. Shorter content produces smaller, more easily scannable codes.",
  },
];

export default function QrCodeGeneratorPage() {
  return (
    <>
      <WebAppSchema
        name="Free QR Code Generator"
        description={tool.description}
        url={pageUrl}
        dateModified="2026-03-07"
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "QR Code Generator", href: "/qr-code-generator" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <nav className="mb-4 text-xs text-neutral-400" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-neutral-200 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-neutral-200" aria-current="page">QR Code Generator</li>
          </ol>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Free QR Code Generator
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>
        <p className="tool-answer-capsule mt-2 text-[15px] leading-relaxed text-neutral-400">
          A QR code generator creates scannable QR codes for URLs, text, email, phone numbers, and WiFi networks. Enter your content below and download the QR code as a PNG image.
        </p>

        <ToolAnswerBlock slug="qr-code-generator" />

        <div className="mt-3">
          <ToolActions />
        </div>

        {/* Descriptive headings for screen readers */}

        <div className="sr-only">

          <h2>How to Use the QR Code Generator Tool</h2>

          <h2>QR Code Generator Features and Options</h2>

          <h2>About the Free Online QR Code Generator</h2>

        </div>


        <div className="mt-4">
          <QrCodeGeneratorTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="qr-code-generator" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            How to Generate a QR Code
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              <strong className="text-neutral-200">1. Choose your content type.</strong> Select
              URL, Text, Email, Phone, or WiFi depending on what you want to encode.
              Each type uses the correct format so scanners handle it properly.
            </p>
            <p>
              <strong className="text-neutral-200">2. Enter your content.</strong> Type or
              paste the URL, text, email address, phone number, or WiFi credentials. For
              WiFi, enter the network name (SSID), password, and security type.
            </p>
            <p>
              <strong className="text-neutral-200">3. Configure options.</strong> Select
              the QR code size (128, 256, or 512 pixels) and error correction level
              (Low, Medium, Quartile, or High). Medium error correction works well for
              most uses.
            </p>
            <p>
              <strong className="text-neutral-200">4. Generate and download.</strong> Click
              &quot;Generate QR Code&quot; to create the code, then download as PNG or copy
              the image to your clipboard.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Understanding QR Code Technology
          </h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-2">
            <p>
              QR codes (Quick Response codes) were invented in 1994 by Denso Wave, a
              subsidiary of Toyota, to track automotive parts during manufacturing. Unlike
              traditional barcodes that store data in one dimension, QR codes use a
              two-dimensional grid of black and white squares to encode information both
              horizontally and vertically. This allows them to store significantly more
              data in a smaller space.
            </p>
            <p>
              <strong className="text-neutral-200">How QR codes store data.</strong> A QR
              code consists of several key components: finder patterns (the three large
              squares in the corners) that help scanners locate and orient the code, timing
              patterns that establish the grid spacing, format information that tells the
              scanner which error correction level is used, and the data area where your
              content is encoded. The encoding process converts your text into a binary
              stream, applies Reed-Solomon error correction, and maps the result onto the
              grid pattern.
            </p>
            <p>
              <strong className="text-neutral-200">Error correction explained.</strong> One
              of the most powerful features of QR codes is built-in error correction using
              Reed-Solomon codes. This means a QR code can be partially damaged, dirty, or
              obscured and still be successfully scanned. The four levels of error correction
              range from Low (7% recovery) to High (30% recovery). Higher error correction
              produces denser codes but provides better resilience. This is why some QR codes
              can have logos placed in the center without losing functionality.
            </p>
            <p>
              <strong className="text-neutral-200">Common applications.</strong> QR codes
              have become ubiquitous in modern life. Restaurants use them for digital menus.
              Retailers use them for contactless payments. Event organizers encode ticket
              information. Businesses print them on marketing materials to link to websites.
              WiFi QR codes eliminate the need to share passwords manually. Museums and
              galleries use them to provide additional information about exhibits. The
              COVID-19 pandemic accelerated QR code adoption worldwide as businesses sought
              touchless alternatives for menus, check-ins, and payments.
            </p>
            <p>
              <strong className="text-neutral-200">Best practices.</strong> For reliable
              scanning, ensure adequate contrast between the code and its background (black
              on white works best). Maintain a quiet zone (white border) around the code.
              Test your QR code with multiple devices before printing or distributing.
              Use Medium or High error correction if the code will be printed on surfaces
              that might get scratched or dirty. Keep encoded content as short as possible
              for faster scanning and smaller codes.
            </p>
          </div>
        </section>

        <AdSlot slot="mid-content" page="qr-code-generator" />

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Frequently Asked Questions About QR Code Generator
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

        <AdSlot slot="before-footer" page="qr-code-generator" />

        {/* Related Tools */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">Related Free Online Tools</h2>
          <p className="mt-2 text-sm text-neutral-300">
            Generate QR codes here, then explore our other utility tools.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/string-encoder"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🔐</div>
              <div className="mt-1 text-sm font-semibold">String Encoder</div>
              <p className="mt-1 text-xs text-neutral-400">Encode & decode Base64, URL, HTML & more</p>
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
              href="/uuid-generator"
              className="rounded-xl border border-white/10 p-4 hover:bg-white/5 transition-colors block"
            >
              <div className="text-lg">🆔</div>
              <div className="mt-1 text-sm font-semibold">UUID Generator</div>
              <p className="mt-1 text-xs text-neutral-400">Generate random UUID v4 identifiers</p>
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
