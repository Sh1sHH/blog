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

// İngilizce kategori listesi (SEO için)
const categories = [
  "All", "Practical Tips", "Decoration", "Gift Items", "Kitchen", "Bathroom", "Living Room", "Office", "Bedroom", "Hallway", "General"
];

export default function BlogList({ posts, title = "For You", showFeatured = false, initialCategory = "All" }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  // URL'den gelen kategori değiştiğinde state'i güncelle
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Kategori filtreleme
  const filterPostsByCategory = (posts: BlogPostMeta[], category: string) => {
    if (category === "All") return posts;
    return posts.filter(post => post.category === category);
  };

  // Tüm postları kategoriye göre filtrele
  const filteredPosts = filterPostsByCategory(posts, selectedCategory);
  
  const featuredPosts = showFeatured ? filteredPosts.filter(post => post.featured) : [];
  const regularPosts = showFeatured ? filteredPosts.filter(post => !post.featured) : filteredPosts;

  // Filtrelenmiş postlar kontrolü
  if (filteredPosts.length === 0) {
    return (
      <div className="space-y-8">
        {title && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
            <div className="w-16 h-0.5 bg-slate-600 mx-auto mt-2 rounded-full"></div>
            
            {/* Kategori Filtreleri */}
            <div className="mt-6 px-4 -mx-4">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 md:justify-center md:flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex-shrink-0 px-4 py-2 text-sm rounded-full transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            {selectedCategory === "All" 
              ? "No articles found yet." 
              : `No articles found in "${selectedCategory}" category.`
            }
          </p>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Articles
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            {selectedCategory === "All" ? title : `${selectedCategory} Articles`}
          </h2>
          <div className="w-16 h-0.5 bg-slate-600 mx-auto mt-2 rounded-full"></div>
          
          {/* Kategori Filtreleri - Mobilde Scroll Edilebilir */}
          <div className="mt-6 px-4 -mx-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 md:justify-center md:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 text-sm rounded-full transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid - Mobilde Daha Küçük Gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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