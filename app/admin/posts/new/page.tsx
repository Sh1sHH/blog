'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

export default function NewPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    description: '',
    category: 'General',
    tags: [] as string[],
    featured: false,
    published: false,
    customSlug: '',
    seoTitle: '',
    seoDescription: '',
    keywords: [] as string[],
    image: '',
  });

  // Temporary states
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  // SEO Score hesaplama
  const calculateSEOScore = () => {
    let score = 0;
    const maxScore = 100;

    // Title kontrolü (25 puan)
    if (formData.title.length >= 30 && formData.title.length <= 60) score += 25;
    else if (formData.title.length > 0) score += 10;

    // SEO Title kontrolü (20 puan)
    const seoTitle = formData.seoTitle || formData.title;
    if (seoTitle.length >= 30 && seoTitle.length <= 60) score += 20;
    else if (seoTitle.length > 0) score += 10;

    // Description kontrolü (20 puan)
    if (formData.description.length >= 120 && formData.description.length <= 160) score += 20;
    else if (formData.description.length > 0) score += 10;

    // SEO Description kontrolü (15 puan)
    const seoDesc = formData.seoDescription || formData.description;
    if (seoDesc.length >= 120 && seoDesc.length <= 160) score += 15;
    else if (seoDesc.length > 0) score += 7;

    // Keywords kontrolü (10 puan)
    if (formData.keywords.length >= 3) score += 10;
    else if (formData.keywords.length > 0) score += 5;

    // Content kontrolü (10 puan)
    if (formData.content.length >= 300) score += 10;
    else if (formData.content.length > 0) score += 5;

    return Math.min(score, maxScore);
  };

  const seoScore = calculateSEOScore();

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.customSlug) {
      const autoSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-+|-+$/g, '');
      
      setFormData(prev => ({ ...prev, customSlug: autoSlug }));
    }
  }, [formData.title]);

  // Auto-generate SEO title from title
  useEffect(() => {
    if (formData.title && !formData.seoTitle) {
      setFormData(prev => ({ ...prev, seoTitle: formData.title }));
    }
  }, [formData.title]);

  // Auto-generate SEO description from description
  useEffect(() => {
    if (formData.description && !formData.seoDescription) {
      setFormData(prev => ({ ...prev, seoDescription: formData.description }));
    }
  }, [formData.description]);

  // Tag ekleme
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // Tag silme
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Keyword ekleme
  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  // Keyword silme
  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  // Form submit
  const handleSubmit = async (publish: boolean = false) => {
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published: publish,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Post ${publish ? 'published' : 'saved as draft'} successfully!`);
        router.push('/admin');
      } else {
        alert(result.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  // Preview için kaydet ve yönlendir
  const handleSaveAndPreview = async () => {
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          published: false, // Preview için draft olarak kaydet
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Preview sayfasına yönlendir
        router.push(`/admin/posts/preview/${result.post.slug}`);
      } else {
        alert(result.error || 'Failed to save post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setIsSaving(false);
    }
  };

  // Preview URL
  const previewUrl = formData.customSlug ? `/blog/${formData.customSlug}` : '#';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ultra Kompakt Header */}
      <div className="flex justify-center py-3 bg-gray-50">
        <div className="bg-white border rounded-lg px-4 py-3 shadow-sm inline-flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-base font-medium text-gray-900">Create New Post</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* SEO Score - Ultra Kompakt */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400">SEO</span>
              <div className={`px-2 py-0.5 rounded text-xs font-medium ${
                seoScore >= 80 ? 'bg-green-100 text-green-700' :
                seoScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {seoScore}%
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSaveAndPreview}
              disabled={isSaving || !formData.title || !formData.content}
              className="h-8 px-3"
            >
              <Eye className="h-3 w-3 mr-1" />
              <span className="text-xs">Preview</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleSubmit(false)}
              disabled={isSaving || !formData.title || !formData.content}
              className="h-8 px-3"
            >
              <Save className="h-3 w-3 mr-1" />
              <span className="text-xs">Draft</span>
            </Button>
            
            <Button 
              size="sm"
              onClick={() => handleSubmit(true)}
              disabled={isSaving || !formData.title || !formData.content}
              className="h-8 px-3"
            >
              <span className="text-xs">Publish</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter your post title..."
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.title.length}/60 characters (ideal: 30-60)
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of your post..."
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}/160 characters (ideal: 120-160)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="General">General</option>
                      <option value="Practical Tips">Practical Tips</option>
                      <option value="Decoration">Decoration</option>
                      <option value="Gift Items">Gift Items</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Bathroom">Bathroom</option>
                      <option value="Living Room">Living Room</option>
                      <option value="Bedroom">Bedroom</option>
                      <option value="Office">Office</option>
                      <option value="Balcony">Balcony</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="image">Featured Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Görsel URL'sini buraya yapıştırın. 
                      <br />
                      💡 <strong>Önerilen kaynaklar:</strong> Cloudinary, Imgur, Google Drive, GitHub
                    </p>
                    {formData.image && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-2">Önizleme:</p>
                        <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLElement).parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="flex items-center justify-center h-full text-xs text-gray-400">Görsel yüklenemedi</div>';
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1"
                    />
                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    />
                    <Label htmlFor="featured">Featured Post</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Content *</h2>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              />
            </div>

            {/* SEO Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customSlug">URL Slug</Label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                      /blog/
                    </span>
                    <Input
                      id="customSlug"
                      value={formData.customSlug}
                      onChange={(e) => setFormData(prev => ({ ...prev, customSlug: e.target.value }))}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title..."
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seoTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="SEO meta description..."
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seoDescription.length}/160 characters
                  </p>
                </div>

                {/* Keywords */}
                <div>
                  <Label>SEO Keywords</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                      placeholder="Add a keyword..."
                      className="flex-1"
                    />
                    <Button type="button" onClick={addKeyword} variant="outline" size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.keywords.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                        {keyword} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - SEO Guide */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  SEO Guide
                </h3>

                <div className="space-y-4">
                  {/* Title */}
                  <div className="flex items-start gap-3">
                    {formData.title.length >= 30 && formData.title.length <= 60 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-medium text-sm">Title Length</h4>
                      <p className="text-xs text-gray-600">Keep between 30-60 characters for best SEO</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex items-start gap-3">
                    {formData.description.length >= 120 && formData.description.length <= 160 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-medium text-sm">Description Length</h4>
                      <p className="text-xs text-gray-600">Keep between 120-160 characters</p>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="flex items-start gap-3">
                    {formData.keywords.length >= 3 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-medium text-sm">Keywords</h4>
                      <p className="text-xs text-gray-600">Add at least 3 relevant keywords</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex items-start gap-3">
                    {formData.content.length >= 300 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-medium text-sm">Content Length</h4>
                      <p className="text-xs text-gray-600">Write at least 300 characters</p>
                    </div>
                  </div>

                  {/* Overall Score */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall SEO Score</span>
                      <span className={`text-sm font-bold ${
                        seoScore >= 80 ? 'text-green-600' :
                        seoScore >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {seoScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          seoScore >= 80 ? 'bg-green-500' :
                          seoScore >= 60 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${seoScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              {formData.title && formData.description && (
                <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                  <h3 className="text-lg font-semibold mb-4">Google Preview</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-blue-600 text-sm hover:underline cursor-pointer">
                      {formData.seoTitle || formData.title}
                    </div>
                    <div className="text-green-700 text-xs mt-1">
                      yourdomain.com{previewUrl}
                    </div>
                    <div className="text-gray-700 text-sm mt-2">
                      {formData.seoDescription || formData.description}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 