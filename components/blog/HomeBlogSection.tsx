'use client';

import { useState, useRef, useEffect } from 'react';
import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RotatingText from '@/components/ui/rotating-text';
import Link from 'next/link';

interface HomeBlogSectionProps {
  posts: BlogPostMeta[];
  title?: string;
}

export default function HomeBlogSection({ posts, title = "Latest Articles" }: HomeBlogSectionProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // İlk 6 postu göster
  const mainPosts = posts.slice(0, 6);
  
  // Kalan postları 3'lü sayfalara böl (desktop için)
  const remainingPosts = posts.slice(6);
  const postsPerPage = 3;
  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);
  
  // Mobil için sadece 1 kart değişsin - maksimum 10 yazı
  const mobilePosts = posts.slice(6, 16); // 6-16 arası = 10 yazı
  const mobileTotalPages = Math.min(mobilePosts.length, 10); // Maksimum 10
  
  const getCurrentPagePosts = () => {
    const startIndex = currentPage * postsPerPage;
    return remainingPosts.slice(startIndex, startIndex + postsPerPage);
  };

  // Mobil için tek kart döndür
  const getCurrentMobilePost = () => {
    return mobilePosts[currentPage % mobileTotalPages];
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Mobil için navigation
  const nextMobilePage = () => {
    setCurrentPage((prev) => (prev + 1) % mobileTotalPages);
  };

  const prevMobilePage = () => {
    setCurrentPage((prev) => (prev - 1 + mobileTotalPages) % mobileTotalPages);
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Determine swipe direction and navigate
    if (carouselRef.current) {
      const currentScrollLeft = carouselRef.current.scrollLeft;
      const threshold = 50; // Minimum swipe distance
      
      if (Math.abs(currentScrollLeft - scrollLeft) > threshold) {
        if (currentScrollLeft > scrollLeft) {
          prevPage(); // Swiped right
        } else {
          nextPage(); // Swiped left
        }
      }
    }
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (carouselRef.current) {
      const currentScrollLeft = carouselRef.current.scrollLeft;
      const threshold = 50;
      
      if (Math.abs(currentScrollLeft - scrollLeft) > threshold) {
        if (currentScrollLeft > scrollLeft) {
          prevPage();
        } else {
          nextPage();
        }
      }
    }
  };

  // Reset scroll position when page changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [currentPage]);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {mainPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Carousel Bölümü - Kalan Postlar */}
      {remainingPosts.length > 0 && (
        <div className="space-y-6">
          {/* Desktop Layout - 3 kart birden */}
          <div className="hidden md:block relative">
            {/* Posts Grid with Touch Support */}
            <div 
              ref={carouselRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {getCurrentPagePosts().map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Navigation Arrows - Desktop için */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-lg rounded-full items-center justify-center hover:bg-slate-50 transition-colors z-10 border border-slate-200 flex"
                  aria-label="Previous posts"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                </button>
                
                <button
                  onClick={nextPage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-lg rounded-full items-center justify-center hover:bg-slate-50 transition-colors z-10 border border-slate-200 flex"
                  aria-label="Next posts"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Layout - Tek kart */}
          <div className="md:hidden">
            <div 
              ref={carouselRef}
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              {getCurrentMobilePost() && (
                <BlogCard key={getCurrentMobilePost()!.slug} post={getCurrentMobilePost()!} />
              )}
            </div>

            {/* Mobile Navigation - En alttaki kartta */}
            {mobileTotalPages > 1 && (
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={prevMobilePage}
                  className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
                  aria-label="Previous posts"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                
                <button
                  onClick={nextMobilePage}
                  className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
                  aria-label="Next posts"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            )}

            {/* Dots Indicator - Mobil için */}
            {mobileTotalPages > 1 && (
              <div className="flex justify-center space-x-3 mt-6">
                {Array.from({ length: mobileTotalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentPage 
                        ? 'bg-slate-600' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Bütün yazıları göster butonu - Mobil için */}
            <div className="flex justify-center mt-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Bütün yazıları göster
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Dots Indicator - Desktop için */}
          {totalPages > 1 && (
            <div className="hidden md:flex justify-center space-x-3">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors ${
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