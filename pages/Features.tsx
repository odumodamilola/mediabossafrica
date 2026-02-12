
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">How It Works</span>
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none mb-10">
            TOOLS BUILT <br /> <span className="text-brand-magenta italic">FOR YOUR SUCCESS.</span>
          </h1>
          
          <div className="border-l-2 border-brand-magenta pl-8 mb-12 py-4">
            <p className="text-white/70 text-lg font-medium italic leading-relaxed max-w-2xl">
              Mediaboss Africa makes it easy to grow your brand. We help you post on every social platform, connect with the best brands, and produce pro-quality videos that get noticed.
            </p>
          </div>
          
          <p className="text-white/50 text-2xl font-light leading-relaxed">
            Our tools are built specifically to solve the biggest challenges creators face today.
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
              className="glass-morphism p-12 rounded-[40px] group hover:bg-white/5 transition-all bento-shadow"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="px-4 py-1.5 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 text-[10px] font-black uppercase text-brand-magenta tracking-widest">
                  {feature.category}
                </span>
                <span className="text-4xl font-display font-black text-white/20 group-hover:text-brand-magenta/40 transition-colors">
                  {feature.metric}
                </span>
              </div>
              <h3 className="text-3xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-white/40 text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
