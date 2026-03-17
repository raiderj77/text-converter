---
title: "HTML to Markdown Converter — How to Convert HTML to Markdown Online"
description: "Convert HTML to clean Markdown instantly. Free online tool handles headings, links, images, lists, tables, and code blocks. Perfect for CMS migration and documentation."
date: "2026-03-16"
keywords: ["html to markdown", "convert html to markdown", "html to md converter", "html to markdown online", "html to markdown tool", "html markdown converter free"]
toolSlug: "html-to-markdown"
faq:
  - question: "How do I convert HTML to Markdown?"
    answer: "Paste your HTML into the FlipMyCase HTML to Markdown converter. The tool instantly transforms tags to Markdown syntax: headings become #, bold becomes **, links become [text](url), and lists convert to dashes or numbers."
  - question: "What HTML elements are supported?"
    answer: "The converter handles headings (h1-h6), paragraphs, bold, italic, links, images, ordered and unordered lists, code blocks, blockquotes, horizontal rules, and tables. Unsupported elements are stripped, leaving plain text."
  - question: "Why would I convert HTML to Markdown?"
    answer: "Common reasons include migrating content from WordPress or other CMS platforms to static site generators (Hugo, Jekyll, Gatsby), converting documentation to Markdown for GitHub repos, and cleaning up web content for note-taking apps."
  - question: "Does the conversion preserve images?"
    answer: "Yes. Image tags convert to Markdown image syntax: ![alt text](image-url). The actual image files are not moved — you will need to update image paths if the files are hosted elsewhere."
related: ["text-cleaner-guide", "json-formatter-guide", "regex-tester-guide"]
---

# HTML to Markdown Converter — How to Convert HTML to Markdown Online

Markdown has become the standard writing format for documentation, README files, blog posts, and note-taking. But enormous amounts of existing content are still in HTML — WordPress posts, legacy documentation, web scraped content, and email templates. Converting HTML to Markdown lets you migrate this content to modern static site generators, GitHub wikis, Notion, Obsidian, and any platform that supports Markdown.

This guide covers what HTML-to-Markdown conversion does, how to handle it programmatically, the edge cases that cause problems, and when conversion is the right approach versus rewriting from scratch.

## What Is HTML to Markdown Conversion?

HTML to Markdown conversion transforms HTML elements into their Markdown equivalents. `<h1>Title</h1>` becomes `# Title`. `<strong>bold</strong>` becomes `**bold**`. `<a href="url">link</a>` becomes `[link](url)`. `<ul><li>item</li></ul>` becomes `- item`. The goal is clean, readable Markdown that renders identically to the original HTML.

You would use this conversion when migrating a WordPress blog to Hugo, Jekyll, or Gatsby; converting company documentation from Confluence or Google Docs to Markdown for a GitHub repository; extracting content from web pages for note-taking; or cleaning up HTML email content for repurposing as blog posts or documentation.

## How to Convert HTML to Markdown with FlipMyCase

1. Open the [FlipMyCase HTML to Markdown Converter](/html-to-markdown).
2. Paste your HTML content.
3. The tool instantly converts it to clean Markdown with proper syntax for headings, links, images, lists, and code blocks.
4. Copy the Markdown output for your static site, README, or documentation.

For cleaning up the HTML before conversion, use the [Text Cleaner](/text-cleaner) to remove extraneous tags and formatting. For previewing the resulting Markdown, use the [Markdown Preview](/markdown-preview) tool.

## Code Examples for HTML to Markdown Conversion

### JavaScript (with turndown)

```javascript
const TurndownService = require('turndown');
const turndown = new TurndownService({
  headingStyle: 'atx',        // # style headings
  codeBlockStyle: 'fenced',   // ``` code blocks
  bulletListMarker: '-',
});

const html = `
<h1>Getting Started</h1>
<p>Welcome to the <strong>documentation</strong>. Follow these steps:</p>
<ol>
  <li>Install the <a href="https://example.com">package</a></li>
  <li>Configure your <code>settings.json</code></li>
  <li>Run <code>npm start</code></li>
</ol>
<h2>Features</h2>
<ul>
  <li>Fast and lightweight</li>
  <li>Easy to configure</li>
</ul>
<blockquote><p>Note: Requires Node.js 18+</p></blockquote>
<pre><code>const app = require('./app');
app.listen(3000);</code></pre>
`;

const markdown = turndown.turndown(html);
console.log(markdown);
// # Getting Started
//
// Welcome to the **documentation**. Follow these steps:
//
// 1. Install the [package](https://example.com)
// 2. Configure your `settings.json`
// 3. Run `npm start`
//
// ## Features
//
// - Fast and lightweight
// - Easy to configure
//
// > Note: Requires Node.js 18+
//
// ```
// const app = require('./app');
// app.listen(3000);
// ```
```

### Python (with markdownify)

```python
from markdownify import markdownify as md

