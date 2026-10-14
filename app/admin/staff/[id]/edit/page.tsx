"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { apiClient } from '../../../../../services/api';
import { StaffForm } from '../../../../../components/admin/StaffForm';

export default function EditStaffPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get(`/admin/users/${params.id}`);
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch user', err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchUser();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) {
    return <div className="p-10 text-center text-muted-foreground">Staff member not found.</div>;
  }

  return <StaffForm initialData={data} isEditing />;
}
