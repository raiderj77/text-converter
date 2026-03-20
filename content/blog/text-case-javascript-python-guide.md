---
title: "How to Convert Text Case in JavaScript and Python — Code Examples and Methods"
description: "Learn how to convert text case programmatically in JavaScript and Python. Built-in methods, custom naming convention converters for camelCase, snake_case, kebab-case, and edge cases to watch for."
date: "2026-03-18"
keywords: ["convert text case JavaScript", "Python string case conversion", "toUpperCase toLowerCase", "camelCase converter JavaScript", "snake_case Python", "PascalCase function", "kebab-case converter", "JavaScript title case", "Python capitalize vs title", "Unicode case conversion"]
toolSlug: "text-converter"
faq:
  - question: "Does JavaScript have a built-in title case method?"
    answer: "No. JavaScript only provides toUpperCase() and toLowerCase() as built-in string methods. To convert text to title case, you need a custom function that splits the string into words, capitalizes the first letter of each word, and joins them back together. FlipMyCase handles this instantly without writing any code."
  - question: "How do I convert camelCase to snake_case in Python?"
    answer: "Use a regex to insert underscores before uppercase letters, then lowercase the result: re.sub(r'([a-z])([A-Z])', r'\\1_\\2', text).lower(). For production code, the inflection library provides a reliable underscore() function that handles acronyms and edge cases correctly."
  - question: "What is the difference between capitalize() and title() in Python?"
    answer: "capitalize() uppercases only the first character of the entire string and lowercases the rest. title() uppercases the first character of every word. So 'hello world'.capitalize() returns 'Hello world', while 'hello world'.title() returns 'Hello World'."
  - question: "How do I handle Unicode case conversion?"
    answer: "Use locale-aware methods when working with non-ASCII text. In Python, casefold() is preferred over lower() for case-insensitive comparisons because it handles special cases like the German eszett. In JavaScript, use toLocaleLowerCase() and toLocaleUpperCase() with a locale argument for Turkish and similar languages."
related: ["how-to-convert-text-to-snake-case-kebab-case", "how-to-convert-text-to-uppercase", "how-to-convert-text-to-different-formats", "title-case-converter"]
---

# How to Convert Text Case in JavaScript and Python

Case conversion is one of the most common string operations in programming. Whether you are normalizing user input, formatting variable names, or generating URL slugs, you will reach for case conversion methods constantly. JavaScript and Python both provide built-in methods for basic conversions, but neither language covers every naming convention out of the box.

This guide walks through the built-in methods in both languages, shows you how to build custom converters for camelCase, PascalCase, snake_case, and kebab-case, and covers the edge cases that trip up most implementations.

## Built-in Case Methods

### JavaScript

JavaScript provides two string methods for case conversion:

```javascript
const text = "Hello World";

text.toUpperCase();    // "HELLO WORLD"
text.toLowerCase();    // "hello world"
```

That is it. There is no built-in `toTitleCase()`, no `capitalize()`, no `swapCase()`. For anything beyond uppercase and lowercase, you write your own function or use a library.

JavaScript also provides locale-aware variants that matter when working with non-English text:

```javascript
text.toLocaleUpperCase('tr');  // Turkish locale
text.toLocaleLowerCase('tr');  // Turkish locale
```

### Python

Python is significantly more generous with built-in case methods:

```python
text = "hello World"

text.upper()       # "HELLO WORLD"
text.lower()       # "hello world"
text.title()       # "Hello World"
text.capitalize()  # "Hello world"
text.swapcase()    # "HELLO wORLD"
text.casefold()    # "hello world" (aggressive lowercase for comparisons)
```

The `casefold()` method deserves special attention. It performs a more aggressive lowercasing than `lower()`, handling characters like the German eszett (`'ß'.casefold()` returns `'ss'`). Use `casefold()` whenever you are doing case-insensitive string comparisons.

One important distinction: `capitalize()` uppercases only the first character of the string and lowercases everything else. `title()` uppercases the first character of every word. These are not interchangeable.

## Converting to Naming Conventions in JavaScript

The built-in methods do not cover programming naming conventions. Here are production-ready functions for each.

### camelCase

```javascript
function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

toCamelCase("user profile name");   // "userProfileName"
toCamelCase("User-Profile-Name");   // "userProfileName"
```

### PascalCase

```javascript
function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase());
}

toPascalCase("user profile name");   // "UserProfileName"
toPascalCase("user-profile-name");   // "UserProfileName"
```

### snake_case

```javascript
function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s\-]+/g, '_')
    .toLowerCase();
}

toSnakeCase("getUserProfile");       // "get_user_profile"
toSnakeCase("User Profile Name");    // "user_profile_name"
```

### kebab-case

```javascript
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

toKebabCase("getUserProfile");       // "get-user-profile"
toKebabCase("User Profile Name");    // "user-profile-name"
```

These functions handle the most common inputs: space-separated words, camelCase, PascalCase, and mixed separators. For truly robust conversion that handles acronyms, numbers, and special characters, the logic gets more involved.

## How FlipMyCase Helps

