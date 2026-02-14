import React from "react";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  content: React.ReactNode;
  faq: { question: string; answer: string }[];
  related: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "uppercase-converter",
    title: "Free Uppercase Converter (Convert Text to UPPERCASE Online)",
    description:
      "Convert text to uppercase instantly. Free online uppercase text converter with no signup required.",
    content: (
      <>
        <h1>Free Uppercase Converter</h1>

        <p>
          An uppercase converter changes all letters in your text to capital letters. Use it for
          labels, short headings, warnings, and consistent formatting.
        </p>

        <p>
          <a href="/">Open the converter tool</a>
        </p>

        <h2>How to Convert Text to Uppercase Online</h2>
        <ol>
          <li>Paste your text into the input box.</li>
          <li>Copy the UPPERCASE output.</li>
          <li>Paste it into your document, email, or app.</li>
        </ol>

        <h2>Examples</h2>
        <ul>
          <li>hello world → HELLO WORLD</li>
          <li>Important notice → IMPORTANT NOTICE</li>
          <li>order id: ab-129 → ORDER ID: AB-129</li>
        </ul>

        <h2>When to Use Uppercase</h2>
        <ul>
          <li>Short labels like START, STOP, WARNING</li>
          <li>Status tags like OPEN, CLOSED</li>
          <li>Headings where you want strong visual emphasis</li>
        </ul>

        <h2>Uppercase vs Title Case</h2>
        <p>
          Uppercase capitalizes every letter. Title Case capitalizes the first letter of each word.
          Title Case is usually easier to read for long headings.
        </p>

        <h2>Frequently Asked Questions</h2>
      </>
    ),
    faq: [
      {
        question: "How do I convert text to uppercase online for free?",
        answer:
          "Paste your text into the converter and copy the UPPERCASE output. This capitalizes every letter instantly.",
      },
      {
        question: "Is uppercase the same as all caps?",
        answer:
          "Yes. Uppercase and all caps both mean every letter is capitalized.",
      },
      {
        question: "When should I avoid uppercase?",
        answer:
          "Avoid long all-caps paragraphs because they reduce readability. Use uppercase for short labels and emphasis.",
      },
    ],
    related: [],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}
