---
title: "Subscript Generator — How to Create Subscript Text Online"
description: "Generate subscript Unicode text for chemical formulas, math notation, and footnotes. Free online tool creates subscript numbers and available letters. Copy and paste anywhere."
date: "2026-03-17"
keywords: ["subscript generator", "subscript text", "subscript numbers", "subscript copy paste", "subscript unicode", "H2O subscript", "subscript text generator"]
toolSlug: "subscript-generator"
faq:
  - question: "How do I create subscript text?"
    answer: "Type your text into the FlipMyCase Subscript Generator. Numbers and available letters convert to their Unicode subscript equivalents. Copy the subscript text and paste it anywhere — social media, documents, messages. Works without needing special formatting."
  - question: "Which characters have subscript versions?"
    answer: "All digits 0-9 have subscript versions (₀₁₂₃₄₅₆₇₈₉). For letters, only a subset has Unicode subscript forms: a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, x. Letters without subscript forms pass through unchanged."
  - question: "Can I write chemical formulas with subscript?"
    answer: "Yes for numbers. H₂O, CO₂, C₆H₁₂O₆ all work because the digits have subscript Unicode. Letter subscripts like the 'n' in Cₙ also work. This is one of the most common use cases for subscript text."
  - question: "Is this the same as HTML subscript?"
    answer: "No. HTML uses the sub tag which only works in web pages. Unicode subscript uses different character code points that work in plain text fields — social media, messaging, documents — anywhere that supports Unicode."
related: ["superscript-generator-guide", "fancy-text-generator-guide", "unicode-lookup-guide"]
---

# Subscript Generator — How to Create Subscript Text Online

Subscript text appears below the normal text baseline — think H₂O, CO₂, and mathematical notation like xₙ. Scientists, students, and educators need subscript constantly for chemical formulas, mathematical expressions, and footnote references. But most text fields — social media, messaging apps, plain text editors — have no subscript button. Unicode subscript characters solve this by providing characters that are inherently positioned below the baseline.

This guide covers how subscript Unicode works, which characters are available, how to generate subscript in code, and the practical contexts where subscript text is essential.

## What Is Subscript Text?

Subscript text consists of Unicode characters that render smaller and below the normal text baseline. The digits 0-9 all have subscript equivalents (₀₁₂₃₄₅₆₇₈₉ at U+2080 through U+2089). A subset of Latin letters also has subscript forms (ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ). These are real Unicode characters, not formatting — they paste into any text field.

You would use subscript for chemical formulas (H₂O, CO₂, NaCl, C₆H₁₂O₆), mathematical notation (xₙ, aₖ, variable indices), phonetic transcription, footnote markers in plain text, and scientific notation in social media posts and messages.

## How to Generate Subscript with FlipMyCase

1. Open the [FlipMyCase Subscript Generator](/subscript-generator).
2. Type your text — numbers and available letters convert to subscript.
3. Copy the subscript output.
4. Paste into documents, social media, or any text field.

For superscript (above the baseline), use the [Superscript Generator](/superscript-generator). For other Unicode text styles, use the [Fancy Text Generator](/fancy-text-generator).

## Code Examples for Subscript Generation

### JavaScript

```javascript
const SUBSCRIPT_MAP = {
  '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄',
  '5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
  'a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','j':'ⱼ',
  'k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','o':'ₒ',
  'p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','x':'ₓ',
  '+':'₊','-':'₋','=':'₌','(':'₍',')':'₎',
};

function toSubscript(text) {
  return [...text.toLowerCase()].map(c => SUBSCRIPT_MAP[c] || c).join('');
}

console.log('H' + toSubscript('2') + 'O');           // H₂O
console.log('CO' + toSubscript('2'));                  // CO₂
console.log('C' + toSubscript('6') + 'H' + toSubscript('12') + 'O' + toSubscript('6'));  // C₆H₁₂O₆
console.log('x' + toSubscript('n'));                   // xₙ
console.log('a' + toSubscript('1') + ' + a' + toSubscript('2'));  // a₁ + a₂

// Chemical formula helper
function formatFormula(formula) {
  return formula.replace(/(\d+)/g, (match) => toSubscript(match));
}
console.log(formatFormula('H2SO4'));   // H₂SO₄
console.log(formatFormula('Ca(OH)2')); // Ca(OH)₂
console.log(formatFormula('C6H12O6')); // C₆H₁₂O₆
```

### Python

