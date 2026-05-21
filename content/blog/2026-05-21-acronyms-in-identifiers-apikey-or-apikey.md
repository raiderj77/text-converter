---
title: "Acronyms in identifiers: APIKey or ApiKey"
date: "2026-05-21"
slug: "acronyms-in-identifiers-apikey-or-apikey"
description: ""
status: published
author: "Jason Ramirez"
reviewer: "Jason Ramirez, CADC-II"
---

# Acronyms in Identifiers: `APIKey` or `ApiKey`?

> **Short answer:** Use `ApiKey`, not `APIKey`. Treat acronyms as words and capitalize only the first letter. Every major modern style guide -- [.NET](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions), [Google Java](https://google.github.io/styleguide/javaguide.html#s5.3-camel-case), [Swift](https://www.swift.org/documentation/api-design-guidelines/) -- converged on this years ago. All-caps acronyms wreck readability at word boundaries and break automated tooling.

---

## Why does `APIKey` cause real problems?

All-caps acronyms break automated tooling in predictable ways. A naive snake_case converter turns `APIKey` into `a_p_i_key` instead of `api_key`, and camelCase parsers misread word boundaries. `ApiKey` and `ParseHttpsResponse` give every tool, and every human reader, unambiguous split points without special-case logic.


All-caps acronyms create ambiguous word boundaries. When you scan `parseHTTPSResponse`, your brain has to figure out where `HTTPS` ends and `Response` begins. With `ParseHttpsResponse`, the boundary is unambiguous.

This is not a preference argument. Automated tools break on all-caps acronyms in predictable ways:

- **Case converters** produce wrong output. `APIKey` split naively on uppercase transitions gives `A`, `P`, `I`, `Key` -- four tokens instead of two. `ApiKey` splits cleanly to `api`, `key`.
- **ORM column mappers** that convert [camelCase to snake_case output](/blog/the-impact-of-variable-naming-conventions-on-code-quality-ca/) `a_p_i_key` for `APIKey` and `api_key` for `ApiKey`. One is correct.
- **Code generators** from OpenAPI specs that encounter `APIKey` in a schema field name often produce inconsistent output across language targets.

Try this in Python with a naive splitter:

```python
import re

def to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

print(to_snake("APIKey"))      # a_p_i_key  -- wrong
print(to_snake("ApiKey"))      # api_key    -- correct
print(to_snake("parseHTTPSResponse"))  # parse_h_t_t_p_s_response -- wrong
print(to_snake("ParseHttpsResponse"))  # parse_https_response      -- correct
```

The regex is the same one used by [ActiveRecord's `underscore` method](https://api.rubyonrails.org/classes/String.html#method-i-underscore) and dozens of similar utilities. `APIKey` is the input that breaks it.

---

## What do the actual style guides say?

Every major style guide that addresses this explicitly recommends treating acronyms as words. Microsoft .NET uses title case for three-plus letter acronyms (`HttpClient`, `XmlDocument`), Google Java follows the same pattern, and Go's `golint` enforces all-caps but is the deliberate outlier. No mainstream guide defends `APIKey` in PascalCase.


Every guide that has addressed this explicitly recommends treating acronyms as words.

**Microsoft .NET:** The [capitalization conventions docs](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/capitalization-conventions) state that two-letter acronyms are both-caps (`IO`, `UI`), but acronyms of three or more letters use title case: `Html`, `Xml`, `Http`. So `HttpClient`, not `HTTPClient`. The BCL has followed this since .NET 2.0.

**Google Java Style Guide:** [Section 5.3](https://google.github.io/styleguide/javaguide.html#s5.3-camel-case) defines a deterministic algorithm: treat the input as prose, lowercase everything except the first letter of each word, then apply camelCase. `"XML HTTP request"` becomes `xmlHttpRequest`. No special treatment for acronyms.

**Swift API Design Guidelines:** [Naming section](https://www.swift.org/documentation/api-design-guidelines/#general-conventions) says to follow camelCase and treat abbreviations as words. The standard library uses `URL` as a type name (standalone, not embedded) but `urlRequest`, `urlSession` when embedded in identifiers.

**Go:** Go is the notable exception. The [Go commentary conventions](https://go.dev/doc/effective_go#commentary) and community norm favor `APIKey`, `HTTPClient`, `URL`. Go linters like `golint` will warn you if you write `ApiKey`. This is a deliberate, documented choice for that ecosystem -- not a counterexample to the general rule, just a different tradeoff.

---

## What about two-letter acronyms like `IO` or `ID`?

Two-letter acronyms stay all-caps when standalone or leading, and drop to title case mid-identifier. So `IOStream` and `UIView` are correct, but `CustomerId` beats `CustomerID`. The .NET capitalization conventions make this explicit, and the rule is consistent enough to apply across most non-Go codebases without ambiguity.


Keep them all-caps when they stand alone or sit at the start of an identifier. Lowercase them when they appear mid-word.

The .NET rule is explicit here: two-letter acronyms stay all-caps (`IOStream`, `UIView`). Three or more letters get title-cased.

```csharp
// Two-letter: both caps
IOStream
UIViewController
DBContext

// Three or more: title case
HttpClient
XmlDocument
ApiKey
HtmlParser
```

For `ID` specifically, the convention varies by language. In .NET you write `CustomerId` (title-case when embedded). In Go you write `CustomerID`. Pick one and automate the check.

---

## Does it matter for snake_case or SCREAMING_SNAKE_CASE?

No. Underscores make word boundaries explicit, so the acronym debate is irrelevant. `api_key` and `http_client` are unambiguous by structure. `API_KEY` and `HTTP_CLIENT` work the same way. The all-caps-versus-title-case question only surfaces in camelCase and PascalCase, where boundaries depend entirely on letter casing.


No. Both formats sidestep the problem entirely.

`api_key`, `http_client`, `xml_parser` -- word boundaries are explicit via underscore. There is no ambiguity to resolve.

`API_KEY`, `HTTP_CLIENT` -- all-caps constants use underscores as separators, so the acronym vs word distinction disappears.

The acronym debate is purely a [camelCase and PascalCase problem](/blog/from-variables-to-functions-why-coders-prefer-camel-case-or-/).

---

## How do I enforce this in a codebase?

Use a linter, not code review. For TypeScript, pair `@typescript-eslint/naming-convention` with a custom regex that rejects consecutive uppercase letters beyond two. For Go, `golint` enforces its own all-caps convention automatically. For C#, Roslyn analyzers cover .NET naming rules. Pick the tool for your stack and block violations in CI.


Linters handle it. You do not want this to be a code review conversation.

**ESLint (TypeScript/JS):** The [`@typescript-eslint/naming-convention`](https://typescript-eslint.io/rules/naming-convention/) rule lets you [enforce camelCase for variables and PascalCase for types](/blog/the-relationship-between-code-readability-and-the-use-of-cam/). It does not natively distinguish acronym style, but combined with a custom regex you can block all-caps sequences inside identifiers.

**golangci-lint:** Includes `golint`/`revive` which enforce Go's opposite convention -- all-caps acronyms. If you are in Go, follow Go.

**Checkstyle (Java):** The `AbbreviationAsWordInName` check enforces that abbreviations are treated as words. Set `allowedAbbreviationLength` to 1 to allow only single-letter caps sequences.

```xml
<module name="AbbreviationAsWordInName">
    <property name="allowedAbbreviationLength" value="1"/>
    <property name="ignoreFinal" value="false"/>
</module>
```

This will flag `APIKey`, `HTTPClient`, `XMLParser` and pass `ApiKey`, `HttpClient`, `XmlParser`.

---

## What's the practical rule to memorize?

Three rules cover almost everything. In Go, all-caps acronyms everywhere, follow `golint`. Outside Go, two-letter acronyms are both-caps when standalone or leading (`IOStream`), title-cased when trailing (`CustomerId`). Three-plus letter acronyms are always title-cased outside Go: `ApiKey`, `HttpClient`, `XmlDocument`. Proper nouns like `OAuth` and `iOS` are exceptions, not rules.


Three rules cover 95% of cases:

1. **Go:** All-caps acronyms everywhere. Follow `golint`.
2. **Two-letter acronyms elsewhere:** Both caps when standalone or leading (`IOStream`, `UIView`). Title-case when trailing (`CustomerId`).
3. **Three-plus letter acronyms outside Go:** Title-case always. `ApiKey`, `HttpClient`, `XmlDocument`.

The edge cases -- `OAuth`, `GraphQL`, `iOS` -- are proper nouns with their own capitalization. Preserve them as-is regardless of position.

When in doubt, run your identifier through a case converter and check whether the round-trip is lossless. If `ApiKey` converts to `api_key` and back to `ApiKey` cleanly, you are good. If `APIKey` converts to `a_p_i_key`, you have a problem that will surface in serialization, code generation, or database column names at the worst possible time.

## Frequently asked questions

### Should acronyms in identifiers be written in all caps or title case?
It depends on your team's style guide and language conventions. All-caps acronyms like `APIKey` preserve the acronym's original form and aid instant recognition, but they can disrupt readability in camelCase or PascalCase names. Title-case acronyms like `ApiKey` treat the abbreviation as a regular word, producing smoother, more consistent identifier casing. Most modern style guides, including Google's and Microsoft's, recommend title case for acronyms in identifiers.

### What is the difference between APIKey and ApiKey in code?
`APIKey` uses all-caps for the acronym, while `ApiKey` applies standard PascalCase rules treating "Api" as a capitalized word. Both refer to the same concept, but they reflect different naming conventions. `APIKey` can cause parsing ambiguity in tools that split identifiers by case transitions, whereas `ApiKey` splits cleanly into "Api" and "Key," making it friendlier for code generators, documentation tools, and text case converters.

### Which naming convention do popular languages recommend for acronyms in identifiers?
Most modern languages lean toward title-casing acronyms rather than using all caps. Microsoft's .NET guidelines explicitly recommend `ApiKey` over `APIKey`, and Go's standard library follows the same pattern. Java and JavaScript communities are more divided, but readability-focused linters increasingly favor title case. Older codebases and C-based languages often retain all-caps acronyms as a historical convention rather than a deliberate modern choice.

### Why do acronyms in variable names cause readability problems?
All-caps acronyms create visual noise and break the rhythm of camelCase or PascalCase identifiers. A name like `parseHTTPSURLRequest` forces the reader to mentally locate word boundaries, while `parseHttpsUrlRequest` flows more naturally. Readability tools, IDE refactoring features, and text case converters also handle title-cased acronyms more reliably, since all-caps sequences are harder to tokenize consistently without additional rules.

### How can I convert identifier casing that includes acronyms automatically?
Online tools like flipmycase.com can help you reformat identifiers between camelCase, PascalCase, snake_case, and other conventions. When converting names containing acronyms, decide first whether acronyms should be treated as single words (title case) or preserved in caps. Consistent conversion is easiest when acronyms follow standard word-casing rules, so tools can split and rejoin tokens predictably. Standardizing your convention before bulk conversion prevents mismatches across a codebase.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Should acronyms in identifiers be written in all caps or title case?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your team's style guide and language conventions. All-caps acronyms like `APIKey` preserve the acronym's original form and aid instant recognition, but they can disrupt readability in camelCase or PascalCase names. Title-case acronyms like `ApiKey` treat the abbreviation as a regular word, producing smoother, more consistent identifier casing. Most modern style guides, including Google's and Microsoft's, recommend title case for acronyms in identifiers."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between APIKey and ApiKey in code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "`APIKey` uses all-caps for the acronym, while `ApiKey` applies standard PascalCase rules treating \"Api\" as a capitalized word. Both refer to the same concept, but they reflect different naming conventions. `APIKey` can cause parsing ambiguity in tools that split identifiers by case transitions, whereas `ApiKey` splits cleanly into \"Api\" and \"Key,\" making it friendlier for code generators, documentation tools, and text case converters."
      }
    },
    {
      "@type": "Question",
      "name": "Which naming convention do popular languages recommend for acronyms in identifiers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most modern languages lean toward title-casing acronyms rather than using all caps. Microsoft's .NET guidelines explicitly recommend `ApiKey` over `APIKey`, and Go's standard library follows the same pattern. Java and JavaScript communities are more divided, but readability-focused linters increasingly favor title case. Older codebases and C-based languages often retain all-caps acronyms as a historical convention rather than a deliberate modern choice."
      }
    },
    {
      "@type": "Question",
      "name": "Why do acronyms in variable names cause readability problems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All-caps acronyms create visual noise and break the rhythm of camelCase or PascalCase identifiers. A name like `parseHTTPSURLRequest` forces the reader to mentally locate word boundaries, while `parseHttpsUrlRequest` flows more naturally. Readability tools, IDE refactoring features, and text case converters also handle title-cased acronyms more reliably, since all-caps sequences are harder to tokenize consistently without additional rules."
      }
    },
    {
      "@type": "Question",
      "name": "How can I convert identifier casing that includes acronyms automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Online tools like flipmycase.com can help you reformat identifiers between camelCase, PascalCase, snake_case, and other conventions. When converting names containing acronyms, decide first whether acronyms should be treated as single words (title case) or preserved in caps. Consistent conversion is easiest when acronyms follow standard word-casing rules, so tools can split and rejoin tokens predictably. Standardizing your convention before bulk conversion prevents mismatches across a codebase."
      }
    }
  ]
}
</script>
