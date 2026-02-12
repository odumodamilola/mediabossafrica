
import React from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../constants';

const Solutions: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Who We Help</span>
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none mb-10">
            STRATEGIES FOR <br /> <span className="text-white/20 italic">EVERY CREATOR.</span>
          </h1>
          <p className="text-white/50 text-2xl font-light leading-relaxed">
            We understand the unique challenges of different industries. We help you find the right audience and the right brands for your specific niche.
          </p>
        </div>

        <div className="space-y-32">
          {INDUSTRIES.map((industry, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-20 items-center`}
            >
              <div className="flex-1 aspect-square rounded-[64px] overflow-hidden bento-shadow">
                <img src={industry.image} alt={`${industry.name} content example`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="flex-1 space-y-8">
                <span className="text-brand-magenta font-black text-xs tracking-widest uppercase">Expert Help</span>
                <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter">{industry.name}</h2>
                <p className="text-white/50 text-xl font-light leading-relaxed">
                  We help creators in the {industry.name.toLowerCase()} space build a professional brand that companies want to work with. Our team knows exactly what fans in this market are looking for.
                </p>
                <div className="pt-8">
                  <button className="px-10 py-5 rounded-2xl glass-morphism border border-brand-magenta/30 text-brand-magenta font-black text-xs uppercase tracking-widest hover:bg-brand-magenta hover:text-white transition-all">
                    How We Help This Sector
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
