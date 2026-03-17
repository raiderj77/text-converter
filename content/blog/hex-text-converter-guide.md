---
title: "Hex Text Converter — Encode and Decode Text to Hexadecimal Online"
description: "Convert text to hexadecimal and hex back to text instantly. Free online tool shows hex encoding of every character. Perfect for debugging and data analysis."
date: "2026-03-16"
keywords: ["hex text converter", "text to hex", "hex to text", "hexadecimal encoder", "hex decoder online", "hex string converter", "ascii to hex"]
toolSlug: "hex-text-converter"
faq:
  - question: "How do I convert text to hexadecimal?"
    answer: "Paste your text into the FlipMyCase Hex Text Converter. Each character is converted to its hexadecimal byte value. 'Hello' becomes '48 65 6C 6C 6F'. Switch to decode mode to convert hex back to text."
  - question: "What is hexadecimal encoding?"
    answer: "Hexadecimal encoding represents each byte of data as two hex digits (0-9, A-F). One hex digit equals 4 binary bits, so two hex digits represent one full byte (8 bits). It is more compact than binary while remaining easy to read."
  - question: "When would I need hex encoding?"
    answer: "Hex encoding is used for inspecting raw byte data, debugging network packets, reading memory dumps, analyzing file headers, working with color codes, and examining character encoding issues. It is the standard format for low-level data inspection."
  - question: "What is the difference between hex encoding and Base64?"
    answer: "Hex encoding uses 2 characters per byte (50% size increase). Base64 uses 4 characters per 3 bytes (33% increase). Base64 is more space-efficient for large data. Hex is more readable for byte-level inspection. Use hex for debugging, Base64 for data transport."
related: ["binary-text-converter-guide", "number-base-converter-guide", "string-encoder-guide"]
---

# Hex Text Converter — Encode and Decode Text to Hexadecimal

Hexadecimal is the developer's preferred format for inspecting raw data. It is more compact than binary (two hex digits per byte versus eight binary digits) and more readable than decimal for byte-level work. When you need to examine a file header, debug a network packet, inspect a character encoding issue, or read a memory dump, hex is the format you will see.

This guide covers how text-to-hex conversion works, how it differs from other encoding formats, how to implement it in code, and the contexts where hex inspection is essential.

## What Is Hex Text Encoding?

Hex text encoding converts each byte of a text string to its two-digit hexadecimal representation. The letter 'H' is 72 in decimal and `48` in hex. The word "Hello" becomes `48 65 6C 6C 6F` — five bytes, each shown as two hex digits. Decoding reverses the process, converting hex pairs back to their character equivalents.

You would use hex encoding when examining file signatures (magic bytes), debugging network packet payloads, inspecting raw HTTP request/response data, reading binary file contents in a readable format, analyzing character encoding problems, and working with cryptographic data.

## How to Convert Text to Hex with FlipMyCase

1. Open the [FlipMyCase Hex Text Converter](/hex-text-converter).
2. Paste your text to see its hexadecimal encoding.
3. Each character becomes a two-digit hex value, space-separated for readability.
4. Switch to decode mode to convert hex strings back to text.

For binary encoding instead of hex, use the [Binary Text Converter](/binary-text-converter). For Base64 and URL encoding, use the [String Encoder](/string-encoder).

## Code Examples for Hex Text Conversion

### JavaScript

```javascript
// Text to hex
function textToHex(text) {
  return Array.from(text).map(char =>
    char.charCodeAt(0).toString(16).padStart(2, '0')
  ).join(' ').toUpperCase();
}
console.log(textToHex('Hello'));  // 48 65 6C 6C 6F

// Hex to text
function hexToText(hex) {
  return hex.split(/\s+/).map(h =>
    String.fromCharCode(parseInt(h, 16))
  ).join('');
}
console.log(hexToText('48 65 6C 6C 6F'));  // Hello

// Hex dump format (like xxd)
function hexDump(text, width = 16) {
  const bytes = Array.from(new TextEncoder().encode(text));
  const lines = [];
  for (let i = 0; i < bytes.length; i += width) {
    const chunk = bytes.slice(i, i + width);
    const hex = chunk.map(b => b.toString(16).padStart(2, '0')).join(' ');
    const ascii = chunk.map(b => b >= 32 && b <= 126 ? String.fromCharCode(b) : '.').join('');
    lines.push(`${i.toString(16).padStart(8, '0')}  ${hex.padEnd(width * 3)}  |${ascii}|`);
  }
  return lines.join('\n');
}
console.log(hexDump('Hello, World! This is a hex dump example.'));
```

