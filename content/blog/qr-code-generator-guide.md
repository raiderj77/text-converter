---
title: "QR Code Generator — How to Create QR Codes Online for Free"
description: "Generate QR codes for URLs, text, WiFi, and contact cards instantly. Free online tool with customizable size and download options. No signup required."
date: "2026-03-16"
keywords: ["qr code generator", "create qr code online", "free qr code maker", "qr code for url", "qr code for wifi", "generate qr code", "qr code creator free"]
toolSlug: "qr-code-generator"
faq:
  - question: "How do I create a QR code?"
    answer: "Open the FlipMyCase QR Code Generator, enter your URL, text, or WiFi credentials, and the QR code generates instantly. Download it as a PNG image and use it in print materials, presentations, or websites."
  - question: "Are QR codes free to create and use?"
    answer: "Yes. QR codes are an open standard (ISO 18004). You can create and use them for free with no licensing fees. The FlipMyCase generator creates unlimited QR codes with no account required."
  - question: "What can I encode in a QR code?"
    answer: "QR codes can encode any text data: URLs, plain text, WiFi network credentials (SSID and password), phone numbers, email addresses, vCard contact information, and SMS messages. The maximum capacity is about 4,296 characters."
  - question: "Do QR codes expire?"
    answer: "Static QR codes never expire — the data is encoded directly in the pattern. However, if the QR code points to a URL and that URL goes down, scanning the code will lead to a broken page. The QR code itself remains valid indefinitely."
related: ["string-encoder-guide", "password-generator-guide", "slug-generator"]
---

# QR Code Generator — How to Create QR Codes for Free

QR codes bridge the physical and digital worlds. A printed QR code on a business card links to your portfolio. A QR code on a restaurant table opens the menu. A QR code on a product package links to assembly instructions. They are the simplest way to transfer a URL, WiFi password, or contact information from a physical surface to a smartphone without typing.

This guide covers how QR codes work, how to generate them for different use cases, how to create them programmatically, and the practical considerations for size, error correction, and placement.

## What Is a QR Code?

A QR (Quick Response) code is a two-dimensional barcode that encodes data as a pattern of black and white squares. Any smartphone camera can read it instantly. QR codes can store up to 4,296 alphanumeric characters or 7,089 numeric digits, and they include built-in error correction that allows them to be read even when partially damaged or obscured.

You would generate QR codes for sharing URLs on printed materials, encoding WiFi credentials for guest networks, creating contact cards (vCards) for business cards, linking to app downloads, encoding event tickets and boarding passes, and directing users to payment pages.

## How to Generate QR Codes with FlipMyCase

1. Open the [FlipMyCase QR Code Generator](/qr-code-generator).
2. Enter your content: URL, plain text, WiFi credentials, or any other data.
3. The QR code generates instantly in the preview.
4. Adjust size if needed.
5. Download the QR code as a PNG image.

The generator runs entirely in your browser — your data is never uploaded. For generating URL-friendly slugs to encode, use the [Slug Generator](/slug-generator).

## Code Examples for QR Code Generation

### JavaScript (with qrcode library)

```javascript
// Node.js with qrcode package
const QRCode = require('qrcode');

// Generate QR code as data URL (for web display)
async function generateQR(text) {
  const dataUrl = await QRCode.toDataURL(text, {
    width: 300,
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
    errorCorrectionLevel: 'M',
  });
  return dataUrl;  // data:image/png;base64,...
}

// Generate QR code as PNG file
async function saveQR(text, filename) {
  await QRCode.toFile(filename, text, {
    width: 300,
    errorCorrectionLevel: 'H',
  });
  console.log(`QR code saved to ${filename}`);
}

// Common QR code types
const url = 'https://flipmycase.com';
const wifi = 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;';
const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Alice Smith\nTEL:+15551234567\nEND:VCARD';

generateQR(url).then(dataUrl => console.log('URL QR generated'));
saveQR(wifi, 'wifi-qr.png');
```

### Python (with qrcode library)

