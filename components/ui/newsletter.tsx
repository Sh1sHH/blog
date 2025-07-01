'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Newsletter kayıt simülasyonu
    setTimeout(() => {
      toast.success('Teşekkürler! E-posta adresinize onay mesajı gönderildi.');
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-slate-100 rounded-2xl p-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-200 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Mail className="h-8 w-8 text-slate-600" />
        </div>
        
        <h3 className="text-3xl font-semibold text-slate-800 mb-4">
          Güncel Kalın
        </h3>
        
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          En son yazılarımızı ve uzman görüşlerini e-posta adresinize 
          düzenli olarak göndermemizi ister misiniz?
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-6">
          <Input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-12 text-lg bg-white border-slate-300 focus:border-slate-500 focus:ring-slate-500"
            aria-label="E-posta adresi"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-slate-700 hover:bg-slate-800 h-12 px-8 text-lg font-medium"
          >
            {isLoading ? (
              'Kaydediliyor...'
            ) : (
              <>
                Abone Ol
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
        
        <p className="text-sm text-slate-500">
          Spam göndermiyoruz, istediğiniz zaman abonelikten çıkabilirsiniz.
        </p>
      </div>
    </div>
  );
}