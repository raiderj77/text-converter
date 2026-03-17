---
title: "JWT Decoder — How to Decode and Inspect JSON Web Tokens Online"
description: "Decode JWT tokens to inspect headers, payloads, and claims. Free online tool for debugging authentication, checking expiration, and verifying token structure."
date: "2026-03-16"
keywords: ["jwt decoder", "decode jwt online", "json web token decoder", "jwt debugger", "jwt inspector", "jwt claims viewer", "jwt token parser"]
toolSlug: "jwt-decoder"
faq:
  - question: "What is a JWT token?"
    answer: "A JSON Web Token (JWT) is a compact, URL-safe string used for authentication and data exchange. It has three Base64-encoded parts separated by dots: a header (algorithm), a payload (claims like user ID and expiration), and a signature."
  - question: "Is it safe to paste JWTs into an online decoder?"
    answer: "Yes, when using the FlipMyCase JWT Decoder. All decoding happens in your browser — no tokens are sent to any server. However, never share JWTs publicly since they may contain sensitive claims."
  - question: "How do I check if a JWT is expired?"
    answer: "Decode the token and look at the 'exp' claim in the payload. It contains a Unix timestamp. Compare it to the current time — if the current time is past the exp value, the token is expired."
  - question: "Can the decoder verify JWT signatures?"
    answer: "The FlipMyCase decoder inspects the token structure and claims but does not verify signatures, since that requires the signing secret or public key. For signature verification, use your server-side JWT library."
related: ["string-encoder-guide", "hash-generator-guide", "json-formatter-guide"]
---

# JWT Decoder — How to Decode and Inspect JSON Web Tokens Online

JSON Web Tokens are everywhere in modern authentication. Every time you log into a web application, call an authenticated API, or use single sign-on, there is likely a JWT involved. But when authentication breaks — a 401 error, an expired session, a missing claim — you need to inspect the token to understand what went wrong. Decoding a JWT reveals the algorithm, the payload claims (user ID, roles, expiration), and the structure that your server validates.

This guide covers what JWTs are, how to decode and inspect them, how to work with tokens programmatically, and the security considerations you must understand.

## What Is a JSON Web Token?

A JWT is a compact, URL-safe string consisting of three Base64URL-encoded parts separated by dots: `header.payload.signature`. The header specifies the signing algorithm (HS256, RS256). The payload contains claims — key-value pairs like `sub` (subject/user ID), `exp` (expiration timestamp), `iat` (issued at), and custom claims like roles or permissions. The signature ensures the token has not been tampered with.

You would decode a JWT when debugging authentication failures, verifying token expiration, checking that the correct claims are present, inspecting tokens during API development, or auditing the data being transmitted in authorization headers.

## How to Decode JWTs with FlipMyCase

1. Open the [FlipMyCase JWT Decoder](/jwt-decoder).
2. Paste your JWT token.
3. The tool instantly displays the decoded header, payload, and signature.
4. Check the `exp` claim to see if the token is expired — the tool converts the Unix timestamp to a readable date.

Everything runs in your browser. No tokens are transmitted to any server. For encoding Base64 strings manually, use the [String Encoder](/string-encoder).

## Code Examples for JWT Handling

### JavaScript

```javascript
// Decode a JWT without verification (inspect only)
function decodeJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');

  const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
  const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

  return { header, payload, signature: parts[2] };
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzEwMDAwMDAwLCJleHAiOjE3MTAwODY0MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const decoded = decodeJWT(token);
console.log('Algorithm:', decoded.header.alg);  // HS256
console.log('Subject:', decoded.payload.sub);    // 1234567890
console.log('Name:', decoded.payload.name);      // Alice

// Check expiration
const isExpired = decoded.payload.exp * 1000 < Date.now();
console.log('Expired:', isExpired);

// Verify with jsonwebtoken library (Node.js)
// const jwt = require('jsonwebtoken');
// const verified = jwt.verify(token, 'your-secret-key');
```

### Python

```python
import base64
import json
import time

def decode_jwt(token):
    parts = token.split('.')
    if len(parts) != 3:
        raise ValueError('Invalid JWT format')

    def decode_part(part):
        # Add padding if needed
        padding = 4 - len(part) % 4
        part += '=' * padding
        decoded = base64.urlsafe_b64decode(part)
        return json.loads(decoded)

    return {
        'header': decode_part(parts[0]),
        'payload': decode_part(parts[1]),
        'signature': parts[2]
    }

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzEwMDAwMDAwLCJleHAiOjE3MTAwODY0MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

decoded = decode_jwt(token)
print(f"Algorithm: {decoded['header']['alg']}")
print(f"Subject: {decoded['payload']['sub']}")

# Check expiration
exp = decoded['payload'].get('exp', 0)
is_expired = exp < time.time()
print(f"Expired: {is_expired}")
print(f"Expires: {time.ctime(exp)}")

# For verification, use PyJWT:
# import jwt
# decoded = jwt.decode(token, 'secret', algorithms=['HS256'])
```

