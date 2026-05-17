---
title: "SCREAMING_SNAKE_CASE for constants: when it actually helps"
date: "2026-05-17"
slug: "screaming-snake-case-for-constants-when-it-actually-helps"
description: ""
status: published
author: "Jason Ramirez"
reviewer: "Jason Ramirez, CADC-II"
---

# SCREAMING_SNAKE_CASE for Constants: When It Actually Helps

> **Short answer:** Use SCREAMING_SNAKE_CASE for module-level or class-level constants that are set once and never reassigned -- values like `MAX_RETRIES`, `API_BASE_URL`, or `DEFAULT_TIMEOUT_MS`. The visual noise is the point. It signals "don't touch this" at a glance, which matters most in large codebases where you can't hold every binding in your head.

---

## Does the casing convention actually change runtime behavior?

No. In most languages, SCREAMING_SNAKE_CASE is a pure convention with zero runtime enforcement. The exception is languages like Elixir, where a capitalized first letter denotes a module alias, not a constant. In Python, Ruby, and JavaScript, the interpreter does not care.

What it does change is the cognitive load on the reader. When you see `MAX_RETRIES` in a function body, you immediately know it did not originate in that scope, it is not going to change mid-execution, and hunting for its definition means looking at the top of the module or a dedicated config file. That is three inferences in one token.

```python
# reader knows immediately: this came from outside, it won't mutate
def fetch_with_retry(url: str) -> requests.Response:
    for attempt in range(MAX_RETRIES):
        try:
            return requests.get(url, timeout=REQUEST_TIMEOUT_S)
        except requests.Timeout:
            if attempt == MAX_RETRIES - 1:
                raise
```

Compare that to `maxRetries` in the same body. Is it a local variable? A parameter default? A module-level binding? You have to trace it.

---

## Which style guides actually mandate this?

