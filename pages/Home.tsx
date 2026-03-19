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

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const smoothEasing = [0.16, 1, 0.3, 1] as const;
  const [projectIndex, setProjectIndex] = useState(0);
  const [behindIndex, setBehindIndex] = useState(0);
  const projectSlides = React.useMemo(
    () => {
      const base = CASE_STUDIES.map((s, i) =>
        i === 0
          ? {
              ...s,
              image: 'https://i.ibb.co/99C4hKQC/Whats-App-Image-2026-03-18-at-6-11-56-PM.jpg',
            }
          : i === 1
            ? {
                ...s,
                image: 'https://i.ibb.co/mCGgTgK0/Whats-App-Image-2026-03-18-at-6-13-16-PM.jpg',
              }
            : i === 2
              ? {
                  ...s,
                  image: 'https://i.ibb.co/HTxVcFsq/Whats-App-Image-2026-03-18-at-6-15-52-PM.jpg',
                }
              : s
      );

      if (base.length >= 4 || base.length === 0) return base;

      return [
        ...base,
        {
          ...base[base.length - 1],
          title: `${base[base.length - 1].title} (Alt)`,
          image: 'https://i.ibb.co/JjLj7Sk8/Whats-App-Image-2026-03-18-at-6-15-54-PM.jpg',
        },
      ];
    },
    []
  );
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: smoothEasing } },
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
    if (!INDUSTRIES.length) return;
    const id = window.setInterval(() => {
      setBehindIndex((prev) => (prev + 1) % INDUSTRIES.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  const projectPrev = () => setProjectIndex((prev) => (prev - 1 + projectSlides.length) % projectSlides.length);
  const projectNext = () => setProjectIndex((prev) => (prev + 1) % projectSlides.length);
  const behindPrev = () => setBehindIndex((prev) => (prev - 1 + INDUSTRIES.length) % INDUSTRIES.length);
  const behindNext = () => setBehindIndex((prev) => (prev + 1) % INDUSTRIES.length);

  return (
    <>
      <Hero onNavigate={onNavigate} />

      <section className="relative overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-white py-20 sm:py-24 md:py-28 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-300 dark:text-white/35 transition-colors">
              What We Do
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
          </div>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {SERVICES.slice(0, 3).map((service, index) => {
              const titles = [
                'STORY DEVELOPMENT & SCRIPTING',
                'END TO END PRODUCTIONS',
                'MARKETING & DISTRIBUTION',
              ];

              return (
                <div key={service.id} className="pt-8">
                  <p className="text-brand-magenta text-[12px] font-black uppercase tracking-[0.2em]">
                    {titles[index] ?? service.title}
                  </p>
                  <p className="mt-6 text-gray-600 dark:text-white/70 text-sm sm:text-base leading-relaxed font-light transition-colors">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('service')}
              className="min-w-[220px] rounded-lg border border-gray-300 dark:border-white/20 bg-transparent px-10 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/35 transition-colors"
            >
              read more
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent transition-colors" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent transition-colors" />
      </section>

      <Suspense fallback={<div className="py-8" />}>
        <TrustSection />
      </Suspense>

      <section className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-300 dark:text-white/35 transition-colors">
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
                <div className="absolute inset-0 bg-black/35" />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={projectPrev}
            aria-label="Previous project"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gray-300/70 dark:border-white/35 bg-white/80 dark:bg-black/25 text-gray-900 dark:text-white backdrop-blur-md hover:bg-white dark:hover:bg-black/35 transition-colors"
          >
            <span className="block text-xl leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={projectNext}
            aria-label="Next project"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gray-300/70 dark:border-white/35 bg-white/80 dark:bg-black/25 text-gray-900 dark:text-white backdrop-blur-md hover:bg-white dark:hover:bg-black/35 transition-colors"
          >
            <span className="block text-xl leading-none">›</span>
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

            <button
              type="button"
              onClick={() => onNavigate('work')}
              className="min-w-[240px] rounded-lg border border-gray-300 dark:border-white/20 bg-transparent px-10 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/35 transition-colors"
            >
              more of our works
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-black text-gray-900 dark:text-white py-16 sm:py-20 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-300 dark:text-white/35 transition-colors">
              In the Spotlight
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
          </div>

          <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {RESOURCES.slice(0, 2).map((res) => (
              <a
                key={res.title}
                href="/resources"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('resources');
                }}
                className="group block"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-black transition-colors">
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between gap-6">
                  <p className="text-gray-700 dark:text-white/85 text-sm sm:text-base font-light leading-relaxed max-w-[36ch] transition-colors">
                    {res.title}
                  </p>
                  <span className="text-gray-500 dark:text-white/70 text-2xl leading-none transition-colors group-hover:text-brand-magenta">→</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 sm:mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="min-w-[220px] rounded-lg border border-gray-300 dark:border-white/20 bg-transparent px-10 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-white/35 transition-colors"
            >
              see more
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-black py-14 sm:py-16 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="h-px w-full bg-gray-300 dark:bg-white/15 transition-colors" />
            <p className="py-10 sm:py-12 text-center text-2xl sm:text-3xl md:text-4xl font-display font-black italic text-brand-magenta">
              Audacious, Authentic & Exportable Art forms
            </p>
            <div className="h-px w-full bg-gray-300 dark:bg-white/15 transition-colors" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-gray-300 dark:text-white/35 transition-colors">
              Behind the Scenes
            </h2>
            <div className="hidden sm:block h-px flex-1 bg-gray-300 dark:bg-white/15 transition-colors" />
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={INDUSTRIES[behindIndex]?.image}
              initial={{ opacity: 0.0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.0, scale: 1.01 }}
              transition={{ duration: 0.9, ease: smoothEasing }}
              className="relative"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-100 dark:bg-black transition-colors">
                <img
                  src={INDUSTRIES[behindIndex]?.image}
                  alt={INDUSTRIES[behindIndex]?.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={behindPrev}
            aria-label="Previous behind the scenes"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gray-300/70 dark:border-white/35 bg-white/80 dark:bg-black/25 text-gray-900 dark:text-white backdrop-blur-md hover:bg-white dark:hover:bg-black/35 transition-colors"
          >
            <span className="block text-xl leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={behindNext}
            aria-label="Next behind the scenes"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-gray-300/70 dark:border-white/35 bg-white/80 dark:bg-black/25 text-gray-900 dark:text-white backdrop-blur-md hover:bg-white dark:hover:bg-black/35 transition-colors"
          >
            <span className="block text-xl leading-none">›</span>
          </button>

          <div className="bg-gray-50 dark:bg-black py-10 sm:py-12 transition-colors">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
              <div className="flex items-center gap-2 flex-wrap justify-center max-w-5xl">
                {INDUSTRIES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setBehindIndex(i)}
                    aria-label={`Go to behind the scenes ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${i === behindIndex ? 'bg-brand-magenta scale-110' : 'bg-gray-400 hover:bg-gray-500 dark:bg-white/45 dark:hover:bg-white/70'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-gray-50/50 dark:bg-brand-void/50 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 md:gap-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
              className="flex-1"
            >
              <motion.span variants={itemVariants} className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4 sm:mb-6 block">
                Based in Lekki, Lagos
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 sm:mb-8 text-gray-900 dark:text-white transition-colors">
                Rooted in <span className="text-brand-magenta italic">Lagos.</span> <br />
                Built for the world.
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-600 dark:text-white/50 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
                Headquarters: Lagos, Nigeria
                <br />
                Operations: Africa | UK | US (Remote Capabilities)
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-6 sm:gap-8">
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">500M+</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest">Combined reach</div>
                </div>
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">12+</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest">Brand partners</div>
                </div>
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">60-90</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest">Days to first deal</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: smoothEasing }}
              viewport={{ once: true, margin: "-10%" }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-brand-magenta/10 blur-[100px] rounded-full" />
              <img
                src="https://images.unsplash.com/photo-1618828665347-d870c38c95c7?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mediaboss Lagos studio"
                width={627}
                height={940}
                className="relative z-10 rounded-3xl sm:rounded-[40px] md:rounded-[48px] border border-gray-200/20 dark:border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <DeferredSection minHeight={420}>
        <Suspense fallback={<div className="py-20" />}>
          <Ecosystem onNavigate={onNavigate} />
        </Suspense>
      </DeferredSection>

      <section className="py-16 sm:py-24 md:py-32 bg-gray-50 dark:bg-brand-void border-y border-gray-200/20 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-gray-900 dark:text-white">Lets Work Together</h3>
          <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light">
            Whether youre a brand looking to scale influence, a talent ready to build legacy, or a partner seeking creative excellence, Mediaboss Africa delivers solutions that move culture and drive results.
          </p>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <button
              onClick={() => onNavigate('talent-form')}
              className="w-full md:w-auto px-12 sm:px-16 py-6 sm:py-7 bg-brand-magenta rounded-2xl sm:rounded-3xl font-black text-sm uppercase tracking-[0.2em] text-white shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] transition-all min-h-[48px]"
            >
              Work With Us
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white dark:bg-brand-deep transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-8 sm:p-10">
            <p className="text-brand-magenta text-[11px] font-black tracking-[0.4em] uppercase mb-4">Newsletter</p>
            <h3 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">Subscribe to our newsletter</h3>
            <p className="mt-4 text-gray-600 dark:text-white/50 text-sm sm:text-base">Get updates from Mediaboss Africa.</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="newsletterEmail"
                required
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-gray-300 dark:border-white/15 bg-white dark:bg-brand-void px-5 py-4 text-gray-900 dark:text-white outline-none focus:border-brand-magenta"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-2xl bg-brand-magenta px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
