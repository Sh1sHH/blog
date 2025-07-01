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
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 break-inside-avoid">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={533}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {post.featured && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-slate-800 hover:bg-white backdrop-blur-sm">
              Öne Çıkan
            </Badge>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-3 text-xs text-slate-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} dk</span>
            </div>
          </div>

          <h3 className="font-semibold text-slate-800 mb-3 line-clamp-3 group-hover:text-slate-600 transition-colors text-lg leading-snug">
            {post.title}
          </h3>

          <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-600 font-medium">{post.author}</span>
            </div>
            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 px-2 py-1">
              {post.category}
            </Badge>
          </div>
        </div>
      </Link>
    </article>
  );
}