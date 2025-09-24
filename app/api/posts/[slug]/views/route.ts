import { NextResponse } from 'next/server';
import { firestoreDB } from '@/lib/firebase-db';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await firestoreDB.incrementViews(params.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}
