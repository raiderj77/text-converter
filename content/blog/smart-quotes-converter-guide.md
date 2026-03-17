---
title: "Smart Quotes Converter — How to Convert Curly Quotes to Straight Quotes Online"
description: "Convert smart (curly) quotes to straight quotes and vice versa. Free online tool fixes typographic quotes from Word, Google Docs, and macOS. No signup required."
date: "2026-03-17"
keywords: ["smart quotes converter", "curly quotes to straight", "straight quotes converter", "fix smart quotes", "typographic quotes", "convert curly quotes", "smart quotes to straight"]
toolSlug: "smart-quotes-converter"
faq:
  - question: "What are smart quotes?"
    answer: "Smart quotes (also called curly or typographic quotes) are the curved quotation marks that word processors automatically insert: \u201C \u201D for double and \u2018 \u2019 for single. They look polished in print but cause problems in code, JSON, and systems expecting straight quotes."
  - question: "Why do smart quotes cause problems?"
    answer: "Smart quotes are different Unicode characters than straight quotes. Code expects \" (U+0022) and ' (U+0027), but smart quotes are \u201C (U+201C), \u201D (U+201D), \u2018 (U+2018), \u2019 (U+2019). Pasting smart quotes into code, JSON, CSV, or SQL causes syntax errors."
  - question: "How do I convert smart quotes to straight quotes?"
    answer: "Paste your text into the FlipMyCase Smart Quotes Converter and select 'straight quotes' mode. All curly double quotes become \" and all curly single quotes become '. The reverse mode converts straight to smart for typographic use."
  - question: "Which applications create smart quotes?"
    answer: "Microsoft Word, Google Docs, Apple Pages, macOS system-wide autocorrect, iOS keyboard, and many CMS editors automatically convert straight quotes to smart quotes as you type. This is helpful for publishing but problematic for code and data."
related: ["text-cleaner-guide", "plain-text-converter-guide", "find-and-replace-guide"]
---

# Smart Quotes Converter — How to Convert Curly Quotes to Straight Quotes

Smart quotes are one of the most common invisible causes of broken code, failed JSON parsing, SQL errors, and CSV import failures. You write a query in Google Docs and paste it into a terminal — it fails because the double quotes are `\u201C` and `\u201D` instead of `"`. You copy a string from a Word document into your code — the single quotes are `\u2018` and `\u2019` instead of `'`. You paste CSV data from a notes app — quote-delimited fields use curly quotes that the parser does not recognize.

This guide covers what smart quotes are, why they cause so many problems, how to convert between smart and straight quotes, and the code patterns to handle them automatically.

## What Are Smart Quotes?

Smart quotes (typographic or curly quotes) are the curved quotation marks that distinguish opening and closing: `\u201C` (left double), `\u201D` (right double), `\u2018` (left single), `\u2019` (right single). Straight quotes are the simple vertical marks: `"` (U+0022) and `'` (U+0027). Word processors and operating systems automatically convert straight quotes to smart quotes for typographic polish.

You would convert smart quotes to straight when pasting code or queries from word processors, fixing JSON or CSV parsing errors caused by curly quotes, preparing text for systems that only accept ASCII, cleaning up data imports, and normalizing text for database storage. You would convert straight to smart when preparing text for print publishing, typographic design, or polished web content.

## How to Convert Quotes with FlipMyCase

1. Open the [FlipMyCase Smart Quotes Converter](/smart-quotes-converter).
2. Paste your text containing smart quotes (or straight quotes).
3. Select your conversion direction: smart → straight or straight → smart.
4. Copy the cleaned text with consistent quote style.

For broader text cleanup including dashes and special characters, use the [Text Cleaner](/text-cleaner). For complete format stripping, use the [Plain Text Converter](/plain-text-converter).

## Code Examples for Quote Conversion

### JavaScript

```javascript
// Smart quotes to straight quotes
function smartToStraight(text) {
  return text
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')  // double quotes
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")  // single quotes
    .replace(/\u2013/g, '-')   // en dash to hyphen
    .replace(/\u2014/g, '--')  // em dash to double hyphen
    .replace(/\u2026/g, '...'); // ellipsis
}

const messy = '\u201CHello,\u201D she said. \u201CIt\u2019s a beautiful day.\u201D';
console.log(messy);
// "Hello," she said. "It's a beautiful day."
console.log(smartToStraight(messy));
// "Hello," she said. "It's a beautiful day."

// Straight quotes to smart quotes
function straightToSmart(text) {
  // Double quotes: opening after whitespace/start, closing before whitespace/end
  text = text.replace(/"([^"]*?)"/g, '\u201C$1\u201D');
  // Single quotes: handle apostrophes and quotes
  text = text.replace(/\b'/g, '\u2018');
  text = text.replace(/'\b/g, '\u2019');
  text = text.replace(/'/g, '\u2019'); // remaining apostrophes
  return text;
}

console.log(straightToSmart('"Hello," she said. "It\'s nice."'));
// \u201CHello,\u201D she said. \u201CIt\u2019s nice.\u201D

// Detect smart quotes
function hasSmartQuotes(text) {
  return /[\u201C\u201D\u2018\u2019]/.test(text);
}
console.log(hasSmartQuotes(messy));  // true
```

### Python

