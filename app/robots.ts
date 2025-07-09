import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/test-login/',
          '/_next/',
          '/favicon.ico',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/test-login/',
        ],
      },
    ],
    sitemap: 'https://cleverspacesolutions.com/sitemap.xml',
    host: 'https://cleverspacesolutions.com',
  };
} 