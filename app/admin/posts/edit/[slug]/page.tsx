'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { firestoreDB } from '@/lib/firebase-db';
import { BlogPost } from '@/lib/firebase-db';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  title: z.string().min(10, 'Başlık en az 10 karakter olmalıdır.'),
  description: z.string().min(20, 'Açıklama en az 20 karakter olmalıdır.'),
  content: z.string().min(100, 'İçerik en az 100 karakter olmalıdır.'),
  category: z.string().min(2, 'Kategori gereklidir.'),
  tags: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<BlogPost | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      category: '',
      tags: '',
      published: false,
      featured: false,
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const fetchedPost = await firestoreDB.getPostBySlug(params.slug);
      if (fetchedPost) {
        setPost(fetchedPost);
        form.reset({
          title: fetchedPost.title,
          description: fetchedPost.description,
          content: fetchedPost.content,
          category: fetchedPost.category,
          tags: fetchedPost.tags.join(', '),
          published: fetchedPost.published,
          featured: fetchedPost.featured,
        });
      }
      setLoading(false);
    };
    fetchPost();
  }, [params.slug, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Bu işlemi yapmak için giriş yapmalısınız.');
      }
      
      const idToken = await user.getIdToken();

      const response = await fetch(`/api/admin/posts/${params.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          ...values,
          tags: values.tags?.split(',').map(tag => tag.trim()) || [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Post güncellenemedi.');
      }

      const updatedPost = await response.json();

      toast({
        title: 'Başarılı!',
        description: `"${updatedPost.title}" başlıklı post güncellendi.`,
      });

      if (updatedPost.slug && updatedPost.slug !== params.slug) {
        router.push(`/admin/posts/edit/${updatedPost.slug}`);
      }
    } catch (error: any) {
      console.error('Post güncelleme hatası:', error);
      toast({
        title: 'Bir Hata Oluştu',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading && !post) {
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-10 w-1/2 mb-6" />
        <div className="space-y-8">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="container mx-auto py-10">Yazı bulunamadı.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Yazıyı Düzenle</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlık</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kısa Açıklama</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İçerik</FormLabel>
                <FormControl>
                   <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etiketler</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Etiketleri virgülle ayırın.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-8">
             <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Yayınla</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Öne Çıkar</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
          </Button>
        </form>
      </Form>
    </div>
  );
}