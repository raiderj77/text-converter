import { BreadcrumbSchema } from "@/components/seo/schema";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Text Case Converter explaining analytics, cookies, and data handling.",
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
        <h1>Privacy Policy</h1>
        <p className="text-sm text-gray-500 mt-1 mb-4 text-center">Last updated: March 16, 2026</p>

      <p>
        This website provides an online text case conversion tool. Your privacy matters.
      </p>

      <h2>Information We Collect</h2>
      <p>
        No account is required to use this site. We do not request names, email
        addresses, or other personal identifiers. All text conversions are
        processed entirely in your browser and are never transmitted to or
        stored on our servers.
      </p>
      <p>
        Through third-party services, the following categories of data may be
        automatically collected when you visit this site:
      </p>
      <ul>
        <li>
          <strong>Device and browser information</strong> — browser type,
          operating system, screen resolution, and language preferences.
        </li>
        <li>
          <strong>IP address</strong> — collected by analytics and advertising
          services; may be used to derive approximate (city-level) location.
        </li>
        <li>
          <strong>Usage data</strong> — pages visited, time on page, click
          patterns, and referral URLs.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong> — small text files
          stored on your device by analytics and advertising partners to
          remember preferences, measure performance, and personalize ads.
        </li>
      </ul>

      <h2>Local Storage</h2>
      <p>
        The site may store your last input text and theme preference locally in your browser
        so your session persists after refresh. This data does not leave your device.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics to understand aggregate traffic patterns such as page views,
        device types, and general usage trends. Analytics data is collected anonymously and
        does not personally identify individual visitors.
      </p>

      <h2>Advertising</h2>
      <p>
        This site may use Google AdSense or similar advertising partners. Advertising
        providers may use cookies and related technologies to deliver ads, measure
        performance, and improve relevance.
      </p>
      <p>
        You can learn more about how Google uses data from sites that use its services by
        visiting Google’s privacy documentation.
      </p>

      <h2>Third-Party Services</h2>
      <p>The following third-party services may receive data collected on this site:</p>
      <ul>
        <li>
          <strong>Google Analytics</strong> — collects anonymized usage and
          traffic data (page views, device type, approximate location).
        </li>
        <li>
          <strong>Google AdSense</strong> — collects device, cookie, and
          browsing data to deliver and measure advertisements.
        </li>
        <li>
          <strong>Microsoft Clarity</strong> — collects session replay and
          heatmap data (clicks, scrolls, mouse movements) for UX analysis. No
          keystrokes within text input fields are captured.
        </li>
      </ul>
      <p>Each service operates under its own privacy policy.</p>

      <h2>Data Retention</h2>
      <p>
        Because text conversions happen entirely in your browser, we retain no
        user-submitted content. Data collected by third-party services is
        retained according to their own policies:
      </p>
      <ul>
        <li>Google Analytics data is retained for up to 14 months.</li>
        <li>Google AdSense cookie data is retained for up to 13 months.</li>
        <li>Microsoft Clarity session data is retained for up to 30 days.</li>
      </ul>
      <p>
        Local storage data (such as theme preference) remains on your device
        until you clear your browser data.
      </p>

      <h2>Data Security</h2>
      <p>
        We do not store user-submitted text on external servers. While no online
        service can guarantee absolute security, this site is designed to minimize
        data collection.
      </p>

      <h2>Your Privacy Rights</h2>
      <p>
        Depending on your jurisdiction, you may have the following rights
        regarding your personal information:
      </p>
      <ul>
        <li>
          <strong>Right to Know / Access</strong> — request a copy of the
          personal information we have collected about you.
        </li>
        <li>
          <strong>Right to Delete</strong> — request deletion of your personal
          information.
        </li>
        <li>
          <strong>Right to Correct</strong> — request correction of inaccurate
          personal information.
        </li>
        <li>
          <strong>Right to Opt-Out</strong> — opt out of the sale or sharing of
          your personal information.
        </li>
        <li>
          <strong>Right to Limit Use of Sensitive Data</strong> — restrict how
          sensitive personal information is used.
        </li>
        <li>
          <strong>Right to Non-Discrimination</strong> — exercise any of these
          rights without receiving discriminatory treatment.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us using the
        information in the Contact section below.
      </p>

      <section id="california-privacy" aria-labelledby="california-heading">
        <h2 id="california-heading">California Privacy Rights (CCPA/CPRA)</h2>

        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) as amended
          by the California Privacy Rights Act (CPRA) grants you specific rights regarding your
          personal information. These rights are effective as of January 1, 2026.
        </p>

        <h3>Information We Collect</h3>
        <p>In the past 12 months we have collected the following categories of personal information:</p>
        <ul>
          <li><strong>Identifiers:</strong> IP address, browser type, and device identifiers collected via analytics and advertising.</li>
          <li><strong>Internet or network activity:</strong> Pages visited, text conversion tool usage, time on site.</li>
          <li><strong>Inferred data:</strong> Interests inferred from browsing behavior via advertising partners.</li>
        </ul>

        <h3>Sensitive Personal Information</h3>
        <p>
          As of January 1, 2026, California law defines an expanded category of sensitive personal
          information. <strong>FlipMyCase does not collect sensitive personal information.</strong>
          Text entered into our conversion tools is processed entirely in your browser and is never
          transmitted to our servers or any third party.
        </p>

        <h3>Data Minimization</h3>
        <p>
          We collect only the minimum personal information necessary to operate this service.
          We do not collect personal information beyond what is reasonably necessary and
          proportionate to the purposes disclosed in this policy.
        </p>

        <h3>How We Use Your Information</h3>
        <ul>
          <li>To display advertising through Google AdSense</li>
          <li>To analyze site traffic and improve tool performance via analytics</li>
          <li>To maintain site security and prevent fraud</li>
        </ul>
        <p>We do not sell your personal information. Sharing data with advertising partners may constitute &ldquo;sharing&rdquo; under CPRA — you may opt out using the methods below.</p>

        <h3>Your Rights as a California Resident</h3>
        <ul>
          <li><strong>Right to Know:</strong> Request disclosure of personal information collected in the past 12 months.</li>
          <li><strong>Right to Delete:</strong> Request deletion of personal information we have collected.</li>
          <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information.</li>
          <li><strong>Right to Opt-Out:</strong> Opt out of sharing your personal information for advertising. We honor Global Privacy Control (GPC) signals automatically.</li>
          <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of these rights.</li>
        </ul>

        <h3>Do Not Sell or Share My Personal Information</h3>
        <p>
          To opt out of sharing for advertising purposes, use a{' '}
          <a href="https://globalprivacycontrol.org/" rel="noopener noreferrer">Global Privacy Control (GPC)</a>-enabled
          browser, or contact us via the <a href="/contact">Contact page</a>.
        </p>

        <h3>How to Submit a Request</h3>
        <p>Contact us via the <a href="/contact">Contact page</a>. We will respond within 45 days.</p>

        <h3>Data Retention</h3>
        <p>Analytics data is retained for 26 months. Server logs are retained for 90 days. Text entered into tools is never stored beyond your browser session.</p>
      </section>

      <section id="state-privacy" aria-labelledby="state-heading">
        <h2 id="state-heading">Additional U.S. State Privacy Rights</h2>
        <p>
          Residents of the following states have privacy rights similar to California&apos;s CCPA/CPRA.
          To exercise your rights, contact us via the <a href="/contact">Contact page</a>.
          We will respond within the timeframe required by your state&apos;s law.
        </p>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Law</th>
              <th>Effective</th>
              <th>Key Rights</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Colorado</td><td>CPA</td><td>Jul 2023</td><td>Access, delete, correct, opt-out, portability</td></tr>
            <tr><td>Connecticut</td><td>CTDPA</td><td>Jul 2023</td><td>Access, delete, correct, opt-out, portability</td></tr>
            <tr><td>Virginia</td><td>VCDPA</td><td>Jan 2023</td><td>Access, delete, correct, opt-out</td></tr>
            <tr><td>Texas</td><td>TDPSA</td><td>Jul 2024</td><td>Access, delete, correct, opt-out</td></tr>
            <tr><td>Florida</td><td>FDBR</td><td>Jul 2024</td><td>Access, delete, correct, opt-out</td></tr>
            <tr><td>Montana</td><td>MTCPA</td><td>Oct 2024</td><td>Access, delete, correct, opt-out</td></tr>
            <tr><td>Oregon</td><td>OCPA</td><td>Jul 2024</td><td>Access, delete, correct, opt-out, portability</td></tr>
            <tr><td>Tennessee</td><td>TIPA</td><td>Jul 2025</td><td>Access, delete, correct, opt-out</td></tr>
            <tr><td>Minnesota</td><td>MNDPA</td><td>Jul 2025</td><td>Access, delete, correct, opt-out, portability</td></tr>
            <tr><td>Maryland</td><td>MODPA</td><td>Oct 2025</td><td>Access, delete, correct, opt-out; bans sale of sensitive data</td></tr>
            <tr><td>Indiana</td><td>IDCPA</td><td>Jan 2026</td><td>Access, delete, correct, opt-out</td></tr>
            <tr><td>Kentucky</td><td>KYCPA</td><td>Jan 2026</td><td>Access, delete, correct, opt-out</td></tr>
            <tr><td>Rhode Island</td><td>RIDPA</td><td>Jan 2026</td><td>Access, delete, correct, opt-out</td></tr>
          </tbody>
        </table>
        <p style={{ marginTop: '1rem' }}>
          We honor Global Privacy Control (GPC) signals from all states that require it.
          We do not sell personal information to third parties. We do not engage in targeted
          advertising using sensitive personal information.
        </p>
      </section>

      <h2>Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated periodically. Updates will be posted on this page.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about this Privacy Policy or to exercise your privacy
        rights, please email us at{" "}
        <a href="mailto:privacy@flipmycase.com">privacy@flipmycase.com</a>.
      </p>

        <p>Effective Date: January 1, 2026 | Last Reviewed: March 2026</p>
      </main>
    </>
  );
}
