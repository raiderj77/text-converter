---
title: "Strikethrough Text Generator — How to Create Crossed-Out Text Online"
description: "Generate strikethrough Unicode text you can copy and paste anywhere. Free online tool creates crossed-out text for social media, messaging, and creative emphasis."
date: "2026-03-17"
keywords: ["strikethrough text", "strikethrough generator", "crossed out text", "strikethrough copy paste", "strikethrough unicode", "strikethrough text online", "cross out text"]
toolSlug: "strikethrough-text-generator"
faq:
  - question: "How do I create strikethrough text?"
    answer: "Type your text into the FlipMyCase Strikethrough Text Generator. It adds Unicode combining strikethrough characters to each letter, creating text that appears crossed out. Copy and paste it into any platform that supports Unicode."
  - question: "How does Unicode strikethrough work?"
    answer: "Unicode strikethrough uses combining characters (U+0336 for long stroke, U+0335 for short stroke) placed after each letter. The combining character overlays a line through the preceding character. This is different from HTML or Markdown strikethrough."
  - question: "Where can I paste strikethrough text?"
    answer: "Anywhere that supports Unicode: social media (Instagram, Twitter/X, Facebook), messaging apps (WhatsApp, Discord, Telegram), email, and text documents. Some platforms may not render combining characters consistently."
  - question: "Is this the same as Markdown strikethrough?"
    answer: "No. Markdown uses ~~text~~ syntax which the platform renders as strikethrough. Unicode strikethrough uses combining characters that are part of the text itself. Unicode works in plain text fields where Markdown is not supported."
related: ["bold-text-generator-guide", "fancy-text-generator-guide", "unicode-lookup-guide"]
---

# Strikethrough Text Generator — How to Create Crossed-Out Text Online

Strikethrough text communicates correction, humor, irony, and dramatic revision in a way no other formatting can. Crossing out a word while keeping it visible says "I said this but I am taking it back (but not really)." It is the written equivalent of stage-whispering — the audience sees both what you crossed out and what you replaced it with, creating a layered meaning that plain text cannot achieve.

This guide covers how Unicode strikethrough works, the difference between Unicode and Markdown approaches, how to generate it in code, and the creative and practical uses for crossed-out text.

## What Is Strikethrough Text?

Strikethrough text displays with a horizontal line through the middle of each character, making it appear crossed out. In Unicode, this is achieved by appending a combining strikethrough character (U+0336) after each letter. The combining character renders as a line overlaid on the preceding character. The text "Hello" becomes "H̶e̶l̶l̶o̶" — still readable but visually marked as deleted or corrected.

You would use strikethrough text for showing corrections while keeping original text visible, creating humorous or ironic emphasis, indicating deprecated or outdated information, editing text in social media posts without deleting, and creative writing effects.

## How to Generate Strikethrough Text with FlipMyCase

1. Open the [FlipMyCase Strikethrough Text Generator](/strikethrough-text-generator).
2. Type your text.
3. The tool adds combining strikethrough characters to produce crossed-out text.
4. Copy and paste into social media, messages, or documents.

For other Unicode text effects, use the [Fancy Text Generator](/fancy-text-generator). For bold Unicode text, use the [Bold Text Generator](/bold-text-generator).

## Code Examples for Strikethrough Generation

### JavaScript

```javascript
// Unicode strikethrough using combining long stroke (U+0336)
function toStrikethrough(text) {
  return [...text].map(char => char + '\u0336').join('');
}

console.log(toStrikethrough('Hello World'));
// H̶e̶l̶l̶o̶ ̶W̶o̶r̶l̶d̶

// Short stroke variant (U+0335)
function toShortStrikethrough(text) {
  return [...text].map(char => char + '\u0335').join('');
}

console.log(toShortStrikethrough('Hello World'));
// H̵e̵l̵l̵o̵ ̵W̵o̵r̵l̵d̵

// Remove strikethrough (strip combining characters)
function removeStrikethrough(text) {
  return text.replace(/[\u0335\u0336]/g, '');
}

console.log(removeStrikethrough('H̶e̶l̶l̶o̶'));  // Hello

// Creative correction format
function correction(wrong, right) {
  return `${toStrikethrough(wrong)} ${right}`;
}

console.log(correction('bugs', 'features'));
// b̶u̶g̶s̶ features

// HTML strikethrough for web content
function htmlStrikethrough(text) {
  return `<del>${text}</del>`;
}

// Markdown strikethrough (GitHub Flavored)
function markdownStrikethrough(text) {
  return `~~${text}~~`;
}
```

### Python

