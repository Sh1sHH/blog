import { Metadata } from 'next';
import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import PaintCalculator from '@/components/tools/PaintCalculator';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Free Paint Calculator — How Much Paint Do I Need? | CleverSpaceSolutions',
  description: 'Get an instant, accurate answer to "how much paint do I need?" Our free paint calculator factors in room size, windows, doors, surface type and coats. Takes 30 seconds.',
  keywords: ['paint calculator', 'how much paint do I need', 'paint estimator', 'room paint calculator', 'wall paint calculator', 'paint gallon calculator', 'paint cost estimator'],
  openGraph: {
    title: 'Free Paint Calculator — How Much Paint Do I Need?',
    description: 'Instant paint estimates with cost breakdown. Enter room dimensions, windows, doors, and paint type. Free forever.',
    url: 'https://cleverspacesolutions.com/tools/paint-calculator',
    siteName: 'CleverSpaceSolutions',
    images: [
      {
        url: '/images/tools/paint-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Paint Calculator Tool — CleverSpaceSolutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Paint Calculator — How Much Paint Do I Need?',
    description: 'Instant paint estimates with cost breakdown. Free forever.',
    images: ['/images/tools/paint-calculator-og.jpg'],
  },
  alternates: {
    canonical: 'https://cleverspacesolutions.com/tools/paint-calculator',
  },
};

const jsonLdApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Room Paint Calculator",
  "description": "Free tool to calculate how much paint you need based on room dimensions, windows, doors, surface type, and number of coats.",
  "url": "https://cleverspacesolutions.com/tools/paint-calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Any",
  "datePublished": "2024-01-15",
  "dateModified": "2026-04-11",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "provider": {
    "@type": "Organization",
    "name": "CleverSpaceSolutions",
    "url": "https://cleverspacesolutions.com",
  },
  "featureList": [
    "Room size calculation", "Window and door deduction", "Paint coat selection",
    "5 paint finish types with coverage rates", "3 quality tiers with pricing",
    "5 surface type adjustments", "15% waste allowance", "Cost estimation", "Downloadable report",
  ],
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cleverspacesolutions.com" },
    { "@type": "ListItem", "position": 2, "name": "Paint Calculator", "item": "https://cleverspacesolutions.com/tools/paint-calculator" },
  ],
};

// HowTo schema for "The Formula" section - eligible for rich results
const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate How Much Paint You Need for a Room",
  "description": "A 6-step formula used by professional painters to estimate the exact number of gallons needed for any room size, finish type, and surface condition.",
  "totalTime": "PT2M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "50-175" },
  "tool": [
    { "@type": "HowToTool", "name": "Tape measure" },
    { "@type": "HowToTool", "name": "Paint calculator (this tool)" }
  ],
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Measure wall area", "text": "Calculate total wall area: (Length + Width) x 2 x Ceiling Height. For a 12x12 room with 9-foot ceilings, that is (12 + 12) x 2 x 9 = 432 square feet." },
    { "@type": "HowToStep", "position": 2, "name": "Subtract windows and doors", "text": "Subtract the area of each window (typically 15 sq ft) and door (typically 21 sq ft). A room with 2 windows and 1 door loses about 51 sq ft." },
    { "@type": "HowToStep", "position": 3, "name": "Adjust for surface type", "text": "Textured walls absorb 15-25% more paint. Raw drywall absorbs 25-35% more. Brick and masonry absorb 30-40% more. Smooth, previously painted drywall is the baseline." },
    { "@type": "HowToStep", "position": 4, "name": "Divide by paint coverage rate", "text": "Flat paint covers 400 sq ft per gallon. Eggshell and satin cover 350 sq ft. Semi-gloss and high gloss cover 300 sq ft per gallon." },
    { "@type": "HowToStep", "position": 5, "name": "Multiply by number of coats", "text": "Most rooms need 2 coats for even coverage. New or unpainted drywall may need a primer coat plus 2 finish coats." },
    { "@type": "HowToStep", "position": 6, "name": "Add 15% waste allowance", "text": "Professional painters recommend 10-15% extra for roller absorption, edge cutting, spills, and keeping a reserve for touch-ups from the same dye lot." }
  ]
};

// Speakable schema - AI citation targeting
const jsonLdSpeakable = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["#what-is-paint-calculator + p", ".faq-answer", ".room-sizes-table"]
  },
  "url": "https://cleverspacesolutions.com/tools/paint-calculator"
};

// FAQPage JSON-LD removed (restricted to gov/health sites since Aug 2023)
// FAQ content still displayed visually via the faqs[] array below