### Python

```python
# Text to hex
def text_to_hex(text):
    return ' '.join(f'{b:02X}' for b in text.encode('utf-8'))

print(text_to_hex('Hello'))  # 48 65 6C 6C 6F
print(text_to_hex('café'))   # 63 61 66 C3 A9 (UTF-8, é is 2 bytes)

# Hex to text
def hex_to_text(hex_string):
    hex_bytes = hex_string.split()
    return bytes(int(h, 16) for h in hex_bytes).decode('utf-8')

print(hex_to_text('48 65 6C 6C 6F'))  # Hello

# Hex dump (like xxd)
def hex_dump(data, width=16):
    if isinstance(data, str):
        data = data.encode('utf-8')
    lines = []
    for i in range(0, len(data), width):
        chunk = data[i:i+width]
        hex_part = ' '.join(f'{b:02x}' for b in chunk)
        ascii_part = ''.join(chr(b) if 32 <= b <= 126 else '.' for b in chunk)
        lines.append(f'{i:08x}  {hex_part:<{width*3}}  |{ascii_part}|')
    return '\n'.join(lines)

print(hex_dump('Hello, World!'))
# 00000000  48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21           |Hello, World!|

# Read file as hex
with open('example.bin', 'rb') as f:
    data = f.read(64)
print(hex_dump(data))
```

### Bash

```bash
# Text to hex with xxd
echo -n "Hello" | xxd -p
# 48656c6c6f

# Text to hex with spaces
echo -n "Hello" | od -A n -t x1 | tr -s ' '
# 48 65 6c 6c 6f

# Hex to text
echo "48656c6c6f" | xxd -r -p
# Hello

# Full hex dump of a file
xxd example.bin | head -5

# Hex dump of a URL response
curl -s https://example.com | xxd | head -10

# Count occurrences of a hex byte pattern
xxd -p file.bin | grep -o 'ff' | wc -l
```

## Real-World Use Cases

**File format identification.** Every file format starts with specific "magic bytes." A PNG starts with `89 50 4E 47`, a PDF with `25 50 44 46` (%PDF), and a ZIP with `50 4B 03 04`. Convert the first few bytes to hex with the [Hex Text Converter](/hex-text-converter) or `xxd` to identify unknown file types.

**Network debugging.** When inspecting HTTP traffic with Wireshark or tcpdump, packet payloads are displayed in hex. Converting hex back to text reveals the HTTP headers and body content. This is essential for debugging API communication, TLS issues, and protocol-level problems.

**Character encoding troubleshooting.** When text appears garbled, hex inspection reveals the actual bytes. UTF-8 'é' is `C3 A9` (2 bytes), while Latin-1 'é' is `E9` (1 byte). If your system expects UTF-8 but receives Latin-1, you see `E9` where you should see `C3 A9` — this immediately identifies the encoding mismatch.

**Cryptographic data inspection.** Hash outputs, encrypted payloads, and digital signatures are all byte sequences displayed as hex. The [Hash Generator](/hash-generator) produces hex output for MD5, SHA-256, and other algorithms.

## Common Mistakes and Gotchas

Hex is case-insensitive — `4A` and `4a` are the same byte. However, convention varies: Linux tools use lowercase, Windows tools use uppercase, and cryptographic hashes traditionally use lowercase. Be consistent within your context.

Two hex digits equal one byte. Forgetting this leads to off-by-one parsing errors. The hex string `48656C6C6F` is 5 bytes (10 hex characters), not 10 bytes. When reading hex without spaces, process characters in pairs.

UTF-8 multi-byte characters produce more hex digits than expected. The emoji '😀' is 4 bytes in UTF-8: `F0 9F 98 80`. Do not assume one character equals one hex pair — that is only true for ASCII characters.

Hex encoding is not encryption or obfuscation. Anyone can decode hex instantly. It is a representation format, not a security measure. For actual encoding that provides transport safety, use Base64 via the [String Encoder](/string-encoder).

## Conclusion

Hex text encoding is the standard format for byte-level data inspection. Whether you are identifying file formats, debugging network traffic, troubleshooting encoding issues, or examining cryptographic output, hex gives you a readable view of raw binary data.

The [FlipMyCase Hex Text Converter](/hex-text-converter) encodes and decodes text to hex instantly in your browser. For binary representation, use the [Binary Text Converter](/binary-text-converter). For Base64 encoding, use the [String Encoder](/string-encoder). For number base conversion, use the [Number Base Converter](/number-base-converter).
