"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPostMeta } from '@/lib/blog';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: 1, title: "Kitap Kütüphanesi", description: "Huzurlu bir yaşam.", category: "Decor", imageUrl: "/images/karosel/1.png" },
  { id: 2, title: "Cozy Room", description: "Sıcak ve samimi bir oda tasarımı.", category: "Decor", imageUrl: "/images/karosel/2.png" },
  { id: 3, title: "Luxury Living", description: "Lüks ve modern yaşam alanı.", category: "Decor", imageUrl: "/images/karosel/3.png" },
  { id: 4, title: "Modern Style", description: "Çağdaş ve şık dekorasyon.", category: "Decor", imageUrl: "/images/karosel/4.png" },
  { id: 5, title: "Stylish Home", description: "Tarz sahibi evler için ilham alın.", category: "Decor", imageUrl: "/images/karosel/5.png" },
];

interface CarouselProps {
  items?: CarouselItem[];
  posts?: BlogPostMeta[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

export default function HomeCarousel({
  items = DEFAULT_ITEMS,
  posts,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const isPaused = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const carouselContent = posts && posts.length > 0 ? posts.slice(0, 8) : null;

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!autoplay || !emblaApi) return;
    intervalRef.current = setInterval(() => {
      if (!isPaused.current) emblaApi.scrollNext();
    }, autoplayDelay);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoplay, autoplayDelay, emblaApi]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      onMouseEnter={() => { if (pauseOnHover) isPaused.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) isPaused.current = false; }}
    >
      <div ref={emblaRef} className="overflow-hidden rounded-lg">
        <div className="flex">
          {carouselContent ? (
            carouselContent.map((post) => (
              <div key={post.slug} className="flex-[0_0_100%] min-w-0">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative w-full aspect-[4/5] md:h-96 lg:h-[500px] xl:h-[550px] cursor-pointer group overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300" />
                    <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <span className="inline-block px-2 py-1 text-[9px] tracking-[0.2em] uppercase font-medium bg-black/35 backdrop-blur-sm text-white/75 border border-white/10 rounded-sm">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-white/50 bg-black/25 px-2 py-1 rounded-sm backdrop-blur-sm">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm md:text-base lg:text-lg font-medium leading-tight line-clamp-2 transition-opacity group-hover:opacity-80">
                          {post.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[10px] text-white/40">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
                            Read &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex-[0_0_100%] min-w-0">
                <div className="relative w-full aspect-[4/5] md:h-96 lg:h-[500px] xl:h-[550px] overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between text-white">
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full text-white w-fit">
                      {item.category}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm md:text-base lg:text-lg font-bold leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-200 line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Previous button */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full backdrop-blur-sm border border-white/20 bg-white/15 hover:bg-white/25 transition-colors"
        style={{ width: 45, height: 45 }}
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      {/* Next button */}
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full backdrop-blur-sm border border-white/20 bg-white/15 hover:bg-white/25 transition-colors"
        style={{ width: 45, height: 45 }}
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full border-2 transition-colors"
            style={{
              width: 8,
              height: 8,
              backgroundColor: i === selectedIndex ? 'white' : 'rgba(255,255,255,0.4)',
              borderColor: i === selectedIndex ? 'white' : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
