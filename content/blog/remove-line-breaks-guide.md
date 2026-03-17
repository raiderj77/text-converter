---
title: "Remove Line Breaks — How to Join Lines and Remove Newlines from Text Online"
description: "Remove line breaks and newlines from text instantly. Free online tool joins broken lines into paragraphs, removes carriage returns, and fixes PDF text. No signup required."
date: "2026-03-17"
keywords: ["remove line breaks", "remove newlines", "join lines of text", "remove carriage return", "fix line breaks", "merge lines online", "remove line breaks from text"]
toolSlug: "remove-line-breaks"
faq:
  - question: "How do I remove line breaks from text?"
    answer: "Paste your text into the FlipMyCase Remove Line Breaks tool. It replaces all newline characters with spaces, joining broken lines into continuous paragraphs. Toggle options to preserve paragraph breaks (double newlines) while removing mid-sentence breaks."
  - question: "Why does my text have random line breaks?"
    answer: "Text copied from PDFs, emails, and terminal output breaks lines at fixed column widths (usually 72-80 characters). These breaks appear mid-sentence when pasted elsewhere. The Remove Line Breaks tool joins them back into flowing paragraphs."
  - question: "Can I keep paragraph breaks while removing line breaks?"
    answer: "Yes. Enable the 'preserve paragraph breaks' option. This replaces single newlines with spaces (fixing mid-sentence breaks) while keeping double newlines that separate paragraphs. This is the most common use case."
  - question: "What is the difference between \\n and \\r\\n?"
    answer: "Unix/Mac uses \\n (line feed). Windows uses \\r\\n (carriage return + line feed). Old Mac used \\r only. The tool handles all three formats automatically, so you do not need to know which your text uses."
related: ["text-cleaner-guide", "remove-empty-lines-guide", "plain-text-converter-guide"]
---

# Remove Line Breaks — How to Join Lines and Remove Newlines from Text

Line breaks in the wrong places are one of the most common text formatting problems. You copy a paragraph from a PDF and every line breaks at 72 characters. You paste terminal output and each line wraps at the console width. You copy from an email and the quoted text has hard line breaks every 76 characters. The result is text that looks like a list when it should be a flowing paragraph.

This guide covers why unwanted line breaks appear, how to remove them while preserving paragraph structure, how to handle it in code, and the specific sources that produce the most broken text.

## What Is Line Break Removal?

Line break removal replaces newline characters (`\n`, `\r\n`, or `\r`) with spaces, joining separate lines into continuous text. The smart version preserves double newlines (paragraph breaks) while removing single newlines (mid-sentence breaks), so you get flowing paragraphs without losing the overall text structure.

You would remove line breaks when cleaning text from PDFs, fixing email-quoted text, converting terminal output to readable prose, preparing text for web forms that expect continuous input, cleaning data for database fields, and reformatting text between applications with different line-wrapping behavior.

## How to Remove Line Breaks with FlipMyCase

1. Open the [FlipMyCase Remove Line Breaks](/remove-line-breaks) tool.
2. Paste your text with unwanted line breaks.
3. Choose your mode: remove all line breaks, or preserve paragraph breaks while removing mid-sentence breaks.
4. Copy the cleaned text.

For additional cleanup like removing extra spaces or trimming whitespace, use the [Text Cleaner](/text-cleaner). For removing blank lines specifically, use the [Remove Empty Lines](/remove-empty-lines) tool.

## Code Examples for Removing Line Breaks

### JavaScript

```javascript
// Remove all line breaks
function removeAllLineBreaks(text) {
  return text.replace(/[\r\n]+/g, ' ').replace(/ {2,}/g, ' ').trim();
}

// Smart removal: preserve paragraph breaks, remove mid-sentence breaks
function removeLineBreaks(text) {
  // Normalize line endings
  let result = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  // Preserve paragraph breaks (double newlines)
  result = result.replace(/\n\n+/g, '{{PARA}}');
  // Replace single newlines with spaces
  result = result.replace(/\n/g, ' ');
  // Restore paragraph breaks
  result = result.replace(/\{\{PARA\}\}/g, '\n\n');
  // Collapse multiple spaces
  result = result.replace(/ {2,}/g, ' ');
  return result.trim();
}

const pdfText = `This is a paragraph that was
copied from a PDF file. Each line
breaks at 40 characters because of
the PDF column width.

This is the second paragraph
which also has unnecessary
line breaks in it.`;

console.log(removeLineBreaks(pdfText));
// This is a paragraph that was copied from a PDF file. Each line breaks at 40 characters because of the PDF column width.
//
// This is the second paragraph which also has unnecessary line breaks in it.
```

### Python

