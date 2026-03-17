---
title: "Text to List — How to Convert Paragraphs to Bullet Points Online"
description: "Convert text paragraphs to bullet points, numbered lists, HTML lists, or Markdown lists instantly. Free online tool for formatting content. No signup required."
date: "2026-03-17"
keywords: ["text to list", "paragraph to bullet points", "text to bullet list", "convert text to list", "text to numbered list", "paragraph to list converter", "text to html list"]
toolSlug: "text-to-list"
faq:
  - question: "How do I convert text to a bullet list?"
    answer: "Paste your text into the FlipMyCase Text to List tool. Each line or sentence becomes a bullet point. Choose your format: plain bullet list, numbered list, HTML ul/ol, or Markdown list. Copy the formatted result."
  - question: "Can I convert paragraphs into separate list items?"
    answer: "Yes. The tool splits text by line breaks or sentence boundaries. For paragraph text without line breaks, enable sentence splitting mode. Each sentence becomes its own list item."
  - question: "What output formats are supported?"
    answer: "The tool outputs plain text bullets (- or *), numbered lists (1. 2. 3.), HTML lists (ul/li or ol/li), and Markdown lists (- item or 1. item). Choose the format that matches your destination platform."
  - question: "How do I do the reverse — list to paragraph?"
    answer: "Use the companion List to Text tool. It removes bullet markers, numbers, and list formatting, joining items into flowing paragraph text."
related: ["list-to-text-guide", "text-cleaner-guide", "add-line-numbers-guide"]
---

# Text to List — How to Convert Paragraphs to Bullet Points Online

Bullet points make content scannable. Readers skim lists 2-3 times faster than paragraphs, and retention improves when information is structured as discrete items. But content often arrives as unstructured paragraphs — meeting notes, brainstorm output, pasted text, email threads — that need conversion to list format for presentations, documentation, wiki pages, and web content.

This guide covers how to convert text to lists in different formats, how to handle it programmatically, and the formatting conventions for different output platforms.

## What Is Text-to-List Conversion?

Text-to-list conversion takes unstructured text and splits it into individual list items, adding formatting markers appropriate to the target platform. Lines become bullet points (`-` or `*`), numbered entries (`1.`, `2.`), HTML list elements (`<li>`), or Markdown list items. The splitting can happen on line breaks, sentence boundaries, or custom delimiters.

You would convert text to lists when formatting meeting notes for documentation, creating presentation slides from paragraph text, structuring content for web pages, converting email text to action items, and preparing data for structured formats like HTML or Markdown.

## How to Convert Text to Lists with FlipMyCase

1. Open the [FlipMyCase Text to List](/text-to-list) tool.
2. Paste your text.
3. Choose your output format: bullets, numbers, HTML, or Markdown.
4. Adjust splitting mode: by line break or by sentence.
5. Copy the formatted list.

For the reverse operation (list to paragraph), use the [List to Text](/list-to-text) tool. For adding sequential numbers to lines, use the [Add Line Numbers](/add-line-numbers) tool.

## Code Examples for Text-to-List Conversion

### JavaScript

```javascript
function textToList(text, options = {}) {
  const { format = 'bullet', splitOn = 'line' } = options;

  let items;
  if (splitOn === 'sentence') {
    items = text.split(/(?<=[.!?])\s+/).filter(s => s.trim());
  } else {
    items = text.split('\n').filter(line => line.trim());
  }

  switch (format) {
    case 'bullet':
      return items.map(item => `- ${item.trim()}`).join('\n');
    case 'numbered':
      return items.map((item, i) => `${i + 1}. ${item.trim()}`).join('\n');
    case 'html':
      const lis = items.map(item => `  <li>${item.trim()}</li>`).join('\n');
      return `<ul>\n${lis}\n</ul>`;
    case 'markdown':
      return items.map(item => `- ${item.trim()}`).join('\n');
    default:
      return items.map(item => `• ${item.trim()}`).join('\n');
  }
}

const notes = `Review the Q1 metrics
Update the documentation
Fix the login bug
Deploy to staging`;

console.log(textToList(notes, { format: 'bullet' }));
// - Review the Q1 metrics
// - Update the documentation
// - Fix the login bug
// - Deploy to staging

console.log(textToList(notes, { format: 'html' }));
// <ul>
//   <li>Review the Q1 metrics</li>
//   <li>Update the documentation</li>
//   <li>Fix the login bug</li>
//   <li>Deploy to staging</li>
// </ul>

// Sentence splitting
const paragraph = 'We need to review metrics. The docs are outdated. The login bug is critical.';
console.log(textToList(paragraph, { format: 'numbered', splitOn: 'sentence' }));
// 1. We need to review metrics.
// 2. The docs are outdated.
// 3. The login bug is critical.
```

