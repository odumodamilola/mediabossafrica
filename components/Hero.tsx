import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PageType } from '../types';
import brandVideo from '../assets/videos/brand.mp4';
import brand2Video from '../assets/videos/brand2.mp4';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceFX = reduceMotion || isMobile;

  const slides = [
    {
      src: brand2Video,
      alt: 'Mediaboss Africa brand video 2',
      videoClassName: '-top-24 h-[calc(100%+6rem)] sm:-top-28 sm:h-[calc(100%+7rem)] lg:-top-32 lg:h-[calc(100%+8rem)] origin-top object-top scale-[1.9] sm:scale-[1.45] lg:scale-[1.2]',
    },
    {
      src: brandVideo,
      alt: 'Mediaboss Africa brand video',
      videoClassName: '',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const goPrev = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setActiveSlide((prev) => (prev + 1) % slides.length);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-brand-deep transition-colors duration-300"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.video
            key={slides[activeSlide].src}
            src={slides[activeSlide].src}
            autoPlay
            loop={false}
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            preload="metadata"
            aria-label={slides[activeSlide].alt}
            onEnded={() => {
              if (shouldReduceFX) return;
              goNext();
            }}
            className={`absolute inset-x-0 w-full h-full object-cover pointer-events-none select-none ${slides[activeSlide].videoClassName}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: shouldReduceFX ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-br from-white/78 via-white/58 to-white/72 dark:from-brand-deep/82 dark:via-brand-deep/48 dark:to-brand-deep/72 transition-colors duration-300" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
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
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-700 dark:text-white/80 transition-colors">
                Mediaboss Africa
              </span>
            </motion.div>

            <h1
              id="hero-title"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black leading-[0.9] md:leading-[0.85] tracking-[-0.04em] mb-8 sm:mb-10 md:mb-12 select-none"
            >
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
                className="block text-brand-magenta italic text-glow relative origin-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-4 sm:mt-6"
              >
                Let's make it mediaboss.
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, delay: 2, ease: 'easeInOut' }}
                  className="absolute -bottom-2 sm:-bottom-3 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-magenta to-transparent opacity-40"
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white/75 max-w-3xl leading-relaxed mb-10 sm:mb-12 md:mb-12 tracking-tight transition-colors"
            >
              At Mediaboss Africa, we dont just create visibility - we build influence that converts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              <button
                onClick={() => onNavigate('talent-form')}
                className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 rounded-2xl bg-brand-magenta text-white border-2 border-brand-magenta font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-magenta/90 transition-all shadow-xl hover:shadow-brand-magenta/50 min-h-[48px]"
              >
                Work With Us
              </button>
              <button
                onClick={() => onNavigate('talent')}
                className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 rounded-2xl border-2 border-gray-300 dark:border-white/35 text-gray-700 dark:text-white/85 font-black text-xs uppercase tracking-[0.2em] hover:border-brand-magenta hover:text-brand-magenta transition-colors min-h-[48px]"
              >
                Join Our Talent
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {!shouldReduceFX && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/80 hover:bg-white dark:bg-black/25 dark:hover:bg-black/35 text-gray-900 dark:text-white border border-gray-300/70 dark:border-white/20 backdrop-blur-md transition-colors"
          >
            <span className="block text-2xl leading-none">‹</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/80 hover:bg-white dark:bg-black/25 dark:hover:bg-black/35 text-gray-900 dark:text-white border border-gray-300/70 dark:border-white/20 backdrop-blur-md transition-colors"
          >
            <span className="block text-2xl leading-none">›</span>
          </button>
        </>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-all ${i === activeSlide ? 'bg-brand-magenta scale-110' : 'bg-gray-400/80 hover:bg-gray-500 dark:bg-white/45 dark:hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
