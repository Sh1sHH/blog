import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('x-pinterest-token');
  const sandbox = process.env.PINTEREST_SANDBOX === 'true';

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const apiHost = sandbox
    ? 'https://api-sandbox.pinterest.com'
    : 'https://api.pinterest.com';

  const response = await fetch(`${apiHost}/v5/boards?page_size=50`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch boards', details: data },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