```python
import re

def smart_to_straight(text):
    replacements = {
        '\u201C': '"', '\u201D': '"',  # double quotes
        '\u201E': '"', '\u201F': '"',
        '\u2018': "'", '\u2019': "'",  # single quotes
        '\u201A': "'", '\u201B': "'",
        '\u2013': '-',                  # en dash
        '\u2014': '--',                 # em dash
        '\u2026': '...',                # ellipsis
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text

messy = '\u201CHello,\u201D she said. \u201CIt\u2019s nice.\u201D'
print(repr(messy))
# '\u201cHello,\u201d she said. \u201cIt\u2019s nice.\u201d'
print(smart_to_straight(messy))
# "Hello," she said. "It's nice."

# Detect and report smart quotes
def find_smart_quotes(text):
    smart_chars = {'\u201C': 'LEFT DOUBLE', '\u201D': 'RIGHT DOUBLE',
                   '\u2018': 'LEFT SINGLE', '\u2019': 'RIGHT SINGLE'}
    found = []
    for i, char in enumerate(text):
        if char in smart_chars:
            found.append((i, char, smart_chars[char]))
    return found

for pos, char, name in find_smart_quotes(messy):
    print(f"  Position {pos}: {name} QUOTE ({repr(char)})")

# Process a file
with open('document.txt', 'r', encoding='utf-8') as f:
    content = f.read()
with open('cleaned.txt', 'w', encoding='utf-8') as f:
    f.write(smart_to_straight(content))
```

### Bash

```bash
# Smart to straight quotes using sed
sed -e 's/\xe2\x80\x9c/"/g' -e 's/\xe2\x80\x9d/"/g' \
    -e "s/\xe2\x80\x98/'/g" -e "s/\xe2\x80\x99/'/g" \
    input.txt > output.txt

# Using Python one-liner (more reliable for Unicode)
python3 -c "
import sys
text = sys.stdin.read()
for old, new in [('\u201c','\"'),('\u201d','\"'),('\u2018',\"'\"),('\u2019',\"'\"),('\u2013','-'),('\u2014','--')]:
    text = text.replace(old, new)
print(text, end='')
" < input.txt > output.txt

# Detect files containing smart quotes
grep -rlP '[\x{201C}\x{201D}\x{2018}\x{2019}]' *.txt

# Using iconv to force ASCII (drops smart quotes entirely)
iconv -f UTF-8 -t ASCII//TRANSLIT < input.txt > output.txt
```

## Real-World Use Cases

**Fixing code pasted from Word or Docs.** The most common scenario: you draft a SQL query, API request, or code snippet in a word processor, paste it into a terminal or IDE, and it fails with a syntax error. The quotes look correct visually but are Unicode curly quotes, not ASCII straight quotes. Convert with the [Smart Quotes Converter](/smart-quotes-converter) before pasting into code.

**JSON and CSV data repair.** JSON requires straight double quotes for keys and string values. CSV files use straight quotes for field delimiters. Smart quotes from CMS exports, spreadsheet copy-paste, or automated reports break parsers. Clean the data before importing with the tool or the code examples above.

**Publishing and typography.** The reverse conversion — straight to smart — is needed for print-quality documents, typographic web content, and professional publishing. Smart quotes look significantly better in body text, headings, and pull quotes than their straight equivalents.

**Cross-platform text normalization.** macOS converts quotes system-wide by default (System Preferences > Keyboard > Text > Use smart quotes). This means text typed on Mac and sent to a Windows or Linux colleague may contain smart quotes they do not expect. Normalize quotes before sharing code or data across platforms.

## Common Mistakes and Gotchas

Smart quotes are visually indistinguishable from straight quotes at small font sizes. You cannot tell by looking whether a quote is U+0022 or U+201C. This makes debugging frustrating. Use the [Smart Quotes Converter](/smart-quotes-converter) to normalize first, or use the [Hex Text Converter](/hex-text-converter) to see the actual byte values.

The right single quote (U+2019) is the same character as the typographic apostrophe. "It\u2019s" uses U+2019 for the apostrophe. Converting to straight quotes changes it to "It's" with U+0027, which is correct for code but technically less typographic. For publishing, keep smart apostrophes.

Some systems silently introduce smart quotes. macOS autocorrects quotes in many input fields. Google Docs converts on paste. Slack converts in messages. If your data passes through any of these systems, assume smart quotes may have been introduced and normalize before using the data programmatically.

Em dashes (—) and en dashes (–) are related problems. Word processors convert double hyphens to em dashes and number ranges to en dashes. These are different Unicode characters that can also break code and data. The [Text Cleaner](/text-cleaner) normalizes all of these.

## Frequently Asked Questions

**How do I disable smart quotes in Word?**
In Microsoft Word: File > Options > Proofing > AutoCorrect Options > AutoFormat As You Type > uncheck "Straight quotes with smart quotes." In Google Docs: Tools > Preferences > uncheck "Use smart quotes." On macOS: System Preferences > Keyboard > Text > uncheck "Use smart quotes and dashes."

**Do smart quotes affect SEO?**
No. Search engines handle both quote types identically. However, smart quotes in URLs, meta tags, or structured data JSON-LD can cause parsing issues. Keep quotes straight in all code-facing contexts and use smart quotes only in visible body text.

**How do I find smart quotes in a large file?**
Use `grep -P '[\x{201C}\x{201D}\x{2018}\x{2019}]' filename` on the command line, or search for the Unicode characters in your editor. The [Find and Replace](/find-and-replace) tool with the appropriate Unicode characters can locate them in pasted text.

## Conclusion

Smart quotes are a typography feature that causes real technical problems when text moves between word processors and code. Converting between smart and straight quotes takes seconds but prevents hours of debugging syntax errors, parsing failures, and data import issues.

The [FlipMyCase Smart Quotes Converter](/smart-quotes-converter) handles both directions instantly in your browser. For comprehensive text normalization including dashes and special characters, use the [Text Cleaner](/text-cleaner). For complete format stripping, use the [Plain Text Converter](/plain-text-converter). For finding specific characters in text, use the [Find and Replace](/find-and-replace) tool.
