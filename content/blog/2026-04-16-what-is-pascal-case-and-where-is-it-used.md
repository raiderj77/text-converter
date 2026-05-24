---
title: "What Is Pascal Case and Where Is It Used"
date: "2026-04-16"
slug: "what-is-pascal-case-and-where-is-it-used"
description: "Pascal case capitalizes the first letter of every word with no separators. Learn where it is mandated by language specs and official style guides, and how it differs from camelCase and snake_case."
status: published
author: "Your Friendly Developer"
reviewer: "Your Friendly Developer"
---

# What Is Pascal Case and Where Is It Used

Pascal case is a naming convention where the first letter of every word is capitalized and no separators appear between them. The result looks like `UserAccountBalance` or `HttpRequestHandler`. It is also called UpperCamelCase to distinguish it from camelCase, which leaves the first letter lowercase.

The name comes from the Pascal programming language, designed by Niklaus Wirth in the late 1960s, where this capitalization style was characteristic of the language's conventions.

## How Pascal Case Works

The rule is straightforward: split the intended name into its component words, capitalize the first letter of each, and concatenate them with no separator.

| Source words | Pascal case result |
|---|---|
| user account balance | `UserAccountBalance` |
| http request handler | `HttpRequestHandler` |
| parse integer | `ParseInteger` |
| is valid email | `IsValidEmail` |

There are no lowercase letters at the start, and word boundaries are readable because each component word begins with a capital.

## The Same Identifier Across Four Conventions

Seeing one concept rendered in each major convention shows the practical difference at a glance.

| Convention | Example | Notes |
|---|---|---|
| PascalCase | `UserAccountBalance` | First letter of every word uppercase |
| camelCase | `userAccountBalance` | First letter lowercase, subsequent words uppercase |
| snake_case | `user_account_balance` | All lowercase, underscores between words |
| kebab-case | `user-account-balance` | All lowercase, hyphens between words |

PascalCase and camelCase produce visually similar identifiers. The only distinguishing mark is the first letter.

## Where Pascal Case Is Required or Standard

Pascal case is not a universal default across all programming. It is language- and context-specific. The following covers where it is genuinely mandated or strongly conventional.

### C# and the .NET Ecosystem

Microsoft's .NET design guidelines, maintained in official Microsoft documentation, explicitly specify PascalCase for:

- Type names (classes, structs, interfaces, enums, delegates)
- Public and protected member names (methods, properties, events)
- Namespace identifiers

These guidelines exist because the .NET runtime and Base Class Library were designed for cross-language interoperability. A consistent naming surface makes APIs predictable whether a developer is calling them from C#, Visual Basic, or F#.

Interface names follow PascalCase with an `I` prefix by convention: `IDisposable`, `IEnumerable<T>`, `IHttpClientFactory`. Any .NET standard library type such as `StreamReader`, `HttpClient`, and `CancellationToken` follows the same pattern.

### Java

The Java Language Specification does not legislate naming conventions, but the conventions documented by Oracle since the language's early editions are universally followed in practice: class and interface names use PascalCase. Every type in the standard library (`String`, `ArrayList`, `BufferedReader`, `ExecutorService`) demonstrates this. Deviating from it in a Java codebase is unusual enough to draw comment in code review.

### TypeScript and JavaScript

The TypeScript handbook and the major framework ecosystems standardize PascalCase for class names and React component function names. A React component named `userProfile` will render correctly, but the ecosystem convention is strong enough that ESLint can enforce it via the opt-in `react/jsx-pascal-case` rule.

TypeScript also uses PascalCase for type aliases and interfaces: `type UserProfile = { ... }`, `interface ApiResponse { ... }`.

### Go

Go makes PascalCase load-bearing in a way no other mainstream language does: an exported identifier (one accessible outside its package) must start with an uppercase letter. A function named `parseToken` is unexported (package-private). A function named `ParseToken` is exported (public). The rule applies identically to types, variables, and constants. There is no `public` keyword; the capital first letter is the entire visibility mechanism, as specified in the Go language specification.

### Python

PEP 8, Python's official style guide, specifies PascalCase (which it calls CapWords) for class names only. Functions, methods, module-level variables, and almost everything else uses snake_case. A PascalCase function or a snake_case class name both violate PEP 8, even though Python itself does not enforce naming at runtime.

## What Pascal Case Is Not Used For

Within the languages that use it for types and exports, PascalCase is generally not applied to:

- **Local variables and parameters**: camelCase in Java, C#, and TypeScript; snake_case in Python and Ruby
- **Constants**: SCREAMING_SNAKE_CASE is conventional in Java and Python (`MAX_RETRIES`, `DEFAULT_TIMEOUT`), and all-caps in Go for package-level constants
- **File and directory names**: typically kebab-case (`user-profile.ts`) or snake_case (`user_profile.py`) depending on ecosystem
- **CSS class names and HTML attributes**: kebab-case is standard

The convention is narrowly scoped: PascalCase belongs to types and publicly-named constructs, not to every identifier in a codebase.

## Frequently Asked Questions

**What is the difference between PascalCase and camelCase?**

Both concatenate words without separators and use capitalization to mark word boundaries. The only difference is the first letter: PascalCase capitalizes it (`UserName`), camelCase does not (`userName`). In most languages that use both, PascalCase identifies types (classes, interfaces, enums) while camelCase identifies values: variables, parameters, and local functions.

**Why is it called PascalCase?**

The convention takes its name from the Pascal programming language. When C++ and later Java popularized object-oriented programming, the convention of using this capitalization style for class and type names carried the association forward into those ecosystems.

**Does Go require PascalCase?**

Go requires an uppercase first letter for any identifier that is exported from a package. This is a language rule enforced by the compiler, not merely a style preference. By convention, all subsequent words in an exported name also follow PascalCase (`ParseToken`, `UserAccountBalance`), not just the first letter.

**Is PascalCase the same as title case?**

No. Title case applies to prose headings and typically lowercases articles and short prepositions. It includes spaces and treats word boundaries differently depending on the style guide. PascalCase applies to code identifiers, contains no spaces, and capitalizes the first letter of every component word without exception, including articles and prepositions when they appear as part of the name.

**Does Python use PascalCase?**

Python uses PascalCase (CapWords) for class names only, per PEP 8. Functions, methods, and variables use snake_case. A class named `user_profile` or a function named `UserProfile` both violate the convention, even if the interpreter does not object at runtime.

For quick text case conversions during development, [flipmycase.com](https://flipmycase.com) converts identifiers between PascalCase, camelCase, snake_case, and other formats instantly.