```python
import re

def remove_all_line_breaks(text):
    return re.sub(r'\s+', ' ', text).strip()

def remove_line_breaks(text, preserve_paragraphs=True):
    # Normalize line endings
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    if preserve_paragraphs:
        # Preserve paragraph breaks
        text = re.sub(r'\n{2,}', '{{PARA}}', text)
        text = text.replace('\n', ' ')
        text = text.replace('{{PARA}}', '\n\n')
    else:
        text = text.replace('\n', ' ')
    # Collapse multiple spaces
    text = re.sub(r' {2,}', ' ', text)
    return text.strip()

pdf_text = """This is a paragraph that was
copied from a PDF file. Each line
breaks at 40 characters.

This is the second paragraph
which also has breaks."""

print(remove_line_breaks(pdf_text))
# This is a paragraph that was copied from a PDF file. Each line breaks at 40 characters.
#
# This is the second paragraph which also has breaks.

# Process a file
with open('input.txt', 'r') as f:
    content = f.read()
with open('output.txt', 'w') as f:
    f.write(remove_line_breaks(content))
```

### Bash

```bash
# Remove all line breaks (join into one line)
tr '\n' ' ' < input.txt | sed 's/  */ /g' > output.txt

# Preserve paragraph breaks, remove mid-sentence breaks
awk 'BEGIN{RS=""; ORS="\n\n"} {gsub(/\n/," "); gsub(/  */," "); print}' input.txt

# Remove carriage returns only (\r from Windows files)
tr -d '\r' < windows.txt > unix.txt

# Using sed to join lines
sed ':a;N;$!ba;s/\n/ /g' input.txt

# Remove line breaks from clipboard (macOS)
pbpaste | tr '\n' ' ' | pbcopy
```

## Real-World Use Cases

**Cleaning PDF text.** PDFs are the primary source of unwanted line breaks. Text breaks at page width regardless of sentence boundaries. Paste the PDF text into the [Remove Line Breaks](/remove-line-breaks) tool with paragraph preservation to get flowing text without losing paragraph structure.

**Fixing email quoted text.** Email clients wrap quoted text at 72-76 characters per RFC 2822. When you copy quoted text, each line has a hard break. Remove line breaks to get continuous paragraphs for quoting in documents or new emails.

**Preparing text for HTML.** HTML collapses whitespace, but many CMS editors preserve line breaks as `<br>` tags. If your source text has unwanted breaks, they become visible line breaks on the web page. Clean them before pasting into your CMS.

**Data field cleaning.** Database text fields, CSV cells, and API request bodies often reject or mishandle newlines. Remove line breaks from user input or imported data before storage to prevent formatting issues and query errors.

## Common Mistakes and Gotchas

Removing all line breaks without preserving paragraphs produces a wall of text. Always use the paragraph-preserving mode unless you specifically need a single continuous line. The tool preserves double newlines as paragraph breaks.

Windows line endings (`\r\n`) count as two characters, which can cause off-by-one issues in code. Always normalize to `\n` first, then process. The tool handles this automatically.

Some text uses soft hyphens at line breaks. Words like "pro-\ngramming" should become "programming" not "pro- gramming." Simple line break removal leaves the hyphen and space. For hyphenated line-break repair, remove the trailing hyphen along with the newline.

Preserving intentional line breaks in poetry, code, and addresses requires context awareness. If your text includes an address or poem where line breaks are meaningful, the tool cannot distinguish these from unwanted breaks. Process those sections separately.

## Frequently Asked Questions

**How do I remove line breaks in Excel?**
Use the formula `=SUBSTITUTE(SUBSTITUTE(A1,CHAR(13),""),CHAR(10)," ")` to replace both CR and LF characters with spaces. For bulk cleanup outside Excel, paste into the [Remove Line Breaks](/remove-line-breaks) tool and paste back.

**Why does text from PDFs always have broken lines?**
PDFs store text as positioned characters on a page, not as flowing paragraphs. Each line is a separate text element that ends where the column width dictates. When extracted, these become hard line breaks that do not reflow for different widths.

**Can I remove line breaks from multiple files at once?**
Use the Bash examples above with a loop: `for f in *.txt; do awk '...' "$f" > "clean_$f"; done`. For single files, the FlipMyCase tool is faster. For programmatic bulk processing, use the Python script.

## Conclusion

Line break removal is one of the most frequently needed text operations, especially for text from PDFs, emails, and terminal output. Smart removal that preserves paragraph structure gives you flowing text without losing the overall document layout.

The [FlipMyCase Remove Line Breaks](/remove-line-breaks) tool handles this instantly with paragraph-preservation options. For removing blank lines, use the [Remove Empty Lines](/remove-empty-lines) tool. For broader text cleanup, use the [Text Cleaner](/text-cleaner). For programmatic processing, the JavaScript, Python, and Bash examples above cover all common scenarios.
