import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  title?: string;
  showFeatured?: boolean;
}

export default function BlogList({ posts, title, showFeatured = false }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 text-lg">Henüz yazı bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {title && (
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-slate-800 mb-6">{title}</h2>
          <div className="w-20 h-1 bg-slate-600 mx-auto rounded-full"></div>
        </div>
      )}

      {/* Pinterest Masonry Style Grid */}
      <div className="columns-1 md:columns-2 gap-8 space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="mb-8">
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