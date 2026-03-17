---
title: "Title Case Converter — Rules, Examples, and Free Online Tool"
description: "Convert text to Title Case with correct capitalization rules. Free online tool handles articles, prepositions, and conjunctions automatically."
date: "2025-01-25"
keywords: ["title case converter", "title case rules", "capitalize headings", "title case capitalization", "AP style title case"]
toolSlug: ""
faq:
  - question: "What is title case?"
    answer: "Title case capitalizes the first letter of major words while keeping articles (a, an, the), short prepositions (in, on, at), and conjunctions (and, but, or) lowercase — unless they start the title."
  - question: "What are the rules for title case?"
    answer: "Capitalize the first and last word always. Capitalize nouns, verbs, adjectives, adverbs, and pronouns. Keep articles, short prepositions (under 4 letters), and conjunctions lowercase."
  - question: "What is the difference between title case and sentence case?"
    answer: "Title Case Capitalizes Major Words. Sentence case only capitalizes the first word and proper nouns. Title case is used for headings; sentence case for body text."
  - question: "Does AP style use title case?"
    answer: "Yes, AP style uses title case for headlines. It capitalizes words of four or more letters and always capitalizes the first and last word."
  - question: "Should I use title case for blog post titles?"
    answer: "Most style guides recommend title case for blog titles, article headlines, and H1 tags. It looks more professional and is expected by readers."
  - question: "How does FlipMyCase handle title case?"
    answer: "FlipMyCase follows standard title case rules — capitalizing major words and keeping articles, short prepositions, and conjunctions lowercase. The first and last words are always capitalized."
related: ["uppercase-converter", "lowercase-converter", "word-counter-guide"]
---

# Title Case Converter — Rules, Examples, and Free Online Tool

Title case is the standard capitalization format for headings, book titles, article headlines, navigation labels, and email subject lines. It capitalizes the important words while keeping minor words lowercase, creating a professional look that readers expect. But the rules are more nuanced than "capitalize every word" — articles, prepositions, and conjunctions follow specific rules that vary by style guide.

This guide covers exactly what title case is, the rules for applying it correctly, how style guides differ, how to implement it in code, and when title case is the right choice versus sentence case or uppercase.

## What Is Title Case?

Title case is a capitalization convention where major words are capitalized and minor words are lowercased. The specific rules are: capitalize the first and last word always, capitalize all nouns, verbs, adjectives, adverbs, and pronouns, and keep articles (a, an, the), short prepositions (in, on, at, to, by, for, of, up), and coordinating conjunctions (and, but, or, nor, yet, so) lowercase unless they are the first or last word.

You would use title case for blog post titles and article headlines, book and movie titles, section headings in documents, navigation menus and button labels, email subject lines, presentation slide titles, and any context where text functions as a label or heading. It is the most widely used heading format in English-language publishing.

## How to Convert to Title Case with FlipMyCase

1. Open the [FlipMyCase Case Converter](/).
2. Paste your heading, title, or text.
3. Click the Title Case option.
4. Copy the correctly capitalized output.

The converter follows standard title case rules automatically, handling articles, prepositions, and conjunctions correctly. It capitalizes the first and last word regardless of word type, which is a rule that many manual attempts get wrong.

## Code Examples for Title Case Conversion

### JavaScript

```javascript
function toTitleCase(text) {
  const minor = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
    'in', 'on', 'at', 'to', 'by', 'of', 'up', 'as', 'if', 'is'
  ]);

  return text.split(' ').map((word, index, arr) => {
    const lower = word.toLowerCase();
    // Always capitalize first and last word
    if (index === 0 || index === arr.length - 1) {
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    // Keep minor words lowercase
    if (minor.has(lower)) {
      return lower;
    }
    // Capitalize all other words
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(' ');
}

console.log(toTitleCase('the quick brown fox jumps over the lazy dog'));
// The Quick Brown Fox Jumps Over the Lazy Dog

console.log(toTitleCase('war and peace'));
// War and Peace

console.log(toTitleCase('a tale of two cities'));
// A Tale of Two Cities

console.log(toTitleCase('to be or not to be'));
// To Be or Not to Be
```

### Python

```python
def to_title_case(text):
    minor = {
        'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
        'in', 'on', 'at', 'to', 'by', 'of', 'up', 'as', 'if', 'is'
    }

    words = text.split()
    result = []

    for i, word in enumerate(words):
        lower = word.lower()
        if i == 0 or i == len(words) - 1:
            result.append(lower.capitalize())
        elif lower in minor:
            result.append(lower)
        else:
            result.append(lower.capitalize())

    return ' '.join(result)

# Note: Python's built-in .title() capitalizes EVERY word
print('war and peace'.title())
# War And Peace  <-- WRONG (capitalizes "And")

print(to_title_case('war and peace'))
# War and Peace  <-- CORRECT

print(to_title_case('the lord of the rings'))
# The Lord of the Rings

print(to_title_case('what to do in an emergency'))
# What to Do in an Emergency
```

