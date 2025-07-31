import { NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';
import { adminAuth } from '@/lib/firebase-admin';

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