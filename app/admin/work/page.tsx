"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ExternalLink, Loader2, Search, Briefcase, Film } from 'lucide-react';
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

export default function AdminWork() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const fetchCaseStudies = async () => {
    try {
      const res = await apiClient.get('/admin/case-studies');
      setCaseStudies(res.data);
    } catch (err) {
      console.error('Error fetching case studies', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    setIsDeleting(id);
    try {
      await apiClient.delete(`/admin/case-studies/${id}`);
      setCaseStudies(caseStudies.filter(cs => cs.id !== id));
    } catch (err) {
      console.error('Error deleting case study', err);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredCaseStudies = caseStudies.filter(cs => 
    cs.title.toLowerCase().includes(search.toLowerCase()) || 
    cs.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Portfolio & Case Studies" 
        description="Manage your featured work, brand campaigns, and results."
        action={
          <Button className="gap-2" asChild>
            <Link href="/admin/work/new">
              <Plus className="w-4 h-4" /> Add Project
            </Link>
          </Button>
        }
      />

      <div className="max-w-sm mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
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
          ) : caseStudies.length === 0 ? (
            <EmptyState 
              icon={Film}
              title="No projects found"
              description="Click Add Project to showcase your latest work."
              actionLabel="Add Project"
              onAction={() => window.location.href = '/admin/work/new'}
            />
          ) : filteredCaseStudies.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground border-2 border-dashed border-border m-6 rounded-lg">
              No projects match your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCaseStudies.map((cs) => (
                    <TableRow key={cs.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded bg-primary/10 overflow-hidden flex items-center justify-center shrink-0">
                            {cs.image ? (
                              <img src={cs.image} alt={cs.title} className="w-full h-full object-cover" />
                            ) : (
                              <Film className="w-4 h-4 text-primary/50" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold">{cs.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{cs.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{cs.client}</TableCell>
                      <TableCell>
                        <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">
                          {cs.result}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={cs.status || 'active'} />
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" title="Edit" asChild>
                            <Link href={`/admin/work/${cs.id}/edit`}>
                              <Edit2 className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(cs.id)}
                            disabled={isDeleting === cs.id}
                            className="hover:text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            {isDeleting === cs.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" asChild title="View Public Page">
                            <a href="/work" target="_blank" rel="noreferrer">
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
