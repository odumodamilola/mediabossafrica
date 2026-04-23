import React, { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap, Users2, Clapperboard, TrendingUp, Globe, Building2, Clock } from 'lucide-react';
import Hero from '../components/Hero';
import DeferredSection from '../components/DeferredSection';
import { PageType } from '../types';
import { CASE_STUDIES, INDUSTRIES, RESOURCES, SERVICES } from '../constants';
import { useNavigate } from 'react-router-dom';

const TrustSection = lazy(() => import('../components/TrustSection'));
const Ecosystem = lazy(() => import('../components/Ecosystem'));

const DigitalMarketingIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="15" x="2" y="3" rx="2"/>
    <path d="M7 21h10"/>
    <path d="M12 18v3"/>
    <path d="M10 8h3l3-3v10l-3-3h-3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M18 8c.6.6.6 1.4 0 2"/>
    <path d="M19.5 6.5c1.4 1.4 1.4 3.6 0 5"/>
  </svg>
);

const HandshakeIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11 17l2 2 6-6"/>
    <path d="M18 14l2.5 2.5a3.3 3.3 0 01-5 5l-1.5-1.5"/>
    <path d="M18 5a3 3 0 00-3 3 3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 00-3-3 3 3 0 00-3 3v2a10 10 0 009 9.9l.7.1"/>
    <path d="M13.5 13H11"/>
    <path d="M17 10l1.5 1.5"/>
    <path d="M20.5 7l1.5 1.5"/>
  </svg>
);

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

interface StreamableVideoSource {
  durationMs: number;
  posterUrl?: string;
  src: string;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const smoothEasing = [0.16, 1, 0.3, 1] as const;
  const [projectIndex, setProjectIndex] = useState(0);
  const [behindIndex, setBehindIndex] = useState(0);
  const [loadedBehindSlides, setLoadedBehindSlides] = useState<Record<string, boolean>>({});
  const [behindVideoSources, setBehindVideoSources] = useState<Record<string, StreamableVideoSource>>({});
  
  const behindSlides = React.useMemo(
    () => INDUSTRIES.filter((slide, index, slides) => {
      const slideKey = slide.streamableId ?? slide.image ?? `${slide.name}-${index}`;
      return slides.findIndex((c) => (c.streamableId ?? c.image ?? '') === slideKey) === index;
    }),
    []
  );

  const projectSlides = React.useMemo(() => CASE_STUDIES.slice(0, 4), []);

  const projectPrev = () => setProjectIndex((prev) => (prev - 1 + projectSlides.length) % projectSlides.length);
  const projectNext = () => setProjectIndex((prev) => (prev + 1) % projectSlides.length);

  useEffect(() => {
    if (!projectSlides.length) return;
    const id = setInterval(() => setProjectIndex(p => (p + 1) % projectSlides.length), 7500);
    return () => clearInterval(id);
  }, [projectSlides.length]);

  useEffect(() => {
    if (!behindSlides.length) return;
    const id = setInterval(() => setBehindIndex(p => (p + 1) % behindSlides.length), 8000);
    return () => clearInterval(id);
  }, [behindSlides.length]);

