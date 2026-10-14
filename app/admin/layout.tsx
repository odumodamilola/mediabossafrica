"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut,
  Briefcase,
  Menu,
  X,
  Loader2,
  Moon,
  Sun,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '../../lib/utils';

// Nav items config
const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads (CRM)', href: '/admin/crm', icon: Users },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Portfolio (Work)', href: '/admin/work', icon: LayoutDashboard },
  { name: 'Trusted Brands', href: '/admin/brands', icon: Users },
  { name: 'Talents', href: '/admin/talents', icon: Briefcase },
  { name: 'News Posts', href: '/admin/news', icon: FileText },
];

function NavLink({ item, pathname, onClick }: { item: typeof navItems[0]; pathname: string; onClick?: () => void }) {
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150',
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
      )}
    >
      <item.icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 truncate">{item.name}</span>
      {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
    </Link>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, hasRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isLoginPage = pathname === '/admin/login';

  // Close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;
  if (!user) return null;

  const currentPage = navItems.find(i => i.href === pathname);
  const userInitial = (user.name || 'A').charAt(0).toUpperCase();

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex">
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ──────────── SIDEBAR ──────────── */}
      <aside 
        aria-label="Admin Sidebar"
        className={cn(
        'fixed top-0 left-0 z-50 h-[100dvh] w-64 flex flex-col',
        'bg-sidebar text-sidebar-foreground border-r border-sidebar-border',
        'transition-transform duration-300 ease-in-out',
        'lg:sticky lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>

        {/* Brand header */}
        <div className="h-14 flex items-center justify-between px-5 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-primary-foreground font-black text-xs">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-black uppercase tracking-wider text-sidebar-foreground">MediaBoss</span>
              <span className="text-[9px] text-sidebar-foreground/40 uppercase tracking-widest">Admin Portal</span>
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-7 w-7 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav aria-label="Sidebar Menu" className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-0.5">
            <p className="px-3 pb-2 text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-widest">
              Menu
            </p>
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onClick={() => setSidebarOpen(false)} />
            ))}
            {hasRole('super-admin') && (
              <NavLink 
                key="/admin/staff" 
                item={{ name: 'Staff Management', href: '/admin/staff', icon: Settings }} 
                pathname={pathname} 
                onClick={() => setSidebarOpen(false)} 
              />
            )}
          </div>
        </nav>

        {/* User area */}
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-md mb-1">
            <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate text-sidebar-foreground">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/50 truncate">{user.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10 h-8 text-xs gap-2"
            onClick={logout}
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* ──────────── MAIN CONTENT ──────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-[100dvh]">

        {/* Topbar */}
        <header className="h-14 flex-shrink-0 bg-background border-b border-border px-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden h-8 w-8"
            >
              <Menu className="w-4 h-4" />
            </Button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
              <span className="text-muted-foreground hidden sm:inline">Admin</span>
              {currentPage && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 hidden sm:block" />
                  <span className="font-medium text-foreground">{currentPage.name}</span>
                </>
              )}
              {!currentPage && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 hidden sm:block" />
                  <span className="font-medium text-foreground">Portal</span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            </Button>

            {/* User avatar in topbar */}
            <div className="ml-2 w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
              {userInitial}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>
        {children}
      </AdminLayoutInner>
    </AuthProvider>
  );
}
