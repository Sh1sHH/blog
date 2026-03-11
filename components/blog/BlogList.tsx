'use client';

import { useState, useEffect } from 'react';
import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  title?: string;
  showFeatured?: boolean;
  initialCategory?: string;
}

const categories = [
  'All', 'Practical Tips', 'Decoration', 'Gift Items',
  'Kitchen', 'Bathroom', 'Living Room', 'Office', 'Bedroom', 'General',
];

export default function BlogList({ posts, showFeatured = false, initialCategory = 'All' }: BlogListProps) {
  const [selected, setSelected] = useState<string>(initialCategory);

  useEffect(() => {
    setSelected(initialCategory);
  }, [initialCategory]);

  const filtered = selected === 'All' ? posts : posts.filter(p => p.category === selected);
  const featured = showFeatured ? filtered.filter(p => p.featured) : [];
  const regular  = showFeatured ? filtered.filter(p => !p.featured) : filtered;

  return (
    <div className="space-y-10">

      {/* ── Category filter bar ── */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400 shrink-0 hidden sm:block">
          Filter
        </span>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1 pb-1">
            {categories.map((cat) => {
              const active = selected === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelected(cat)}
                  className="flex-shrink-0 px-3 py-1.5 text-xs uppercase tracking-widest transition-all whitespace-nowrap"
                  style={{
                    fontWeight: active ? 600 : 400,
                    color: active ? '#0a0a0a' : '#94a3b8',
                    borderBottom: active ? '2px solid #B8965A' : '2px solid transparent',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Posts grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div style={{ width: 2, height: 48, backgroundColor: '#e2e8f0', marginBottom: 24 }} />
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">No results</p>
          <p className="text-sm text-slate-500 mb-8">
            No articles found in &ldquo;{selected}&rdquo;.
          </p>
          <button
            onClick={() => setSelected('All')}
            className="text-xs uppercase tracking-widest px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Show All Articles
          </button>
        </div>
      ) : (
        <>
          {/* Section label */}
          <div className="flex items-center gap-4 -mt-2">
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-slate-400 shrink-0">
              {selected === 'All' ? 'All Articles' : `${selected}`}
            </span>
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300 shrink-0">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((post) => (
              <BlogCard key={post.slug} post={post} featured />
            ))}
            {regular.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
