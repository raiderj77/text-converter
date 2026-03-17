---
title: "Plain Text Converter — How to Convert Rich Text to Plain Text Online"
description: "Strip all formatting from text instantly — remove bold, italic, links, fonts, and styles. Free online tool converts rich text, HTML, and Word content to clean plain text."
date: "2026-03-16"
keywords: ["plain text converter", "rich text to plain text", "strip formatting", "remove text formatting", "convert to plain text", "plain text tool", "unformat text online"]
toolSlug: "plain-text-converter"
faq:
  - question: "What is plain text?"
    answer: "Plain text is text with no formatting — no bold, italic, colors, fonts, or hyperlinks. It contains only characters, spaces, and line breaks. Plain text works universally across all applications, email clients, databases, and programming environments."
  - question: "How do I convert rich text to plain text?"
    answer: "Paste your formatted text into the FlipMyCase Plain Text Converter. The tool strips all formatting including bold, italic, fonts, colors, hyperlinks, and embedded objects, leaving only the raw text content with line breaks preserved."
  - question: "What is the difference between the Plain Text Converter and the Text Cleaner?"
    answer: "The Plain Text Converter strips all formatting from rich text. The Text Cleaner removes specific artifacts like extra spaces, blank lines, and HTML tags. Use the converter for complete format stripping and the cleaner for targeted cleanup."
  - question: "Does converting to plain text remove line breaks?"
    answer: "No. The converter preserves paragraph breaks and line breaks. It removes formatting (bold, fonts, colors) but keeps the text structure intact. To also remove line breaks, use the Remove Line Breaks tool afterward."
related: ["text-cleaner-guide", "remove-html-tags-guide", "html-to-markdown-guide"]
---

# Plain Text Converter — How to Convert Rich Text to Plain Text Online

Rich text formatting is everywhere — Word documents, Google Docs, email clients, CMS editors, and web pages all add invisible formatting to your text. Bold, italic, font sizes, colors, hyperlinks, and styles are embedded in ways you cannot see until you paste into a different application. Then you get mismatched fonts, broken layouts, and formatting artifacts that take longer to fix than the content took to write.

Plain text conversion strips all of this away, leaving you with clean, portable text that works identically everywhere. This guide covers what plain text conversion does, when you need it, how to do it in code, and the specific scenarios that generate the most formatting problems.

## What Is Plain Text Conversion?

Plain text conversion removes all formatting metadata from text, leaving only the raw characters, spaces, and line breaks. Bold becomes regular weight. Italic becomes upright. Colored text becomes default color. Hyperlinks become regular text. Font changes are eliminated. The result is text that renders identically in any application — from Notepad to a terminal to a database field.

You would convert to plain text when pasting content from Word or Google Docs into a web form, preparing text for database storage, creating plain-text email versions, cleaning up text for code comments, formatting content for terminal output, and eliminating formatting that causes display issues across platforms.

## How to Convert to Plain Text with FlipMyCase

1. Open the [FlipMyCase Plain Text Converter](/plain-text-converter).
2. Paste your rich text — from Word, Google Docs, email, or any formatted source.
3. The tool strips all formatting and shows clean plain text.
4. Copy the plain text for use in forms, code, databases, or email.

For more targeted cleanup like removing extra spaces or blank lines, use the [Text Cleaner](/text-cleaner). For stripping HTML tags specifically, use the [HTML Tag Remover](/remove-html-tags).

## Code Examples for Plain Text Conversion

### JavaScript

```javascript
// Strip formatting from HTML (browser)
function toPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  // Remove script and style elements entirely
  doc.querySelectorAll('script, style').forEach(el => el.remove());
  return doc.body.textContent || '';
}

const html = '<p><strong>Bold text</strong> and <em>italic</em> with <a href="https://example.com">a link</a>.</p>';
console.log(toPlainText(html));
// Bold text and italic with a link.

// Strip formatting from clipboard paste (browser)
document.addEventListener('paste', (e) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  document.execCommand('insertText', false, text);
});

// Clean text by removing non-printable characters
function cleanPlainText(text) {
  return text
    .replace(/[\u200B-\u200D\uFEFF]/g, '')  // zero-width chars
    .replace(/\u00A0/g, ' ')                  // non-breaking space
    .replace(/[\u2018\u2019]/g, "'")          // smart quotes
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2013/g, '-')                   // en dash
    .replace(/\u2014/g, '--')                  // em dash
    .replace(/\u2026/g, '...')                 // ellipsis
    .replace(/\r\n/g, '\n')                    // normalize line endings
    .trim();
}

const messy = '\u201CHello\u201D\u2014she said\u2026';
console.log(cleanPlainText(messy));
// "Hello"--she said...
```

### Python

