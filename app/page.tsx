import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import BlogList from "@/components/blog/BlogList";
import RoomCategories from "@/components/RoomCategories";
import HomeCarousel from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();

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

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-12">
        
        <BlogList 
          posts={allPosts} 
          title="For You" 
          showFeatured={featuredPosts.length > 0}
        />
      </section>
    </main>
  );
}