```python
import qrcode
from qrcode.constants import ERROR_CORRECT_H

# Basic QR code generation
def generate_qr(data, filename='qr.png', size=10):
    qr = qrcode.QRCode(
        version=1,
        error_correction=ERROR_CORRECT_H,
        box_size=size,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color='black', back_color='white')
    img.save(filename)
    print(f'QR code saved to {filename}')

# URL QR code
generate_qr('https://flipmycase.com', 'url-qr.png')

# WiFi QR code
wifi = 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;'
generate_qr(wifi, 'wifi-qr.png')

# vCard QR code
vcard = """BEGIN:VCARD
VERSION:3.0
FN:Alice Smith
TEL:+15551234567
EMAIL:alice@example.com
END:VCARD"""
generate_qr(vcard, 'contact-qr.png')

# Batch generation
urls = [
    'https://flipmycase.com/json-formatter',
    'https://flipmycase.com/regex-tester',
    'https://flipmycase.com/hash-generator',
]
for i, url in enumerate(urls):
    generate_qr(url, f'qr-{i+1}.png')
```

### Go

```go
package main

import (
    "image/png"
    "os"

    "github.com/skip2/go-qrcode"
)

func main() {
    // Generate QR code as PNG file
    err := qrcode.WriteFile("https://flipmycase.com", qrcode.Medium, 256, "url-qr.png")
    if err != nil {
        panic(err)
    }

    // Generate QR code as image object
    qr, _ := qrcode.New("WIFI:T:WPA;S:MyNetwork;P:MyPassword;;", qrcode.High)
    img := qr.Image(256)
    f, _ := os.Create("wifi-qr.png")
    defer f.Close()
    png.Encode(f, img)
}
```

## Real-World Use Cases

**Marketing materials.** Print QR codes on business cards, flyers, posters, and product packaging to link to websites, landing pages, or promotional offers. Generate the QR code with the [QR Code Generator](/qr-code-generator) and download the PNG for your designer.

**WiFi guest access.** Instead of writing your WiFi password on a whiteboard, generate a QR code that connects phones automatically when scanned. The format `WIFI:T:WPA;S:NetworkName;P:Password;;` is recognized by both iOS and Android. Use the [Password Generator](/password-generator) to create a strong WiFi password first.

**Event management.** Encode ticket IDs, confirmation numbers, or check-in URLs as QR codes. Attendees show the code on their phone, and a scanner app reads it instantly. This eliminates manual entry and speeds up check-in.

**Restaurant and retail.** Replace physical menus with QR codes that link to an online menu. Print QR codes on receipts linking to review pages. Add QR codes to product labels linking to user manuals or assembly instructions.

## Common Mistakes and Gotchas

The most common mistake is making QR codes too small for reliable scanning. The minimum recommended size is 2 x 2 cm (about 0.8 x 0.8 inches) for codes scanned from a short distance. For posters and signage scanned from further away, scale up proportionally. A general rule: the scanning distance should be no more than 10 times the QR code width.

Low error correction makes codes fragile. QR codes support four error correction levels: L (7%), M (15%), Q (25%), and H (30%). Higher levels allow more damage tolerance but produce denser codes. Use H for printed materials that may be folded, stained, or partially covered. Use L for digital display where the code is always clean.

Encoding too much data creates dense, hard-to-scan codes. A QR code encoding a 500-character URL has many more modules than one encoding a 30-character URL. Keep your data short — use URL shorteners if needed, or encode a redirect URL instead of the full destination.

Not testing across devices before printing is risky. Generate the code, scan it with at least three different phones (iOS and Android), and verify it opens the correct destination before sending anything to print.

## Conclusion

QR codes are the simplest bridge between physical materials and digital content. They require no app (smartphone cameras read them natively), no typing, and no special hardware. Generating them takes seconds and they never expire.

The [FlipMyCase QR Code Generator](/qr-code-generator) creates QR codes for URLs, text, WiFi, and any other data instantly in your browser. For programmatic generation, use the `qrcode` libraries in JavaScript, Python, or Go. For creating clean URLs to encode, use the [Slug Generator](/slug-generator), and for generating WiFi passwords, use the [Password Generator](/password-generator).
