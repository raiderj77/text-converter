---
title: "Naming Conventions in Programming — The Complete Guide to camelCase, snake_case, kebab-case, and More"
description: "Master every programming naming convention: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more. Learn which languages use which convention and convert between them instantly."
date: "2026-03-18"
keywords: ["programming naming conventions", "camelCase guide", "snake_case naming convention", "kebab-case programming", "PascalCase convention", "CONSTANT_CASE", "variable naming best practices", "code naming standards", "naming convention converter", "camelCase vs snake_case"]
toolSlug: "snake-kebab-converter"
faq:
  - question: "Which naming convention should I use?"
    answer: "Follow the convention your language community expects. Python uses snake_case, JavaScript uses camelCase for variables and PascalCase for classes, CSS uses kebab-case. When in doubt, check your language's official style guide and match the existing codebase."
  - question: "Can I mix naming conventions in one project?"
    answer: "Yes, but only when crossing technology boundaries. A JavaScript project might use camelCase for variables, PascalCase for classes, CONSTANT_CASE for constants, and kebab-case for CSS classes. The key is that each context should be internally consistent."
  - question: "What naming convention does Python use?"
    answer: "Python follows PEP 8: snake_case for variables, functions, and modules; PascalCase for class names; and SCREAMING_SNAKE_CASE for constants. These conventions are enforced by linters like flake8 and pylint, and violating them will confuse every Python developer reading your code."
  - question: "How do I convert between naming conventions?"
    answer: "Use the FlipMyCase converter at flipmycase.com. Paste any text and convert instantly between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE. It handles word boundary detection, acronyms, and edge cases automatically — no regex writing required."
related: ["how-to-convert-text-to-snake-case-kebab-case", "how-to-convert-text-to-different-formats", "slug-generator-guide"]
---

# Naming Conventions in Programming: The Complete Guide

Naming conventions are not style preferences. They are communication protocols. When you name a variable `getUserProfile` in JavaScript, every developer on your team instantly knows it is a function that returns user data. Name that same thing `get_user_profile` in a JavaScript codebase and you signal that you either came from Python or did not read the project's style guide.

Consistent naming prevents bugs, speeds up code reviews, and makes codebases navigable. This guide covers every major naming convention, which languages use them, and how to convert between them.

## All Major Naming Conventions Explained

**camelCase** starts with a lowercase letter and capitalizes the first letter of each subsequent word: `getUserProfile`, `firstName`, `isActive`. No separators between words. This is the dominant convention for variables and functions in JavaScript, TypeScript, Java, and Swift. The name comes from the "humps" created by uppercase letters in the middle of the word.

**PascalCase** capitalizes the first letter of every word, including the first: `UserProfile`, `HttpClient`, `StringBuilder`. Also called UpperCamelCase. Used universally for class names across nearly every object-oriented language, and it is the primary convention for all public identifiers in C# and Go exported symbols.

**snake_case** separates words with underscores, all lowercase: `user_profile`, `get_all_users`, `created_at`. The standard in Python, Ruby, Rust, and Elixir. Also the dominant convention for database column names and SQL identifiers. Readable at a glance because the underscores create clear visual separation.

**kebab-case** separates words with hyphens, all lowercase: `user-profile`, `nav-item`, `my-component`. The standard for CSS class names, HTML attributes, URL slugs, npm package names, and CLI tool names. Cannot be used for variable names in most languages because the hyphen is interpreted as a minus operator.

**CONSTANT_CASE** (also called SCREAMING_SNAKE_CASE) uses uppercase letters with underscore separators: `MAX_RETRIES`, `API_BASE_URL`, `DEFAULT_TIMEOUT`. Used across nearly every language to signal that a value is a constant and should not be reassigned. Immediately distinguishable from regular variables.

**dot.case** separates words with periods: `user.profile.settings`, `app.config.database`. Common in configuration files (Java properties files, Spring Boot configs), object key paths, and some logging frameworks. Not used for variable names in most languages since the dot is the member access operator.

**Train-Case** capitalizes the first letter of each word and separates with hyphens: `User-Profile`, `Content-Type`, `X-Request-Id`. Primarily used in HTTP headers. You see it every time you inspect network requests: `Content-Type`, `Cache-Control`, `Authorization`.

