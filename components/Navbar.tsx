
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { PageType } from '../types';
import Logo from './Logo';

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent, href: PageType) => {
    e.preventDefault();
    onNavigate(href);
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`} aria-label="Main Navigation">
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* New Brand Logo */}
        <a 
          href="#home"
          onClick={(e) => handleNav(e, 'home')}
          className="cursor-pointer group hover:scale-105 transition-transform duration-300"
          aria-label="Mediaboss Africa Home"
        >
          <Logo className="scale-75 md:scale-100 origin-left" />
        </a>

        {/* Dynamic Desktop Nav with Semantic Links */}
        <div className={`hidden md:flex items-center gap-1 p-1.5 rounded-2xl transition-all duration-500 ${scrolled ? 'glass-morphism bg-brand-deep/80' : 'bg-transparent'}`}>
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href} 
              href={`#${link.href}`}
              onClick={(e) => handleNav(e, link.href)}
              className={`relative px-5 py-2.5 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all ${
                activePage === link.href ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {link.label}
              {activePage === link.href && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Elite CTA */}
        <div className="hidden md:block">
           <a 
             href="#contact"
             onClick={(e) => handleNav(e, 'contact')}
             className="inline-block bg-white text-brand-deep px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-magenta hover:text-white transition-all transform active:scale-95 shadow-xl"
           >
              Let's Talk
           </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden glass-morphism p-3.5 rounded-xl text-white"
          aria-expanded={mobileOpen}
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between items-end">
            <span className={`h-0.5 bg-white transition-all ${mobileOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`} />
            <span className={`h-0.5 bg-white transition-all ${mobileOpen ? 'opacity-0' : 'w-4'}`} />
            <span className={`h-0.5 bg-white transition-all ${mobileOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-2'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 bg-brand-deep/98 backdrop-blur-2xl z-[90] flex flex-col items-center justify-center p-12"
          >
            <div className="flex flex-col gap-8 w-full">
              {NAV_LINKS.map((link, i) => (
                <motion.a 
                  key={link.href} 
                  href={`#${link.href}`}
                  onClick={(e) => handleNav(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-4xl font-display font-black tracking-tighter text-left ${activePage === link.href ? 'text-brand-magenta' : 'text-white/50'}`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNav(e, 'contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-4xl font-display font-black tracking-tighter text-brand-magenta"
              >
                Let's Talk
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
