import { getAllPosts } from '@/lib/blog';
import BlogList from '@/components/blog/BlogList';
import { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import Link from 'next/link';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  display: 'swap',
});

interface BlogPageProps {
  searchParams: {
    category?: string;
  };
}

export const metadata: Metadata = {
  title: 'Blog | CleverSpaceSolutions',
  description: 'Practical guides, decoration ideas, and space-saving tips for small homes. Browse storage solutions, kitchen organization, and room makeover articles by the CleverSpaceSolutions team.',
  alternates: {
    canonical: 'https://cleverspacesolutions.com/blog',
  },
  openGraph: {
    title: 'Blog | CleverSpaceSolutions',
    description: 'Practical guides, decoration ideas, and space-saving tips for small homes. Browse storage solutions, kitchen organization, and room makeover articles by the CleverSpaceSolutions team.',
    url: 'https://cleverspacesolutions.com/blog',
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'CleverSpaceSolutions Blog' }],
  },
};

export const revalidate = 900;

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = await getAllPosts();
  const category = searchParams.category as string | undefined;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO BAND ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-12"
            style={{ fontSize: '11px', letterSpacing: '0.18em' }}>
            <Link href="/" className="uppercase text-slate-400 no-underline hover:opacity-70 transition-opacity">
              Home
            </Link>
            <span className="text-slate-200">/</span>
            <span className="uppercase text-slate-600">Blog</span>
          </nav>

          {/* Title block */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-end">
            <div className="md:col-span-3">
              <p className="mb-5 uppercase font-medium" style={{ fontSize: '11px', letterSpacing: '0.35em', color: '#B8965A' }}>
                — Ideas &amp; Guides
              </p>
              <h1 className={`${cormorant.className} leading-none tracking-tight`}
                style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
                <span className="block font-light text-slate-400">All</span>
                <span className="block font-semibold text-slate-900">Articles</span>
              </h1>
            </div>

            <div className="md:col-span-2 pb-1">
              <p className="text-sm leading-relaxed text-slate-500" style={{ maxWidth: '300px' }}>
                Practical guides, decoration ideas, and space-saving tips for small homes — curated by the CleverSpaceSolutions team.
              </p>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '24px' }}>
                <div className="flex items-baseline gap-2">
                  <span className={`${cormorant.className} font-semibold tabular-nums text-slate-900`}
                    style={{ fontSize: '32px' }}>
                    {allPosts.length}
                  </span>
                  <span className="uppercase text-slate-400" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
                    {allPosts.length === 1 ? 'Article' : 'Articles'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <BlogList
          posts={allPosts}
          showFeatured={true}
          initialCategory={category || 'All'}
        />
      </div>
    </div>
  );
}
