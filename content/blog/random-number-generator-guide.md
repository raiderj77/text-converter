---
title: "Random Number Generator — How to Generate Random Numbers Online"
description: "Generate random numbers, integers, decimals, and sequences instantly. Free online tool with custom ranges, multiple outputs, and cryptographic randomness. No signup."
date: "2026-03-16"
keywords: ["random number generator", "generate random number", "random number online", "random integer generator", "random number picker", "rng tool", "random number between"]
toolSlug: "random-number-generator"
faq:
  - question: "How do I generate a random number?"
    answer: "Open the FlipMyCase Random Number Generator, set your minimum and maximum values, and click generate. The tool produces a cryptographically random number within your range. Generate single numbers or batches of hundreds at once."
  - question: "Are the numbers truly random?"
    answer: "Yes. The tool uses your browser's crypto.getRandomValues() API, which is a cryptographically secure random number generator. The output is unpredictable and suitable for security-sensitive applications like lottery draws and token generation."
  - question: "Can I generate random decimals?"
    answer: "Yes. Set the decimal places option to generate numbers like 3.14 or 0.8472. You can control precision from 0 (integers only) to any number of decimal places."
  - question: "Can I generate multiple random numbers at once?"
    answer: "Yes. Set the quantity to generate a batch of random numbers — useful for test data, statistical sampling, lottery picks, and simulation inputs. All numbers are generated independently with no duplicates if you enable unique mode."
related: ["password-generator-guide", "uuid-generator-guide", "number-base-converter-guide"]
---

# Random Number Generator — How to Generate Random Numbers Online

Random numbers are one of the most fundamental building blocks in computing. They power lottery draws, A/B tests, game mechanics, statistical simulations, test data generation, cryptographic tokens, and scientific experiments. Yet generating truly random numbers — not just pseudo-random sequences — requires more than `Math.random()`. Understanding the difference between pseudo-random and cryptographic random, and knowing when each is appropriate, is essential for any developer.

This guide covers how random number generation works, the difference between PRNG and CSPRNG, how to generate random numbers in code, and the scenarios that demand each type.

## What Is a Random Number Generator?

A random number generator (RNG) produces numbers that cannot be predicted from previous output. There are two types: pseudo-random number generators (PRNGs) that use mathematical formulas to produce sequences that appear random, and cryptographically secure random number generators (CSPRNGs) that use hardware entropy sources (mouse movements, disk timing, thermal noise) to produce truly unpredictable output.

You would use random numbers for generating test data, selecting random samples from datasets, shuffling lists and arrays, creating game mechanics (dice rolls, card draws), running Monte Carlo simulations, picking lottery or raffle winners, and generating security tokens.

## How to Generate Random Numbers with FlipMyCase

1. Open the [FlipMyCase Random Number Generator](/random-number-generator).
2. Set the minimum and maximum values for your range.
3. Choose integer or decimal output and set the quantity.
4. Click generate for cryptographically random numbers.
5. Copy individual numbers or the entire batch.

The generator uses `crypto.getRandomValues()` for true randomness. For generating random passwords instead of numbers, use the [Password Generator](/password-generator).

## Code Examples for Random Number Generation

### JavaScript

```javascript
// Cryptographically secure random integer in range [min, max]
function randomInt(min, max) {
  const range = max - min + 1;
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return min + (array[0] % range);
}

console.log(randomInt(1, 100));   // e.g., 42
console.log(randomInt(1, 6));     // Dice roll: 1-6
console.log(randomInt(0, 1));     // Coin flip: 0 or 1

// Generate batch of unique random numbers
function randomUniqueInts(min, max, count) {
  const set = new Set();
  while (set.size < count) {
    set.add(randomInt(min, max));
  }
  return [...set];
}
console.log(randomUniqueInts(1, 50, 6));  // e.g., lottery picks

// Random decimal in range
function randomDecimal(min, max, precision = 2) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const value = min + (array[0] / 0xFFFFFFFF) * (max - min);
  return parseFloat(value.toFixed(precision));
}
console.log(randomDecimal(0, 1, 4));      // e.g., 0.7283
console.log(randomDecimal(1.5, 9.5, 2));  // e.g., 4.73

// Shuffle an array (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
console.log(shuffle([1, 2, 3, 4, 5]));  // e.g., [3, 1, 5, 2, 4]
```

### Python

