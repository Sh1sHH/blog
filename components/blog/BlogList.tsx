import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  title?: string;
  showFeatured?: boolean;
}

const categories = [
  "All", "Decoration", "Kitchen", "Bathroom", "Living Room", "Office", "Bedroom", "Hallway"
];

export default function BlogList({ posts, title = "For You", showFeatured = false }: BlogListProps) {
  const featuredPosts = showFeatured ? posts.filter(post => post.featured) : [];
  const regularPosts = showFeatured ? posts.filter(post => !post.featured) : posts;

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">No articles found yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
          <div className="w-16 h-0.5 bg-slate-600 mx-auto mt-2 rounded-full"></div>
          
          {/* Minimal Kategoriler */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Featured Posts */}
        {featuredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} featured />
        ))}
        
        {/* Regular Posts */}
        {regularPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}