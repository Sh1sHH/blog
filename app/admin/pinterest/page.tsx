'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  Loader2,
  ImageIcon,
  Link2,
  Send,
  LogOut,
  RefreshCw,
  Upload,
  RotateCcw,
} from 'lucide-react';

interface Board {
  id: string;
  name: string;
  description: string;
  pin_count: number;
  privacy: string;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  published: boolean;
  keywords?: string[];
  tags?: string[];
}

interface PinResult {
  slug: string;
  pinId?: string;
  error?: string;
  success: boolean;
}

export default function PinterestAdmin() {
  const searchParams = useSearchParams();

  // OAuth state
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isExchangingToken, setIsExchangingToken] = useState(false);
  const [oauthError, setOauthError] = useState<string | null>(null);

  // Board state
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<string>('');
  const [loadingBoards, setLoadingBoards] = useState(false);

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Pin state
  const [pinningSlug, setPinningSlug] = useState<string | null>(null);
  const [pinResults, setPinResults] = useState<PinResult[]>([]);

  // Custom pin images per post
  const [customPinImages, setCustomPinImages] = useState<Record<string, string>>({});
  const [uploadingSlug, setUploadingSlug] = useState<string | null>(null);

  // Handle OAuth callback code
  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setOauthError('Pinterest authorization was denied or failed.');
      return;
    }

    if (code && !accessToken && !isExchangingToken) {
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  // Load token from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('pinterest_token');
    if (stored) {
      setAccessToken(stored);
    }
  }, []);

  // Fetch boards when token is available
  useEffect(() => {
    if (accessToken) {
      fetchBoards();
      fetchPosts();
    }
  }, [accessToken]);

  async function exchangeCodeForToken(code: string) {
    setIsExchangingToken(true);
    setOauthError(null);

    try {
      const response = await fetch('/api/pinterest/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Token exchange failed');
      }

      setAccessToken(data.access_token);
      sessionStorage.setItem('pinterest_token', data.access_token);

      // Clean URL
      window.history.replaceState({}, '', '/admin/pinterest');
    } catch (err: any) {
      setOauthError(err.message || 'Failed to exchange authorization code');
    } finally {
      setIsExchangingToken(false);
    }
  }

  async function startOAuth() {
    setIsConnecting(true);
    setOauthError(null);

    try {
      const response = await fetch('/api/pinterest/auth');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate OAuth');
      }

      // Store state for CSRF verification
      sessionStorage.setItem('pinterest_oauth_state', data.state);

      // Redirect to Pinterest authorization page
      window.location.href = data.authUrl;
    } catch (err: any) {
      setOauthError(err.message || 'Failed to start Pinterest authorization');
      setIsConnecting(false);
    }
  }

  function disconnect() {
    setAccessToken(null);
    setBoards([]);
    setSelectedBoard('');
    setPinResults([]);
    sessionStorage.removeItem('pinterest_token');
    sessionStorage.removeItem('pinterest_oauth_state');
  }

  async function fetchBoards() {
    if (!accessToken) return;
    setLoadingBoards(true);

    try {
      const response = await fetch('/api/pinterest/boards', {
        headers: { 'x-pinterest-token': accessToken },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch boards');
      }

      setBoards(data.items || []);
      if (data.items?.length > 0 && !selectedBoard) {
        setSelectedBoard(data.items[0].id);
      }
    } catch (err: any) {
      console.error('Failed to fetch boards:', err);
    } finally {
      setLoadingBoards(false);
    }
  }

  async function fetchPosts() {
    setLoadingPosts(true);
    try {
      const response = await fetch('/api/admin/posts');
      const data = await response.json();
      setPosts((data.posts || []).filter((p: Post) => p.published));
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  }

  async function handlePinImageUpload(slug: string, file: File) {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) return;

    setUploadingSlug(slug);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'pinterest-pins');

      const response = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Upload failed (${response.status}): ${text.slice(0, 200)}`);
      }

      const result = await response.json();
      if (result.success) {
        setCustomPinImages(prev => ({ ...prev, [slug]: result.url }));
      } else {
        console.error('Upload rejected:', result.error);
      }
    } catch (err) {
      console.error('Pin image upload failed:', err);
    } finally {
      setUploadingSlug(null);
    }
  }

  function resetPinImage(slug: string) {
    setCustomPinImages(prev => {
      const next = { ...prev };
      delete next[slug];
      return next;
    });
  }

  async function createPin(post: Post) {
    if (!accessToken || !selectedBoard) return;

    setPinningSlug(post.slug);

    try {
      const keywords = (post.keywords || post.tags || []).slice(0, 5);
      const hashtags = keywords.map((k: string) => `#${k.replace(/\s+/g, '')}`).join(' ');
      const description = `${post.description}\n\n${hashtags}`.trim();

      const response = await fetch('/api/pinterest/pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-pinterest-token': accessToken,
        },
        body: JSON.stringify({
          board_id: selectedBoard,
          title: post.title,
          description,
          link: `https://cleverspacesolutions.com/blog/${post.slug}`,
          image_url: customPinImages[post.slug] || post.image || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create pin');
      }

      setPinResults(prev => [
        { slug: post.slug, pinId: data.id, success: true },
        ...prev,
      ]);
    } catch (err: any) {
      setPinResults(prev => [
        { slug: post.slug, error: err.message, success: false },
        ...prev,
      ]);
    } finally {
      setPinningSlug(null);
    }
  }

  const getPinResult = (slug: string) => pinResults.find(r => r.slug === slug);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pinterest Integration</h1>
          <p className="text-slate-500 mt-1">
            Connect your Pinterest account, select a board, and publish pins from your blog posts.
          </p>
        </div>
      </div>

      {/* Connection Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Pinterest icon */}
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-600" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Pinterest Account</h2>
              {accessToken ? (
                <div className="flex items-center space-x-2 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </div>
              ) : (
                <p className="text-sm text-slate-500 mt-1">Not connected</p>
              )}
            </div>
          </div>

          <div>
            {accessToken ? (
              <Button variant="outline" onClick={disconnect} className="text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={startOAuth}
                disabled={isConnecting || isExchangingToken}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isConnecting || isExchangingToken ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isExchangingToken ? 'Exchanging token...' : 'Connecting...'}
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Connect to Pinterest
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {oauthError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{oauthError}</p>
          </div>
        )}
      </div>

      {/* OAuth Flow Info */}
      {!accessToken && !isExchangingToken && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-3">How it works</h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start space-x-2">
              <span className="bg-blue-200 text-blue-900 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
              <span>Click &quot;Connect to Pinterest&quot; to open Pinterest authorization</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-blue-200 text-blue-900 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
              <span>Log in to your Pinterest account and authorize CleverSpaceSolutions</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-blue-200 text-blue-900 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
              <span>You will be redirected back here with your account connected</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-blue-200 text-blue-900 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
              <span>Select a board and start publishing pins from your blog posts</span>
            </li>
          </ol>
        </div>
      )}

      {/* Board Selection */}
      {accessToken && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Select Board</h2>
            <Button variant="ghost" size="sm" onClick={fetchBoards} disabled={loadingBoards}>
              <RefreshCw className={`w-4 h-4 mr-1 ${loadingBoards ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {loadingBoards ? (
            <div className="flex items-center space-x-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading boards...</span>
            </div>
          ) : boards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {boards.map(board => (
                <button
                  key={board.id}
                  onClick={() => setSelectedBoard(board.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedBoard === board.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="font-medium text-slate-900 text-sm">{board.name}</p>
                  {board.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{board.description}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {board.pin_count || 0} pins
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {board.privacy}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No boards found. Create a board on Pinterest first.
            </p>
          )}
        </div>
      )}

      {/* Blog Posts - Pin Publisher */}
      {accessToken && selectedBoard && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Publish Pins</h2>
            <Button variant="ghost" size="sm" onClick={fetchPosts} disabled={loadingPosts}>
              <RefreshCw className={`w-4 h-4 mr-1 ${loadingPosts ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            Publishing to board: <strong>{boards.find(b => b.id === selectedBoard)?.name}</strong>
          </p>

          {loadingPosts ? (
            <div className="flex items-center space-x-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Loading posts...</span>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map(post => {
                const result = getPinResult(post.slug);
                const isPinning = pinningSlug === post.slug;
                const isUploading = uploadingSlug === post.slug;
                const pinImage = customPinImages[post.slug] || post.image;
                const hasCustomImage = !!customPinImages[post.slug];

                return (
                  <div
                    key={post.slug}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      {/* Pin Image Preview + Upload */}
                      <div className="flex-shrink-0 space-y-1.5">
                        <div className={`w-16 h-24 rounded-lg bg-slate-100 overflow-hidden relative ${hasCustomImage ? 'ring-2 ring-red-400' : ''}`}>
                          {pinImage ? (
                            <img
                              src={pinImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-slate-400" />
                            </div>
                          )}
                          {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Loader2 className="w-5 h-5 text-white animate-spin" />
                            </div>
                          )}
                          {hasCustomImage && (
                            <span className="absolute top-0.5 left-0.5 bg-red-500 text-white text-[8px] px-1 rounded font-bold">PIN</span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <label className="cursor-pointer flex-1">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handlePinImageUpload(post.slug, file);
                                e.target.value = '';
                              }}
                            />
                            <span className="flex items-center justify-center w-full px-1 py-0.5 text-[10px] text-slate-500 hover:text-red-600 hover:bg-red-50 rounded border border-slate-200 transition-colors">
                              <Upload className="w-2.5 h-2.5 mr-0.5" />
                              Change
                            </span>
                          </label>
                          {hasCustomImage && (
                            <button
                              onClick={() => resetPinImage(post.slug)}
                              className="flex items-center justify-center px-1 py-0.5 text-[10px] text-slate-400 hover:text-slate-600 rounded border border-slate-200 transition-colors"
                              title="Reset to original"
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900 text-sm truncate">
                          {post.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Link2 className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500 truncate">
                            /blog/{post.slug}
                          </span>
                        </div>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 ml-4">
                      {/* Pin result status */}
                      {result && (
                        <div className="flex items-center space-x-1">
                          {result.success ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-green-600">Pinned</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="text-xs text-red-600" title={result.error}>
                                Failed
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      <Button
                        size="sm"
                        onClick={() => createPin(post)}
                        disabled={isPinning || !pinImage}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isPinning ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Pinning...
                          </>
                        ) : (
                          <>
                            <Send className="w-3 h-3 mr-1" />
                            Pin it
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}

              {posts.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-8">
                  No published posts found.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pin Activity Log */}
      {pinResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Pin Activity</h2>
          <div className="space-y-2">
            {pinResults.map((result, idx) => (
              <div
                key={`${result.slug}-${idx}`}
                className={`flex items-center justify-between p-3 rounded-lg text-sm ${
                  result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {result.success ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={result.success ? 'text-green-800' : 'text-red-800'}>
                    {result.slug}
                  </span>
                </div>
                <span className={`text-xs ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  {result.success ? `Pin ID: ${result.pinId}` : result.error}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