```python
SUBSCRIPT = str.maketrans('0123456789aehijklmnoprstuvx+-=()',
                          '₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓ₊₋₌₍₎')

def to_subscript(text):
    return text.lower().translate(SUBSCRIPT)

print('H' + to_subscript('2') + 'O')     # H₂O
print('CO' + to_subscript('2'))            # CO₂
print('x' + to_subscript('n'))             # xₙ

# Chemical formula formatter
import re

def format_formula(formula):
    return re.sub(r'(\d+)', lambda m: to_subscript(m.group()), formula)

print(format_formula('H2SO4'))    # H₂SO₄
print(format_formula('C6H12O6'))  # C₆H₁₂O₆
print(format_formula('Ca(OH)2'))  # Ca(OH)₂
print(format_formula('NaHCO3'))   # NaHCO₃
```

### Go

```go
package main

import (
    "fmt"
    "strings"
)

var subscriptMap = map[rune]rune{
    '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄',
    '5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
    'a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','n':'ₙ','o':'ₒ',
    'p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','x':'ₓ',
}

func toSubscript(text string) string {
    var b strings.Builder
    for _, r := range strings.ToLower(text) {
        if sub, ok := subscriptMap[r]; ok {
            b.WriteRune(sub)
        } else {
            b.WriteRune(r)
        }
    }
    return b.String()
}

func main() {
    fmt.Println("H" + toSubscript("2") + "O")      // H₂O
    fmt.Println("CO" + toSubscript("2"))             // CO₂
    fmt.Println("C" + toSubscript("6") + "H" + toSubscript("12") + "O" + toSubscript("6")) // C₆H₁₂O₆
}
```

## Real-World Use Cases

**Chemical formulas in social media.** Scientists, teachers, and students share chemical formulas in tweets, posts, and messages. H₂O, CO₂, and NaCl are universally recognized. The [Subscript Generator](/subscript-generator) converts the numbers instantly.

**Mathematical notation in plain text.** Sequence notation (xₙ, aₖ), summation indices, and variable subscripts appear in math discussions on forums, chat, and documentation where LaTeX is not available.

**Footnote references.** In plain text documents where superscript footnotes are not available, subscript numbers can serve as reference markers: "See note₁" or "Reference₃."

**Educational content.** Teachers creating worksheets, study guides, and social media educational content need subscript for chemical equations and math notation without specialized typesetting software.

**Phonetic transcription and IPA notation.** Linguists and language researchers use subscript characters in phonetic transcription work. The International Phonetic Alphabet (IPA) employs subscript diacritics and modifiers to indicate specific articulatory details — for example, subscript markers can denote voicelessness, dental articulation, or other phonetic features. When sharing IPA transcriptions in plain text environments like emails, forums, or messaging apps, Unicode subscript characters provide a way to represent these notations without specialized phonetics software.

## Common Mistakes and Gotchas

Not all letters have subscript Unicode forms. Only a, e, h, i, j, k, l, m, n, o, p, r, s, t, u, v, and x have subscript equivalents. Letters like b, c, d, f, g, q, w, y, z have no subscript Unicode character and pass through as regular-sized text, breaking the visual consistency.

Subscript characters are separate Unicode code points. "H₂O" contains three different characters: H (U+0048), ₂ (U+2082), O (U+004F). String length is 3, but searching for "2" will not find "₂." The [Subscript Generator](/subscript-generator) handles the mapping automatically.

Font support varies. Most system fonts render subscript digits correctly, but some fonts lack glyphs for subscript letters, displaying them as boxes or question marks. Test on your target platform before committing to extensive subscript use.

Mixing subscript and superscript in the same word requires careful positioning. Unicode does not support simultaneous sub- and superscript on the same character. For complex mathematical notation, LaTeX or MathML remains necessary.

## Frequently Asked Questions

**How do I type H2O with a subscript 2?**
Use the [FlipMyCase Subscript Generator](/subscript-generator) to convert "2" to "₂", then manually combine: H₂O. Or paste "H2O" and the tool converts the digits. For quick reference, the subscript 2 character is U+2082 — copy ₂ directly.

**Can I use subscript in Google Docs or Word?**
Both have built-in subscript formatting (Ctrl+, in Docs, Ctrl+= in Word). Use the native feature for documents. Unicode subscript is for contexts where native formatting is unavailable — social media, messaging, plain text fields.

**Why do some letters not have subscript versions?**
Unicode subscript letters were originally added for phonetic transcription (IPA), not for general-purpose subscript. Only the letters needed for linguistic notation were included. The full letter set was never added because HTML/CSS and math typesetting handle arbitrary subscript better.

## Conclusion

Subscript text is essential for chemical formulas, mathematical notation, and scientific communication. Unicode subscript characters provide this functionality in plain text fields where formatting tools are unavailable.

The [FlipMyCase Subscript Generator](/subscript-generator) converts numbers and available letters to subscript instantly. For superscript, use the [Superscript Generator](/superscript-generator). For all Unicode text styles, use the [Fancy Text Generator](/fancy-text-generator).
