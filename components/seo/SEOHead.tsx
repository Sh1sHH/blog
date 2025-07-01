import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  publishedTime?: string;
  author?: string;
  category?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  publishedTime,
  author,
  category
}: SEOHeadProps) {
  const siteTitle = 'ContentHub';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://contenthub.com';
  const fullCanonicalUrl = canonicalUrl || siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ogType === 'article' ? 'Article' : 'WebSite',
    headline: title,
    description,
    url: fullCanonicalUrl,
    image: fullOgImage,
    ...(ogType === 'article' && {
      author: {
        '@type': 'Person',
        name: author || 'ContentHub Team'
      },
      publisher: {
        '@type': 'Organization',
        name: siteTitle,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`
        }
      },
      datePublished: publishedTime,
      articleSection: category
    })
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author || 'ContentHub Team'} />
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content={siteTitle} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}
      {category && <meta property="article:section" content={category} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}