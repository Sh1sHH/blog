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
    <article className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2">
      <Link href={`/blog/${post.slug}`} className="no-underline">
        <div className="relative h-full">
          <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
          
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/50 text-white text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 rounded-full backdrop-blur-sm">
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          
          <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 text-white group-hover:bottom-20 md:group-hover:bottom-28 transition-all duration-500 text-center">
            <h3 className="font-bold text-lg md:text-xl leading-tight line-clamp-3">
              {post.title}
            </h3>
          </div>
          
          <div className="absolute bottom-0 left-3 right-3 md:left-4 md:right-4 text-white p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-xs md:text-sm text-gray-200 line-clamp-2 mb-2 md:mb-3">
              {post.description}
            </p>
            
            <div className="flex items-center justify-between text-xs md:text-sm">
                                      <div className="flex items-center space-x-1 md:space-x-2 text-gray-300">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{post.readTime} min</span>
                        </div>
              <span className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-white backdrop-blur-sm text-xs">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}