---
title: "Remove HTML Tags — How to Strip HTML from Text Online"
description: "Remove all HTML tags from text instantly, leaving only the plain text content. Free online tool for cleaning HTML markup from web content, emails, and CMS output."
date: "2026-03-16"
keywords: ["remove html tags", "strip html tags", "html to plain text", "remove html markup", "strip tags online", "clean html tags", "html tag remover"]
toolSlug: "remove-html-tags"
faq:
  - question: "How do I remove HTML tags from text?"
    answer: "Paste your HTML into the FlipMyCase HTML Tag Remover. The tool strips all tags (<p>, <div>, <span>, <a>, etc.) and returns only the plain text content. Nested tags, attributes, and self-closing tags are all removed."
  - question: "Does removing tags preserve line breaks?"
    answer: "Block-level tags like <p>, <br>, <div>, and <li> are converted to line breaks before removal, preserving the visual structure. Inline tags like <span>, <strong>, and <a> are removed without adding breaks."
  - question: "Can I keep certain tags while removing others?"
    answer: "The FlipMyCase tool removes all tags. For selective tag removal, use the Find and Replace tool with regex mode to target specific tags, or use a programming library like sanitize-html that supports allowlists."
  - question: "Is stripping HTML tags enough to prevent XSS?"
    answer: "For display purposes, yes — removing all tags eliminates script execution. However, for security-critical applications, use a proper sanitization library (DOMPurify, sanitize-html) that also handles event attributes and edge cases."
related: ["text-cleaner-guide", "html-to-markdown-guide", "plain-text-converter-guide"]
---

# Remove HTML Tags — How to Strip HTML from Text Online

HTML tags are useful for browsers but are noise when you need the actual text content. You copy a paragraph from a web page and it comes with `<span>`, `<div>`, and `<p>` tags. You export CMS content and every paragraph is wrapped in markup. You scrape data from a website and the content is buried in nested HTML. Manually removing tags is tedious and error-prone — miss one closing tag and you corrupt the text.

This guide covers how HTML tag removal works, how to do it safely in code, the difference between stripping and sanitizing, and the scenarios where you need each approach.

## What Is HTML Tag Removal?

HTML tag removal strips all HTML markup from a string, leaving only the plain text content. Tags like `<p>`, `<div>`, `<span>`, `<a href="...">`, `<strong>`, and `<img>` are removed along with their attributes. The text between the tags is preserved. Block-level elements like `<p>` and `<br>` are typically converted to line breaks to maintain the visual paragraph structure.

You would use tag removal when extracting readable text from web pages, cleaning CMS output for plain-text formats, preparing HTML email content for text-only display, stripping markup from database fields, and converting rich content to plain text for indexing or analysis.

## How to Remove HTML Tags with FlipMyCase

1. Open the [FlipMyCase HTML Tag Remover](/remove-html-tags).
2. Paste your HTML content.
3. The tool instantly strips all tags and returns clean plain text.
4. Copy the text for use in documents, databases, or plain-text formats.

For more comprehensive text cleanup including whitespace normalization, use the [Text Cleaner](/text-cleaner). For converting HTML to Markdown instead of plain text, use the [HTML to Markdown](/html-to-markdown) converter.

## Code Examples for HTML Tag Removal

### JavaScript

```javascript
// Simple tag removal
function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const html = `
<div class="article">
  <h1>Getting Started</h1>
  <p>Welcome to the <strong>documentation</strong>.</p>
  <p>Follow these steps:</p>
  <ul>
    <li>Step one: <a href="/install">Install</a></li>
    <li>Step two: Configure</li>
  </ul>
</div>
`;

console.log(stripTags(html));
// Getting Started
//
// Welcome to the documentation.
//
// Follow these steps:
//
// Step one: Install
// Step two: Configure

// DOM-based approach (browser only, safer)
function stripTagsDOM(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
```

### Python

