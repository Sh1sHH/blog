import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const postsDirectory = path.join(process.cwd(), 'content/posts');

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
  image: string;
  readTime: number;
}

// Calculate reading time based on content
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get all blog posts metadata
export function getAllPosts(): BlogPostMeta[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        author: data.author || 'Anonymous',
        category: data.category || 'General',
        tags: data.tags || [],
        featured: data.featured || false,
        image: data.image || '/images/default-post.jpg',
        readTime: calculateReadTime(content),
      } as BlogPostMeta;
    });

  // Sort posts by date, newest first
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Get a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Configure marked for better HTML output
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const htmlContent = marked(content) as string;

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      category: data.category || 'General',
      tags: data.tags || [],
      featured: data.featured || false,
      image: data.image || '/images/default-post.jpg',
      content: htmlContent,
      readTime: calculateReadTime(content),
    };
  } catch (error) {
    return null;
  }
}

// Get featured posts
export function getFeaturedPosts(): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.featured).slice(0, 3);
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

// Get all unique categories
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = allPosts.map(post => post.category);
  return Array.from(new Set(categories));
}

// Get related posts based on category and tags
export function getRelatedPosts(currentSlug: string, category: string, tags: string[], limit: number = 3): BlogPostMeta[] {
  const allPosts = getAllPosts();
  
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
}