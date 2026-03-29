---
title: "Base64 Encoder & Decoder — Encode and Decode Online Free"
description: "Encode text or data to Base64 and decode Base64 strings back to text instantly. Free online Base64 encoder decoder. No signup. Includes code examples."
date: "2026-03-29"
keywords: ["base64 encoder", "base64 decoder", "base64 encode online", "base64 decode online", "base64 converter", "encode to base64", "decode base64 string", "base64 online tool"]
toolSlug: "string-encoder"
faq:
  - question: "What is Base64 encoding?"
    answer: "Base64 is an encoding scheme that converts binary data into a string of 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It is not encryption — the data can be decoded by anyone. Base64 is used to safely transmit binary data through systems that only handle text, such as email, JSON APIs, and HTML data URIs. The name comes from the 64 characters used in the encoding alphabet."
  - question: "How do I decode a Base64 string?"
    answer: "Paste your Base64 string into the FlipMyCase String Encoder tool and select Base64 decode mode. The tool converts every 4 Base64 characters back to the original 3 bytes of data. For example, 'SGVsbG8=' decodes to 'Hello'. Base64 strings often end with one or two equals signs (=) as padding."
  - question: "Is Base64 the same as encryption?"
    answer: "No. Base64 is encoding, not encryption. Anyone who receives a Base64-encoded string can decode it immediately using any Base64 decoder without a key or password. Use Base64 to make binary data safe for text-only transport, not to secure sensitive information. For security, use actual encryption (AES, RSA) before or independently of Base64 encoding."
  - question: "Why does Base64 output end with = signs?"
    answer: "Base64 works in 3-byte groups. When the input length is not a multiple of 3, padding characters (=) fill the remaining space to complete the final 4-character block. One = means the last group had 2 bytes. Two == means it had 1 byte. Input whose length is a multiple of 3 produces no padding."
  - question: "Where is Base64 used in practice?"
    answer: "Base64 is used in email attachments (MIME encoding), embedding images directly in HTML or CSS as data URIs, passing binary data through JSON APIs, storing binary data in XML, encoding credentials in HTTP Basic Auth headers (username:password encoded to Base64), and JWT (JSON Web Token) headers and payloads."
related: ["string-encoder-guide", "hex-text-converter-guide", "binary-text-converter-guide"]
---

# Base64 Encoder & Decoder — Encode and Decode Online

Base64 is one of the most common encoding schemes in web development, APIs, and data transport — yet it trips up developers who confuse it with encryption or misunderstand why the output looks the way it does. This guide explains how Base64 encoding works, why it exists, how to use it in code, and the common real-world contexts where you will encounter it.

## How to Encode and Decode Base64 with FlipMyCase

1. Open the [FlipMyCase String Encoder](/string-encoder) tool.
2. Select **Base64** from the encoding options.
3. To encode: paste your text or binary data into the input field and click Encode. The Base64-encoded output appears instantly.
4. To decode: paste your Base64 string into the input field and click Decode. The original text appears in the output.
5. Copy the result with the copy button.

For hex encoding (a related encoding used in different contexts), use the [Hex Text Converter](/hex-text-converter) tool.

## How Base64 Encoding Works

Base64 converts binary data into a string using 64 printable ASCII characters: uppercase A–Z (26), lowercase a–z (26), digits 0–9 (10), plus sign (+), and forward slash (/). The equals sign (=) is used as padding and is not part of the encoding alphabet itself.

The algorithm works in 3-byte chunks:

1. Take 3 bytes (24 bits) of input data
2. Split into four 6-bit groups
3. Map each 6-bit value (0–63) to a character in the Base64 alphabet
4. Output 4 Base64 characters per every 3 input bytes

This 3-to-4 ratio means Base64 output is always approximately 33% larger than the input. A 3 MB image encoded as Base64 becomes roughly 4 MB of text.

### Base64 Alphabet Reference

