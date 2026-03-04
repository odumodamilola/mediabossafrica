import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Clapperboard, Mic2, PlayCircle, Sparkles, Workflow } from 'lucide-react';
import { PageType } from '../types';

interface EcosystemProps {
  onNavigate?: (page: PageType) => void;
}

const STUDIO_CAPABILITIES = [
  'Video Production (Short-form & Long-form)',
  'Social Media Content Creation',
  'Podcast Production',
  'Photography & Creative Direction',
  'Branded Content & Commercial Shoots',
  'Show & Digital Series Development',
  'Editing, Motion Graphics & Post-Production',
];

const Ecosystem: React.FC<EcosystemProps> = ({ onNavigate }) => {
  return (
    <section id="studio" className="py-16 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5 xl:col-span-5"
          >
            <p className="text-brand-magenta font-black text-xs tracking-[0.4em] uppercase mb-4">Mediaboss Africa</p>
            <h2 className="text-3xl sm:text-4xl font-display font-black leading-[0.95] tracking-tight text-gray-900 dark:text-white">
              Influence. Innovation. Impact.
            </h2>
            <p className="mt-5 text-gray-600 dark:text-white/60 text-base leading-relaxed">
              We help brands and talents win in the digital economy through strategic storytelling, data-driven campaigns, and culturally relevant content.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 dark:text-white/40">Pillar</p>
                <p className="mt-2 font-bold text-gray-900 dark:text-white">Influencer Marketing</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 dark:text-white/40">Pillar</p>
                <p className="mt-2 font-bold text-gray-900 dark:text-white">Talent Management</p>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-7 shadow-sm dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] xl:col-span-7"
          >
            <p className="text-brand-magenta font-black text-xs tracking-[0.4em] uppercase mb-4">Mediaboss Studio</p>
            <h3 className="text-3xl sm:text-4xl font-display font-black leading-[0.95] tracking-tight text-gray-900 dark:text-white">
              The Mediaboss <span className="italic text-brand-magenta">studio.</span>
            </h3>
            <p className="mt-5 text-gray-600 dark:text-white/60 text-base leading-relaxed">
              Our in-house creative production and content innovation hub, powering high-quality storytelling and digital media production for brands and talents.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <div className="mb-3 flex items-center gap-2 text-brand-magenta"><Sparkles className="h-4 w-4" /><p className="text-xs font-black uppercase tracking-[0.2em]">Studio Overview</p></div>
                <p className="text-sm text-gray-700 dark:text-white/70">The Studio ensures every campaign and talent story is visually compelling, platform-optimized, and culturally relevant.</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-white/10 p-4">
                <div className="mb-3 flex items-center gap-2 text-brand-magenta"><Workflow className="h-4 w-4" /><p className="text-xs font-black uppercase tracking-[0.2em]">Studio Creative Process</p></div>
                <p className="text-sm text-gray-700 dark:text-white/70">From concept to post-production, every production is built for creative quality and platform performance.</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 dark:border-white/10 p-4">
              <div className="mb-4 flex items-center gap-2 text-brand-magenta"><Clapperboard className="h-4 w-4" /><p className="text-xs font-black uppercase tracking-[0.2em]">Studio Capabilities</p></div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {STUDIO_CAPABILITIES.map((item, i) => (
                  <div key={item} className="flex items-start gap-2 rounded-lg bg-white/70 px-3 py-2 dark:bg-white/5">
                    {i % 4 === 0 && <PlayCircle className="mt-0.5 h-4 w-4 text-brand-magenta" />}
                    {i % 4 === 1 && <Camera className="mt-0.5 h-4 w-4 text-brand-magenta" />}
                    {i % 4 === 2 && <Mic2 className="mt-0.5 h-4 w-4 text-brand-magenta" />}
                    {i % 4 === 3 && <Clapperboard className="mt-0.5 h-4 w-4 text-brand-magenta" />}
                    <span className="text-sm text-gray-800 dark:text-white/75">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 dark:border-white/10 p-4">
              <div className="mb-4 flex items-center gap-2 text-brand-magenta"><PlayCircle className="h-4 w-4" /><p className="text-xs font-black uppercase tracking-[0.2em]">Studio Production Work</p></div>
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop"
                alt="Mediaboss Studio"
                className="h-56 w-full rounded-xl object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <button
              onClick={() => onNavigate?.('studio')}
              className="mt-8 group relative px-10 sm:px-12 py-5 sm:py-6 bg-brand-deep dark:bg-white text-white dark:text-brand-deep rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 shadow-2xl min-h-[48px]"
            >
              <span className="relative z-10 group-hover:text-white transition-colors">View our work</span>
              <div className="absolute inset-0 bg-brand-magenta translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;