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

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-12">
        <HomeBlogSection 
          posts={filteredPosts} 
          title="Discover your next smart space idea"
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