| Value | Char | Value | Char | Value | Char | Value | Char |
|-------|------|-------|------|-------|------|-------|------|
| 0 | A | 16 | Q | 32 | g | 48 | w |
| 1 | B | 17 | R | 33 | h | 49 | x |
| 2 | C | 18 | S | 34 | i | 50 | y |
| 3 | D | 19 | T | 35 | j | 51 | z |
| 4 | E | 20 | U | 36 | k | 52 | 0 |
| 5 | F | 21 | V | 37 | l | 53 | 1 |
| 6 | G | 22 | W | 38 | m | 54 | 2 |
| 7 | H | 23 | X | 39 | n | 55 | 3 |
| 8 | I | 24 | Y | 40 | o | 56 | 4 |
| 9 | J | 25 | Z | 41 | p | 57 | 5 |
| 10 | K | 26 | a | 42 | q | 58 | 6 |
| 11 | L | 27 | b | 43 | r | 59 | 7 |
| 12 | M | 28 | c | 44 | s | 60 | 8 |
| 13 | N | 29 | d | 45 | t | 61 | 9 |
| 14 | O | 30 | e | 46 | u | 62 | + |
| 15 | P | 31 | f | 47 | v | 63 | / |

### Worked Example: Encoding "Hi"

"Hi" in ASCII: H = 72 (01001000), i = 105 (01101001)

Two bytes = 16 bits. Padded to 3 bytes: 01001000 01101001 00000000

Split into four 6-bit groups: 010010 000110 100100 000000

Mapped to Base64: S G k =

Result: **SGk=** (one padding character because input was 2 bytes, not 3)

Verify: paste `SGk=` into any Base64 decoder and get "Hi" back.

## Base64 Code Examples

### JavaScript — Encode and Decode

```javascript
// Encode string to Base64
const encoded = btoa('Hello, World!');
console.log(encoded); // 'SGVsbG8sIFdvcmxkIQ=='

// Decode Base64 to string
const decoded = atob('SGVsbG8sIFdvcmxkIQ==');
console.log(decoded); // 'Hello, World!'

// For non-ASCII characters, use TextEncoder first
function encodeUnicode(str) {
  const bytes = new TextEncoder().encode(str);
  return btoa(String.fromCharCode(...bytes));
}

function decodeUnicode(base64) {
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

console.log(encodeUnicode('Héllo')); // handles accented characters
```

### Python — Encode and Decode

```python
import base64

# Encode string to Base64
text = "Hello, World!"
encoded = base64.b64encode(text.encode('utf-8'))
print(encoded)         # b'SGVsbG8sIFdvcmxkIQ=='
print(encoded.decode()) # 'SGVsbG8sIFdvcmxkIQ=='

# Decode Base64 to string
decoded = base64.b64decode('SGVsbG8sIFdvcmxkIQ==').decode('utf-8')
print(decoded)         # 'Hello, World!'

# Encode binary file to Base64
with open('image.png', 'rb') as f:
    image_base64 = base64.b64encode(f.read()).decode('utf-8')
print(f"data:image/png;base64,{image_base64[:50]}...")
```

### Node.js — Encode and Decode

```javascript
// Node.js uses Buffer, not btoa/atob (though btoa/atob available since Node 16)
const text = 'Hello, World!';

// Encode
const encoded = Buffer.from(text, 'utf8').toString('base64');
console.log(encoded); // 'SGVsbG8sIFdvcmxkIQ=='

// Decode
const decoded = Buffer.from(encoded, 'base64').toString('utf8');
console.log(decoded); // 'Hello, World!'

// Encode a file
const fs = require('fs');
const fileBuffer = fs.readFileSync('image.png');
const fileBase64 = fileBuffer.toString('base64');
// Use as data URI: `data:image/png;base64,${fileBase64}`
```

### PHP — Encode and Decode

```php
<?php
// Encode
$encoded = base64_encode('Hello, World!');
echo $encoded; // SGVsbG8sIFdvcmxkIQ==

// Decode
$decoded = base64_decode('SGVsbG8sIFdvcmxkIQ==');
echo $decoded; // Hello, World!

// Encode file contents
$imageData = file_get_contents('image.png');
$imageBase64 = base64_encode($imageData);
echo "<img src='data:image/png;base64,{$imageBase64}'>";
?>
```

## Common Uses for Base64

### Data URIs in HTML and CSS

Instead of linking to an external image file, you can embed the image directly in HTML or CSS using a Base64 data URI. This eliminates an HTTP request and is useful for small icons and logos.