Not every case conversion requires writing code. If you need to quickly convert a block of text, a variable name, or a list of strings, [FlipMyCase](https://flipmycase.com) handles it instantly in your browser. Paste your text, pick a format, and copy the result. No dependencies, no build step, no function to maintain.

FlipMyCase supports all the conversions covered in this guide: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case. It also handles edge cases that simple regex functions miss, including acronyms, numbers adjacent to letters, and mixed separators.

For developers, [FlipMyCase](https://flipmycase.com) is useful as a quick sanity check when building your own conversion logic. Convert a few test strings with the tool, then verify your code produces the same output.

## Converting to Naming Conventions in Python

Python's richer set of built-in methods gives you a head start, but you still need custom logic for programming naming conventions.

### Using str Methods and regex

```python
import re

def to_camel_case(text):
    words = re.split(r'[\s_\-]+', text)
    return words[0].lower() + ''.join(w.capitalize() for w in words[1:])

def to_pascal_case(text):
    words = re.split(r'[\s_\-]+', text)
    return ''.join(w.capitalize() for w in words)

def to_snake_case(text):
    text = re.sub(r'([a-z])([A-Z])', r'\1_\2', text)
    return re.sub(r'[\s\-]+', '_', text).lower()

def to_kebab_case(text):
    text = re.sub(r'([a-z])([A-Z])', r'\1-\2', text)
    return re.sub(r'[\s_]+', '-', text).lower()
```

```python
to_camel_case("user profile name")    # "userProfileName"
to_pascal_case("user profile name")   # "UserProfileName"
to_snake_case("getUserProfile")       # "get_user_profile"
to_kebab_case("UserProfileName")      # "user-profile-name"
```

### Using Libraries

For production applications, consider established libraries instead of rolling your own:

**inflection** is the most popular choice. It provides `underscore()`, `camelize()`, `dasherize()`, and `titleize()`:

```python
import inflection

inflection.underscore("UserProfile")       # "user_profile"
inflection.camelize("user_profile")        # "UserProfile"
inflection.camelize("user_profile", False) # "userProfile"
inflection.dasherize("user_profile")       # "user-profile"
```

**stringcase** offers a similar API with functions like `snakecase()`, `camelcase()`, `pascalcase()`, and `kebabcase()`. Either library saves you from maintaining and testing your own conversion code.

## Edge Cases and Gotchas

### Unicode Case Conversion

The simplest case conversions break down with Unicode. The German eszett is the classic example:

```javascript
'ß'.toUpperCase()  // "SS" — one character becomes two
'SS'.toLowerCase() // "ss" — but lowercase does not round-trip back to ß
```

In Python, the same issue exists:

```python
'ß'.upper()     # "SS"
'SS'.lower()    # "ss"
'ß'.casefold()  # "ss"
```

This means `text.upper().lower()` is not always equal to `text.lower()`. Never assume case conversion is reversible.

### The Turkish I Problem

Turkish has four distinct "i" characters: `i`, `I`, `ı` (dotless i), and `İ` (capital I with dot). In standard English rules, `'i'.toUpperCase()` gives `'I'`. In Turkish, it should give `'İ'`. This breaks case-insensitive comparisons for any application serving Turkish users.

In JavaScript, use locale-aware methods:

```javascript
'i'.toLocaleUpperCase('tr')  // "İ"
'I'.toLocaleLowerCase('tr')  // "ı"
```

In Python, the `locale` module or explicit handling is required, since `upper()` and `lower()` always follow Unicode default rules rather than locale-specific ones.

### Acronyms in Naming Conventions

Converting `XMLParser` to snake_case should produce `xml_parser`, not `x_m_l_parser`. A naive regex that splits before every uppercase letter will break acronyms apart. A more robust approach detects transitions between consecutive uppercase letters and lowercase letters:

```javascript
function toSnakeCaseRobust(str) {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
}

toSnakeCaseRobust("XMLParser");        // "xml_parser"
toSnakeCaseRobust("getHTTPSResponse");  // "get_https_response"
```

The first regex handles the transition from an acronym to a capitalized word. The second handles the transition from a lowercase letter to an uppercase letter.

### Numbers Adjacent to Letters

Strings like `user2fa` or `layer3Switch` need careful handling. Should `user2fa` become `user_2fa` or `user_2_fa`? Most conventions treat a number-letter boundary as a word boundary only when the number comes first. Test your converter with numeric inputs before deploying.

## Frequently Asked Questions

**Does JavaScript have a built-in title case method?**
No. JavaScript only provides `toUpperCase()` and `toLowerCase()`. To get title case, split the string into words, capitalize the first letter of each, and join them back. For a quick conversion without code, FlipMyCase handles title case along with every other format.

**How do I convert camelCase to snake_case in Python?**
Use a regex to insert underscores before uppercase letters: `re.sub(r'([a-z])([A-Z])', r'\1_\2', text).lower()`. For production code, the `inflection` library provides an `underscore()` function that handles acronyms and edge cases reliably.

**What is the difference between capitalize() and title() in Python?**
`capitalize()` uppercases only the first character of the entire string and lowercases the rest. `title()` uppercases the first character of every word. `'hello world'.capitalize()` returns `'Hello world'`, while `'hello world'.title()` returns `'Hello World'`.

**How do I handle Unicode case conversion?**
Use locale-aware methods for non-ASCII text. In Python, prefer `casefold()` over `lower()` for case-insensitive comparisons. In JavaScript, use `toLocaleLowerCase()` and `toLocaleUpperCase()` with a locale argument when working with Turkish, German, or other languages with special casing rules.

## Conclusion

JavaScript gives you the bare minimum for case conversion. Python gives you more, but neither language includes built-in converters for programming naming conventions like camelCase or snake_case. The code examples above cover the most common patterns, and the `inflection` library in Python saves you from maintaining your own implementation.

For quick one-off conversions, skip the code entirely and use [FlipMyCase](https://flipmycase.com). Paste your text, select your target format, and copy the result. It handles all the edge cases — acronyms, Unicode, mixed separators, numbers — so you do not have to.
