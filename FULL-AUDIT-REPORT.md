# CleverSpaceSolutions -- Full SEO Audit Report
**Date:** April 11, 2026 (Updated from March 11, 2026)
**Site:** https://cleverspacesolutions.com
**Framework:** Next.js 13.5.1 (App Router, ISR) on Vercel
**Pages:** 75 URLs (51 blog, 14 categories, 7 static, 3 tools)

---

## Overall SEO Health Score: 67/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 72/100 | 25% | 18.0 |
| Content Quality & E-E-A-T | 62/100 | 25% | 15.5 |
| On-Page SEO | 71/100 | 20% | 14.2 |
| Schema / Structured Data | 72/100 | 10% | 7.2 |
| Performance (CWV) | 60/100 | 10% | 6.0 |
| Images | 55/100 | 5% | 2.75 |
| AI Search Readiness (GEO) | 62/100 | 5% | 3.1 |
| **TOTAL** | | | **66.75** |

---

## Top 5 Critical Issues

1. **Studio apartment keyword cannibalization** -- 7 posts competing for same query, all self-canonicalized. None ranking well.
2. **`public/robots.txt` conflict** with `app/robots.ts` -- may serve wrong rules to crawlers.
3. **Mixed-case URL** -- `/blog/How-to-make-candles-at-home-a-beginners-guide` (capital H), no redirect configured.
4. **No redirect infrastructure** -- `next.config.js` has no `async redirects()`. Content consolidation impossible without it.
5. **Zero brand mentions** on Reddit/YouTube/Wikipedia -- blocks ChatGPT (35/100) and Perplexity (30/100) citations.

## Top 5 Quick Wins

