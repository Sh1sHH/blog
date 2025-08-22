import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Sitemap'i manuel olarak revalidate etmek için API endpoint
 * Bu endpoint sitemap cache'ini temizler ve yeniden oluşturulmasını sağlar
 */
export async function POST(request: NextRequest) {
  try {
    // Authorization kontrolü - basit secret key ile
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATION_SECRET || 'your-secret-key';
    
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Sitemap'i revalidate et
    revalidatePath('/sitemap.xml');
    
    console.log('✅ Sitemap revalidated successfully');
    
    return NextResponse.json({
      message: 'Sitemap revalidated successfully',
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('❌ Error revalidating sitemap:', error);
    
    return NextResponse.json(
      { 
        message: 'Error revalidating sitemap',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

/**
 * GET endpoint - sitemap durumunu kontrol etmek için
 */
export async function GET() {
  return NextResponse.json({
    message: 'Sitemap revalidation endpoint is active',
    usage: 'POST request with Bearer token to revalidate sitemap',
    timestamp: new Date().toISOString(),
  });
}
