'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { BlogPostMeta, getAllPosts } from '@/lib/blog';
import BlogCardMobile from './ui/blog-card-mobile';

export default function DecorationSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Fetch posts from "Decoration" category
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        
        console.log('DecorationSection - All posts with categories:', allPosts.map(p => ({ title: p.title, category: p.category, published: p.published })));
        
        // Filter published posts from "Decoration" category
        const decorationPosts = allPosts.filter((post: BlogPostMeta) => {
          console.log('DecorationSection - Checking post:', post.category, post.published);
          return post.category === 'Decoration' && post.published;
        }).slice(0, 6); // First 6 posts
        
        console.log('DecorationSection - Filtered posts:', decorationPosts);
        setPosts(decorationPosts);
      } catch (error) {
        console.error('Error fetching decoration posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  
  // Desktop: Show 2 cards per slide
  const cardsPerSlide = 2;
  const totalSlides = Math.ceil(posts.length / cardsPerSlide);

  // Desktop için mevcut slide mantığı
  const getCurrentSlideDecorations = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return posts.slice(startIndex, startIndex + cardsPerSlide);
  };

  // Mobil için: İlk kart sabit (en güncel post), ikinci kart değişken
  const getFirstCardPost = () => {
    if (posts.length === 0) return null;
    return posts[0]; // İlk post (en güncel) sabit kalır
  };

  const getSecondCardPost = () => {
    if (posts.length <= 1) return null;
    // İlk postu atlayarak diğer postları göster
    const otherPosts = posts.slice(1);
    return otherPosts[currentSlide % otherPosts.length];
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Mobil için navigation - sadece ikinci kart için (ilk post hariç)
  const nextMobileSlide = () => {
    const otherPostsLength = posts.length - 1;
    setCurrentSlide((prev) => (prev + 1) % otherPostsLength);
  };

  const prevMobileSlide = () => {
    const otherPostsLength = posts.length - 1;
    setCurrentSlide((prev) => (prev - 1 + otherPostsLength) % otherPostsLength);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
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
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (carouselRef.current) {
      const currentScrollLeft = carouselRef.current.scrollLeft;
      const threshold = 50;
      
      if (Math.abs(currentScrollLeft - scrollLeft) > threshold) {
        if (currentScrollLeft > scrollLeft) {
          prevMobileSlide();
        } else {
          nextMobileSlide();
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
          prevMobileSlide();
        } else {
          nextMobileSlide();
        }
      }
    }
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Decoration Ideas</h2>
              <div className="w-16 h-0.5 bg-slate-600 mt-2 rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse">
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
              <h2 className="text-2xl font-semibold text-slate-800">Decoration Ideas</h2>
              <div className="w-16 h-0.5 bg-slate-600 mt-2 rounded-full"></div>
            </div>
          </div>
          <div className="text-center py-12">
            <p className="text-slate-500">No decoration articles available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  // İlk ve ikinci kartları al
  const firstCardPost = getFirstCardPost();
  const secondCardPost = getSecondCardPost();

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">Decoration Ideas</h2>
            <div className="w-16 h-0.5 bg-slate-600 mt-2 rounded-full"></div>
          </div>
          
          <Link href="/categories/decoration" className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm font-medium">
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div 
            ref={carouselRef}
            className="grid grid-cols-1 gap-4 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* İlk kart - Sabit (en güncel post) */}
            {firstCardPost && (
              <BlogCardMobile post={firstCardPost} categoryLabel="Decoration" />
            )}
            
            {/* İkinci kart - Navigation okları ile */}
            {secondCardPost && (
              <div className="relative">
                <BlogCardMobile post={secondCardPost} categoryLabel="Decoration" />
              </div>
            )}
          </div>

          {/* Mobile Navigation - En alttaki kartta */}
          {posts.length > 1 && (
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={prevMobileSlide}
                className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
                aria-label="Previous decoration"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              
              <button
                onClick={nextMobileSlide}
                className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors border border-slate-200"
                aria-label="Next decoration"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          )}

          {/* Dots Indicator - Mobil için */}
          {posts.length > 1 && (
            <div className="flex justify-center space-x-3 mt-6">
              {Array.from({ length: posts.length - 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
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

        {/* Desktop Layout - Mevcut sistem */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Navigation Arrows - Desktop için */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10 border border-slate-200"
                  aria-label="Previous decorations"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-600" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors z-10 border border-slate-200"
                  aria-label="Next decorations"
                >
                  <ChevronRight className="w-6 h-6 text-slate-600" />
                </button>
              </>
            )}

            {/* Desktop Cards Grid */}
            <div className="grid grid-cols-2 gap-6">
              {getCurrentSlideDecorations().map((decoration) => (
                <Link key={decoration.slug} href={`/blog/${decoration.slug}`}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-96 flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img 
                        src={decoration.image} 
                        alt={decoration.title}
                        className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Reading Time Badge */}
                      <div className="absolute top-3 left-3">
                        <div className="bg-white bg-opacity-90 backdrop-blur-sm text-slate-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {decoration.readTime} min read
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                        {decoration.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 line-clamp-3 flex-1 mb-4">
                        {decoration.description}
                      </p>
                      
                      <div className="mt-auto">
                        <span className="inline-block bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full">
                          Decoration
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dots Indicator - Desktop için */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-3 mt-6">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
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
      </div>
    </section>
  );
} 