```html
<!-- External file (normal approach) -->
<img src="/icons/logo.png" alt="Logo">

<!-- Base64 data URI (embedded) -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANS..." alt="Logo">
```

```css
/* In CSS */
.icon {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxu...');
}
```

Data URIs increase HTML file size and cannot be cached independently, so they work best for images under 2–3 KB. Larger images are better served as separate files.

### HTTP Basic Authentication

HTTP Basic Auth encodes credentials as `username:password` in Base64 and sends them in the `Authorization` header. This is not encryption — the credentials are trivially decoded — so Basic Auth should only be used over HTTPS.

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Decoded: `dXNlcm5hbWU6cGFzc3dvcmQ=` → `username:password`

### JWT Tokens

JSON Web Tokens (JWTs) use Base64url encoding (a URL-safe variant of Base64 that uses `-` instead of `+` and `_` instead of `/`, with padding removed) for the header and payload sections.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature
```

The first two sections before the dots are Base64url-encoded JSON. Decoding the header `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` gives `{"alg":"HS256","typ":"JWT"}`. Note that JWTs are not encrypted by default — the payload is readable by anyone who has the token.

### Email Attachments (MIME)

Email protocols transmit ASCII text. Attachments are binary files. MIME encoding wraps binary attachments in Base64 so they can travel through email systems that only handle text. When you open an email attachment, your email client decodes the Base64 back to the original binary file.

## Base64 vs. URL Encoding vs. Hex

These three encoding schemes are often confused:

| Encoding | Use Case | Output Size | Reversible |
|----------|----------|-------------|------------|
| Base64 | Binary data in text systems | +33% larger | Yes |
| URL encoding (%xx) | Special chars in URLs | Variable | Yes |
| Hex | Byte-level data representation | +100% larger | Yes |
| HTML entities (&amp;amp;) | Special chars in HTML | Variable | Yes |

Base64 is used when you need to embed binary data (images, files, arbitrary bytes) in a text context. URL encoding handles special characters in URLs. Hex shows the raw byte values of data. HTML entities escape characters that have special meaning in HTML markup.

## Troubleshooting Common Base64 Issues

**"Invalid Base64 string" error**
Base64 strings must have a length that is a multiple of 4. If padding (=) was stripped, re-add it before decoding: a string of length 4n+2 needs `==`, a string of length 4n+3 needs `=`. Also check for whitespace or newlines in the string — some decoders reject them while others silently strip them.

**Output contains garbled characters**
You are likely decoding Base64 that encodes non-UTF-8 binary data (like an image) as if it were text. Base64 decodes to the original bytes; if those bytes were not a UTF-8 string, displaying them as text produces garbage. Use the correct content type when handling the decoded output.

**Base64url vs. standard Base64**
URLs cannot contain `+` and `/` without percent-encoding. Base64url replaces `+` with `-` and `/` with `_`, and drops padding. If you are decoding a JWT or OAuth token and getting errors, add back padding and replace `-` with `+` and `_` with `/` before passing to a standard decoder.

## Frequently Asked Questions

### Is Base64 the same as Base64url?

No, though they are closely related. Standard Base64 uses `+` and `/` as the 62nd and 63rd characters. Base64url replaces these with `-` and `_` to produce URL-safe output, and typically omits padding characters. JWTs, OAuth tokens, and URL-embedded data use Base64url. Standard Base64 is used everywhere else. Most online Base64 tools work with standard Base64; if you are working with JWTs, look for a Base64url option or handle the character substitution manually.

### How do I check if a string is Base64 encoded?

Valid Base64 strings contain only A-Z, a-z, 0-9, +, /, and = (for padding). The length is always a multiple of 4. A regex check: `/^[A-Za-z0-9+/]*={0,2}$/`. However, this confirms valid Base64 format, not that the decoded content is meaningful. Any string can be valid Base64 by coincidence — the only way to know if decoding produces the expected output is to decode and check.

### What is the maximum size for Base64 encoding?

Base64 encoding has no inherent size limit. The output is always 4/3 the size of the input (plus padding). For browser-based processing, very large inputs (tens of MB) may cause memory or performance issues in JavaScript. Server-side processing in Python or Node.js handles arbitrarily large files efficiently using streaming Base64 encoding rather than loading the entire file into memory.
