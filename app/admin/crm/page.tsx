"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Trash2, Mail, Loader2, Search, Filter } from 'lucide-react';
import { apiClient } from '../../../services/api';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';
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

export default function AdminCRM() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchLeads = async () => {
    try {
      const res = await apiClient.get('/admin/leads');
      setLeads(res.data);
    } catch (err) {
      console.error('Error fetching leads', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    setIsDeleting(id);
    try {
      await apiClient.delete(`/admin/leads/${id}`);
      setLeads(leads.filter(l => l.id !== id));
    } catch (err) {
      console.error('Error deleting lead', err);
    } finally {
      setIsDeleting(null);
    }
  };

  // Filter leads based on search and status
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.brand_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="CRM (Leads)" 
        description="Manage incoming inquiries and talent applications."
      />

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-[180px]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal Sent</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-20 flex justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : leads.length === 0 ? (
            <EmptyState 
              icon={Mail}
              title="No leads yet"
              description="When potential clients or talent contact you, they will appear here."
            />
          ) : filteredLeads.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground border-2 border-dashed border-border m-6 rounded-lg">
              No leads match your current filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Service Interest</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="group">
                      <TableCell>
                        <div className="font-semibold text-foreground">
                          {lead.brand_name || lead.name || 'Unknown'}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </div>
                        {lead.contact_person && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Contact: {lead.contact_person}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {Array.isArray(lead.services) && lead.services.length > 0
                          ? lead.services.slice(0, 2).join(', ') + (lead.services.length > 2 ? '...' : '')
                          : lead.category || lead.form_type || 'General Inquiry'}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={lead.status || 'new'} type="lead" />
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" title="View Details" asChild>
                            <Link href={`/admin/crm/${lead.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(lead.id)}
                            disabled={isDeleting === lead.id}
                            className="hover:text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            {isDeleting === lead.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
