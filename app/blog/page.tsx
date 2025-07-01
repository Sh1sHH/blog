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

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Articles</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of articles, reviews, and guides 
            covering a wide range of topics.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded"></div>
        </div>

        <BlogList posts={allPosts} showFeatured={true} />
      </div>
    </div>
  );
}