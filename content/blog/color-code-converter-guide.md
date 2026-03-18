---
title: "Color Code Converter — Convert Between HEX, RGB, HSL, and More Online"
description: "Convert color codes between HEX, RGB, HSL, and other formats instantly. Free online tool for designers and developers. Preview colors and copy code-ready values."
date: "2026-03-16"
keywords: ["color code converter", "hex to rgb", "rgb to hex", "hsl to hex", "color converter online", "hex color converter", "rgb to hsl converter"]
toolSlug: "color-code-converter"
faq:
  - question: "How do I convert HEX to RGB?"
    answer: "Enter your hex color (e.g., #3B82F6) into the FlipMyCase Color Code Converter. It instantly shows the RGB equivalent (59, 130, 246), plus HSL, and other formats. Copy the value you need in any format."
  - question: "What is the difference between HEX and RGB?"
    answer: "HEX uses a 6-digit hexadecimal string (#FF5733) while RGB uses three decimal numbers (255, 87, 51). They represent the same color — HEX is shorthand used in CSS, while RGB is used in design tools and programming."
  - question: "What is HSL and when should I use it?"
    answer: "HSL stands for Hue, Saturation, Lightness. It is more intuitive than HEX or RGB because you can adjust brightness or saturation independently. Use HSL when creating color palettes, themes, or adjusting colors programmatically."
  - question: "Can I convert colors with transparency?"
    answer: "Yes. The converter supports RGBA (RGB with alpha channel) and HSLA (HSL with alpha). An alpha value of 0 is fully transparent and 1 is fully opaque. In HEX, 8-digit codes include transparency (#3B82F680)."
related: ["css-formatter-guide", "html-formatter-guide", "string-encoder-guide"]
---

# Color Code Converter — Convert Between HEX, RGB, HSL Online

