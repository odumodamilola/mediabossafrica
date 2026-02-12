
import React from 'react';
import { motion } from 'framer-motion';
import { RESOURCES } from '../constants';

const Resources: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none mb-6">INTELLIGENCE <br /> <span className="text-white/20 italic">HUB.</span></h1>
            <p className="text-white/50 text-xl font-light">Data, insights, and strategy for the African creative frontier.</p>
          </div>
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="Search Insight..." 
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm w-64 focus:border-brand-magenta outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESOURCES.map((res, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-[32px] overflow-hidden mb-6 relative">
                <img 
                  src={res.image} 
                  alt={res.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-brand-deep/80 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full text-brand-magenta border border-brand-magenta/30">
                    {res.type}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand-magenta transition-colors leading-tight">{res.title}</h3>
              <p className="text-white/30 text-xs font-black uppercase tracking-widest">{res.readTime}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
