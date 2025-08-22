import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // Ana sayfaya ve image optimization'a izin ver
        allow: [
          '/',
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
        // Google için de image optimization'a izin ver
        allow: [
          '/',
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
        allow: [
          '/',
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