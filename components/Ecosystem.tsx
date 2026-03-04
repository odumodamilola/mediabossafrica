import React from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';

interface EcosystemProps {
  onNavigate?: (page: PageType) => void;
}

const Ecosystem: React.FC<EcosystemProps> = ({ onNavigate }) => {
  return (
    <section id="studio" className="py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-[#0d0113] border border-gray-200 dark:border-white/10 rounded-3xl sm:rounded-[48px] lg:rounded-[56px] overflow-hidden p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-colors duration-500"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden">
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(255,0,160,0.15),transparent_70%)]"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center relative z-10">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-brand-magenta font-black text-xs tracking-[0.5em] uppercase mb-6 sm:mb-8 block"
              >
                The Mediaboss Studio
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-6 sm:mb-8 leading-[0.9] tracking-tight text-gray-900 dark:text-white transition-colors">
                The Mediaboss <br />
                <span className="text-brand-magenta italic">studio.</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-white/50 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-xl transition-colors">
                Our in-house creative production and content innovation hub, powering high-quality storytelling and digital media production for brands and talents.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-6 sm:gap-y-8 mb-10 sm:mb-12 md:mb-14">
                {[
                  { t: 'Video Production (Short-form & Long-form)' },
                  { t: 'Social Media Content Creation' },
                  { t: 'Podcast Production' },
                  { t: 'Photography & Creative Direction' },
                  { t: 'Branded Content & Commercial Shoots' },
                  { t: 'Show & Digital Series Development' },
                  { t: 'Editing, Motion Graphics & Post-Production' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4 className="text-gray-900 dark:text-white font-black text-sm uppercase tracking-widest mb-2 sm:mb-3 border-l-2 border-brand-magenta pl-4 transition-colors">{item.t}</h4>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => onNavigate?.('studio')}
                className="group relative px-10 sm:px-12 py-5 sm:py-6 bg-brand-deep dark:bg-white text-white dark:text-brand-deep rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 shadow-2xl min-h-[48px]"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">View our work</span>
                <div className="absolute inset-0 bg-brand-magenta translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </button>
            </div>

            <div className="relative group perspective-[2000px] flex justify-center lg:justify-end">
              <motion.div
                whileHover={{ rotateY: -5, rotateX: 2, scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-[320px] aspect-[9/16] rounded-[32px] overflow-hidden shadow-[0_60px_100px_-20px_rgba(255,0,160,0.3)] bg-black border-[5px] border-gray-900 dark:border-[#1a1a1a] ring-1 ring-white/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop"
                  alt="Mediaboss Studio"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ecosystem;
