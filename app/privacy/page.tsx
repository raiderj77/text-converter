export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
      <h1>Privacy Policy</h1>

      <p>
        This website, text-case-converter-beta.vercel.app, provides a text formatting tool.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>No account is required.</li>
        <li>We do not ask you to submit personal information to use the tool.</li>
        <li>Your text is processed in your browser. We do not store your input text on a server.</li>
      </ul>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics to understand basic usage such as page views and device types.
      </p>

      <h2>Advertising</h2>
      <p>
        We use Google AdSense to display ads. Ad providers may use cookies or similar
        technologies to show relevant ads and measure performance.
      </p>

      <h2>Third party services</h2>
      <p>
        Third party services used by this site include Google Analytics and Google AdSense.
        Their privacy practices are governed by their own policies.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about this policy, contact the site owner via the GitHub repository.
      </p>

      <p>Last updated: 2026-02-13</p>
    </main>
  );
}
