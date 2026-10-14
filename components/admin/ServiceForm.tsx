"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import { apiClient } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ServiceFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function ServiceForm({ initialData, isEdit }: ServiceFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  // Helper to convert arrays to newline-separated strings
  const arrayToString = (arr: any) => Array.isArray(arr) ? arr.join('\n') : '';

  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    short_title: initialData?.short_title || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    hero_title: initialData?.hero_title || '',
    intro: initialData?.intro || '',
    status: initialData?.status || 'active',
    primary_keyword: initialData?.primary_keyword || '',
    secondary_keywords: arrayToString(initialData?.secondary_keywords),
    location_focus: arrayToString(initialData?.location_focus),
    outcomes: arrayToString(initialData?.outcomes),
    capabilities: arrayToString(initialData?.capabilities),
    supporting_points: arrayToString(initialData?.supporting_points),
    cta_label: initialData?.cta_label || '',
    cta_href: initialData?.cta_href || '',
    image: initialData?.image || '',
    image_alt: initialData?.image_alt || '',
    sort_order: initialData?.sort_order || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Helper to convert newline-separated strings to arrays
    const stringToArray = (str: string) => str ? str.split('\n').map(s => s.trim()).filter(Boolean) : [];

    const payload = {
      ...formData,
      secondary_keywords: stringToArray(formData.secondary_keywords),
      location_focus: stringToArray(formData.location_focus),
      outcomes: stringToArray(formData.outcomes),
      capabilities: stringToArray(formData.capabilities),
      supporting_points: stringToArray(formData.supporting_points),
    };

    try {
      if (isEdit && initialData?.id) {
        await apiClient.put(`/admin/services/${initialData.id}`, payload);
      } else {
        await apiClient.post('/admin/services', payload);
      }
      router.push('/admin/services');
      router.refresh();
    } catch (err) {
      console.error('Error saving service', err);
      alert('Failed to save service. Check your connection or required fields.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{isEdit ? 'Edit Service' : 'Add New Service'}</h2>
        <div className="flex items-center gap-3">
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className="rounded border-input text-sm p-2"
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Core Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Short Title *</label>
                <Input name="short_title" value={formData.short_title} onChange={handleChange} required placeholder="e.g. Digital Marketing" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Title *</label>
                <Input name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Digital Marketing & Campaigns" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug / URL Path *</label>
                <Input name="slug" value={formData.slug} onChange={handleChange} required placeholder="e.g. digital-marketing" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hero Title *</label>
                <Input name="hero_title" value={formData.hero_title} onChange={handleChange} required placeholder="e.g. Drive ROI with Digital" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={3} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Intro Text</label>
                <Textarea name="intro" value={formData.intro} onChange={handleChange} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>List Data (One per line)</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Capabilities</label>
                <Textarea name="capabilities" value={formData.capabilities} onChange={handleChange} rows={4} placeholder="SEO\nSocial Media\nPaid Ads" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Outcomes</label>
                <Textarea name="outcomes" value={formData.outcomes} onChange={handleChange} rows={4} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Supporting Points</label>
                <Textarea name="supporting_points" value={formData.supporting_points} onChange={handleChange} rows={4} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>SEO & Metadata</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Keyword</label>
                <Input name="primary_keyword" value={formData.primary_keyword} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Secondary Keywords (One per line)</label>
                <Textarea name="secondary_keywords" value={formData.secondary_keywords} onChange={handleChange} rows={3} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location Focus (One per line)</label>
                <Textarea name="location_focus" value={formData.location_focus} onChange={handleChange} rows={2} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Call to Action & Media</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">CTA Label</label>
                  <Input name="cta_label" value={formData.cta_label} onChange={handleChange} placeholder="e.g. Get Started" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">CTA Link</label>
                  <Input name="cta_href" value={formData.cta_href} onChange={handleChange} placeholder="e.g. /contact" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Order</label>
                <Input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Header Image URL</label>
                <Input name="image" value={formData.image} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image Alt Text</label>
                <Input name="image_alt" value={formData.image_alt} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
