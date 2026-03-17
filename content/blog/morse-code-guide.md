---
title: "Morse Code Translator — How to Convert Text to Morse Code Online"
description: "Translate text to Morse code and Morse code back to text instantly. Free online tool with audio playback and visual dots-and-dashes output. No signup required."
date: "2026-03-17"
keywords: ["morse code translator", "text to morse code", "morse code converter", "morse code decoder", "morse code encoder", "translate morse code", "morse code online"]
toolSlug: "morse-code-translator"
faq:
  - question: "How do I translate text to Morse code?"
    answer: "Paste your text into the FlipMyCase Morse Code Translator. Each letter converts to its dot-and-dash pattern: A is .-, B is -..., SOS is ... --- .... Letters are separated by spaces, words by forward slashes."
  - question: "How do I decode Morse code back to text?"
    answer: "Paste the Morse code (dots and dashes separated by spaces) into the decoder. It converts each pattern back to its letter. Use / or | to separate words. The tool handles both standard and non-standard separators."
  - question: "Does Morse code support numbers and punctuation?"
    answer: "Yes. Numbers 0-9 each have five-element codes (0 is -----, 1 is .----). Common punctuation is supported: period (.-.-.-), comma (--..--), question mark (..--..), and more."
  - question: "Is Morse code still used today?"
    answer: "Yes, in amateur (ham) radio, aviation emergency beacons, naval signaling, accessibility devices for people with limited mobility, and as a cultural/educational topic. The SOS distress signal (... --- ...) remains universally recognized."
related: ["binary-text-converter-guide", "rot13-guide", "string-encoder-guide"]
---

# Morse Code Translator — How to Convert Text to Morse Code Online

Morse code has been communicating messages since 1844, and it is still relevant today. Amateur radio operators use it daily. Aviation emergency beacons transmit identification in Morse. Accessibility devices let people with limited mobility communicate through single-switch Morse input. It appears in movies, puzzles, escape rooms, and educational curricula. And SOS (... --- ...) remains the most universally recognized distress signal in the world.

This guide covers how Morse code works, the complete character mapping, how to implement translation in code, and why this 180-year-old encoding still matters.

## What Is Morse Code?

Morse code represents each letter, number, and punctuation mark as a unique sequence of short signals (dots, `.`) and long signals (dashes, `-`). A dash is three times the duration of a dot. Letters are separated by a pause equal to three dots. Words are separated by a pause equal to seven dots. In text representation, spaces separate letters and slashes separate words.

You would use Morse code for ham radio communication, emergency signaling, accessibility input devices, educational projects, puzzle and escape room design, and encoding messages for creative projects.

## How to Translate Morse Code with FlipMyCase

1. Open the [FlipMyCase Morse Code Translator](/morse-code-translator).
2. Type or paste text to encode it as Morse code (dots and dashes).
3. Or paste Morse code to decode it back to text.
4. Copy the result for use in radio, puzzles, or projects.

For binary encoding of text, use the [Binary Text Converter](/binary-text-converter). For other encoding formats, use the [String Encoder](/string-encoder).

## Code Examples for Morse Code Translation

### JavaScript

```javascript
const MORSE_MAP = {
  'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.',
  'H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.',
  'O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
  'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
  '6':'-....','7':'--...','8':'---..','9':'----.',
  '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--','/':'-..-.',
};

const REVERSE_MAP = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

function textToMorse(text) {
  return text.toUpperCase().split('').map(char => {
    if (char === ' ') return '/';
    return MORSE_MAP[char] || '';
  }).filter(Boolean).join(' ');
}

function morseToText(morse) {
  return morse.split(' / ').map(word =>
    word.split(' ').map(code => REVERSE_MAP[code] || '?').join('')
  ).join(' ');
}

console.log(textToMorse('Hello World'));
// .... . .-.. .-.. --- / .-- --- .-. .-.. -..

console.log(textToMorse('SOS'));
// ... --- ...

console.log(morseToText('.... . .-.. .-.. --- / .-- --- .-. .-.. -..'));
// HELLO WORLD
```

### Python

```python
MORSE = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.',
    'H':'....','I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.',
    'O':'---','P':'.--.','Q':'--.-','R':'.-.','S':'...','T':'-',
    'U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
    '6':'-....','7':'--...','8':'---..','9':'----.',
    '.':'.-.-.-',',':'--..--','?':'..--..','!':'-.-.--',
}
REVERSE = {v: k for k, v in MORSE.items()}

def text_to_morse(text):
    result = []
    for char in text.upper():
        if char == ' ':
            result.append('/')
        elif char in MORSE:
            result.append(MORSE[char])
    return ' '.join(result)

def morse_to_text(morse):
    words = morse.split(' / ')
    return ' '.join(
        ''.join(REVERSE.get(code, '?') for code in word.split())
        for word in words
    )

print(text_to_morse('Hello World'))
# .... . .-.. .-.. --- / .-- --- .-. .-.. -..

print(text_to_morse('SOS'))
# ... --- ...

print(morse_to_text('.... . .-.. .-.. --- / .-- --- .-. .-.. -..'))
# HELLO WORLD

# Generate a reference table
for char, code in sorted(MORSE.items()):
    print(f'  {char}  {code}')
```

