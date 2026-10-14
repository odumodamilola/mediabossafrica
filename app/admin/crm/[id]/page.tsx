"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Save, Trash2, Mail, Phone, Calendar, Briefcase, MapPin, Building, Target } from 'lucide-react';
import { apiClient } from '../../../../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Select } from '../../../../components/ui/select';
import { StatusBadge } from '../../../../components/admin/StatusBadge';

export default function LeadDetail() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Editable fields
  const [status, setStatus] = useState('new');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await apiClient.get(`/admin/leads/${params.id}`);
        setLead(res.data);
        setStatus(res.data.status || 'new');
        setPriority(res.data.priority || 'medium');
      } catch (err) {
        console.error('Error fetching lead', err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchLead();
    }
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.put(`/admin/leads/${params.id}`, { status, priority });
      // update local state too
      setLead({ ...lead, status, priority });
      alert('Lead updated successfully!');
    } catch (err) {
      console.error('Error saving lead', err);
      alert('Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) return;
    setIsDeleting(true);
    try {
      await apiClient.delete(`/admin/leads/${params.id}`);
      router.push('/admin/crm');
    } catch (err) {
      console.error('Error deleting lead', err);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Lead Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/crm">Back to CRM</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="h-9 w-9">
            <Link href="/admin/crm">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              {lead.brand_name || lead.name || 'Unnamed Lead'}
              <StatusBadge status={lead.status || 'new'} type="lead" />
            </h1>
            <p className="text-muted-foreground text-sm">
              Submitted on {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Inquiry Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {lead.message && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Message</h3>
                  <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                    {lead.message}
                  </div>
                </div>
              )}

              {lead.goals && Array.isArray(lead.goals) && lead.goals.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Target className="w-4 h-4" /> Goals
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {lead.goals.map((g: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {lead.services && Array.isArray(lead.services) && lead.services.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Services Requested</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {lead.services.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {lead.budget && (
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">Budget</h3>
                    <p className="text-sm font-medium">{lead.budget}</p>
                  </div>
                )}
                {lead.form_type && (
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground mb-1">Source Form</h3>
                    <p className="text-sm font-medium capitalize">{lead.form_type}</p>
                  </div>
                )}
              </div>

            </CardContent>
          </Card>
          
          {/* Notes or additional fields can go here */}
          {lead.additional_info && (
             <Card>
             <CardHeader className="pb-3 border-b">
               <CardTitle>Additional Information</CardTitle>
             </CardHeader>
             <CardContent className="pt-6">
               <div className="text-sm whitespace-pre-wrap">
                 {lead.additional_info}
               </div>
             </CardContent>
           </Card>
          )}

        </div>

        {/* Right Column - Sidebar info & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Manage Lead</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal Sent</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                  <option value="archived">Archived</option>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Priority</label>
                <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>

              <Button 
                className="w-full gap-2 mt-4" 
                onClick={handleSave} 
                disabled={saving || (status === lead.status && priority === lead.priority)}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b">
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {lead.contact_person && (
                <div className="flex gap-3">
                  <Briefcase className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Contact Person</p>
                    <p className="text-sm font-medium">{lead.contact_person}</p>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Email</p>
                  <a href={`mailto:${lead.email}`} className="text-sm font-medium text-primary hover:underline break-all">
                    {lead.email}
                  </a>
                </div>
              </div>

              {lead.phone && (
                <div className="flex gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Phone</p>
                    <a href={`tel:${lead.phone}`} className="text-sm font-medium hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                </div>
              )}

              {lead.location && (
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Location</p>
                    <p className="text-sm">{lead.location}</p>
                  </div>
                </div>
              )}
              
              {lead.industry && (
                <div className="flex gap-3">
                  <Building className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Industry</p>
                    <p className="text-sm">{lead.industry}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
