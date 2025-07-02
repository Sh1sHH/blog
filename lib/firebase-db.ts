import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';

// Blog Post Interface
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  image?: string;
  
  // SEO Fields
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  
  // Stats
  views: number;
  likes: number;
}

// Firestore'dan gelen data tipini BlogPost'a çevir
const convertFirestoreDoc = (doc: any): BlogPost => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  } as BlogPost;
};

// Slug oluşturma fonksiyonu
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
};

// Posts Collection Reference
const postsCollection = collection(db, 'posts');

export class FirestorePostService {
  
  // Tüm postları getir
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(postsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertFirestoreDoc);
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  // Tek post getir (slug ile)
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(postsCollection, where('slug', '==', slug), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      return convertFirestoreDoc(querySnapshot.docs[0]);
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      throw new Error('Failed to fetch post');
    }
  }

  // Post oluştur
  async createPost(postData: Partial<BlogPost>): Promise<{ success: boolean; post?: BlogPost; error?: string }> {
    try {
      // Validasyon
      if (!postData.title || !postData.content) {
        return { success: false, error: 'Title and content are required' };
      }

      // Slug oluştur
      const slug = postData.slug || createSlug(postData.title);
      
      // Slug çakışması kontrol et
      const existingPost = await this.getPostBySlug(slug);
      if (existingPost) {
        return { success: false, error: 'A post with this slug already exists' };
      }

      const newPostData = {
        slug,
        title: postData.title,
        content: postData.content,
        description: postData.description || '',
        category: postData.category || 'General',
        tags: postData.tags || [],
        featured: postData.featured || false,
        published: postData.published || false,
        author: postData.author || 'Admin',
        image: postData.image || '/images/blog/default.jpg',
        
        // SEO
        seoTitle: postData.seoTitle || postData.title,
        seoDescription: postData.seoDescription || postData.description || '',
        keywords: postData.keywords || [],
        
        // Stats
        views: 0,
        likes: 0,
        
        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(postsCollection, newPostData);
      
      // Oluşturulan dokümanı getir
      const newDoc = await getDoc(docRef);
      const newPost = convertFirestoreDoc(newDoc);
      
      return { success: true, post: newPost };
    } catch (error) {
      console.error('Error creating post:', error);
      return { success: false, error: 'Failed to create post' };
    }
  }

  // Post güncelle
  async updatePost(slug: string, postData: Partial<BlogPost>): Promise<{ success: boolean; post?: BlogPost; error?: string; newSlug?: string }> {
    try {
      // Mevcut post'u bul
      const existingPost = await this.getPostBySlug(slug);
      if (!existingPost) {
        return { success: false, error: 'Post not found' };
      }

      // Yeni slug kontrolü
      const newSlug = postData.slug || (postData.title ? createSlug(postData.title) : slug);
      
      // Slug değiştiyse çakışma kontrol et
      if (newSlug !== slug) {
        const slugConflict = await this.getPostBySlug(newSlug);
        if (slugConflict) {
          return { success: false, error: 'A post with this slug already exists' };
        }
      }

      const updateData = {
        ...postData,
        slug: newSlug,
        updatedAt: serverTimestamp(),
        
        // SEO auto-fill
        seoTitle: postData.seoTitle || postData.title || existingPost.seoTitle,
        seoDescription: postData.seoDescription || postData.description || existingPost.seoDescription,
      };

      // ID'yi sil (Firestore otomatik günceller)
      delete updateData.id;
      delete updateData.createdAt; // createdAt değişmez

      const docRef = doc(db, 'posts', existingPost.id);
      await updateDoc(docRef, updateData);
      
      // Güncellenmiş dokümanı getir
      const updatedDoc = await getDoc(docRef);
      const updatedPost = convertFirestoreDoc(updatedDoc);
      
      return { 
        success: true, 
        post: updatedPost,
        newSlug: newSlug !== slug ? newSlug : undefined
      };
    } catch (error) {
      console.error('Error updating post:', error);
      return { success: false, error: 'Failed to update post' };
    }
  }

  // Post sil
  async deletePost(slug: string): Promise<{ success: boolean; error?: string }> {
    try {
      const existingPost = await this.getPostBySlug(slug);
      if (!existingPost) {
        return { success: false, error: 'Post not found' };
      }

      const docRef = doc(db, 'posts', existingPost.id);
      await deleteDoc(docRef);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { success: false, error: 'Failed to delete post' };
    }
  }

  // Published postları getir
  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        postsCollection, 
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertFirestoreDoc);
    } catch (error) {
      console.error('Error fetching published posts:', error);
      throw new Error('Failed to fetch published posts');
    }
  }

  // Featured postları getir
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const q = query(
        postsCollection, 
        where('featured', '==', true),
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertFirestoreDoc);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      throw new Error('Failed to fetch featured posts');
    }
  }

  // Kategoriye göre postları getir
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const q = query(
        postsCollection, 
        where('category', '==', category),
        where('published', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(convertFirestoreDoc);
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      throw new Error('Failed to fetch posts by category');
    }
  }

  // View sayısını artır
  async incrementViews(slug: string): Promise<void> {
    try {
      const post = await this.getPostBySlug(slug);
      if (post) {
        const docRef = doc(db, 'posts', post.id);
        await updateDoc(docRef, {
          views: (post.views || 0) + 1,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }

  // Kategorileri getir
  async getCategories(): Promise<string[]> {
    try {
      const posts = await this.getAllPosts();
      const categories = Array.from(new Set(posts.map(post => post.category)));
      return categories.sort();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  // Tag'leri getir
  async getTags(): Promise<string[]> {
    try {
      const posts = await this.getAllPosts();
      const tags = Array.from(new Set(posts.flatMap(post => post.tags)));
      return tags.sort();
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }
}

// Singleton instance
export const firestoreDB = new FirestorePostService(); 