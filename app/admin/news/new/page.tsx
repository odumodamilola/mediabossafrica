"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { BlogForm } from '../../../../components/admin/BlogForm';

export default function NewBlogPost() {
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

      <BlogForm />
    </div>
  );
}