html = """
<h1>Getting Started</h1>
<p>Welcome to the <strong>documentation</strong>.</p>
<h2>Installation</h2>
<ol>
  <li>Install the <a href="https://example.com">package</a></li>
  <li>Configure your <code>settings.json</code></li>
</ol>
<table>
  <tr><th>Feature</th><th>Status</th></tr>
  <tr><td>Auth</td><td>Stable</td></tr>
  <tr><td>API</td><td>Beta</td></tr>
</table>
"""

markdown = md(html, heading_style='ATX', bullets='-', strip=['script', 'style'])
print(markdown)
# # Getting Started
#
# Welcome to the **documentation**.
#
# ## Installation
#
# 1. Install the [package](https://example.com)
# 2. Configure your `settings.json`
#
# | Feature | Status |
# | --- | --- |
# | Auth | Stable |
# | API | Beta |

# Batch convert HTML files
import os

for filename in os.listdir('html_docs'):
    if filename.endswith('.html'):
        with open(f'html_docs/{filename}', 'r') as f:
            html_content = f.read()
        markdown = md(html_content, heading_style='ATX')
        md_filename = filename.replace('.html', '.md')
        with open(f'markdown_docs/{md_filename}', 'w') as f:
            f.write(markdown)
```

### Go (with html-to-markdown)

```go
package main

import (
    "fmt"
    md "github.com/JohannesKaufmann/html-to-markdown"
)

func main() {
    converter := md.NewConverter("", true, nil)

    html := `
    <h1>Getting Started</h1>
    <p>Welcome to the <strong>docs</strong>.</p>
    <ul>
        <li>Fast and lightweight</li>
        <li>Easy to configure</li>
    </ul>
    <a href="https://example.com">Learn more</a>
    `

    markdown, err := converter.ConvertString(html)
    if err != nil {
        panic(err)
    }
    fmt.Println(markdown)
    // # Getting Started
    //
    // Welcome to the **docs**.
    //
    // - Fast and lightweight
    // - Easy to configure
    //
    // [Learn more](https://example.com)
}
```

## Real-World Use Cases

**CMS migration.** Moving from WordPress to a static site generator (Hugo, Jekyll, Astro, Gatsby) requires converting all existing posts from HTML to Markdown. Export your WordPress content, run each post through the [HTML to Markdown Converter](/html-to-markdown), and save the output as `.md` files. This is faster than rewriting hundreds of posts manually.

**Documentation migration to GitHub.** Companies moving documentation from Confluence, Google Docs, or SharePoint to GitHub need Markdown files. Export the HTML, convert it, clean up any artifacts, and commit to your docs repository. The [Text Cleaner](/text-cleaner) helps remove formatting artifacts from the export.

**Web scraping and content extraction.** When collecting reference material from web pages, converting the HTML to Markdown produces clean, portable text without tags and formatting noise. This is useful for building knowledge bases, content archives, and training datasets.

**Email to blog post conversion.** Newsletter content written in HTML email templates can be repurposed as blog posts by converting to Markdown. This gives you clean source files that work in any CMS or static site generator.

## Common Mistakes and Gotchas

The biggest issue is inline styles and CSS classes. Markdown has no concept of CSS. `<span style="color: red">important</span>` converts to just "important" with no styling. If your HTML relies heavily on inline styles for meaning (not just decoration), you will lose information in the conversion. Review the output and add Markdown emphasis (`**bold**`, `*italic*`) where the original styling conveyed meaning.

Nested tables and complex layouts do not convert well. Markdown tables only support simple rows and columns with no merging, spanning, or nesting. Complex HTML tables may need manual restructuring after conversion.

Image paths are preserved but not validated. If your HTML references images at `../images/photo.jpg` or `https://old-domain.com/photo.jpg`, those same paths appear in the Markdown. You will need to update them to point to the correct location in your new setup.

HTML entities and special characters can cause rendering issues. `&amp;` should become `&`, `&lt;` should become `<`, but sometimes converters double-escape these. Check the output for stray HTML entities and clean them up with the [Text Cleaner](/text-cleaner).

## Conclusion

HTML to Markdown conversion unlocks existing content for modern platforms. Whether you are migrating a CMS, documenting a GitHub project, or repurposing web content, converting to Markdown gives you portable, readable source files that work everywhere.

The [FlipMyCase HTML to Markdown Converter](/html-to-markdown) handles headings, lists, links, images, code blocks, tables, and blockquotes instantly. For batch conversion, use Turndown (JavaScript), markdownify (Python), or html-to-markdown (Go). Preview your results with the [Markdown Preview](/markdown-preview) tool and clean up artifacts with the [Text Cleaner](/text-cleaner).
