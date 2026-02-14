export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Text Case Converter explaining analytics, cookies, and data handling.",
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
      <h1>Privacy Policy</h1>

      <p>
        This website provides an online text case conversion tool. Your privacy matters.
      </p>

      <h2>Personal Information</h2>
      <ul>
        <li>No account is required to use this site.</li>
        <li>We do not request names, email addresses, or other personal identifiers.</li>
        <li>Your input text is processed in your browser and is not stored on our servers.</li>
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

      <h2>Third Party Services</h2>
      <p>
        Third party services used by this website may include Google Analytics and
        Google AdSense. Each service operates under its own privacy policy.
      </p>

      <h2>Data Security</h2>
      <p>
        We do not store user-submitted text on external servers. While no online
        service can guarantee absolute security, this site is designed to minimize
        data collection.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated periodically. Updates will be posted on this page.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about this Privacy Policy, contact the site owner via the Contact page.
      </p>

      <p>Last updated: 2026-02-13</p>
    </main>
  );
}
