import { getAllPosts } from '@/lib/blog';
import BlogList from '@/components/blog/BlogList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - All Articles',
  description: 'Browse all our articles covering technology, lifestyle, reviews, and guides.',
  openGraph: {
    title: 'Blog - All Articles | ContentHub',
    description: 'Browse all our articles covering technology, lifestyle, reviews, and guides.',
  },
};

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const allPosts = await getAllPosts();
  const category = searchParams.category as string | undefined;

  // Kategori varsa başlığı ve açıklamayı güncelle
  const getPageTitle = () => {
    if (category) {
      return `${category} Articles`;
    }
    return "All Articles";
  };

  const getPageDescription = () => {
    if (category) {
      return `Browse all articles in ${category} category. Discover tips, guides, and insights.`;
    }
    return "Explore our comprehensive collection of articles, reviews, and guides covering a wide range of topics.";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {getPageDescription()}
          </p>
          <div className="w-16 md:w-24 h-1 bg-blue-600 mx-auto mt-4 md:mt-6 rounded"></div>
        </div>

        <BlogList 
          posts={allPosts} 
          showFeatured={true} 
          initialCategory={category || "All"}
        />
      </div>
    </div>
  );
}