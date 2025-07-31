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
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

const formSchema = z.object({
  title: z.string().min(10, 'Başlık en az 10 karakter olmalıdır.'),
  description: z.string().min(20, 'Açıklama en az 20 karakter olmalıdır.'),
  content: z.string().min(100, 'İçerik en az 100 karakter olmalıdır.'),
  category: z.string().min(2, 'Kategori gereklidir.'),
  tags: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export default function NewPostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      category: 'General',
      tags: '',
      published: false,
      featured: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Bu işlemi yapmak için giriş yapmalısınız.');
      }

      const idToken = await user.getIdToken();

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
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
        throw new Error(errorData.error || 'Post oluşturulamadı.');
      }

      const newPost = await response.json();

      toast({
        title: 'Başarılı!',
        description: `"${newPost.title}" başlıklı post oluşturuldu.`,
      });

      router.push(`/admin/posts/edit/${newPost.slug}`);
    } catch (error: any) {
      console.error('Post oluşturma hatası:', error);
      toast({
        title: 'Bir Hata Oluştu',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Yeni Yazı Oluştur</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Başlık</FormLabel>
                <FormControl>
                  <Input placeholder="Yazınızın başlığı..." {...field} />
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
                  <Textarea placeholder="Yazınız için kısa bir özet..." {...field} />
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
                  <Input placeholder="Örn: Dekorasyon" {...field} />
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
                  <Input placeholder="Etiketleri virgülle ayırın..." {...field} />
                </FormControl>
                <FormDescription>
                  Örn: mutfak, modern, aydınlatma
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
                    <FormDescription>
                      Aktif edildiğinde yazı sitede görünür olur.
                    </FormDescription>
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
                    <FormDescription>
                      Anasayfada öne çıkan yazılarda gösterilir.
                    </FormDescription>
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
            {loading ? 'Oluşturuluyor...' : 'Yazıyı Oluştur'}
          </Button>
        </form>
      </Form>
    </div>
  );
}