import { NextRequest, NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';
import { adminAuth } from '@/lib/firebase-admin';

// Next.js 13 için dynamic konfigürasyonu
export const dynamic = 'force-dynamic';

// GET - Tek blog yazısını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const post = await firestoreDB.getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT - Blog yazısını güncelle
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Yetkisiz işlem: Token bulunamadı' }, { status: 401 });
    }

    await adminAuth.verifyIdToken(idToken);

    const body = await request.json();
    const result = await firestoreDB.updatePost(slug, body);

    if (result.success) {
      return NextResponse.json(result.post);
    } else {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
  } catch (error) {
    console.error('API Güncelleme Hatası (PUT):', error);
    return NextResponse.json({ error: 'Sunucu hatası oluştu' }, { status: 500 });
  }
}

// DELETE - Blog yazısını sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // 1. Gelen isteğin başlığından kimlik token'ını al
    const idToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idToken) {
      return NextResponse.json({ error: 'Yetkisiz işlem: Token bulunamadı' }, { status: 401 });
    }

    // 2. Token'ı doğrula
    await adminAuth.verifyIdToken(idToken);

    // 3. Token geçerliyse, silme işlemine devam et
    const result = await firestoreDB.deletePost(slug);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error }, 
        { status: result.error === 'Post not found' ? 404 : 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Post deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
} 