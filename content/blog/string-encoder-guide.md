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

# Base64, URL, and HTML Encoder/Decoder — Free Online Tool

String encoding is one of those tasks that developers encounter daily but rarely think about deeply. Every time you embed an image as a data URI, pass a query parameter in a URL, display user-generated content in HTML, or send credentials in an API header, you are encoding strings. When the encoding is wrong — or missing — things break silently: URLs fail to route, HTML renders incorrectly, API calls return 400 errors, and security vulnerabilities appear.

This guide covers the three most common encoding formats (Base64, URL encoding, and HTML entities), explains when and why each is used, provides working code examples, and highlights the mistakes that cause the most bugs.

## What Is String Encoding?

String encoding converts text from one representation to another to make it safe for a specific context. Base64 converts binary data to printable ASCII characters for text-only transport channels. URL encoding (percent-encoding) replaces special characters so they can safely appear in URLs. HTML entity encoding replaces characters that have special meaning in HTML so browsers display them as text rather than interpreting them as markup.

You would use encoding whenever data crosses a boundary between systems: embedding binary data in JSON, passing parameters in a URL, displaying user input in a web page, sending credentials in HTTP headers, or storing binary content in text-only databases. Without proper encoding, special characters in your data interfere with the syntax of the transport format.

## How to Encode and Decode Strings with FlipMyCase

1. Open the [FlipMyCase String Encoder](/string-encoder).
2. Select the encoding format: Base64, URL, or HTML entities.
3. Paste your input string.
4. Toggle between Encode and Decode modes.
5. Copy the result.

The tool handles all edge cases including Unicode characters, multi-byte sequences, and special symbols. Everything runs in your browser with no data transmitted to a server.

## Code Examples for String Encoding

### JavaScript

```javascript
// Base64 encoding and decoding
const text = 'Hello, World! Special chars: é, ñ, ü';
const encoded = btoa(unescape(encodeURIComponent(text)));
console.log(encoded);
// SGVsbG8sIFdvcmxkISBTcGVjaWFsIGNoYXJzOiDDqSwgw7EsIMO8

const decoded = decodeURIComponent(escape(atob(encoded)));
console.log(decoded);
// Hello, World! Special chars: é, ñ, ü

// URL encoding
const params = 'search=hello world&category=café&page=1';
console.log(encodeURIComponent(params));
// search%3Dhello%20world%26category%3Dcaf%C3%A9%26page%3D1

console.log(encodeURI('https://example.com/path?q=hello world'));
// https://example.com/path?q=hello%20world

// HTML entity encoding
function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}
console.log(escapeHTML('<script>alert("xss")</script>'));
// &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
```

### Python

```python
import base64
from urllib.parse import quote, unquote, urlencode
import html

# Base64 encoding and decoding
text = 'Hello, World! Special chars: é, ñ, ü'
encoded = base64.b64encode(text.encode('utf-8')).decode('ascii')
print(encoded)
# SGVsbG8sIFdvcmxkISBTcGVjaWFsIGNoYXJzOiDDqSwgw7EsIMO8

decoded = base64.b64decode(encoded).decode('utf-8')
print(decoded)
# Hello, World! Special chars: é, ñ, ü

# URL encoding
print(quote('hello world & more'))
# hello%20world%20%26%20more

params = urlencode({'search': 'hello world', 'category': 'café'})
print(params)
# search=hello+world&category=caf%C3%A9

# HTML entity encoding
print(html.escape('<script>alert("xss")</script>'))
# &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;

print(html.unescape('&lt;b&gt;Bold&lt;/b&gt;'))
# <b>Bold</b>
```

### PHP

```php
<?php
// Base64
$text = 'Hello, World!';
$encoded = base64_encode($text);
echo $encoded;  // SGVsbG8sIFdvcmxkIQ==

echo base64_decode($encoded);  // Hello, World!

// URL encoding
echo urlencode('hello world & more');
// hello+world+%26+more

echo rawurlencode('hello world & more');
// hello%20world%20%26%20more

// HTML entities
echo htmlspecialchars('<script>alert("xss")</script>', ENT_QUOTES, 'UTF-8');
// &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;

echo htmlspecialchars_decode('&lt;b&gt;Bold&lt;/b&gt;');
// <b>Bold</b>
?>
```

## Real-World Use Cases