Colors in web development exist in multiple formats, and each context demands a different one. CSS uses HEX codes (#3B82F6). JavaScript canvas operations use RGB values. Design systems specify HSL for easy palette generation. Figma exports one format, your CSS framework expects another, and your brand guidelines specify a third. Converting between these formats manually — calculating that #3B82F6 equals rgb(59, 130, 246) equals hsl(217, 91%, 60%) — is tedious and error-prone.

This guide covers the major color formats, how to convert between them, how to handle conversions in code, and the practical scenarios where each format is most useful.

## What Is Color Code Conversion?

Color code conversion transforms a color value from one representation to another. The most common formats are HEX (hexadecimal, e.g., `#3B82F6`), RGB (red-green-blue, e.g., `rgb(59, 130, 246)`), and HSL (hue-saturation-lightness, e.g., `hsl(217, 91%, 60%)`). All three describe the same color — they are different encodings of the same visual value.

You would convert colors when moving between design tools and code, building CSS color schemes, generating programmatic color palettes, matching brand colors across platforms, creating dark/light theme variants, and ensuring accessibility contrast ratios.

## How to Convert Colors with FlipMyCase

1. Open the [FlipMyCase Color Code Converter](/color-code-converter).
2. Enter a color in any format: HEX, RGB, HSL, or use the color picker.
3. All other formats update instantly — copy whichever format you need.
4. Preview the color visually to verify it matches your expectation.

The tool handles 3-digit HEX (#F00), 6-digit HEX (#FF0000), 8-digit HEX with alpha (#FF000080), RGB, RGBA, HSL, and HSLA. For formatting your CSS after inserting colors, use the [CSS Formatter](/css-formatter).

## Code Examples for Color Conversion

### JavaScript

```javascript
// HEX to RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
console.log(hexToRgb('#3B82F6'));  // { r: 59, g: 130, b: 246 }

// RGB to HEX
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
console.log(rgbToHex(59, 130, 246));  // #3b82f6

// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
console.log(rgbToHsl(59, 130, 246));  // { h: 217, s: 91, l: 60 }

// Generate lighter/darker variants using HSL
function lighten(hex, amount) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.min(100, hsl.l + amount);
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}
console.log(lighten('#3B82F6', 20));  // hsl(217, 91%, 80%)
```

### Python

```python
def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(r, g, b):
    return f'#{r:02x}{g:02x}{b:02x}'

def rgb_to_hsl(r, g, b):
    r, g, b = r/255, g/255, b/255
    mx, mn = max(r, g, b), min(r, g, b)
    l = (mx + mn) / 2
    if mx == mn:
        h = s = 0
    else:
        d = mx - mn
        s = d / (2 - mx - mn) if l > 0.5 else d / (mx + mn)
        if mx == r: h = ((g - b) / d + (6 if g < b else 0)) / 6
        elif mx == g: h = ((b - r) / d + 2) / 6
        else: h = ((r - g) / d + 4) / 6
    return round(h * 360), round(s * 100), round(l * 100)

# Convert between formats
print(hex_to_rgb('#3B82F6'))        # (59, 130, 246)
print(rgb_to_hex(59, 130, 246))     # #3b82f6
print(rgb_to_hsl(59, 130, 246))     # (217, 91, 60)

# Generate a color palette
base = hex_to_rgb('#3B82F6')
h, s, l = rgb_to_hsl(*base)
for lightness in range(10, 100, 10):
    print(f'  hsl({h}, {s}%, {lightness}%)')

# Parse CSS color strings
import re
def parse_rgb(css_color):
    match = re.match(r'rgb\((\d+),\s*(\d+),\s*(\d+)\)', css_color)
    if match:
        return tuple(int(x) for x in match.groups())
    return None

print(parse_rgb('rgb(59, 130, 246)'))  # (59, 130, 246)
```

### Go

```go
package main

import (
    "fmt"
    "math"
    "strconv"
    "strings"
)

func hexToRGB(hex string) (int, int, int) {
    hex = strings.TrimPrefix(hex, "#")
    val, _ := strconv.ParseInt(hex, 16, 32)
    return int(val >> 16 & 255), int(val >> 8 & 255), int(val & 255)
}

func rgbToHex(r, g, b int) string {
    return fmt.Sprintf("#%02x%02x%02x", r, g, b)
}

func rgbToHSL(r, g, b int) (int, int, int) {
    rf, gf, bf := float64(r)/255, float64(g)/255, float64(b)/255
    max := math.Max(rf, math.Max(gf, bf))
    min := math.Min(rf, math.Min(gf, bf))
    l := (max + min) / 2
    if max == min {
        return 0, 0, int(math.Round(l * 100))
    }
    d := max - min
    var s, h float64
    if l > 0.5 { s = d / (2 - max - min) } else { s = d / (max + min) }
    switch max {
    case rf: h = (gf - bf) / d; if gf < bf { h += 6 }
    case gf: h = (bf - rf) / d + 2
    case bf: h = (rf - gf) / d + 4
    }
    h /= 6
    return int(math.Round(h * 360)), int(math.Round(s * 100)), int(math.Round(l * 100))
}

func main() {
    r, g, b := hexToRGB("#3B82F6")
    fmt.Printf("RGB: %d, %d, %d\n", r, g, b)
    fmt.Printf("HEX: %s\n", rgbToHex(r, g, b))
    h, s, l := rgbToHSL(r, g, b)
    fmt.Printf("HSL: %d, %d%%, %d%%\n", h, s, l)
}
```

## Real-World Use Cases

**CSS development.** You receive brand colors as HEX values (#3B82F6) from a design team but need HSL for creating hover states (increase lightness by 10%) and dark mode variants (decrease lightness by 20%). Convert once with the [Color Code Converter](/color-code-converter), then use HSL for all programmatic adjustments.

**Design-to-code handoff.** Figma and Sketch export colors in HEX, but your design system uses RGB or HSL tokens. Convert the entire palette during handoff and verify the visual match using the preview. Small rounding differences between formats can produce slightly different colors.

**Accessibility contrast checking.** WCAG contrast ratios require comparing foreground and background color luminance. Converting colors to their RGB values is the first step in calculating relative luminance. Use the converted values in a contrast ratio calculator.

**Tailwind CSS custom colors.** Tailwind expects colors as HEX values in the config. If your design system provides RGB or HSL, convert them to HEX with the [Color Code Converter](/color-code-converter) before adding to `tailwind.config.js`.

## Common Mistakes and Gotchas

Rounding errors cause slight color differences between formats. Converting HEX→RGB→HSL→HEX may not produce the exact original value because HSL calculations involve floating-point division. For critical brand colors, always store the authoritative value in one format and derive the others on demand.

Forgetting the hash symbol in HEX codes causes silent failures. CSS interprets `3B82F6` (without #) as an invalid color and falls back to the default. Always include the # prefix. The converter normalizes this automatically.

Alpha channel handling varies by format. RGBA uses 0-1 for alpha (`rgba(59, 130, 246, 0.5)`), while 8-digit HEX uses 00-FF (`#3B82F680`). The mapping is not intuitive — `80` in HEX is approximately `0.5` in decimal (128/255 ≈ 0.502).

HSL hue wraps around at 360°. A hue of 370° is equivalent to 10°. This is useful for generating analogous color schemes (add ±30° for adjacent colors) but can confuse calculations that do not handle the wraparound.

## Frequently Asked Questions

**What is the difference between HEX and RGB?**
HEX and RGB represent the same color information in different formats. HEX uses a six-character hexadecimal string (like #3B82F6), while RGB uses three decimal values from 0 to 255 (like rgb(59, 130, 246)). HEX is more compact for CSS, while RGB is easier to read and manipulate programmatically.

**How do I convert HEX to HSL?**
Converting HEX to HSL requires two steps. First, convert HEX to RGB by parsing each two-character pair into decimal values. Then convert RGB to HSL by calculating the hue from the RGB ratios, saturation from the difference between maximum and minimum channel values, and lightness from their average.

**What is WCAG contrast ratio?**
WCAG contrast ratio measures the luminance difference between foreground text and background colors on a scale from 1:1 to 21:1. Level AA requires a minimum ratio of 4.5:1 for normal text and 3:1 for large text. Level AAA requires 7:1 for normal text. Higher ratios ensure better readability for all users.

## Conclusion

Color code conversion bridges the gap between design tools, CSS, and programming environments. Whether you are converting brand HEX colors to HSL for palette generation, translating Figma exports to CSS values, or calculating accessibility contrast, reliable conversion is essential.

The [FlipMyCase Color Code Converter](/color-code-converter) handles HEX, RGB, RGBA, HSL, and HSLA with instant conversion and visual preview. For programmatic conversion, the JavaScript, Python, and Go examples above implement the core algorithms. Format your CSS with the [CSS Formatter](/css-formatter) after inserting color values.
