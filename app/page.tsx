import Link from 'next/link';
import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import HomeBlogSection from "@/components/blog/HomeBlogSection";
import HomeCarousel from "@/components/ui/carousel";
import RotatingText from "@/components/ui/rotating-text";
import PracticalTips from "@/components/PracticalTips";
import DecorationSection from "@/components/DecorationSection";
import GiftItems from "@/components/GiftItems";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollArrow from '@/components/ui/scroll-arrow';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Vercel ISR: Sayfayı her 30 dakikada bir yeniden generate et (günde 1 yazı için optimize)
export const revalidate = 1800;

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();
  
  // Filter by English category names - exclude from "Get your next weeknight dinner idea" section
  const filteredPosts = allPosts.filter(post => 
    post.category !== 'Practical Tips' && 
    post.category !== 'Decoration' && 
    post.category !== 'Gift Items'
  );

  return (
    <main className="min-h-screen">
      <h1 className="sr-only">CleverSpaceSolutions — Small Space Organization, Decoration &amp; Storage Ideas</h1>
      {/* Hero Section - Pinterest Style Layout */}
      <section className="container mx-auto px-4 py-12">
        {/* Editorial section label */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400 shrink-0">Latest &amp; Featured</h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column - Carousel */}
          <div className="lg:col-span-7 flex">
            <div className="w-full">
              <HomeCarousel
                posts={allPosts}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
              />
            </div>
          </div>

          {/* Right Column - Paint Calculator Tool */}
          <div className="lg:col-span-5 flex">
            <div className="bg-white border border-slate-200 rounded-2xl w-full h-full flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">

              {/* Top: label + title */}
              <div className="px-7 pt-7 pb-0">
                <p className="text-[10px] tracking-[0.25em] uppercase font-semibold text-slate-400 mb-5">
                  Estimation Tool
                </p>
                <h3 className={`${cormorant.className} leading-tight tracking-tight text-slate-900`} style={{ fontSize: 'clamp(30px, 3.2vw, 44px)' }}>
                  <span className="block font-light text-slate-400">Measure once.</span>
                  <span className="block font-semibold">Buy exactly.</span>
                </h3>
                <p className="mt-3 text-xs text-slate-500 leading-relaxed" style={{ maxWidth: '220px' }}>
                  Dimensions, finish, coats — precise gallon count and cost in seconds.
                </p>
              </div>

              {/* Light preview block */}
              <div className="mx-7 mt-5 rounded-lg flex-grow flex flex-col justify-center bg-slate-50 border border-slate-100" style={{ padding: '16px' }}>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="uppercase tracking-widest text-[10px] text-slate-400">Room</span>
                    <span className="text-slate-600">12 × 10 × 9 ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-widest text-[10px] text-slate-400">Finish</span>
                    <span className="text-slate-600">Eggshell · 2 coats</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-1 border-t border-slate-200">
                    <span className="uppercase tracking-widest text-[10px] text-slate-400">Needed</span>
                    <span className="font-semibold" style={{ color: '#B8965A' }}>2.3 gal · ~$104</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="px-7 py-6">
                <Link href="/tools/paint-calculator">
                  <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold tracking-wide text-sm">
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="container mx-auto px-4 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400 shrink-0">Browse by Category</h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Decoration Ideas', sub: 'Style & Aesthetics', image: '/images/menu/decors.png', href: '/categories/decoration' },
            { name: 'Gift Ideas',       sub: 'For Every Budget',   image: '/images/menu/gifts.png',  href: '/categories/gift-items' },
            { name: 'Practical Tips',   sub: 'Smart Solutions',    image: '/images/menu/tips.png',   href: '/categories/practical-tips' },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group block rounded-xl overflow-hidden relative no-underline"
              style={{ aspectRatio: '8/3' }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-[40%] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 mb-1">{cat.sub}</p>
                <h3
                  className={`${cormorant.className} text-white font-light leading-tight`}
                  style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}
                >
                  {cat.name}
                </h3>
                <div
                  className="mt-2 h-px transition-all duration-500 w-0 group-hover:w-8"
                  style={{ backgroundColor: '#B8965A' }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Title Section */}
      <section className="container mx-auto px-4 py-8 md:py-20">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400 mb-8">
            Smart Home · Interior Ideas
          </p>
          <h2 className={`${cormorant.className} leading-none tracking-tight`} style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
            <span className="block font-light text-slate-400 mb-2">Discover your next</span>
            <span className="block font-semibold text-slate-900">
              <RotatingText
                texts={['smart', 'clever', 'modern', 'creative']}
                mainClassName="px-3 bg-slate-900 text-white overflow-hidden py-1 rounded-sm"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />{' '}space idea
            </span>
          </h2>

          {/* Down Arrow to guide users */}
          <ScrollArrow targetId="blog-section" />
        </div>
      </section>

      {/* Blog Posts - Smart Space Ideas */}
      <section id="blog-section" className="container mx-auto px-4 py-0">
        <HomeBlogSection 
          posts={filteredPosts} 
          title=""
        />
      </section>

      {/* Decoration Section */}
      <DecorationSection />

      {/* Gift Items Section */}
      <GiftItems />



      {/* Practical Tips Section - Moved to bottom */}
      <PracticalTips />
    </main>
  );
}