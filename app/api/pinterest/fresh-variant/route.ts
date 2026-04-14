import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface HookEntry {
  primary: string;
  alternatives?: string[];
  description?: string;
  hashtags?: string[];
  mood?: string;
}

interface HooksFile {
  hooks: Record<string, HookEntry>;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const usedCsv = searchParams.get('used') || '';

  if (!slug) {
    return NextResponse.json({ error: 'slug query param required' }, { status: 400 });
  }

  const used = usedCsv
    .split(',')
    .map(s => parseInt(s.trim(), 10))
    .filter(n => !isNaN(n));

  const hooksPath = path.join(process.cwd(), 'data', 'pin-hooks.json');

  if (!fs.existsSync(hooksPath)) {
    return NextResponse.json(
      { error: 'pin-hooks.json not found on server' },
      { status: 500 },
    );
  }

  let hooksData: HooksFile;
  try {
    hooksData = JSON.parse(fs.readFileSync(hooksPath, 'utf8'));
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to parse pin-hooks.json: ${err.message}` },
      { status: 500 },
    );
  }

  const hook = hooksData.hooks?.[slug];

  if (!hook) {
    return NextResponse.json(
      {
        error: 'no_hook',
        message: `No pre-written hook for "${slug}". Edit the form manually, or add an entry to data/pin-hooks.json.`,
      },
      { status: 404 },
    );
  }

  const variants = [hook.primary, ...(hook.alternatives || [])];
  const totalVariants = variants.length;

  const nextIndex = variants.findIndex((_, i) => !used.includes(i));

  if (nextIndex === -1) {
    return NextResponse.json(
      {
        error: 'exhausted',
        totalVariants,
        message: `All ${totalVariants} pre-written variants used. Edit manually or add more alternatives to pin-hooks.json for this post.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    variantIndex: nextIndex,
    totalVariants,
    title: variants[nextIndex],
    description: hook.description || '',
    keywords: hook.hashtags || [],
    source: 'hook',
  });
}
