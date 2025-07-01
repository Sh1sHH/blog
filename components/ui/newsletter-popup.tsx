'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, X } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterPopup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // 3 saniye sonra popup'ı göster
    const timer = setTimeout(() => {
      if (!isClosed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isClosed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Newsletter kayıt simülasyonu
    setTimeout(() => {
      toast.success('Teşekkürler! E-posta adresinize onay mesajı gönderildi.');
      setEmail('');
      setIsLoading(false);
      setIsVisible(false);
      setIsClosed(true);
    }, 1000);
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
  };

  if (!isVisible || isClosed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 max-w-sm">
        {/* Kapatma butonu */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>

        {/* İçerik */}
        <div className="pr-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="bg-slate-100 rounded-lg p-2">
              <Mail className="h-5 w-5 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Güncel Kalın
            </h3>
          </div>
          
          <p className="text-sm text-slate-600 mb-4">
            Yeni yazılarımızı e-posta ile almak ister misiniz?
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 text-sm bg-slate-50 border-slate-300 focus:border-slate-500"
              aria-label="E-posta adresi"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-700 hover:bg-slate-800 h-10 text-sm"
            >
              {isLoading ? 'Kaydediliyor...' : 'Abone Ol'}
            </Button>
          </form>
          
          <p className="text-xs text-slate-500 mt-2">
            Spam göndermiyoruz. İstediğiniz zaman çıkabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
} 