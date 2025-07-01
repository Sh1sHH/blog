import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import BlogList from '@/components/blog/BlogList';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Coffee } from 'lucide-react';

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Yaşlı Kitleye Uygun */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Güvenilir ve Sakin Başlık */}
            <h1 className="text-5xl md:text-6xl font-semibold text-slate-800 mb-8 leading-tight">
              Kaliteli İçerikler ve{' '}
              <span className="text-slate-600">
                Güvenilir Bilgiler
              </span>
            </h1>
            
            {/* Açık ve Net Açıklama */}
            <p className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Deneyimli yazarların kaleme aldığı detaylı makaleler, 
              uzman görüşleri ve pratik bilgilerle size değer katmayı hedefliyoruz.
            </p>

            {/* Büyük ve Anlaşılır Butonlar */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-slate-700 hover:bg-slate-800 text-lg px-8 py-4 h-14"
              >
                <Link href="/blog" className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5" />
                  Yazıları İncele
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 text-lg px-8 py-4 h-14"
              >
                <Link href="/categories" className="flex items-center gap-3">
                  <Coffee className="h-5 w-5" />
                  Kategoriler
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Recent Posts */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <BlogList 
            posts={recentPosts} 
            title="Son Yazılar" 
            showFeatured={featuredPosts.length > 0}
          />
          
          {recentPosts.length > 6 && (
            <div className="text-center mt-16">
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 h-14"
              >
                <Link href="/blog" className="flex items-center gap-3">
                  Tüm Yazıları Görüntüle
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}