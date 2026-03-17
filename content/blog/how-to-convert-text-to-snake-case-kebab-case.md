---
title: "How to Convert Text to Snake_case and Kebab-case: Complete Naming Convention Guide"
description: "Learn how to convert text to snake_case and kebab-case formats. Step-by-step guide with online tools, code examples, and best practices for programming, URLs, and file naming."
date: "2026-02-27"
keywords: ["how to convert text to snake_case", "convert text to kebab-case", "snake_case converter guide", "kebab-case formatting tutorial", "naming conventions converter", "underscore vs hyphen converter", "programming text formatting", "URL slug converter", "file naming conventions", "code style formatting"]
toolSlug: "snake-kebab-converter"
faq:
  - question: "What's the quickest way to convert text to snake_case?"
    answer: "Use FlipMyCase's free Snake_case/Kebab-case Converter. Just paste your text, select 'snake_case' from the conversion options, and get instant results. No signup or installation required."
  - question: "What's the difference between snake_case and kebab-case?"
    answer: "snake_case uses underscores (_) between words (user_profile_picture), while kebab-case uses hyphens (-) between words (user-profile-picture). Both are lowercase by convention but serve different purposes in programming and web development."
  - question: "When should I use snake_case vs kebab-case?"
    answer: "Use snake_case for Python/Ruby code, database columns, and Unix filenames. Use kebab-case for URLs, CSS classes, npm packages, and HTML attributes. The choice depends on your technology stack and community conventions."
  - question: "Can I convert camelCase to snake_case automatically?"
    answer: "Yes! The FlipMyCase converter handles camelCase, PascalCase, and regular text. Just paste your camelCase text (like 'userProfilePicture') and select snake_case conversion to get 'user_profile_picture' instantly."
  - question: "How do I convert text to kebab-case for URLs?"
    answer: "For URL slugs, use kebab-case conversion. Our tool removes special characters, converts to lowercase, and replaces spaces with hyphens. 'How to Convert Text' becomes 'how-to-convert-text' - perfect for SEO-friendly URLs."
  - question: "What programming languages use snake_case by default?"
    answer: "Python and Ruby strongly prefer snake_case for variables and functions. PHP (PSR standards), Rust, and Elixir also use snake_case. JavaScript/TypeScript communities are split between camelCase and snake_case depending on the context."
  - question: "How do I handle acronyms in snake_case conversion?"
    answer: "For acronyms like 'URL' or 'API', the convention is to treat them as single words. 'ConvertURLToSlug' becomes 'convert_url_to_slug' (not 'convert_u_r_l_to_slug'). Our converter handles this automatically."
  - question: "Can I batch convert multiple files to snake_case?"
    answer: "For multiple files, use command-line tools like rename (Linux/macOS) or PowerShell (Windows). For code files, consider using IDE refactoring tools or writing Python/Node.js scripts to automate the conversion process."
related: ["how-to-convert-text-to-different-formats", "how-to-convert-text-to-uppercase", "uppercase-converter", "word-counter-guide"]
---

# How to Convert Text to Snake_case and Kebab-case

Naming conventions are one of those details that separate professional codebases from unmaintainable ones. Every language community has standards: Python uses snake_case for functions, JavaScript uses camelCase, CSS uses kebab-case for class names, and URLs use kebab-case for slugs. When you are moving data between these contexts — converting a Python variable name to a URL slug, or reformatting a database column name for a JavaScript frontend — you need reliable conversion.

This guide covers what snake_case and kebab-case are, how to convert between them and other formats, working code examples in three languages, and the conventions that determine which format to use where.

## What Are Snake_case and Kebab-case?

**snake_case** replaces spaces between words with underscores and converts everything to lowercase: `user_profile_picture`, `created_at`, `get_all_users`. It is the standard naming convention in Python (PEP 8), Ruby, Rust, Elixir, and most SQL databases.

**kebab-case** replaces spaces with hyphens and converts to lowercase: `user-profile-picture`, `created-at`, `get-all-users`. It is the standard for CSS class names, HTML attributes, URL slugs, npm package names, and command-line tool names.

You would use these conversions when renaming variables during a port between languages, generating URL slugs from page titles, standardizing database column names, or ensuring filenames follow a consistent convention. The [FlipMyCase Snake/Kebab Converter](/snake-kebab-converter) handles all of these scenarios.

## How to Convert with FlipMyCase

1. Open the [Snake_case/Kebab-case Converter](/snake-kebab-converter).
2. Paste your text — it can be regular text, camelCase, PascalCase, or any mixed format.
3. Select your target format: snake_case or kebab-case.
4. Copy the converted output.

The tool automatically detects word boundaries in camelCase and PascalCase input, handles acronyms correctly, and strips special characters. For example, `getUserProfileByID` becomes `get_user_profile_by_id` in snake_case or `get-user-profile-by-id` in kebab-case.

## Code Examples

### JavaScript

```javascript
function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s\-]+/g, '_')
    .toLowerCase();
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

console.log(toSnakeCase('getUserProfile'));       // get_user_profile
console.log(toSnakeCase('User Profile Page'));    // user_profile_page
console.log(toKebabCase('getUserProfile'));       // get-user-profile
console.log(toKebabCase('User Profile Page'));    // user-profile-page

// Convert between snake and kebab
const snake = 'user_profile_picture';
console.log(snake.replace(/_/g, '-'));            // user-profile-picture

const kebab = 'user-profile-picture';
console.log(kebab.replace(/-/g, '_'));            // user_profile_picture
```

### Python

