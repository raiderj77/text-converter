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

      <h2>Do Not Sell or Share My Personal Information</h2>
      <p>
        We do not sell your personal information in the traditional sense.
        However, under the California Consumer Privacy Act (CCPA) and similar
        state laws, the use of advertising cookies by third-party ad networks
        (such as Google AdSense) may be considered a &ldquo;sale&rdquo; or
        &ldquo;sharing&rdquo; of personal information.
      </p>
      <p>
        You can opt out of personalized advertising by adjusting your cookie
        preferences via our cookie consent banner, or by using the{" "}
        <a
          href="https://optout.aboutads.info/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Digital Advertising Alliance opt-out tool
        </a>
        .
      </p>

      <h2>Global Privacy Control (GPC)</h2>
      <p>
        We honor Global Privacy Control (GPC) signals. If your browser sends a
        GPC signal, we treat it as a valid opt-out request for the sale or
        sharing of your personal information under applicable state privacy
        laws.
      </p>

      <h2>Sensitive Personal Information</h2>
      <p>
        This site does not collect, process, or store sensitive personal
        information as defined under the CCPA (effective January 2026),
        including but not limited to: mental or physical health data, biometric
        or genetic data, precise geolocation, citizenship or immigration
        status, Social Security numbers, financial account credentials, racial
        or ethnic origin, religious beliefs, or sexual orientation.
      </p>

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

        <p>Last updated: 2026-03-11</p>
      </main>
    </>
  );
}
