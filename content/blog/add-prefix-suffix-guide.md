---
title: "Add Prefix and Suffix — How to Prepend or Append Text to Every Line Online"
description: "Add a prefix, suffix, or both to every line of text instantly. Free online tool for batch text formatting, CSV wrapping, SQL generation, and data preparation."
date: "2026-03-17"
keywords: ["add prefix suffix", "prepend text to lines", "append text to lines", "add text to beginning of each line", "batch add prefix", "add suffix to lines", "wrap lines with text"]
toolSlug: "add-prefix-suffix"
faq:
  - question: "How do I add text to the beginning of every line?"
    answer: "Paste your text into the FlipMyCase Add Prefix/Suffix tool, type your prefix text, and every line instantly gets the prefix prepended. Works with any text including code, data, and lists."
  - question: "Can I add both a prefix and suffix at the same time?"
    answer: "Yes. Enter text in both the prefix and suffix fields. Each line gets the prefix added to the start and the suffix added to the end simultaneously. This is useful for wrapping lines in quotes, tags, or SQL syntax."
  - question: "How do I wrap each line in quotes?"
    answer: "Set the prefix to a quote character and the suffix to the same quote. For double quotes, prefix is one double-quote and suffix is another. For single quotes, same approach. This is perfect for preparing SQL IN clauses or CSV values."
  - question: "Does it work with empty lines?"
    answer: "By default, empty lines receive the prefix and suffix. Toggle the skip-empty-lines option to leave blank lines unchanged while modifying only lines with content."
related: ["find-and-replace-guide", "add-line-numbers-guide", "text-cleaner-guide"]
---

# Add Prefix and Suffix — How to Prepend or Append Text to Every Line

Adding the same text to the beginning or end of every line is a constant need in data work. You need to wrap a list of IDs in quotes for a SQL IN clause. You need to prepend `https://` to a list of domains. You need to append `.jpg` to a list of filenames. You need to wrap each line in HTML tags. Doing this manually for 10 lines is tedious; for 1,000 lines it is impossible.

This guide covers how prefix/suffix addition works, common formatting patterns, how to do it programmatically, and the batch text operations that save the most time.

## What Is Prefix/Suffix Addition?

Prefix/suffix addition prepends and/or appends a fixed string to every line of text. A prefix is added to the beginning of each line, a suffix to the end, or both simultaneously. This transforms a raw list into formatted output without manual editing of each line.

You would add prefixes and suffixes when generating SQL values from a list (`'value',`), wrapping items in HTML tags (`<li>item</li>`), prepending URLs to paths (`https://example.com/path`), appending file extensions (`.txt`, `.jpg`), adding CSS classes or selectors, and formatting data for import into other systems.

## How to Add Prefix/Suffix with FlipMyCase

1. Open the [FlipMyCase Add Prefix/Suffix](/add-prefix-suffix) tool.
2. Paste your text.
3. Enter the prefix text, suffix text, or both.
4. Every line updates instantly with the added text.
5. Copy the result.

For more complex pattern-based text manipulation, use the [Find and Replace](/find-and-replace) tool with regex. For adding sequential numbers instead of fixed text, use the [Add Line Numbers](/add-line-numbers) tool.

## Code Examples for Adding Prefix and Suffix

### JavaScript

```javascript
function addPrefixSuffix(text, options = {}) {
  const { prefix = '', suffix = '', skipEmpty = false } = options;
  return text.split('\n').map(line => {
    if (skipEmpty && line.trim() === '') return line;
    return `${prefix}${line}${suffix}`;
  }).join('\n');
}

const ids = `1001
1002
1003
1004`;

// SQL IN clause
console.log(addPrefixSuffix(ids, { prefix: "'", suffix: "'," }));
// '1001',
// '1002',
// '1003',
// '1004',

// URL generation
const paths = `about
contact
blog
pricing`;
console.log(addPrefixSuffix(paths, { prefix: 'https://example.com/' }));
// https://example.com/about
// https://example.com/contact
// https://example.com/blog
// https://example.com/pricing

// HTML wrapping
const items = `Home
About
Contact`;
console.log(addPrefixSuffix(items, { prefix: '  <li>', suffix: '</li>' }));
//   <li>Home</li>
//   <li>About</li>
//   <li>Contact</li>

// CSS class generation
const names = `header
sidebar
footer`;
console.log(addPrefixSuffix(names, { prefix: '.', suffix: ' {' }));
// .header {
// .sidebar {
// .footer {
```

### Python

