"use client";

import Link from 'next/link';

const categories = [
  {
    image: '/images/menu/kitchen.png',
    href: '/yatak-odasi'
  },
  {
    image: '/images/menu/kitchen.png',
    href: '/mutfak'
  },
  {
    image: '/images/menu/kitchen.png',
    href: '/banyo'
  },
  {
    image: '/images/menu/kitchen.png',
    href: '/banyo'
  }
];

export default function RoomCategories() {
  return (
    <div className="h-full flex flex-col justify-center gap-4">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={category.href}
          className="block rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg h-24 md:h-28 w-full"
          style={{ minHeight: 80 }}
        >
          <img
            src={category.image}
            alt="Kategori görseli"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </Link>
      ))}
    </div>
  );
} 