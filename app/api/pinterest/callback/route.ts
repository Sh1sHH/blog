import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code) {
    // User denied access or error occurred
    return NextResponse.redirect(
      new URL('/admin/pinterest?error=access_denied', request.url)
    );
  }

  // Redirect to the admin page with the code for client-side token exchange
  const redirectUrl = new URL('/admin/pinterest', request.url);
  redirectUrl.searchParams.set('code', code);
  if (state) redirectUrl.searchParams.set('state', state);

  return NextResponse.redirect(redirectUrl);
}

export async function POST(request: NextRequest) {
  // Exchange authorization code for access token
  const { code } = await request.json();

  const clientId = process.env.PINTEREST_APP_ID;
  const clientSecret = process.env.PINTEREST_APP_SECRET;
  const redirectUri = process.env.PINTEREST_REDIRECT_URI;
  const sandbox = process.env.PINTEREST_SANDBOX === 'true';

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: 'Pinterest app credentials not configured' },
      { status: 500 }
    );
  }

  const tokenUrl = sandbox
    ? 'https://api-sandbox.pinterest.com/v5/oauth/token'
    : 'https://api.pinterest.com/v5/oauth/token';

  // Base64 encode client_id:client_secret for Basic auth
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }).toString(),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: 'Token exchange failed', details: tokenData },
      { status: tokenResponse.status }
    );
  }

  return NextResponse.json({
    access_token: tokenData.access_token,
    token_type: tokenData.token_type,
    expires_in: tokenData.expires_in,
    scope: tokenData.scope,
  });
}
