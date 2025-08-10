import { NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔍 Sitemap test başlıyor...');
    
    // 1. Tüm postları getir (admin view)
    const allPosts = await firestoreDB.getAllPosts();
    
    // 2. Yayınlanmış postları getir (public view)
    const publishedPosts = await firestoreDB.getPublishedPosts();
    
    // 3. getAllPosts fonksiyonunu test et (sitemap'te kullanılan)
    const sitemapPosts = await getAllPosts();
    
    const unpublished = allPosts.filter(post => !post.published);
    
    const result = {
      summary: {
        toplamYazi: allPosts.length,
        yayinlanmisYazi: publishedPosts.length,
        sitemapYazisi: sitemapPosts.length,
        yayinlanmamisYazi: unpublished.length
      },
      son5YaziTumListe: allPosts.slice(0, 5).map(post => ({
        title: post.title,
        slug: post.slug,
        published: post.published,
        createdAt: post.createdAt.toISOString(),
        category: post.category
      })),
      son5YayinlanmisYazi: publishedPosts.slice(0, 5).map(post => ({
        title: post.title,
        slug: post.slug,
        createdAt: post.createdAt.toISOString(),
        sitemapURL: `https://cleverspacesolutions.com/blog/${post.slug}`
      })),
      yayinlanmamisYazilar: unpublished.map(post => ({
        title: post.title,
        slug: post.slug,
        createdAt: post.createdAt.toISOString()
      }))
    };
    
    console.log('📊 Test sonuçları:', result.summary);
    
    return NextResponse.json(result, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    
  } catch (error) {
    console.error('❌ Test hatası:', error);
    return NextResponse.json(
      { 
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
