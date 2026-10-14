"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PageHeader } from './PageHeader';
import { useAuth } from '../../contexts/AuthContext';

interface StaffFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function StaffForm({ initialData, isEditing }: StaffFormProps) {
  const router = useRouter();
  const { hasRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const defaultRole = initialData?.roles?.[0]?.name || 'editor';

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    role: defaultRole,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await apiClient.put(`/admin/users/${initialData.id}`, formData);
      } else {
        await apiClient.post('/admin/users', formData);
      }
      router.push('/admin/staff');
      router.refresh();
    } catch (err: any) {
      console.error('Error saving staff', err);
      setError(err.response?.data?.message || 'Failed to save. Please check your inputs.');
      setLoading(false);
    }
  };

  if (!hasRole('super-admin')) {
    return <div className="p-10 text-center text-destructive">Access Denied.</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/staff">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <PageHeader 
          title={isEditing ? 'Edit Staff Member' : 'Add New Staff'} 
          description="Grant access to the dashboard and assign permissions."
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-destructive/15 text-destructive p-4 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name" name="name" required
                value={formData.name} onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" name="email" type="email" required
                value={formData.email} onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password {isEditing ? '(Leave blank to keep unchanged)' : '*'}
              </Label>
              <Input 
                id="password" name="password" type="password"
                required={!isEditing}
                value={formData.password} onChange={handleChange}
                placeholder={isEditing ? '********' : 'Enter a strong password'}
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Assigned Role</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="editor">Editor (Can only edit content)</option>
                <option value="admin">Admin (Full content control)</option>
                <option value="super-admin">Super Admin (Can manage staff & settings)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/staff">Cancel</Link>
          </Button>
          <Button type="submit" disabled={loading} className="min-w-[120px]">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {isEditing ? 'Save Changes' : 'Create Staff Member'}
          </Button>
        </div>
      </form>
    </div>
  );
}
