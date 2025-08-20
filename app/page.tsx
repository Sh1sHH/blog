import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import HomeBlogSection from "@/components/blog/HomeBlogSection";
import RoomCategories from "@/components/RoomCategories";
import HomeCarousel from "@/components/ui/carousel";
import RotatingText from "@/components/ui/rotating-text";
import PracticalTips from "@/components/PracticalTips";
import DecorationSection from "@/components/DecorationSection";
import GiftItems from "@/components/GiftItems";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ScrollArrow from '@/components/ui/scroll-arrow';

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
      {/* Hero Section - Pinterest Style Layout */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column - Carousel */}
          <div className="lg:col-span-5 flex">
            <div className="w-full">
              <HomeCarousel
                posts={allPosts} // All blog posts (regardless of category)
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
              />
            </div>
          </div>
          
          {/* Middle Column - Room Categories */}
          <div className="lg:col-span-3 flex">
            <div className="w-full">
              <RoomCategories />
            </div>
          </div>

          {/* Right Column - Paint Calculator Tool */}
          <div className="lg:col-span-4 flex">
            <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow w-full h-full flex flex-col">
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                🎨 Free Tool
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Paint Calculator
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Calculate exactly how much paint you need for your room project.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium text-sm">100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">📊</span>
                  </div>
                  <span className="text-slate-700 font-medium text-sm">Accurate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">💰</span>
                  </div>
                  <span className="text-slate-700 font-medium text-sm">Cost Estimate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-semibold text-sm">📄</span>
                  </div>
                  <span className="text-slate-700 font-medium text-sm">PDF Report</span>
                </div>
              </div>

              {/* Mini Preview - Flex grow to fill space */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4 flex-grow flex flex-col justify-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg text-xs">
                    <span className="text-slate-600">Room Size</span>
                    <span className="font-semibold text-slate-900">12' × 10'</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-900 text-white rounded-lg">
                    <span className="text-xs">Paint Needed</span>
                    <span className="font-bold text-sm">2.3 gallons</span>
                  </div>
                </div>
              </div>
              
              <Link href="/tools/paint-calculator">
                <Button 
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 font-semibold mt-auto"
                >
                  Try Calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Title Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
            <span className="block mb-2">Discover your next</span>
            <span className="block text-blue-600">
              <RotatingText
                texts={['smart', 'clever', 'modern', 'creative']}
                mainClassName="px-1 bg-blue-600 text-white overflow-hidden py-0.5 rounded"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              /> space idea
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