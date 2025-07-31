import { NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';
import { adminAuth } from '@/lib/firebase-admin';

// GET - Tüm blog yazılarını listele (admin için hem yayınlanmış hem taslak)
export async function GET() {
  try {
    const posts = await firestoreDB.getAllPosts();
    
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

export async function POST(request: Request) {
  try {
    // Gelen isteğin başlığından kimlik token'ını al
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Yetkisiz işlem: Token bulunamadı' }, { status: 401 });
    }

    // Token'ı doğrula
    await adminAuth.verifyIdToken(idToken);

    // Token geçerliyse, post oluşturma işlemine devam et
    const body = await request.json();
    const result = await firestoreDB.createPost(body);

    if (result.success) {
      return NextResponse.json(result.post, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    console.error('API Hatası (POST):', error);
    return NextResponse.json({ error: 'Sunucu hatası oluştu' }, { status: 500 });
  }
}