```python
import re

def to_snake_case(text):
    # Handle camelCase and PascalCase
    text = re.sub(r'([a-z])([A-Z])', r'\1_\2', text)
    # Replace spaces, hyphens with underscores
    text = re.sub(r'[\s\-]+', '_', text)
    return text.lower()

def to_kebab_case(text):
    text = re.sub(r'([a-z])([A-Z])', r'\1-\2', text)
    text = re.sub(r'[\s_]+', '-', text)
    return text.lower()

print(to_snake_case('getUserProfile'))       # get_user_profile
print(to_snake_case('User Profile Page'))    # user_profile_page
print(to_kebab_case('getUserProfile'))       # get-user-profile
print(to_kebab_case('User Profile Page'))    # user-profile-page

# Generate URL slugs
title = "How to Convert Text: A Beginner's Guide"
slug = re.sub(r'[^a-z0-9\-]', '', to_kebab_case(title))
print(slug)  # how-to-convert-text-a-beginners-guide
```

### Go

```go
package main

import (
    "fmt"
    "regexp"
    "strings"
)

func toSnakeCase(s string) string {
    re := regexp.MustCompile(`([a-z])([A-Z])`)
    snake := re.ReplaceAllString(s, "${1}_${2}")
    snake = strings.ReplaceAll(snake, " ", "_")
    snake = strings.ReplaceAll(snake, "-", "_")
    return strings.ToLower(snake)
}

func toKebabCase(s string) string {
    re := regexp.MustCompile(`([a-z])([A-Z])`)
    kebab := re.ReplaceAllString(s, "${1}-${2}")
    kebab = strings.ReplaceAll(kebab, " ", "-")
    kebab = strings.ReplaceAll(kebab, "_", "-")
    return strings.ToLower(kebab)
}

func main() {
    fmt.Println(toSnakeCase("getUserProfile"))     // get_user_profile
    fmt.Println(toKebabCase("User Profile Page"))  // user-profile-page
}
```

## Real-World Use Cases

**Database column standardization.** You inherit a legacy database where column names are a mix of camelCase, PascalCase, and space-separated names. Converting everything to snake_case makes SQL queries consistent and readable: `SELECT user_id, created_at, email_address FROM user_profiles`. Most ORMs expect snake_case columns by default.

**URL slug generation.** Every blog post, product page, and category page needs a URL-friendly slug. Converting "How to Convert Text to Snake_case" to `how-to-convert-text-to-snake-case` creates a clean, SEO-friendly URL. The [Slug Generator](/slug-generator) handles this automatically, stripping special characters and normalizing whitespace.

**Cross-language variable mapping.** You are building a REST API in Python (snake_case) that serves a React frontend (camelCase). The serialization layer needs to convert `user_profile_picture` to `userProfilePicture` and back. Understanding the conversion rules helps you configure serializers correctly.

**CSS class naming.** BEM methodology and modern CSS both use kebab-case: `.nav-item`, `.card-header`, `.btn-primary`. When generating class names from component names or design tokens, converting to kebab-case ensures your CSS follows community conventions.

## Common Mistakes and Gotchas

Acronyms are the most common source of bugs in case conversion. `convertURLToSlug` should become `convert_url_to_slug`, not `convert_u_r_l_to_slug`. A naive regex that splits on every uppercase letter will break acronyms apart. The FlipMyCase converter handles this correctly by detecting consecutive uppercase letters as a single word.

Inconsistent separators create subtle issues. If your input contains a mix of spaces, underscores, and hyphens (`user_profile picture-page`), a simple replace will not catch all of them. Use a regex that matches all separator characters at once, as shown in the code examples above.

Numbers need attention too. `user2fa` should become `user_2fa` in snake_case, but naive implementations might produce `user2_fa` or `user_2_f_a`. Test your conversion logic with inputs that contain numbers adjacent to letters.

Leading and trailing separators are a cosmetic issue that signals sloppy conversion. `_user_profile_` and `-user-profile-` look wrong. Always trim separators from the beginning and end of your output.

## Frequently Asked Questions

**Should I use snake_case or kebab-case for filenames?**
It depends on the ecosystem. Unix/Linux convention is snake_case for scripts and config files (`backup_script.sh`, `nginx.conf`). Web assets use kebab-case (`hero-image.jpg`, `main-styles.css`). Pick one convention per project and stick with it.

**How do I convert an entire codebase from camelCase to snake_case?**
Use your IDE's refactoring tools (VS Code "Change All Occurrences," JetBrains "Rename") for variable-by-variable conversion. For bulk changes, write a script using the code examples above, but always test thoroughly — automated renaming can break string literals, comments, and API contracts.

**What about SCREAMING_SNAKE_CASE?**
SCREAMING_SNAKE_CASE (all uppercase with underscores) is used for constants in most languages: `MAX_RETRIES`, `API_BASE_URL`, `DEFAULT_TIMEOUT`. It signals that a value should not be changed. Convert to it by applying snake_case then uppercasing the result.

**Can I use the converter for CSS-to-JavaScript property mapping?**
Yes. CSS properties use kebab-case (`background-color`, `font-size`) while JavaScript uses camelCase (`backgroundColor`, `fontSize`). Paste the CSS property name into the [FlipMyCase converter](/) and select camelCase to get the JavaScript equivalent.

## Conclusion

Snake_case and kebab-case are the two most common word-separator conventions in software development. Knowing when to use each one — snake_case for Python, databases, and config files; kebab-case for URLs, CSS, and package names — keeps your code consistent and readable.

For quick conversions, use the [FlipMyCase Snake_case/Kebab-case Converter](/snake-kebab-converter). For automated pipelines, the JavaScript, Python, and Go examples above integrate directly into your workflow. And for a broader overview of all naming conventions including camelCase and PascalCase, see the [Underscore Conventions Guide](/underscore-conventions) and the [complete text conversion guide](/blog/how-to-convert-text-to-different-formats).