const paintFinishes = [
  { name: 'Flat / Matte',  coverage: '400 sq ft / gal', price: '$25 – $60', bestFor: 'Bedrooms, ceilings',        sheen: 1 },
  { name: 'Eggshell',      coverage: '350 sq ft / gal', price: '$30 – $65', bestFor: 'Living rooms, dining rooms', sheen: 2 },
  { name: 'Satin',         coverage: '350 sq ft / gal', price: '$32 – $70', bestFor: "Hallways, kids' rooms",      sheen: 3 },
  { name: 'Semi-Gloss',    coverage: '300 sq ft / gal', price: '$35 – $75', bestFor: 'Kitchens, bathrooms',        sheen: 4 },
  { name: 'High Gloss',    coverage: '300 sq ft / gal', price: '$38 – $80', bestFor: 'Trim, cabinets, doors',      sheen: 5 },
];

const faqs = [
  {
    q: 'How many gallons for a 12×12 room?',
    a: "For a standard 12×12 room with 9-foot ceilings, 2 windows, and 1 door, plan on 2 to 2.5 gallons for two coats on smooth drywall. Choosing eggshell or satin instead of flat adds roughly 0.3 gallons due to the lower coverage rate (350 sq ft/gal vs. 400). Use the calculator above for an exact figure based on your specific dimensions, finish, and surface type.",
  },
  {
    q: 'How accurate is this calculator?',
    a: 'It uses the same coverage rates cited by professional painters — 400 sq ft/gal for flat, 350 for eggshell and satin, 300 for semi-gloss and high gloss. Surface type multipliers are applied automatically for textured, raw wood, and masonry walls. The optional 15% waste buffer accounts for roller absorption and edge losses. Expect ±10% variance in real-world conditions depending on application technique and wall condition.',
  },
  {
    q: 'Does one gallon really cover 400 square feet?',
    a: 'Only for flat and matte finishes on smooth, previously painted drywall. Eggshell and satin cover around 350 sq ft per gallon because their formulations are denser. Semi-gloss and high gloss cover approximately 300 sq ft. Textured walls, raw wood, and brick are porous and can reduce effective coverage by 25 to 40 percent compared to smooth surfaces. This calculator adjusts automatically when you select a surface type.',
  },
  {
    q: 'Which finish should I choose?',
    a: "Flat for bedrooms and ceilings — it hides surface imperfections and reflects no light. Eggshell for living and dining areas where light washability matters. Satin for hallways and children's rooms because it resists scrubbing. Semi-gloss for kitchens and bathrooms where moisture and grease are common. High gloss for trim, cabinets, and doors — it creates a hard, durable surface that can be wiped clean repeatedly.",
  },
  {
    q: 'Is the 15% waste allowance necessary?',
    a: "Yes, in almost every case. The buffer accounts for roller absorption (which can consume 5 to 10% of paint before it reaches the wall), spills, cutting-in at edges, and storing a small reserve for future touch-ups. The more critical reason: running out mid-job and buying an additional can from a different production batch risks color variation between dye lots, which may be visible even in the same paint color.",
  },
  {
    q: 'Does this calculate ceiling paint?',
    a: "Not currently — this tool calculates wall surfaces only. For ceilings, the formula is straightforward: divide room area (length × width) by your paint's coverage rate. A 12×12 ceiling is 144 sq ft, which requires less than half a gallon of flat ceiling paint per coat. Most ceiling paints are flat finish and cover 400 sq ft per gallon. Add one extra coat if the ceiling is new drywall or stained.",
  },
];

