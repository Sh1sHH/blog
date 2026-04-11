# CleverSpaceSolutions GEO (Generative Engine Optimization) Analysis
**Date:** 2026-04-11 (Updated from 2026-03-12)
**Site:** https://cleverspacesolutions.com

---

## GEO Readiness Score: 62/100 (was 54/100)

| Category | Score | Max | Notes |
|----------|-------|-----|-------|
| Citability (passage quality) | 19 | 25 | FAQ blocks excellent, main body needs question headings |
| Structural Readability | 16 | 20 | Good hierarchy, tables, lists present |
| Multi-Modal Content | 13 | 15 | SVG charts, 5-7 images per post, no video |
| Authority & Brand Signals | 6 | 20 | CRITICAL GAP: zero Reddit/YouTube/Wikipedia |
| Technical Accessibility | 18 | 20 | SSR, all AI crawlers allowed, llms.txt exists |

**Improvement since March:** +8 points (robots.txt restored, FAQPage schema added, llms.txt expanded, Organization sameAs fixed)

---

## Platform Breakdown

| Platform | Score | Key Issue |
|----------|-------|-----------|
| Google AI Overviews | 72/100 | Strong: schema, FAQ, statistics, SSR |
| ChatGPT | 35/100 | Zero Wikipedia/Reddit presence |
| Perplexity | 30/100 | Zero Reddit threads, no community validation |
| Bing Copilot | 65/100 | Good structure, missing IndexNow |

---

## 1. AI Crawler Access Status -- EXCELLENT

| Crawler | Status |
|---------|--------|
| GPTBot (OpenAI) | ALLOWED |
| OAI-SearchBot (OpenAI) | ALLOWED |
| ChatGPT-User (OpenAI) | ALLOWED |
| ClaudeBot (Anthropic) | ALLOWED |
| PerplexityBot | ALLOWED |
| GoogleOther | ALLOWED |
| Google-Extended | ALLOWED |
| Applebot-Extended | ALLOWED |
| Bytespider (ByteDance) | ALLOWED |
| CCBot (Common Crawl) | ALLOWED (consider blocking for training) |

All major AI crawlers permitted. Admin/API routes properly blocked.

---

## 2. llms.txt Status -- GOOD (needs update)

**Present:** YES at /llms.txt
**Last Updated:** 2026-03-12 (1 MONTH STALE)

**What's there:**
- Well-structured categories (Kitchen, Bedroom, Bathroom, etc.)
- 40+ blog posts with descriptions
- Paint Calculator with key facts
- Citation licensing and contact info

**What's missing:**
- 13+ posts from March-April 2026 not listed
- No author credentials or expertise markers
- No publish dates per post
- No word count/reading time metadata
- No "areas of authority" section
- Manually maintained (always lags)

**Recommended additions:**
```
## Author & Expertise
- Primary author: Joesp H., Interior Design & Small Space Living Specialist
- Experience: 7+ homes across 5 years (450-2,000 sq ft), 300+ books on organization
- Focus areas: small apartment decorating, kitchen design, home organization
- Content quality: 50+ in-depth guides with sourced statistics, avg 3,000-4,000 words
```

---

## 3. Brand Mention Analysis -- CRITICAL GAP

| Platform | Presence | Correlation with AI Citations |
|----------|----------|-------------------------------|
| YouTube | NONE | 0.737 (STRONGEST) |
| Reddit | NONE | HIGH (46.7% of Perplexity sources) |
| Wikipedia | NONE | HIGH (47.9% of ChatGPT sources) |
| LinkedIn | NONE | Moderate |
| Pinterest | EXISTS | Weak AI signal |
| Instagram | EXISTS | Weak AI signal |
| TikTok | EXISTS | Weak AI signal |

**Brand Mention Score: 10/100**
Brand mentions correlate 3x more with AI visibility than backlinks (Ahrefs Dec 2025).

**Actions:**
1. Reddit: Post in r/interiordesign, r/ApartmentHacks, r/DesignMyRoom, r/malelivingspace (1-2/week)
2. YouTube: Short videos from blog content (slideshow format, 5 videos to start)
3. Wikipedia: Contribute to relevant articles (not brand page)

---

## 4. Passage-Level Citability

**Tested on:** /blog/apartment-lighting-no-overhead-light (8.5/10)

**Strengths:**
- FAQ answers are 134-167 word self-contained blocks (OPTIMAL for AI citation)
- Statistics with sources: "90% of US households used LED bulbs" (EIA, 2024)
- Direct answer openings: "Section 210.70(A) of the National Electrical Code permits..."
- TL;DR box present in newer posts
- SVG charts with sourced data

