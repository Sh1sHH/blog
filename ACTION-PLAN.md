# CleverSpaceSolutions — SEO Action Plan
**Generated:** March 11, 2026
**Overall Score:** 69 / 100

---

## CRITICAL — Fix Immediately (Penalty Risk)

### C1. Remove Fabricated AggregateRating from Paint Calculator Schema
**File:** `app/tools/paint-calculator/page.tsx`
**Risk:** Google manual action, removal from rich results
**Fix:** Delete the `aggregateRating` block from `jsonLdApp`. Only use AggregateRating if you implement a real user review system.
```diff
// Remove this block entirely from jsonLdApp:
- "aggregateRating": {
-   "@type": "AggregateRating",
-   "ratingValue": "4.8",
-   "ratingCount": "127",
-   "bestRating": "5",
-   "worstRating": "1",
- },
```
**Estimated fix time:** 5 minutes

---

### C2. Fix Dual robots.txt Conflict
**File:** Delete `public/robots.txt`
**Risk:** Admin and API routes are crawlable by all bots
**Fix:**
1. Delete `public/robots.txt`
2. Add AI crawler rules to `app/robots.ts`:
```typescript
rules: [
  {
    userAgent: '*',
    allow: ['/', '/_next/image*', '/_next/static/'],
    disallow: ['/admin/', '/api/', '/test-login/'],
  },
  { userAgent: 'GPTBot', allow: '/' },
  { userAgent: 'OAI-SearchBot', allow: '/' },
  { userAgent: 'ClaudeBot', allow: '/' },
  { userAgent: 'PerplexityBot', allow: '/' },
  { userAgent: 'GoogleOther', allow: '/' },
  { userAgent: 'Applebot-Extended', allow: '/' },
  { userAgent: 'Bytespider', allow: '/' },
],
```
**Estimated fix time:** 10 minutes

---

### C3. Fix or Remove SearchAction from WebSite Schema
**File:** `app/layout.tsx`
**Risk:** Google sees broken SearchAction, potential loss of sitelinks search box
**Option A (Quick):** Remove `potentialAction` from `websiteJsonLd`
**Option B (Better):** Build a `/search` page with full-text search
**Estimated fix time:** 5 minutes (Option A)

---

## HIGH — Fix This Week

### H1. Add H1 Tag to Homepage
**File:** `app/page.tsx`
**Issue:** Homepage has no `<h1>`. The rotating text is in an `<h2>`.
**Fix:** Add a visually styled (can be screen-reader only or visible) `<h1>` to the hero section:
```tsx
<h1 className="sr-only">CleverSpaceSolutions — Small Space Organization & Decor Ideas</h1>
```
Or make the existing "Discover your next clever space idea" heading an `<h1>`.
**Estimated fix time:** 15 minutes

---

### H2. Add /contact to Sitemap
**File:** `app/sitemap.ts`
**Fix:** Add to `staticPages`:
```typescript
{
  url: `${BASE_URL}/contact`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
},
```
**Estimated fix time:** 5 minutes

---

### H3. Fix OG Images for About and Contact Pages
**File:** `app/about/page.tsx`, `app/contact/page.tsx`
**Fix:** Add OG image to both pages' metadata:
```typescript
openGraph: {
  ...existing,
  images: [{ url: '/images/navbar/logo2.webp', width: 1200, height: 630, alt: '...' }],
},
twitter: {
  card: 'summary_large_image',
  title: '...',
  description: '...',
  images: ['/images/navbar/logo2.webp'],
},
```
**Better:** Create proper 1200×630 branded images for each page.
**Estimated fix time:** 30 minutes

---

### H4. Add BreadcrumbList Schema to Blog Posts
**File:** `app/blog/[slug]/page.tsx`
**Fix:** Add breadcrumb JSON-LD alongside existing BlogPosting schema:
```typescript
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cleverspacesolutions.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://cleverspacesolutions.com/blog" },
    { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://cleverspacesolutions.com/blog/${post.slug}` },
  ],
};
```
**Estimated fix time:** 15 minutes

---

### H5. Fix AdSense Script Loading
**File:** `app/layout.tsx`
**Issue:** Raw `<script>` tag in `<head>` for AdSense — blocks rendering
**Fix:** Replace with Next.js Script component:
```tsx
import Script from 'next/script';

<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6430440480434971"
  strategy="afterInteractive"
  crossOrigin="anonymous"
