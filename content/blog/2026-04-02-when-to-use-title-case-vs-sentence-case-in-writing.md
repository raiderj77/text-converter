---
title: "When to Use Title Case vs Sentence Case in Writing"
date: "2026-04-02"
slug: "when-to-use-title-case-vs-sentence-case-in-writing"
description: "Title case and sentence case follow different rules across AP, Chicago, and tech design systems. Here is when each applies to headlines, UI labels, and body text."
status: published
author: "Your Friendly Developer"
reviewer: "Your Friendly Developer"
---

# When to Use Title Case vs Sentence Case in Writing

The choice between title case and sentence case is not arbitrary. It follows conventions that differ by industry, style guide, and medium. Getting it wrong in a professional context signals unfamiliarity with the audience's expectations; getting it right is invisible in the best way.

**Use title case for headlines, titles of creative works, and formal headings in US press and publishing. Use sentence case for body text, UI labels in most modern design systems, and technical documentation.**

## Definitions

**Title case** capitalizes the first letter of most words in a phrase. Exactly which words get capitalized depends on the style guide. Articles, short prepositions, and coordinating conjunctions are often lowercased, but the general effect is multiple capitals across the phrase:

> *The Art of Writing Clean Code*

**Sentence case** capitalizes only the first word and any proper nouns. Everything else stays lowercase:

> *The art of writing clean code*

Both are valid and widely used. The context determines which is appropriate.

## Style Guide Differences

The biggest source of confusion is that title case does not have a single universal rule. Major US style guides disagree on the details.

### AP Style (Associated Press)

AP style is used by most US newspapers and newswires. It capitalizes:

- The first and last word of any title or headline regardless of part of speech
- All words of four or more letters
- Nouns, verbs, adjectives, and adverbs regardless of length

It does not capitalize articles (*a*, *an*, *the*), coordinating conjunctions (*and*, *but*, *or*, *nor*, *for*), or short prepositions (*of*, *in*, *on*, *at*, *to*) unless they appear as the first or last word. In *The Art of War*, AP lowercases "of" because it is a short preposition.

### Chicago Manual of Style

Chicago is used in book publishing and much academic writing. Its rules are similar to AP's but with key differences:

- Both parts of a hyphenated compound are capitalized: *Self-Made Man*, not *Self-made Man*
- The word following a colon in a title is capitalized
- Chicago is more permissive about capitalizing short prepositions when they carry stress or function as part of a verb phrase

Chicago is also more commonly used for longer-form titles where the nuance matters, which is why book covers and formal publication titles tend to follow Chicago rather than AP.

### APA and MLA

APA (used in social sciences) and MLA (used in humanities) both use title case for the titles of large standalone works (books, journals, films) but apply sentence case to article and chapter titles within those works, especially in reference lists. This is a frequent source of error: writers apply title case at every level when the style guide calls for sentence case at the chapter level.

### When Sentence Case Is the Default

Sentence case is standard in:

- **UK and Australian press**: British newspapers traditionally use sentence case for headlines even on the front page
- **Academic body text**: sentence case is universal in prose regardless of which style guide governs citations
- **Technical documentation**: developer-facing docs at Google, Stripe, and GitHub use sentence case throughout to match the informal, direct register of technical writing
- **Email subject lines**: sentence case reads more conversational and personal

## Title Case and Sentence Case in UI Design

The distinction matters significantly in product design, and major platform design systems take explicit positions.

**Apple Human Interface Guidelines** specify title case for navigation bar titles, tab labels, and button text. Sentence case applies to body text, hints, and descriptions. The division maps roughly to interactive labeled elements (title case) versus explanatory prose (sentence case). A macOS Settings panel uses title case for section headers and sentence case for the explanatory text beneath them.

**Google Material Design** takes a different position, recommending sentence case for nearly all UI text including buttons and navigation labels. The stated reason is that sentence case reads more naturally and reduces visual weight when multiple capitalized words appear in close proximity.

An app following Apple's guidelines and a web app following Material Design will make the opposite choice for the same button label, and both will be correct within their respective systems. The important thing is internal consistency.

## Headlines, H1s, and SEO

For web content, the case question comes up most often in headings:

- **H1 page titles**: No SEO ranking difference between the two. Sentence case H1s increasingly appear in high-ranking content because they match the conversational phrasing of search queries, which are typically written in sentence case.
- **H2 and H3 subheadings**: Most content published by tech companies uses sentence case throughout. Consistency across heading levels matters more than which convention is chosen.
- **Meta descriptions**: Sentence case is almost universal. Meta descriptions are prose, not headlines.

## When to Use Each: a Working Summary

| Context | Convention | Notes |
|---|---|---|
| Book, film, album title | Title case | Follow applicable style guide |
| US news headline | Title case | AP rules |
| Published book chapter | Title case | Chicago rules |
| UK newspaper headline | Sentence case | House style |
| Developer documentation heading | Sentence case | Match technical tone |
| Email subject line | Sentence case | Reads more personal |
| Apple platform UI label | Title case | Per Apple HIG |
| Material Design UI label | Sentence case | Per Material Design |
| Body text (all contexts) | Sentence case | No exceptions |

## Frequently Asked Questions

**Which style guides use title case for headlines, and which prefer sentence case?**

AP Style and Chicago Manual of Style both prescribe title case for headlines and titles. APA and MLA use title case for large works but sentence case for article and chapter titles in citations. UK and Australian publications, along with most technical documentation, default to sentence case for all headings.

**Should button labels use title case or sentence case?**

It depends on the design system. Apple HIG specifies title case for interactive controls. Google Material Design specifies sentence case. Both positions are defensible; the problem arises from mixing them within the same product. Adopt one system and apply it consistently across all UI text at the same level.

**Is "the" always lowercased in a title?**

The first word of a title is always capitalized regardless of what it is, so "The" is capitalized when it opens a title. Mid-title, both AP and Chicago lowercase "the" when it functions as a plain article. When "the" is part of a proper name, it follows the name's own capitalization: *The New York Times* retains its uppercase "The" because it is part of the publication's official masthead.

**Does the choice between title case and sentence case affect SEO?**

Neither is a ranking signal. The choice affects how copy appears in search result snippets. Sentence case tends to scan more naturally since queries are typically in sentence case. Google rewrites title tags in SERPs regardless of input case when it judges the original unhelpful.

For quick conversions between title case and sentence case, [flipmycase.com](https://flipmycase.com) converts any length of text instantly, free with no character limit.
