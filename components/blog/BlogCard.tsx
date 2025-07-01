import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPostMeta } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-full">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={800}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70" />
          
          {post.featured && (
            <div className="absolute top-4 left-4 bg-white text-black text-sm py-1.5 px-4 rounded-full z-10">
              Öne Çıkan
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-xl mb-2 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-sm mb-3 line-clamp-2 text-gray-200">
              {post.description}
            </p>
            
            <div className="flex items-center justify-between text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}