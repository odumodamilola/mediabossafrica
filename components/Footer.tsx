
import React from 'react';
import { PageType } from '../types';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageType) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { label: 'Instagram', icon: 'I', url: 'https://instagram.com/mediabossafrica' },
    { label: 'X', icon: 'X', url: 'https://twitter.com/mediabossafrica' },
    { label: 'LinkedIn', icon: 'L', url: 'https://linkedin.com/company/mediabossafrica' }
  ];

  return (
    <footer className="bg-brand-deep pt-48 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-10">
              <button onClick={() => handleNav('home')}>
                <Logo className="scale-110 origin-left" />
              </button>
            </div>
            <p className="text-white/40 max-w-sm mb-12 text-lg font-light leading-relaxed">
              Shaping the future of African influence through elite digital production and data-driven management.
            </p>
            <div className="flex gap-6">
               {socialLinks.map((social) => (
                 <a 
                   key={social.label} 
                   href={social.url} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black hover:bg-brand-magenta hover:text-white transition-all transform hover:-translate-y-1"
                   aria-label={social.label}
                 >
                    {social.icon}
                 </a>
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-10">Navigation</h4>
            <ul className="space-y-6 text-white/50 font-bold">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <button onClick={() => handleNav(link.href)} className="hover:text-brand-magenta transition-colors text-left">
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-brand-magenta transition-colors text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-10">Contact</h4>
            <ul className="space-y-6 text-white/50 text-sm font-medium">
              <li>Lagos, NG | London, UK</li>
              <li>
                <a href="mailto:hq@mediabossafrica.com" className="hover:text-brand-magenta">hq@mediabossafrica.com</a>
              </li>
              <li>+234 (0) 900 000 0000</li>
              <li>
                <button onClick={() => handleNav('apply')} className="text-brand-magenta font-black hover:underline decoration-brand-magenta/40">
                  Join Our Roster
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
            © {new Date().getFullYear()} MEDIABOSS AFRICA. BUILT FOR DOMINANCE.
          </p>
          <div className="flex gap-10 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
            <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors">Terms</button>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