### Go

```go
package main

import (
    "fmt"
    "strings"
)

var morseMap = map[rune]string{
    'A': ".-", 'B': "-...", 'C': "-.-.", 'D': "-..", 'E': ".",
    'F': "..-.", 'G': "--.", 'H': "....", 'I': "..", 'J': ".---",
    'K': "-.-", 'L': ".-..", 'M': "--", 'N': "-.", 'O': "---",
    'P': ".--.", 'Q': "--.-", 'R': ".-.", 'S': "...", 'T': "-",
    'U': "..-", 'V': "...-", 'W': ".--", 'X': "-..-", 'Y': "-.--",
    'Z': "--..", '0': "-----", '1': ".----", '2': "..---",
    '3': "...--", '4': "....-", '5': ".....", '6': "-....",
    '7': "--...", '8': "---..", '9': "----.",
}

func textToMorse(text string) string {
    var parts []string
    for _, ch := range strings.ToUpper(text) {
        if ch == ' ' {
            parts = append(parts, "/")
        } else if code, ok := morseMap[ch]; ok {
            parts = append(parts, code)
        }
    }
    return strings.Join(parts, " ")
}

func main() {
    fmt.Println(textToMorse("Hello World"))
    // .... . .-.. .-.. --- / .-- --- .-. .-.. -..
    fmt.Println(textToMorse("SOS"))
    // ... --- ...
}
```

## Real-World Use Cases

**Amateur (ham) radio.** Morse code (CW mode) remains popular in ham radio because it works with minimal equipment, low power, and through interference that blocks voice. Many amateur radio licenses still test Morse proficiency. Encode messages with the [Morse Code Translator](/morse-code-translator) before transmitting.

**Accessibility and assistive technology.** People with severe motor disabilities can communicate through Morse code using a single switch — one input for dot, one for dash, or timing-based single-switch input. Android and iOS both support Morse code keyboard input for accessibility.

**Puzzles and escape rooms.** Morse code is a popular encoding for treasure hunts, escape rooms, and geocaching. Encode clues as Morse for participants to decode. The [Morse Code Translator](/morse-code-translator) generates the encoding instantly.

**Emergency signaling.** The SOS signal (... --- ...) is recognized internationally. Flashing a flashlight in the SOS pattern or tapping it out can signal distress when voice communication is impossible. Knowing even basic Morse patterns can be life-saving.

## Common Mistakes and Gotchas

Letter spacing and word spacing must be distinct. In text representation, a single space separates letters within a word, and a slash (/) separates words. ".... .." is "HI" (two letters), while ".... / .." is "H I" (two words). Ambiguous spacing produces wrong decoding.

Morse code is case-insensitive. There is no distinction between uppercase and lowercase. "Hello" and "HELLO" produce the same Morse output. The decoder always outputs uppercase.

Not all characters have Morse representations. Extended characters (accented letters, emojis, most punctuation beyond basic marks) have no standard Morse encoding. Non-Latin alphabets have separate Morse code systems (Russian Morse, Japanese Wabun code).

Timing matters in audio Morse but not in text Morse. When encoding to text (dots and dashes), timing is represented by spacing. When transmitting audio, the actual durations (dot = 1 unit, dash = 3 units, inter-element gap = 1 unit, inter-letter gap = 3 units, inter-word gap = 7 units) must be precise for reliable decoding.

## Frequently Asked Questions

**What does SOS stand for?**
SOS does not stand for anything — it was chosen because its Morse code pattern (... --- ...) is easy to recognize and transmit. The popular backronym "Save Our Souls" came after the signal was adopted. SOS became the international distress signal in 1906.

**Can I learn Morse code quickly?**
With daily practice, most people learn the full alphabet in 2-4 weeks. Start with the most common letters (E, T, A, I, N, S) and practice decoding real words. The [Morse Code Translator](/morse-code-translator) is a useful study aid for verifying your translations.

**Is there a Morse code for the @ symbol?**
Yes — the @ symbol was added in 2004 as .--.-. (the only Morse addition since WWII). It was created for transmitting email addresses over radio.

## Conclusion

Morse code bridges the 19th century and the 21st, remaining relevant in radio, accessibility, emergency signaling, and education. Its simplicity — just two signal types combined into patterns — makes it one of the most elegant encoding systems ever created.

The [FlipMyCase Morse Code Translator](/morse-code-translator) handles text-to-Morse and Morse-to-text conversion instantly. For other encoding formats, use the [Binary Text Converter](/binary-text-converter) and the [String Encoder](/string-encoder). For cipher-based encoding, try the [ROT13 Encoder](/rot13-encoder-decoder).
