
import React from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden" aria-labelledby="hero-title">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-brand-magenta rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0], opacity: [0.08, 0.12, 0.08] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-accent rounded-full blur-[140px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
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
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-morphism border border-white/10 mb-10 shadow-2xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-magenta opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-magenta"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
                Pioneering the 2026 Creator Standard
              </span>
            </motion.div>

            <h1 id="hero-title" className="text-[14vw] md:text-[11rem] lg:text-[14rem] font-display font-black leading-[0.72] tracking-[-0.06em] mb-14 select-none perspective-[1200px]">
              <motion.span 
                initial={{ opacity: 0, y: 80, scale: 0.95, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white"
              >
                CULTURAL
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 45 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="block text-brand-magenta italic text-glow relative origin-center"
              >
                DOMINANCE.
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
                  className="absolute -bottom-6 left-0 h-[2px] bg-gradient-to-r from-transparent via-brand-magenta to-transparent opacity-40"
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="text-xl md:text-3xl text-white/40 max-w-4xl font-light leading-relaxed mb-20 tracking-tight"
            >
              Engineering legacies for Africa's most elite creative elite. <br className="hidden md:block" />
              Infrastructure-backed growth, cinema-grade production, and global scaling.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center w-full sm:w-auto"
            >
              <button 
                onClick={() => onNavigate('apply')}
                className="relative group bg-white text-brand-deep px-16 py-7 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-[1.05] active:scale-[0.98] shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)]"
              >
                 <span className="relative z-10 group-hover:text-white transition-colors duration-300">Join the Roster</span>
                 <div className="absolute inset-0 bg-brand-magenta translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)" />
              </button>
              <button 
                onClick={() => onNavigate('features')}
                className="px-16 py-7 rounded-[24px] glass-morphism border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/5 hover:border-white/20 transition-all shadow-xl"
              >
                 Our Capabilities
              </button>
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
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
