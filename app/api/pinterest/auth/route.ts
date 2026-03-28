import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const clientId = process.env.PINTEREST_APP_ID;
  const redirectUri = process.env.PINTEREST_REDIRECT_URI;
  const sandbox = process.env.PINTEREST_SANDBOX === 'true';

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Pinterest app credentials not configured' },
      { status: 500 }
    );
  }

  // Generate random state for CSRF protection
  const state = crypto.randomBytes(32).toString('hex');

  const baseUrl = sandbox
    ? 'https://www.pinterest.com/oauth/'
    : 'https://www.pinterest.com/oauth/';

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'boards:read,boards:write,pins:read,pins:write',
    state: state,
  });

  const authUrl = `${baseUrl}?${params.toString()}`;

  // Return the auth URL and state (client will store state for verification)
  return NextResponse.json({ authUrl, state });
}
