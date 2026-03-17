---
title: "UUID Generator — How to Generate UUIDs (v4) Online and in Code"
description: "Generate random UUIDs (v4) instantly. Free online tool plus code examples in JavaScript, Python, and Go. Learn when to use UUIDs vs auto-increment IDs."
date: "2026-03-16"
keywords: ["uuid generator", "generate uuid online", "uuid v4 generator", "random uuid", "guid generator", "unique identifier generator", "uuid javascript python"]
toolSlug: "uuid-generator"
faq:
  - question: "What is a UUID?"
    answer: "A UUID (Universally Unique Identifier) is a 128-bit identifier formatted as 32 hex digits in five groups separated by hyphens (e.g., 550e8400-e29b-41d4-a716-446655440000). Version 4 UUIDs are randomly generated and have a near-zero collision probability."
  - question: "What is the difference between UUID and GUID?"
    answer: "They are the same thing. UUID is the standard term (RFC 4122). GUID (Globally Unique Identifier) is Microsoft's name for the same format. Both produce 128-bit identifiers in the same hyphenated hex format."
  - question: "When should I use UUIDs instead of auto-increment IDs?"
    answer: "Use UUIDs when you need IDs generated without a central database (distributed systems), when sequential IDs would expose business data (order counts), or when merging data from multiple sources that might have conflicting auto-increment values."
  - question: "Can two UUIDs ever be the same?"
    answer: "Theoretically yes, but the probability is astronomically low. You would need to generate 2.7 quintillion v4 UUIDs to have a 50% chance of a single collision. In practice, UUID collisions do not happen."
related: ["password-generator-guide", "hash-generator-guide", "string-encoder-guide"]
---

# UUID Generator — How to Generate UUIDs Online and in Code

Every database record, API resource, and distributed system event needs a unique identifier. Auto-incrementing integers work for simple cases, but they break in distributed systems, expose business data (your competitor can estimate your order volume), and cause conflicts when merging databases. UUIDs solve all of these problems by generating identifiers that are unique across space and time without any central coordination.

This guide covers what UUIDs are, how they work, how to generate them in code, and when to use UUIDs instead of sequential IDs.

## What Is a UUID?

A UUID (Universally Unique Identifier) is a 128-bit value displayed as 32 hexadecimal digits in five groups separated by hyphens: `550e8400-e29b-41d4-a716-446655440000`. The most common version, UUID v4, generates identifiers using cryptographic randomness. The probability of generating two identical v4 UUIDs is so low (1 in 2^122) that collisions are considered impossible in practice.

You would use UUIDs as primary keys in databases, resource identifiers in REST APIs, correlation IDs for distributed tracing, session identifiers, file names for uploaded content, and idempotency keys for payment processing. They are the standard identifier format for any system that needs unique IDs without a centralized sequence generator.

## How to Generate UUIDs with FlipMyCase

1. Open the [FlipMyCase UUID Generator](/uuid-generator).
2. Click to generate a new UUID v4.
3. Copy the UUID and use it as a database key, API identifier, or configuration value.
4. Generate multiple UUIDs in bulk if needed.

The generator uses `crypto.getRandomValues()` in your browser for cryptographic randomness. No UUIDs are stored or transmitted. For generating secure passwords alongside your UUIDs, use the [Password Generator](/password-generator).

## Code Examples for UUID Generation

### JavaScript

```javascript
// Built-in crypto.randomUUID() (modern browsers and Node 19+)
const uuid = crypto.randomUUID();
console.log(uuid);  // e.g., "3b241101-e2bb-4d7a-8613-e0f5b3f9c7a0"

// Manual v4 UUID implementation
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
console.log(uuidv4());  // e.g., "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"

// Generate multiple UUIDs
const uuids = Array.from({ length: 5 }, () => crypto.randomUUID());
console.log(uuids);

// Validate UUID format
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
console.log(UUID_REGEX.test('3b241101-e2bb-4d7a-8613-e0f5b3f9c7a0'));  // true
```

### Python

```python
import uuid

# Generate a random UUID v4
new_uuid = uuid.uuid4()
print(new_uuid)  # e.g., 3b241101-e2bb-4d7a-8613-e0f5b3f9c7a0
print(str(new_uuid))  # String representation

# Generate multiple UUIDs
uuids = [str(uuid.uuid4()) for _ in range(5)]
for u in uuids:
    print(u)

# UUID from string (parsing)
parsed = uuid.UUID('3b241101-e2bb-4d7a-8613-e0f5b3f9c7a0')
print(parsed.version)  # 4
print(parsed.hex)       # 3b241101e2bb4d7a8613e0f5b3f9c7a0

# Different UUID versions
print(uuid.uuid1())  # v1: timestamp + MAC address
print(uuid.uuid4())  # v4: random
print(uuid.uuid5(uuid.NAMESPACE_DNS, 'example.com'))  # v5: SHA-1 hash

# Validate UUID format
def is_valid_uuid(val):
    try:
        uuid.UUID(str(val))
        return True
    except ValueError:
        return False

print(is_valid_uuid('3b241101-e2bb-4d7a-8613-e0f5b3f9c7a0'))  # True
print(is_valid_uuid('not-a-uuid'))  # False
```

