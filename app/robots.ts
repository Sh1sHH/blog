import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Next.js image optimization'ı izin ver, diğer _next dosyalarını blokla
        allow: [
          '/_next/image*',
          '/_next/static/media*',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/test-login/',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/js/',
          '/favicon.ico',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        // Google için de image optimization'a izin ver
        allow: [
          '/_next/image*',
          '/_next/static/media*',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/test-login/',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/js/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        allow: [
          '/_next/image*',
          '/_next/static/media*',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/test-login/',
          '/_next/static/chunks/',
          '/_next/static/css/',
          '/_next/static/js/',
        ],
      },
    ],
    sitemap: 'https://cleverspacesolutions.com/sitemap.xml',
  };
} 