```python
import secrets
import random

# Cryptographically secure random integer
print(secrets.randbelow(100))      # 0 to 99
print(secrets.randbelow(6) + 1)    # Dice roll: 1-6

# Random integer in range (crypto-secure)
def secure_randint(min_val, max_val):
    return min_val + secrets.randbelow(max_val - min_val + 1)

print(secure_randint(1, 100))  # e.g., 42

# Batch generation
numbers = [secure_randint(1, 1000) for _ in range(10)]
print(numbers)

# Unique random numbers (lottery picks)
def unique_randoms(min_val, max_val, count):
    return random.sample(range(min_val, max_val + 1), count)

print(unique_randoms(1, 50, 6))  # e.g., [7, 23, 41, 3, 38, 15]

# Random decimal
import secrets
def secure_random_float(min_val, max_val, precision=2):
    value = min_val + (secrets.randbelow(10**10) / 10**10) * (max_val - min_val)
    return round(value, precision)

print(secure_random_float(0, 1, 4))  # e.g., 0.7283

# Weighted random choice
options = ['red', 'blue', 'green']
weights = [0.5, 0.3, 0.2]
print(random.choices(options, weights=weights, k=5))

# Shuffle a list
items = [1, 2, 3, 4, 5]
random.shuffle(items)
print(items)  # e.g., [3, 1, 5, 2, 4]
```

### Go

```go
package main

import (
    "crypto/rand"
    "fmt"
    "math/big"
)

func secureRandInt(min, max int64) int64 {
    diff := max - min + 1
    n, _ := rand.Int(rand.Reader, big.NewInt(diff))
    return min + n.Int64()
}

func main() {
    // Single random number
    fmt.Println("Random 1-100:", secureRandInt(1, 100))
    fmt.Println("Dice roll:   ", secureRandInt(1, 6))

    // Batch generation
    fmt.Print("Batch of 10: ")
    for i := 0; i < 10; i++ {
        fmt.Printf("%d ", secureRandInt(1, 1000))
    }
    fmt.Println()

    // Lottery picks (6 unique from 1-50)
    picks := make(map[int64]bool)
    for len(picks) < 6 {
        picks[secureRandInt(1, 50)] = true
    }
    fmt.Print("Lottery: ")
    for n := range picks {
        fmt.Printf("%d ", n)
    }
    fmt.Println()
}
```

## Real-World Use Cases

**Test data generation.** Automated tests need randomized inputs to cover edge cases. Generate random IDs, prices, quantities, and dates to populate test databases. The [Random Number Generator](/random-number-generator) produces quick test values; for full datasets, use the code examples above.

**Statistical sampling.** Selecting random records from a database for quality auditing, user surveys, or A/B test assignment requires unbiased random number generation. Use cryptographic randomness to ensure selection is truly unbiased.

**Game development.** Dice rolls, card shuffles, loot drops, and procedural generation all depend on random numbers. Use the Fisher-Yates shuffle algorithm for fair card dealing and uniform random integers for dice simulation.

**Lottery and raffle draws.** Fair draws require cryptographic randomness — `Math.random()` is not sufficient because its output is predictable if the seed is known. The [Random Number Generator](/random-number-generator) uses `crypto.getRandomValues()` which is suitable for fair draws.

## Common Mistakes and Gotchas

`Math.random()` is not cryptographically secure. Its output is generated by a deterministic algorithm with a seed — if an attacker learns the seed, they can predict all future values. Never use it for security tokens, lottery draws, or any scenario where predictability would be exploitable. Use `crypto.getRandomValues()` in JavaScript or `secrets` in Python.

Modulo bias produces non-uniform distributions. `randomValue % 6` does not give each outcome equal probability unless the random value's range is a perfect multiple of 6. For small ranges this bias is negligible, but for precise fairness, use rejection sampling (generate, reject if biased, retry).

Seeding PRNGs with predictable values (like the current timestamp) makes the output reproducible. This is fine for games and simulations where reproducibility is desired, but terrible for security. Always use cryptographic APIs for security-sensitive generation.

"Random" does not mean "unique." Generating 10 random numbers from 1-10 will include duplicates. If you need unique values, use sampling without replacement (as shown in the code examples) or generate more numbers and deduplicate.

## Conclusion

Random number generation is deceptively simple in concept but critical to get right in implementation. The difference between `Math.random()` and `crypto.getRandomValues()` is the difference between a fun game and a secure application.

The [FlipMyCase Random Number Generator](/random-number-generator) produces cryptographically secure numbers with custom ranges, batch generation, and unique mode. For generating secure passwords, use the [Password Generator](/password-generator). For unique identifiers, use the [UUID Generator](/uuid-generator). For programmatic generation, the JavaScript, Python, and Go examples above demonstrate both PRNG and CSPRNG approaches.
