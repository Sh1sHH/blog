'use client';

import { useState } from 'react';
import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RotatingText from '@/components/ui/rotating-text';

interface HomeBlogSectionProps {
  posts: BlogPostMeta[];
  title?: string;
}

export default function HomeBlogSection({ posts, title = "Latest Articles" }: HomeBlogSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);

  // İlk 6 postu göster
  const mainPosts = posts.slice(0, 6);
  
  // Kalan postları 3'lü sayfalara böl
  const remainingPosts = posts.slice(6);
  const postsPerPage = 3;
  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);
  
  const getCurrentPagePosts = () => {
    const startIndex = currentPage * postsPerPage;
    return remainingPosts.slice(startIndex, startIndex + postsPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">No articles found yet.</p>
      </div>
    );
  }

  // Başlığı kelimelerine böl ve son kelimeyi farklı renklendir
  const renderTitle = () => {
    if (!title) return null;
    
    if (title === "Get your next weeknight dinner idea") {
      return (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-gray-900">Get your next</span>
          <br />
          <span className="text-orange-500">weeknight dinner idea</span>
        </h2>
      );
    }
    
    if (title === "Discover your next smart space idea") {
      return (
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
        </div>
      );
    }
    
    // Diğer başlıklar için varsayılan stil
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
        <div className="w-16 h-0.5 bg-slate-600 mx-auto mt-2 rounded-full"></div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Başlık */}
      {title && renderTitle()}

      {/* Ana Blog Grid - İlk 6 Post */}
      {mainPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {mainPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Carousel Bölümü - Kalan Postlar */}
      {remainingPosts.length > 0 && (
        <div className="space-y-6">
          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows - Mobil responsive */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
                  aria-label="Previous posts"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                </button>
                
                <button
                  onClick={nextPage}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10"
                  aria-label="Next posts"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                </button>
              </>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 ">
              {getCurrentPagePosts().map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentPage 
                      ? 'bg-slate-600' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 