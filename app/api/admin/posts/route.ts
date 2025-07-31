import { NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';
import { adminAuth } from '@/lib/firebase-admin';

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