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
      {/* Hero Section - Carousel and Categories Side by Side */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Carousel - Takes 2/3 of the space - Now shows all blog posts */}
          <div className="lg:col-span-2">
            <HomeCarousel
              posts={allPosts} // All blog posts (regardless of category)
              autoplay={true}
              autoplayDelay={4000}
              pauseOnHover={true}
            />
          </div>
          
          {/* Room Categories - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <RoomCategories />
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

      {/* Paint Calculator CTA Section */}
      <section className="bg-white border-t py-16 my-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div>
                <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  🎨 Free Tool
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Planning to Paint Your Room?
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Calculate exactly how much paint you need with our free paint calculator. 
                  Input your room dimensions, windows, and doors for the most accurate results.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-semibold">✓</span>
                    </div>
                    <span className="text-slate-700 font-medium">100% Free</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">📊</span>
                    </div>
                    <span className="text-slate-700 font-medium">Detailed Calculation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">💰</span>
                    </div>
                    <span className="text-slate-700 font-medium">Cost Estimation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-semibold">📄</span>
                    </div>
                    <span className="text-slate-700 font-medium">PDF Report</span>
                  </div>
                </div>
                
                <Link href="/tools/paint-calculator">
                  <Button 
                    size="lg" 
                    className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-8 py-4 text-lg"
                  >
                    Calculate Paint Amount
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="bg-slate-50 rounded-2xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
                      <span className="text-slate-600">Room Size</span>
                      <span className="font-semibold text-slate-900">12' × 10' × 9'</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
                      <span className="text-slate-600">Windows</span>
                      <span className="font-semibold text-slate-900">2 windows</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
                      <span className="text-slate-600">Doors</span>
                      <span className="font-semibold text-slate-900">1 door</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-lg">
                      <span>Paint Needed</span>
                      <span className="font-bold text-xl">2.3 gallons</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-100 rounded-full opacity-60"></div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Practical Tips Section - Moved to bottom */}
      <PracticalTips />
    </main>
  );
}