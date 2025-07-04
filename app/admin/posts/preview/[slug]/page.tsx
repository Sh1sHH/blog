'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  readTime: number;
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export default function PreviewPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/posts/preview/${slug}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}: Post bulunamadı`);
        }

        const data = await response.json();
        
        if (data.success && data.post) {
          setPost(data.post);
        } else {
          throw new Error('Post verisi alınamadı');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Önizleme yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Bulunamadı</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium mb-2">Hata Detayı:</p>
            <p className="text-red-700 text-sm">{error || 'Post önizlemesi yüklenemedi'}</p>
            <p className="text-red-600 text-xs mt-2">Aranan slug: <code className="bg-red-100 px-1 rounded">{slug}</code></p>
          </div>
          <div className="space-y-3">
            <Link href="/admin">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Admin Paneline Dön
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Sayfayı Yenile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-amber-50 border-b border-amber-200 py-3">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm">
              <ArrowLeft className="h-4 w-4" />
              Admin Panel
            </Link>
            <Alert className="py-2 px-3 border-amber-300 bg-amber-100">
              <Eye className="h-4 w-4" />
              <AlertDescription className="text-sm font-medium text-amber-800">
                Bu bir önizlemedir - {post.published ? 'Yayınlanmış' : 'Taslak'} post
              </AlertDescription>
            </Alert>
          </div>
          <Link href={`/admin/posts/edit/${post.slug}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <article className="bg-white">
        {/* Back Button */}
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 md:pt-8">
          <Button asChild variant="ghost" className="mb-4 md:mb-6 text-sm md:text-base">
            <Link href="/blog" className="flex items-center gap-2 no-underline">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 md:mb-8">
          <div className="mb-4 md:mb-6">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Badge className="text-xs md:text-sm">{post.category}</Badge>
              {!post.published && (
                <Badge variant="secondary" className="text-xs md:text-sm">
                  Taslak
                </Badge>
              )}
              {post.featured && (
                <Badge variant="default" className="text-xs md:text-sm">
                  Öne Çıkan
                </Badge>
              )}
            </div>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6">
              {post.description}
            </p>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-2 md:gap-6 text-xs md:text-sm text-gray-500 mb-6 md:mb-8">
            <div className="flex items-center gap-1">
              <span className="hidden md:inline">By</span>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden md:inline">{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <span className="md:hidden">{new Date(post.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short'
              })}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="hidden md:flex items-center gap-1 md:gap-2">
              <span className="text-blue-600">{post.views} views</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="aspect-[16/9] rounded-lg md:rounded-xl overflow-hidden mb-6 md:mb-8">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pb-12">
          <div className="prose prose-sm md:prose-base lg:prose-lg prose-gray w-full max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-img:max-w-full">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs md:text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
} 