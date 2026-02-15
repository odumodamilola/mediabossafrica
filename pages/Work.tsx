
import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDIES } from '../constants';

const Work: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-32">
          <span className="text-brand-magenta text-[11px] font-black tracking-[0.5em] uppercase mb-6 block">Our portfolio</span>
          <h1 className="text-7xl md:text-[10rem] font-display font-black leading-[0.85] tracking-tighter mb-12 text-gray-900 dark:text-white">
            Selected <br /> <span className="text-brand-magenta italic text-glow">work.</span>
          </h1>
          <p className="text-gray-500 dark:text-white/40 text-2xl font-light leading-relaxed max-w-2xl">
            From viral fintech campaigns to cinema-grade fashion series, explore the real results we create for our partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[48px] border border-gray-200 dark:border-white/10 mb-8 relative">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover grayscale transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 dark:from-brand-deep/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                  <div className="glass-morphism px-8 py-4 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-magenta">Outcome: {study.result}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start px-4">
                <div>
                  <h3 className="text-3xl font-display font-black mb-2 text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">{study.title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/20">{study.client} — {study.category}</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-white group-hover:bg-brand-magenta group-hover:border-brand-magenta group-hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 p-20 glass-morphism rounded-[64px] text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black mb-8 sm:mb-10 text-gray-900 dark:text-white transition-colors">Ready to work together?</h2>
          <button
            onClick={() => window.location.hash = 'contact'}
            className="px-16 py-8 bg-brand-deep dark:bg-white text-white dark:text-brand-deep rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-brand-magenta hover:text-white transition-all shadow-2xl"
          >
            Request Strategy Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Work;
