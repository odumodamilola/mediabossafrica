"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ExternalLink, Loader2, Search, Briefcase } from 'lucide-react';
import { apiClient } from '../../../services/api';
import { Card, CardContent } from '../../../components/ui/card';
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
import { PageHeader } from '../../../components/admin/PageHeader';
import { EmptyState } from '../../../components/admin/EmptyState';
import { StatusBadge } from '../../../components/admin/StatusBadge';

export default function AdminTalents() {
  const [talents, setTalents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const fetchTalents = async () => {
    try {
      const res = await apiClient.get('/admin/talents');
      setTalents(res.data);
    } catch (err) {
      console.error('Error fetching talents', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this talent?')) return;
    setIsDeleting(id);
    try {
      await apiClient.delete(`/admin/talents/${id}`);
      setTalents(talents.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting talent', err);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredTalents = talents.filter(talent => 
    talent.name.toLowerCase().includes(search.toLowerCase()) || 
    (talent.role || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Talent Roster" 
        description="Manage the creators and influencers in your network."
        action={
          <Button className="gap-2" asChild>
            <Link href="/admin/talents/new">
              <Plus className="w-4 h-4" /> Add Talent
            </Link>
          </Button>
        }
      />

      <div className="max-w-sm mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search talents..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-20 flex justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : talents.length === 0 ? (
            <EmptyState 
              icon={Briefcase}
              title="No talent found"
              description="Click Add Talent to start building your roster."
              actionLabel="Add Talent"
              onAction={() => window.location.href = '/admin/talents/new'}
            />
          ) : filteredTalents.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground border-2 border-dashed border-border m-6 rounded-lg">
              No talents match your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTalents.map((talent) => (
                    <TableRow key={talent.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center shrink-0">
                            {talent.profile_image ? (
                              <img src={talent.profile_image} alt={talent.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-primary font-bold">{talent.name.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">{talent.name}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{talent.slug}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{talent.role}</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={talent.status || (talent.is_active !== false ? 'active' : 'inactive')} type="talent" />
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" title="Edit" asChild>
                            <Link href={`/admin/talents/${talent.id}/edit`}>
                              <Edit2 className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(talent.id)}
                            disabled={isDeleting === talent.id}
                            className="hover:text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            {isDeleting === talent.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" asChild title="View Public Page">
                            <a href={`/talent/${talent.slug}`} target="_blank" rel="noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
