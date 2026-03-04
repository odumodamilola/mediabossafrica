import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PageType } from '../types';
import brandVideo from '../assets/videos/brand.mp4';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceFX = reduceMotion || isMobile;

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-brand-deep py-20 sm:py-32 transition-colors duration-300" aria-labelledby="hero-title">
      <div className="absolute inset-0 z-0">
        {!isMobile && (
          <video
            src={brandVideo}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover opacity-10 dark:opacity-20 pointer-events-none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white dark:from-brand-deep/80 dark:via-brand-deep/50 dark:to-brand-deep" />

        <motion.div
          animate={shouldReduceFX ? { opacity: 0.1 } : { scale: [1, 1.2, 1], rotate: [0, 5, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: shouldReduceFX ? 0 : Infinity, ease: 'linear' }}
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-brand-magenta rounded-full blur-[140px] mix-blend-overlay"
        />
        <motion.div
          animate={shouldReduceFX ? { opacity: 0.08 } : { scale: [1.1, 1, 1.1], rotate: [0, -5, 0], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 18, repeat: shouldReduceFX ? 0 : Infinity, ease: 'linear' }}
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-morphism mb-10 shadow-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-magenta" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 dark:text-white/70">
                Mediaboss Africa
              </span>
            </motion.div>

            <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-[0.9] md:leading-[0.85] tracking-[-0.03em] mb-8 sm:mb-10 md:mb-14 select-none">
              <motion.span
                initial={{ opacity: 0, y: 80, scale: 0.95, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-gray-900 dark:text-white transition-colors"
              >
                Influence. Innovation. Impact.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="block text-brand-magenta italic text-glow relative origin-center"
              >
                Let's make it mediaboss.
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 2, ease: 'easeInOut' }}
                  className="absolute -bottom-4 sm:-bottom-6 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand-magenta to-transparent opacity-40"
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white/50 max-w-3xl leading-relaxed mb-10 sm:mb-12 md:mb-14 tracking-tight px-4 sm:px-0"
            >
              At Mediaboss Africa, we dont just create visibility - we build influence that converts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
            >
              <button
                onClick={() => onNavigate('talent-form')}
                className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 rounded-2xl bg-brand-magenta text-white border-2 border-brand-magenta font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-magenta/90 transition-all shadow-xl hover:shadow-brand-magenta/50 min-h-[48px]"
              >
                Lets Work Together
              </button>
              <button
                onClick={() => onNavigate('service')}
                className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 rounded-2xl border-2 border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/70 font-black text-xs uppercase tracking-[0.2em] hover:border-brand-magenta hover:text-brand-magenta dark:hover:text-brand-magenta transition-colors min-h-[48px]"
              >
                Our Ecosystem
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-3 px-4 sm:grid-cols-3 sm:px-0"
            >
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Influencer marketing</p>
              </div>
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Talent management</p>
              </div>
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 p-4 text-center backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-bold text-gray-900 dark:text-white">The Mediaboss Studio (Subsidiary)</p>
              </div>
            </motion.div>
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
      </motion.div>
    </section>
  );
};

export default Hero;
