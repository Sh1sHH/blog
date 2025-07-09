import Link from 'next/link';
import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo ve Telif */}
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} CleverSpace
          </div>

          {/* Linkler */}
          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm">
            {/* Ana Linkler */}
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Home
              </Link>
              <Link href="/blog" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                Blog
              </Link>
                              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors no-underline">
                  About Us
                </Link>
                
            </div>
            
            {/* Yasal Linkler */}
            <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
              <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-700 transition-colors no-underline">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-slate-500 hover:text-slate-700 transition-colors no-underline">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-slate-500 hover:text-slate-700 transition-colors no-underline">
                Cookie Policy
              </Link>
            </div>
          </nav>

          {/* Sosyal Medya İkonları */}
          <div className="flex items-center gap-3">
            <Link 
              href="https://pinterest.com" 
              target="_blank"
              className="text-slate-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
              aria-label="Pinterest"
            >
              {/* Pinterest Icon */}
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 384 512">
                <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
              </svg>
            </Link>
            <Link 
              href="https://instagram.com" 
              target="_blank"
              className="text-slate-600 hover:text-pink-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}