1. Delete `public/robots.txt` (2 min fix, critical crawlability conflict)
2. Add `<link rel="preconnect">` for Cloudinary/GTM to layout.tsx (5 min, 200-400ms LCP gain)
3. Update llms.txt with all 53 posts + author expertise (1 hour)
4. Add CollectionPage + BreadcrumbList schema to /blog and /categories/* (1-2 hours)
5. Fix alt text `-- keywords:` artifact in generate-blog-images.js (30 min)

---

## TECHNICAL SEO: 72/100

### Critical
- `public/robots.txt` still exists, conflicts with `app/robots.ts`. Crawlers may see wrong rules, missing admin/API disallow.
- Mixed-case URL slug `/blog/How-to-make-candles-at-home-a-beginners-guide`. Google treats different case as separate URLs.

### High
- No `async redirects()` in next.config.js. Cannot 301 redirect consolidated/renamed content.
- No `<link rel="preconnect">` hints for `res.cloudinary.com` or `www.googletagmanager.com`. +300-500ms LCP on mobile.
- Homepage carousel uses native `<img>`, not Next.js `<Image>` with priority. Poor LCP.
- Blog content images bypass Next.js optimization (no lazy load, no srcSet, no WebP).

### Medium
- Missing Content-Security-Policy header.
- Stale sitemap lastModified dates (homepage shows 2024-01-15).
- OG image dimensions 1200x630 but actual images are 1000x1500 portrait (Pinterest pins).
- Hallway category missing from `categoryMapping`, returns 404.
- Bootstrap/react-bootstrap still in package.json dependencies.
- llms.txt outdated (2026-03-12), missing 13+ recent posts.

### Pass
- All AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, etc.)
- SSR with ISR working correctly across all page types.
- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- Structured data comprehensive on blog posts.
- GA4/AdSense loaded with `afterInteractive` strategy.

---

## CONTENT QUALITY & E-E-A-T: 62/100

### Quality Split
The site has a **stark quality divide** between content eras:
- **2026 posts (8 posts):** Score ~80/100. First-person anecdotes, sourced statistics (tier 1-2), SVG charts, FAQ sections, TL;DR boxes, 8-9 internal links per post.
- **2025 posts (~45 posts):** Score ~55/100. No first-person voice, vague/unverifiable citations (homepage-only links), no data visualizations, 0-2 internal links, potential AI detection flags.

### E-E-A-T Composite: 57/100
| Signal | Score | Notes |
|--------|-------|-------|
| Experience | 58 | Strong in 2026 posts, absent in 2025 posts |
| Expertise | 60 | Good citations in new posts, weak in old |
| Authoritativeness | 45 | No backlinks, no press, no external recognition |
| Trustworthiness | 65 | HTTPS, privacy policy, affiliate disclosure present |

### CRITICAL: Keyword Cannibalization

**Studio Apartment (7 posts, severe):**
1. `/how-to-decorate-studio-apartment`
2. `/how-do-you-decorate-a-studio-apartment-studio-apartment-ideas`
3. `/the-art-of-studio-living-guide`
4. `/how-to-decorate-a-studio-apartment-an-experts-guide`
5. `/3-flawless-layouts-for-narrow-rooms-and-5-real-life-studio-solutions`
6. `/studio-apartment-hack-10-cloffice-wfh-nook-ideas-that-save-space`
7. `/how-to-layout-a-small-apartment-plans-for-studios-narrow-rooms`

Posts 1-4 target virtually identical intent. All self-canonicalized. Google splits authority, none rank well.

**Halloween (4 posts, moderate):** Seasonal overlap, less damaging.

**Kitchen (8 posts, low-moderate):** Some have distinct angles but posts 1, 3, 5, 6 overlap heavily.

### Content Freshness
- Older posts (July 2025) have no `dateModified` signal. sitemap.ts uses `post.date` as lastModified.
- `updatedAt` field in Firestore is still a TODO (noted in MEMORY.md).
- Statistics in 2025 posts reference 2022-2023 data without update.

### Missing Author Bio Box
No visible author bio card on blog posts. Author name appears as small text with no photo, credentials, or link to /about page. This is the single highest-impact E-E-A-T fix.

---

## ON-PAGE SEO: 71/100

### Title Tags (7/10)
- Suffix ` | CleverSpaceSolutions` (23 chars) pushes many titles over 60 chars.
- Blog index title too thin: "Blog | CleverSpaceSolutions" (28 chars).
- Category titles too thin: "Kitchen - CleverSpaceSolutions" (30 chars).
- Some post titles hit 96-99 chars with suffix, severely truncated in SERPs.

### Meta Descriptions (7.5/10)
- Blog index description 181 chars (over limit).
- Category descriptions ~73 chars (too short, no CTA).
- Newer posts well-optimized (120-160 chars).

### Internal Linking (8/10)
- Newer posts: 8-9 contextual links. Excellent.
- Older posts: 0-2 links. ~30 posts are effectively link-orphaned.
- Tags displayed but NOT linked. No `/tags/[tag]/` pages exist.
- No /blog link in main header navigation.
- `getRelatedPosts()` now active (fixed this session).

### Canonical/Cannibalization (5/10)
- All 4 studio apartment posts self-canonicalized. Severe.
- Kitchen posts have moderate overlap.
- No cross-canonical strategy in place.

### Image SEO (5.5/10)
- Alt text contains `-- keywords: "..."` artifact from generate-blog-images.js.
- In-content images are raw `<img>` tags (no lazy loading, no srcSet).
- Older posts have missing/empty alt attributes.
- Cloudinary URLs use random filenames, not SEO-friendly.

### URL Structure (7/10)
- Capital H in candle guide URL.
- Several slugs exceed 60 chars.
- `2025-decorating-tips-for-small-kitchens` bakes year into URL.

---

## SCHEMA & STRUCTURED DATA: 72/100

### Implemented (Good)
| Schema | Page | Status |
|--------|------|--------|
| Organization | Global (layout.tsx) | Good -- logo, sameAs, contact |
| WebSite | Global (layout.tsx) | Basic -- missing publisher |
| BlogPosting | Blog posts | Excellent -- headline, author w/ expertise, dates, wordCount |
| BreadcrumbList | Blog posts, Paint calculator | Complete |
| FAQPage | Blog posts, Paint calculator | **Should be REMOVED** (restricted since Aug 2023) |
| Person | About page | Basic -- missing jobTitle, knowsAbout vs blog post version |
| WebApplication | Paint calculator | Good -- free offer, features |

### Missing
| Schema | Page | Priority |
|--------|------|----------|
| CollectionPage | /blog | HIGH |
| BreadcrumbList | /blog, /categories/* | HIGH |
| CollectionPage | /categories/* | HIGH |
| ItemList | Homepage featured posts | MEDIUM |
| speakable | Blog posts | MEDIUM (AI citation targeting) |
| HowTo | Step-by-step posts | LOW |

### Key Issue
**FAQPage schema should be removed.** Since August 2023, Google restricts FAQ rich results to government/healthcare authority sites only. CleverSpaceSolutions is neither. The schema won't generate rich results and may cause Search Console warnings.

---

## PERFORMANCE (CWV): 60/100

### LCP Concerns
- No preconnect hints for critical origins (Cloudinary, GTM).
- Homepage carousel: native `<img>`, no `fetchpriority="high"`.
- Two Google fonts loaded (Inter + Cormorant_Garamond with multiple weights).
- Blog in-content images are full-resolution, no responsive sizing.

### INP: PASS
- SSR with ISR, minimal client-side JS.
- No heavy event handlers detected.

### CLS Concerns
- Blog featured image `object-contain` may cause layout shift on mobile (4:5 vs 16:9 switch).
- BlogCard images missing `sizes` attribute.

---

## AI SEARCH READINESS (GEO): 62/100

Full analysis in GEO-ANALYSIS.md. Key points:

| Platform | Score | Biggest Gap |
|----------|-------|-------------|
| Google AI Overviews | 72/100 | Question-based headings needed |
| ChatGPT | 35/100 | Zero Reddit/Wikipedia/YouTube presence |
| Perplexity | 30/100 | Zero Reddit presence |
| Bing Copilot | 65/100 | Missing IndexNow |

**Brand mentions correlate 3x more with AI visibility than backlinks** (Ahrefs Dec 2025). The site has ZERO presence on Reddit, YouTube, Wikipedia, or LinkedIn. This is the #1 bottleneck for AI search citation.

---

## PRIORITIZED ACTION PLAN

### Phase 1: Critical Fixes (This Week)

| # | Action | File(s) | Time | Impact |
|---|--------|---------|------|--------|
| 1 | Delete `public/robots.txt` | `public/robots.txt` | 2 min | Crawlability conflict resolved |
| 2 | Add `async redirects()` to next.config.js | `next.config.js` | 30 min | Enable content consolidation, fix capital H URL |
| 3 | Add `<link rel="preconnect">` for Cloudinary/GTM | `app/layout.tsx` | 5 min | 200-400ms LCP improvement |
| 4 | Fix alt text `-- keywords:` artifact | `scripts/generate-blog-images.js` | 30 min | Image SEO + accessibility |
| 5 | Remove FAQPage schema | `app/blog/[slug]/page.tsx`, paint calculator | 15 min | Avoid Search Console warnings |

### Phase 2: High-Impact Changes (This Month)

| # | Action | Impact |
|---|--------|--------|
| 6 | **Consolidate 4 studio apartment posts** into 1 pillar + 301 redirects | Biggest single SEO win |
| 7 | Add author bio box to blog post template | Highest-impact E-E-A-T signal |
| 8 | Add CollectionPage + BreadcrumbList schema to /blog and /categories/* | Schema completeness |
| 9 | Enrich title tags (blog index, categories, cap seoTitle to 37 chars) | Better SERP presentation |
| 10 | Update llms.txt with all 53 posts + author expertise section | AI crawler discovery |
| 11 | Align Person schema on /about with BlogPosting author schema | E-E-A-T consistency |
| 12 | Add `loading="lazy"` to in-content images via lib/blog.ts post-processor | Performance |

### Phase 3: Content Improvements (This Quarter)

| # | Action | Impact |
|---|--------|--------|
| 13 | Add 5-8 internal links to each of the ~30 older posts | Internal link equity |
| 14 | Rewrite 5 oldest posts with 2026 editorial standard (first-person, sourced stats, SVG, FAQ) | Content freshness + E-E-A-T |
| 15 | Create `/tags/[tag]/` pages | 20-30 new topical hub pages |
| 16 | Consolidate Halloween posts (4 to 2) | Remove moderate cannibalization |
| 17 | Expand category descriptions and meta descriptions | On-page SEO |
| 18 | Add homepage text content (500+ words) | Thin content fix |
| 19 | Start Reddit presence (r/interiordesign, r/ApartmentHacks) | AI citations (Perplexity, ChatGPT) |
| 20 | Create YouTube channel with 5 slideshow videos | Strongest AI visibility signal |

### Phase 4: Long-term (Backlog)

| # | Action |
|---|--------|
| 21 | Implement Content-Security-Policy header |
| 22 | Add `updatedAt` to Firestore posts for dateModified |
| 23 | Remove Bootstrap/react-bootstrap from package.json |
| 24 | Switch to domain email (hello@cleverspacesolutions.com) |
| 25 | Create "How We Research" editorial standards page |
| 26 | Implement IndexNow for instant Bing/Yandex indexing |
| 27 | Create original survey ("2026 Small Apartment Living Report") |
| 28 | Build proper 1200x630 OG images for social sharing |

---

## Changes Already Made This Session (2026-04-11)

- [x] `getLatestPosts()` replaced with `getRelatedPosts()` (category + tag scoring)
- [x] `seoTitle`/`seoDescription` now used in meta tags (was ignored)
- [x] `keywords` field from Firestore now used in meta tags
- [x] `BlogPost` interface extended with seo fields
- [x] Author schema enhanced: jobTitle, knowsAbout, affiliation added
- [x] BLOG-QUEUE.md updated with 18 cluster-data-driven topics
- [x] GEO-ANALYSIS.md updated with full AI search readiness audit
- [x] Full audit report compiled from 4 specialist agents

---

## Score Comparison

| Metric | March 2026 | April 2026 | Change |
|--------|-----------|-----------|--------|
| Overall SEO | 69/100 | 67/100 | -2 (stricter criteria, more issues found) |
| GEO Readiness | 54/100 | 62/100 | +8 |
| Schema | ~65/100 | 72/100 | +7 |
| Content (new posts) | N/A | ~80/100 | New benchmark |
| Content (old posts) | N/A | ~55/100 | Identified as drag |
