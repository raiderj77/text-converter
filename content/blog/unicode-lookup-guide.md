---
title: "Unicode Lookup — How to Search and Find Unicode Characters Online"
description: "Search for Unicode characters by name, code point, or category. Free online tool for finding special characters, symbols, emojis, and diacritics. No signup required."
date: "2026-03-17"
keywords: ["unicode lookup", "unicode character search", "find unicode symbol", "unicode table", "unicode code point", "special character finder", "unicode character map"]
toolSlug: "unicode-lookup"
faq:
  - question: "How do I find a Unicode character?"
    answer: "Open the FlipMyCase Unicode Lookup tool and search by name (like 'arrow' or 'heart'), code point (like U+2764), or browse by category (math, arrows, currency, emoji). Click any result to copy it."
  - question: "What is a Unicode code point?"
    answer: "A code point is the unique numeric identifier for each character in Unicode. It is written as U+ followed by hexadecimal digits. For example, U+0041 is 'A', U+2764 is '❤', and U+1F600 is '😀'. There are over 149,000 assigned code points."
  - question: "How do I type special characters I cannot find on my keyboard?"
    answer: "Search for the character in the FlipMyCase Unicode Lookup, then copy and paste it. Alternatively, use the Alt code (Windows), Character Viewer (Mac), or HTML entity in web content."
  - question: "What is the difference between Unicode and UTF-8?"
    answer: "Unicode is the standard that assigns a number (code point) to every character. UTF-8 is an encoding that defines how those numbers are stored as bytes. UTF-8 uses 1-4 bytes per character and is the dominant encoding on the web."
related: ["hex-text-converter-guide", "string-encoder-guide", "binary-text-converter-guide"]
---

# Unicode Lookup — How to Search and Find Unicode Characters Online

Unicode contains over 149,000 characters spanning every writing system, mathematical symbol, emoji, musical notation, and technical character in use today. Finding the exact character you need — that specific arrow, that currency symbol, that mathematical operator, that diacritical mark — requires a way to search this massive character set. Scrolling through code charts is impractical. Googling "right arrow symbol" returns dozens of different arrows with no way to distinguish them.

This guide covers what Unicode is, how to search for specific characters, how to work with Unicode in code, and the characters developers need most often.

## What Is Unicode?

Unicode is the universal character encoding standard that assigns a unique numeric code point to every character in every writing system. Code points are written as U+ followed by hexadecimal digits: U+0041 is 'A', U+00E9 is 'é', U+2764 is '❤', U+1F600 is '😀'. Unicode covers Latin, Cyrillic, Arabic, Chinese, Japanese, Korean, Devanagari, emoji, mathematical symbols, musical notation, and many more scripts.

You would use Unicode lookup when inserting special characters not on your keyboard, finding the correct arrow or symbol for a design, looking up code points for internationalization work, debugging character encoding issues (seeing what a character actually is), and finding HTML entities for web development.

## How to Look Up Unicode Characters with FlipMyCase

1. Open the [FlipMyCase Unicode Lookup](/unicode-lookup).
2. Search by name ("right arrow"), code point ("U+2192"), or browse by category.
3. See the character, its name, code point, UTF-8 bytes, and HTML entity.
4. Click to copy any character directly.

For converting between hex and text representations, use the [Hex Text Converter](/hex-text-converter). For encoding characters as HTML entities, use the [String Encoder](/string-encoder).

## Code Examples for Working with Unicode

### JavaScript

```javascript
// Get code point of a character
console.log('A'.codePointAt(0));          // 65
console.log('A'.codePointAt(0).toString(16)); // 41
console.log('❤'.codePointAt(0).toString(16)); // 2764
console.log('😀'.codePointAt(0).toString(16)); // 1f600

// Create character from code point
console.log(String.fromCodePoint(0x2764));  // ❤
console.log(String.fromCodePoint(0x1F600)); // 😀
console.log('\u2764');                       // ❤
console.log('\u{1F600}');                    // 😀

// Unicode escape in strings
const arrow = '\u2192';     // →
const check = '\u2713';     // ✓
const cross = '\u2717';     // ✗
console.log(`Pass ${check} / Fail ${cross} / Next ${arrow}`);

// Iterate over Unicode characters (handles surrogate pairs)
const text = 'Hello 😀 World';
for (const char of text) {
  console.log(`${char} = U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}`);
}

// Detect character category (basic)
function isEmoji(char) {
  const cp = char.codePointAt(0);
  return cp >= 0x1F600 && cp <= 0x1F64F || // Emoticons
         cp >= 0x1F300 && cp <= 0x1F5FF || // Misc Symbols
         cp >= 0x1F680 && cp <= 0x1F6FF;   // Transport
}
```

### Python

