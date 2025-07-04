import { NextRequest, NextResponse } from 'next/server';
import { storageService } from '@/lib/firebase-storage';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'blog';

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

    // Firebase Storage'a yükle
    const result = await storageService.uploadImage(file, folder);

    if (result.success) {
      return NextResponse.json({
        success: true,
        url: result.url,
        message: 'Dosya başarıyla yüklendi'
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Dosya yükleme sırasında hata oluştu' },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 