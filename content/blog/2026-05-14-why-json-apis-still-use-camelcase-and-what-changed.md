---
title: "Why JSON APIs still use camelCase and what changed"
date: "2026-05-14"
slug: "why-json-apis-still-use-camelcase-and-what-changed"
description: ""
status: published
---

# Why JSON APIs Still Use camelCase and What Changed

**Short answer:** JSON has no official naming convention. camelCase won by default because JavaScript's `JSON.parse()` maps directly to object properties, and JS objects use camelCase. Most backend languages then adopted it to avoid friction for the dominant API consumer. What changed: multi-language ecosystems, OpenAPI tooling, and GraphQL each pushed back in different ways.

---

## Why did camelCase become the default in the first place?

JSON was designed by Douglas Crockford as a subset of JavaScript object literal syntax. When you call `JSON.parse()`, the keys become JavaScript property names, and JavaScript convention is camelCase. Zero transformation needed.

The [ECMA-404 JSON standard](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/) says nothing about key naming. Neither does [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259). The convention came from the runtime, not the spec.

Early REST API design guides, including the [Google JSON Style Guide](https://google.github.io/styleguide/jsoncstyleguide.xml), codified camelCase explicitly. When Google publishes a style guide and runs some of the highest-traffic APIs in the world, the industry follows.

```json
// Google-style: camelCase keys
{
  "userId": 1042,
  "firstName": "Ada",
  "createdAt": "2024-01-15T08:30:00Z"
}
```

Frontend JavaScript consumed it without a single line of transformation. That frictionlessness compounded over years into a near-universal default.

---

## What does snake_case have going for it?

Snake_case maps directly to Python and Ruby object attributes, so deserialization requires no custom mapper. A Django REST Framework response lands as response.user_name, not response.userName. When your primary consumers write Python, forcing camelCase adds a translation layer that buys nothing and breaks the principle of least surprise.


Python and Ruby developers hate camelCase in JSON because their native conventions are snake_case. Automatic deserialization without a custom mapper produces awkward objects.

The [Python requests library](https://docs.python-requests.org/) and [Django REST Framework](https://www.django-rest-framework.org/) both default to snake_case in their documentation examples. When your API is consumed primarily by Python clients, you are forcing every consumer to run a transform layer.

```python
# Without transform: ugly
user["firstName"]  # not Pythonic

# With transform: extra boilerplate
import humps
data = humps.decamelize(response.json())
user["first_name"]  # now Pythonic
```

The [humps library](https://pypi.org/project/pyhumps/) exists specifically because this friction is real and widespread. It has over 1.5 million monthly downloads on PyPI. That number is a proxy for how many projects are absorbing camelCase-to-snake_case conversion costs.

---

## Did REST ever standardize anything?

No. Roy Fielding's [REST dissertation](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) says nothing about JSON key naming. REST is an architectural style, not a wire format spec.

The closest thing to standardization came from competing style guides. [Microsoft's REST API guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md) recommend camelCase. The [JSON:API specification](https://jsonapi.org/recommendations/) recommends using the member naming rules of the underlying language, which punts the decision back to you.

Stripe, Twilio, and GitHub all shipped camelCase APIs and became reference implementations by volume of developer usage. When you learn API design by reading their docs, you absorb their conventions.

---

## What did OpenAPI change?

OpenAPI (formerly Swagger) made naming conventions visible and enforceable at the schema level. Before tooling, a key name was just a string. After OpenAPI, it becomes a typed schema property that generates code in multiple languages.

When you generate a TypeScript client from an OpenAPI spec, camelCase maps cleanly. When you generate a Python client using [openapi-generator](https://openapi-generator.tech/), the tool has to decide whether to emit `user_id` or `userId` as the Python attribute name. The generator handles this, but the decision bakes into your SDK and your docs simultaneously.

```yaml
# OpenAPI schema property
properties:
  userId:
    type: integer
  firstName:
    type: string
```

The [openapi-generator project](https://github.com/OpenAPITools/openapi-generator) supports over 50 client generators. Each one has language-specific naming logic. This forced API teams to think about [naming conventions as a cross-language contract](/blog/camelcase-and-snakecase-a-comparative-analysis-of-readabilit/), not just a JavaScript convenience.

---

## What did GraphQL change?

GraphQL pushed camelCase harder than REST ever did. The [GraphQL specification](https://spec.graphql.org/October2021/#sec-Names) defines that field names are case-sensitive and by strong convention uses camelCase for fields and PascalCase for types. Every major GraphQL client, including [Apollo Client](https://www.apollographql.com/docs/react/) and [urql](https://formidable.com/open-source/urql/), assumes camelCase in its normalization cache.

```graphql
type User {
  userId: ID!
  firstName: String
  createdAt: String
}
```

If your GraphQL schema uses snake_case, you break cache normalization assumptions in Apollo and you fight the tooling on every code generation run. The convention became load-bearing infrastructure, not just style preference.

---

## Are there cases where snake_case won in JSON APIs?

Yes, APIs built for polyglot or Python-heavy ecosystems defaulted to snake_case. Twitter v1 and Slack both shipped snake_case throughout, reflecting an era when Python and Ruby scripting was as common as JavaScript. The deciding factor was the dominant language of the expected consumer, not any technical constraint in JSON itself.


Yes, and the pattern is consistent: APIs designed primarily for non-JavaScript consumers.

The [Twitter v1 API](https://developer.twitter.com/en/docs/twitter-api/v1) used snake_case throughout. So does [Slack's API](https://api.slack.com/methods). Both were designed at a time when Python and Ruby scripting against APIs was as common as JavaScript. The [Instagram Graph API](https://developers.facebook.com/docs/instagram-api/) migrated from snake_case to camelCase when it moved onto the Facebook Graph API platform, which is a concrete example of tooling pressure overriding legacy convention.

```json
// Slack API response: snake_case
{
  "ok": true,
  "channel": "C024BE91L",
  "ts": "1401383885.000061",
  "message": {
    "user": "U2147483697",
    "text": "Hello world"
  }
}
```

Slack has not changed this. It works fine. The ecosystem adapted.

---

## What should you actually do in 2024?

Pick camelCase if your primary consumers are JavaScript or TypeScript. Pick snake_case if your primary consumers are Python or Ruby. Document the choice in your OpenAPI spec and let code generators handle the transform at the edges.

The real mistake is mixing conventions within a single API. A response with `user_id`, `firstName`, and `created-at` in the same object is the failure mode worth avoiding. Use a linter. [Spectral](https://stoplight.io/open-source/spectral) enforces naming conventions on OpenAPI specs and runs in CI with about 10 lines of config.

The JSON spec never cared. Your consumers always did.

## Frequently asked questions

### Why do JSON APIs use camelCase instead of snake_case?
JSON APIs favor camelCase because JavaScript — the language most commonly consuming these APIs — natively uses camelCase for object properties. When a browser receives JSON data, developers can reference properties like `userId` or `firstName` without any transformation. Since JavaScript became the dominant client-side language, API designers standardized around camelCase to reduce friction and avoid mismatches between the data format and the consuming code.

### Did JSON always use camelCase, or did naming conventions change over time?
JSON naming conventions evolved over time rather than starting with a clear standard. Early APIs varied wildly, mixing snake_case, PascalCase, and camelCase inconsistently. As REST APIs matured and JavaScript frameworks like Angular and React dominated frontend development, camelCase became the de facto standard. However, backend languages like Python and Ruby prefer snake_case, which eventually pushed many teams toward automatic case conversion at API boundaries.

### Why do some APIs return snake_case JSON even today?
Some APIs still return snake_case because their backends are built in Python, Ruby, or PHP, where snake_case is the idiomatic convention. Frameworks like Django REST Framework and Rails default to snake_case serialization. Rather than forcing backend developers to rename every field, teams accept the mismatch and handle conversion on the client side, often using utility libraries or middleware that automatically transform incoming keys.

### What is the best way to convert JSON keys between camelCase and snake_case?
The most reliable approach is automated conversion at the API boundary using a dedicated library or tool. JavaScript libraries like `camelcase-keys` and `snakecase-keys` transform entire JSON objects recursively in one call. Online tools like flipmycase.com let developers quickly preview and convert key names manually during debugging or API design. Automating conversion prevents human error and keeps both backend and frontend code idiomatic without constant manual renaming.

### Does camelCase in JSON affect API performance or compatibility?
Camelcase itself has no measurable impact on API performance — the difference in payload size between `user_name` and `userName` is negligible. Compatibility matters more: using inconsistent casing across endpoints forces developers to remember exceptions, increasing bugs and onboarding time. The real cost is cognitive overhead. Consistent naming conventions, whether camelCase or snake_case, reduce errors and make APIs easier to document, test, and consume across different teams and programming languages.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why do JSON APIs use camelCase instead of snake_case?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON APIs favor camelCase because JavaScript \u2014 the language most commonly consuming these APIs \u2014 natively uses camelCase for object properties. When a browser receives JSON data, developers can reference properties like `userId` or `firstName` without any transformation. Since JavaScript became the dominant client-side language, API designers standardized around camelCase to reduce friction and avoid mismatches between the data format and the consuming code."
      }
    },
    {
      "@type": "Question",
      "name": "Did JSON always use camelCase, or did naming conventions change over time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JSON naming conventions evolved over time rather than starting with a clear standard. Early APIs varied wildly, mixing snake_case, PascalCase, and camelCase inconsistently. As REST APIs matured and JavaScript frameworks like Angular and React dominated frontend development, camelCase became the de facto standard. However, backend languages like Python and Ruby prefer snake_case, which eventually pushed many teams toward automatic case conversion at API boundaries."
      }
    },
    {
      "@type": "Question",
      "name": "Why do some APIs return snake_case JSON even today?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some APIs still return snake_case because their backends are built in Python, Ruby, or PHP, where snake_case is the idiomatic convention. Frameworks like Django REST Framework and Rails default to snake_case serialization. Rather than forcing backend developers to rename every field, teams accept the mismatch and handle conversion on the client side, often using utility libraries or middleware that automatically transform incoming keys."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best way to convert JSON keys between camelCase and snake_case?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most reliable approach is automated conversion at the API boundary using a dedicated library or tool. JavaScript libraries like `camelcase-keys` and `snakecase-keys` transform entire JSON objects recursively in one call. Online tools like flipmycase.com let developers quickly preview and convert key names manually during debugging or API design. Automating conversion prevents human error and keeps both backend and frontend code idiomatic without constant manual renaming."
      }
    },
    {
      "@type": "Question",
      "name": "Does camelCase in JSON affect API performance or compatibility?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Camelcase itself has no measurable impact on API performance \u2014 the difference in payload size between `user_name` and `userName` is negligible. Compatibility matters more: using inconsistent casing across endpoints forces developers to remember exceptions, increasing bugs and onboarding time. The real cost is cognitive overhead. Consistent naming conventions, whether camelCase or snake_case, reduce errors and make APIs easier to document, test, and consume across different teams and programming languages."
      }
    }
  ]
}
</script>
