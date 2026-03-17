---
title: "Text Sorter — How to Sort Lines Alphabetically Online"
description: "Sort text lines alphabetically, numerically, by length, or in reverse order. Free online tool with case-insensitive sorting and duplicate removal. No signup required."
date: "2026-03-16"
keywords: ["text sorter", "sort lines alphabetically", "sort text online", "alphabetical sorter", "sort lines of text", "text sorter tool", "sort list alphabetically"]
toolSlug: "text-sorter"
faq:
  - question: "How do I sort text alphabetically online?"
    answer: "Paste your text into the FlipMyCase Text Sorter. Each line is treated as an item and sorted alphabetically (A-Z). Toggle reverse for Z-A order. Works with names, lists, data, and any line-separated text."
  - question: "Can I sort numerically instead of alphabetically?"
    answer: "Yes. Switch to numeric sort mode. This sorts '2, 10, 1, 20' correctly as '1, 2, 10, 20' instead of the alphabetical order '1, 10, 2, 20' which treats numbers as text strings."
  - question: "Does sorting remove duplicate lines?"
    answer: "The sort itself preserves duplicates but shows them adjacent. Enable the remove-duplicates option to keep only unique lines after sorting. For dedicated deduplication without sorting, use the Duplicate Remover tool."
  - question: "Is the sort case-sensitive?"
    answer: "By default, sorting is case-insensitive — 'apple' and 'Apple' sort to the same position. Toggle case-sensitive mode if you need uppercase letters sorted separately from lowercase (ASCII order: uppercase A-Z before lowercase a-z)."
related: ["duplicate-remover-guide", "text-cleaner-guide", "word-counter-guide"]
---

# Text Sorter — How to Sort Lines Alphabetically Online

Sorting text is one of those operations you need constantly but never have the right tool open for. You have a list of names that needs alphabetical ordering. A CSV column needs numerical sorting. A configuration file's entries should be organized for readability. A bibliography needs to be alphabetized. You could paste into a spreadsheet, sort, and paste back — or you could use a tool that sorts text directly in seconds.

This guide covers how text sorting works, the different sort modes and when to use each, how to sort programmatically, and the subtle issues that cause incorrect sort results.

## What Is Text Sorting?

Text sorting takes a block of text, treats each line as an individual item, and reorders the lines according to a specified criterion. Alphabetical sorting arranges lines from A to Z (or Z to A for reverse). Numeric sorting orders lines by their numeric value. Length sorting arranges lines from shortest to longest. The output is the same content, just reordered.

You would use text sorting for organizing name lists, alphabetizing bibliographies and references, ordering configuration entries, sorting log entries chronologically, arranging keyword lists for SEO, and cleaning up any unstructured list into a logical order.

## How to Sort Text with FlipMyCase

1. Open the [FlipMyCase Text Sorter](/text-sorter).
2. Paste your text — each line becomes a sortable item.
3. Choose your sort mode: alphabetical, reverse, numeric, or by line length.
4. Toggle case sensitivity and duplicate removal if needed.
5. Copy the sorted result.

For removing duplicates without sorting, use the [Duplicate Remover](/duplicate-line-remover). For counting words in your sorted text, use the [Word Counter](/word-counter).

## Code Examples for Text Sorting

### JavaScript

```javascript
// Alphabetical sort
function sortLines(text, options = {}) {
  const {
    reverse = false,
    numeric = false,
    caseInsensitive = true,
    removeDuplicates = false,
    byLength = false,
  } = options;

  let lines = text.split('\n').filter(line => line.trim() !== '');

  if (removeDuplicates) {
    const seen = new Set();
    lines = lines.filter(line => {
      const key = caseInsensitive ? line.toLowerCase().trim() : line.trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  lines.sort((a, b) => {
    if (byLength) return a.length - b.length;
    if (numeric) return parseFloat(a) - parseFloat(b);
    const aVal = caseInsensitive ? a.toLowerCase() : a;
    const bVal = caseInsensitive ? b.toLowerCase() : b;
    return aVal.localeCompare(bVal);
  });

  if (reverse) lines.reverse();
  return lines.join('\n');
}

const names = `Charlie
alice
Bob
alice
David`;

console.log(sortLines(names));
// alice
// alice
// Bob
// Charlie
// David

console.log(sortLines(names, { removeDuplicates: true }));
// alice
// Bob
// Charlie
// David

// Numeric sort
const numbers = `10\n2\n30\n1\n20`;
console.log(sortLines(numbers, { numeric: true }));
// 1
// 2
// 10
// 20
// 30
```

