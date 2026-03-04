
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageType } from '../types';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navigate = useNavigate();

  const handleNav = (page: PageType) => {
    navigate(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'Instagram', icon: 'I', url: 'https://instagram.com/mediabossafrica' },
    { label: 'X', icon: 'X', url: 'https://twitter.com/mediabossafrica' },
    { label: 'LinkedIn', icon: 'L', url: 'https://linkedin.com/company/mediabossafrica' }
  ];

  return (
    <footer className="bg-gray-100 dark:bg-brand-deep pt-24 sm:pt-32 lg:pt-48 pb-12 border-t border-gray-200 dark:border-white/5 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-24">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8 sm:mb-10">
              <button onClick={() => handleNav('home')}>
                <Logo className="origin-left" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-white/40 max-w-sm mb-10 sm:mb-12 text-base sm:text-lg leading-relaxed">
              Mediaboss Africa is a leading pan-African talent management, influencer marketing, and creative media company at the intersection of culture, entertainment, and commerce.
            </p>
            <div className="flex gap-4 sm:gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-xs font-black text-brand-deep dark:text-white hover:bg-brand-magenta hover:text-white dark:hover:bg-brand-magenta dark:hover:text-white transition-all transform hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="sm:pt-4 lg:pt-0">
            <h4 className="text-gray-900 dark:text-white font-black uppercase text-[10px] tracking-widest mb-8 sm:mb-10">Navigation</h4>
            <ul className="space-y-4 sm:space-y-6 text-gray-600 dark:text-white/50 font-bold">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href === 'home' ? '/' : `/${link.href}`} onClick={(e) => { e.preventDefault(); handleNav(link.href); }} className="hover:text-brand-magenta transition-colors text-sm sm:text-base">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:pt-4 lg:pt-0">
            <h4 className="text-gray-900 dark:text-white font-black uppercase text-[10px] tracking-widest mb-8 sm:mb-10">Contact</h4>
            <ul className="space-y-4 sm:space-y-6 text-gray-600 dark:text-white/50 text-sm font-medium">
              <li className="leading-relaxed">Africa | UK | US (Remote Capabilities)</li>
              <li>
                <a href="mailto:info@mediabossafrica.com" className="hover:text-brand-magenta block truncate">info@mediabossafrica.com</a>
              </li>
              <li>+234 (0) 900 000 0000</li>
              <li>
                <a href="/talent-form" onClick={(e) => { e.preventDefault(); handleNav('talent-form'); }} className="text-brand-magenta font-black hover:underline decoration-brand-magenta/40">
                  Lets Work Together
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 sm:pt-12 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <p className="text-gray-500 dark:text-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
            © {new Date().getFullYear()} Mediaboss Africa. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-gray-400 dark:text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
            <a href="/privacy" onClick={(e) => { e.preventDefault(); handleNav('privacy'); }} className="hover:text-brand-magenta dark:hover:text-white transition-colors">Privacy</a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); handleNav('terms'); }} className="hover:text-brand-magenta dark:hover:text-white transition-colors">Terms</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); handleNav('contact'); }} className="hover:text-brand-magenta dark:hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
