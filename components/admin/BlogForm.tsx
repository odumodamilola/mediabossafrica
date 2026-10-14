"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import { apiClient } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface BlogFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    blog_category_id: initialData?.blog_category_id || '',
    cover_image: initialData?.cover_image || '',
    is_published: initialData?.is_published || false,
    meta_title: initialData?.meta_title || '',
    meta_description: initialData?.meta_description || '',
  });

  useEffect(() => {
    // Fetch categories for the select dropdown
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get('/blog/categories');
        setCategories(res.data);
        if (!formData.blog_category_id && res.data.length > 0) {
          setFormData(prev => ({ ...prev, blog_category_id: res.data[0].id }));
        }
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit && initialData?.id) {
        await apiClient.put(`/admin/blog-posts/${initialData.id}`, formData);
      } else {
        await apiClient.post('/admin/blog-posts', formData);
      }
      router.push('/admin/news');
      router.refresh();
    } catch (err) {
      console.error('Error saving post', err);
      alert('Failed to save post. Please check all fields.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{isEdit ? 'Edit Post' : 'Create New Post'}</h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input 
              type="checkbox" 
              name="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="rounded border-input text-primary focus:ring-primary"
            />
            Published
          </label>
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Post
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter post title"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea 
                  name="excerpt" 
                  value={formData.excerpt} 
                  onChange={handleChange} 
                  rows={2}
                  placeholder="Brief summary for listings"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content *</label>
                <Textarea 
                  name="content" 
                  value={formData.content} 
                  onChange={handleChange} 
                  required 
                  rows={15}
                  placeholder="Write your post content here (supports markdown or HTML depending on frontend configuration)..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select name="blog_category_id" value={formData.blog_category_id} onChange={handleChange} required>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <Input 
                  name="cover_image" 
                  value={formData.cover_image} 
                  onChange={handleChange} 
                  placeholder="https://..."
                />
                {formData.cover_image && (
                  <div className="mt-2 rounded-md overflow-hidden border">
                    <img src={formData.cover_image} alt="Preview" className="w-full h-32 object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Title</label>
                <Input name="meta_title" value={formData.meta_title} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Meta Description</label>
                <Textarea name="meta_description" value={formData.meta_description} onChange={handleChange} rows={3} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
