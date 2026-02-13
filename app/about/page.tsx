export const metadata = {
title: "About",
description: "About the Text Case Converter tool and how it handles your text.",
};

export default function AboutPage() {
return (
<main style={{ maxWidth: 900, margin: "0 auto", padding: 24, lineHeight: 1.7 }}>
<h1>About</h1>
  <p>
    Text Case Converter is a small utility site built to solve a common problem. You copy text from one
    place and paste it into another, then you lose time fixing capitalization and formatting. This tool
    gives you clean output formats in one place so you can move on.
  </p>

  <h2>What the tool does</h2>
  <p>
    You paste text once and the page generates multiple formats at the same time. This includes common
    writing formats like uppercase, lowercase, title case, and sentence case. It also includes developer
    formats like camelCase, PascalCase, snake_case, kebab-case, and URL-friendly slugs.
  </p>

  <h2>Who it is for</h2>
  <ul>
    <li>Students and writers who need quick formatting for headings and documents.</li>
    <li>Marketing and ops teams who reuse product names, titles, and labels across tools.</li>
    <li>Developers who need consistent variable names, file names, and URL slugs.</li>
  </ul>

  <h2>How your text is handled</h2>
  <p>
    Your text is processed in the browser. The site is designed so your input stays on your device.
    The tool does not require an account and does not ask for personal information to function.
  </p>

  <h2>Analytics and ads</h2>
  <p>
    The site uses analytics to understand basic usage patterns, such as which pages get visited and what
    devices are used. If ads are enabled in the future, ad providers may use cookies or similar
    technologies to measure performance and show relevant ads. You can review details on the Privacy
    Policy page.
  </p>

  <h2>Why this site exists</h2>
  <p>
    Many online tools are cluttered, slow, or filled with distractions. This site aims to stay focused.
    The core experience is simple. Paste text. Get outputs. Copy in one click. Keyboard shortcuts are
    supported for speed, and the layout is designed to work on desktop and mobile.
  </p>

  <h2>Feedback</h2>
  <p>
    If you want a format added or you found a bug, use the Contact page. Include the input and the
    expected output so the issue is easy to reproduce.
  </p>

  <p style={{ marginTop: 24, opacity: 0.8 }}>Last updated: 2026-02-13</p>
</main>

