'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sade navigasyon menüsü
  const navigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'Kategoriler', href: '/categories' },
    { name: 'Hakkımda', href: '/about' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-border/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Minimalist Logo */}
          <Link 
            href="/" 
            className="text-2xl font-semibold text-foreground hover:text-foreground/80 transition-colors"
            aria-label="Ana sayfaya git"
          >
            Blog
          </Link>

          {/* Desktop Navigation - Sade */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Ana navigasyon">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                aria-label={item.name}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Sağ taraf - Sadece arama ve menü */}
          <div className="flex items-center space-x-4">
            {/* Minimalist Arama */}
            <div className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Ara..."
                  className="pl-10 w-56 h-9 border-0 bg-muted/30 focus:bg-muted/50 focus:ring-1 focus:ring-border transition-all"
                  aria-label="Blog yazılarında ara"
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Clean */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            {/* Mobile Search */}
            <div className="mb-4 sm:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Ara..."
                  className="pl-10 h-9 border-0 bg-muted/30"
                  aria-label="Blog yazılarında ara"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="space-y-1" aria-label="Mobil navigasyon">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  onClick={handleLinkClick}
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}