"use client";

import Link from 'next/link';

const categories = [
  {
    name: 'Decoration Ideas',
    image: '/images/menu/decors.png',
    href: '/categories/decoration'
  },
  {
    name: 'Gift Ideas',
    image: '/images/menu/gifts.png', // Bu görseller güncellenebilir
    href: '/categories/gift-items'
  },
  {
    name: 'Practical Tips',
    image: '/images/menu/tips.png',
    href: '/categories/practical-tips'
  }
];

/**
 * Room Categories bileşeni
 * Ana sayfada carousel'in yanında 3 adet oda kategorisi gösterir
 * Carousel ile aynı boyutta tasarlanmıştır
 */
export default function RoomCategories() {
  return (
    <div className="h-80 md:h-96 lg:h-[450px] flex flex-col gap-4">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={category.href}
          className="group block rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1 relative"
        >
          <div className="relative w-full h-full">
            <img
              src={category.image}
              alt={`${category.name} category`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              draggable={false}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
            
            {/* Category Name */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white font-bold text-lg md:text-xl text-center group-hover:text-blue-300 transition-colors">
                {category.name}
              </h3>
            </div>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-xl transition-all duration-300" />
          </div>
        </Link>
      ))}
    </div>
  );
} 