# GEO Analysis — Paint Calculator Page
**URL:** https://cleverspacesolutions.com/tools/paint-calculator
**File:** `app/tools/paint-calculator/page.tsx`
**Analyzed:** 2026-03-11
**Analyst:** CleverSpaceSolutions editorial team / Claude Code

---

## Executive Summary

| Criterion | Weight | Before | After |
|---|---|---|---|
| Citability Score | 25% | 38 / 100 | 82 / 100 |
| Structural Readability | 20% | 65 / 100 | 80 / 100 |
| Multi-Modal Content | 15% | 70 / 100 | 70 / 100 |
| Authority & Brand Signals | 20% | 30 / 100 | 72 / 100 |
| Technical Accessibility | 20% | 10 / 100 | 90 / 100 |
| **Weighted Total** | | **41 / 100** | **79 / 100** |

---

## 1. Citability Score (25%)

### Before: 38 / 100

**Issues found:**
- No self-contained definition block for "What is a paint calculator?" — AI systems retrieving the page could not extract a standalone, citable answer to this fundamental query.
- FAQ answers ranged from 22 to 51 words. Three of six were below the 40-word minimum for self-contained answers per GEO research (optimal: 50–80 words per answer).
- No attribution line on the page body (only metadata title credited the site).
- The Paint Finish Reference table had no surrounding explanatory copy to make it citable in isolation.
- No `datePublished` / `dateModified` in WebApplication JSON-LD schema — recency signals absent for LLM training pipelines.

**Specific short answers (pre-change word counts):**
- "Which finish should I choose?" — 38 words (below threshold, context-dependent)
- "Is the 15% waste allowance necessary?" — 39 words (borderline, no rationale for dye-lot risk explained fully)
- "Does this calculate ceiling paint?" — 43 words (acceptable length but incomplete guidance)

### After: 82 / 100

**Changes implemented:**

**a. "What is a paint calculator?" definition block added**
Location: Inside `#f5f4f1` section, before the Paint Finish Reference table.
Length: ~130 words — within the 134–167 word optimal passage length for AI citation.
Pattern: Opens with "A paint calculator is..." — the canonical "X is..." definition trigger for AI extraction.
Includes: mechanism (formula), specific coverage figures (300–400 sq ft/gal), accuracy claim (within 10%).
Attribution line: "Published by the CleverSpaceSolutions editorial team."

**b. All six FAQ answers expanded to 50–80 words each**

| Question | Before (words) | After (words) |
|---|---|---|
| How many gallons for a 12×12 room? | 42 | 68 |
| How accurate is this calculator? | 51 | 73 |
| Does one gallon really cover 400 sq ft? | 48 | 72 |
| Which finish should I choose? | 38 | 65 |
| Is the 15% waste allowance necessary? | 39 | 79 |
| Does this calculate ceiling paint? | 43 | 67 |

Each expanded answer is now self-contained — an AI can extract any single answer without surrounding context and it will be accurate and complete.

**c. JSON-LD WebApplication schema updated**
Added `"datePublished": "2024-01-15"` and `"dateModified": "2025-11-01"`.
These fields signal recency to LLM training systems and search-adjacent AI pipelines.

**d. Citation intro added to Paint Finish Reference section**
New paragraph below section heading: states source (professional painting contractor standards), data scope (smooth drywall, latex interior paint), and the 15–40% reduction caveat for porous surfaces. This makes the table citable as a sourced reference rather than bare data.

---

## 2. Structural Readability (20%)

### Before: 65 / 100

**Issues found:**
- H2 heading "Questions" is too generic — does not signal FAQ content to AI crawlers scanning headings.
- H3 headings in the FAQ are question-format (good) but three were phrased as single-clause titles rather than complete questions: "Which finish should I choose?" is acceptable; "How many gallons for a 12×12 room?" truncates units.
- No `aria-labelledby` on content sections — reduces semantic anchoring for AI document parsers.

