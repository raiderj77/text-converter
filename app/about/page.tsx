export const metadata = {
  title: "About",
  description: "About the Text Case Converter tool and how it handles your text.",
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, lineHeight: 1.7 }}>
      <h1>About</h1>

      <p>
        Text Case Converter is a utility site built to save you time. You paste text once and instantly get
        multiple formatting outputs you can copy with one click.
      </p>

      <h2>What it supports</h2>
      <ul>
        <li>Uppercase, lowercase, title case, and sentence case</li>
        <li>camelCase and PascalCase</li>
        <li>snake_case and kebab-case</li>
        <li>Slug output for URLs</li>
      </ul>

      <h2>How your text is handled</h2>
      <p>
        Your input text is processed in the browser. The site does not require an account and is designed
        so your pasted text stays on your device.
      </p>

      <h2>Site analytics</h2>
      <p>
        The site uses basic analytics to understand traffic trends such as page views and device types. This
        helps improve performance and usability.
      </p>

      <h2>Feedback</h2>
      <p>
        If you want a new format added or you found a bug, use the Contact page and include a small example
        input and the output you expected.
      </p>

      <p style={{ marginTop: 24, opacity: 0.8 }}>Last updated: 2026-02-13</p>
    </main>
  );
}
