import { NextRequest, NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';

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
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
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

    // Post güncelle
    const result = await firestoreDB.updatePost(slug, {
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

    if (!result.success) {
      return NextResponse.json(
        { error: result.error }, 
        { status: result.error === 'Post not found' ? 404 : 
                 result.error === 'A post with this slug already exists' ? 409 : 400 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      post: result.post,
      newSlug: result.newSlug,
      message: 'Post updated successfully' 
    });

  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE - Blog yazısını sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
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