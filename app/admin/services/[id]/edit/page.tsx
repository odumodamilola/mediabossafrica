"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { apiClient } from '../../../../../services/api';
import { ServiceForm } from '../../../../../components/admin/ServiceForm';

export default function EditServicePage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get(`/admin/services/${params.id}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load service data.');
      } finally {
        setLoading(false);
      }
    };
    
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return <div className="p-10 text-center text-destructive">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ServiceForm initialData={data} isEdit={true} />
    </div>
  );
}