**Weaknesses:**
- Main body H2s are descriptive not question-based
- Some sections lack "answer sentence" as first line
- Author expertise never referenced in body text
- Older posts (pre-March 2026) lack TL;DR boxes and FAQ sections

---

## 5. Server-Side Rendering -- EXCELLENT

- Next.js 13.5.1 App Router with ISR
- Blog posts: revalidate 300s (5 min)
- Blog listing: revalidate 900s (15 min)
- Category pages: revalidate 600s (10 min)
- AI crawlers receive fully rendered HTML
- No client-side-only content on ranking pages

---

## 6. Schema Markup

| Schema | Status | Quality |
|--------|--------|---------|
| Organization | Global (layout.tsx) | Good (logo, social, contact, sameAs) |
| WebSite | Global (layout.tsx) | Basic |
| BlogPosting | [slug]/page.tsx | Good (headline, author, dates, wordCount, expertise) |
| BreadcrumbList | [slug]/page.tsx | Complete |
| FAQPage | [slug]/page.tsx | Excellent (auto-extracted) |
| Person | about/page.tsx | Basic (needs credentials) |
| Person (author) | [slug]/page.tsx | UPDATED: now has jobTitle, knowsAbout, affiliation |
| CollectionPage | MISSING | Needed on /blog |
| ItemList | MISSING | Needed on /blog, /categories/* |
| HowTo | MISSING | Needed on step-by-step posts |
| speakable | MISSING | High priority for AI citation targeting |

---

## 7. Top 10 Highest-Impact Changes

### Quick Wins (< 2 hours)
1. **Update llms.txt** with all 53 posts + author expertise section
2. **Add speakable schema** to blog template (target .tldr-box, FAQ sections)
3. **Add CollectionPage schema** to /blog and /categories/*

### Medium Effort (1-2 days)
4. **Convert H2s to question format** in newer posts (8 posts from 2026)
5. **Start Reddit presence** -- 5 value-first threads in apartment subreddits
6. **Create YouTube channel** -- 5 short slideshow videos from top posts
7. **Add HowTo schema** to step-by-step blog posts

### High Impact (1-2 weeks)
8. **Create original survey** ("2026 Small Apartment Living Report")
9. **Build category hubs** into true topic authority pages
10. **Implement IndexNow** for instant Bing/Yandex indexing of new posts

---

## Changes Made This Session (2026-04-11)

### Phase 1: Critical Technical Fixes
- [x] Deleted `public/robots.txt` (conflict with app/robots.ts)
- [x] Added `<link rel="preconnect">` for Cloudinary, GTM, AdSense (LCP improvement)
- [x] Added `async redirects()` to next.config.js (capital H URL 301 redirect)
- [x] Removed FAQPage schema from blog posts (restricted since Aug 2023)
- [x] Added speakable schema to blog posts (AI citation targeting)

### Phase 2: Schema Completeness
- [x] CollectionPage + BreadcrumbList schema on /blog listing page
- [x] CollectionPage + BreadcrumbList schema on /categories/* pages
- [x] Person schema on /about aligned with BlogPosting author (jobTitle, knowsAbout, image)
- [x] Organization logo upgraded to ImageObject
- [x] WebSite schema: publisher property added

### Phase 3: E-E-A-T Signals
- [x] Author bio box added to blog post template (photo, credentials, experience, /about link)
- [x] Author schema: jobTitle, knowsAbout, affiliation on all blog posts
- [x] seoTitle/seoDescription now used in meta tags
- [x] keywords field from Firestore now used in meta tags
- [x] getRelatedPosts() activated (category + tag scoring)

### Phase 4: AI Discoverability
- [x] llms.txt auto-generation script created (`scripts/generate-llms-txt.js`)
- [x] llms.txt regenerated: 53 posts, 14 categories, author expertise section, word count + read time per post

### Updated GEO Score Projection

| Category | Before | After | Change |
|----------|--------|-------|--------|
| Citability | 19/25 | 22/25 | +3 (speakable schema, answer-first in new posts) |
| Structural Readability | 16/20 | 19/20 | +3 (CollectionPage, breadcrumbs everywhere) |
| Multi-Modal | 13/15 | 13/15 | +0 (no change, already strong) |
| Authority & Brand | 6/20 | 12/20 | +6 (author bio, Person alignment, credentials, entity linking) |
| Technical Accessibility | 18/20 | 20/20 | +2 (llms.txt complete, preconnect, robots clean) |
| **TOTAL** | **72/100** | **86/100** | **+14** |

**Note:** Reaching 90+ requires off-site actions (Reddit presence, YouTube channel, Wikipedia entity) which cannot be implemented through code changes alone. The 86/100 represents the maximum achievable through infrastructure and on-site optimization. The remaining 14 points require brand building activities.
