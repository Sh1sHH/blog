import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = request.headers.get('x-pinterest-token');
  const sandbox = process.env.PINTEREST_SANDBOX === 'true';

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const { board_id, title, description, link, image_url } = await request.json();

  if (!board_id || !title || !image_url) {
    return NextResponse.json(
      { error: 'board_id, title, and image_url are required' },
      { status: 400 }
    );
  }

  const apiHost = sandbox
    ? 'https://api-sandbox.pinterest.com'
    : 'https://api.pinterest.com';

  const pinBody = {
    board_id,
    title,
    description: description || '',
    link: link || '',
    media_source: {
      source_type: 'image_url',
      url: image_url,
    },
  };

  console.log('[Pinterest Pin] API Host:', apiHost);
  console.log('[Pinterest Pin] Sandbox:', sandbox);
  console.log('[Pinterest Pin] Board:', board_id);
  console.log('[Pinterest Pin] Image URL:', image_url);

  const response = await fetch(`${apiHost}/v5/pins`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(pinBody),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('[Pinterest Pin] Error:', response.status, JSON.stringify(data));
    return NextResponse.json(
      { error: 'Failed to create pin', details: data },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