```python
import unicodedata

# Get character info
char = '❤'
print(f"Character: {char}")
print(f"Name: {unicodedata.name(char)}")
print(f"Code point: U+{ord(char):04X}")
print(f"Category: {unicodedata.category(char)}")
# Character: ❤
# Name: HEAVY BLACK HEART
# Code point: U+2764
# Category: So (Symbol, other)

# Look up character by name
arrow = unicodedata.lookup('RIGHTWARDS ARROW')
print(f"Arrow: {arrow} (U+{ord(arrow):04X})")
# Arrow: → (U+2192)

# Search characters by partial name
def search_unicode(query, limit=10):
    results = []
    for cp in range(0x10FFFF):
        try:
            name = unicodedata.name(chr(cp))
            if query.upper() in name:
                results.append((chr(cp), f'U+{cp:04X}', name))
                if len(results) >= limit:
                    break
        except ValueError:
            continue
    return results

for char, code, name in search_unicode('check mark'):
    print(f"  {char}  {code}  {name}")
# ✓  U+2713  CHECK MARK
# ✔  U+2714  HEAVY CHECK MARK
# ...

# Common symbols
symbols = {
    'arrow_right': '\u2192',   # →
    'check': '\u2713',          # ✓
    'cross': '\u2717',          # ✗
    'bullet': '\u2022',         # •
    'degree': '\u00B0',         # °
    'copyright': '\u00A9',      # ©
    'trademark': '\u2122',      # ™
    'infinity': '\u221E',       # ∞
}
for name, sym in symbols.items():
    print(f"  {sym}  U+{ord(sym):04X}  {name}")
```

### Go

```go
package main

import (
    "fmt"
    "unicode"
    "unicode/utf8"
)

func main() {
    // Character info
    char := '❤'
    fmt.Printf("Character: %c\n", char)
    fmt.Printf("Code point: U+%04X\n", char)
    fmt.Printf("UTF-8 bytes: %d\n", utf8.RuneLen(char))

    // Create from code point
    arrow := rune(0x2192)
    check := rune(0x2713)
    fmt.Printf("Arrow: %c, Check: %c\n", arrow, check)

    // Iterate over string
    text := "Hello 😀"
    for _, r := range text {
        fmt.Printf("%c = U+%04X (letter: %v)\n", r, r, unicode.IsLetter(r))
    }

    // Common symbols
    symbols := map[string]rune{
        "arrow": 0x2192, "check": 0x2713, "bullet": 0x2022,
        "degree": 0x00B0, "copyright": 0x00A9, "infinity": 0x221E,
    }
    for name, cp := range symbols {
        fmt.Printf("  %c  U+%04X  %s\n", cp, cp, name)
    }
}
```

## Real-World Use Cases

**Finding special characters for design.** Designers need arrows (→ ← ↑ ↓ ↗), check marks (✓ ✔ ☑), bullets (• ◦ ▪), and decorative symbols. The [Unicode Lookup](/unicode-lookup) lets you search by name and copy the exact character you need.

**Internationalization (i18n) development.** Building software for multiple languages requires understanding Unicode ranges, combining characters, and text direction. Look up code points for test data, verify character properties, and debug encoding issues.

**Web development with HTML entities.** Special characters in HTML can use numeric entities (`&#8594;` for →) or named entities (`&rarr;`). The [Unicode Lookup](/unicode-lookup) shows the HTML entity alongside the character for quick reference. Encode characters with the [String Encoder](/string-encoder).

**Debugging encoding issues.** When text displays as `Ã©` instead of `é`, or `â€"` instead of `—`, the root cause is an encoding mismatch. Looking up the garbled characters in Unicode reveals which bytes were misinterpreted and which encoding the source used.

## Common Mistakes and Gotchas

JavaScript's `string.length` counts UTF-16 code units, not characters. The emoji '😀' has `length` 2 because it requires a surrogate pair in UTF-16. Use `Array.from(str).length` or `[...str].length` for the true character count.

Combining characters look like one character but are multiple code points. "é" can be U+00E9 (single code point) or U+0065 + U+0301 (e + combining accent). Both render identically but have different lengths and byte representations. Normalize with `str.normalize('NFC')` to get consistent code points.

Zero-width characters are invisible but present. Zero-width space (U+200B), zero-width non-joiner (U+200C), and byte order mark (U+FEFF) cause string comparison failures and display issues because they are present in the data but invisible in display. The [Text Cleaner](/text-cleaner) strips these.

Not all fonts support all Unicode characters. If a character renders as a box (□) or question mark, the user's font does not include that glyph. System fonts cover most common symbols, but rare scripts and specialized symbols may need a specific font.

## Frequently Asked Questions

**How many characters does Unicode contain?**
Unicode version 15.1 defines 149,813 characters covering 161 scripts. The standard can accommodate up to 1,114,112 code points (U+0000 to U+10FFFF). Most applications encounter only a fraction of this — primarily Latin, CJK, and emoji characters.

**What is the difference between a character and a glyph?**
A character is an abstract concept (the letter A). A glyph is the visual representation (how A looks in a specific font). One character can have many glyphs across different fonts. One glyph can represent multiple characters (ligatures like "fi").

**How do I type Unicode characters on my keyboard?**
On Windows, use Alt+numpad codes or the Character Map app. On Mac, use the Character Viewer (Edit > Emoji & Symbols). On Linux, use Ctrl+Shift+U followed by the hex code point. Or search in the [Unicode Lookup](/unicode-lookup) and copy-paste.

## Conclusion

Unicode lookup is an essential tool for anyone working with international text, special symbols, or web development. With 149,000+ characters, searching by name or code point is the only practical way to find the exact character you need.

The [FlipMyCase Unicode Lookup](/unicode-lookup) provides searchable access to the full Unicode character set with code points, UTF-8 bytes, and HTML entities. For encoding characters, use the [String Encoder](/string-encoder). For hex representation, use the [Hex Text Converter](/hex-text-converter). For cleaning up invisible Unicode characters, use the [Text Cleaner](/text-cleaner).
