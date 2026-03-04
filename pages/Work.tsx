
import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES, TRUSTED_BRANDS } from '../constants';
import { useNavigate } from 'react-router-dom';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const Work: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="max-w-4xl mb-16 sm:mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-brand-magenta text-[10px] sm:text-[11px] font-black tracking-[0.4em] uppercase mb-4 sm:mb-6 block"
          >
            Our Work
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: smoothEase, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[10rem] font-display font-black leading-[0.85] tracking-tighter mb-8 sm:mb-12 text-gray-900 dark:text-white transition-colors"
          >
            Selected <br /> <span className="text-brand-magenta italic">work.</span>
          </motion.h1>
        </div>

        {/* ── Case Study Cards ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-24 sm:mb-32 md:mb-40">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: smoothEase }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-3xl sm:rounded-[48px] border border-gray-200 dark:border-white/10 mb-6 sm:mb-8 relative">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 dark:from-brand-deep/90 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 sm:p-10">
                  <div className="glass-morphism px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-brand-magenta">Outcome: {study.result}</span>
                  </div>
                </div>
                {/* Mobile version of outcome label */}
                <div className="absolute top-4 right-4 sm:hidden">
                  <div className="glass-morphism px-4 py-2 rounded-lg">
                     <span className="text-[8px] font-black uppercase tracking-widest text-brand-magenta">Outcome: {study.result}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start px-2 sm:px-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black mb-1 sm:mb-2 text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">{study.title}</h3>
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/20">{study.client} — {study.category}</span>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-white group-hover:bg-brand-magenta group-hover:border-brand-magenta group-hover:text-white transition-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── We Are Trusted By ────────────────────────────── */}
        <div className="mb-24 sm:mb-32 md:mb-40">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-magenta text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase mb-8 sm:mb-10 block"
          >
            We Are Trusted By
          </motion.span>
          <div className="relative w-full overflow-hidden py-4">
            <motion.div
              className="flex flex-nowrap gap-x-12 sm:gap-x-16 items-center w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25
              }}
            >
              {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex-shrink-0 transition-all duration-300 flex items-center justify-center hover:opacity-80 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={`max-h-8 sm:max-h-12 w-auto object-contain rounded-lg ${brand.className || ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                    {(brand as any).showText && (
                      <span className="font-display font-bold text-gray-900 dark:text-white text-xs sm:text-sm whitespace-nowrap">{brand.name}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Let's Work Together ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase }}
          className="relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-10 sm:p-16 md:p-20 rounded-[40px] sm:rounded-[64px] text-center shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,160,0.07),transparent_70%)]" />
          <div className="relative z-10">
            <span className="text-brand-magenta text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase mb-4 sm:mb-6 block">
              Let&apos;s Work Together
            </span>
            <p className="text-gray-600 dark:text-white/60 text-lg sm:text-xl font-light max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed transition-colors">
              Whether you&apos;re a brand looking to scale influence, a talent ready to build legacy, or a partner seeking creative excellence, Mediaboss Africa delivers solutions that move culture and drive results.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto px-10 sm:px-16 py-6 sm:py-7 bg-brand-magenta text-white rounded-2xl sm:rounded-3xl font-black text-xs sm:text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)]"
            >
              Start a Conversation
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Work;
