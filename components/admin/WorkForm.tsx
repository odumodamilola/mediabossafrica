"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PageHeader } from './PageHeader';

interface WorkFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function WorkForm({ initialData, isEditing }: WorkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    client: initialData?.client || '',
    category: initialData?.category || '',
    image: initialData?.image || '',
    result: initialData?.result || '',
    description: initialData?.description || '',
    status: initialData?.status || 'active',
    sort_order: initialData?.sort_order || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await apiClient.put(`/admin/case-studies/${initialData.id}`, formData);
      } else {
        await apiClient.post('/admin/case-studies', formData);
      }
      router.push('/admin/work');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving case study', err);
      setError(err.response?.data?.message || 'Failed to save. Please check your inputs.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/work">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <PageHeader 
          title={isEditing ? 'Edit Project' : 'New Project'} 
          description="Case studies are displayed on the public Portfolio/Work page."
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-destructive/15 text-destructive p-4 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input 
                    id="title" name="title" required
                    value={formData.title} onChange={handleChange}
                    placeholder="e.g. MTN Brand Ambassador Campaign"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client / Brand *</Label>
                    <Input 
                      id="client" name="client" required
                      value={formData.client} onChange={handleChange}
                      placeholder="e.g. MTN Nigeria"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input 
                      id="category" name="category" required
                      value={formData.category} onChange={handleChange}
                      placeholder="e.g. Strategic Partnership"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description / Summary</Label>
                  <Textarea 
                    id="description" name="description"
                    value={formData.description} onChange={handleChange}
                    placeholder="Briefly describe the campaign and what was achieved..."
                    className="h-32"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Results & Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="result">Key Result (Metric) *</Label>
                  <Input 
                    id="result" name="result" required
                    value={formData.result} onChange={handleChange}
                    placeholder="e.g. 12M+ Organic Views"
                  />
                  <p className="text-xs text-muted-foreground">This is displayed as a badge on the image.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" name="image"
                    value={formData.image} onChange={handleChange}
                    placeholder="https://..."
                  />
                  {formData.image && (
                    <div className="mt-2 rounded-md overflow-hidden bg-secondary aspect-video relative">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Visibility Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="active">Active (Public)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input 
                    id="sort_order" name="sort_order" type="number"
                    value={formData.sort_order} onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/work">Cancel</Link>
          </Button>
          <Button type="submit" disabled={loading} className="min-w-[120px]">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
}