**Data URIs for embedded images.** Small images (icons, logos under 10KB) can be embedded directly in HTML or CSS as Base64-encoded data URIs: `<img src="data:image/png;base64,...">`. This eliminates an HTTP request per image, improving page load performance. Use the [String Encoder](/string-encoder) to encode the image file, or do it programmatically with the code examples above.

**API authentication headers.** HTTP Basic Authentication encodes `username:password` in Base64 and sends it in the `Authorization` header. While this is not encryption (anyone can decode it), it is the standard format for Basic Auth. Always use HTTPS when sending credentials. For generating secure passwords to encode, use the [Password Generator](/password-generator).

**Safe URL query parameters.** When building URLs with user-provided data, special characters like `&`, `=`, `?`, and spaces break URL parsing. URL encoding converts `search=hello world&lang=en` to `search=hello%20world&lang=en`, ensuring the URL is valid. Always encode query parameter values — never trust that user input contains only URL-safe characters.

**XSS prevention in web applications.** Displaying user-generated content without HTML entity encoding is a security vulnerability. If a user submits `<script>alert('xss')</script>` as their username and you render it as raw HTML, the script executes. HTML entity encoding converts it to harmless display text. This is the single most important encoding for web security.

## Common Mistakes and Gotchas

The most dangerous mistake is confusing encoding with encryption. Base64 is not security — it is a formatting conversion that anyone can reverse instantly. Never use Base64 to "hide" passwords, API keys, or sensitive data. Use actual encryption (AES-256, RSA) for security, and use the [Hash Generator](/hash-generator) for one-way data integrity verification.

Double encoding is a common bug. URL-encoding a string that is already URL-encoded produces `%2520` instead of `%20` (the `%` itself gets encoded). This happens when encoding is applied at multiple layers — once in your code and once by the HTTP library. Check whether your HTTP client auto-encodes before manually encoding.

Character encoding mismatches break Base64. If you Base64-encode a string as UTF-8 but decode it as ASCII, non-English characters corrupt. Always specify the same character encoding on both sides. The code examples above use UTF-8 consistently.

Forgetting to encode user input in HTML is a security vulnerability. Every piece of user-generated content displayed on a web page must be HTML-entity-encoded to prevent XSS attacks. Modern frameworks (React, Vue, Angular) do this automatically for interpolated values, but raw HTML insertion (`dangerouslySetInnerHTML`, `v-html`) bypasses the protection.

## Frequently Asked Questions

**When should I use `encodeURI` vs `encodeURIComponent` in JavaScript?**
Use `encodeURI` to encode a complete URL — it preserves characters that are valid in URLs like `:`, `/`, `?`, and `#`. Use `encodeURIComponent` to encode a single query parameter value — it encodes everything except alphanumeric characters. Using `encodeURI` on a parameter value leaves `&` and `=` unencoded, which breaks URL parsing.

**Does Base64 encoding increase file size?**
Yes, by approximately 33%. Base64 uses 4 characters to represent every 3 bytes of input data. A 10KB image becomes about 13.3KB when Base64-encoded. For small images (under 10KB), the savings from eliminating an HTTP request outweigh the size increase. For larger files, serve them normally.

**How do I decode a Base64 string I found in an API response?**
Paste it into the [FlipMyCase String Encoder](/string-encoder), select Base64, and switch to Decode mode. The decoded output appears instantly. For API responses containing nested Base64 (like JWT tokens), decode the Base64 first, then parse the resulting JSON. The [JWT Decoder](/jwt-decoder) handles this automatically.

**Is HTML entity encoding the same as sanitization?**
Entity encoding prevents XSS by converting special characters to their entity equivalents. Sanitization goes further by removing dangerous elements entirely (like `<script>` tags) while preserving safe HTML. For user-generated rich text, use both: sanitize to allow safe tags, and entity-encode everything else.

## Conclusion

String encoding is a fundamental skill for web development and API work. Base64 handles binary-to-text conversion for data URIs and API headers. URL encoding ensures query parameters parse correctly. HTML entity encoding prevents XSS attacks and displays special characters safely.

The [FlipMyCase String Encoder](/string-encoder) handles all three formats with instant encoding and decoding in your browser. For programmatic use, the JavaScript, Python, and PHP examples above cover the standard library functions you need. Combine with the [JSON Formatter](/json-formatter) when working with encoded data in API payloads, or the [Hash Generator](/hash-generator) when you need one-way data integrity rather than reversible encoding.