```python
def add_prefix_suffix(text, prefix='', suffix='', skip_empty=False):
    lines = text.split('\n')
    result = []
    for line in lines:
        if skip_empty and not line.strip():
            result.append(line)
        else:
            result.append(f'{prefix}{line}{suffix}')
    return '\n'.join(result)

ids = """1001
1002
1003
1004"""

# SQL IN clause
print(add_prefix_suffix(ids, prefix="'", suffix="',"))
# '1001',
# '1002',
# '1003',
# '1004',

# Wrap in double quotes for CSV
names = """Alice
Bob
Charlie"""
print(add_prefix_suffix(names, prefix='"', suffix='"'))
# "Alice"
# "Bob"
# "Charlie"

# Add file extension
files = """report
summary
analysis"""
print(add_prefix_suffix(files, suffix='.pdf'))
# report.pdf
# summary.pdf
# analysis.pdf
```

### Bash

```bash
# Add prefix to every line
sed 's/^/PREFIX /' input.txt

# Add suffix to every line
sed 's/$/ SUFFIX/' input.txt

# Add both prefix and suffix
sed "s/^/'/;s/$/',/" input.txt
# Turns each line into 'line',

# Wrap lines in HTML li tags
sed 's/^/  <li>/;s/$/<\/li>/' input.txt

# Add URL prefix
sed 's|^|https://example.com/|' paths.txt

# Add file extension
sed 's/$/.jpg/' filenames.txt

# Using awk
awk '{print "PREFIX" $0 "SUFFIX"}' input.txt
```

## Real-World Use Cases

**SQL query building.** You have a list of IDs and need a SQL IN clause: `WHERE id IN ('1001', '1002', '1003')`. Add single-quote prefix and `',` suffix to each line using the [Add Prefix/Suffix](/add-prefix-suffix) tool, then wrap the result in `WHERE id IN (...)`. This is faster than manually quoting hundreds of IDs.

**URL generation from paths.** You have a list of page paths (`/about`, `/contact`, `/blog`) and need full URLs. Add `https://example.com` as a prefix. This is useful for generating sitemap entries, redirect maps, and link lists.

**HTML and Markdown formatting.** Wrap each line in `<li>...</li>` tags for an HTML list, or prepend `- ` for Markdown bullets. The tool handles the repetitive formatting that would take minutes to do manually.

**File path construction.** Add a directory prefix (`/var/log/`) and file extension suffix (`.log`) to a list of names to generate complete file paths for scripts and automation.

## Common Mistakes and Gotchas

Trailing whitespace on lines causes the suffix to appear after invisible spaces. Clean your text with the [Text Cleaner](/text-cleaner) first to trim each line, then add prefix and suffix to get clean results.

The last line in a SQL list should not have a trailing comma. When generating `'value',` for SQL, remove the final comma manually, or use your SQL tool's array syntax which does not need commas.

Empty lines receive prefix and suffix by default, producing lines that are just the prefix+suffix with no content. Enable skip-empty-lines mode if your text has blank lines you want to preserve as-is.

Special characters in prefix/suffix need escaping in code. In the Bash `sed` examples, `/` in URLs requires using a different delimiter: `sed 's|^|https://|'` instead of `sed 's/^/https:\/\//'`.

## Frequently Asked Questions

**Can I add different prefixes to different lines?**
The [Add Prefix/Suffix](/add-prefix-suffix) tool adds the same prefix to every line. For conditional or varying prefixes, use the [Find and Replace](/find-and-replace) tool with regex capture groups to match specific patterns and add context-dependent text.

**How do I wrap each line in both single and double quotes?**
Set the prefix to `"'` and the suffix to `'"`. This produces `"'value'"` for each line. For just double quotes, use `"` as both prefix and suffix. The tool handles any combination of quote characters.

**Can I add a prefix to specific lines only?**
Not directly — the tool applies to every line. Filter your text first (extract the lines you want with the [Find and Replace](/find-and-replace) tool), apply the prefix, then recombine. Or use `sed` with an address range: `sed '2,5s/^/PREFIX/' file.txt`.

## Conclusion

Adding prefix and suffix text to every line is one of the most common batch text operations. Whether you are building SQL queries, generating URLs, wrapping lines in HTML, or constructing file paths, a dedicated tool saves minutes of manual editing.

The [FlipMyCase Add Prefix/Suffix](/add-prefix-suffix) tool handles both prefix and suffix simultaneously with skip-empty-lines support. For pattern-based manipulation, use the [Find and Replace](/find-and-replace) tool. For sequential numbering, use the [Add Line Numbers](/add-line-numbers) tool. For programmatic use, the JavaScript, Python, and Bash examples above cover all common patterns.
