import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import { BreadcrumbSchema } from "@/components/seo/schema";

export const metadata: Metadata = {
  title: "About Jason Ramirez — Your Friendly Developer LLC",
  description:
    "Jason Ramirez is a California-based web developer and the person behind FlipMyCase — 70+ free browser-based text tools, no signup, no tracking.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Jason Ramirez — Your Friendly Developer LLC",
    description:
      "Jason Ramirez is a California-based web developer and the person behind FlipMyCase — 70+ free browser-based text tools, no signup, no tracking.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jason Ramirez",
  jobTitle: "Web Developer",
  worksFor: {
    "@type": "Organization",
    name: "Your Friendly Developer LLC",
  },
  url: `${SITE_URL}/about`,
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <div className="mx-auto max-w-3xl px-4 py-8" style={{ lineHeight: 1.7 }}>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          About Jason Ramirez
        </h1>

        <div className="mt-6 text-sm text-neutral-300 space-y-4">
          <p>
            My name is Jason Ramirez. I'm a California-based web developer and the person behind
            FlipMyCase. Your Friendly Developer LLC is my company. I'm the only person in it.
          </p>
        </div>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">Why I Built FlipMyCase</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <p>I built FlipMyCase because I needed it and nothing good existed.</p>
            <p>
              When you're writing code or documentation, you switch between text formats constantly.
              camelCase for variables, snake_case for database columns, Title Case for headings,
              SCREAMING_SNAKE for constants. Converting between them by hand is the kind of
              low-stakes annoyance that interrupts your focus a dozen times a day. Most tools for
              this are either buried in a larger app you don't need, or hosted on sites that want
              you to create an account before you can paste three words of text.
            </p>
            <p>
              So I built the tools around local processing. Their conversion logic runs in your
              browser and does not intentionally send tool input to FlipMyCase application servers.
              The website is still hosted infrastructure, so ordinary page requests can create
              technical logs; browser extensions and device software also remain outside the site&apos;s
              control. The privacy policy explains which tools use browser storage.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">My Background</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <p>
              I've been building on the web since 2011, all self-taught. SEO and content writing
              first, then front-end development, then performance optimization, AI tooling, and UI
              design focused on making things people actually want to use. Most of what I know I
              learned by shipping something, watching it work or fail, and figuring out why. I still
              learn that way.
            </p>
            <p>
              The tools on this site started as things I actually needed. I kept running into the
              same friction points while writing code and content, building something to fix them,
              then realizing other people had the same problem. That's still how new tools get
              added: a real need, turned into something clean, released for free.
            </p>
            <p>
              Your Friendly Developer LLC is the company I run all of this under. FlipMyCase is the
              flagship, but I maintain a portfolio of free utility sites across different niches,
              all built on the same approach: browser-based, no signup, no paywall.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">What Makes These Tools Different</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <p>
              There are a lot of text tool sites out there. Most of them work fine. A few things
              worth knowing about why FlipMyCase is worth bookmarking:
            </p>
            <p>
              All 78 tools are free. No paid plan, no premium tier, and no feature gates.
              Google AdSense is not currently approved or enabled on this site.
            </p>
            <p>
              Privacy by architecture, not by policy. Because everything runs in your browser, your
              text is not intentionally transmitted to FlipMyCase servers. Optional analytics and
              session-recording scripts are currently disabled.
            </p>
            <p>
              Accessibility is an ongoing design goal. The site uses semantic structure, visible
              focus treatment, responsive layouts, and labeled controls, while the accessibility
              statement records the remaining audit limitations.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold">More Tools from Your Friendly Developer LLC</h2>
          <div className="mt-3 text-sm text-neutral-300 space-y-4">
            <p>FlipMyCase is one site in a small portfolio of free utilities I maintain:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a
                  href="https://fibertools.app"
                  className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
                >
                  FiberTools
                </a>
                : calculators and conversion tools for knitters and crocheters. Yarn weight, gauge,
                stitch counts, pattern conversions. Free, browser-based, no login.
              </li>
              <li>
                <a
                  href="https://creatorrevenuecalculator.com"
                  className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
                >
                  Creator Revenue Calculator
                </a>
                : YouTube and creator income estimations for content producers who want to
                understand the numbers without the hype.
              </li>
            </ul>
            <p>Same approach across all of them. Free, practical, runs in your browser.</p>
          </div>
        </section>

        <p className="mt-10 text-sm text-neutral-400 border-t border-neutral-700 pt-6">
          Your Friendly Developer LLC / California
        </p>

        <p className="mt-4 text-sm text-neutral-300">
          Questions or want to report a bug? Reach me at{" "}
          <a
            href="mailto:hello@flipmycase.com"
            className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
          >
            hello@flipmycase.com
          </a>{" "}
          or use the{" "}
          <Link href="/contact" className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors">
            contact form
          </Link>
          .
        </p>
      </div>
    </>
  );
}
