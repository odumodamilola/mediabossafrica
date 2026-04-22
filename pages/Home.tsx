import React, { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from '../components/Hero';
import DeferredSection from '../components/DeferredSection';
import { PageType } from '../types';
import { CASE_STUDIES, INDUSTRIES, RESOURCES, SERVICES } from '../constants';

const TrustSection = lazy(() => import('../components/TrustSection'));
const Ecosystem = lazy(() => import('../components/Ecosystem'));

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

interface StreamableVideoSource {
  durationMs: number;
  posterUrl?: string;
  src: string;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const smoothEasing = [0.16, 1, 0.3, 1] as const;
  const [projectIndex, setProjectIndex] = useState(0);
  const [behindIndex, setBehindIndex] = useState(0);
  const [loadedBehindSlides, setLoadedBehindSlides] = useState<Record<string, boolean>>({});
  const [behindVideoSources, setBehindVideoSources] = useState<Record<string, StreamableVideoSource>>({});
  const behindSlides = React.useMemo(
    () =>
      INDUSTRIES.filter((slide, index, slides) => {
        const slideKey = slide.streamableId ?? slide.image ?? `${slide.name}-${index}`;
        return slides.findIndex((candidate) => (candidate.streamableId ?? candidate.image ?? '') === slideKey) === index;
      }),
    []
  );
  const currentBehindSlide = behindSlides[behindIndex] ?? behindSlides[0];
  const currentBehindSlideKey = currentBehindSlide?.streamableId ?? currentBehindSlide?.image ?? '';
  const currentBehindVideo = currentBehindSlide?.streamableId ? behindVideoSources[currentBehindSlide.streamableId] : null;
  const isCurrentBehindVideo = Boolean(currentBehindSlide?.streamableId);
  const currentBehindSlideLoaded = currentBehindSlideKey ? loadedBehindSlides[currentBehindSlideKey] === true : false;
  const currentBehindSlidePending = isCurrentBehindVideo
    ? !currentBehindVideo?.src || !currentBehindSlideLoaded
    : !currentBehindSlideLoaded;
  
  const projectSlides = React.useMemo(
    () => {
      return CASE_STUDIES.slice(0, 4);
    },
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEasing } },
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem('newsletterEmail') as HTMLInputElement | null;
    const email = emailInput?.value?.trim();
    if (!email) return;
    window.location.href = `mailto:info@mediabossafrica.com?subject=${encodeURIComponent('Newsletter Subscription')}&body=${encodeURIComponent(`Please subscribe this email to the newsletter:\n${email}`)}`;
    form.reset();
  };

  useEffect(() => {
    if (!projectSlides.length) return;
    const id = window.setInterval(() => {
      setProjectIndex((prev) => (prev + 1) % projectSlides.length);
    }, 7500);
    return () => window.clearInterval(id);
  }, [projectSlides.length]);

  useEffect(() => {
    if (!behindSlides.length) return;
    if (isCurrentBehindVideo) return;
    const id = window.setInterval(() => {
      setBehindIndex((prev) => (prev + 1) % behindSlides.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, [behindSlides.length, isCurrentBehindVideo]);

  useEffect(() => {
    if (!currentBehindSlide?.image || !currentBehindSlideKey || loadedBehindSlides[currentBehindSlideKey]) return;
    const image = new window.Image();
    image.src = currentBehindSlide.image;
    const markLoaded = () => {
      setLoadedBehindSlides((prev) =>
        prev[currentBehindSlideKey] ? prev : { ...prev, [currentBehindSlideKey]: true }
      );
    };
    image.onload = markLoaded;
    image.onerror = markLoaded;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [currentBehindSlide?.image, currentBehindSlideKey, loadedBehindSlides]);

  useEffect(() => {
    if (!currentBehindSlide?.streamableId || behindVideoSources[currentBehindSlide.streamableId]) return;
    let active = true;
    const loadVideoSource = async () => {
      try {
        const response = await fetch(`https://api.streamable.com/videos/${currentBehindSlide.streamableId}`);
        if (!response.ok) throw new Error(`Streamable request failed: ${response.status}`);
        const data = await response.json();
        const mp4File = data?.files?.mp4;
        const src = typeof mp4File?.url === 'string' ? mp4File.url : '';
        if (!src) throw new Error('Missing Streamable MP4 URL');
        const posterUrl =
          typeof data?.thumbnail_url === 'string'
            ? data.thumbnail_url.startsWith('//')
              ? `https:${data.thumbnail_url}`
              : data.thumbnail_url
            : undefined;
        const durationMs =
          typeof mp4File?.duration === 'number' && Number.isFinite(mp4File.duration)
            ? Math.round(mp4File.duration * 1000)
            : 20000;
        if (!active) return;
        setBehindVideoSources((prev) =>
          prev[currentBehindSlide.streamableId!]
            ? prev
            : {
                ...prev,
                [currentBehindSlide.streamableId!]: {
                  durationMs,
                  posterUrl,
                  src,
                },
              }
        );
      } catch (error) {
        console.error('Failed to load Streamable video source', error);
      }
    };
    loadVideoSource();
    return () => { active = false; };
  }, [behindVideoSources, currentBehindSlide?.streamableId]);

  const projectPrev = () => setProjectIndex((prev) => (prev - 1 + projectSlides.length) % projectSlides.length);
  const projectNext = () => setProjectIndex((prev) => (prev + 1) % projectSlides.length);
  const behindPrev = () => setBehindIndex((prev) => (prev - 1 + behindSlides.length) % behindSlides.length);
  const behindNext = () => setBehindIndex((prev) => (prev + 1) % behindSlides.length);

  return (
    <>
      <Hero onNavigate={onNavigate} />

      {/* Core Offerings Section */}
      <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-24 sm:py-32 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20 sm:mb-24">
            <motion.span 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block"
            >
              Our Core Ecosystem
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight transition-colors">
              The Triple <span className="text-brand-magenta italic">Threat.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            {[
              { 
                title: 'Studio', 
                desc: 'End-to-end production for bold brand storytelling and premium content.',
                href: 'studio'
              },
              { 
                title: 'Talent', 
                desc: 'Strategic management for Africa\'s most influential creators and actors.',
                href: 'talent'
              },
              { 
                title: 'Marketing', 
                desc: 'Data-driven campaigns that move culture and deliver measurable results.',
                href: 'service'
              }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: smoothEasing }}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-8 p-6 rounded-3xl bg-gray-50 dark:bg-white/5 transition-colors group-hover:bg-brand-magenta/5">
                  <span className="text-brand-magenta text-4xl font-display font-black leading-none">0{i + 1}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black mb-6 uppercase tracking-tight">{pillar.title}</h3>
                <p className="text-gray-600 dark:text-white/50 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-[20ch]">
                  {pillar.desc}
                </p>
                <button 
                  onClick={() => onNavigate(pillar.href as PageType)}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-magenta hover:text-brand-magenta/80 transition-colors"
                >
                  Explore Section
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-8" />}>
        <TrustSection />
      </Suspense>

      {/* Projects Section - Balanced Layout */}
      <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-24 sm:py-32 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-300 dark:text-white/20 transition-colors">
              Our Work
            </h2>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[40px] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={projectSlides[projectIndex]?.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.9, ease: smoothEasing }}
                className="relative aspect-[16/9] md:aspect-[21/9]"
              >
                <img
                  src={projectSlides[projectIndex]?.image}
                  alt={projectSlides[projectIndex]?.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12 md:p-16">
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    className="text-brand-magenta text-xs font-black uppercase tracking-[0.4em] mb-4"
                  >
                    Featured Project
                  </motion.p>
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight"
                  >
                    {projectSlides[projectIndex]?.title}
                  </motion.h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={projectPrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all flex items-center justify-center"
            >
              <span className="text-2xl leading-none">‹</span>
            </button>
            <button
              type="button"
              onClick={projectNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all flex items-center justify-center"
            >
              <span className="text-2xl leading-none">›</span>
            </button>
          </div>

          <div className="mt-12 flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              {projectSlides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setProjectIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${i === projectIndex ? 'bg-brand-magenta w-8' : 'bg-gray-300 dark:bg-white/20'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('work')}
              className="px-10 py-4 rounded-xl border border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:border-brand-magenta hover:text-brand-magenta transition-all"
            >
              View Full Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Spotlight - Clean Editorial Layout */}
      <section className="bg-gray-50 dark:bg-brand-void/50 py-24 sm:py-32 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10 mb-20">
            <div className="h-px flex-1 bg-gray-200 dark:bg-white/5" />
            <h2 className="text-center text-4xl sm:text-5xl font-display font-black tracking-tight text-gray-300 dark:text-white/20 transition-colors uppercase">
              Spotlight
            </h2>
            <div className="h-px flex-1 bg-gray-200 dark:bg-white/5" />
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
            {RESOURCES.slice(0, 2).map((res) => (
              <a
                key={res.title}
                href={res.url || "/resources"}
                target={res.url ? "_blank" : "_self"}
                rel={res.url ? "noopener noreferrer" : ""}
                className="group flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-black transition-colors rounded-3xl shadow-xl">
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] group-hover:scale-105"
                    style={{ objectPosition: res.imagePosition || 'center center' }}
                    loading="lazy"
                  />
                </div>
                <div className="mt-8 flex-1">
                  <div className="flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-widest text-brand-magenta/60">
                    <span>{res.type}</span>
                    <span className="w-1 h-1 rounded-full bg-brand-magenta/30" />
                    <span>{res.source}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold leading-tight text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">
                    {res.title}
                  </h3>
                  {res.excerpt && (
                    <p className="mt-4 text-gray-500 dark:text-white/40 text-sm font-light leading-relaxed line-clamp-2">
                      {res.excerpt}
                    </p>
                  )}
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-magenta transition-colors">
                    <span>Read Article</span>
                    <span className="text-xl leading-none">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BTS Section - Focused on Production */}
      <section className="bg-white dark:bg-black py-24 sm:py-32 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-gray-300 dark:text-white/10 transition-colors uppercase">
            Inside The Studio
          </h2>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[40px] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBehindSlideKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: smoothEasing }}
                className="relative aspect-[16/9] md:aspect-[21/9]"
              >
                {isCurrentBehindVideo && currentBehindVideo?.src ? (
                  <video
                    key={currentBehindVideo.src}
                    src={currentBehindVideo.src}
                    autoPlay muted playsInline loop
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={currentBehindSlide?.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                   <div className="p-8 text-center">
                      <p className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4">Behind The Scenes</p>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">Production Excellence</h3>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <button onClick={behindPrev} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all flex items-center justify-center">‹</button>
            <button onClick={behindNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all flex items-center justify-center">›</button>
          </div>
        </div>
      </section>

      {/* Modern Location & Stats Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-gray-50 dark:bg-brand-void/50 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-8 block">Rooted in Lagos</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-tight mb-8 text-gray-900 dark:text-white transition-colors">
                Built for the <br /> <span className="text-brand-magenta italic">World.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 mt-12">
                {[
                  { val: '500M+', label: 'Combined reach' },
                  { val: '12+', label: 'Brand partners' },
                  { val: '60-90', label: 'Days to first deal' },
                  { val: 'Lekki', label: 'Studio Base' }
                ].map(stat => (
                  <div key={stat.label} className="group">
                    <div className="text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">{stat.val}</div>
                    <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative max-w-lg">
              <div className="absolute inset-0 bg-brand-magenta/10 blur-[80px] rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1618828665347-d870c38c95c7?q=80&w=800&fit=crop"
                alt="Studio atmosphere"
                className="relative z-10 rounded-[40px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <DeferredSection minHeight={420}>
        <Suspense fallback={<div className="py-20" />}>
          <Ecosystem onNavigate={onNavigate} />
        </Suspense>
      </DeferredSection>

      {/* CTA Section - Minimal */}
      <section className="py-24 sm:py-32 bg-white dark:bg-brand-deep transition-colors border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-900 dark:text-white mb-10 transition-colors uppercase">
            Start Your <span className="text-brand-magenta">Legacy</span>
          </h3>
          <p className="text-gray-500 dark:text-white/40 text-base sm:text-lg font-light mb-12 leading-relaxed">
            Whether youre a brand looking to scale influence or a talent ready to build legacy, Mediaboss Africa delivers solutions that move culture.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => onNavigate('talent-form')}
              className="px-12 py-5 bg-brand-magenta rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:scale-105"
            >
              Work With Us
            </button>
            <button
              onClick={() => onNavigate('talent')}
              className="px-12 py-5 rounded-2xl border-2 border-gray-200 dark:border-white/10 font-black text-xs uppercase tracking-[0.2em] transition-all hover:border-brand-magenta hover:text-brand-magenta"
            >
              Join Our Talent
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

