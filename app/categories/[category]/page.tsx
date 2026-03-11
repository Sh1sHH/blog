import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Cormorant_Garamond } from 'next/font/google';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 600;

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const categoryMapping: { [key: string]: string } = {
  'pratik-bilgiler': 'Practical Tips',
  'practical-tips': 'Practical Tips',
  'dekorasyon': 'Decoration',
  'decoration': 'Decoration',
  'hediyelik-esyalar': 'Gift Items',
  'gift-items': 'Gift Items',
  'kitchen': 'Kitchen',
  'bathroom': 'Bathroom',
  'living-room': 'Living Room',
  'office': 'Office',
  'bedroom': 'Bedroom',
  'balcony': 'Balcony',
  'general': 'General',
};

const categoryMeta: { [key: string]: { sub: string; description: string } } = {
  'Practical Tips':  { sub: 'Smart Solutions',    description: 'Actionable guides and expert advice for a more organized, efficient everyday life at home.' },
  'Decoration':      { sub: 'Style & Aesthetics',  description: 'Design inspiration and decoration ideas to transform every corner of your living space.' },
  'Gift Items':      { sub: 'For Every Budget',    description: 'Thoughtful gift picks and home décor recommendations for the people you care about.' },
  'Kitchen':         { sub: 'Cook & Organize',     description: 'Kitchen organization tips, small kitchen ideas, and functional design upgrades.' },
  'Bathroom':        { sub: 'Refresh & Renew',     description: 'Bathroom décor, storage hacks, and design ideas for every budget and style.' },
  'Living Room':     { sub: 'Gather & Relax',      description: 'Living room arrangement ideas, furniture tips, and cozy décor inspiration.' },
  'Office':          { sub: 'Work from Home',       description: 'Home office setup guides, desk organization, and productivity-boosting space ideas.' },
  'Bedroom':         { sub: 'Rest & Restore',      description: 'Bedroom decoration, storage solutions, and design ideas for a calm, personal retreat.' },
  'Balcony':         { sub: 'Outdoor Living',       description: 'Small balcony garden ideas, outdoor décor, and compact patio solutions.' },
  'General':         { sub: 'All Topics',           description: 'A mix of home improvement ideas, lifestyle tips, and space-saving inspiration.' },
};

interface CategoryPageProps {
  params: { category: string };
}

function getCategoryFromUrl(urlCategory: string): string | null {
  const decoded = decodeURIComponent(urlCategory.toLowerCase());
  return categoryMapping[decoded] || null;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryFromUrl(params.category);

  if (!category) {
    return {
      title: 'Category Not Found — CleverSpaceSolutions',
      description: 'The requested category was not found.',
    };
  }

  const allPosts = await getAllPosts();
  const posts = allPosts.filter(p => p.category === category && p.published);
  const meta = categoryMeta[category];

  return {
    title: `${category} — CleverSpaceSolutions`,
    description: meta?.description ?? `Browse all ${category} articles on CleverSpaceSolutions.`,
    alternates: {
      canonical: `https://cleverspacesolutions.com/categories/${params.category}`,
    },
    openGraph: {
      title: `${category} | CleverSpaceSolutions`,
      description: meta?.description ?? `Browse all ${category} articles on CleverSpaceSolutions.`,
      url: `https://cleverspacesolutions.com/categories/${params.category}`,
      type: 'website',
      images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
    },
    robots: posts.length === 0 ? 'noindex, follow' : 'index, follow',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryFromUrl(params.category);
  if (!category) notFound();

  const allPosts = await getAllPosts();
  const posts = allPosts.filter(p => p.category === category && p.published);
  const meta = categoryMeta[category] ?? { sub: 'Articles', description: '' };

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
            <Link href="/blog" className="uppercase text-slate-400 no-underline hover:opacity-70 transition-opacity">
              Blog
            </Link>
            <span className="text-slate-200">/</span>
            <span className="uppercase text-slate-600">{category}</span>
          </nav>

          {/* Title block */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-end">
            <div className="md:col-span-3">
              <p className="mb-5 uppercase font-medium" style={{ fontSize: '11px', letterSpacing: '0.35em', color: '#B8965A' }}>
                — {meta.sub}
              </p>
              <h1 className={`${cormorant.className} leading-none tracking-tight`}
                style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
                <span className="block font-light text-slate-400">Browse</span>
                <span className="block font-semibold text-slate-900">{category}</span>
              </h1>
            </div>

            <div className="md:col-span-2 pb-1">
              <p className="text-sm leading-relaxed text-slate-500 mb-8" style={{ maxWidth: '300px' }}>
                {meta.description}
              </p>
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <div className="flex items-baseline gap-2">
                  <span className={`${cormorant.className} font-semibold tabular-nums text-slate-900`}
                    style={{ fontSize: '32px' }}>
                    {posts.length}
                  </span>
                  <span className="uppercase text-slate-400" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>
                    {posts.length === 1 ? 'Article' : 'Articles'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {posts.length > 0 ? (
          <>
            {/* Section label */}
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400 shrink-0">
                All Articles
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div style={{ width: 2, height: 60, backgroundColor: '#e2e8f0', marginBottom: 32 }} />
            <p className="uppercase text-slate-400 mb-4" style={{ fontSize: '10px', letterSpacing: '0.3em' }}>
              Coming Soon
            </p>
            <h2 className={`${cormorant.className} font-light text-slate-700 mb-6`}
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              No articles yet in {category}
            </h2>
            <p className="text-sm text-slate-400 mb-10" style={{ maxWidth: 340 }}>
              We&apos;re working on it. In the meantime, explore all our articles below.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-slate-800 transition-colors no-underline"
            >
              View All Articles
            </Link>
          </div>
        )}

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex items-center gap-3">
          <div style={{ width: 2, height: 16, backgroundColor: '#B8965A' }} />
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors no-underline"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { category: 'practical-tips' },
    { category: 'decoration' },
    { category: 'gift-items' },
    { category: 'kitchen' },
    { category: 'bathroom' },
    { category: 'living-room' },
    { category: 'office' },
    { category: 'bedroom' },
    { category: 'balcony' },
    { category: 'general' },
  ];
}