### Ruby

```ruby
MINOR_WORDS = %w[a an the and but or nor for yet so in on at to by of up as if is].to_set

def to_title_case(text)
  words = text.split
  words.each_with_index.map { |word, i|
    lower = word.downcase
    if i == 0 || i == words.length - 1 || !MINOR_WORDS.include?(lower)
      lower.capitalize
    else
      lower
    end
  }.join(' ')
end

puts to_title_case('the quick brown fox jumps over the lazy dog')
# The Quick Brown Fox Jumps Over the Lazy Dog

puts to_title_case('a tale of two cities')
# A Tale of Two Cities
```

## Real-World Use Cases

**Blog post titles and SEO.** Every blog post needs a title that looks professional in search results, social media shares, and RSS feeds. Title case is the standard because it conveys authority and structure. "How to Convert Text to Title Case" looks more polished than "How to convert text to title case" (sentence case) in a Google search result. Use the [FlipMyCase converter](/) to format titles before publishing, and check character length with the [Word Counter](/word-counter).

**Email subject lines.** Email subject lines formatted in title case have higher open rates in professional contexts. "Quarterly Revenue Report for Q1 2026" reads as more important than "Quarterly revenue report for q1 2026." Marketing teams often A/B test subject line casing and consistently find that title case performs better for business communications.

**Navigation and UI labels.** Application menus, navigation bars, button labels, and tab headers use title case by convention: "File," "Edit," "View," "Account Settings," "Privacy Policy." Sentence case is gaining popularity in modern UI design (Google's Material Design uses it), but title case remains the default for formal and enterprise applications.

**Academic and publishing formatting.** APA, AP, and Chicago style guides all use title case for headings, though their rules differ slightly. Researchers, journalists, and authors need to apply the correct style guide's rules to their headings. Automated title case conversion saves time and reduces the risk of inconsistent formatting across a long document.

## Common Mistakes and Gotchas

The most common mistake is capitalizing every word, including articles and prepositions. "The Lord Of The Rings" is wrong — it should be "The Lord of the Rings." Python's `.title()` method makes this mistake by default, which is why you need a custom implementation with a minor words list.

Forgetting to capitalize the last word is another frequent error. Even if the last word is a minor word, it should be capitalized. "Something to Live For" is correct, not "Something to Live for." The first and last word rules override the minor words list.

Acronyms break most automated title case tools. "converting HTML to PDF" should become "Converting HTML to PDF," not "Converting Html to Pdf." A proper title case function needs an exception list for known acronyms like HTML, CSS, JSON, API, URL, PDF, and SQL.

Hyphenated words follow inconsistent rules across style guides. AP style capitalizes both parts of a hyphenated compound ("Self-Driving Car") while some others only capitalize the first part ("Self-driving Car"). Check your target style guide and be consistent.

## Frequently Asked Questions

**Should I use title case or sentence case for headings?**
Title case is traditional and formal — best for blog titles, book chapters, and professional documents. Sentence case is modern and casual — increasingly used in UI design and informal content. Pick one style for your entire project and apply it consistently. Both are valid, but mixing them looks sloppy.

**How do different style guides handle title case?**
AP Style capitalizes words of 4+ letters and always capitalizes the first and last word. Chicago Manual of Style has similar rules but with more specific preposition guidelines. APA Style capitalizes words of 4+ letters in titles and 3+ letters in headings. The differences are small but matter in academic and publishing contexts.

**Does title case affect SEO?**
Not directly — Google does not rank title case differently from sentence case. However, title case tends to look more authoritative in search results, which can improve click-through rates. Test both formats with your audience and check your title length with the [Word Counter](/word-counter) to stay under the 60-character display limit.

**How do I handle title case in multiple languages?**
Title case is primarily an English convention. Most other languages (German, French, Spanish) have different capitalization rules for titles. German capitalizes all nouns regardless of position. French only capitalizes the first word and proper nouns. Apply title case only to English text unless you are following a specific multilingual style guide.

## Conclusion

Title case is the standard heading format for English-language content. Applying it correctly — capitalizing major words while keeping articles, prepositions, and conjunctions lowercase — creates professional, readable headings that meet style guide requirements.

The [FlipMyCase Case Converter](/) applies proper title case rules automatically, handling the first-and-last-word rule, minor words, and edge cases. For programmatic use, the JavaScript, Python, and Ruby examples above implement a correct title case function with a minor words list. For other case formats, see the [uppercase guide](/blog/uppercase-converter), the [lowercase guide](/blog/lowercase-converter), or the [complete text conversion guide](/blog/how-to-convert-text-to-different-formats).
