import type { Metadata } from "next";
import Link from "next/link";
import { getToolBySlug, buildUrl } from "@/lib/config";
import { WebAppSchema, FaqSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AllCapsGuideTool } from "@/components/tools/all-caps-guide";
import { AdSlot } from "@/components/ui/ad-slot";

const tool = getToolBySlug("all-caps-guide")!;
const pageUrl = buildUrl("/all-caps-guide");

export const metadata: Metadata = {
  title: "All Caps in Writing: When It's Rude vs Necessary — Complete Guide to UPPERCASE Usage",
  description: "Learn when ALL CAPS is rude vs necessary in writing. Complete guide to uppercase usage in emails, social media, coding, and professional communication. Free online guide with examples.",
  alternates: { canonical: pageUrl },
  keywords: [
    "all caps rude or necessary", "when to use all caps writing", "uppercase writing etiquette",
    "is all caps yelling", "professional email all caps", "social media all caps rules",
    "all caps in coding", "SQL keywords uppercase", "constant variables uppercase",
    "acronyms uppercase rules", "headlines all caps", "legal documents all caps",
    "all caps accessibility", "screen readers all caps", "all caps vs title case",
    "when is all caps acceptable", "all caps communication guide", "uppercase best practices",
    "all caps in design", "typography all caps usage",
  ],
  openGraph: {
    title: "All Caps in Writing: When It's Rude vs Necessary — Complete Guide to UPPERCASE Usage",
    description: "Learn when ALL CAPS is rude vs necessary in writing. Complete guide to uppercase usage in emails, social media, coding, and professional communication. Free online guide with examples.",
    url: pageUrl,
    type: "website",
  },
};

const faqItems = [
  {
    question: "Is writing in ALL CAPS considered yelling?",
    answer:
      "Yes, in most digital communication, ALL CAPS is interpreted as shouting or yelling. This convention comes from early internet forums and email where caps were used for emphasis. In professional contexts, all caps can seem aggressive, angry, or unprofessional unless used sparingly for specific purposes.",
  },
  {
    question: "When is it acceptable to use all caps?",
    answer:
      "All caps is acceptable for: 1) Acronyms and abbreviations (NASA, FBI), 2) Legal documents (for important terms), 3) Headlines and titles in design, 4) Code (SQL keywords, constants), 5) Warning labels and safety signs, 6) Logos and branding elements. The key is intentional, context-aware usage.",
  },
  {
    question: "How do screen readers handle all caps text?",
    answer:
      "Screen readers may read all caps text letter-by-letter (N-A-S-A) or with a different tone. Some users find this distracting or difficult to understand. For accessibility, use all caps sparingly and consider adding `aria-label` attributes for screen readers when necessary.",
  },
  {
    question: "What's the difference between all caps and small caps?",
    answer:
      "ALL CAPS uses full-height uppercase letters. Small caps uses uppercase-style letters at lowercase height (ᴬᴸᴸ ᶜᴬᴾˢ). Small caps is more elegant for titles and headings in print design, while all caps is bolder and more attention-grabbing. Small caps isn't widely supported in web typography.",
  },
  {
    question: "Should I use all caps in professional emails?",
    answer:
      "Generally avoid all caps in professional emails. It can seem aggressive or unprofessional. If you need emphasis, use **bold**, *italics*, or strategic word choice instead. The only exception might be VERY IMPORTANT warnings that need immediate attention, and even then, use sparingly.",
  },
  {
    question: "How do different cultures view all caps?",
    answer:
      "Western cultures generally see all caps as shouting. In some Asian languages, all caps doesn't carry the same connotation since their writing systems work differently. However, with global internet culture, the 'all caps = yelling' convention is becoming widespread internationally.",
  },
  {
    question: "What about all caps in code and programming?",
    answer:
      "In programming, all caps has specific meanings: 1) Constants (MAX_RETRIES), 2) SQL keywords (SELECT, FROM), 3) Environment variables (API_KEY), 4) Macro definitions in C/C++. These are technical conventions, not shouting. Mixing these with regular code in all caps would be confusing.",
  },
  {
    question: "Can all caps improve readability?",
    answer:
      "For short text (headlines, labels, buttons), all caps can improve visibility and hierarchy. For long text, all caps REDUCES readability by 10-20% because lowercase letters have more distinctive shapes (ascenders and descenders) that help our brains recognize words faster.",
  },
];

