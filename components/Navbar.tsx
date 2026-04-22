import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { PageType, NavItem } from '../types';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
  }, [location.pathname]);

  const handleNav = (e: React.MouseEvent, link: NavItem) => {
    e.preventDefault();
    
    // If it's a parent link with children, ONLY toggle dropdown/do nothing
    if (link.children) {
      if (window.innerWidth < 768) {
        setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label);
      }
      // On desktop, hover handles it, so clicking a parent link with children does nothing
      return;
    }
    
    navigate(link.href === 'home' ? '/' : `/${link.href}`);
    setHoveredLink(null);
  };

  const handleChildNav = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    navigate(`/${href}`);
    setHoveredLink(null);
    setMobileOpen(false);
  };

  const getHref = (page: string) => (page === 'home' ? '/' : `/${page}`);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled
      ? 'py-3 backdrop-blur-xl bg-white/90 dark:bg-brand-deep/90 border-b border-gray-200 dark:border-white/10 shadow-sm'
      : 'py-6 bg-transparent'
      }`} aria-label="Main Navigation">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className="cursor-pointer group hover:scale-105 transition-transform duration-300"
          aria-label="Mediaboss Africa Home"
        >
          <Logo className="origin-left" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <div 
              key={link.label}
              className="relative py-2"
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <a
                href={getHref(link.href)}
                onClick={(e) => handleNav(e, link)}
                className={`relative py-2 text-[10px] uppercase font-black tracking-[0.2em] transition-colors flex items-center gap-1 ${activePage === link.href || (link.children?.some(c => location.pathname === `/${c.href}`))
                  ? scrolled ? 'text-gray-900 dark:text-white' : isHome ? 'text-white' : 'text-gray-900 dark:text-white'
                  : scrolled ? 'text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/70' : isHome ? 'text-white/80 hover:text-white' : 'text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/70'
                  }`}
              >
                {link.label}
                {link.children && (
                  <svg className={`w-2.5 h-2.5 transition-transform duration-300 ${hoveredLink === link.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {(activePage === link.href || (link.children?.some(c => location.pathname === `/${c.href}`))) && (
                  <span className={`absolute left-0 -bottom-1 h-[2px] w-full ${scrolled ? 'bg-brand-magenta' : isHome ? 'bg-white' : 'bg-brand-magenta'}`} />
                )}
              </a>

              {/* Dropdown */}
              <AnimatePresence>
                {link.children && hoveredLink === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-brand-deep border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-2">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={`/${child.href}`}
                          onClick={(e) => handleChildNav(e, child.href)}
                          className="block px-6 py-4 text-[10px] uppercase font-bold tracking-widest text-gray-500 dark:text-white/40 hover:text-brand-magenta dark:hover:text-brand-magenta hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Theme Toggle & CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/talent/apply"
            onClick={(e) => { e.preventDefault(); navigate('/talent/apply'); }}
            className={`inline-block bg-brand-magenta hover:bg-brand-magenta/90 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all transform active:scale-95 shadow-xl ${scrolled ? '' : isHome ? 'shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)]' : ''}`}
          >
            Work With Us
          </a>
        </div>

        {/* Mobile: Theme Toggle + Menu */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass-morphism bg-white/80 dark:bg-brand-deep/80 backdrop-blur-md p-3.5 rounded-xl text-gray-900 dark:text-white border border-gray-200/50 dark:border-white/10"
            aria-expanded={mobileOpen}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between items-end">
              <span className={`h-0.5 bg-gray-900 dark:bg-white transition-all ${mobileOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`} />
              <span className={`h-0.5 bg-gray-900 dark:bg-white transition-all ${mobileOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`h-0.5 bg-gray-900 dark:bg-white transition-all ${mobileOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-2'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-white dark:bg-brand-deep z-[90]"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-0 flex flex-col p-6 pt-32 overflow-y-auto"
            >
              <div className="flex flex-col gap-6 w-full max-w-sm mx-auto pb-12">
                {NAV_LINKS.map((link, i) => (
                  <div key={link.label}>
                    <div className="flex items-center justify-between">
                      <motion.a
                        href={getHref(link.href)}
                        onClick={(e) => handleNav(e, link)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`text-4xl sm:text-5xl font-display font-black tracking-tighter transition-colors ${activePage === link.href || (link.children?.some(c => location.pathname === `/${c.href}`)) ? 'text-brand-magenta' : 'text-gray-900 dark:text-white/90 hover:text-brand-magenta'
                          }`}
                      >
                        {link.label}
                      </motion.a>
                      {link.children && (
                        <button 
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                          className="p-4"
                        >
                          <svg className={`w-6 h-6 transition-transform ${mobileDropdownOpen === link.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {link.children && mobileDropdownOpen === link.label && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 ml-4 flex flex-col gap-4 overflow-hidden"
                        >
                          {link.children.map((child, j) => (
                            <motion.a
                              key={child.label}
                              href={`/${child.href}`}
                              onClick={(e) => handleChildNav(e, child.href)}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (j * 0.03) }}
                              className="text-lg font-bold uppercase tracking-widest text-gray-400 dark:text-white/30 hover:text-brand-magenta transition-colors"
                            >
                              {child.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10"
                >
                  <a
                    href="/talent/apply"
                    onClick={(e) => { e.preventDefault(); navigate('/talent/apply'); }}
                    className="block w-full text-center bg-brand-magenta text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
                  >
                    Work With Us
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;