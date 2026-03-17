---
title: "Small Caps Generator — How to Create Small Capital Text Online"
description: "Generate small caps Unicode text you can copy and paste anywhere. Free online tool converts lowercase to small capital letters for typography and design."
date: "2026-03-17"
keywords: ["small caps generator", "small caps text", "small capitals", "small caps copy paste", "small caps unicode", "small caps font", "petite capitals"]
toolSlug: "small-caps-generator"
faq:
  - question: "What are small caps?"
    answer: "Small caps are uppercase letters scaled to the height of lowercase letters. In Unicode, they use Latin Letter Small Capital characters: 'Hello' becomes 'Hᴇʟʟᴏ'. They appear in typography for headings, acronyms, and stylistic emphasis."
  - question: "Where are small caps used in design?"
    answer: "Small caps are used for acronyms in body text (ᴜꜱᴀ instead of USA), author names in bibliographies, running headers in books, legal document styling, and decorative headings. They add formality without the visual weight of full uppercase."
  - question: "Do all letters have small cap versions?"
    answer: "Most but not all. Unicode provides small capitals for most Latin letters, but a few (like Q, X) have limited or no standard small cap forms. The FlipMyCase generator handles available characters and leaves unsupported ones unchanged."
  - question: "Is this the same as CSS font-variant small-caps?"
    answer: "No. CSS small-caps tells the browser to render text using the font's small-caps variant. Unicode small caps use different character code points. CSS works only on web pages; Unicode small caps work in any text field."
related: ["fancy-text-generator-guide", "bold-text-generator-guide", "unicode-lookup-guide"]
---

# Small Caps Generator — How to Create Small Capital Text Online

Small caps are one of typography's most elegant features — uppercase letters scaled to the height of lowercase letters. They add formality and visual refinement to text without the aggressive look of full uppercase. Professional typographers use small caps for acronyms in body text (ᴜꜱᴀ looks better than USA in a sentence), author names in bibliographies, and decorative headings. Unicode provides small capital characters that you can copy and paste into any text field.

This guide covers what small caps are, how they differ from regular caps, how to generate them in code, and the design contexts where they shine.

## What Are Small Caps?

Small caps are letterforms that have the shape of uppercase letters but the height of lowercase letters. In Unicode, these are characters from the Latin Extended and Phonetic Extensions blocks — each is a distinct code point, not a formatting instruction. The character ᴀ (Latin Letter Small Capital A, U+1D00) looks like a small uppercase A and sits at the x-height of surrounding text.

You would use small caps for styling acronyms in body text (ᴜꜱᴀ, ɴᴀꜱᴀ, ᴜɴ) to avoid visual disruption, typographic headings and subheadings, author names and bylines in academic or editorial contexts, decorative social media bios and profiles, and formal invitations and announcements.

## How to Generate Small Caps with FlipMyCase

1. Open the [FlipMyCase Small Caps Generator](/small-caps-generator).
2. Type your text.
3. Lowercase letters convert to their small capital Unicode equivalents.
4. Copy the small caps text and paste anywhere.

For other Unicode text styles, use the [Fancy Text Generator](/fancy-text-generator). For bold styling, use the [Bold Text Generator](/bold-text-generator).

## Code Examples for Small Caps Generation

### JavaScript

```javascript
const SMALL_CAPS = {
  'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ꜰ','g':'ɢ',
  'h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ',
  'o':'ᴏ','p':'ᴘ','q':'q','r':'ʀ','s':'ꜱ','t':'ᴛ','u':'ᴜ',
  'v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ',
};

function toSmallCaps(text) {
  return [...text].map(char => {
    const lower = char.toLowerCase();
    if (SMALL_CAPS[lower]) {
      // Preserve original case intent: if already uppercase, keep as regular uppercase
      return char === char.toUpperCase() && char !== char.toLowerCase()
        ? char : SMALL_CAPS[lower];
    }
    return char;
  }).join('');
}

console.log(toSmallCaps('Hello World'));       // Hᴇʟʟᴏ Wᴏʀʟᴅ
console.log(toSmallCaps('small caps text'));   // ꜱᴍᴀʟʟ ᴄᴀᴘꜱ ᴛᴇxᴛ
console.log(toSmallCaps('NASA'));              // NASA (uppercase stays)

// All small caps (convert everything)
function toAllSmallCaps(text) {
  return [...text.toLowerCase()].map(c => SMALL_CAPS[c] || c).join('');
}
console.log(toAllSmallCaps('Hello World'));  // ʜᴇʟʟᴏ ᴡᴏʀʟᴅ
console.log(toAllSmallCaps('NASA'));         // ɴᴀꜱᴀ
```

### Python

