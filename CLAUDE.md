# CLAUDE.md — flipmycase.com

## Project Overview
Text conversion and formatting utilities. Free browser-based tools for case conversion, text formatting, and developer text utilities. No sign-up, no tracking — everything runs in the browser.

**Live URL:** https://flipmycase.com
**GitHub:** raiderj77/text-converter
**Local path:** ~/text-case-converter/
**Hosting:** Vercel (auto-deploys when you push to main)

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- No database — all tools run client-side
- Dark mode support (ThemeProvider)
- CookieConsent component already implemented
- OrganizationSchema already implemented

## Project Structure
```
app/                        # Pages (App Router)
├── layout.tsx             # Root layout with Nav, Footer, CookieConsent
├── (tool pages)
components/
├── layout/
│   └── footer.tsx         # Footer with cross-site links
├── (other components)
content/                    # Content files
lib/                        # Utilities
types/                      # TypeScript types
```

## Tools Already Built
- Text case converters: uppercase, lowercase, title case, sentence case
- (More may exist — check app/ directory for full list)

## Milton Branch Audit (Completed)
All 7 agent/* branches have been audited and cleaned up:
- 5 were already merged into main — branches deleted
- 1 (flipmycase-new-tools) was a destructive rollback — deleted without merging
- 1 (add-cookie-compliance) was fixed and merged — cookie consent, cookie policy, accessibility statement
- Inherited bugs fixed: broken code blocks, wrong related slugs, dead frontmatter, duplicate functions, missing ARIA, broken Tailwind colors

## SEO Requirements
- Every tool page needs: optimized title tag (<60 chars), meta description (<155 chars), H1 with target keyword
- Every tool page needs SoftwareApplication JSON-LD schema
- FAQPage schema on each tool page
- Internal links between related tools
- pSEO opportunity: "[format A] to [format B] converter" pages — dozens from format combinations
- Target developer and writer audiences

## Competitive Landscape
- Main competitor: convertcase.net (20 years old, dominant, ugly design)
- Our advantage: modern design, faster UX, mobile-friendly, no-login required
- Blue ocean: AI-powered text tools (grammar fixer, passive-to-active voice, readability improver)
- Blue ocean: developer-specific tools (JSON formatter, regex tester, base64 encoder)

## Footer Cross-Links
Footer already includes links to other portfolio sites:
- creatorrevenuecalculator.com
- fibertools.app
- mindchecktools.com

## Monetization
- AdSense display ads (high volume, lower CPM $3-5)
- Potential: developer tool affiliate links (Semrush, Ahrefs)
- Strategy: volume play — the more tools, the more keyword coverage, the more traffic

## Git Workflow
1. Work on feature branches
2. Branch naming: feature/[description] or fix/[description]
3. Show Jason the diff before merging
4. Push to main = auto-deploy to Vercel
5. Test locally with `npm run dev` before pushing

## Communication Style
Jason needs ALL instructions explained step-by-step like he is 5 years old. Never assume he knows how to do something.

## Current GSC Data (March 2026)
- 1 click, 89 impressions, 1.1% CTR, avg position 27.3
- Top queries: "word limit count" (6 imp), "word count" (3 imp)
- Problem: Very low CTR — title tags may not match search intent

## Current Priorities
1. Add SoftwareApplication schema to each tool page
2. Improve title tags and meta descriptions
3. Implement AdSense
4. Expand into developer tools (JSON, regex, base64, etc.)
