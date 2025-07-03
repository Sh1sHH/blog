'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User } from 'firebase/auth';
import { onAdminAuthStateChanged } from '@/lib/auth';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Authentication state'ini dinle
    const unsubscribe = onAdminAuthStateChanged((user, isAdmin) => {
      console.log('Auth state changed:', { user: user?.email, isAdmin, pathname });
      setUser(user);
      setIsAdmin(isAdmin);
      setLoading(false);

      // Kullanıcı giriş yapmamış veya admin değilse ve login sayfasında değilse login sayfasına yönlendir
      if ((!user || !isAdmin) && pathname !== '/admin/login') {
        console.log('Redirecting to login...');
        router.replace('/admin/login');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  // Loading durumu
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600">Yetkilendirme kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  // Kullanıcı giriş yapmamış veya admin değilse hiçbir şey gösterme
  // (Router zaten login sayfasına yönlendirecek)
  if (!user || !isAdmin) {
    return null;
  }

  // Admin ise içeriği göster
  return <>{children}</>;
} 