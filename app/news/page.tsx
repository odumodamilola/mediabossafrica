"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Loader2, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '../../services/api';
import { Badge } from '../../components/ui/badge';

export default function NewsList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiClient.get('/blog/posts');
        setPosts(res.data.data || []);
      } catch (err) {
        console.error('Error fetching news posts', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.25em] mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Official Dispatches</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-foreground mb-6">
            Latest <span className="text-primary italic">News & Insights</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Stay updated with the latest moves, creator economy insights, and culture-defining campaigns across Africa and beyond.
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Loading news dispatches...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border max-w-xl mx-auto px-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <Newspaper className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Articles Published Yet</h3>
            <p className="text-muted-foreground text-sm mb-6">Check back soon for news announcements and industry insights.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-border group flex flex-col hover:border-primary/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                  {post.cover_image ? (
                    <img 
                      src={post.cover_image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground font-bold uppercase tracking-wider text-xs">
                      MediaBoss News
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="backdrop-blur-md bg-background/80 font-bold uppercase tracking-wider text-[10px]">
                      {post.category?.name || 'News'}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3 font-semibold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {new Date(post.published_at || post.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground line-clamp-3 text-sm mb-6 leading-relaxed">
                      {post.excerpt || 'Read the full dispatch for insights, background, and analysis...'}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-border/60">
                    <Link 
                      href={`/news/${post.slug}`} 
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-xs uppercase tracking-wider transition-colors group/link"
                    >
                      Read Full Article 
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
