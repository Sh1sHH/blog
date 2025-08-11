import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

// Base URL - production'da gerçek domain'iniz ile değiştirin
const BASE_URL = 'https://cleverspacesolutions.com';

// Sitemap'in cache edilmemesi için
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    console.log('🔄 Sitemap oluşturuluyor...');
    
    // Statik sayfalar
    const staticPages = [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/terms-of-service`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/cookie-policy`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      },
      {
        url: `${BASE_URL}/tools/paint-calculator`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9, // Yüksek öncelik - değerli araç
      },
    ];

    // Blog yazılarını al
    const posts = await getAllPosts();
    console.log(`📝 Sitemap için ${posts.length} blog yazısı bulundu`);
    console.log('📋 Son 5 yazı:', posts.slice(0, 5).map(p => ({ 
      title: p.title, 
      slug: p.slug, 
      date: p.date,
      published: p.published 
    })));
    
    // Blog yazılarını sitemap formatına çevir
    const blogPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Kategori sayfaları
    const uniqueCategories = posts.map(post => post.category);
    const categories = Array.from(new Set(uniqueCategories));
    const categoryPages = categories.map((category) => ({
      url: `${BASE_URL}/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    console.log(`✅ Sitemap tamamlandı: ${staticPages.length} statik + ${blogPages.length} blog + ${categoryPages.length} kategori = ${staticPages.length + blogPages.length + categoryPages.length} sayfa`);

    // Tüm sayfaları birleştir
    return [...staticPages, ...blogPages, ...categoryPages];
    
  } catch (error) {
    console.error('❌ Sitemap oluşturulurken hata:', error);
    
    // Hata durumunda en azından ana sayfayı döndür
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1,
      },
    ];
  }
} 