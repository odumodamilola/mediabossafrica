"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Save, Settings as SettingsIcon } from 'lucide-react';
import { apiClient } from '../../../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { PageHeader } from '../../../components/admin/PageHeader';
import { Textarea } from '../../../components/ui/textarea';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsGroup, setSettingsGroup] = useState<any[]>([]);

  // We'll manage a 'general' group of settings for now
  // In a real app we might have tabs for General, Social, SEO, etc.
  const [formData, setFormData] = useState({
    site_name: 'MediaBoss Africa',
    contact_email: 'hello@mediaboss.africa',
    contact_phone: '+234 123 456 7890',
    address: 'Lagos, Nigeria',
    instagram_url: 'https://instagram.com/mediabossafrica',
    twitter_url: 'https://twitter.com/mediabossafrica',
    linkedin_url: 'https://linkedin.com/company/mediabossafrica',
  });

  const fetchSettings = async () => {
    try {
      const res = await apiClient.get('/admin/settings/general');
      const data = res.data;
      if (data && data.length > 0) {
        const mapped: any = {};
        data.forEach((item: any) => {
          mapped[item.key] = item.value;
        });
        setFormData(prev => ({ ...prev, ...mapped }));
      }
    } catch (err) {
      console.error('Error fetching settings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Transform formData back into the array format expected by the API
    const payload = {
      settings: Object.entries(formData).map(([key, value]) => ({
        key,
        value,
        type: 'string'
      }))
    };

    try {
      await apiClient.put('/admin/settings/general', payload);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Error saving settings', err);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <PageHeader 
        title="Site Settings" 
        description="Manage global configuration for your application."
      />

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader className="pb-3 border-b">
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" /> General Settings
            </CardTitle>
            <CardDescription>Basic information about your organization.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Name</label>
                <Input name="site_name" value={formData.site_name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <Input name="contact_email" value={formData.contact_email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Phone</label>
                <Input name="contact_phone" value={formData.contact_phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea name="address" value={formData.address} onChange={handleChange} rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b">
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>URLs to your official social profiles.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram URL</label>
                <Input name="instagram_url" value={formData.instagram_url} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Twitter/X URL</label>
                <Input name="twitter_url" value={formData.twitter_url} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <Input name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
