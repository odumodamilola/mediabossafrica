"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Loader2, Share2, Tag, Newspaper } from 'lucide-react';
import { apiClient } from '../../../services/api';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import DOMPurify from 'isomorphic-dompurify';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const res = await apiClient.get(`/blog/posts/${slug}`);
        setPost(res.data.data || res.data);
      } catch (err) {
        console.error('Failed to load article', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Loading dispatch...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6 text-muted-foreground">
            <Newspaper className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            The news dispatch you are looking for may have been moved, archived, or is not yet published.
          </p>
          <Button asChild>
            <Link href="/news">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to All News
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const coverUrl = post.cover_image || post.featured_image;

  return (
    <article className="min-h-screen pt-32 pb-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Link & Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to All News
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-bold uppercase tracking-wider text-[10px] px-3 py-1">
                {post.category?.name || 'News'}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {new Date(post.published_at || post.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="text-xs uppercase tracking-wider font-bold gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copied ? 'Link Copied!' : 'Share'}
            </Button>
          </div>
        </motion.div>

        {/* Title & Excerpt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground leading-[1.05] mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal">
              {post.excerpt}
            </p>
          )}
        </motion.div>

        {/* Cover Image */}
        {coverUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="aspect-[16/9] rounded-3xl overflow-hidden border border-border mb-12 shadow-md bg-muted"
          >
            <img
              src={coverUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="prose dark:prose-invert max-w-none mb-16 text-foreground text-base sm:text-lg leading-relaxed space-y-6"
        >
          {post.content ? (
            <div 
              className="whitespace-pre-line leading-relaxed text-foreground/90 font-normal space-y-4"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} 
            />
          ) : (
            <p className="text-muted-foreground italic">No article content available.</p>
          )}
        </motion.div>

        {/* Article Footer & CTA */}
        <div className="pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 bg-card p-8 rounded-3xl border">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary block mb-1">Stay Ahead</span>
            <h3 className="text-xl font-bold text-foreground">Ready to scale your influence?</h3>
            <p className="text-xs text-muted-foreground mt-1">Connect with our team for strategic brand campaigns and talent representation.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button asChild className="w-full sm:w-auto font-bold uppercase text-xs tracking-wider">
              <Link href="/consultation">Book Consultation</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto font-bold uppercase text-xs tracking-wider">
              <Link href="/news">More News</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
