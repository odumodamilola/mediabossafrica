"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Activity,
  Briefcase, Eye, Link2, MonitorPlay
} from 'lucide-react';
import { apiClient } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await apiClient.get('/admin/analytics');
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Poll every 10 seconds for real-time feel
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Activity className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!stats) return null;

  const kpiCards = [
    { 
      label: 'Total Views', 
      value: stats.overview.total_views, 
      icon: Eye, 
      color: 'text-primary', 
      bg: 'bg-primary/10',
      description: 'Page views tracked'
    },
    { 
      label: 'Unique Visitors', 
      value: stats.overview.unique_visitors, 
      icon: Users, 
      color: 'text-emerald-600 dark:text-emerald-400', 
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      description: 'Active sessions'
    },
    { 
      label: 'Total Leads', 
      value: stats.overview.total_leads, 
      icon: Briefcase, 
      color: 'text-blue-600 dark:text-blue-400', 
      bg: 'bg-blue-50 dark:bg-blue-500/10',
      description: 'Client inquiries'
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time traffic and platform engagement metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Data
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpiCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
          >
            <Card className="hover:border-primary/40 transition-all group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </CardTitle>
                <div className={`w-8 h-8 rounded-md flex items-center justify-center ${card.bg} ${card.color} transition-transform group-hover:scale-110`}>
                  <card.icon className="w-4 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold tabular-nums">{card.value}</span>
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Traffic Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Traffic Over Time</CardTitle>
            <CardDescription>Page views for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              {stats.traffic_over_time.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.traffic_over_time}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
                    <XAxis 
                      dataKey="date" 
                      tick={{fontSize: 12}} 
                      tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', {weekday: 'short'})}
                      tickMargin={10}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{fontSize: 12}} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#FF00A0" 
                      strokeWidth={3} 
                      dot={{ r: 4, strokeWidth: 2 }} 
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground border-2 border-dashed rounded-lg">
                  Not enough data collected yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Performing Pages</CardTitle>
            <CardDescription>Most visited routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {stats.top_pages.length > 0 ? (
                stats.top_pages.map((page: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium truncate" title={page.path}>
                        {page.path === '/' ? '/ (Home)' : page.path}
                      </span>
                    </div>
                    <div className="text-sm font-bold ml-4 tabular-nums text-primary/80">
                      {page.views}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No pages tracked yet.
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-border">
              <h4 className="text-sm font-medium mb-3">System Modules</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start h-9 text-xs" asChild>
                  <Link href="/admin/staff"><Users className="w-3.5 h-3.5 mr-2" /> Staff Management</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start h-9 text-xs" asChild>
                  <Link href="/admin/crm"><Briefcase className="w-3.5 h-3.5 mr-2" /> CRM / Leads</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start h-9 text-xs" asChild>
                  <Link href="/admin/work"><MonitorPlay className="w-3.5 h-3.5 mr-2" /> Portfolio Admin</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
