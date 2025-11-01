import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Tüm botlar için geçerli
        
        // Sitenizin taranmasına ve kaynaklarının okunmasına izin ver
        allow: [
          '/', // Ana sayfa ve tüm alt sayfalara izin ver
          '/_next/image*', // Next.js resim optimizasyonuna izin ver
          '/_next/static/', // Sitenin çalışması için gereken tüm JS/CSS dosyalarına izin ver
        ],
        
        // Sadece taranmasını istemediğiniz özel dizinleri engelle
        disallow: [
          '/admin/',
          '/api/',
          '/test-login/',
        ],
      },
    ],
    // Sitemap URL'nizi belirtin
    sitemap: 'https://cleverspacesolutions.com/sitemap.xml',
  };
}