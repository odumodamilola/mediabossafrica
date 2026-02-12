
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { PageType } from '../types';

interface ServicesProps {
  onNavigate?: (page: PageType) => void;
}

const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section id="services" className="py-64 relative overflow-hidden" aria-labelledby="services-title">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,160,0.05)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-40">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-brand-magenta text-[11px] font-black tracking-[0.6em] uppercase mb-8 block"
            >
              The Architecture of Success
            </motion.span>
            <h2 id="services-title" className="text-7xl md:text-9xl font-display font-black tracking-[-0.04em] leading-[0.8] mb-0">
              ENGINEERING <br />
              <span className="text-brand-magenta italic">LEGACY.</span>
            </h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 text-2xl font-light max-w-sm mb-4 leading-snug"
          >
            A high-fidelity ecosystem designed to capture cultural moments and transform them into global equity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 group relative overflow-hidden rounded-[56px] gradient-border min-h-[600px] flex flex-col justify-end p-14 lg:p-20 shadow-2xl"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-deep via-brand-deep/70 to-transparent transition-opacity group-hover:opacity-90" />
            <img 
              src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200" 
              alt="Elite Production" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[2.5s] z-[-1]"
            />
            
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl glass-morphism mb-10 flex items-center justify-center text-brand-magenta group-hover:scale-110 group-hover:bg-brand-magenta/10 transition-all duration-500">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-5xl lg:text-7xl font-display font-black mb-8 leading-none tracking-tight">{SERVICES[0].title}</h3>
              <p className="text-white/50 text-2xl font-light mb-12 max-w-xl leading-relaxed">{SERVICES[0].description}</p>
              <div className="flex flex-wrap gap-4">
                {SERVICES[0].items.map((item, i) => (
                  <span key={i} className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:border-brand-magenta/30 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-4 flex flex-col gap-8">
            {SERVICES.slice(1).map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 gradient-border rounded-[56px] p-12 group relative overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-brand-magenta/5 rounded-full blur-[80px] group-hover:bg-brand-magenta/20 transition-all duration-700" />
                <div>
                  <h4 className="text-3xl font-display font-black mb-6 group-hover:text-brand-magenta transition-colors duration-300">{service.title}</h4>
                  <p className="text-white/40 text-lg font-light leading-relaxed mb-10">{service.description}</p>
                </div>
                <button 
                  onClick={() => onNavigate?.('features')}
                  className="group/btn flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-brand-magenta mt-auto"
                >
                  <span>Explore Capabilities</span> 
                  <motion.div 
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-8 h-[1px] bg-brand-magenta"
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
