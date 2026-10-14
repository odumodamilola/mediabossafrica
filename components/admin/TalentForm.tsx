"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import { apiClient } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TalentFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export function TalentForm({ initialData, isEdit }: TalentFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    instagram_url: initialData?.socials?.instagram || initialData?.instagram_url || '',
    tiktok_url: initialData?.socials?.tiktok || initialData?.tiktok_url || '',
    youtube_url: initialData?.socials?.youtube || initialData?.youtube_url || '',
    twitter_url: initialData?.socials?.twitter || initialData?.twitter_url || '',
    profile_image: initialData?.profile_image || '',
    is_active: initialData?.status === 'active' || initialData?.is_active !== false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        await apiClient.put(`/admin/talents/${initialData.id}`, formData);
      } else {
        await apiClient.post('/admin/talents', formData);
      }
      router.push('/admin/talents');
      router.refresh();
    } catch (err) {
      console.error('Error saving talent', err);
      alert('Failed to save talent. Please check all fields.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{isEdit ? 'Edit Talent' : 'Add New Talent'}</h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input 
              type="checkbox" 
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="rounded border-input text-primary focus:ring-primary"
            />
            Active Profile
          </label>
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Talent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name *</label>
                <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Full name or alias" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role/Title *</label>
                <Input name="role" value={formData.role} onChange={handleChange} required placeholder="e.g. Content Creator, Influencer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Lagos, Nigeria" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description/Bio</label>
                <Textarea name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Short biography..." />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Media & Socials</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Image URL</label>
                <Input name="profile_image" value={formData.profile_image} onChange={handleChange} placeholder="https://..." />
                {formData.profile_image && (
                  <div className="mt-2 rounded-md overflow-hidden border">
                    <img src={formData.profile_image} alt="Preview" className="w-24 h-24 object-cover rounded-full mx-auto my-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram URL</label>
                <Input name="instagram_url" value={formData.instagram_url} onChange={handleChange} placeholder="https://instagram.com/..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">TikTok URL</label>
                <Input name="tiktok_url" value={formData.tiktok_url} onChange={handleChange} placeholder="https://tiktok.com/@..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">YouTube URL</label>
                <Input name="youtube_url" value={formData.youtube_url} onChange={handleChange} placeholder="https://youtube.com/..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter/X URL</label>
                <Input name="twitter_url" value={formData.twitter_url} onChange={handleChange} placeholder="https://twitter.com/..." />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
