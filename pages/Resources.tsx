
import React from 'react';
import { motion } from 'framer-motion';
import { RESOURCES } from '../constants';

const Resources: React.FC = () => {
  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 sm:gap-12 mb-16 sm:mb-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.9] mb-6 text-gray-900 dark:text-white transition-colors">INTELLIGENCE <br /> <span className="text-gray-300 dark:text-white/20 italic transition-colors">HUB.</span></h1>
            <p className="text-gray-500 dark:text-white/50 text-lg sm:text-xl font-light transition-colors">Data, insights, and strategy for the African creative frontier.</p>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <input
              type="text"
              placeholder="Search Insight..."
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm w-full md:w-64 focus:border-brand-magenta outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RESOURCES.map((res, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-2xl sm:rounded-[32px] overflow-hidden mb-4 sm:mb-6 relative shadow-lg">
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                  <span className="bg-white/90 dark:bg-brand-deep/80 backdrop-blur-md text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-brand-magenta border border-brand-magenta/30 shadow-md">
                    {res.type}
                  </span>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors leading-tight">{res.title}</h3>
              <p className="text-gray-400 dark:text-white/30 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors">{res.readTime}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
