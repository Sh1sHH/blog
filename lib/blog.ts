import { marked } from 'marked';
import { firestoreDB, BlogPost as FirestoreBlogPost } from './firebase-db';

// Kategori adlarını Türkçe'den İngilizce'ye çeviren mapping
const categoryDisplayMapping: { [key: string]: string } = {
  'Pratik Bilgiler': 'Practical Tips',
  'Dekorasyon': 'Decoration',
  'Hediyelik Eşyalar': 'Gift Items',
  'Kitchen': 'Kitchen',
  'Bathroom': 'Bathroom', 
  'Living Room': 'Living Room',
  'Office': 'Office',
  'Bedroom': 'Bedroom',
  'Hallway': 'Hallway',
  'General': 'General'
};

// Kategori adını İngilizce olarak döndürür (SEO için)
export function getCategoryDisplayName(category: string): string {
  return categoryDisplayMapping[category] || category;
}

// Blog frontend için interface (Firebase'dekiyle uyumlu)
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
  content: string;
  readTime: number;
  views: number;
  likes: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  image: string;
  readTime: number;
  views: number;
  likes: number;
}

// Calculate reading time based on content
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Firebase post'unu frontend post'una çevir
function convertFirestorePost(firestorePost: FirestoreBlogPost): BlogPostMeta {
  return {
    slug: firestorePost.slug,
    title: firestorePost.title,
    description: firestorePost.description,
    date: firestorePost.createdAt.toISOString(),
    author: firestorePost.author,
    category: getCategoryDisplayName(firestorePost.category), // İngilizce kategori adı
    tags: firestorePost.tags,
    featured: firestorePost.featured,
    published: firestorePost.published,
    image: firestorePost.image || '/images/default-post.jpg',
    readTime: calculateReadTime(firestorePost.content),
    views: firestorePost.views,
    likes: firestorePost.likes,
  };
}

// Get all published blog posts metadata
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const firestorePosts = await firestoreDB.getPublishedPosts();
    return firestorePosts.map(convertFirestorePost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const firestorePost = await firestoreDB.getPostBySlug(slug);
    
    if (!firestorePost || !firestorePost.published) {
      return null;
    }

    // Configure marked for better HTML output
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const htmlContent = marked(firestorePost.content) as string;

    // Increment views
    await firestoreDB.incrementViews(slug);

    return {
      slug: firestorePost.slug,
      title: firestorePost.title,
      description: firestorePost.description,
      date: firestorePost.createdAt.toISOString(),
      author: firestorePost.author,
      category: getCategoryDisplayName(firestorePost.category), // İngilizce kategori adı
      tags: firestorePost.tags,
      featured: firestorePost.featured,
      image: firestorePost.image || '/images/default-post.jpg',
      content: htmlContent,
      readTime: calculateReadTime(firestorePost.content),
      views: firestorePost.views,
      likes: firestorePost.likes,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  try {
    const firestorePosts = await firestoreDB.getFeaturedPosts();
    return firestorePosts.map(convertFirestorePost).slice(0, 3);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  try {
    const firestorePosts = await firestoreDB.getPostsByCategory(category);
    return firestorePosts.map(convertFirestorePost);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  try {
    return await firestoreDB.getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get all tags
export async function getAllTags(): Promise<string[]> {
  try {
    return await firestoreDB.getTags();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Get latest posts (excluding current post)
export async function getLatestPosts(currentSlug?: string, limit: number = 3): Promise<BlogPostMeta[]> {
  try {
    const allPosts = await getAllPosts();
    
    // Filter out current post if provided
    const filteredPosts = currentSlug 
      ? allPosts.filter(post => post.slug !== currentSlug)
      : allPosts;
    
    // Sort by date (newest first) and return limited results
    return filteredPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

// Get related posts based on category and tags
export async function getRelatedPosts(
  currentSlug: string, 
  category: string, 
  tags: string[], 
  limit: number = 3
): Promise<BlogPostMeta[]> {
  try {
    const allPosts = await getAllPosts();
    
    // Filter out current post
    const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
    
    // Score posts based on relevance
    const scoredPosts = otherPosts.map(post => {
      let score = 0;
      
      // Same category gets higher score
      if (post.category.toLowerCase() === category.toLowerCase()) {
        score += 3;
      }
      
      // Shared tags get points
      const sharedTags = post.tags.filter(tag => 
        tags.some(currentTag => currentTag.toLowerCase() === tag.toLowerCase())
      );
      score += sharedTags.length * 2;
      
      return { post, score };
    });
    
    // Sort by score (highest first) and return limited results
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.post);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}