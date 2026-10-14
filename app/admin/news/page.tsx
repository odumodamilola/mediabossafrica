"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, ExternalLink, Loader2, Search, FileText } from 'lucide-react';
import { apiClient } from '../../../services/api';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
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

export default function AdminBlogPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await apiClient.get('/admin/blog-posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setIsDeleting(id);
    try {
      await apiClient.delete(`/admin/blog-posts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting post', err);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) || 
    (post.category?.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="News CMS" 
        description="Manage your articles, news, and insights."
        action={
          <Button className="gap-2" asChild>
            <Link href="/admin/news/new">
              <Plus className="w-4 h-4" /> Create New Post
            </Link>
          </Button>
        }
      />

      <div className="max-w-sm mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search posts..." 
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
          ) : posts.length === 0 ? (
            <EmptyState 
              icon={FileText}
              title="No posts found"
              description="Click Create New Post to start writing your first article."
              actionLabel="Create Post"
              onAction={() => window.location.href = '/admin/news/new'}
            />
          ) : filteredPosts.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground border-2 border-dashed border-border m-6 rounded-lg">
              No posts match your search.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="group">
                      <TableCell>
                        <div className="font-semibold">{post.title}</div>
                        <div className="text-xs text-muted-foreground mt-1 truncate max-w-xs">{post.slug}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {post.category?.name || 'Uncategorized'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.is_published ? (
                          <Badge variant="default" className="bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-200 dark:text-green-400">
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border-yellow-200 dark:text-yellow-400">
                            Draft
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(post.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" title="Edit" asChild>
                            <Link href={`/admin/news/${post.id}/edit`}>
                              <Edit2 className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(post.id)}
                            disabled={isDeleting === post.id}
                            className="hover:text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            {isDeleting === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" asChild title="View Public Page">
                            <a href={`/news/${post.slug}`} target="_blank" rel="noreferrer">
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
