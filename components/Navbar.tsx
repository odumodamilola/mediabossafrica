
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { PageType } from '../types';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
  }, [location.pathname]);

  const handleNav = (e: React.MouseEvent, page: PageType) => {
    e.preventDefault();
    navigate(page === 'home' ? '/' : `/${page}`);
  };

  const href = (page: PageType) => (page === 'home' ? '/' : `/${page}`);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled
      ? 'py-3 backdrop-blur-xl bg-white/90 dark:bg-brand-deep/90 border-b border-gray-200 dark:border-white/10 shadow-sm'
      : 'py-6 bg-transparent'
      }`} aria-label="Main Navigation">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleNav(e, 'home')}
          className="cursor-pointer group hover:scale-105 transition-transform duration-300"
          aria-label="Mediaboss Africa Home"
        >
          <Logo className="origin-left" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={href(link.href)}
              onClick={(e) => handleNav(e, link.href)}
              className={`relative py-2 text-[10px] uppercase font-black tracking-[0.2em] transition-colors ${activePage === link.href
                ? scrolled
                  ? 'text-gray-900 dark:text-white'
                  : isHome
                    ? 'text-white'
                    : 'text-gray-900 dark:text-white'
                : scrolled
                  ? 'text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/70'
                  : isHome
                    ? 'text-white/80 hover:text-white'
                    : 'text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white/70'
                }`}
            >
              {link.label}
              {activePage === link.href && (
                <span className={`absolute left-0 -bottom-1 h-[2px] w-full ${scrolled ? 'bg-brand-magenta' : isHome ? 'bg-white' : 'bg-brand-magenta'}`} />
              )}
            </a>
          ))}
        </div>

        {/* Theme Toggle & CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/talent/apply"
            onClick={(e) => handleNav(e, 'talent/apply')}
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
              <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={href(link.href)}
                    onClick={(e) => handleNav(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`text-4xl sm:text-5xl font-display font-black tracking-tighter transition-colors ${activePage === link.href ? 'text-brand-magenta' : 'text-gray-900 dark:text-white/90 hover:text-brand-magenta'
                      }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10"
                >
                  <a
                    href="/talent/apply"
                    onClick={(e) => handleNav(e, 'talent/apply')}
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
