"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { NAV_LINKS } from '../constants';
import { NavItem } from '../types';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const rawActivePage = pathname?.replace('/', '') || 'home';
  const activePage = 
    ['digital-marketing', 'public-relations', 'talent-management', 'content-production'].includes(rawActivePage)
      ? rawActivePage
      : pathname?.startsWith('/talent/')
        ? 'talent'
      : rawActivePage === 'talent/apply'
        ? 'talent'
      : rawActivePage === 'features'
        ? 'about-us'
        : rawActivePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleNav = (e: React.MouseEvent, link: NavItem) => {
    if (link.children) {
      e.preventDefault();
      if (window.innerWidth < 768) {
        setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label);
      }
      return;
    }
    setHoveredLink(null);
  };

  const handleChildNav = () => {
    setHoveredLink(null);
    setMobileOpen(false);
  };

  const getHref = (page: string) => (page === 'home' ? '/' : `/${page}`);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled
      ? 'py-3 backdrop-blur-xl bg-background/90 border-b border-border shadow-sm'
      : 'py-6 bg-transparent'
      }`} aria-label="Main Navigation">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="cursor-pointer group hover:scale-105 transition-transform duration-300"
          aria-label="Mediaboss Africa Home"
        >
          <Logo className="origin-left" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.label}
              className="relative py-2"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                href={link.children ? '#' : getHref(link.href)}
                onClick={(e) => handleNav(e, link)}
                className={`relative py-2 text-[10px] uppercase font-bold tracking-[0.2em] transition-colors flex items-center gap-1 ${activePage === link.href || (link.children?.some(c => pathname === `/${c.href}`))
                  ? scrolled ? 'text-foreground' : isHome ? 'text-white' : 'text-foreground'
                  : scrolled ? 'text-muted-foreground hover:text-foreground' : isHome ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {link.label}
                {link.children && (
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${hoveredLink === link.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {(activePage === link.href || (link.children?.some(c => pathname === `/${c.href}`))) && (
                  <span className={`absolute left-0 -bottom-1 h-[2px] w-full ${scrolled ? 'bg-primary' : isHome ? 'bg-white' : 'bg-primary'}`} />
                )}
              </Link>

              <AnimatePresence>
                {link.children && hoveredLink === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-64 bg-background border border-border rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-2">
                      {link.children.map((child) => (
                         <Link
                          key={child.label}
                          href={`/${child.href}`}
                          onClick={handleChildNav}
                          className="block px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild className="rounded-xl px-8 uppercase font-bold text-[10px] tracking-widest">
            <Link href="/talent/apply">Work With Us</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="bg-background/80 backdrop-blur-md p-3.5 rounded-xl text-foreground border border-border"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between items-end">
              <span className={`h-0.5 bg-foreground transition-all ${mobileOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`} />
              <span className={`h-0.5 bg-foreground transition-all ${mobileOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`h-0.5 bg-foreground transition-all ${mobileOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-background border-t border-border shadow-2xl overflow-y-auto pb-32"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={link.children ? '#' : getHref(link.href)}
                    onClick={(e) => handleNav(e, link)}
                    className="text-xl font-bold tracking-widest uppercase flex items-center justify-between"
                  >
                    <span className={activePage === link.href ? 'text-primary' : 'text-foreground'}>
                      {link.label}
                    </span>
                    {link.children && (
                      <span className="text-primary text-2xl font-light">
                        {mobileDropdownOpen === link.label ? '-' : '+'}
                      </span>
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.children && mobileDropdownOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4 pl-4 border-l-2 border-border flex flex-col gap-4"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={`/${child.href}`}
                            onClick={handleChildNav}
                            className="text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 border-t border-border mt-4"
              >
                <Button asChild className="w-full rounded-xl py-6 text-sm uppercase font-bold tracking-widest">
                  <Link href="/talent/apply" onClick={() => setMobileOpen(false)}>
                    Work With Us
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;