export default function AllCapsGuidePage() {
  return (
    <>
      <WebAppSchema
        name="All Caps Usage Guide"
        description={tool.description}
        url={pageUrl}
      />
      <FaqSchema items={faqItems} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "All Caps Guide", href: "/all-caps-guide" },
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          All Caps in Writing: When It's Rude vs Necessary
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Complete guide to uppercase usage in digital communication, professional writing,
          coding, and design. Learn when ALL CAPS is appropriate vs when it's considered shouting,
          with real-world examples and best practices.
        </p>

        <div className="mt-4">
          <AllCapsGuideTool />
        </div>

        {/* ========== SEO CONTENT ========== */}

        <AdSlot slot="after-tool" page="all-caps-guide" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            The Psychology of ALL CAPS: Why We Read It as Shouting
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Visual dominance:</strong> Uppercase letters
              occupy more vertical space and have uniform height, making them visually dominant
              on the page. This visual weight translates psychologically as vocal weight —
              louder, more forceful speech.
            </p>
            <p>
              <strong className="text-neutral-200">Internet heritage:</strong> The convention
              dates to early text-based systems (BBS, IRC, email) where formatting options were
              limited. Users adopted ALL CAPS as the digital equivalent of raising one's voice.
              This became standardized across decades of online communication.
            </p>
            <p>
              <strong className="text-neutral-200">Cognitive processing:</strong> Our brains
              process lowercase text faster because letter shapes are more distinctive (compare
              'p' vs 'd' vs 'b'). ALL CAPS requires slightly more cognitive effort, which
              subconsciously registers as 'something demanding attention.'
            </p>
            <p>
              <strong className="text-neutral-200">Social reinforcement:</strong> Like any
              linguistic convention, the meaning is reinforced by community usage. When everyone
              in a forum interprets ALL CAPS as shouting, newcomers learn the same convention.
              It's now embedded in digital culture worldwide.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When ALL CAPS Is Appropriate (Necessary Usage)
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                category: "Acronyms & Abbreviations",
                examples: ["NASA", "FBI", "CEO", "HTML", "PDF"],
                explanation: "Standard convention for initialisms and acronyms. NASA not Nasa, FBI not Fbi.",
                appropriateness: "Required",
              },
              {
                category: "Legal Documents",
                examples: ["TERMS AND CONDITIONS", "LIMITATION OF LIABILITY", "INDEMNIFICATION"],
                explanation: "Used for important defined terms and section headings. Makes key terms stand out.",
                appropriateness: "Standard Practice",
              },
              {
                category: "Code & Programming",
                examples: ["MAX_RETRIES", "SELECT * FROM", "API_KEY", "#define CONSTANT"],
                explanation: "Constants, SQL keywords, environment variables. Technical convention, not shouting.",
                appropriateness: "Required by Convention",
              },
              {
                category: "Safety & Warnings",
                examples: ["DANGER: HIGH VOLTAGE", "WARNING: HOT SURFACE", "CAUTION: WET FLOOR"],
                explanation: "Immediate visual attention for safety-critical information.",
                appropriateness: "Best Practice",
              },
              {
                category: "Headlines & Design",
                examples: ["BREAKING NEWS", "SALE ENDS SOON", "NEW COLLECTION"],
                explanation: "Creates visual hierarchy and emphasis in layouts. Short phrases only.",
                appropriateness: "Design Choice",
              },
              {
                category: "Logos & Branding",
                examples: ["IBM", "NASA", "CNN", "H&M"],
                explanation: "Many brands use all caps logos for bold, memorable identity.",
                appropriateness: "Brand Decision",
              },
            ].map((item) => (
              <div
                key={item.category}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <div className="text-sm font-semibold">{item.category}</div>
                <div className="mt-2 font-mono text-sm tracking-wider">{item.examples.join(", ")}</div>
                <p className="mt-2 text-xs text-neutral-400">{item.explanation}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                    {item.appropriateness}
                  </span>
                  <span className="text-xs text-neutral-500">Appropriate</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="mid-content" page="all-caps-guide" />

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            When ALL CAPS Is Problematic (Rude or Ineffective)
          </h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                category: "Professional Emails",
                problem: "Seems aggressive, unprofessional",
                example: "I NEED THIS REPORT BY 5 PM TODAY!!!",
                better: "I need this report by 5 PM today. Thank you.",
                severity: "High",
              },
              {
                category: "Social Media Posts",
                problem: "Appears shouty, attention-seeking",
                example: "OMG YOU GUYS HAVE TO SEE THIS!!!",
                better: "This is amazing — you have to see it!",
                severity: "Medium",
              },
              {
                category: "Long-Form Content",
                problem: "Reduces readability by 10-20%",
                example: "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG...",
                better: "The quick brown fox jumps over the lazy dog...",
                severity: "High",
              },
              {
                category: "Customer Service",
                problem: "Seems angry, confrontational",
                example: "YOUR ORDER IS DELAYED. WE DON'T KNOW WHEN IT WILL SHIP.",
                better: "Your order is delayed. We'll update you as soon as we have shipping information.",
                severity: "High",
              },
              {
                category: "Academic Writing",
                problem: "Violates style guides, unprofessional",
                example: "THIS PAPER EXAMINES THE IMPACT OF CLIMATE CHANGE...",
                better: "This paper examines the impact of climate change...",
                severity: "High",
              },
              {
                category: "Text Messages",
                problem: "Can damage relationships",
                example: "WHERE ARE YOU??? WE'VE BEEN WAITING FOR 30 MINUTES!",
                better: "Just checking in — we've been waiting about 30 minutes.",
                severity: "High",
              },
            ].map((item) => (
              <div
                key={item.category}
                className="rounded-xl border border-white/10 bg-neutral-900 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm font-semibold">{item.category}</div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.severity === "High" 
                      ? "bg-red-500/20 text-red-400" 
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {item.severity} severity
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">{item.problem}</p>
                <div className="mt-3 space-y-2">
                  <div>
                    <span className="text-xs text-neutral-500">Problematic:</span>
                    <div className="mt-1 p-2 bg-red-500/10 rounded text-sm font-mono tracking-wider">
                      {item.example}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500">Better:</span>
                    <div className="mt-1 p-2 bg-green-500/10 rounded text-sm">
                      {item.better}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">
            Accessibility Considerations for ALL CAPS
          </h2>
          <div className="mt-3 text-sm text-neutral-400 space-y-2">
            <p>
              <strong className="text-neutral-200">Screen reader behavior:</strong> Some screen
              readers announce "capitals" before reading all caps text, while others may spell
              out letters individually. This can be disorienting for users. For accessibility,
              use all caps sparingly and test with screen readers.
            </p>
            <p>
              <strong className="text-neutral-200">Dyslexia and reading difficulties:</strong>
              ALL CAPS text can be particularly challenging for people with dyslexia or other
              reading difficulties. The uniform letter height removes visual cues that help
              distinguish words. Consider your audience before using all caps extensively.
            </p>
            <p>
              <strong className="text-neutral-200">Cognitive load:</strong> Reading all caps
              requires more cognitive effort for everyone, not just those with disabilities.
              For important information that needs to be understood quickly, sentence case or
              title case is often more effective.
            </p>
            <p>
              <strong className="text-neutral-200">Best practices:</strong> 1) Use `aria-label`
              to provide a more readable version for screen readers, 2) Keep all caps text
              short, 3) Provide alternatives for critical information, 4) Test with actual
              assistive technology users when possible.
            </p>
          </div>
        </section>

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
                <p className="mt-2 text-sm text-neutral-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="before-footer" page="all-caps-guide" />

        {/* Internal linking */}
        <section className="mt-10">
          <h2 className="text-lg sm:text-xl font-semibold">More Free Text Tools</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Learn about all caps usage here, then use our other tools for text conversion,
            cleaning, and analysis.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Case Converter
            </Link>
            <Link
              href="/toggle-case-converter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🔄 Toggle Case
            </Link>
            <Link
              href="/underscore-conventions"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📘 Underscore Guide
            </Link>
            <Link
              href="/word-counter"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              📊 Word Counter
            </Link>
            <Link
              href="/text-cleaner"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🧹 Text Cleaner
            </Link>
            <Link
              href="/duplicate-line-remover"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              🗑️ Duplicate Remover
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}