/>
```
**Estimated fix time:** 5 minutes

---

### H6. Fix Brand Name Inconsistency
**Files:** `app/about/page.tsx`, `app/contact/page.tsx`
**Issue:** Title tags use "CleverSpace Solutions" (with space) vs "CleverSpaceSolutions" (no space)
**Fix:** Standardize all title tags and descriptions to use "CleverSpaceSolutions" (no space)
**Estimated fix time:** 10 minutes

---

## MEDIUM — Fix Within 1 Month

### M1. Remove Bootstrap / react-bootstrap
**File:** `package.json`
**Issue:** Both Bootstrap and Tailwind CSS are loaded — ~400KB of redundant CSS
**Fix:** Audit all components using Bootstrap classes and replace with Tailwind equivalents. Then remove:
```bash
npm uninstall bootstrap react-bootstrap
```
**Estimated fix time:** 2-4 hours depending on Bootstrap usage

---

### M2. Move TinyMCE to Admin-Only Bundle
**File:** `package.json`
**Issue:** `@tinymce/tinymce-react` and `tinymce` are in production `dependencies`, loading the editor on all pages
**Fix:** Dynamic import only in `/admin` routes:
```typescript
const TinyMCEEditor = dynamic(() => import('@tinymce/tinymce-react'), { ssr: false });
```
**Estimated fix time:** 30 minutes

---

### M3. Add sameAs and Email to Organization Schema
**File:** `app/layout.tsx`
**Fix:**
```typescript
const organizationJsonLd = {
  ...existing,
  "email": "cleverspacesolutions@gmail.com",
  "sameAs": [
    "https://pinterest.com/cleverspacesolutions/",
    "https://www.instagram.com/cleverspacesolutions/",
    "https://www.tiktok.com/@cleverspacesolutions"
  ]
};
```
**Estimated fix time:** 10 minutes

---

### M4. Add dateModified Field to Blog Posts
**Files:** `lib/blog.ts`, `lib/firebase-db.ts`
**Issue:** `dateModified` in BlogPosting schema equals `datePublished`
**Fix:** Store `updatedAt` timestamp in Firestore for each post and expose it in the BlogPost interface. Update schema to use `updatedAt` for `dateModified`.
**Estimated fix time:** 1 hour

---

### M5. Replace Category Card `<img>` Tags with `<Image>`
**File:** `app/page.tsx` (homepage, category card section)
**Fix:**
```tsx
import Image from 'next/image';
// Replace:
<img src={cat.image} alt={cat.name} className="..." />
// With:
<Image src={cat.image} alt={cat.name} fill className="object-cover ..." />
```
**Estimated fix time:** 20 minutes

---

### M6. Add noindex to Empty Category Pages
**File:** `app/categories/[category]/page.tsx`
**Fix:** When `categoryPosts.length === 0`, add noindex:
```typescript
if (categoryPosts.length === 0) {
  return { robots: 'noindex, follow' };
}
```
Or in the page component, conditionally add `<meta name="robots" content="noindex">`.
**Estimated fix time:** 15 minutes

---

### M7. Improve Blog Page Meta Description
**File:** `app/blog/page.tsx`
**Current:** Generic description
**Improved:**
```
"Practical guides, decoration ideas, and space-saving tips for small homes. Browse storage solutions, kitchen organization, and room makeover articles by the CleverSpaceSolutions team."
```
**Estimated fix time:** 5 minutes

---

### M8. Fix Sitemap lastModified for Static Pages
**File:** `app/sitemap.ts`
**Issue:** All static pages use `new Date()` as lastModified
**Fix:** Use hardcoded dates for static pages that rarely change:
```typescript
{ url: `${BASE_URL}/about`, lastModified: new Date('2024-01-15'), ... },
{ url: `${BASE_URL}/contact`, lastModified: new Date('2024-06-01'), ... },
```
**Estimated fix time:** 10 minutes

---

### M9. Update llms.txt
**File:** `public/llms.txt`
**Issue:** Outdated (Nov 2025) and lists only 1 blog post
**Fix:** Update the date and add links to all published blog posts. Regenerate monthly.
**Estimated fix time:** 30 minutes

---

## LOW — Backlog

### L1. Add Person Schema to About Page
Add `Person` JSON-LD on `/about` for better E-E-A-T entity recognition.

### L2. Add Security Headers to next.config.js
Add `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` via the `headers()` function.

### L3. Plan Next.js Version Upgrade
Plan upgrade path: 13.5.1 → 14.x → 15.x
Check breaking changes, especially App Router changes and Firebase integration.

### L4. Create Proper OG Images (1200×630)
Create branded social sharing images for: Homepage, About, Blog index.

### L5. Create a /search Page
Implement full-text search (could use Firestore text search or a simple client-side filter) and properly connect the WebSite SearchAction schema.

### L6. Add FAQ Schema to Blog Posts
For blog posts that include Q&A sections, dynamically extract and inject FAQPage schema to increase rich result eligibility.

### L7. Fix Category URL Canonical for /blog?category= Filter
When the blog page is filtered via `?category=`, ensure the canonical either points to the category page or add `noindex` for the filtered variant.

### L8. Remove Turkish Category Slug Aliases (when safe)
After confirming no traffic to Turkish slugs via Google Search Console, remove `pratik-bilgiler`, `dekorasyon`, `hediyelik-esyalar` from the category mapping.

---

## Priority Summary

| Priority | # Items | Est. Time |
|----------|---------|-----------|
| Critical | 3 | ~20 min |
| High | 6 | ~80 min |
| Medium | 9 | ~8 hours |
| Low | 8 | ongoing |

**Recommended Week 1 Focus:**
Complete all Critical + High items = ~100 minutes of work → immediate score improvement to ~78/100
