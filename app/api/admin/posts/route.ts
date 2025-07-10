import { NextRequest, NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';

// Next.js 13 için dynamic konfigürasyonu
export const dynamic = 'force-dynamic';

// Slug oluşturma fonksiyonu - SEO friendly
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Özel karakterleri temizle
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Çoklu tireleri tek tireye çevir
    .trim()
    .replace(/^-+|-+$/g, ''); // Başındaki ve sonundaki tireleri temizle
}

// GET - Tüm blog yazılarını listele (admin için hem yayınlanmış hem taslak)
export async function GET() {
  try {
    const posts = await firestoreDB.getAllPosts();
    console.log('API - Fetched posts count:', posts.length); // Debug log
    console.log('API - Posts categories:', posts.map(p => ({ title: p.title, category: p.category, published: p.published }))); // Debug log
    
    // Cache-busting headers for Vercel
    const response = NextResponse.json({ success: true, posts });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST - Yeni blog yazısı oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received post data:', body); // Debug log
    
    const { 
      title, 
      content, 
      description, 
      category, 
      tags, 
      featured, 
      published,
      customSlug,
      seoTitle,
      seoDescription,
      keywords,
      image 
    } = body;

    // Validasyon
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' }, 
        { status: 400 }
      );
    }

    // Post oluştur
    const result = await firestoreDB.createPost({
      title: title?.trim(),
      content: content?.trim(),
      description: description?.trim(),
      category: category || 'General',
      tags: Array.isArray(tags) ? tags : [],
      featured: Boolean(featured),
      published: Boolean(published),
      slug: customSlug?.trim(),
      seoTitle: seoTitle?.trim(),
      seoDescription: seoDescription?.trim(),
      keywords: Array.isArray(keywords) ? keywords : [],
      image: image?.trim()
    });

    console.log('Create post result:', result); // Debug log

    if (!result.success) {
      return NextResponse.json(
        { error: result.error }, 
        { status: result.error === 'A post with this slug already exists' ? 409 : 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      slug: result.post?.slug,
      post: result.post,
      message: 'Post created successfully' 
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ 
      error: 'Failed to create post', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 