### Go

```go
package main

import (
    "crypto/rand"
    "fmt"
)

func newUUID() string {
    b := make([]byte, 16)
    rand.Read(b)
    b[6] = (b[6] & 0x0f) | 0x40 // Version 4
    b[8] = (b[8] & 0x3f) | 0x80 // Variant 10
    return fmt.Sprintf("%08x-%04x-%04x-%04x-%012x",
        b[0:4], b[4:6], b[6:8], b[8:10], b[10:16])
}

func main() {
    for i := 0; i < 5; i++ {
        fmt.Println(newUUID())
    }
}

// For production, use: go get github.com/google/uuid
// import "github.com/google/uuid"
// id := uuid.New()
```

## Real-World Use Cases

**Database primary keys.** Using UUIDs as primary keys lets you generate IDs on the client side without querying the database first. This simplifies distributed systems, enables offline-first applications, and allows data merging from multiple sources. The tradeoff is larger key size (16 bytes vs 4-8 bytes for integers) and less index-friendly ordering.

**API resource identifiers.** REST APIs expose resource IDs in URLs like `/users/3b241101-e2bb-4d7a-8613-e0f5b3f9c7a0`. UUIDs prevent enumeration attacks — an attacker cannot guess the next user ID by incrementing a number. Generate them with the [UUID Generator](/uuid-generator) during development and testing.

**Distributed event tracking.** Microservices architectures need correlation IDs to trace requests across services. A UUID generated at the entry point travels through every service, making it possible to reconstruct the full request path in logs. Each service logs the correlation UUID alongside its own processing details.

**Idempotency keys for payments.** Payment APIs (Stripe, PayPal) use idempotency keys to prevent duplicate charges. Generate a UUID before each payment request. If the request fails and is retried, the same UUID ensures the payment is only processed once.

## Common Mistakes and Gotchas

Using `Math.random()` instead of `crypto.getRandomValues()` for UUID generation is a security issue. `Math.random()` is not cryptographically secure and its output is predictable. Always use the crypto API for any identifier that needs to be unguessable.

UUIDs as database primary keys have performance implications. Their randomness means insertions scatter across the B-tree index instead of appending sequentially, which causes more page splits and slower writes. UUID v7 (time-ordered) solves this by making UUIDs sortable by creation time while maintaining uniqueness.

Storing UUIDs as strings (36 characters) wastes space. Store them as binary(16) in databases that support it (MySQL, PostgreSQL's `uuid` type). This halves storage and improves index performance.

Comparing UUIDs is case-insensitive — `3B241101-E2BB-4D7A-8613-E0F5B3F9C7A0` and `3b241101-e2bb-4d7a-8613-e0f5b3f9c7a0` are the same UUID. Normalize to lowercase before string comparison, or use native UUID types that handle this automatically.

## Frequently Asked Questions

**What is the difference between UUID v1 and v4?**
UUID v1 embeds a timestamp and the device's MAC address, making it sortable by creation time but potentially leaking hardware information. UUID v4 is purely random with no embedded data. Use v4 for most applications. Use v7 (newer) if you need both randomness and time-ordering.

**Can I use UUIDs in URLs?**
Yes. UUIDs are URL-safe (only hex characters and hyphens). They are commonly used in REST API paths: `/api/orders/550e8400-e29b-41d4-a716-446655440000`. Some APIs use UUIDs without hyphens for shorter URLs.

**How many UUIDs can I generate before a collision?**
UUID v4 has 122 random bits, giving 5.3 x 10^36 possible values. You would need to generate 2.7 x 10^18 (2.7 quintillion) UUIDs to have a 50% collision probability. In practical terms, collisions do not happen.

## Conclusion

UUIDs are the standard solution for generating unique identifiers in distributed systems, APIs, and databases. They eliminate the need for centralized sequence generators and prevent enumeration attacks on resource IDs.

The [FlipMyCase UUID Generator](/uuid-generator) creates cryptographically random v4 UUIDs instantly in your browser. For programmatic generation, JavaScript's `crypto.randomUUID()`, Python's `uuid.uuid4()`, and Go's `crypto/rand` package provide the same functionality. For related tasks, use the [Password Generator](/password-generator) for secure credentials and the [Hash Generator](/hash-generator) for deterministic identifiers from input data.