```python
import re
from html import unescape

def to_plain_text(html):
    """Convert HTML to plain text"""
    # Remove script and style blocks
    text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL | re.IGNORECASE)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL | re.IGNORECASE)
    # Convert block elements to newlines
    text = re.sub(r'<br\s*/?>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</p>', '\n\n', text, flags=re.IGNORECASE)
    # Strip all remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
    text = unescape(text)
    # Normalize whitespace
    text = re.sub(r' +', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

html = '<p><strong>Bold</strong> and <em>italic</em> with <a href="url">a link</a>.</p>'
print(to_plain_text(html))
# Bold and italic with a link.

# Clean smart quotes and special characters
def normalize_text(text):
    replacements = {
        '\u2018': "'", '\u2019': "'",   # smart single quotes
        '\u201C': '"', '\u201D': '"',   # smart double quotes
        '\u2013': '-', '\u2014': '--',  # dashes
        '\u2026': '...',                 # ellipsis
        '\u00A0': ' ',                   # non-breaking space
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    # Remove zero-width characters
    text = re.sub(r'[\u200B-\u200D\uFEFF]', '', text)
    return text

# Process a Word document to plain text
# pip install python-docx
from docx import Document

def docx_to_plain(filepath):
    doc = Document(filepath)
    return '\n\n'.join(para.text for para in doc.paragraphs if para.text.strip())

# print(docx_to_plain('document.docx'))
```

### Bash

```bash
# Strip formatting from HTML file
cat page.html | sed 's/<[^>]*>//g' | sed '/^$/N;/^\n$/d'

# Convert Word doc to plain text (requires pandoc)
pandoc document.docx -t plain -o output.txt

# Convert rich text from clipboard to plain text (macOS)
pbpaste | textutil -convert txt -stdin -stdout

# Remove smart quotes and special characters
cat document.txt | \
  sed "s/[\x91\x92\xe2\x80\x98\xe2\x80\x99]/'/g" | \
  sed "s/[\x93\x94\xe2\x80\x9c\xe2\x80\x9d]/\"/g" | \
  sed "s/\xe2\x80\x93/-/g" | \
  sed "s/\xe2\x80\x94/--/g"

# Strip all non-ASCII characters
cat input.txt | tr -cd '[:print:]\n' > clean.txt
```

## Real-World Use Cases

**Pasting into web forms and CMS fields.** Rich text from Word or Google Docs brings hidden formatting into web forms, causing inconsistent styling, broken layouts, and validation errors. Convert to plain text before pasting to ensure the CMS applies its own consistent styling.

**Database storage.** Text stored in database fields should be plain text unless the field specifically supports rich text. Formatting artifacts cause search failures, display inconsistencies, and data corruption. Strip formatting before insertion. Clean the output with the [Text Cleaner](/text-cleaner) after conversion.

**Email plain-text fallback.** Every HTML email should include a plain-text alternative. Convert the HTML version to plain text using the [Plain Text Converter](/plain-text-converter), ensuring recipients whose email clients do not render HTML can still read the message.

**Code comments and documentation strings.** Pasting from formatted sources into code editors can introduce invisible characters that cause compilation errors or encoding issues. Convert to plain text first to ensure only standard ASCII or UTF-8 characters are included.

## Common Mistakes and Gotchas

Invisible characters survive simple copy-paste. Zero-width spaces (U+200B), non-breaking spaces (U+00A0), and byte-order marks (U+FEFF) look identical to regular spaces but cause string comparison failures, regex mismatches, and display issues. A proper plain text converter strips these.

Smart quotes and curly apostrophes cause encoding errors. Word and Google Docs convert straight quotes to curly quotes (" " ' ') which use different Unicode code points. These break JSON strings, SQL queries, and shell commands. Always normalize to ASCII quotes.

Paragraph structure can be lost without care. Stripping all formatting from `<p>First</p><p>Second</p>` without converting block elements to newlines produces "FirstSecond" with no paragraph break. Convert block elements to line breaks before stripping tags.

Rich text from different sources has different hidden formatting. Word adds XML-based formatting. Google Docs adds span tags with inline styles. Email clients add their own wrapper markup. The [Plain Text Converter](/plain-text-converter) handles all of these sources.

## Frequently Asked Questions

**What is the keyboard shortcut for pasting as plain text?**
In most applications: Ctrl+Shift+V (Windows/Linux) or Cmd+Shift+V (Mac). This pastes clipboard content as plain text, stripping all formatting. In browsers, this works in most text fields and contenteditable areas.

**Does plain text support Unicode?**
Yes. Plain text is not limited to ASCII. UTF-8 plain text includes all Unicode characters — letters from every alphabet, emojis, mathematical symbols, and more. "Plain" means no formatting metadata, not limited character set.

**How do I convert a PDF to plain text?**
PDFs are notoriously difficult to convert because text positioning is absolute, not flowing. Use tools like `pdftotext` (command line), Adobe Acrobat's export, or online PDF extractors. After extraction, clean up line breaks with the [Text Cleaner](/text-cleaner) since PDFs break lines at page width.

## Conclusion

Plain text conversion solves one of the most persistent formatting problems in digital work. Rich text formatting that is invisible in the source application causes visible problems in the destination. Converting to plain text eliminates this entire category of issues.

The [FlipMyCase Plain Text Converter](/plain-text-converter) strips all formatting from any source instantly in your browser. For targeted cleanup, use the [Text Cleaner](/text-cleaner). For HTML tag removal specifically, use the [HTML Tag Remover](/remove-html-tags). For converting rich HTML to structured Markdown, use the [HTML to Markdown](/html-to-markdown) converter.
