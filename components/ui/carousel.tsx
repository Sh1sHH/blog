"use client";

import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { BlogPostMeta } from '@/lib/blog';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    id: 1,
    title: "Kitap Kütüphanesi",
    description: "Huzurlu bir yaşam.",
    category: "Decor",
    imageUrl: "/images/karosel/1.png"
  },
  {
    id: 2,
    title: "Cozy Room",
    description: "Sıcak ve samimi bir oda tasarımı.",
    category: "Decor",
    imageUrl: "/images/karosel/2.png"
  },
  {
    id: 3,
    title: "Luxury Living",
    description: "Lüks ve modern yaşam alanı.",
    category: "Decor",
    imageUrl: "/images/karosel/3.png"
  },
  {
    id: 4,
    title: "Modern Style",
    description: "Çağdaş ve şık dekorasyon.",
    category: "Decor",
    imageUrl: "/images/karosel/4.png"
  },
  {
    id: 5,
    title: "Stylish Home",
    description: "Tarz sahibi evler için ilham alın.",
    category: "Decor",
    imageUrl: "/images/karosel/5.png"
  }
];

interface CarouselProps {
  items?: CarouselItem[];
  posts?: BlogPostMeta[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

/**
 * Ana sayfa carousel bileşeni
 * Artık blog postlarını da gösterebilir
 */
export default function HomeCarousel({
  items = DEFAULT_ITEMS,
  posts,
  baseWidth = 800,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
}: CarouselProps) {
  
  // Blog postları varsa onları kullan, yoksa varsayılan item'ları kullan
  const carouselContent = posts && posts.length > 0 ? posts.slice(0, 8) : null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <Carousel
        controls={true}
        indicators={true}
        interval={autoplay ? autoplayDelay : null}
        pause={pauseOnHover ? 'hover' : false}
        fade={false}
      >
        {carouselContent ? (
          // Blog postlarını göster
          carouselContent.map((post) => (
            <Carousel.Item key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <div className="relative w-full h-80 md:h-96 lg:h-[450px] cursor-pointer group overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-end text-white">
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 md:top-6 md:left-6">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Article Info */}
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm md:text-base text-gray-200 line-clamp-2">
                        {post.description}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>

                      {/* Read More Indicator */}
                      <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium group-hover:bg-white/20 transition-all">
                        Read Article →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Carousel.Item>
          ))
        ) : (
          // Varsayılan statik içerikleri göster
          items.map((item) => (
            <Carousel.Item key={item.id}>
              <div className="relative w-full h-80 md:h-96 lg:h-[450px] overflow-hidden rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 p-4 md:p-6 lg:p-8 flex flex-col justify-end text-white">
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full text-white w-fit">
                    {item.category}
                  </span>
                  <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-200">{item.description}</p>
                </div>
              </div>
            </Carousel.Item>
          ))
        )}
      </Carousel>

      <style jsx global>{`
        .carousel {
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .carousel-inner {
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .carousel-item {
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .carousel-control-prev,
        .carousel-control-next {
          background: rgba(255, 255, 255, 0.15) !important;
          border-radius: 50% !important;
          height: 45px !important;
          width: 45px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          margin: 0 1rem !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          opacity: 0.8 !important;
        }

        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          opacity: 1 !important;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          width: 18px !important;
          height: 18px !important;
        }

        .carousel-indicators {
          margin-bottom: 1.5rem !important;
          gap: 0.25rem;
        }

        .carousel-indicators [data-bs-target] {
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          background-color: rgba(255, 255, 255, 0.4) !important;
          margin: 0 3px !important;
          border: 2px solid rgba(255, 255, 255, 0.6) !important;
          opacity: 1 !important;
        }

        .carousel-indicators .active {
          background-color: white !important;
          border-color: white !important;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 767px) {
          .carousel-control-prev,
          .carousel-control-next {
            height: 35px !important;
            width: 35px !important;
            margin: 0 0.5rem !important;
          }
          
          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            width: 14px !important;
            height: 14px !important;
          }

          .carousel-indicators [data-bs-target] {
            width: 6px !important;
            height: 6px !important;
            margin: 0 2px !important;
          }
        }
      `}</style>
    </div>
  );
}