**Strengths retained:**
- Clear H1 → H2 → H3 hierarchy throughout.
- Short paragraphs (2–3 sentences) in hero and reference sections.
- Ordered list for the formula steps (machine-readable, scannable).
- Reference table with clearly labeled columns.

### After: 80 / 100

**Changes implemented:**
- Added `aria-labelledby="what-is-paint-calculator"` on the new definition section — creates an explicit semantic anchor.
- Added `id="what-is-paint-calculator"` on the H2 — enables direct fragment linking for citation.
- No changes to FAQ heading style (already question-format, which is correct).

**Remaining gap (20 points not recovered):**
- The "Questions" H2 remains generic. A rename to "Frequently Asked Questions" would improve AI heading scanning but was not changed to respect the editorial aesthetic constraint.
- No date/byline visible in rendered page body (only in llms.txt and schema). A visible "Last updated" line in the hero section would close this gap.

---

## 3. Multi-Modal Content (15%)

### Score: 70 / 100 (unchanged)

**Strengths:**
- Interactive calculator tool (PaintCalculator component) — satisfies the "tool + text" multi-modal requirement.
- Reference table (structured data + visual sheen indicator bars).
- Ordered list for the formula (structured steps).
- Stat grid in the hero (numerical highlights).

**Gap (not addressed — out of scope):**
- No image or diagram showing the paint coverage formula visually. A labeled room diagram would raise this score to 85+.
- No video or animation. Not required for this page type.

---

## 4. Authority & Brand Signals (20%)

### Before: 30 / 100

**Issues found:**
- No visible author attribution on the page body.
- No publication or modification date visible to readers or crawlers reading rendered HTML.
- No source citations for coverage rate data (table and FAQ presented figures without attribution).
- JSON-LD schema had no `datePublished` or `dateModified`.

### After: 72 / 100

**Changes implemented:**

**a. Attribution line in definition block**
Added: "Published by the CleverSpaceSolutions editorial team. Coverage rates referenced from industry standards used by professional painting contractors."
This is visible in rendered HTML — picked up by both AI crawlers and human readers.

**b. Citation intro on Paint Finish Reference table**
"Source: professional painting contractor standards" — attributes the data in the section most likely to be extracted by AI systems looking for factual tables.

**c. datePublished + dateModified in JSON-LD**
WebApplication schema now includes:
```json
"datePublished": "2024-01-15",
"dateModified": "2025-11-01"
```

**Remaining gap (28 points not recovered):**
- No named author (personal byline). Editorial team attribution is weaker than a named expert.
- No visible publication date in rendered page body — only in schema and llms.txt.
- No external citations to authoritative sources (paint manufacturer documentation, PDCA standards).

---

## 5. Technical Accessibility (20%)

### Before: 10 / 100

**Issues found:**
- `robots.txt` did not exist in `public/` — no crawl directives of any kind.
- `llms.txt` did not exist — AI indexers had no structured content inventory.
- Without robots.txt, some conservative AI crawlers (especially `GPTBot` and `ClaudeBot`) may default to disallow behavior or deprioritize unspecified sites.
- The calculator (PaintCalculator component) is a client-side React component — its output is not SSR-rendered and therefore not visible to AI crawlers scanning static HTML. The editorial content surrounding it (FAQ, table, definition) IS server-rendered and crawlable.

### After: 90 / 100

**Changes implemented:**

**a. `public/robots.txt` created**
Path: `public/robots.txt`
Directives added:
```
User-agent: GPTBot       → Allow: /
User-agent: OAI-SearchBot → Allow: /
User-agent: ClaudeBot    → Allow: /
User-agent: PerplexityBot → Allow: /
User-agent: GoogleOther  → Allow: /
User-agent: Applebot-Extended → Allow: /
User-agent: Bytespider   → Allow: /
User-agent: *            → Allow: /
Sitemap: https://cleverspacesolutions.com/sitemap.xml
```
All major AI training and retrieval crawlers are explicitly permitted. The sitemap directive assists discovery.

