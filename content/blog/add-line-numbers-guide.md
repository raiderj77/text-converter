---
title: "Add Line Numbers — How to Number Lines of Text Online"
description: "Add line numbers to any text instantly. Free online tool with customizable start number, padding, and separator. Perfect for code, documentation, and legal text."
date: "2026-03-17"
keywords: ["add line numbers", "number lines of text", "line numbering tool", "add line numbers online", "text line numbers", "number text lines", "prepend line numbers"]
toolSlug: "add-line-numbers"
faq:
  - question: "How do I add line numbers to text?"
    answer: "Paste your text into the FlipMyCase Add Line Numbers tool. Each line gets a sequential number prepended. Customize the start number, separator (period, colon, tab), and padding (right-aligned numbers for neat columns)."
  - question: "Can I start numbering from a number other than 1?"
    answer: "Yes. Set the start number to any value. This is useful for numbering code snippets that start at a specific line in a file, or for continuing numbering across multiple text blocks."
  - question: "Does the tool pad numbers for alignment?"
    answer: "Yes. Enable padding to right-align numbers so that line 1 and line 100 take the same width. This produces clean columns: '  1. text' and '100. text' instead of '1. text' and '100. text'."
  - question: "How do I remove line numbers from text?"
    answer: "Use the Find and Replace tool with regex mode enabled. Search for a pattern matching digits followed by a separator at the start of each line, and replace with nothing. This strips leading numbers from every line."
related: ["line-counter-guide", "text-sorter-guide", "word-counter-guide"]
---

# Add Line Numbers — How to Number Lines of Text Online

Line numbers are essential for referencing specific positions in text. Code reviews reference "line 42." Legal documents cite "paragraph 7, line 3." Educational materials number lines for classroom discussion. Error messages point to specific line numbers. Without numbering, directing someone to a particular location in text requires quoting the entire line or describing its position vaguely.

This guide covers how line numbering works, when you need it, how to do it programmatically, and the formatting options that make numbered text readable.

## What Is Line Numbering?

Line numbering prepends a sequential number to each line of text. The simplest form produces "1. First line" / "2. Second line." Options include the starting number, separator character (period, colon, tab, space), zero-padding for alignment, and whether to number blank lines.

You would add line numbers when preparing code for review or documentation, creating legal exhibits with line references, numbering quiz or test questions, formatting scripts and screenplays, preparing text for classroom discussion where students reference by line, and debugging data files where position matters.

## How to Add Line Numbers with FlipMyCase

1. Open the [FlipMyCase Add Line Numbers](/add-line-numbers) tool.
2. Paste your text.
3. Set the starting number, separator style, and padding preference.
4. Copy the numbered text for use in documents, emails, or code.

For counting lines without numbering them, use the [Line Counter](/line-counter). For broader text formatting, use the [Text Cleaner](/text-cleaner).

## Code Examples for Adding Line Numbers

### JavaScript

```javascript
function addLineNumbers(text, options = {}) {
  const {
    start = 1,
    separator = '. ',
    pad = true,
    numberBlanks = true,
  } = options;

  const lines = text.split('\n');
  const maxNum = start + lines.length - 1;
  const width = pad ? String(maxNum).length : 0;
  let num = start;

  return lines.map(line => {
    if (!numberBlanks && line.trim() === '') {
      return line;
    }
    const numStr = pad ? String(num).padStart(width, ' ') : String(num);
    num++;
    return `${numStr}${separator}${line}`;
  }).join('\n');
}

const code = `function hello() {
  console.log("Hello!");
}

function goodbye() {
  console.log("Goodbye!");
}`;

console.log(addLineNumbers(code));
// 1. function hello() {
// 2.   console.log("Hello!");
// 3. }
// 4.
// 5. function goodbye() {
// 6.   console.log("Goodbye!");
// 7. }

// With custom options
console.log(addLineNumbers(code, { start: 10, separator: ': ', pad: true }));
// 10: function hello() {
// 11:   console.log("Hello!");
// ...

// Remove line numbers
function removeLineNumbers(text) {
  return text.replace(/^\s*\d+[.:)\s]+/gm, '');
}
```

### Python

