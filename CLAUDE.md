# CLAUDE.md - flipmycase.com
# Claude Code reads this automatically. Follow every instruction.

## IDENTITY
This is the flipmycase.com codebase. Text conversion utilities.
Developer-focused: clean, fast, minimal.

## BEFORE DOING ANYTHING
1. Read this entire file first.
2. Read EMPIRE_BUILD_STANDARDS.md before deploying anything.
3. Show Jason a plan. Wait for approval.
4. Explain everything step-by-step as if Jason is 5 years old.

## REPO STRUCTURE

### Tier 1: Read First
- CLAUDE.md (this file)
- EMPIRE_BUILD_STANDARDS.md (quality gate)
- src/config/ (centralized tool config - auto-populates nav, footer, sitemap)
- src/app/layout.tsx (root layout, metadata, AdSense)

### Tier 2: Read When Relevant
- src/app/tools/ (case converters, slug generator, text sorter, text reverser)
- src/app/components/ (shared UI, cookie consent, ad units)
- public/ (static assets, llms.txt, robots.txt, sitemap)

### Tier 3: Never Read Unless Asked
- node_modules/, .next/, .git/, .env files

## TECH STACK
- Next.js App Router with TypeScript and Tailwind CSS
- Hosted on Vercel (auto-deploys on push to main)
- Same config-driven pattern as mindchecktools
- Cookie consent banner: GDPR compliant with ARIA accessibility
- Cross-site footer links to other portfolio sites

## COMPLIANCE
- Cookie consent required on all pages (already implemented)
- Privacy policy must be linked in footer
- AdSense integrated, awaiting approval
- No personal name on any public page

## WORKFLOW (Baby Steps)
1. AUDIT: Read code, report findings
2. PLAN: Show plan, wait for approval
3. EXECUTE: One change at a time
4. REVIEW: Show result
5. STANDARDS CHECK: Verify EMPIRE_BUILD_STANDARDS.md
6. DEPLOY: Push only after approval
7. VERIFY: Check live site

## CURRENT STATUS
- Tools live: case converters, slug generator, text sorter, text reverser
- AdSense integrated, awaiting approval
- Cookie consent and accessibility statement done
- GSC: 1 click, 89 impressions, 1.1% CTR, position 27.3
- All branches merged, repo clean

## DO NOT
- Push without approval
- Delete files without asking
- Build before auditing
- Skip the plan step
- Ignore EMPIRE_BUILD_STANDARDS.md
