'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NavigationMenu } from '@/components/ui/navigation-menu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll durumunu takip et
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm' 
        : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-slate-800 hover:text-slate-600 transition-colors">
            NishHome
          </Link>

          {/* Ana Menü - Ortalanmış */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-12">
              <Link href="/salon" className="text-slate-600 hover:text-slate-900 transition-colors">
                Salon
              </Link>
              <Link href="/mutfak" className="text-slate-600 hover:text-slate-900 transition-colors">
                Mutfak
              </Link>
              <Link href="/yatak-odasi" className="text-slate-600 hover:text-slate-900 transition-colors">
                Yatak Odası
              </Link>
              <Link href="/banyo" className="text-slate-600 hover:text-slate-900 transition-colors">
                Banyo
              </Link>
              <Link href="/balkon" className="text-slate-600 hover:text-slate-900 transition-colors">
                Balkon
              </Link>
              <Link href="/ofis" className="text-slate-600 hover:text-slate-900 transition-colors">
                Çalışma Odası
              </Link>
            </div>
          </div>

          {/* Mobil Menü Butonu - Sağa hizalı */}
          <div className="md:hidden ml-auto">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobil Menü (Kapalı varsayılan) */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/salon" className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Salon
          </Link>
          <Link href="/mutfak" className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Mutfak
          </Link>
          <Link href="/yatak-odasi" className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Yatak Odası
          </Link>
          <Link href="/banyo" className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Banyo
          </Link>
          <Link href="/balkon" className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Balkon
          </Link>
          <Link href="/ofis" className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            Çalışma Odası
          </Link>
        </div>
      </div>
    </header>
  );
}