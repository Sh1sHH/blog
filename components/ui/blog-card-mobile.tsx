'use client';

import Link from 'next/link';
import { BlogPostMeta } from '@/lib/blog';
import { Clock } from 'lucide-react';

interface BlogCardMobileProps {
  post: BlogPostMeta;
  categoryLabel?: string;
}

export default function BlogCardMobile({ post, categoryLabel }: BlogCardMobileProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col">
        {/* Image Container */}
        <div className="relative h-32 sm:h-40 overflow-hidden flex-shrink-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Reading Time Badge */}
          <div className="absolute top-2 left-2">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm text-slate-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {post.readTime} min
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
            {post.title}
          </h3>
          
          <p className="text-xs text-slate-600 line-clamp-2 flex-1 mb-2">
            {post.description}
          </p>
          
          <div className="mt-auto">
            <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
              {categoryLabel || post.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 