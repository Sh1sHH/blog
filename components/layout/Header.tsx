'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { Instagram } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity no-underline">
            <Image 
              src="/images/navbar/logo2.webp" 
              alt="CleverSpaceSolutions Logo" 
              width={120} 
              height={40}
              className="h-40 w-auto"
              priority
            />
          </Link>

          {/* Ana Menü - Ortalanmış */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center space-x-12">
              <Link href="/categories/living-room" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Living Room
              </Link>
              <Link href="/categories/kitchen" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Kitchen
              </Link>
              <Link href="/categories/bedroom" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Bedroom
              </Link>
              <Link href="/categories/bathroom" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Bathroom
              </Link>
              <Link href="/categories/balcony" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Balcony
              </Link>
              <Link href="/categories/office" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Home Office
              </Link>
            </div>
          </div>

          {/* Sağ Taraf - Sosyal Medya ve Mobil Menü */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Sosyal Medya İkonları - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              <Link 
                href="https://pinterest.com/cleverspacesolutionsbusiness/" 
                target="_blank"
                className="text-slate-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                aria-label="Pinterest - CleverSpace Solutions"
              >
                {/* Pinterest Icon */}
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 384 512">
                  <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
                </svg>
              </Link>
              <Link 
                href="https://www.instagram.com/cleverspacesolutions/" 
                target="_blank"
                className="text-slate-600 hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                aria-label="Instagram - CleverSpace Solutions"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link 
                href="https://www.tiktok.com/@cleverspacesolutions" 
                target="_blank"
                className="text-slate-600 hover:text-black transition-colors p-2 rounded-lg hover:bg-slate-100"
                aria-label="TikTok - CleverSpace Solutions"
              >
                {/* TikTok Icon */}
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349c0 95.2-77.2 172.5-172.4 172.5-95.2 0-172.4-77.3-172.4-172.5 0-95.2 77.2-172.5 172.4-172.5 17.4 0 34.3 2.7 50.2 7.6v85.3c-15.8-7.3-33.2-11.4-51.7-11.4-61.3 0-111 49.8-111 111.1 0 61.3 49.8 111.1 111.1 111.1 61.3 0 111-49.8 111-111.1V0h61.3c4.8 33.3 21.9 63.9 48.3 82.1 26.4 18.2 58.2 27.9 91.2 27.9v99.9z"/>
                </svg>
              </Link>
            </div>

            {/* Mobil Menü Butonu - Sağa konumlandırıldı */}
            <div className="md:hidden ml-2">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
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
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobil Menü - State'e bağlı görünürlük */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/categories/living-room" 
            className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Living Room
          </Link>
          <Link 
            href="/categories/kitchen" 
            className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kitchen
          </Link>
          <Link 
            href="/categories/bedroom" 
            className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bedroom
          </Link>
          <Link 
            href="/categories/bathroom" 
            className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Bathroom
          </Link>
          <Link 
            href="/categories/balcony" 
            className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Balcony
          </Link>
          <Link 
            href="/categories/office" 
            className="block px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors no-underline"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home Office
          </Link>
          
          {/* Mobil Sosyal Medya */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t">
            <Link 
              href="https://pinterest.com/cleverspacesolutionsbusiness/" 
              target="_blank"
              className="text-slate-600 hover:text-red-600 transition-colors p-2"
              aria-label="Pinterest - CleverSpace Solutions"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 384 512">
                <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
              </svg>
            </Link>
            <Link 
              href="https://www.instagram.com/cleverspacesolutions/" 
              target="_blank"
              className="text-slate-600 hover:text-pink-600 transition-colors p-2"
              aria-label="Instagram - CleverSpace Solutions"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.tiktok.com/@cleverspacesolutions" 
              target="_blank"
              className="text-slate-600 hover:text-black transition-colors p-2"
              aria-label="TikTok - CleverSpace Solutions"
            >
              {/* TikTok Icon */}
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512">
                <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349c0 95.2-77.2 172.5-172.4 172.5-95.2 0-172.4-77.3-172.4-172.5 0-95.2 77.2-172.5 172.4-172.5 17.4 0 34.3 2.7 50.2 7.6v85.3c-15.8-7.3-33.2-11.4-51.7-11.4-61.3 0-111 49.8-111 111.1 0 61.3 49.8 111.1 111.1 111.1 61.3 0 111-49.8 111-111.1V0h61.3c4.8 33.3 21.9 63.9 48.3 82.1 26.4 18.2 58.2 27.9 91.2 27.9v99.9z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}