
import React from 'react';
import { motion } from 'framer-motion';
import { TRUSTED_BRANDS } from '../constants';

const TrustSection: React.FC = () => {
  return (
    <section className="py-24 border-y border-white/5 bg-brand-deep/20 relative">
      <div className="container mx-auto px-6">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-white/30 text-[10px] font-black uppercase tracking-[0.5em] mb-16"
        >
          Strategically Aligned with Global Market Leaders
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 lg:gap-x-24">
          {TRUSTED_BRANDS.map((brand, i) => (
            <motion.div 
              key={brand}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1, color: '#ff00a0' }}
              className="text-2xl md:text-3xl font-display font-black tracking-[-0.05em] text-white/30 hover:text-brand-magenta transition-all cursor-pointer select-none"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-magenta/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-magenta/10 to-transparent" />
    </section>
  );
};

export default TrustSection;
