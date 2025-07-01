import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Marka ve İletişim */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-slate-700 rounded-lg p-2">
                <BookOpen className="h-6 w-6 text-slate-300" />
              </div>
              <span className="text-2xl font-semibold text-slate-100">Blog</span>
            </Link>
            
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Güvenilir bilgiler, uzman görüşleri ve kaliteli içeriklerle 
              size değer katmayı hedefliyoruz.
            </p>

            {/* İletişim Bilgileri */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <span className="text-slate-300">info@blog.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <span className="text-slate-300">+90 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <span className="text-slate-300">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-slate-100">Sayfalar</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/blog" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Blog Yazıları
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Kategoriler
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Popüler Konular */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-slate-100">Popüler Konular</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/categories/teknoloji" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Teknoloji
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/saglik" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Sağlık
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/finans" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Finans
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories/yasam" 
                  className="text-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Yaşam
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-lg">
              © 2025 Blog. Tüm hakları saklıdır.
            </p>
            
            <div className="flex space-x-8">
              <Link 
                href="/gizlilik" 
                className="text-slate-400 hover:text-slate-200 text-lg transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link 
                href="/kullanim-sartlari" 
                className="text-slate-400 hover:text-slate-200 text-lg transition-colors"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}