---
title: "Base64, URL, and HTML Encoder/Decoder — Free Online String Encoding Tool"
description: "Encode and decode strings in Base64, URL encoding, and HTML entities. Free online tool for developers. No signup, runs in your browser."
date: "2025-02-12"
keywords: ["base64 encoder", "url encoder", "html entity encoder", "base64 decode online", "url decode online", "encode string online"]
toolSlug: "string-encoder"
faq:
  - question: "What is Base64 encoding?"
    answer: "Base64 converts binary data into ASCII text using 64 characters (A-Z, a-z, 0-9, +, /). It is used to embed images in HTML, encode email attachments, and transmit binary data over text-based protocols."
  - question: "What is URL encoding?"
    answer: "URL encoding (percent-encoding) replaces special characters with % followed by their hex code. For example, spaces become %20 and & becomes %26. It ensures URLs are valid and parseable."
  - question: "What are HTML entities?"
    answer: "HTML entities replace characters that have special meaning in HTML. For example, < becomes &lt; and & becomes &amp;. This prevents browsers from interpreting text as HTML code."
  - question: "When should I use Base64?"
    answer: "Use Base64 when embedding small images in CSS/HTML (data URIs), sending binary data in JSON APIs, encoding credentials in HTTP headers, or storing binary data in text-only formats."
  - question: "Does Base64 encrypt data?"
    answer: "No. Base64 is encoding, not encryption. Anyone can decode Base64 text. Never use it to hide passwords or sensitive data. Use proper encryption (AES, RSA) for security."
  - question: "Why does Base64 make strings longer?"
    answer: "Base64 uses 4 characters to represent every 3 bytes of data, making the output approximately 33% larger than the input. This is the tradeoff for ASCII compatibility."
related: ["json-formatter-guide", "text-cleaner-guide", "password-generator-guide"]
---

# Base64, URL, and HTML Encoder/Decoder

String encoding converts text from one format to another. Developers use it daily when working with APIs, URLs, HTML, and data transmission. The FlipMyCase String Encoder handles the three most common formats.

## How to Use the String Encoder

1. Open the [FlipMyCase String Encoder](/string-encoder).
2. Select the encoding type: Base64, URL, or HTML.
3. Paste your input string.
4. Switch between Encode and Decode modes.
5. Copy the result.

## Base64 Encoding

Base64 converts any data into a string of printable ASCII characters. Common uses:

- **Data URIs**: Embed small images directly in HTML: `<img src="data:image/png;base64,...">`
- **API payloads**: Send binary files in JSON request bodies
- **Authentication headers**: HTTP Basic Auth encodes `username:password` in Base64
- **Email**: MIME encoding uses Base64 for attachments

### Example

| Input | Base64 |
|---|---|
| Hello World | SGVsbG8gV29ybGQ= |
| user:pass123 | dXNlcjpwYXNzMTIz |

## URL Encoding

URL encoding makes text safe for use in URLs. Characters outside the basic ASCII set and reserved characters are converted to percent-encoded format.

### When You Need It

- Building query strings: `?search=hello%20world&lang=en`
- Encoding file names in download URLs
- Passing special characters in API parameters
- Encoding redirect URLs within other URLs

### Common Conversions

| Character | Encoded |
|---|---|
| (space) | %20 |
| & | %26 |
| = | %3D |
| / | %2F |
| @ | %40 |

## HTML Entity Encoding

HTML entity encoding prevents browsers from interpreting your text as HTML tags. Essential for displaying code examples, user-generated content, and special characters.

### When You Need It

- Displaying `<script>` tags as text on a web page
- Sanitizing user input to prevent XSS attacks
- Showing code examples in tutorials
- Using special characters like ©, ™, and €

### Common Conversions

| Character | Entity |
|---|---|
| < | \&lt; |
| > | \&gt; |
| & | \&amp; |
| " | \&quot; |
| ' | \&#39; |

## Security Note

Encoding is not encryption. Base64, URL encoding, and HTML entities are all reversible by anyone. They exist for data formatting and compatibility, not security. For protecting sensitive data, use proper encryption algorithms.
