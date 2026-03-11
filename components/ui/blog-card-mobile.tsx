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
    <Link href={`/blog/${post.slug}`} className="no-underline block">
      <div className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ height: '240px' }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-[40%] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1 mb-2 text-white/40" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
            <Clock className="w-3 h-3" />
            <span className="uppercase">{post.readTime} min read</span>
          </div>
          <h3 className="text-white font-light text-sm leading-snug line-clamp-2 tracking-wide">
            {post.title}
          </h3>
          <div
            className="mt-2 h-px transition-all duration-500 w-0 group-hover:w-6"
            style={{ backgroundColor: '#B8965A' }}
          />
        </div>
      </div>
    </Link>
  );
}
