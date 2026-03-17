---
title: "Extract URLs — How to Pull All Links from Text Online"
description: "Extract all URLs and links from any text, HTML, or document instantly. Free online tool finds http, https, and mailto links. No signup required."
date: "2026-03-16"
keywords: ["extract urls from text", "url extractor", "find links in text", "pull urls from document", "link extractor online", "extract hyperlinks", "url finder tool"]
toolSlug: "extract-urls"
faq:
  - question: "How do I extract URLs from text?"
    answer: "Paste your text into the FlipMyCase URL Extractor. The tool uses pattern matching to find all valid URLs (http, https, ftp) and outputs them as a clean, deduplicated list — one per line, ready to copy or export."
  - question: "Does the tool extract URLs from HTML?"
    answer: "Yes. Paste raw HTML and the tool finds URLs in both visible text and href/src attributes. It extracts links from anchor tags, image sources, script sources, and any attribute containing a URL."
  - question: "Can I extract only specific domains?"
    answer: "The tool extracts all URLs. To filter for specific domains, copy the full list and use Find and Replace or a text editor to filter. For regex-based filtering, use the Regex Tester to build a domain-specific pattern."
  - question: "Are duplicate URLs removed?"
    answer: "Yes. If the same URL appears multiple times in your text, the output list contains it only once. This gives you a clean list of unique links without manual deduplication."
related: ["extract-emails-guide", "regex-tester-guide", "text-cleaner-guide"]
---

# Extract URLs — How to Pull All Links from Text Online

URLs are embedded everywhere — in documents, emails, spreadsheets, web pages, log files, and code comments. When you need to audit the links in a document, build a redirect map for a site migration, check for broken links, extract resources from HTML, or compile a reference list, manually scanning for URLs is slow and unreliable. You will miss links in long documents and waste time on text that looks like a URL but is not.

This guide covers how URL extraction works, how to implement it in code, practical use cases, and the regex patterns that reliably match real-world URLs.

## What Is URL Extraction?

URL extraction scans a body of text and identifies all strings that match URL patterns — primarily `http://` and `https://` prefixed strings, plus optional `ftp://`, `mailto:`, and bare domain patterns. The extracted URLs are collected into a deduplicated list. Good extractors handle query strings, fragments, paths with special characters, and URLs embedded in HTML attributes.

You would use URL extraction for link auditing (finding all external links in a document), site migration (building a complete URL inventory), SEO analysis (mapping internal link structure), web scraping (extracting resource URLs from HTML), and content review (verifying all referenced links still work).

## How to Extract URLs with FlipMyCase

1. Open the [FlipMyCase URL Extractor](/extract-urls).
2. Paste your text — plain text, HTML, Markdown, or any format containing URLs.
3. The tool instantly finds and lists all URLs, deduplicated and sorted.
4. Copy the clean list for your audit, redirect map, or link checker.

For extracting email addresses instead, use the [Email Extractor](/extract-emails). For testing URL-matching regex patterns, use the [Regex Tester](/regex-tester).

## Code Examples for URL Extraction

### JavaScript

```javascript
function extractUrls(text) {
  const regex = /https?:\/\/[^\s<>"')\]]+/gi;
  const matches = text.match(regex) || [];

  // Clean trailing punctuation
  const cleaned = matches.map(url =>
    url.replace(/[.,;:!?)}\]]+$/, '')
  );

  // Deduplicate
  return [...new Set(cleaned)];
}

const text = `
Visit https://flipmycase.com for text tools.
Documentation at https://docs.example.com/api/v2?key=abc&format=json
See also http://legacy.example.org/old-page
Image: https://cdn.example.com/images/photo.jpg
Duplicate: https://flipmycase.com
`;

console.log(extractUrls(text));
// ['https://flipmycase.com',
//  'https://docs.example.com/api/v2?key=abc&format=json',
//  'http://legacy.example.org/old-page',
//  'https://cdn.example.com/images/photo.jpg']

// Extract from HTML href attributes specifically
function extractHrefs(html) {
  const regex = /href=["']([^"']+)["']/gi;
  const urls = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    urls.push(match[1]);
  }
  return [...new Set(urls)];
}

const html = '<a href="https://example.com">Link</a><a href="/about">About</a>';
console.log(extractHrefs(html));
// ['https://example.com', '/about']
```

