
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">The Mediaboss Studio</span>
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none mb-10 text-gray-900 dark:text-white transition-colors">
            CREATIVE ENGINE FOR <br /> <span className="text-brand-magenta italic">BRANDS & CREATORS.</span>
          </h1>

          <div className="border-l-2 border-brand-magenta pl-8 mb-12 py-4">
            <p className="text-gray-600 dark:text-white/70 text-lg font-medium italic leading-relaxed max-w-2xl transition-colors">
              A full-service content production and digital storytelling studio built to serve brands, creators, and campaigns.
            </p>
          </div>

          <p className="text-gray-500 dark:text-white/50 text-2xl font-light leading-relaxed transition-colors">
            Every campaign and talent story is visually compelling, platform-optimized, and culturally relevant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-label="Key Features">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-12 rounded-[40px] group hover:scale-[1.02] transition-all shadow-xl dark:shadow-none relative overflow-hidden h-full min-h-[400px] flex flex-col justify-end"
            >
              {/* Dynamic Background Image */}
              {feature.image && (
                <>
                  <div className="absolute inset-0 z-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 text-[10px] font-black uppercase text-brand-magenta tracking-widest bg-white/90 backdrop-blur-sm">
                    {feature.category}
                  </span>
                  <span className="text-4xl font-display font-black text-gray-200 dark:text-white/20 group-hover:text-white/40 transition-colors">
                    {feature.metric}
                  </span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 text-gray-900 dark:text-white group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-gray-500 dark:text-white/40 text-lg leading-relaxed group-hover:text-white/80 transition-colors">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
