import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Valid categories mapping Turkish to English
const categoryMapping: { [key: string]: string } = {
  'pratik-bilgiler': 'Pratik Bilgiler',
  'practical-tips': 'Pratik Bilgiler',
  'dekorasyon': 'Dekorasyon', 
  'decoration': 'Dekorasyon',
  'hediyelik-esyalar': 'Hediyelik Eşyalar',
  'gift-items': 'Hediyelik Eşyalar',
  'kitchen': 'Kitchen',
  'bathroom': 'Bathroom', 
  'living-room': 'Living Room',
  'office': 'Office',
  'bedroom': 'Bedroom',
  'hallway': 'Hallway',
  'general': 'General'
};

// English category names for display
const categoryDisplayNames: { [key: string]: string } = {
  'Pratik Bilgiler': 'Practical Tips',
  'Dekorasyon': 'Decoration',
  'Hediyelik Eşyalar': 'Gift Items',
  'Kitchen': 'Kitchen',
  'Bathroom': 'Bathroom',
  'Living Room': 'Living Room', 
  'Office': 'Office',
  'Bedroom': 'Bedroom',
  'Hallway': 'Hallway',
  'General': 'General'
};

interface CategoryPageProps {
  params: { category: string }
}

// Get category name from URL
function getCategoryFromUrl(urlCategory: string): string | null {
  const decodedCategory = decodeURIComponent(urlCategory.toLowerCase());
  return categoryMapping[decodedCategory] || null;
}

// Get display name for category
function getDisplayName(firebaseCategory: string): string {
  return categoryDisplayNames[firebaseCategory] || firebaseCategory;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const firebaseCategory = getCategoryFromUrl(params.category);
  
  if (!firebaseCategory) {
    return {
      title: 'Category Not Found - NishHome',
      description: 'The requested category was not found.',
    };
  }

  const displayName = getDisplayName(firebaseCategory);
  
  return {
    title: `${displayName} Articles - NishHome`,
    description: `Browse all articles in ${displayName} category. Discover tips, guides, and insights about ${displayName.toLowerCase()}.`,
    openGraph: {
      title: `${displayName} Articles | NishHome`,
      description: `Browse all articles in ${displayName} category. Discover tips, guides, and insights about ${displayName.toLowerCase()}.`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const firebaseCategory = getCategoryFromUrl(params.category);
  
  // Check if category exists
  if (!firebaseCategory) {
    notFound();
  }

  const displayName = getDisplayName(firebaseCategory);
  const allPosts = await getAllPosts();
  
  // Filter posts by Firebase category name
  const categoryPosts = allPosts.filter(post => 
    post.category === firebaseCategory && post.published
  );

  // Category descriptions in English
  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'Pratik Bilgiler':
        return 'Practical tips, guides, and expert recommendations for home decoration';
      case 'Dekorasyon':
        return 'Decoration ideas and design inspiration to beautify every corner of your home';
      case 'Hediyelik Eşyalar':
        return 'Special gift ideas and home decoration gift recommendations to make your loved ones happy';
      case 'Kitchen':
        return 'Kitchen decoration and organization tips and ideas';
      case 'Bathroom':
        return 'Bathroom decoration and design recommendations';
      case 'Living Room':
        return 'Living room decoration and arrangement ideas';
      case 'Office':
        return 'Home office and workspace organization recommendations';
      case 'Bedroom':
        return 'Bedroom decoration and design ideas';
      case 'Hallway':
        return 'Hallway and entrance area decoration recommendations';
      default:
        return `Discover all articles in ${getDisplayName(category)} category`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            {displayName}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {getCategoryDescription(firebaseCategory)}
          </p>
          <div className="w-16 md:w-24 h-1 bg-blue-600 mx-auto mt-4 md:mt-6 rounded"></div>
          
          {/* Post Count */}
          <div className="mt-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {categoryPosts.length} {categoryPosts.length === 1 ? 'article' : 'articles'} found
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {categoryPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles yet
              </h3>
              <p className="text-gray-600 mb-6">
                There are no published articles in the {displayName} category yet.
              </p>
              <Link 
                href="/blog" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </div>
        )}

        {/* Back to Categories */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static params for better performance
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
    { category: 'hallway' },
    { category: 'general' }
  ];
} 