```python
import re
from html import unescape

def strip_tags(html):
    # Convert block elements to line breaks
    text = re.sub(r'<br\s*/?>', '\n', html, flags=re.IGNORECASE)
    text = re.sub(r'</p>', '\n\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</div>', '\n', text, flags=re.IGNORECASE)
    text = re.sub(r'</li>', '\n', text, flags=re.IGNORECASE)
    # Remove all remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    # Decode HTML entities
    text = unescape(text)
    # Normalize whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

html = """
<div class="article">
  <h1>Getting Started</h1>
  <p>Welcome to the <strong>docs</strong>.</p>
  <p>Use &amp; enjoy!</p>
</div>
"""

print(strip_tags(html))
# Getting Started
#
# Welcome to the docs.
#
# Use & enjoy!

# Using BeautifulSoup (more robust)
from bs4 import BeautifulSoup

def strip_tags_bs(html):
    soup = BeautifulSoup(html, 'html.parser')
    return soup.get_text(separator='\n', strip=True)

print(strip_tags_bs(html))
# Getting Started
# Welcome to the docs.
# Use & enjoy!

# Batch process files
import os
for filename in os.listdir('html_pages'):
    if filename.endswith('.html'):
        with open(f'html_pages/{filename}', 'r') as f:
            text = strip_tags(f.read())
        with open(f'text_pages/{filename.replace(".html", ".txt")}', 'w') as f:
            f.write(text)
```

### Bash

```bash
# Strip tags with sed
cat page.html | sed 's/<[^>]*>//g'

# Better: convert block elements to newlines first
cat page.html | \
  sed 's/<br[^>]*>/\n/gI' | \
  sed 's/<\/p>/\n\n/gI' | \
  sed 's/<[^>]*>//g' | \
  sed '/^$/N;/^\n$/d'

# Using lynx (text browser)
lynx -dump -nolist page.html

# Using w3m
w3m -dump page.html

# Using Python one-liner
cat page.html | python3 -c "
from html.parser import HTMLParser
from html import unescape
import sys, re
text = re.sub(r'<[^>]+>', '', sys.stdin.read())
print(unescape(text).strip())
"
```

## Real-World Use Cases

**CMS content extraction.** Content management systems store text with HTML formatting. When migrating to a different platform, exporting to CSV, or generating plain-text newsletters, you need the text without the tags. Paste the HTML into the [HTML Tag Remover](/remove-html-tags) and get clean text instantly.

**Web scraping data cleaning.** After scraping product descriptions, reviews, or article content from websites, the raw data contains HTML tags. Strip the tags to get the actual text content for analysis, indexing, or database storage.

**Email plain-text fallback.** HTML emails need a plain-text alternative for email clients that do not render HTML. Convert the HTML version by stripping tags, preserving paragraph breaks, and cleaning up entities. This ensures every recipient can read your message.

**Search index preparation.** Full-text search engines index the text content, not the HTML markup. Strip tags before indexing to avoid matching on tag names and attributes instead of actual content. Use the [Text Cleaner](/text-cleaner) afterward to normalize whitespace.

## Common Mistakes and Gotchas

Using regex to strip tags from untrusted HTML is not safe for security. A regex like `/<[^>]+>/g` fails on malformed HTML, nested quotes, and intentionally crafted payloads. For security-critical contexts (preventing XSS), use a proper sanitization library like DOMPurify (JavaScript) or bleach (Python) — not regex.

Script and style content is not removed by tag-only stripping. Removing tags from `<script>alert('xss')</script>` leaves `alert('xss')` as visible text. Always remove `<script>` and `<style>` elements entirely (content included) before stripping remaining tags.

HTML entities become garbage without decoding. Stripping tags from `&amp;`, `&lt;`, `&quot;` leaves these entity strings as literal text instead of `&`, `<`, `"`. Always decode HTML entities after stripping tags, as shown in the code examples.

Block-level structure is lost without conversion. Stripping all tags from `<p>First</p><p>Second</p>` produces `FirstSecond` with no separation. Convert `</p>`, `<br>`, and `</div>` to line breaks before removing tags to preserve the visual paragraph structure.

## Conclusion

HTML tag removal is the fastest path from markup to plain text. Whether you are cleaning CMS output, processing scraped content, generating text-only email versions, or preparing data for search indexing, stripping tags is a fundamental text operation.

The [FlipMyCase HTML Tag Remover](/remove-html-tags) strips all tags instantly in your browser while preserving paragraph structure. For more thorough cleanup, use the [Text Cleaner](/text-cleaner). For converting HTML to Markdown instead of plain text, use the [HTML to Markdown](/html-to-markdown) converter. For programmatic tag stripping, use the JavaScript, Python, and Bash examples above.
