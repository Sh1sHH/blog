import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import HomeBlogSection from "@/components/blog/HomeBlogSection";
import RoomCategories from "@/components/RoomCategories";
import HomeCarousel from "@/components/ui/carousel";
import PracticalTips from "@/components/PracticalTips";
import DecorationSection from "@/components/DecorationSection";
import GiftItems from "@/components/GiftItems";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();
  
  // İngilizce kategori adlarına göre filtrele - "Get your next weeknight dinner idea" bölümünden çıkar
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
          {/* Carousel - Takes 2/3 of the space - Şimdi tüm blog postlarını gösterir */}
          <div className="lg:col-span-2">
            <HomeCarousel
              posts={allPosts} // Tüm blog postları (kategori ayırt etmeden)
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

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-12">
        <HomeBlogSection 
          posts={filteredPosts} 
          title="Get your next weeknight dinner idea"
        />
      </section>

      {/* Decoration Section */}
      <DecorationSection />

      {/* Gift Items Section */}
      <GiftItems />

      {/* Practical Tips Section - En alta taşındı */}
      <PracticalTips />
    </main>
  );
}