### Go

```go
package main

import (
    "encoding/base64"
    "encoding/json"
    "fmt"
    "strings"
    "time"
)

func decodeJWT(token string) (map[string]interface{}, map[string]interface{}, error) {
    parts := strings.Split(token, ".")
    if len(parts) != 3 {
        return nil, nil, fmt.Errorf("invalid JWT format")
    }

    decodeSegment := func(seg string) (map[string]interface{}, error) {
        if m := len(seg) % 4; m != 0 {
            seg += strings.Repeat("=", 4-m)
        }
        decoded, err := base64.URLEncoding.DecodeString(seg)
        if err != nil {
            return nil, err
        }
        var result map[string]interface{}
        json.Unmarshal(decoded, &result)
        return result, nil
    }

    header, _ := decodeSegment(parts[0])
    payload, _ := decodeSegment(parts[1])
    return header, payload, nil
}

func main() {
    token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiZXhwIjoxNzEwMDg2NDAwfQ.signature"
    header, payload, _ := decodeJWT(token)
    fmt.Printf("Algorithm: %s\n", header["alg"])
    fmt.Printf("Subject: %s\n", payload["sub"])

    if exp, ok := payload["exp"].(float64); ok {
        fmt.Printf("Expired: %v\n", time.Now().Unix() > int64(exp))
    }
}
```

## Real-World Use Cases

**Debugging 401 authentication errors.** When an API returns 401 Unauthorized, the first step is decoding the JWT to check: Is the token expired? Is the `aud` (audience) claim correct? Does the `sub` claim match the expected user? Paste the token into the [JWT Decoder](/jwt-decoder) to answer these questions in seconds.

**Verifying OAuth token contents.** After implementing OAuth with providers like Google, GitHub, or Auth0, decode the ID token to verify it contains the expected claims (email, name, roles). This is essential during integration testing and debugging SSO flows.

**API development and testing.** When building authenticated APIs, decode tokens during development to verify your token generation logic produces correct headers, payloads, and expiration times. Compare tokens from different environments to debug configuration mismatches.

**Security auditing.** Review what data your application stores in JWTs. Tokens should not contain sensitive information like passwords or credit card numbers since the payload is only Base64-encoded, not encrypted. Anyone can decode it.

## Common Mistakes and Gotchas

The most critical mistake is confusing encoding with encryption. JWT payloads are Base64URL-encoded, not encrypted. Anyone with the token can decode and read the claims. Never store sensitive data (passwords, SSNs, payment info) in JWT payloads. Use the [String Encoder](/string-encoder) to verify — decoding the payload is trivial.

Token expiration bugs are extremely common. The `exp` claim is a Unix timestamp in seconds, not milliseconds. In JavaScript, `Date.now()` returns milliseconds, so compare with `exp * 1000 < Date.now()`. Getting this wrong means tokens appear valid when they are expired, or expire prematurely.

Not validating the algorithm on the server side is a security vulnerability. An attacker can change the header from `RS256` to `none` and submit an unsigned token. Always configure your JWT library to accept only the specific algorithm you expect.

Clock skew between servers causes intermittent auth failures. If the token issuer's clock is a few seconds ahead of the verifier, tokens appear expired immediately. Most JWT libraries accept a `clockTolerance` parameter (typically 30-60 seconds) to handle this.

## Frequently Asked Questions

**What is the difference between HS256 and RS256?**
HS256 uses a shared secret key for both signing and verification — both parties need the same secret. RS256 uses a private key for signing and a public key for verification. RS256 is more secure for distributed systems because the public key can be shared freely without compromising the signing key.

**How long should JWT tokens last?**
Access tokens should be short-lived: 15 minutes to 1 hour. Refresh tokens can last days to weeks. Short access token lifetimes limit damage if a token is compromised. Use the `exp` claim to enforce expiration and check it with the [JWT Decoder](/jwt-decoder).

**Can I edit a JWT and re-sign it?**
You can edit the payload, but the signature will be invalid unless you re-sign with the correct secret or private key. This is by design — the signature prevents token tampering. Editing and re-signing is only possible if you have the signing key.

## Conclusion

JWT decoding is an essential debugging skill for any developer working with authentication. Understanding the header, payload, and signature structure helps you diagnose auth failures, verify token contents, and audit security practices.

The [FlipMyCase JWT Decoder](/jwt-decoder) decodes tokens instantly in your browser with no data transmitted to any server. For programmatic JWT handling, the JavaScript, Python, and Go examples above cover decoding and expiration checking. Use the [Hash Generator](/hash-generator) for related HMAC operations and the [JSON Formatter](/json-formatter) to pretty-print decoded payloads.
