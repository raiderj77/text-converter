import { BreadcrumbSchema } from "@/components/seo/schema";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the Text Case Converter online tool.",
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms" }]} />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
        <h1>Terms of Service</h1>

      <p>
        By accessing and using FlipMyCase (&quot;the website&quot;), you agree to be bound by these
        Terms of Service. If you do not agree with any part of these terms, please do not
        use the website.
      </p>

      <h2>Description of Service</h2>
      <p>
        FlipMyCase provides free online text transformation and developer utility tools.
        All text processing happens in your browser — your content is never uploaded to
        our servers. The tools are provided for personal and commercial use at no charge.
      </p>

      <h2>Acceptable Use</h2>
      <p>You agree to the following when using this website:</p>
      <ul>
        <li>You are solely responsible for any content you paste into the tools.</li>
        <li>You will not use the website for any unlawful, harmful, or abusive purpose.</li>
        <li>You will not attempt to disrupt, overload, or interfere with the website&apos;s operation or infrastructure.</li>
        <li>You will not use automated scripts or bots to access the website in a manner that degrades the experience for other users.</li>
        <li>You will not attempt to circumvent any security measures or access restrictions.</li>
      </ul>

      <h2>No Warranty</h2>
      <p>
        This website and all tools are provided on an &quot;as is&quot; and &quot;as available&quot; basis
        without warranties of any kind, either express or implied, including but not limited
        to implied warranties of merchantability, fitness for a particular purpose, or
        non-infringement. We do not guarantee that the tools will produce error-free results
        or that the website will be available without interruption.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, the site owner and contributors
        shall not be liable for any direct, indirect, incidental, special, consequential,
        or punitive damages arising out of or related to your use of, or inability to use,
        this website or its tools. This includes, without limitation, damages for loss of
        data, profits, or business opportunities, even if advised of the possibility of
        such damages.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The website design, layout, original content, and functionality are protected by
        applicable intellectual property laws. You may freely use the tools for personal
        or commercial text processing. You may not copy, reproduce, or redistribute the
        website itself, its source code, or its design without prior written permission.
      </p>

      <h2>Third-Party Services and Advertising</h2>
      <p>
        This website may display advertisements served by Google AdSense and other
        third-party advertising networks. These services may use cookies and similar
        technologies to serve ads based on your prior visits. The use of advertising
        cookies is governed by our <a href="/privacy">Privacy Policy</a>. We are not
        responsible for the content or practices of any third-party advertisers.
      </p>

      <h2>Privacy</h2>
      <p>
        Your use of the website is also governed by our <a href="/privacy">Privacy Policy</a>,
        which describes how we handle cookies, analytics, and advertising data. By using the
        website, you acknowledge that you have read and understand the Privacy Policy.
      </p>

      <h2>Modifications to These Terms</h2>
      <p>
        We reserve the right to update or modify these Terms of Service at any time.
        Changes will be indicated by updating the &quot;Last updated&quot; date below.
        Your continued use of the website after any modifications constitutes acceptance
        of the revised terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms of Service shall be governed by and construed in accordance with the
        laws of the State of California, United States, without regard to its conflict
        of law provisions.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about these Terms of Service, please reach out through our{" "}
        <a href="/contact">Contact page</a>.
      </p>

        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 25, 2026</p>
      </main>
    </>
  );
}
