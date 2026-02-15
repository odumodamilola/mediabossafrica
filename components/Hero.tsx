
import React from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';
import brandVideo from '../assets/videos/brand.mp4';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-brand-deep py-20 sm:py-32 transition-colors duration-300" aria-labelledby="hero-title">
      <div className="absolute inset-0 z-0">
        <video
          src={brandVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white dark:from-brand-deep/80 dark:via-brand-deep/50 dark:to-brand-deep" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-brand-magenta rounded-full blur-[140px] mix-blend-overlay"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-accent rounded-full blur-[140px] mix-blend-overlay"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Badge — Geographic Authority Signal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-morphism mb-10 shadow-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-magenta"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 dark:text-white/70">
                Lagos-Based Creator Agency
              </span>
            </motion.div>

            {/* H1 — SEO-aligned, keyword-rich, sentence case */}
            <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[0.9] md:leading-[0.85] tracking-[-0.03em] mb-8 sm:mb-10 md:mb-14 select-none">
              <motion.span
                initial={{ opacity: 0, y: 80, scale: 0.95, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gray-900 dark:text-white transition-colors"
              >
                Nigeria's leading
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="block text-brand-magenta italic text-glow relative origin-center"
              >
                creator agency.
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                  className="absolute -bottom-4 sm:-bottom-6 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand-magenta to-transparent opacity-40"
                />
              </motion.span>
            </h1>

            {/* Subheadline — Clear benefit, specific, human */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-white/50 max-w-3xl font-light leading-relaxed mb-10 sm:mb-12 md:mb-14 tracking-tight px-4 sm:px-0">
              We connect creators with paying brand partnerships, handle contracts and negotiations, and give you free access to our Lagos production studio.
            </motion.p>

            {/* CTA — Clear hierarchy: Primary dominant, Secondary subtle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 rounded-2xl bg-brand-magenta text-white border-2 border-brand-magenta font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-magenta/90 transition-all shadow-2xl hover:shadow-brand-magenta/50 min-h-[48px]"
              >
                Apply to join
              </button>
              <button
                onClick={() => onNavigate('work')}
                className="text-gray-500 dark:text-white/40 font-bold text-xs uppercase tracking-[0.2em] hover:text-brand-magenta dark:hover:text-brand-magenta transition-colors min-h-[48px] px-4"
              >
                View our work →
              </button>
            </motion.div>

            {/* Qualification filter — reduces unqualified leads */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.4 }}
              className="text-[10px] sm:text-[11px] text-gray-400 dark:text-white/20 mt-6 font-medium tracking-wide"
            >
              For creators with 50K+ followers · Commission-based — we only earn when you earn
            </motion.p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-brand-magenta to-transparent opacity-30" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-300 dark:text-white/20 vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
