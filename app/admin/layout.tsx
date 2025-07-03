'use client';

import { usePathname } from 'next/navigation';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import Link from 'next/link';
import { Eye, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Login sayfası ise guard kullanma
  if (isLoginPage) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  // Diğer admin sayfaları için guard kullan
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-slate-50">
        {/* Blog Admin Navigation Bar - Ana sayfayla uyumlu */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <nav className="flex items-center h-16">
              {/* Sol taraf - Logo ve Admin başlığı */}
              <div className="flex items-center space-x-8">
                <Link href="/" className="font-bold text-xl text-slate-800 hover:text-slate-600 transition-colors no-underline">
                  NishHome
                </Link>
                <div className="hidden sm:block">
                  <span className="text-slate-600 text-sm font-medium">Admin Panel</span>
                </div>
              </div>
              
              {/* Orta - Navigation Links */}
              <div className="hidden md:flex flex-1 items-center justify-center">
                <div className="flex items-center space-x-8">
                  <Link 
                    href="/admin" 
                    className={`text-slate-600 hover:text-slate-900 transition-colors no-underline flex items-center space-x-1 ${
                      pathname === '/admin' ? 'text-slate-900 font-medium' : ''
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    href="/admin/posts/new" 
                    className={`text-slate-600 hover:text-slate-900 transition-colors no-underline flex items-center space-x-1 ${
                      pathname === '/admin/posts/new' ? 'text-slate-900 font-medium' : ''
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Post</span>
                  </Link>
                </div>
              </div>

              {/* Sağ taraf - Action buttons ve user menu */}
              <div className="flex items-center space-x-2">
                {/* View Site Button */}
                <Link href="/" target="_blank">
                  <button className="hidden sm:flex items-center space-x-1 text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">View Site</span>
                  </button>
                </Link>
                
                {/* New Post Button (mobile için) */}
                <Link href="/admin/posts/new" className="md:hidden">
                  <button className="text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-lg hover:bg-slate-100">
                    <Plus className="h-4 w-4" />
                  </button>
                </Link>

                {/* User Menu Container */}
                <div className="relative z-50">
                  <AdminHeader />
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* Main Content - ana sayfayla uyumlu pt-16 */}
        <main className="pt-16 min-h-screen bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
} 