---
title: "Superscript Generator — How to Create Superscript Text Online"
description: "Generate superscript Unicode text for math notation, footnotes, and ordinal indicators. Free online tool creates superscript numbers and letters. Copy and paste anywhere."
date: "2026-03-17"
keywords: ["superscript generator", "superscript text", "superscript numbers", "superscript copy paste", "superscript unicode", "x squared symbol", "superscript text generator"]
toolSlug: "superscript-generator"
faq:
  - question: "How do I create superscript text?"
    answer: "Type your text into the FlipMyCase Superscript Generator. Numbers and available letters convert to their Unicode superscript equivalents. Copy the output and paste it anywhere — social media, documents, messages. No special formatting needed."
  - question: "Which characters have superscript versions?"
    answer: "All digits 0-9 have superscript versions (⁰¹²³⁴⁵⁶⁷⁸⁹). Most lowercase letters have superscript forms (ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ). Superscript has better letter coverage than subscript."
  - question: "Can I write math exponents with superscript?"
    answer: "Yes. x² (x squared), x³ (x cubed), and 10⁶ all work perfectly. Superscript numbers are the most common use case. The generator handles single and multi-digit exponents."
  - question: "What are ordinal indicators?"
    answer: "Ordinal indicators like 1ˢᵗ, 2ⁿᵈ, 3ʳᵈ, and 4ᵗʰ use superscript letters after numbers. They are common in formal and typographic text. The Superscript Generator creates these instantly."
related: ["subscript-generator-guide", "fancy-text-generator-guide", "unicode-lookup-guide"]
---

# Superscript Generator — How to Create Superscript Text Online

Superscript text appears above the normal baseline — think x², 10⁶, footnote markers¹, and ordinal indicators like 1ˢᵗ and 2ⁿᵈ. Mathematics, science, footnotes, and formal typography all rely on superscript. But most text fields — social media, messaging, plain text editors — do not support formatting. Unicode superscript characters provide this functionality anywhere Unicode is supported.

This guide covers how superscript Unicode works, which characters are available, how to generate it in code, and the practical contexts where superscript is needed.

## What Is Superscript Text?

Superscript text consists of Unicode characters that render smaller and above the normal baseline. Digits 0-9 have superscript equivalents (⁰¹²³⁴⁵⁶⁷⁸⁹). Most lowercase letters have superscript forms too (ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ), giving superscript better letter coverage than subscript.

You would use superscript for mathematical exponents (x², n³, 10⁶), footnote references in plain text (word¹, concept²), ordinal indicators (1ˢᵗ, 2ⁿᵈ, 3ʳᵈ), trademark and service mark symbols (already ™ and ℠), and scientific notation in social media and messages.

## How to Generate Superscript with FlipMyCase

1. Open the [FlipMyCase Superscript Generator](/superscript-generator).
2. Type your text — numbers and letters convert to superscript.
3. Copy the superscript output.
4. Paste into documents, social media, or any text field.

For subscript (below the baseline), use the [Subscript Generator](/subscript-generator). For other Unicode text styles, use the [Fancy Text Generator](/fancy-text-generator).

## Code Examples for Superscript Generation

### JavaScript

```javascript
const SUPERSCRIPT_MAP = {
  '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴',
  '5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
  'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ',
  'h':'ʰ','i':'ⁱ','j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ',
  'o':'ᵒ','p':'ᵖ','r':'ʳ','s':'ˢ','t':'ᵗ','u':'ᵘ','v':'ᵛ',
  'w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ',
  '+':'⁺','-':'⁻','=':'⁼','(':'⁽',')':'⁾',
};

function toSuperscript(text) {
  return [...text.toLowerCase()].map(c => SUPERSCRIPT_MAP[c] || c).join('');
}

console.log('x' + toSuperscript('2'));         // x²
console.log('x' + toSuperscript('n+1'));       // xⁿ⁺¹
console.log('10' + toSuperscript('6'));        // 10⁶
console.log('E = mc' + toSuperscript('2'));    // E = mc²

// Ordinal indicators
function ordinal(num) {
  const suffixes = { 1: 'st', 2: 'nd', 3: 'rd' };
  const suffix = suffixes[num % 10] && num % 100 !== 11 && num % 100 !== 12 && num % 100 !== 13
    ? suffixes[num % 10] : 'th';
  return num + toSuperscript(suffix);
}
console.log(ordinal(1));   // 1ˢᵗ
console.log(ordinal(2));   // 2ⁿᵈ
console.log(ordinal(3));   // 3ʳᵈ
console.log(ordinal(4));   // 4ᵗʰ
console.log(ordinal(21));  // 21ˢᵗ
```

