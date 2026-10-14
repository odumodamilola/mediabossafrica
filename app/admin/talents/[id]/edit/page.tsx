"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { apiClient } from '../../../../../services/api';
import { Button } from '../../../../../components/ui/button';
import { TalentForm } from '../../../../../components/admin/TalentForm';

export default function EditTalent() {
  const params = useParams();
  const [talent, setTalent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const res = await apiClient.get(`/admin/talents/${params.id}`);
        setTalent(res.data);
      } catch (err) {
        console.error('Error fetching talent', err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchTalent();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!talent) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Talent Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/talents">Back to Talent Roster</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild className="h-9 w-9">
          <Link href="/admin/talents">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-sm font-medium text-muted-foreground">Back to Talent Roster</p>
      </div>

      <TalentForm initialData={talent} isEdit={true} />
    </div>
  );
}
