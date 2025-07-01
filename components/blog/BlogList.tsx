import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  title?: string;
  showFeatured?: boolean;
}

export default function BlogList({ posts, title = "For You", showFeatured = false }: BlogListProps) {
  // Gönderileri tarihe göre sırala (en yeni en üstte)
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">Henüz yazı bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
          <div className="w-16 h-0.5 bg-slate-600 mx-auto mt-2 rounded-full"></div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
          <div key={post.slug}>
            <BlogCard 
              post={post} 
              featured={post.featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
}