### Python

```python
import re

def text_to_list(text, fmt='bullet', split_on='line'):
    if split_on == 'sentence':
        items = re.split(r'(?<=[.!?])\s+', text.strip())
    else:
        items = [line.strip() for line in text.strip().split('\n') if line.strip()]

    if fmt == 'bullet':
        return '\n'.join(f'- {item}' for item in items)
    elif fmt == 'numbered':
        return '\n'.join(f'{i+1}. {item}' for i, item in enumerate(items))
    elif fmt == 'html':
        lis = '\n'.join(f'  <li>{item}</li>' for item in items)
        return f'<ul>\n{lis}\n</ul>'
    elif fmt == 'markdown':
        return '\n'.join(f'- {item}' for item in items)
    elif fmt == 'checklist':
        return '\n'.join(f'- [ ] {item}' for item in items)

notes = """Review the Q1 metrics
Update the documentation
Fix the login bug
Deploy to staging"""

print(text_to_list(notes, 'bullet'))
print()
print(text_to_list(notes, 'html'))
print()
print(text_to_list(notes, 'checklist'))
# - [ ] Review the Q1 metrics
# - [ ] Update the documentation
# - [ ] Fix the login bug
# - [ ] Deploy to staging
```

### Bash

```bash
# Lines to bullet list
sed 's/^/- /' input.txt

# Lines to numbered list
awk '{print NR". "$0}' input.txt

# Lines to HTML list
echo "<ul>" && sed 's/^.*$/  <li>&<\/li>/' input.txt && echo "</ul>"

# Lines to Markdown checklist
sed 's/^/- [ ] /' input.txt

# Sentences to bullet list (split on period)
echo "First item. Second item. Third item." | \
  sed 's/\. /\n/g' | sed 's/^/- /'
```

## Real-World Use Cases

**Meeting notes formatting.** Raw meeting notes arrive as text lines. Convert to a numbered list for the summary email, an HTML list for the wiki page, or a Markdown checklist for the task tracker. The [Text to List](/text-to-list) tool handles all formats.

**Content structuring for CMS.** Blog post drafts often contain information as paragraph text that reads better as bullet points. Convert key sections to lists for improved scannability. Check the word count before and after with the [Word Counter](/word-counter).

**Presentation slide creation.** Paste paragraph notes into the tool, convert to bullet points, and copy into your slide deck. Each bullet becomes a talking point.

**Task list creation from brainstorm output.** Brainstorming sessions produce unstructured text. Convert to a checklist format and paste into your project management tool.

## Common Mistakes and Gotchas

Paragraph text without line breaks needs sentence splitting. If you paste a single paragraph, line-break splitting produces one giant list item. Switch to sentence splitting mode to break on periods, question marks, and exclamation marks.

Empty lines between items create blank list entries. Clean your text with the [Remove Empty Lines](/remove-empty-lines) tool before converting to avoid empty bullet points.

HTML list output needs sanitization if the source contains HTML. A line like "Use the <script> tag" in an HTML list creates invalid nesting. Escape HTML entities in the content before wrapping in `<li>` tags.

Nested lists require manual structure. The tool creates flat lists. For sub-items (indented bullets under parent items), you need to add indentation manually or use an editor that supports nested list creation.

## Frequently Asked Questions

**Can I create nested sub-lists?**
The tool creates flat, single-level lists. For nested lists, convert to your base format first, then add indentation manually in your editor. In Markdown, indent sub-items with 2 spaces. In HTML, nest `<ul>` inside `<li>`.

**How do I convert comma-separated text to a list?**
Paste comma-separated text and the tool splits on commas as well as line breaks. Alternatively, use the [Find and Replace](/find-and-replace) tool to replace commas with newlines first, then convert to your list format.

**What is the best list format for email?**
Use plain text bullets (- or *) for plain-text emails. Use HTML `<ul>` lists for HTML emails. Avoid Markdown in emails since most email clients do not render Markdown natively.

## Conclusion

Converting text to lists is one of the fastest ways to improve content readability. Whether you are formatting meeting notes, structuring web content, or creating task lists, the right list format makes information scannable and actionable.

The [FlipMyCase Text to List](/text-to-list) tool handles bullets, numbers, HTML, and Markdown formats instantly. For the reverse conversion, use the [List to Text](/list-to-text) tool. For cleaning text before conversion, use the [Text Cleaner](/text-cleaner). For programmatic conversion, the JavaScript, Python, and Bash examples above cover all common formats.
