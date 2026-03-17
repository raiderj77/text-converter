---
title: "Number Base Converter — Convert Between Binary, Octal, Decimal, and Hex Online"
description: "Convert numbers between binary, octal, decimal, and hexadecimal instantly. Free online base converter for developers and students. No signup required."
date: "2026-03-16"
keywords: ["number base converter", "binary to decimal", "hex to decimal", "octal converter", "base conversion calculator", "binary hex converter", "number system converter"]
toolSlug: "number-base-converter"
faq:
  - question: "How do I convert binary to decimal?"
    answer: "Enter your binary number into the FlipMyCase Number Base Converter and select base 2 as input and base 10 as output. The tool converts instantly. For example, binary 11010110 equals decimal 214."
  - question: "What number bases are supported?"
    answer: "The tool supports binary (base 2), octal (base 8), decimal (base 10), and hexadecimal (base 16). These are the four number systems most commonly used in programming, networking, and computer science."
  - question: "Why do programmers use hexadecimal?"
    answer: "Hexadecimal is compact — each hex digit represents exactly 4 binary bits. The byte value 11111111 is FF in hex versus 255 in decimal. This makes hex ideal for memory addresses, color codes, MAC addresses, and byte-level data inspection."
  - question: "What is the difference between octal and hexadecimal?"
    answer: "Octal (base 8) uses digits 0-7 and each digit represents 3 binary bits. Hex (base 16) uses 0-9 and A-F, with each digit representing 4 bits. Hex is more common in modern development; octal is mainly used for Unix file permissions."
related: ["binary-text-converter-guide", "hex-text-converter-guide", "hash-generator-guide"]
---

# Number Base Converter — Convert Between Binary, Octal, Decimal, and Hex

Every developer hits a moment where they need to convert between number systems. You are reading a memory dump in hexadecimal and need the decimal value. You are setting Unix file permissions and need to understand what 755 means in binary. You are debugging a network protocol and need to convert between binary flags and their hex representation. Mental math works for small values, but anything beyond a single byte gets tedious fast.

This guide covers the four major number bases, how conversion works, how to do it programmatically, and the real-world contexts where each base appears.

## What Is Number Base Conversion?

Number base conversion transforms a numeric value from one positional notation system to another. The four common bases are binary (base 2, digits 0-1), octal (base 8, digits 0-7), decimal (base 10, digits 0-9), and hexadecimal (base 16, digits 0-9 and A-F). The decimal value 214 is `11010110` in binary, `326` in octal, and `D6` in hex — all representing the same quantity.

You would use base conversion when reading memory addresses and hex dumps, setting Unix file permissions in octal, debugging bitwise operations in binary, working with color codes in hex, analyzing network packet headers, and understanding character encodings.

## How to Convert Number Bases with FlipMyCase

1. Open the [FlipMyCase Number Base Converter](/number-base-converter).
2. Enter your number and select the input base.
3. The tool instantly shows the value in all four bases: binary, octal, decimal, and hexadecimal.
4. Copy the conversion you need.

The converter handles large numbers and validates input against the selected base (rejecting invalid digits like 2 in binary or G in hex). For converting text to binary encoding, use the [Binary Text Converter](/binary-text-converter).

## Code Examples for Base Conversion

### JavaScript

```javascript
// Decimal to other bases
const decimal = 214;
console.log(decimal.toString(2));   // '11010110' (binary)
console.log(decimal.toString(8));   // '326' (octal)
console.log(decimal.toString(16));  // 'd6' (hex)

// Other bases to decimal
console.log(parseInt('11010110', 2));  // 214 (binary to decimal)
console.log(parseInt('326', 8));       // 214 (octal to decimal)
console.log(parseInt('D6', 16));       // 214 (hex to decimal)

// Any base to any base (via decimal intermediate)
function convertBase(value, fromBase, toBase) {
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) throw new Error('Invalid number for given base');
  return decimal.toString(toBase).toUpperCase();
}

console.log(convertBase('11010110', 2, 16));  // 'D6'
console.log(convertBase('D6', 16, 8));         // '326'
console.log(convertBase('326', 8, 2));         // '11010110'

// Pad binary to 8-bit groups
function toBinary8(decimal) {
  return decimal.toString(2).padStart(Math.ceil(decimal.toString(2).length / 8) * 8, '0');
}
console.log(toBinary8(214));  // '11010110'
console.log(toBinary8(10));   // '00001010'
```

### Python

