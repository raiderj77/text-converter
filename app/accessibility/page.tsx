import Link from "next/link";
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility statement for FlipMyCase outlining our commitment to making our text tools usable by everyone.",
  alternates: { canonical: `${SITE_URL}/accessibility` },
};

export default function AccessibilityPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Accessibility", href: "/accessibility" }]} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
        <h1>Accessibility Statement</h1>

      <p>
        FlipMyCase is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
      </p>

      <h2>Our Commitment</h2>
      <p>
        We use WCAG 2.1 Level AA as a design target. This statement is not a certification that every route or interaction currently conforms.
      </p>

      <h2>Measures Taken</h2>
      <p>To support accessibility, we have taken the following measures:</p>
      <ul>
        <li><strong>Semantic HTML:</strong> Using proper heading structure, landmarks, and ARIA attributes where appropriate.</li>
        <li><strong>Keyboard Navigation:</strong> Core navigation and tool controls are designed for keyboard use.</li>
        <li><strong>Color Contrast:</strong> The interface uses high-contrast light and dark themes.</li>
        <li><strong>Responsive Design:</strong> The site works on mobile, tablet, and desktop screens.</li>
        <li><strong>Focus Indicators:</strong> Visible focus styles for keyboard users.</li>
        <li><strong>Alternative Text:</strong> Meaningful images should include text alternatives.</li>
        <li><strong>Form Labels:</strong> Tool controls should expose accessible labels.</li>
      </ul>

      <h2>Areas for Improvement</h2>
      <p>
        We recognize that some areas of the site may still present accessibility challenges. We are actively working to address the following:
      </p>
      <ul>
        <li>Further testing with screen readers (NVDA, JAWS, VoiceOver)</li>
        <li>Enhanced support for users who rely on speech recognition software</li>
        <li>More detailed error messages for form validation</li>
      </ul>

      <h2>Feedback and Contact</h2>
      <p>
        We welcome your feedback on the accessibility of FlipMyCase. If you encounter any barriers or have suggestions for improvement, please contact us:
      </p>
      <ul>
        <li>Via our <Link href="/contact">Contact page</Link></li>
        <li>By email (if provided on the contact page)</li>
      </ul>
      <p>
        Accessibility reports are reviewed as capacity allows. A response or remediation time is not guaranteed.
      </p>

      <h2>Technical Specifications</h2>
      <p>
        Accessibility of FlipMyCase relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
      </p>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>WAI‑ARIA</li>
      </ul>
      <p>
        These technologies are relied upon for conformance with the accessibility standards used.
      </p>

      <h2>Assessment Approach</h2>
      <p>
        Current checks include source review and automated build safeguards. A complete independent accessibility audit and full assistive-technology test matrix have not been completed.
      </p>
      <ul>
        <li>Semantic source and metadata review</li>
        <li>Responsive production checks</li>
        <li>Build-time quality and lint checks</li>
      </ul>

      <h2>Date</h2>
        <p>
          This statement was created on February 20, 2026.
        </p>
      </div>
    </>
  );
}
