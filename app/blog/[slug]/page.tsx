import { getPostBySlug, getAllPosts, getLatestPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPostPageProps {
  params: { slug: string };
}

// Kategori adını URL-friendly format'a çeviren fonksiyon
function getCategoryUrl(category: string): string {
  const categoryUrlMapping: { [key: string]: string } = {
    'Practical Tips': 'practical-tips',
    'Decoration': 'decoration',
    'Gift Items': 'gift-items',
    'Kitchen': 'kitchen',
    'Bathroom': 'bathroom',
    'Living Room': 'living-room',
    'Office': 'office',
    'Bedroom': 'bedroom',
    'Hallway': 'hallway',
    'General': 'general'
  };
  
  return categoryUrlMapping[category] || category.toLowerCase().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Get latest posts (excluding current post)
  const latestPosts = await getLatestPosts(post.slug, 3);

  // JSON-LD structured data for SEO - English only
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": {
      "@type": "ImageObject",
      "url": post.image,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://cleverspacesolutions.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CleverSpaceSolutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cleverspacesolutions.com/images/navbar/logo2.webp"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cleverspacesolutions.com/blog/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.replace(/<[^>]*>/g, '').split(' ').length,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true
  };

  return (
    <>
      {/* JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="min-h-screen bg-white overflow-x-hidden">
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
          {/* Tıklanabilir Kategori Badge */}
          <Link href={`/categories/${getCategoryUrl(post.category)}`} className="inline-block no-underline">
            <Badge className="mb-3 md:mb-4 text-xs md:text-sm hover:bg-blue-700 transition-colors cursor-pointer">
              {post.category}
            </Badge>
          </Link>
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
          <Button variant="ghost" size="sm" className="ml-auto text-xs md:text-sm p-1 md:p-2">
            <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Share</span>
          </Button>
        </div>

        {/* Featured Image */}
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
      </header>

      {/* Content */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="prose prose-sm md:prose-base lg:prose-lg prose-gray w-full max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-img:max-w-full">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 mb-6 md:mb-8">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} className="text-xs md:text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Other Articles Section */}
        {latestPosts.length > 0 && (
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 pb-12 md:pb-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Other Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {latestPosts.map((latestPost) => (
                <article 
                  key={latestPost.slug}
                  className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 relative"
                >
                  {/* Ana blog post linki */}
                  <Link href={`/blog/${latestPost.slug}`} className="no-underline block">
                    <div className="relative h-full">
                      <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                        <Image
                          src={latestPost.image}
                          alt={latestPost.title}
                          width={600}
                          height={800}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
                      
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/50 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full backdrop-blur-sm">
                        {new Date(latestPost.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      
                      <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 text-white group-hover:bottom-20 md:group-hover:bottom-28 transition-all duration-500 text-center">
                        <h3 className="font-bold text-lg md:text-xl leading-tight line-clamp-3">
                          {latestPost.title}
                        </h3>
                      </div>
                      
                      <div className="absolute bottom-0 left-3 right-3 md:left-4 md:right-4 text-white p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-xs md:text-sm text-gray-200 line-clamp-2 mb-2 md:mb-3">
                          {latestPost.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs md:text-sm">
                          <div className="flex items-center space-x-1 md:space-x-2 text-gray-300">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                            <span>{latestPost.readTime} min</span>
                          </div>
                          {/* Sadece kategori text'i - link ayrı olacak */}
                          <span className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-white backdrop-blur-sm text-xs">
                            {latestPost.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Kategori linki ayrı bir Link olarak - ana Link dışında */}
                  <Link 
                    href={`/categories/${getCategoryUrl(latestPost.category)}`}
                    className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-white backdrop-blur-sm text-xs hover:bg-white/30 transition-colors no-underline z-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500"
                  >
                    {latestPost.category}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
    </>
  );
}