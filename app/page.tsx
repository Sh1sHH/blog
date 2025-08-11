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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 my-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎨 Odanızı Boyamak İstiyorsunuz?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Kaç litre boya almanız gerektiğini merak ediyorsanız, ücretsiz hesaplayıcımızı kullanın!
              Pencere, kapı sayısını da hesaba katarak en doğru sonucu alın.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-semibold">✅ Ücretsiz</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-semibold">📊 Detaylı Hesaplama</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-white font-semibold">💰 Maliyet Tahmini</span>
              </div>
            </div>
            <Link href="/tools/paint-calculator">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg"
              >
                Boya Miktarını Hesapla
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Practical Tips Section - Moved to bottom */}
      <PracticalTips />
    </main>
  );
}