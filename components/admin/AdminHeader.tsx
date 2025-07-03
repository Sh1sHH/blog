'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, Loader2 } from 'lucide-react';
import { signOutAdmin, getCurrentUser } from '@/lib/auth';

export default function AdminHeader() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = getCurrentUser();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOutAdmin();
      router.push('/admin/login');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  // Kullanıcı emailinden başharfleri al
  const getInitials = (email: string | null) => {
    if (!email) return 'A';
    return email.split('@')[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button 
            className="relative h-8 w-8 rounded-full hover:opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
            type="button"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-slate-900 text-white text-sm font-medium">
                {getInitials(user?.email || null)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-56 z-50" 
          align="end" 
          side="bottom"
          sideOffset={8}
        >
          <div className="flex items-center justify-start gap-2 p-3">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium text-sm text-gray-900 truncate max-w-[200px]">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleSignOut}
            disabled={loading}
            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 