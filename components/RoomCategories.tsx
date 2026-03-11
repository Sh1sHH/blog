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
    image: '/images/menu/gifts.png',
    href: '/categories/gift-items'
  },
  {
    name: 'Practical Tips',
    image: '/images/menu/tips.png',
    href: '/categories/practical-tips'
  }
];

export default function RoomCategories() {
  return (
    <div className="h-80 md:h-96 lg:h-[450px] flex flex-col gap-3">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={category.href}
          className="group block rounded-xl overflow-hidden flex-1 relative no-underline"
        >
          <div className="relative w-full h-full">
            <img
              src={category.image}
              alt={`${category.name} category`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              draggable={false}
            />

            {/* Gradient — stronger at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-[40%] to-transparent" />

            {/* Text — bottom-left, editorial */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[9px] tracking-[0.25em] uppercase text-white/40 mb-1">Explore</p>
              <h3 className="text-white font-light text-sm tracking-wide leading-tight">
                {category.name}
              </h3>
              {/* Gold hairline — expands on hover */}
              <div
                className="mt-2 h-px transition-all duration-500 w-0 group-hover:w-6"
                style={{ backgroundColor: '#B8965A' }}
              />
            </div>

            {/* Subtle border on hover */}
            <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-xl transition-all duration-300" />
          </div>
        </Link>
      ))}
    </div>
  );
}
