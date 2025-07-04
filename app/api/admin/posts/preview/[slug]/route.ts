import { NextRequest, NextResponse } from 'next/server';
import { FirestorePostService } from '@/lib/firebase-db';
import { getCurrentUser } from '@/lib/auth';

const postService = new FirestorePostService();

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Post'u getir (published olması gerekmez)
    const post = await postService.getPostBySlug(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found', slug },
        { status: 404 }
      );
    }

    // Not: Auth kontrolü admin layout'ta yapılıyor, burada gerek yok

    // View sayısını artırmayacağız preview için
    return NextResponse.json({ 
      success: true, 
      post 
    });

  } catch (error) {
    console.error('Preview post error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post for preview', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 