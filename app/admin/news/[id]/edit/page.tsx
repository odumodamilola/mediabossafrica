"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { apiClient } from '../../../../../services/api';
import { Button } from '../../../../../components/ui/button';
import { BlogForm } from '../../../../../components/admin/BlogForm';

export default function EditBlogPost() {
  const params = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiClient.get(`/admin/blog-posts/${params.id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching post', err);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Post Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/news">Back to News CMS</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" asChild className="h-9 w-9">
          <Link href="/admin/news">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <p className="text-sm font-medium text-muted-foreground">Back to News CMS</p>
      </div>

      <BlogForm initialData={post} isEdit={true} />
    </div>
  );
}
