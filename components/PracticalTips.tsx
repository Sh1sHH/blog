'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { BlogPostMeta, getAllPosts } from '@/lib/blog';
import BlogCardMobile from './ui/blog-card-mobile';

const SECTION_LABEL = 'Practical Tips';
const CATEGORY_FILTER = 'Practical Tips';
const VIEW_ALL_HREF = '/categories/practical-tips';

export default function PracticalTips() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        const filtered = allPosts
          .filter((p: BlogPostMeta) => p.category === CATEGORY_FILTER && p.published)
          .slice(0, 6);
        setPosts(filtered);
      } catch (e) {
        console.error('Error fetching practical tips:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const cardsPerSlide = 2;
  const totalSlides = Math.ceil(posts.length / cardsPerSlide);
  const getCurrentSlide = () => posts.slice(currentSlide * cardsPerSlide, currentSlide * cardsPerSlide + cardsPerSlide);
  const getFirstCard = () => posts[0] ?? null;
  const getSecondCard = () => posts.length > 1 ? posts.slice(1)[currentSlide % (posts.length - 1)] : null;

  const nextSlide = () => setCurrentSlide(p => (p + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide(p => (p - 1 + totalSlides) % totalSlides);
  const nextMobile = () => setCurrentSlide(p => (p + 1) % (posts.length - 1));
  const prevMobile = () => setCurrentSlide(p => (p - 1 + (posts.length - 1)) % (posts.length - 1));

  const onTouchStart = (e: React.TouchEvent) => { setIsDragging(true); setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)); setScrollLeft(carouselRef.current?.scrollLeft || 0); };
  const onTouchMove = (e: React.TouchEvent) => { if (!isDragging) return; e.preventDefault(); const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0); if (carouselRef.current) carouselRef.current.scrollLeft = scrollLeft - (x - startX) * 2; };
  const onTouchEnd = () => { if (!isDragging) return; setIsDragging(false); const diff = (carouselRef.current?.scrollLeft || 0) - scrollLeft; if (Math.abs(diff) > 50) diff > 0 ? prevMobile() : nextMobile(); };
  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0)); setScrollLeft(carouselRef.current?.scrollLeft || 0); };
  const onMouseMove = (e: React.MouseEvent) => { if (!isDragging) return; e.preventDefault(); const x = e.pageX - (carouselRef.current?.offsetLeft || 0); if (carouselRef.current) carouselRef.current.scrollLeft = scrollLeft - (x - startX) * 2; };
  const onMouseUp = () => { if (!isDragging) return; setIsDragging(false); const diff = (carouselRef.current?.scrollLeft || 0) - scrollLeft; if (Math.abs(diff) > 50) diff > 0 ? prevMobile() : nextMobile(); };

  const SectionHeader = ({ viewAll = false }: { viewAll?: boolean }) => (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400 shrink-0">{SECTION_LABEL}</span>
      <div className="flex-1 h-px bg-slate-200" />
      {viewAll && (
        <Link href={VIEW_ALL_HREF} className="text-[10px] tracking-[0.15em] uppercase text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors no-underline shrink-0">
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );

  const Dots = ({ count, active, onClick }: { count: number; active: number; onClick: (i: number) => void }) => (
    <div className="flex justify-center space-x-2 mt-6">
      {Array.from({ length: count }, (_, i) => (
        <button key={i} onClick={() => onClick(i)} aria-label={`Slide ${i + 1}`}
          className={`w-2 h-2 rounded-full transition-colors ${i === active ? 'bg-slate-900' : 'bg-slate-200 hover:bg-slate-400'}`}
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <SectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 animate-pulse">
              <div className="h-48 bg-slate-100 rounded-t-xl" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-slate-100 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <SectionHeader />
        <p className="text-center text-slate-400 py-12 text-sm">No practical tips articles available yet.</p>
      </section>
    );
  }

  const firstCard = getFirstCard();
  const secondCard = getSecondCard();

  return (
    <section className="container mx-auto px-4 py-12">
      <SectionHeader viewAll />

      {/* Mobile */}
      <div className="md:hidden">
        <div ref={carouselRef} className="grid grid-cols-1 gap-4 overflow-hidden"
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
          {firstCard && <BlogCardMobile post={firstCard} categoryLabel="Practical Tips" />}
          {secondCard && <div className="relative"><BlogCardMobile post={secondCard} categoryLabel="Practical Tips" /></div>}
        </div>
        {posts.length > 1 && (
          <div className="flex justify-center space-x-4 mt-6">
            {[prevMobile, nextMobile].map((fn, i) => (
              <button key={i} onClick={fn} aria-label={i === 0 ? 'Previous' : 'Next'}
                className="w-9 h-9 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors text-white">
                {i === 0 ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
        {posts.length > 1 && <Dots count={posts.length - 1} active={currentSlide} onClick={i => setCurrentSlide(i)} />}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="relative">
          {totalSlides > 1 && (
            <>
              <button onClick={prevSlide} aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/65 transition-colors z-20 text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextSlide} aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-black/65 transition-colors z-20 text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          <div className="grid grid-cols-2 gap-4">
            {getCurrentSlide().map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="no-underline">
                <div className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ height: '380px' }}>
                  <img src={post.image} alt={post.title}
                    className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-[40%] to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1 mb-2 text-white/40" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
                      <Clock className="w-3 h-3" />
                      <span className="uppercase">{post.readTime} min read</span>
                    </div>
                    <h3 className="text-white font-light text-base leading-snug line-clamp-2 tracking-wide">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/55 line-clamp-2 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {post.description}
                    </p>
                    <div className="mt-3 h-px transition-all duration-500 w-0 group-hover:w-8" style={{ backgroundColor: '#B8965A' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {totalSlides > 1 && <Dots count={totalSlides} active={currentSlide} onClick={i => setCurrentSlide(i)} />}
      </div>
    </section>
  );
}
