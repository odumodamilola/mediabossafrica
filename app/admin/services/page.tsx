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

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const fetchServices = async () => {
    try {
      const res = await apiClient.get('/admin/services');
      setServices(res.data);
    } catch (err) {
      console.error('Error fetching services', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    setIsDeleting(id);
    try {
      await apiClient.delete(`/admin/services/${id}`);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error deleting service', err);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(search.toLowerCase()) || 
    service.short_title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Services" 
        description="Manage the services and solutions offered by MediaBoss."
        action={
          <Button className="gap-2" asChild>
            <Link href="/admin/services/new">
              <Plus className="w-4 h-4" /> Add Service
            </Link>
          </Button>
        }
      />

      <div className="max-w-sm mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search services..." 
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
          ) : services.length === 0 ? (
            <EmptyState 
              icon={Briefcase}
              title="No services found"
              description="Click Add Service to create your first offering."
              actionLabel="Add Service"
              onAction={() => window.location.href = '/admin/services/new'}
            />
          ) : filteredServices.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground border-2 border-dashed border-border m-6 rounded-lg">
              No services match your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Short Title</TableHead>
                    <TableHead>Full Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold">{service.short_title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{service.slug}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{service.title}</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={service.status || 'active'} type="service" />
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" title="Edit" asChild>
                            <Link href={`/admin/services/${service.id}/edit`}>
                              <Edit2 className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(service.id)}
                            disabled={isDeleting === service.id}
                            className="hover:text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            {isDeleting === service.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" asChild title="View Public Page">
                            <a href={`/${service.slug}`} target="_blank" rel="noreferrer">
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
