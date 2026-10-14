"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { apiClient } from '../../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';

export default function AdminBrands() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [logoPath, setLogoPath] = useState('');

  const fetchBrands = async () => {
    try {
      const res = await apiClient.get('/admin/trusted-brands');
      setBrands(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !logoPath) return;
    setSaving(true);
    try {
      await apiClient.post('/admin/trusted-brands', { name, logo_path: logoPath, is_active: true, order: 0 });
      setName('');
      setLogoPath('');
      fetchBrands();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this brand?')) return;
    try {
      await apiClient.delete(`/admin/trusted-brands/${id}`);
      setBrands(brands.filter(b => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <h2 className="text-2xl font-bold tracking-tight">Trusted Brands</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Brand Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. MTN Nigeria" />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Logo URL</label>
              <Input value={logoPath} onChange={(e) => setLogoPath(e.target.value)} required placeholder="https://..." />
            </div>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Brand'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brands.map((brand) => (
                    <TableRow key={brand.id}>
                      <TableCell>
                        <div className="h-10 w-24 bg-muted rounded flex items-center justify-center overflow-hidden">
                          <img src={brand.logo_path} alt={brand.name} className="max-h-full max-w-full object-contain" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{brand.name}</TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(brand.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {brands.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center p-6 text-muted-foreground">No brands added yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