```python
# Decimal to other bases
decimal = 214
print(bin(decimal))   # '0b11010110'
print(oct(decimal))   # '0o326'
print(hex(decimal))   # '0xd6'

# Clean output (without prefix)
print(f'{decimal:b}')   # '11010110'
print(f'{decimal:o}')   # '326'
print(f'{decimal:x}')   # 'd6'
print(f'{decimal:X}')   # 'D6' (uppercase)

# Other bases to decimal
print(int('11010110', 2))   # 214
print(int('326', 8))        # 214
print(int('D6', 16))        # 214

# Any base to any base
def convert_base(value, from_base, to_base):
    decimal = int(str(value), from_base)
    if to_base == 10:
        return str(decimal)
    elif to_base == 2:
        return bin(decimal)[2:]
    elif to_base == 8:
        return oct(decimal)[2:]
    elif to_base == 16:
        return hex(decimal)[2:].upper()

print(convert_base('11010110', 2, 16))  # 'D6'
print(convert_base('D6', 16, 8))        # '326'

# Unix permissions example
perms = 0o755
print(f'Octal: {perms:o}, Binary: {perms:b}, Decimal: {perms}')
# Octal: 755, Binary: 111101101, Decimal: 493
```

### Go

```go
package main

import (
    "fmt"
    "strconv"
)

func main() {
    decimal := int64(214)

    // Decimal to other bases
    fmt.Println("Binary: ", strconv.FormatInt(decimal, 2))   // 11010110
    fmt.Println("Octal:  ", strconv.FormatInt(decimal, 8))   // 326
    fmt.Println("Hex:    ", strconv.FormatInt(decimal, 16))   // d6

    // Other bases to decimal
    fromBin, _ := strconv.ParseInt("11010110", 2, 64)
    fromOct, _ := strconv.ParseInt("326", 8, 64)
    fromHex, _ := strconv.ParseInt("D6", 16, 64)
    fmt.Println("From binary:", fromBin)  // 214
    fmt.Println("From octal: ", fromOct)  // 214
    fmt.Println("From hex:   ", fromHex)  // 214

    // Format with padding
    fmt.Printf("Binary (8-bit): %08b\n", decimal)  // 11010110
    fmt.Printf("Hex (2-digit):  %02X\n", decimal)  // D6
}
```

## Real-World Use Cases

**Hex color codes in CSS.** The color `#3B82F6` is three hex pairs: 3B (59 decimal for red), 82 (130 for green), F6 (246 for blue). Convert individual components with the [Number Base Converter](/number-base-converter) when calculating color values programmatically. The [Color Code Converter](/color-code-converter) handles full color conversion.

**Unix file permissions.** The permission `755` is octal, meaning owner gets 7 (111 binary = read+write+execute), group gets 5 (101 = read+execute), and others get 5. Understanding the binary breakdown clarifies exactly what each permission value grants.

**Debugging bitwise operations.** When code uses bitwise AND, OR, XOR, and shift operations, viewing values in binary makes the logic visible. `214 & 240` is `11010110 & 11110000 = 11010000` — which is obviously the top 4 bits masked. In decimal, `214 & 240 = 208` is opaque.

**Network protocol analysis.** IP addresses, subnet masks, port numbers, and packet headers use binary and hex representations. Converting between them helps understand routing decisions, flag bits, and protocol fields.

## Common Mistakes and Gotchas

Confusing hex digits A-F with arbitrary letters is common for beginners. Hexadecimal uses only A through F (representing 10-15). 'G' is not a valid hex digit. The [Number Base Converter](/number-base-converter) validates input and rejects invalid digits.

Leading zeros matter in some contexts. In JavaScript, `0o755` is octal (493 decimal), `0x1F` is hex (31 decimal), and `0b1010` is binary (10 decimal). Without the prefix, `0755` in older JavaScript was octal, which caused subtle bugs. Always use explicit prefixes in code.

Signed vs unsigned interpretation changes results. The binary value `11111111` is 255 unsigned but -1 in signed 8-bit representation (two's complement). Know whether your context expects signed or unsigned values.

Octal is rarely used outside Unix permissions and some legacy systems. If you see a number like `0777` in code, it is almost certainly an octal permission mask, not a decimal or hex value. Modern codebases use `0o777` for clarity.

## Conclusion

Number base conversion is a fundamental skill for any developer working with low-level data, network protocols, file permissions, or color codes. The four common bases — binary, octal, decimal, and hex — each serve specific contexts.

The [FlipMyCase Number Base Converter](/number-base-converter) handles all four bases instantly in your browser. For programmatic conversion, the JavaScript, Python, and Go examples above cover built-in functions and custom converters. For text-to-binary encoding, use the [Binary Text Converter](/binary-text-converter), and for hex color work, use the [Color Code Converter](/color-code-converter).
