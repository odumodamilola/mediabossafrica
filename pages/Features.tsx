import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clapperboard, Crown, Megaphone, Users2, Shield, Zap, Target } from 'lucide-react';
import { TRUSTED_BRANDS } from '../constants';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.85, ease: smoothEase, delay },
});

const leadership = [
  {
    name: 'Peace Jamb',
    role: 'Founder / CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', // Placeholder
    bio: 'Visionary leader driving the pan-African media revolution.',
  },
  {
    name: 'Damilola Odumo',
    role: 'Co-Founder / COO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', // Placeholder
    bio: 'Architect of strategy and operational excellence.',
  },
  {
    name: 'Creative Director',
    role: 'Head of Production',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop', // Placeholder
    bio: 'Crafting the visual language of African influence.',
  },
  {
    name: 'Talent Lead',
    role: 'Head of Partnerships',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop', // Placeholder
    bio: 'Building bridges between brands and audience power.',
  },
];

const values = [
  { title: 'Impact', desc: 'Results over noise.', icon: Target },
  { title: 'Speed', desc: 'Lagos pace, global scale.', icon: Zap },
  { title: 'Integrity', desc: 'Your brand, protected.', icon: Shield },
];

const Features: React.FC = () => {
  return (
    <div className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-24 lg:pb-32 bg-white dark:bg-brand-deep transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* ── Hero Section ─────────────────────────────────── */}
        <section className="mb-24 sm:mb-32">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block"
          >
            Our Identity
          </motion.span>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: smoothEase }}
              className="text-5xl sm:text-7xl lg:text-8xl font-display font-black leading-[0.85] tracking-tighter text-gray-900 dark:text-white"
            >
              Influence. <br />
              <span className="text-brand-magenta italic">Innovation.</span> <br />
              Impact.
            </motion.h1>
            <motion.div
              {...fadeUp(0.2)}
              className="space-y-6 pt-4"
            >
              <p className="text-xl sm:text-2xl font-light leading-relaxed text-gray-600 dark:text-white/60">
                MediaBoss Africa is a premier media ecosystem sitting at the intersection of culture and commerce. 
              </p>
              <div className="h-px w-20 bg-brand-magenta/30" />
              <p className="text-base text-gray-500 dark:text-white/40 leading-relaxed max-w-md">
                We empower brands and creators to tell compelling stories, build strong communities, and achieve measurable growth.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Core Values ──────────────────────────────────── */}
        <section className="grid gap-6 sm:grid-cols-3 mb-24 sm:mb-32">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp(i * 0.1)}
              className="p-8 rounded-[32px] border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm group hover:border-brand-magenta/30 transition-all"
            >
              <v.icon className="h-6 w-6 text-brand-magenta mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-display font-black text-gray-900 dark:text-white mb-2">{v.title}</h3>
              <p className="text-gray-500 dark:text-white/40 text-sm uppercase tracking-widest">{v.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Leadership / Team ────────────────────────────── */}
        <section className="mb-24 sm:mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <p className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4">Leadership</p>
              <h2 className="text-4xl sm:text-6xl font-display font-black text-gray-900 dark:text-white leading-none tracking-tight">
                The minds behind <br /> the influence.
              </h2>
            </div>
            <p className="text-gray-500 dark:text-white/40 text-lg font-light max-w-xs leading-snug">
              A lean, high-impact team dedicated to your growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, i) => (
              <motion.article
                key={member.name}
                {...fadeUp(i * 0.1)}
                className="group relative"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[32px] mb-6 grayscale hover:grayscale-0 transition-all duration-700 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-2">
                  <h4 className="text-xl font-display font-black text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-brand-magenta text-[10px] font-black uppercase tracking-widest mb-3 mt-1">{member.role}</p>
                  <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── Mission & Vision ────────────────────────────── */}
        <section className="grid gap-8 lg:grid-cols-2 mb-24 sm:mb-32">
          <motion.div
            {...fadeUp(0)}
            className="p-10 sm:p-14 rounded-[48px] bg-brand-deep text-white dark:bg-white/5 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Crown className="h-32 w-32" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-black mb-6 relative z-10">Our Vision</h3>
            <p className="text-lg sm:text-xl font-light leading-relaxed text-white/70 relative z-10">
              To become Africa&apos;s most influential media ecosystem, shaping global conversations through talent, creativity, and culture.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="p-10 sm:p-14 rounded-[48px] border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 text-brand-magenta">
              <ArrowUpRight className="h-32 w-32" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-black mb-6 text-gray-900 dark:text-white">Our Mission</h3>
            <p className="text-lg sm:text-xl font-light leading-relaxed text-gray-600 dark:text-white/60">
              To help brands and creators tell better stories and grow with more direction through premium strategy and production.
            </p>
          </motion.div>
        </section>

        {/* ── Trusted Brands (Marquee) ────────────────────── */}
        <section className="pt-16 border-t border-gray-100 dark:border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4 text-center md:text-left">
            <h2 className="text-2xl font-display font-black text-gray-900 dark:text-white uppercase tracking-tighter">Trusted By Giants</h2>
            <div className="h-px flex-1 bg-gray-100 dark:bg-white/5 hidden md:block mx-8" />
            <p className="text-gray-400 dark:text-white/20 text-xs font-black uppercase tracking-[0.3em]">Pan-African Impact</p>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            <motion.div
              className="flex flex-nowrap gap-x-16 sm:gap-x-24 items-center w-max"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
            >
              {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex-shrink-0 transition-all duration-300 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 cursor-pointer"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`max-h-10 w-auto object-contain ${brand.className || ''}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Features;
