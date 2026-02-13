export const metadata = {
  title: "Contact",
  description: "Contact the site owner with feedback or bug reports.",
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, lineHeight: 1.7 }}>
      <h1>Contact</h1>

      <p>
        Use this page to send feedback, request a new format, or report a bug. Include a small example
        input and the output you expected.
      </p>

      <h2>Best way to reach the owner</h2>
      <p>
        This project is maintained through GitHub. Use the repository issues page for requests and bug
        reports so the history stays organized.
      </p>

      <h2>What to include in a bug report</h2>
      <ul>
        <li>The exact text you pasted, keep it short if possible.</li>
        <li>The format you clicked, for example snake_case or Title Case.</li>
        <li>The output you expected.</li>
        <li>The output you received.</li>
        <li>Your device type, desktop or phone, and your browser name.</li>
      </ul>

      <h2>Privacy</h2>
      <p>
        Do not send sensitive information. This is a public tool site and a public repo workflow. If your
        text is private, replace it with a similar example that shows the same formatting problem.
      </p>

      <p style={{ marginTop: 24, opacity: 0.8 }}>Last updated: 2026-02-13</p>
    </main>
  );
}