```python
# Unicode strikethrough with combining character
def to_strikethrough(text):
    return ''.join(char + '\u0336' for char in text)

print(to_strikethrough('Hello World'))
# H̶e̶l̶l̶o̶ ̶W̶o̶r̶l̶d̶

# Short stroke variant
def to_short_strikethrough(text):
    return ''.join(char + '\u0335' for char in text)

print(to_short_strikethrough('Hello World'))

# Remove strikethrough
import re
def remove_strikethrough(text):
    return re.sub(r'[\u0335\u0336]', '', text)

print(remove_strikethrough('H̶e̶l̶l̶o̶'))  # Hello

# Creative correction
def correction(wrong, right):
    return f'{to_strikethrough(wrong)} {right}'

print(correction('Monday meeting', 'Friday party'))
# M̶o̶n̶d̶a̶y̶ ̶m̶e̶e̶t̶i̶n̶g̶ Friday party

# Batch process lines
lines = ["old feature name", "deprecated function", "removed endpoint"]
for line in lines:
    print(to_strikethrough(line))
```

### Go

```go
package main

import (
    "fmt"
    "strings"
)

func toStrikethrough(text string) string {
    var result strings.Builder
    for _, r := range text {
        result.WriteRune(r)
        result.WriteRune('\u0336')
    }
    return result.String()
}

func removeStrikethrough(text string) string {
    return strings.ReplaceAll(strings.ReplaceAll(text, "\u0336", ""), "\u0335", "")
}

func main() {
    fmt.Println(toStrikethrough("Hello World"))
    // H̶e̶l̶l̶o̶ ̶W̶o̶r̶l̶d̶

    fmt.Println(removeStrikethrough("H̶e̶l̶l̶o̶"))
    // Hello
}
```

## Real-World Use Cases

**Humorous corrections on social media.** The pattern "I̶ ̶l̶o̶v̶e̶ ̶M̶o̶n̶d̶a̶y̶s̶ I tolerate Mondays" creates comedic effect by showing the crossed-out "truth" alongside the polite version. Generate with the [Strikethrough Text Generator](/strikethrough-text-generator) and paste into tweets, posts, or bios.

**Indicating deprecated features in changelogs.** When documenting removed or deprecated features, strikethrough visually communicates "this no longer applies" while keeping it visible for reference. Use HTML `<del>` for web changelogs and Unicode strikethrough for plain-text formats.

**Creative writing and poetry.** Authors use strikethrough as a literary device showing a character's internal editing process — the crossed-out words reveal what they thought before self-censoring. This technique adds psychological depth to first-person narratives.

**Task completion visualization.** While most task managers handle this natively, in plain text contexts you can cross out completed items: "~~Buy groceries~~ Done" in Markdown, or "B̶u̶y̶ ̶g̶r̶o̶c̶e̶r̶i̶e̶s̶" in Unicode for platforms without Markdown support.

## Common Mistakes and Gotchas

Combining characters increase string length without visible characters. "Hello" is 5 characters. "H̶e̶l̶l̶o̶" is 10 characters (5 letters + 5 combining strokes). This affects character count limits on platforms like Twitter. Check with the [Word Counter](/word-counter) to see the true character count.

Not all platforms render combining characters consistently. Some display the strikethrough line in slightly different positions, and a few strip combining characters entirely. Test on your target platform before committing to strikethrough text in important content.

Unicode strikethrough cannot be removed by the receiving platform. Once the combining characters are part of the text, the recipient sees the strikethrough whether they want to or not. This is different from Markdown `~~text~~` where the platform controls rendering. Use the remove-strikethrough code examples above if you need to strip it.

Double-applying strikethrough (running already-struck text through the generator again) adds a second combining character to each letter, making the line thicker but also making the text harder to clean up. Check whether your text already contains U+0336 before applying.

## Frequently Asked Questions

**What is the difference between Unicode and HTML strikethrough?**
Unicode strikethrough uses combining characters that are part of the text itself — it works in any plain text field. HTML strikethrough uses the `<del>` or `<s>` tag, which only works where HTML is rendered. Markdown uses `~~text~~` which works on GitHub, Discord, and Slack.

**Can I use strikethrough in email?**
Unicode strikethrough works in email body text if the email client supports combining characters (most modern ones do). For HTML emails, use the `<del>` tag for more reliable rendering. Some older email clients may display combining characters as separate symbols.

**How do I strikethrough text in Discord?**
Discord supports Markdown: wrap text in `~~tildes~~` for strikethrough. For plain text contexts outside Discord, use Unicode strikethrough from the [Strikethrough Text Generator](/strikethrough-text-generator).

## Conclusion

Strikethrough text communicates correction, humor, and irony in ways that plain text cannot. Whether you are crafting social media posts, documenting deprecated features, or adding literary flair, crossed-out text creates a visible record of change.

The [FlipMyCase Strikethrough Text Generator](/strikethrough-text-generator) produces Unicode strikethrough that pastes anywhere. For other text effects, use the [Fancy Text Generator](/fancy-text-generator) or [Bold Text Generator](/bold-text-generator). For looking up the combining strikethrough character specifically, use the [Unicode Lookup](/unicode-lookup).