**flatcase** concatenates words with no separators and no capitalization: `userprofile`, `getallitems`. Rarely used deliberately because it destroys readability. You will encounter it in package names (Java's `java.util`), some URL paths, and hashtags. Avoid it for anything longer than two words.

## Which Languages Use Which Convention

Understanding the expected convention for each language saves you from writing code that looks foreign to its ecosystem:

- **JavaScript / TypeScript** — `camelCase` for variables and functions, `PascalCase` for classes and components, `CONSTANT_CASE` for constants
- **Python** — `snake_case` for variables, functions, and modules; `PascalCase` for classes; `CONSTANT_CASE` for constants (PEP 8)
- **Ruby** — `snake_case` for variables, methods, and file names; `PascalCase` for classes and modules; `SCREAMING_SNAKE_CASE` for constants
- **Java** — `camelCase` for variables and methods, `PascalCase` for classes and interfaces, `CONSTANT_CASE` for static finals
- **C#** — `PascalCase` for methods, properties, and classes; `camelCase` for private fields (often prefixed with `_`); `CONSTANT_CASE` for constants
- **Go** — `PascalCase` for exported (public) identifiers, `camelCase` for unexported (private) identifiers; the case of the first letter controls visibility
- **Rust** — `snake_case` for variables, functions, and modules; `PascalCase` for types, traits, and enums; `SCREAMING_SNAKE_CASE` for constants
- **PHP** — `camelCase` for methods (PSR-12), `PascalCase` for classes, `snake_case` in older codebases and WordPress
- **CSS** — `kebab-case` for class names, properties, and custom properties (`--primary-color`)
- **HTML** — `kebab-case` for attributes and data attributes (`data-user-id`)
- **SQL** — `snake_case` for table and column names (`user_profiles`, `created_at`)

## How FlipMyCase Helps

Switching between naming conventions by hand is tedious and error-prone, especially when you need to handle word boundary detection in `camelCase` or split acronyms correctly. [FlipMyCase](https://flipmycase.com) converts between any naming convention instantly. Paste `getUserProfileSettings`, select snake_case, and get `get_user_profile_settings` without writing a single regex.

The converter supports camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE. It handles edge cases that trip up manual conversion: acronyms like `XMLParser`, numbers adjacent to letters like `user2fa`, and mixed-format input with inconsistent separators. Whether you are porting Python code to JavaScript, generating URL slugs from titles, or standardizing database column names, [FlipMyCase](https://flipmycase.com) eliminates the friction.

## Common Mistakes and Best Practices

**Mixing conventions within one context.** A JavaScript file with both `getUserProfile` and `get_user_profile` tells readers that either two people wrote this code without agreeing on standards, or a library boundary was not properly adapted. Pick one convention per context and enforce it with a linter.

**Inconsistent acronym handling.** Should it be `XMLParser` or `XmlParser`? `HTMLElement` or `HtmlElement`? Language communities disagree. JavaScript's DOM uses `innerHTML` and `getElementById` (mixed approaches). C# and .NET recommend `XmlParser` and `HtmlElement` for readability. Whatever you choose, apply it consistently across the entire project.

**Single-letter variable names.** Outside of loop counters (`i`, `j`, `k`) and well-established mathematical conventions (`x`, `y`, `z` for coordinates), single-letter names destroy readability. `d` could mean date, distance, duration, or delta. Spend the two seconds to write `duration`.

**Meaningless names.** Names like `data`, `temp`, `result`, `info`, and `item` tell you nothing about what the variable holds. `userData` is marginally better. `activeUserProfiles` is actually useful.

**Hungarian notation.** Prefixing variables with their type (`strName`, `intCount`, `bIsActive`) was standard practice in C and early Windows development. Modern languages with strong type systems and IDE support make this redundant. You will still see it in legacy codebases, but do not introduce it in new code.

## Real-World Examples

Take the concept "user profile settings" and see how it looks across conventions:

- **camelCase**: `userProfileSettings`
- **PascalCase**: `UserProfileSettings`
- **snake_case**: `user_profile_settings`
- **kebab-case**: `user-profile-settings`
- **CONSTANT_CASE**: `USER_PROFILE_SETTINGS`
- **dot.case**: `user.profile.settings`
- **Train-Case**: `User-Profile-Settings`
- **flatcase**: `userprofilesettings`

In practice, the same concept appears differently depending on context. A Python function might be `get_user_profile_settings()`, the JavaScript equivalent `getUserProfileSettings()`, the C# version `GetUserProfileSettings()`, the CSS class `.user-profile-settings`, the database table `user_profile_settings`, the environment variable `USER_PROFILE_SETTINGS`, and the URL path `/user-profile-settings`.

That is not inconsistency. That is each ecosystem following its own established convention. The inconsistency happens when you use snake_case in JavaScript or camelCase in Python.

## Frequently Asked Questions

**Which naming convention should I use?**
Follow the convention your language community expects. Python uses snake_case, JavaScript uses camelCase for variables and PascalCase for classes, CSS uses kebab-case. When in doubt, check your language's official style guide and match the existing codebase.

**Can I mix naming conventions in one project?**
Yes, but only when crossing technology boundaries. A JavaScript project might use camelCase for variables, PascalCase for classes, CONSTANT_CASE for constants, and kebab-case for CSS classes. The key is that each context should be internally consistent.

**What naming convention does Python use?**
Python follows PEP 8: snake_case for variables, functions, and modules; PascalCase for class names; and SCREAMING_SNAKE_CASE for constants. These conventions are enforced by linters like flake8 and pylint, and violating them will confuse every Python developer reading your code.

**How do I convert between naming conventions?**
Use the [FlipMyCase converter](https://flipmycase.com). Paste any text and convert instantly between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE. It handles word boundary detection, acronyms, and edge cases automatically — no regex writing required.

## Conclusion

Naming conventions exist because code is read far more than it is written. Learning which convention belongs where — and converting between them cleanly — is a fundamental skill that pays off on every project.

If you need to convert text between naming conventions right now, open [FlipMyCase](https://flipmycase.com) and paste your text. It supports every convention covered in this guide, handles edge cases automatically, and works instantly in your browser with no installation required.
