'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';

export default function GiftItems() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch posts from "Hediyelik Eşyalar" category from Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/admin/posts');
        const data = await response.json();
        
        console.log('GiftItems - API Response:', data);
        
        if (data.success) {
          // Log all posts
          console.log('GiftItems - All posts:', data.posts);
          
          // Filter published posts from "Hediyelik Eşyalar" category
          const giftPosts = data.posts.filter((post: any) => {
            console.log('GiftItems - Checking post:', post.category, post.published);
            return post.category === 'Hediyelik Eşyalar' && post.published;
          }).slice(0, 6); // First 6 posts
          
          console.log('GiftItems - Filtered posts:', giftPosts);
          setPosts(giftPosts);
        }
      } catch (error) {
        console.error('Error fetching gift items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  // Show 2 cards per slide
  const cardsPerSlide = 2;
  const totalSlides = Math.ceil(posts.length / cardsPerSlide);

  const getCurrentSlideGifts = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return posts.slice(startIndex, startIndex + cardsPerSlide);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Gift Ideas</h2>
              <div className="w-16 h-0.5 bg-slate-600 mt-2 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-96 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Gift Ideas</h2>
              <div className="w-16 h-0.5 bg-slate-600 mt-2 rounded-full"></div>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-slate-500">No gift ideas articles available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Gift Ideas</h2>
            <div className="w-16 h-0.5 bg-slate-600 mt-2 rounded-full"></div>
          </div>
          
          <Link href="/categories/gift-items" className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm font-medium">
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
                aria-label="Previous gifts"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
                aria-label="Next gifts"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getCurrentSlideGifts().map((gift) => (
              <Link key={gift.slug} href={`/blog/${gift.slug}`}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-96 flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={gift.image} 
                      alt={gift.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Reading Time Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-white bg-opacity-90 backdrop-blur-sm text-slate-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {gift.readTime} min read
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {gift.title}
                    </h3>
                    
                    <div className="mt-4">
                      <span className="inline-block bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">
                        Gift Ideas
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-slate-600' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 