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
  
  // "Pratik Bilgiler", "Dekorasyon" ve "Hediyelik Eşyalar" kategorilerini Latest Articles'dan çıkar
  const filteredPosts = allPosts.filter(post => 
    post.category !== 'Pratik Bilgiler' && 
    post.category !== 'Dekorasyon' && 
    post.category !== 'Hediyelik Eşyalar'
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section - Carousel and Categories Side by Side */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Carousel - Takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <HomeCarousel
              baseWidth={800}
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
            />
          </div>
          
          {/* Room Categories - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <RoomCategories />
          </div>
        </div>
      </section>

      {/* Practical Tips Section */}
      <PracticalTips />

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-12">
        <HomeBlogSection 
          posts={filteredPosts} 
          title="Latest Articles"
        />
      </section>

      {/* Decoration Section */}
      <DecorationSection />

      {/* Gift Items Section */}
      <GiftItems />
    </main>
  );
}