The major ones do, with slightly different scopes. [PEP 8](https://peps.python.org/pep-0008/#constants) says constants should be written in `ALL_CAPS_WITH_UNDERSCORES` and should live at the module level. [Google's Python Style Guide](https://google.github.io/styleguide/pyguide.html#316-naming) follows the same rule and extends it to class-level constants. [The Ruby community style guide](https://rubystyle.guide/#screaming-snake-case) applies it to all constants, which in Ruby includes class and module names -- though those use `PascalCase` by a separate rule, so in practice SCREAMING_SNAKE_CASE lands on non-class constants.

JavaScript and TypeScript have no single canonical guide, but [Airbnb's style guide](https://github.com/airbnb/javascript#naming--uppercase) specifies uppercase for exported constants that are "immutable primitives or frozen objects defined at file-level." That qualifier matters: a `const` that holds a mutable array does not qualify under their rule.

```typescript
// Airbnb-style: uppercase only when truly immutable
export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;
export const SUPPORTED_LOCALES = Object.freeze(['en', 'fr', 'de']);

// not uppercase -- const binding, but the array is mutable
const pendingJobs: Job[] = [];
```

---

## When does it create more noise than signal?

When you apply it to values that are only "constant" by accident. A config value pulled from an environment variable is not a constant in the same sense as `Math.PI`. It changes between deployments. Screaming at the reader about `DATABASE_URL` being immutable is technically accurate for one process run, but it conflates two different ideas: "this value does not change at runtime" and "this value is a fixed fact about the program."

A second failure mode is scattering SCREAMING_SNAKE_CASE across local scopes. Some developers write:

```javascript
function buildQuery(filters) {
  const MAX_FILTER_COUNT = 10; // local, function-scoped
  if (filters.length > MAX_FILTER_COUNT) throw new RangeError(...);
}
```

This is defensible, but it weakens the signal. If everything is SCREAMING, nothing is. The convention earns its value when it reliably means "module or class scope, set once." The moment it starts appearing in function bodies routinely, readers stop using it as a navigation cue.

---

## How does this interact with TypeScript enums and frozen objects?

Enum members in TypeScript are already namespaced, so the casing on the member is somewhat redundant as a scope signal. The [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/enums.html) uses PascalCase for both the enum name and its members (`Direction.Up`, not `Direction.UP`). Many teams follow that. Some teams use SCREAMING_SNAKE_CASE for enum members to signal that they are constants. Both are defensible; pick one and enforce it with a linter rule.

Frozen objects are a different case. If you are using a frozen object as a poor-man's enum in JavaScript, SCREAMING_SNAKE_CASE on the variable name is a reasonable signal that the object is not meant to be reassigned:

```javascript
const HTTP_STATUS = Object.freeze({
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});
```

The members themselves are PascalCase here, which is a common pattern. The outer binding uses SCREAMING to tell you "this reference is stable and shared."

---

## What does a practical file layout look like?

Keep constants in one place per module. If a file grows past roughly 300 lines and has more than 8-10 constants, consider extracting them into a `constants.ts` or `config.py` file. The grouping makes the convention self-documenting.

```python
# limits.py
REQUEST_TIMEOUT_S = 10
MAX_RETRIES = 3
RETRY_BACKOFF_FACTOR = 1.5
MAX_RESPONSE_BODY_BYTES = 10 * 1024 * 1024

# main.py
from limits import MAX_RETRIES, REQUEST_TIMEOUT_S
```

A reader opening `main.py` sees the import and knows exactly where those values live. No grepping through the whole repo.

---

## Should you enforce this with a linter?

Yes, and it is low-effort. [ESLint's `@typescript-eslint/naming-convention` rule](https://typescript-eslint.io/rules/naming-convention/) lets you require SCREAMING_SNAKE_CASE on `const` exports at the module level. Python projects can use [Pylint's `C0103` naming check](https://pylint.readthedocs.io/en/stable/user_guide/messages/convention/invalid-name.html) with a custom regex. Enforcing it in CI means the convention stays consistent without relying on code review comments, which are easy to miss and easy to argue about.

The convention is not about aesthetics. It is about encoding scope and mutability intent into the token itself, so a reader 6 months later does not have to re-derive it.

## Frequently asked questions

### What is SCREAMING_SNAKE_CASE and why is it used for constants?
SCREAMING_SNAKE_CASE combines all uppercase letters with underscores between words, like `MAX_RETRY_COUNT` or `API_BASE_URL`. It is the widely adopted convention for declaring constants in languages such as Python, JavaScript, Java, and C. The visual loudness signals to developers that a value should never be reassigned, making accidental mutations easier to spot during code review and reducing bugs caused by overwriting fixed configuration values.

### Does using SCREAMING_SNAKE_CASE actually improve code readability?
Yes, SCREAMING_SNAKE_CASE measurably improves readability by creating an immediate visual distinction between constants and regular variables. When scanning unfamiliar code, developers instinctively recognize that `DATABASE_TIMEOUT` is a fixed value while `databaseTimeout` might be mutable. This contrast reduces cognitive load, speeds up onboarding for new team members, and makes intent explicit without requiring comments or additional documentation to explain a variable's purpose.

### When should I NOT use SCREAMING_SNAKE_CASE for constants?
Avoid SCREAMING_SNAKE_CASE when a language community has a different established convention for constants. Ruby, for example, uses `PascalCase` for constants, and Go uses `camelCase` regardless of mutability. Forcing SCREAMING_SNAKE_CASE into those ecosystems creates friction and looks out of place. Always prioritize the style guide of your language or framework over general conventions to keep codebases consistent and maintainable.

### How do I quickly convert variable names to SCREAMING_SNAKE_CASE?
You can convert any text to SCREAMING_SNAKE_CASE instantly using an online case converter like flipmycase.com. Paste your variable name or phrase, select the SCREAMING_SNAKE_CASE option, and copy the result directly into your code. This is especially useful when renaming multiple constants during a refactor or when you are unsure how to handle edge cases like acronyms, numbers, or hyphenated words within a name.

### Is SCREAMING_SNAKE_CASE the same as uppercase snake_case?
Yes, SCREAMING_SNAKE_CASE and uppercase snake_case refer to the same formatting style. Both terms describe identifiers where all letters are capitalized and spaces or word boundaries are replaced with underscores. "SCREAMING_SNAKE_CASE" is the informal, developer-community name that emphasizes the aggressive all-caps appearance, while "uppercase snake_case" is the more descriptive technical label. You will encounter both terms in style guides, linters, and naming convention discussions.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is SCREAMING_SNAKE_CASE and why is it used for constants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SCREAMING_SNAKE_CASE combines all uppercase letters with underscores between words, like `MAX_RETRY_COUNT` or `API_BASE_URL`. It is the widely adopted convention for declaring constants in languages such as Python, JavaScript, Java, and C. The visual loudness signals to developers that a value should never be reassigned, making accidental mutations easier to spot during code review and reducing bugs caused by overwriting fixed configuration values."
      }
    },
    {
      "@type": "Question",
      "name": "Does using SCREAMING_SNAKE_CASE actually improve code readability?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SCREAMING_SNAKE_CASE measurably improves readability by creating an immediate visual distinction between constants and regular variables. When scanning unfamiliar code, developers instinctively recognize that `DATABASE_TIMEOUT` is a fixed value while `databaseTimeout` might be mutable. This contrast reduces cognitive load, speeds up onboarding for new team members, and makes intent explicit without requiring comments or additional documentation to explain a variable's purpose."
      }
    },
    {
      "@type": "Question",
      "name": "When should I NOT use SCREAMING_SNAKE_CASE for constants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Avoid SCREAMING_SNAKE_CASE when a language community has a different established convention for constants. Ruby, for example, uses `PascalCase` for constants, and Go uses `camelCase` regardless of mutability. Forcing SCREAMING_SNAKE_CASE into those ecosystems creates friction and looks out of place. Always prioritize the style guide of your language or framework over general conventions to keep codebases consistent and maintainable."
      }
    },
    {
      "@type": "Question",
      "name": "How do I quickly convert variable names to SCREAMING_SNAKE_CASE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can convert any text to SCREAMING_SNAKE_CASE instantly using an online case converter like flipmycase.com. Paste your variable name or phrase, select the SCREAMING_SNAKE_CASE option, and copy the result directly into your code. This is especially useful when renaming multiple constants during a refactor or when you are unsure how to handle edge cases like acronyms, numbers, or hyphenated words within a name."
      }
    },
    {
      "@type": "Question",
      "name": "Is SCREAMING_SNAKE_CASE the same as uppercase snake_case?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SCREAMING_SNAKE_CASE and uppercase snake_case refer to the same formatting style. Both terms describe identifiers where all letters are capitalized and spaces or word boundaries are replaced with underscores. \"SCREAMING_SNAKE_CASE\" is the informal, developer-community name that emphasizes the aggressive all-caps appearance, while \"uppercase snake_case\" is the more descriptive technical label. You will encounter both terms in style guides, linters, and naming convention discussions."
      }
    }
  ]
}
</script>