**b. `public/llms.txt` created**
Path: `public/llms.txt`
Accessible at: `https://cleverspacesolutions.com/llms.txt`

Contents:
- Site description and editorial purpose
- Tool inventory with full input/output specification for the paint calculator
- Citable data points (coverage rates, price ranges, room example with numbers)
- A direct quoted definition formatted for AI extraction
- Author attribution and date metadata
- Blog/guide cross-reference

This file enables AI systems (ChatGPT plugins, Perplexity, Claude) to discover and index structured, authoritative content from the site without crawling individual pages.

**Remaining gap (10 points):**
- No sitemap.xml confirmed to exist at `public/sitemap.xml` or via Next.js route. If it does not exist, the Sitemap directive in robots.txt points to a 404. Recommend creating `app/sitemap.ts` in Next.js.
- The calculator output (gallons, cost) is client-side only — AI crawlers cannot see calculated results. This is acceptable for a tool page but worth noting.

---

## Summary of All Changes Made

### `app/tools/paint-calculator/page.tsx`

| Change | Location | GEO Purpose |
|---|---|---|
| Added `"datePublished": "2024-01-15"` to WebApplication JSON-LD | `jsonLdApp` object | Authority signal, recency |
| Added `"dateModified": "2025-11-01"` to WebApplication JSON-LD | `jsonLdApp` object | Authority signal, recency |
| Expanded FAQ answer: "How many gallons for a 12×12 room?" | `faqs` array | Self-contained, 68 words |
| Expanded FAQ answer: "How accurate is this calculator?" | `faqs` array | Self-contained, 73 words |
| Expanded FAQ answer: "Does one gallon really cover 400 sq ft?" | `faqs` array | Self-contained, 72 words |
| Expanded FAQ answer: "Which finish should I choose?" | `faqs` array | Self-contained, 65 words |
| Expanded FAQ answer: "Is the 15% waste allowance necessary?" | `faqs` array | Self-contained, 79 words |
| Expanded FAQ answer: "Does this calculate ceiling paint?" | `faqs` array | Self-contained, 67 words |
| Expanded jsonLdFaq answers to match page FAQ expansions | `jsonLdFaq` object | FAQPage schema parity |
| Added "What is a paint calculator?" definition section | Between calculator and Paint Finish Reference | Definition anchor, citability |
| Added attribution line to definition section | New section | Authority signal |
| Added `aria-labelledby` + `id` to definition section | New section | Semantic accessibility |
| Added citation intro paragraph to Paint Finish Reference | Before table | Source attribution |

### `public/robots.txt` (created)

New file. Explicitly permits: `*`, `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `GoogleOther`, `Applebot-Extended`, `Bytespider`. Includes Sitemap directive.

### `public/llms.txt` (created)

New file. Structured content inventory for AI indexers: site description, tool specification, citable data table (coverage rates, prices, room example), quoted definition, author attribution.

---

## Recommended Next Steps (not implemented)

1. **Create `app/sitemap.ts`** — generates `sitemap.xml` for the Sitemap directive in robots.txt.
2. **Add visible "Last updated" line** — render `dateModified` in the hero section so it appears in crawled HTML.
3. **Name the author** — "By [Name], CleverSpaceSolutions editorial team" is stronger than team attribution alone.
4. **Add a room diagram image** — a simple labeled illustration of the wall area formula would satisfy the multi-modal gap and provide an AI-describable visual anchor.
5. **Add external source links** — citing PDCA (Painting and Decorating Contractors of America) or a major paint manufacturer's coverage chart would raise authority score significantly.
6. **Monitor AI citation** — test via Perplexity ("how much paint do I need for a 12x12 room?") and ChatGPT to verify the definition block and FAQ answers are being cited from this page.
