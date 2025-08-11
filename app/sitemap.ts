import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

// Base URL for production
const BASE_URL = 'https://cleverspacesolutions.com';

// Prevent sitemap caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    console.log('🔄 Generating sitemap...');
    
    // Static pages
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
        priority: 0.9, // High priority - valuable tool
      },
    ];

    // Get blog posts
    const posts = await getAllPosts();
    console.log(`📝 Found ${posts.length} blog posts for sitemap`);
    console.log('📋 Latest 5 posts:', posts.slice(0, 5).map(p => ({ 
      title: p.title, 
      slug: p.slug, 
      date: p.date,
      published: p.published 
    })));
    
    // Convert blog posts to sitemap format
    const blogPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Category pages
    const uniqueCategories = posts.map(post => post.category);
    const categories = Array.from(new Set(uniqueCategories));
    const categoryPages = categories.map((category) => ({
      url: `${BASE_URL}/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));

    console.log(`✅ Sitemap completed: ${staticPages.length} static + ${blogPages.length} blog + ${categoryPages.length} category = ${staticPages.length + blogPages.length + categoryPages.length} pages`);

    // Combine all pages
    return [...staticPages, ...blogPages, ...categoryPages];
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    
    // Return at least homepage in case of error
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