  return (
    <>
      <Hero onNavigate={onNavigate} />

      {/* Core Offerings */}
      <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-24 sm:py-32 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10 mb-20 sm:mb-24">
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-300 dark:text-white/35 transition-colors uppercase">
              What We Do
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {[
              { 
                title: 'Digital Marketing', 
                desc: 'Dominate the feed. We create the trends that move culture.',
                href: 'digital-marketing',
                icon: DigitalMarketingIcon
              },
              { 
                title: 'Public Relations', 
                desc: 'Own the narrative. Building resonance through strategic trust.',
                href: 'public-relations',
                icon: HandshakeIcon
              },
              { 
                title: 'Talent Management', 
                desc: 'Scale the elite. 360° management for Africa\'s digital legacy.',
                href: 'talent-management',
                icon: Users2
              },
              { 
                title: 'Content Production', 
                desc: 'Cinematic brilliance. High-fidelity assets for the digital age.',
                href: 'content-production',
                icon: Clapperboard
              }
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div 
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: smoothEasing }}
                  className="flex flex-col items-center text-center group h-full"
                >
                  <div className="mb-8 p-8 rounded-[40px] bg-gray-50 dark:bg-white/5 transition-all duration-500 group-hover:bg-brand-magenta/5 group-hover:scale-105 border border-transparent hover:border-brand-magenta/10 shadow-sm">
                    <Icon className="text-brand-magenta w-12 h-12 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-black mb-4 uppercase tracking-tight text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">{pillar.title}</h3>
                  <p className="text-gray-600 dark:text-white/50 text-sm leading-relaxed font-light mb-8 max-w-[20ch] flex-1">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 sm:mt-20 flex justify-center">
            <button
              onClick={() => navigate('/digital-marketing')}
              className="min-w-[220px] rounded-lg border border-gray-300 dark:border-white/20 bg-transparent px-10 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/35 transition-colors"
            >
              read more
            </button>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-8" />}><TrustSection /></Suspense>

      {/* Spotlight */}
      <section className="bg-gray-50 dark:bg-brand-void/50 py-24 sm:py-32 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10 mb-20 text-gray-300 dark:text-white/20">
            <div className="h-px flex-1 bg-current" />
            <h2 className="text-center text-4xl sm:text-5xl font-display font-black tracking-tight uppercase">Spotlight</h2>
            <div className="h-px flex-1 bg-current" />
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
            {RESOURCES.slice(0, 2).map((res) => (
              <a key={res.title} href={res.url || "/resources"} target="_blank" rel="noopener noreferrer" className="group flex flex-col">
                <div className="aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-black rounded-3xl shadow-xl">
                  <img src={res.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" style={{ objectPosition: res.imagePosition || 'center center' }} />
                </div>
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-brand-magenta/60">
                    <span>{res.type}</span>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span>{res.source}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">{res.title}</h3>
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-magenta transition-colors"><span>Read Article</span><span>→</span></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BTS */}
      <section className="bg-white dark:bg-black py-24 sm:py-32 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center text-gray-300 dark:text-white/10">
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight uppercase">Inside The Studio</h2>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[40px] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={behindSlides[behindIndex]?.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: smoothEasing }} className="relative aspect-[16/9] md:aspect-[21/9]">
                <img src={behindSlides[behindIndex]?.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-8">
                   <div>
                      <p className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4">Behind The Scenes</p>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">Production Excellence</h3>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <button onClick={() => setBehindIndex(p => (p - 1 + behindSlides.length) % behindSlides.length)} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center transition-all">‹</button>
            <button onClick={() => setBehindIndex(p => (p + 1) % behindSlides.length)} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center transition-all">›</button>
          </div>
        </div>
      </section>

      {/* The Impact Matrix - Verified Service Results */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-gray-50 dark:bg-brand-void/50 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 sm:mb-24">
            <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Proven Performance</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-gray-900 dark:text-white uppercase leading-[0.9]">The <br /> <span className="text-brand-magenta italic">Impact.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Digital Marketing: MTN */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 group relative overflow-hidden rounded-[48px] bg-white dark:bg-black border border-gray-100 dark:border-white/5 p-10 sm:p-12 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8 text-brand-magenta">
                   <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Digital Marketing</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-display font-black text-gray-900 dark:text-white mb-6 uppercase">MTN NIGERIA</h3>
                <p className="text-gray-600 dark:text-white/50 text-lg font-light leading-relaxed max-w-lg mb-10">Driving market dominance for Africa's largest network through high-velocity influencer ecosystems.</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-6xl sm:text-8xl font-display font-black text-brand-magenta">4.2M</span>
                   <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Total Reach</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 dark:opacity-20 group-hover:scale-110 transition-transform duration-1000"><Zap className="w-full h-full text-brand-magenta rotate-12" strokeWidth={0.5} /></div>
            </motion.div>

            {/* Talent Management: The Network */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-4 flex flex-col justify-between p-10 rounded-[48px] bg-brand-magenta text-white shadow-xl shadow-brand-magenta/20"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-4 text-white">Talent Management</div>
                <Users2 className="w-12 h-12 mb-8" />
              </div>
              <div>
                <div className="text-5xl font-display font-black mb-2">500M+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Combined Reach</div>
              </div>
            </motion.div>

            {/* Content Production: Film */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-6 group relative overflow-hidden rounded-[48px] bg-white dark:bg-black border border-gray-100 dark:border-white/5 p-10 shadow-xl"
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-brand-magenta mb-4">Content Production</div>
              <h3 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-4 uppercase leading-tight">No One Has To Know</h3>
              <p className="text-gray-500 dark:text-white/40 text-sm font-light mb-8 max-w-sm">Branded cinematic production delivering high-impact storytelling for global audiences.</p>
              <div className="flex items-center gap-4">
                 <div className="text-4xl font-display font-black text-brand-magenta">1.2M+</div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">YouTube Views</div>
              </div>
            </motion.div>

            {/* Public Relations: LFW */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-6 flex flex-col justify-between p-10 rounded-[48px] border-2 border-gray-200 dark:border-white/10 group hover:border-brand-magenta transition-colors bg-white dark:bg-black"
            >
              <div className="flex items-start justify-between">
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-brand-magenta mb-2">Public Relations</div>
                   <h3 className="text-2xl font-display font-black text-gray-900 dark:text-white uppercase leading-tight">Lagos Fashion Week</h3>
                </div>
                <HandshakeIcon className="w-10 h-10 text-brand-magenta" />
              </div>
              <div className="mt-8">
                 <div className="text-4xl font-display font-black text-gray-900 dark:text-white mb-1">12M+</div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-magenta transition-colors">Campaign Impressions</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Work - Restored Version 3d (Slider Layout) moved to last section */}
      <section className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-300 dark:text-white/35 transition-colors uppercase">
              Our Projects
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={projectSlides[projectIndex]?.image}
              initial={{ opacity: 0.0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.0, scale: 1.01 }}
              transition={{ duration: 0.9, ease: smoothEasing }}
              className="relative"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-100 dark:bg-black transition-colors">
                <img
                  src={projectSlides[projectIndex]?.image}
                  alt={projectSlides[projectIndex]?.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 sm:p-12 md:p-16">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.4em]">
                      {projectSlides[projectIndex]?.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-brand-magenta/40" />
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                      {projectSlides[projectIndex]?.result}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase leading-none">
                    {projectSlides[projectIndex]?.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={projectPrev}
            aria-label="Previous project"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gray-300/70 dark:border-white/35 bg-white/80 dark:bg-black/25 text-gray-900 dark:text-white backdrop-blur-md hover:bg-white dark:hover:bg-black/35 transition-colors"
          >
            <span className="block text-xl leading-none">&lsaquo;</span>
          </button>
          <button
            type="button"
            onClick={projectNext}
            aria-label="Next project"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gray-300/70 dark:border-white/35 bg-white/80 dark:bg-black/25 text-gray-900 dark:text-white backdrop-blur-md hover:bg-white dark:hover:bg-black/35 transition-colors"
          >
            <span className="block text-xl leading-none">&rsaquo;</span>
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-black py-10 sm:py-12 transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
            <div className="flex items-center gap-2">
              {projectSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setProjectIndex(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${i === projectIndex ? 'bg-brand-magenta scale-110' : 'bg-gray-400 hover:bg-gray-500 dark:bg-white/45 dark:hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <DeferredSection minHeight={420}><Suspense fallback={<div className="py-20" />}><Ecosystem onNavigate={onNavigate} /></Suspense></DeferredSection>

      {/* CTA */}
      <section className="py-24 sm:py-32 bg-white dark:bg-brand-deep transition-colors border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-900 dark:text-white mb-10 transition-colors uppercase">
            Join the <span className="text-brand-magenta">Legacy</span>
          </h3>
          <p className="text-gray-500 dark:text-white/40 text-base sm:text-lg font-light mb-12 leading-relaxed">
            Scaling influence. Building legacies. Moving culture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => onNavigate('talent-form')} className="px-12 py-5 bg-brand-magenta rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:scale-105">Work With Us</button>
            <button onClick={() => onNavigate('talent')} className="px-12 py-5 rounded-2xl border-2 border-gray-200 dark:border-white/10 font-black text-xs uppercase tracking-[0.2em] transition-all hover:border-brand-magenta hover:text-brand-magenta">Join Our Talent</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;