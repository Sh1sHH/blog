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
    <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-full">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
          
          <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
            2 days ago
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 text-white group-hover:bottom-28 transition-all duration-500 text-center">
            <h3 className="font-bold text-xl leading-tight line-clamp-3">
              {post.title}
            </h3>
          </div>
          
          <div className="absolute bottom-0 left-4 right-4 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-sm text-gray-200 line-clamp-2 mb-3">
              {post.description}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}