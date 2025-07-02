"use client";

import Carousel from 'react-bootstrap/Carousel';
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
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

export default function HomeCarousel({
  items = DEFAULT_ITEMS,
  baseWidth = 800,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
}: CarouselProps) {
  return (
    <div className="relative w-full">
      <Carousel
        controls={true}
        indicators={true}
        interval={autoplayDelay}
        pause={pauseOnHover ? 'hover' : false}
      >
        {items.map((item) => (
          <Carousel.Item key={item.id}>
            <div className="relative aspect-[16/10]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
                style={{ maxHeight: '480px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-lg" />
            </div>
            <Carousel.Caption className="text-left pb-8">
              <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full text-white">
                {item.category}
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm md:text-base text-gray-200">{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <style jsx global>{`
        .carousel-control-prev,
        .carousel-control-next {
          width: 5%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          height: 40px;
          width: 40px;
          top: 50%;
          transform: translateY(-50%);
          margin: 0 1rem;
        }

        .carousel-indicators {
          margin-bottom: 2rem;
        }

        .carousel-indicators button {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          margin: 0 4px;
        }

        .carousel-indicators .active {
          background-color: white;
        }

        .carousel-item {
          transition: transform 0.6s ease-in-out;
        }

        .carousel-caption {
          text-align: left;
          left: 5%;
          right: 5%;
        }
      `}</style>
    </div>
  );
}