### Python

```python
import re
from urllib.parse import urlparse

def extract_urls(text):
    pattern = r'https?://[^\s<>"\')\]]+'
    matches = re.findall(pattern, text)
    # Clean trailing punctuation
    cleaned = [re.sub(r'[.,;:!?)\]]+$', '', url) for url in matches]
    # Deduplicate preserving order
    seen = set()
    unique = []
    for url in cleaned:
        if url not in seen:
            seen.add(url)
            unique.append(url)
    return unique

text = """
Visit https://flipmycase.com for text tools.
API docs: https://api.example.com/v2?token=xyz
Legacy: http://old.example.org/page.html
"""

urls = extract_urls(text)
for url in urls:
    parsed = urlparse(url)
    print(f'{parsed.netloc:30s} {url}')
# flipmycase.com                https://flipmycase.com
# api.example.com               https://api.example.com/v2?token=xyz
# old.example.org               http://old.example.org/page.html

# Extract from HTML with BeautifulSoup
from bs4 import BeautifulSoup

html = '<a href="https://example.com">Link</a><img src="https://cdn.example.com/img.png">'
soup = BeautifulSoup(html, 'html.parser')
links = [a['href'] for a in soup.find_all('a', href=True)]
images = [img['src'] for img in soup.find_all('img', src=True)]
print('Links:', links)
print('Images:', images)
```

### Bash

```bash
# Extract URLs from a file
grep -oE 'https?://[^ <>"'"'"')\]]+' document.txt | sort -u

# Extract from a web page
curl -s https://example.com | grep -oE 'https?://[^ <>"'"'"']+' | sort -u

# Extract href values from HTML
curl -s https://example.com | grep -oP 'href="\K[^"]+' | sort -u

# Count unique domains
grep -oE 'https?://[^/]+' urls.txt | sort -u | wc -l

# Check which extracted URLs are broken (HTTP status)
while read url; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  echo "$status $url"
done < urls.txt
```

## Real-World Use Cases

**Site migration redirect mapping.** Before migrating to a new domain or URL structure, extract all URLs from your current site to build a complete inventory. Map each old URL to its new equivalent and configure 301 redirects. The [URL Extractor](/extract-urls) pulls every link from your HTML, and the [Text Diff](/text-diff) helps verify your redirect map is complete.

**Link auditing for SEO.** Extract all outbound links from your content to verify they point to reputable, live sites. Broken external links hurt user experience and can indirectly affect SEO. Run the extracted list through a link checker to find 404s.

**Content analysis and competitor research.** Extract all URLs from a competitor's page to see what they link to — their source material, cited research, related tools, and partner sites. This reveals their content strategy and reference sources.

**Web scraping resource collection.** When collecting images, PDFs, or data files from a web page, extract all URLs first, then filter by file extension to get the specific resources you need.

## Common Mistakes and Gotchas

URLs ending with punctuation cause false matches. The sentence "Visit https://example.com." includes the period in a naive regex match. Always strip trailing punctuation characters (`.`, `,`, `)`, `]`) from extracted URLs, as the code examples above demonstrate.

Relative URLs (like `/about` or `../images/photo.jpg`) are not extracted by standard URL regex because they lack the `http://` prefix. To capture these from HTML, parse the `href` and `src` attributes directly using an HTML parser instead of regex.

URL-encoded characters in extracted URLs should be preserved. `https://example.com/search?q=hello%20world` is a valid URL — do not decode the `%20` during extraction. Decoding happens when you use the URL, not when you extract it.

Query parameters and fragments make URLs appear different when they are functionally the same. `https://example.com/page` and `https://example.com/page?ref=twitter` may point to the same content. Decide whether to deduplicate by full URL or by path only based on your use case.

## Conclusion

URL extraction turns unstructured text into actionable link inventories. Whether you are building redirect maps, auditing links for SEO, analyzing competitor content, or collecting web resources, automated extraction is faster and more complete than manual scanning.

The [FlipMyCase URL Extractor](/extract-urls) finds and deduplicates URLs from any text instantly in your browser. For email extraction, use the [Email Extractor](/extract-emails). For building URL-matching patterns, use the [Regex Tester](/regex-tester). For generating clean URLs from titles, use the [Slug Generator](/slug-generator).
