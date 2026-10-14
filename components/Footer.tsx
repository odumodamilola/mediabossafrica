"use client";

import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageType } from '../types';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';
import { Button } from './ui/button';

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2H21.5l-7.112 8.13L22.75 22h-6.547l-5.127-6.705L5.21 22H1.95l7.606-8.694L1.5 2h6.713l4.634 6.11L18.244 2Zm-1.145 18h1.804L7.228 3.895H5.29L17.1 20Z" />
  </svg>
);

const Footer: React.FC = () => {
  const socialLinks = [
    { label: 'Instagram', icon: Instagram, url: 'https://instagram.com/mediabossafrica' },
    { label: 'X', icon: XIcon, url: 'https://twitter.com/mediabossafrica' },
    { label: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/mediabossafrica' }
  ];

  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-background pt-24 sm:pt-32 lg:pt-48 pb-12 border-t border-border transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-24">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8 sm:mb-10">
              <Link href="/">
                <Logo className="origin-left" />
              </Link>
            </div>
            <p className="text-muted-foreground max-w-sm mb-10 sm:mb-12 text-base sm:text-lg leading-relaxed">
              Mediaboss Africa is a leading pan-African talent management, influencer marketing, and creative media company at the intersection of culture, entertainment, and commerce.
            </p>
            <div className="flex gap-4 sm:gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all transform hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="sm:pt-4 lg:pt-0">
            <h4 className="text-foreground font-black uppercase text-[10px] tracking-widest mb-8 sm:mb-10">Navigation</h4>
            <ul className="space-y-4 sm:space-y-6 text-muted-foreground font-bold">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href === 'home' ? '/' : `/${link.href}`} className="hover:text-primary transition-colors text-sm sm:text-base">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:pt-4 lg:pt-0">
            <h4 className="text-foreground font-black uppercase text-[10px] tracking-widest mb-8 sm:mb-10">Contact</h4>
            <ul className="space-y-4 sm:space-y-6 text-muted-foreground text-sm font-medium">
              <li className="leading-relaxed">Africa | UK | US (Remote Capabilities)</li>
              <li>
                <a href="mailto:info@mediabossafrica.com" className="hover:text-primary block truncate">info@mediabossafrica.com</a>
              </li>
              <li>+2349029982101</li>
              <li>
                <Link href="/consultation" className="text-primary font-black hover:underline decoration-primary/40 block">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link href="/talent/apply" className="text-muted-foreground hover:text-primary transition-colors block text-xs uppercase tracking-wider font-semibold">
                  Join Talent Roster
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 sm:pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
            © {new Date().getFullYear()} Mediaboss Africa. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