```python
SMALL_CAPS = {
    'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ꜰ','g':'ɢ',
    'h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ',
    'o':'ᴏ','p':'ᴘ','q':'q','r':'ʀ','s':'ꜱ','t':'ᴛ','u':'ᴜ',
    'v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ',
}

def to_small_caps(text):
    return ''.join(SMALL_CAPS.get(c, c) for c in text.lower())

print(to_small_caps('Hello World'))       # ʜᴇʟʟᴏ ᴡᴏʀʟᴅ
print(to_small_caps('Small Caps Text'))   # ꜱᴍᴀʟʟ ᴄᴀᴘꜱ ᴛᴇxᴛ
print(to_small_caps('Typography'))        # ᴛʏᴘᴏɢʀᴀᴘʜʏ

# Acronym formatter (small caps for inline acronyms)
import re
def format_acronyms(text):
    return re.sub(r'\b([A-Z]{2,})\b', lambda m: to_small_caps(m.group()), text)

print(format_acronyms('The USA and NASA signed a UN agreement.'))
# The ᴜꜱᴀ and ɴᴀꜱᴀ signed a ᴜɴ agreement.
```

### Go

```go
package main

import (
    "fmt"
    "strings"
)

var smallCaps = map[rune]rune{
    'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ꜰ','g':'ɢ',
    'h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ',
    'o':'ᴏ','p':'ᴘ','r':'ʀ','s':'ꜱ','t':'ᴛ','u':'ᴜ',
    'v':'ᴠ','w':'ᴡ','y':'ʏ','z':'ᴢ',
}

func toSmallCaps(text string) string {
    var b strings.Builder
    for _, r := range strings.ToLower(text) {
        if sc, ok := smallCaps[r]; ok {
            b.WriteRune(sc)
        } else {
            b.WriteRune(r)
        }
    }
    return b.String()
}

func main() {
    fmt.Println(toSmallCaps("Hello World")) // ʜᴇʟʟᴏ ᴡᴏʀʟᴅ
}
```

## Real-World Use Cases

**Acronyms in professional text.** Full uppercase acronyms (NASA, USA, HTML) visually shout in body text. Small caps (ɴᴀꜱᴀ, ᴜꜱᴀ, ʜᴛᴍʟ) integrate smoothly while remaining recognizable. Use the [Small Caps Generator](/small-caps-generator) for quick conversion.

**Social media bios.** Small caps create a sophisticated, editorial look: "ᴡʀɪᴛᴇʀ | ᴅᴇᴠᴇʟᴏᴘᴇʀ | ᴅᴇꜱɪɢɴᴇʀ" is distinctive without being flashy.

**Book and editorial design.** Small caps are traditional for running headers, author names, and chapter subtitles in book typography. Unicode small caps bring this aesthetic to digital contexts where CSS small-caps is unavailable.

**Formal invitations.** Wedding invitations, event announcements, and formal correspondence use small caps for names and titles to convey elegance.

## Common Mistakes and Gotchas

A few letters lack standard small cap Unicode forms. Q and X have limited or no small cap characters in Unicode, so they pass through as regular lowercase. This creates slight visual inconsistency in words containing these letters.

Small caps are not the same as simply making text smaller. True small caps maintain the stroke weight of uppercase letters while reducing their height. Unicode small caps approximate this, but the exact appearance depends on the font being used.

CSS `font-variant: small-caps` is a better solution for web content because it uses the font's own small cap glyphs, which are typographically designed. Use Unicode small caps only for contexts where CSS cannot be applied (social media, messaging, plain text).

Screen readers may not handle small cap characters correctly. Some announce them by their Unicode names, others treat them as regular letters. Accessibility is inconsistent, so avoid small caps for essential content.

## Frequently Asked Questions

**What is the difference between small caps and all caps?**
All caps uses full-height uppercase letters (HELLO). Small caps uses uppercase-shaped letters at lowercase height (ʜᴇʟʟᴏ). Small caps are less visually aggressive while maintaining the uppercase letterform aesthetic.

**Can I use small caps for CSS class names or code?**
No. Small cap Unicode characters are different code points from regular letters. Code interpreters, compilers, and CSS parsers will not recognize them as the intended characters. Use small caps only for display text.

**How do small caps differ from the Fancy Text bold style?**
Bold Unicode (𝐇𝐞𝐥𝐥𝐨) makes letters heavier. Small caps (ʜᴇʟʟᴏ) makes lowercase letters look like short uppercase. They serve different aesthetic purposes. The [Fancy Text Generator](/fancy-text-generator) shows both for comparison.

## Conclusion

Small caps add typographic elegance to text in contexts where CSS formatting is unavailable. From acronym styling to social media bios to formal announcements, small capitals communicate sophistication.

The [FlipMyCase Small Caps Generator](/small-caps-generator) converts text to small caps instantly. For other styles, use the [Fancy Text Generator](/fancy-text-generator). For individual character lookup, use the [Unicode Lookup](/unicode-lookup).
