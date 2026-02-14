# FlipMyCase.com — Master Build Roadmap

## Current State Audit (Critical Issues)

### Architecture Problems
1. **No metadata in root layout** — Google sees no title/description for the site
2. **Entire main page is `"use client"`** — Google must execute JS to see content (bad for SEO)
3. **Two conflicting blog data files** — `lib/blog.ts` and `lib/blog.tsx` define different schemas
4. **SITE_URL hardcoded to Vercel subdomain** — Every canonical URL, sitemap, and robots.txt points to the wrong domain
5. **No shared navigation** — Every page has ad-hoc nav; adding tools means duplicating everywhere
6. **No component library** — `cx()`, `Card`, `SectionCard` are duplicated or inline
7. **No schema markup on main page** — Missing WebApplication, FAQ structured data
8. **Sitemap only lists 1 URL** — Blog posts, learn page, about, etc. are invisible to Google
9. **Footer is raw inline-style HTML** — Doesn't match the tool's design system
10. **Static pages (about/contact/privacy/terms) use inline styles** — Inconsistent with the dark theme

### SEO Problems
1. No Open Graph / Twitter Card meta tags
2. No canonical URLs on any page except blog posts
3. No `<meta name="robots">` directives
4. Blog content stored as JSX in TypeScript — impossible to scale to 200+ posts
5. No internal linking structure between tools (tools don't exist yet)
6. No FAQ schema on the main page (only on blog posts)
7. No breadcrumb schema

---

## Build Phases (In Order)

### Phase 1: Foundation Restructure
**Goal:** Extract shared components, create a scalable layout, establish the design system.

**Files to create:**
- `lib/config.ts` — Single source of truth for site URL, site name, metadata defaults
- `lib/utils.ts` — Shared utilities (`cx()` helper)
- `components/ui/card.tsx` — Reusable Card component
- `components/ui/section-card.tsx` — Reusable SectionCard component
- `components/layout/nav.tsx` — Shared navigation with tool links
- `components/layout/footer.tsx` — Shared footer matching the design system
- `components/layout/theme-provider.tsx` — Client-side theme context (dark/light)
- `components/seo/schema.tsx` — JSON-LD schema markup components

**Files to modify:**
- `app/layout.tsx` — Add metadata API, shared nav/footer, theme support
- `app/page.tsx` — Split into server component (SEO content) + client component (tool)
- `app/globals.css` — Clean up, add CSS custom properties for theming

**Key decisions:**
- Theme state managed via React Context + localStorage (client-side)
- Tool interactivity stays client-side, but all SEO content (headings, FAQ, descriptions) rendered server-side
- Every page gets consistent nav showing all tools

---

### Phase 2: SEO Infrastructure
**Goal:** Make every page optimally crawlable and indexable.

**Files to create/modify:**
- `app/layout.tsx` — Full metadata with OG tags, Twitter cards
- `app/sitemap.ts` — Auto-generate from all routes + blog posts
- `app/robots.ts` — Point to correct domain sitemap
- `lib/config.ts` — Update SITE_URL to flipmycase.com
- Add canonical URLs to every page
- Add WebApplication schema to main tool page
- Add FAQ schema to main page
- Add BreadcrumbList schema to all pages
- Add Article schema to all blog posts (already partially done)

**Checklist:**
- [ ] Every page has unique `<title>` and `<meta description>`
- [ ] Every page has canonical URL
- [ ] Every page has Open Graph tags
- [ ] Sitemap includes all routes
- [ ] robots.txt points to correct sitemap
- [ ] JSON-LD schema on tool pages, blog posts, FAQ sections

---

### Phase 3: Blog System Overhaul
**Goal:** Scalable blog architecture that supports 200+ posts with minimal effort per post.

**Architecture change:**
- Move from JSX-in-TypeScript → Markdown files in `content/blog/`
- Each post is a `.md` file with YAML frontmatter
- Build script parses frontmatter + content at build time
- Blog index auto-generates from file system
- Related posts computed by shared tags/categories

**Post frontmatter schema:**
```yaml
---
title: "Free Uppercase Converter"
description: "Convert text to uppercase instantly."
date: 2026-02-12
tags: [uppercase, case-converter]
related: [lowercase-converter, title-case-converter]
faq:
  - q: "How do I convert text to uppercase?"
    a: "Paste your text and copy the UPPERCASE output."
---
```

**Why this matters:** Writing 200 blog posts in TypeScript arrays is unsustainable. Markdown files can be written in any text editor, previewed in GitHub, and don't require a code deploy to publish.

---

### Phase 4: Word Counter Tool
**Goal:** Highest-traffic potential tool. Ship it as a standalone page with full SEO.

**Route:** `/word-counter`

**Features:**
- Real-time word count, character count (with/without spaces)
- Sentence count, paragraph count
- Average word length, reading time, speaking time
- Social media character limits (Twitter 280, Instagram 2200, LinkedIn 3000, Facebook 63,206)
- Top word frequency analysis
- Keyword density checker
- Copy stats to clipboard

**SEO content on page:**
- H1: "Free Word Counter — Count Words, Characters & Sentences Online"
- How-to section
- FAQ section with schema
- Internal links to case converter and other tools

---

### Phase 5: Additional Tools (Build Order)
Each tool follows the same pattern: standalone page, full SEO content, FAQ schema, internal linking.

1. **Text Cleaner** (`/text-cleaner`) — Remove extra spaces, line breaks, tabs
2. **Lorem Ipsum Generator** (`/lorem-ipsum-generator`) — Customizable placeholder text
3. **Duplicate Line Remover** (`/duplicate-line-remover`) — Paste list, get deduplicated
4. **String Encoder/Decoder** (`/string-encoder`) — Base64, URL encode/decode, HTML entities
5. **JSON Formatter** (`/json-formatter`) — Pretty-print + validate JSON
6. **Text Diff Tool** (`/text-diff`) — Compare two blocks of text
7. **Markdown to HTML** (`/markdown-to-html`) — Convert markdown to HTML and vice versa
8. **Password Generator** (`/password-generator`) — High-volume traffic magnet
9. **Fancy Text Generator** (`/fancy-text`) — Unicode text styles for social media
10. **Regex Tester** (`/regex-tester`) — Test regex patterns with highlighting

---

### Phase 6: Performance & PWA
**Goal:** Sub-1s load time, installable PWA.

- Audit with Lighthouse, target 95+ on all metrics
- Self-host fonts (no external Google Fonts requests)
- Preload critical CSS
- Add PWA manifest + service worker
- Add install prompt for mobile users
- Compress all assets, purge unused Tailwind

---

### Phase 7: Monetization Prep
**Goal:** Ready for ad networks when traffic justifies it.

- Add ad slot placeholders (already partially done in blog)
- Apply for Google AdSense once domain is 3+ months old with 20+ pages
- Apply for Mediavine once hitting 50K monthly sessions
- Premium tier: Stripe integration for power features (batch processing, API access, file upload conversion)

---

## File Structure (Target)

```
app/
├── layout.tsx              # Root layout with metadata, nav, footer
├── page.tsx                # Homepage / Case Converter tool
├── globals.css
├── sitemap.ts              # Auto-generated sitemap
├── robots.ts
├── manifest.ts             # PWA manifest
├── word-counter/
│   └── page.tsx
├── text-cleaner/
│   └── page.tsx
├── lorem-ipsum-generator/
│   └── page.tsx
├── duplicate-line-remover/
│   └── page.tsx
├── string-encoder/
│   └── page.tsx
├── json-formatter/
│   └── page.tsx
├── text-diff/
│   └── page.tsx
├── markdown-to-html/
│   └── page.tsx
├── password-generator/
│   └── page.tsx
├── fancy-text/
│   └── page.tsx
├── regex-tester/
│   └── page.tsx
├── blog/
│   ├── page.tsx            # Blog index
│   └── [slug]/
│       └── page.tsx        # Individual blog post
├── learn/
│   └── page.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
├── privacy/
│   └── page.tsx
└── terms/
    └── page.tsx

components/
├── layout/
│   ├── nav.tsx             # Shared navigation
│   ├── footer.tsx          # Shared footer
│   └── theme-provider.tsx  # Dark/light theme context
├── ui/
│   ├── card.tsx            # Output card component
│   ├── section-card.tsx    # Section wrapper
│   └── tool-page.tsx       # Shared tool page layout
├── seo/
│   └── schema.tsx          # JSON-LD components
└── tools/
    ├── case-converter.tsx  # Client-side converter logic
    ├── word-counter.tsx    # Client-side counter logic
    └── ...                 # Each tool's client component

lib/
├── config.ts               # Site URL, metadata defaults, tool registry
├── utils.ts                # Shared utilities
├── conversions.ts          # Text conversion functions
└── blog.ts                 # Blog post loading from markdown

content/
└── blog/
    ├── uppercase-converter.md
    ├── lowercase-converter.md
    └── ...                 # 200+ markdown files
```

---

## Execution Order (What We Build Now)

### Step 1: `lib/config.ts` + `lib/utils.ts`
Single source of truth. Everything references this.

### Step 2: `components/layout/theme-provider.tsx`
Client-side theme context so we can have server components wrapping client interactivity.

### Step 3: `components/layout/nav.tsx` + `components/layout/footer.tsx`
Shared navigation and footer.

### Step 4: `components/ui/card.tsx` + `components/ui/section-card.tsx`
Extract from page.tsx.

### Step 5: `lib/conversions.ts`
Extract all conversion functions from page.tsx into shared module.

### Step 6: `components/tools/case-converter.tsx`
Client component with just the interactive tool logic.

### Step 7: `app/layout.tsx` rewrite
Full metadata, nav, footer, theme provider.

### Step 8: `app/page.tsx` rewrite
Server component with SEO content + embedded client tool component.

### Step 9: SEO infrastructure
Schema, sitemap, robots, canonical URLs.

### Step 10: Word counter tool
First new tool page.