### Python

```python
SUPERSCRIPT = str.maketrans(
    '0123456789abcdefghijklmnoprstuvwxyz+-=()',
    '⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ⁺⁻⁼⁽⁾')

def to_superscript(text):
    return text.lower().translate(SUPERSCRIPT)

print('x' + to_superscript('2'))         # x²
print('10' + to_superscript('6'))        # 10⁶
print('E = mc' + to_superscript('2'))    # E = mc²

# Ordinal indicators
def ordinal(n):
    if 11 <= n % 100 <= 13:
        suffix = 'th'
    else:
        suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th')
    return str(n) + to_superscript(suffix)

for i in [1, 2, 3, 4, 11, 21, 100]:
    print(ordinal(i), end='  ')
# 1ˢᵗ  2ⁿᵈ  3ʳᵈ  4ᵗʰ  11ᵗʰ  21ˢᵗ  100ᵗʰ
```

### Go

```go
package main

import (
    "fmt"
    "strings"
)

var superMap = map[rune]rune{
    '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴',
    '5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
    'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','n':'ⁿ',
    'r':'ʳ','s':'ˢ','t':'ᵗ','x':'ˣ',
}

func toSuperscript(text string) string {
    var b strings.Builder
    for _, r := range strings.ToLower(text) {
        if sup, ok := superMap[r]; ok {
            b.WriteRune(sup)
        } else {
            b.WriteRune(r)
        }
    }
    return b.String()
}

func main() {
    fmt.Println("x" + toSuperscript("2"))       // x²
    fmt.Println("E = mc" + toSuperscript("2"))   // E = mc²
    fmt.Println("10" + toSuperscript("6"))       // 10⁶
}
```

## Real-World Use Cases

**Mathematical expressions in messages.** Sharing math in chat: "The area is r² times pi" or "Growth is O(n²)" communicates clearly using superscript. The [Superscript Generator](/superscript-generator) converts exponents instantly.

**Footnotes in plain text.** Academic and professional writing sometimes needs footnotes in contexts without formatting: "This claim¹ requires further evidence²." Superscript numbers serve as footnote markers.

**Ordinal indicators.** Formal text uses 1ˢᵗ, 2ⁿᵈ, 3ʳᵈ, 4ᵗʰ instead of 1st, 2nd, 3rd, 4th. The superscript letters add typographic polish in bios, invitations, and professional text.

**Scientific notation in social media.** Sharing facts like "The sun is 1.5 x 10⁸ km away" or "A human has about 3.7 x 10¹³ cells" requires superscript for readability.

## Common Mistakes and Gotchas

Superscript has better letter coverage than subscript, but not all uppercase letters have superscript forms. The superscript block primarily covers lowercase letters. Capital letter superscripts are limited and inconsistent across Unicode.

The superscript 1, 2, and 3 characters (¹²³) are at different code points than superscript 4-9 (⁴⁵⁶⁷⁸⁹). The first three are legacy characters from Latin-1 Supplement, while 4-9 are in the Superscripts and Subscripts block. This is a Unicode historical quirk but does not affect usage.

Superscript text may render at slightly different sizes across fonts and platforms. System fonts generally handle superscript digits well, but superscript letters may appear larger or smaller than expected on some platforms.

For complex math notation (fractions, integrals, matrices), Unicode superscript is insufficient. Use LaTeX, MathML, or the [Superscript Generator](/superscript-generator) for simple exponents and switch to proper math typesetting for complex expressions.

## Conclusion

Superscript text is essential for mathematical notation, footnotes, ordinal indicators, and scientific communication. Unicode superscript characters provide this in any text field.

The [FlipMyCase Superscript Generator](/superscript-generator) converts numbers and letters to superscript instantly. For subscript, use the [Subscript Generator](/subscript-generator). For all Unicode text styles, use the [Fancy Text Generator](/fancy-text-generator).
