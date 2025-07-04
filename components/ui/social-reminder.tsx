'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { toast } from 'sonner';

// Telegram ikonu
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

// Pinterest ikonu
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.219-.359-1.219c0-1.142.662-1.995 1.488-1.995.219 0 .979.219.979 1.057 0 .219-.219 1.406-.359 2.184-.219.937.479 1.699 1.416 1.699 1.699 0 3.019-1.797 3.019-4.397 0-2.304-1.656-3.919-4.018-3.919-2.738 0-4.337 2.055-4.337 4.176 0 .827.317 1.716.711 2.2.078.096.089.181.067.279-.074.307-.24.959-.272 1.095-.041.181-.134.219-.309.134-1.215-.566-1.975-2.343-1.975-3.768 0-3.037 2.205-5.833 6.359-5.833 3.34 0 5.936 2.38 5.936 5.563 0 3.321-2.092 5.992-4.996 5.992-.975 0-1.893-.508-2.208-1.174 0 0-.484 1.843-.602 2.292-.218.834-.81 1.88-1.207 2.521.909.281 1.869.433 2.866.433 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
  </svg>
);

/**
 * Small social media reminder in bottom right corner
 * Encourages users to follow Pinterest and Telegram accounts
 * Does not show in admin panel
 */
export default function SocialReminder() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const pathname = usePathname();

  // Admin panelinde popup gösterme
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    // Admin panelindeyse popup'ı gösterme
    if (isAdminPage) {
      return;
    }

    // Show reminder after 10 seconds
    const timer = setTimeout(() => {
      // Check if closed in localStorage (valid for 1 day)
      const reminderData = localStorage.getItem('socialReminderClosed');
      if (reminderData) {
        try {
          const { timestamp } = JSON.parse(reminderData);
          const now = Date.now();
          const oneDay = 24 * 60 * 60 * 1000;
          
          // Show again if 1 day has passed
          if (now - timestamp < oneDay) {
            return;
          }
        } catch (error) {
          console.log('localStorage parse error, showing reminder');
        }
      }
      
      if (!isClosed) {
        setIsVisible(true);
      }
    }, 10000); // 10 second delay

    return () => clearTimeout(timer);
  }, [isClosed, isAdminPage]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
    // Save close action with timestamp
    localStorage.setItem('socialReminderClosed', JSON.stringify({
      closed: true,
      timestamp: Date.now()
    }));
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/cleverspacesolutions', '_blank');
    toast.success('🚀 Welcome to our Telegram channel!');
  };

  const handlePinterestClick = () => {
    window.open('https://pinterest.com/cleverspacesolutions', '_blank');
    toast.success('📌 Welcome to our Pinterest page!');
  };

  // Admin panelindeyse veya kapalıysa hiçbir şey gösterme
  if (!isVisible || isClosed || isAdminPage) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Main reminder box */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 relative max-w-xs transform transition-all duration-300 hover:scale-105">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-gray-400 hover:bg-gray-500 text-white rounded-full p-1 transition-colors"
          aria-label="Close"
        >
          <X className="h-3 w-3" />
        </button>

        {/* Content */}
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-2 font-medium">
            🏠 Follow us!
          </p>
          
          {/* Social media buttons */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleTelegramClick}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Follow on Telegram"
            >
              <TelegramIcon className="h-4 w-4" />
            </button>
            
            <button
              onClick={handlePinterestClick}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
              title="Follow on Pinterest"
            >
              <PinterestIcon className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Inspiring content ✨
          </p>
        </div>
      </div>
    </div>
  );
} 