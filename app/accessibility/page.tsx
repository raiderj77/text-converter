import Link from "next/link";

export const metadata = {
  title: "Accessibility Statement",
  description:
    "Accessibility statement for FlipMyCase outlining our commitment to making our text tools usable by everyone.",
};

export default function AccessibilityPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
      <h1>Accessibility Statement</h1>

      <p>
        FlipMyCase is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
      </p>

      <h2>Our Commitment</h2>
      <p>
        We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities, and user‑friendly for everyone.
      </p>

      <h2>Measures Taken</h2>
      <p>To support accessibility, we have taken the following measures:</p>
      <ul>
        <li><strong>Semantic HTML:</strong> Using proper heading structure, landmarks, and ARIA attributes where appropriate.</li>
        <li><strong>Keyboard Navigation:</strong> All interactive elements can be operated using a keyboard.</li>
        <li><strong>Color Contrast:</strong> Ensuring sufficient contrast between text and background colors.</li>
        <li><strong>Responsive Design:</strong> The site works on mobile, tablet, and desktop screens.</li>
        <li><strong>Focus Indicators:</strong> Visible focus styles for keyboard users.</li>
        <li><strong>Alternative Text:</strong> Providing alt text for meaningful images.</li>
        <li><strong>Form Labels:</strong> All form controls have associated labels.</li>
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
        We try to respond to accessibility feedback within 5 business days and to propose a solution within 10 business days when applicable.
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
        FlipMyCase assessed the accessibility of this website by the following approaches:
      </p>
      <ul>
        <li>Self‑evaluation using automated testing tools (axe, Lighthouse)</li>
        <li>Manual testing with keyboard‑only navigation</li>
        <li>Manual testing with browser zoom and high‑contrast modes</li>
      </ul>

      <h2>Formal Approval</h2>
      <p>
        This accessibility statement is approved by the site owner.
      </p>

      <h2>Date</h2>
      <p>
        This statement was created on February 20, 2026.
      </p>
    </main>
  );
}