### Python

```python
def sort_lines(text, reverse=False, numeric=False, case_insensitive=True,
               remove_duplicates=False, by_length=False):
    lines = [line for line in text.strip().split('\n') if line.strip()]

    if remove_duplicates:
        seen = set()
        unique = []
        for line in lines:
            key = line.lower().strip() if case_insensitive else line.strip()
            if key not in seen:
                seen.add(key)
                unique.append(line)
        lines = unique

    if by_length:
        lines.sort(key=len, reverse=reverse)
    elif numeric:
        lines.sort(key=lambda x: float(x.strip()) if x.strip().replace('.','',1).replace('-','',1).isdigit() else 0, reverse=reverse)
    else:
        key_func = (lambda x: x.lower()) if case_insensitive else None
        lines.sort(key=key_func, reverse=reverse)

    return '\n'.join(lines)

names = """Charlie
alice
Bob
alice
David"""

print(sort_lines(names, remove_duplicates=True))
# alice
# Bob
# Charlie
# David

# Sort by line length
text = """Short
A much longer line here
Medium line
Tiny"""
print(sort_lines(text, by_length=True))
# Tiny
# Short
# Medium line
# A much longer line here

# Sort file contents
with open('list.txt', 'r') as f:
    content = f.read()
with open('sorted_list.txt', 'w') as f:
    f.write(sort_lines(content))
```

### Bash

```bash
# Alphabetical sort
sort input.txt > sorted.txt

# Reverse sort (Z-A)
sort -r input.txt

# Case-insensitive sort
sort -f input.txt

# Numeric sort
sort -n numbers.txt

# Sort and remove duplicates
sort -u input.txt

# Sort by line length
awk '{ print length, $0 }' input.txt | sort -n | cut -d' ' -f2-

# Sort CSV by specific column (column 2)
sort -t',' -k2 data.csv

# Random shuffle (opposite of sort)
sort -R input.txt
```

## Real-World Use Cases

**Alphabetizing name lists.** Event attendee lists, employee directories, and membership rosters need alphabetical ordering. Paste the names into the [Text Sorter](/text-sorter), sort A-Z, and copy the organized list. Enable duplicate removal to catch repeated entries.

**Organizing configuration files.** Configuration files with dozens of key-value pairs are easier to navigate when alphabetically ordered. Sort environment variables, package.json dependencies, or .gitignore entries for consistency across a team.

**SEO keyword organization.** After exporting keywords from a research tool, sort them alphabetically to group related terms, or sort by length to identify long-tail keywords. Combine with the [Word Frequency Counter](/word-frequency-counter) for density analysis.

**Bibliography and reference formatting.** Academic papers require alphabetized reference lists. Paste your bibliography entries, sort alphabetically by author surname, and copy the ordered list back into your document.

## Common Mistakes and Gotchas

Alphabetical sort treats numbers as text. The list "1, 2, 10, 20" sorts alphabetically as "1, 10, 2, 20" because "10" comes before "2" in string comparison (the first character "1" < "2"). Use numeric sort mode for lists containing numbers.

Case-sensitive sort separates uppercase and lowercase. In ASCII order, all uppercase letters (A-Z) sort before all lowercase letters (a-z), so "Zebra" comes before "apple." Case-insensitive mode fixes this by comparing lowercased values.

Trailing whitespace creates phantom duplicates. "Alice" and "Alice " (with a trailing space) are different strings. Run text through the [Text Cleaner](/text-cleaner) to trim whitespace before sorting and deduplicating.

Locale affects sort order. Different languages have different alphabetical orders. Swedish puts Ä, Ö after Z. German sometimes sorts Ä as AE. JavaScript's `localeCompare()` and Python's `locale.strxfrm()` handle locale-specific sorting correctly.

## Conclusion

Text sorting is a fundamental operation for organizing lists, cleaning data, and maintaining readable configuration files. Whether you are alphabetizing names, ordering keywords, or sorting log entries, having the right sort mode makes the difference between a correct and incorrect result.

The [FlipMyCase Text Sorter](/text-sorter) handles alphabetical, reverse, numeric, and length sorting with case sensitivity and duplicate removal options. For deduplication without reordering, use the [Duplicate Remover](/duplicate-line-remover). For programmatic sorting, the JavaScript, Python, and Bash examples above cover every common scenario.