```python
def add_line_numbers(text, start=1, separator='. ', pad=True, number_blanks=True):
    lines = text.split('\n')
    max_num = start + len(lines) - 1
    width = len(str(max_num)) if pad else 0
    num = start
    result = []

    for line in lines:
        if not number_blanks and not line.strip():
            result.append(line)
            continue
        num_str = str(num).rjust(width) if pad else str(num)
        result.append(f'{num_str}{separator}{line}')
        num += 1

    return '\n'.join(result)

code = """def hello():
    print("Hello!")

def goodbye():
    print("Goodbye!")"""

print(add_line_numbers(code))
# 1. def hello():
# 2.     print("Hello!")
# 3.
# 4. def goodbye():
# 5.     print("Goodbye!")

# Number a file
with open('script.py', 'r') as f:
    content = f.read()
print(add_line_numbers(content, start=1, separator='\t'))

# Remove line numbers
import re
def remove_line_numbers(text):
    return re.sub(r'^\s*\d+[.:)\s]+', '', text, flags=re.MULTILINE)
```

### Bash

```bash
# Add line numbers with nl
nl -ba input.txt

# Add line numbers with cat
cat -n input.txt

# Custom format with awk
awk '{printf "%3d. %s\n", NR, $0}' input.txt

# Start from a specific number
awk -v start=10 '{printf "%3d. %s\n", NR+start-1, $0}' input.txt

# Number only non-blank lines
nl -bt input.txt

# Add line numbers with colon separator
awk '{print NR": "$0}' input.txt

# Number lines in a code file for review
pr -tn input.py
```

## Real-World Use Cases

**Code review preparation.** When sharing code via email, chat, or documentation (outside of GitHub), add line numbers so reviewers can reference specific lines. "Check line 15 — the condition should be `>=` not `>`" is much more efficient than quoting the entire line. Use the [Add Line Numbers](/add-line-numbers) tool for quick numbering.

**Legal and academic formatting.** Court filings, legal briefs, and academic transcripts require line-numbered text for precise citation. "See Exhibit A, lines 12-15" is a standard legal reference format.

**Screenplay and script formatting.** Screenplays and theatrical scripts use line numbers for directing blocking notes and rehearsal references. "Start from line 47" is standard rehearsal language.

**Educational materials.** Poems, passages, and code samples in textbooks are numbered for classroom discussion. "What literary device appears in line 8?" requires line numbers to be meaningful.

## Common Mistakes and Gotchas

Numbering includes blank lines by default. If your text has blank lines that you do not want numbered, toggle the "skip blank lines" option or filter them in code. Whether to number blanks depends on your use case — legal text numbers every line, code snippets may skip blanks.

Padding matters for readability. Without padding, line "1." and line "100." have different widths, creating ragged left margins. Always pad with spaces when the text exceeds 9 lines (single digit to double digit transition) or 99 lines (double to triple).

Copying numbered text preserves the numbers. If you paste numbered text into a code editor, the line numbers become part of the content and break the code. Always remove numbers before using the text as executable code. The regex examples above handle removal.

Tab characters in separators align differently across applications. A tab after the line number looks great in a monospace editor but misaligns in proportional-font applications. Use spaces or fixed separators (". ", ": ") for universal compatibility.

## Frequently Asked Questions

**How do I show line numbers in VS Code?**
VS Code shows line numbers by default. Toggle with Settings > Editor: Line Numbers. Options are "on" (absolute numbers), "relative" (distance from cursor), and "off." For sharing numbered code outside VS Code, use the [Add Line Numbers](/add-line-numbers) tool.

**Can I number only specific lines?**
The tool numbers all lines sequentially. To number a subset, extract the lines you want, number them, then reassemble. For conditional numbering, use the Python or JavaScript code examples with a custom filter function.

**How do I add line numbers to a PDF?**
PDFs require specialized tools. In Word, go to Layout > Line Numbers. In LaTeX, use the `lineno` package. For plain text that will become a PDF, number the text with FlipMyCase first, then convert to PDF.

## Conclusion

Line numbering is a simple operation with wide application across code review, legal formatting, education, and documentation. Customizable options for start number, separator, and padding ensure the output matches your specific format requirements.

The [FlipMyCase Add Line Numbers](/add-line-numbers) tool handles numbering instantly with full customization. For counting lines, use the [Line Counter](/line-counter). For sorting numbered lists, use the [Text Sorter](/text-sorter). For programmatic numbering, the JavaScript, Python, and Bash examples above cover all common scenarios.