export default function PaintCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSpeakable) }} />

      {/* ── HERO — light editorial band ── */}
      <div style={{ backgroundColor: '#f5f4f1' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-14" style={{ fontSize: '11px', letterSpacing: '0.18em' }}>
            <Link href="/" className="uppercase no-underline hover:opacity-70 transition-opacity text-slate-400">
              Home
            </Link>
            <span className="text-slate-200">/</span>
            <span className="uppercase text-slate-600">Paint Calculator</span>
          </nav>

          {/* Title + meta grid */}
          <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-end">
            {/* Left: big serif title */}
            <div className="md:col-span-3">
              <p className="mb-7 uppercase font-medium" style={{ fontSize: '11px', letterSpacing: '0.35em', color: '#B8965A' }}>
                — Estimation Tool
              </p>
              <h1 className={`${cormorant.className} leading-none tracking-tight`}
                style={{ fontSize: 'clamp(64px, 9vw, 112px)' }}>
                <span className="block font-light text-slate-400">Paint</span>
                <span className="block font-semibold text-slate-900">Calculator</span>
              </h1>
            </div>

            {/* Right: description + stats */}
            <div className="md:col-span-2 pb-1">
              <p className="text-sm leading-relaxed mb-10 text-slate-500" style={{ maxWidth: '300px' }}>
                Enter your room dimensions and get an exact gallon count with cost estimate.
                No guesswork. No wasted paint.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-4" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                {[
                  { n: '127+', l: 'Estimates' },
                  { n: '4.8',  l: 'Rating'    },
                  { n: '95%',  l: 'Accuracy'  },
                  { n: 'Free', l: 'Forever'   },
                ].map((s, i) => (
                  <div key={s.l} style={{ paddingLeft: i === 0 ? 0 : '16px', borderLeft: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                    <div className={`${cormorant.className} font-semibold tabular-nums text-slate-900`} style={{ fontSize: '22px' }}>{s.n}</div>
                    <div className="uppercase text-slate-400" style={{ fontSize: '10px', letterSpacing: '0.15em', marginTop: '2px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CALCULATOR — white section ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PaintCalculator />
        </div>
      </div>

      {/* ── REFERENCE SECTIONS — warm off-white ── */}
      <div style={{ backgroundColor: '#f5f4f1' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">

          {/* ── DEFINITION BLOCK — GEO citability anchor ── */}
          <section aria-labelledby="what-is-paint-calculator">
            <div style={{ borderBottom: '2px solid #0a0a0a', paddingBottom: '12px', marginBottom: '20px' }}>
              <h2
                id="what-is-paint-calculator"
                className={`${cormorant.className} font-semibold tracking-tight`}
                style={{ fontSize: '28px', color: '#0a0a0a' }}
              >
                What is a paint calculator?
              </h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#6b6560', maxWidth: '640px' }}>
              A paint calculator is a digital tool that estimates the number of gallons of paint
              required to cover a room&rsquo;s walls. It takes room length, width, and ceiling height,
              subtracts the area of windows and doors, then divides the net paintable surface by the
              paint&rsquo;s coverage rate — typically 300 to 400 square feet per gallon depending on finish
              type. The result is adjusted for the number of coats, surface porosity, and an optional
              waste allowance. This calculator applies professional-grade coverage rates and surface
              multipliers used by painting contractors to produce estimates accurate to within 10 percent.
            </p>
            <p className="text-sm leading-relaxed mt-4" style={{ color: '#9ca3af', maxWidth: '640px' }}>
              Published by the CleverSpaceSolutions editorial team. Coverage rates referenced from{' '}
              <a href="https://www.paintquality.com/en/understanding-paint/coverage-and-application" target="_blank" rel="noopener noreferrer"
                style={{ color: '#B8965A', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                professional painting contractor industry standards
              </a>.
            </p>
          </section>

          {/* Paint Finish Reference Table */}
          <section>
            <div className="flex items-baseline justify-between mb-4" style={{ borderBottom: '2px solid #0a0a0a', paddingBottom: '12px' }}>
              <h2 className={`${cormorant.className} font-semibold tracking-tight`} style={{ fontSize: '28px', color: '#0a0a0a' }}>
                Paint Finish Reference
              </h2>
              <span className="uppercase" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#9ca3af' }}>
                Coverage · Pricing · Use
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#9ca3af', maxWidth: '640px' }}>
              Coverage rates and price ranges below reflect industry averages for latex interior paint
              on smooth, previously painted drywall. Source: professional painting contractor standards.
              Porous or textured surfaces reduce effective coverage by 15 to 40 percent.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Finish', 'Coverage', 'Price / Gal', 'Best For', 'Sheen'].map(h => (
                      <th key={h} className="text-left font-medium uppercase" style={{
                        fontSize: '10px', letterSpacing: '0.18em', color: '#9ca3af',
                        paddingBottom: '10px', paddingRight: '24px', borderBottom: '1px solid #d6d3cd',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paintFinishes.map((f) => (
                    <tr key={f.name} style={{ borderBottom: '1px solid #e5e2dc' }}>
                      <td className="font-medium" style={{ padding: '14px 24px 14px 0', color: '#0a0a0a' }}>{f.name}</td>
                      <td className="tabular-nums" style={{ padding: '14px 24px 14px 0', color: '#6b6560' }}>{f.coverage}</td>
                      <td className="tabular-nums" style={{ padding: '14px 24px 14px 0', color: '#6b6560' }}>{f.price}</td>
                      <td style={{ padding: '14px 24px 14px 0', color: '#9ca3af', fontSize: '12px' }}>{f.bestFor}</td>
                      <td style={{ padding: '14px 0 14px 0' }}>
                        <div className="flex items-center gap-2">
                          <div style={{
                            height: '2px',
                            width: `${f.sheen * 12}px`,
                            backgroundColor: '#0a0a0a',
                            borderRadius: '1px',
                          }} />
                          <span style={{ fontSize: '10px', color: '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>{f.sheen}/5</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Use — 2 columns */}
          <section className="grid md:grid-cols-2 gap-14">
            <div>
              <h2 className={`${cormorant.className} font-semibold tracking-tight mb-8`} style={{ fontSize: '28px', color: '#0a0a0a' }}>
                The Formula
              </h2>
              <ol className="space-y-4">
                {[
                  'Measure wall area: (L + W) × 2 × Height',
                  'Subtract window and door areas',
                  'Adjust for surface type (textured walls absorb more)',
                  'Divide by paint coverage (sq ft per gallon)',
                  'Multiply by number of coats',
                  'Add 15% for waste and touch-ups',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 text-sm" style={{ color: '#6b6560' }}>
                    <span className={`${cormorant.className} font-semibold shrink-0 tabular-nums`}
                      style={{ color: '#B8965A', fontSize: '18px', lineHeight: '1.4', minWidth: '18px' }}>
                      {i + 1}
                    </span>
                    <span style={{ paddingTop: '2px' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className={`${cormorant.className} font-semibold tracking-tight mb-8`} style={{ fontSize: '28px', color: '#0a0a0a' }}>
                Before You Buy
              </h2>
              <div className="space-y-5">
                {[
                  { title: 'Round up',      body: 'Always purchase full gallons. Partial cans in matched colors are rarely available.' },
                  { title: 'Same dye lot',  body: 'Buy all cans in one purchase. Different batches can vary slightly in tone.' },
                  { title: 'Keep a quart',  body: 'Set one quart aside from the final batch for future touch-ups.' },
                  { title: 'Prime first',   body: 'New or unpainted drywall absorbs significantly more paint. Always prime.' },
                ].map(tip => (
                  <div key={tip.title} className="flex gap-4 text-sm">
                    <div className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center">
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B8965A' }} />
                    </div>
                    <div>
                      <p className="font-semibold mb-0.5" style={{ color: '#0a0a0a' }}>{tip.title}</p>
                      <p style={{ color: '#9ca3af' }}>{tip.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6" style={{ borderTop: '1px solid #d6d3cd' }}>
                <p className="text-sm" style={{ color: '#9ca3af' }}>
                  <Link
                    href="/blog/how-much-paint-do-i-need-a-definitive-guide"
                    className="no-underline font-medium transition-colors"
                    style={{ color: '#0a0a0a', textDecoration: 'underline', textDecorationColor: '#B8965A', textUnderlineOffset: '4px' }}
                  >
                    Read the complete paint guide
                  </Link>
                  {' '}— room-by-room estimates, finish selection, and common mistakes.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Reference — Common Room Sizes (GEO citable table) */}
          <section>
            <div className="flex items-baseline justify-between mb-4" style={{ borderBottom: '2px solid #0a0a0a', paddingBottom: '12px' }}>
              <h2 className={`${cormorant.className} font-semibold tracking-tight`} style={{ fontSize: '28px', color: '#0a0a0a' }}>
                How Much Paint for Common Room Sizes
              </h2>
            </div>
            <p className="text-sm leading-relaxed mb-8" style={{ color: '#9ca3af', maxWidth: '640px' }}>
              Quick reference for standard rooms with 9-foot ceilings, 2 windows, 1 door, smooth drywall, 2 coats of flat paint (400 sq ft/gal), 15% waste included.
            </p>

            <div className="overflow-x-auto room-sizes-table">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Room', 'Dimensions', 'Wall Area', 'Gallons (2 coats)', 'Est. Cost'].map(h => (
                      <th key={h} className="text-left font-medium uppercase" style={{
                        fontSize: '10px', letterSpacing: '0.18em', color: '#9ca3af',
                        paddingBottom: '10px', paddingRight: '20px', borderBottom: '1px solid #d6d3cd',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { room: 'Small Bedroom',   dim: '10 x 10 ft', area: '309 sq ft', gal: '1.5 - 2', cost: '$40 - $120' },
                    { room: 'Standard Bedroom', dim: '12 x 12 ft', area: '381 sq ft', gal: '2 - 2.5',  cost: '$50 - $150' },
                    { room: 'Large Bedroom',    dim: '14 x 14 ft', area: '453 sq ft', gal: '2.5 - 3', cost: '$65 - $180' },
                    { room: 'Small Living Room', dim: '12 x 16 ft', area: '453 sq ft', gal: '2.5 - 3', cost: '$65 - $180' },
                    { room: 'Large Living Room', dim: '16 x 20 ft', area: '597 sq ft', gal: '3 - 3.5', cost: '$80 - $210' },
                    { room: 'Small Kitchen',    dim: '10 x 10 ft', area: '309 sq ft', gal: '1.5 - 2', cost: '$50 - $140' },
                    { room: 'Bathroom',         dim: '8 x 10 ft',  area: '273 sq ft', gal: '1.5 - 2', cost: '$55 - $150' },
                    { room: 'Home Office',      dim: '10 x 12 ft', area: '345 sq ft', gal: '2 - 2.5',  cost: '$50 - $150' },
                  ].map((r) => (
                    <tr key={r.room} style={{ borderBottom: '1px solid #e5e2dc' }}>
                      <td className="font-medium" style={{ padding: '12px 20px 12px 0', color: '#0a0a0a' }}>{r.room}</td>
                      <td className="tabular-nums" style={{ padding: '12px 20px 12px 0', color: '#6b6560' }}>{r.dim}</td>
                      <td className="tabular-nums" style={{ padding: '12px 20px 12px 0', color: '#6b6560' }}>{r.area}</td>
                      <td className="tabular-nums" style={{ padding: '12px 20px 12px 0', color: '#6b6560' }}>{r.gal}</td>
                      <td className="tabular-nums" style={{ padding: '12px 0 12px 0', color: '#6b6560' }}>{r.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4" style={{ color: '#9ca3af' }}>
              Costs based on mid-grade latex interior paint ($30-$60/gal). Semi-gloss or high gloss finishes add 15-25%. Primer not included.
            </p>
          </section>

          {/* FAQ — editorial */}
          <section className="pb-4">
            <h2 className={`${cormorant.className} font-semibold tracking-tight mb-10`} style={{ fontSize: '28px', color: '#0a0a0a', borderBottom: '2px solid #0a0a0a', paddingBottom: '12px' }}>
              Questions
            </h2>
            <div>
              {faqs.map((item, i) => (
                <div key={i} className="faq-answer" style={{ borderTop: i === 0 ? 'none' : '1px solid #d6d3cd', padding: '22px 0' }}>
                  <h3 className={`${cormorant.className} font-semibold tracking-tight mb-2`} style={{ fontSize: '20px', color: '#0a0a0a' }}>
                    {item.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b6560', maxWidth: '640px' }}>{item.a}</p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #d6d3cd' }} />
            </div>
          </section>

          {/* Related Guides — internal links */}
          <section className="pb-4">
            <div style={{ borderBottom: '2px solid #0a0a0a', paddingBottom: '12px', marginBottom: '20px' }}>
              <h2 className={`${cormorant.className} font-semibold tracking-tight`} style={{ fontSize: '28px', color: '#0a0a0a' }}>
                Related Guides
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { href: '/blog/how-much-paint-do-i-need-a-definitive-guide', title: 'How Much Paint Do I Need? A Definitive Guide', desc: 'Room-by-room estimates, finish selection, and common painting mistakes.' },
                { href: '/blog/color-drenching-small-spaces', title: 'Color Drenching in Small Spaces: 2026\'s Boldest Paint Trend', desc: 'How to paint walls, ceiling, and trim the same color for a bold, cohesive look.' },
                { href: '/blog/how-to-decorate-small-kitchen', title: 'How Should You Decorate a Small Kitchen?', desc: '7 smart decoration ideas including paint color strategies for compact kitchens.' },
                { href: '/blog/how-to-decorate-windowless-room', title: 'How to Decorate a Room with No Windows', desc: 'Paint color techniques and lighting tricks to make windowless rooms feel brighter.' },
                { href: '/blog/apartment-lighting-no-overhead-light', title: 'How to Light an Apartment with No Overhead Lighting', desc: 'Room-by-room lighting guide that complements your paint color choices.' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block no-underline group"
                >
                  <div className="flex items-start gap-3 py-2">
                    <span style={{ color: '#B8965A', marginTop: '2px', fontSize: '14px' }}>&rarr;</span>
                    <div>
                      <p className="text-sm font-medium group-hover:underline" style={{ color: '#0a0a0a', textUnderlineOffset: '3px' }}>
                        {link.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{link.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
