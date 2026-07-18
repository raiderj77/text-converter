import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the site owner with feedback or bug reports.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, lineHeight: 1.7 }}>
        <h1>Contact</h1>

      <p>
        Have a question, suggestion, or found something that doesn&apos;t work right?
        The site owner reviews messages as capacity allows.
      </p>

      <h2>How to Reach Us</h2>
      <p>
        The best way to get in touch is by email. A response time is not guaranteed.
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:hello@flipmycase.com" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
          hello@flipmycase.com
        </a>
      </p>

      <h2>What We Can Help With</h2>
      <ul>
        <li><strong>Bug reports</strong> &mdash; Something not converting correctly? Let us know with an example.</li>
        <li><strong>Feature requests</strong> &mdash; Need a text format or tool we don&apos;t have yet? We&apos;re always adding new ones.</li>
        <li><strong>General feedback</strong> &mdash; Suggestions for improving the tools, the site layout, or anything else.</li>
        <li><strong>Privacy requests</strong> &mdash; Data access, deletion, or opt-out requests under CCPA, GDPR, or other regulations.</li>
        <li><strong>Partnerships</strong> &mdash; Interested in linking to or integrating with FlipMyCase? Reach out.</li>
      </ul>

      <h2>What to Include in a Bug Report</h2>
      <p>
        To help us reproduce and fix the issue quickly, please include:
      </p>
      <ul>
        <li>The exact text you pasted (keep it short if possible, or use a similar example).</li>
        <li>The tool or format you selected (for example, snake_case or Title Case).</li>
        <li>The output you expected.</li>
        <li>The output you actually received.</li>
        <li>Your device type (desktop or mobile) and browser name (Chrome, Safari, Firefox, etc.).</li>
      </ul>

      <h2>Privacy Note</h2>
      <p>
        Please do not send sensitive or confidential information via email. If the text
        you are having trouble with is private, replace it with a similar example that
        demonstrates the same formatting issue. All text processing on FlipMyCase happens
        in your browser and is never stored on our servers.
      </p>

        <p className="text-sm text-gray-400 mt-1 mb-4 text-center">Last updated: March 25, 2026</p>
      </div>
    </>
  );
}
