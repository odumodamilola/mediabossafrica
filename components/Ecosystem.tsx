
import React from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';

interface EcosystemProps {
  onNavigate?: (page: PageType) => void;
}

const Ecosystem: React.FC<EcosystemProps> = ({ onNavigate }) => {
  return (
    <section id="studio" className="py-48 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative bg-[#0d0113] border border-white/10 rounded-[64px] overflow-hidden p-10 lg:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden">
             <motion.div 
               animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
               transition={{ duration: 10, repeat: Infinity }}
               className="w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(255,0,160,0.15),transparent_70%)]"
             />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-brand-magenta font-black text-xs tracking-[0.5em] uppercase mb-8 block"
              >
                THE CREATIVE ENGINE
              </motion.span>
              <h2 className="text-6xl lg:text-8xl font-display font-black mb-10 leading-[0.8] tracking-tight">
                THE <br />
                <span className="text-brand-magenta italic">STUDIO.</span>
              </h2>
              <p className="text-2xl text-white/50 mb-14 font-light leading-relaxed max-w-xl">
                Mediaboss Studio is where vision meets high-fidelity execution. A full-service production powerhouse built for the 2026 digital landscape.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mb-16">
                 {[
                   { t: 'Cinema-Grade Video', d: 'Native 8K workflow for cinematic digital series.' },
                   { t: 'Spatial Audio', d: 'Immersive sound design for pods & commercials.' },
                   { t: 'Creative Direction', d: 'Bespoke visual identities and brand DNA.' },
                   { t: 'Post-Production', d: 'Advanced CGI, VFX, and rhythmic editing.' }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 10 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                   >
                     <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3 border-l-2 border-brand-magenta pl-4">{item.t}</h4>
                     <p className="text-white/30 text-sm font-light leading-relaxed pl-5">{item.d}</p>
                   </motion.div>
                 ))}
              </div>
              
              <button 
                onClick={() => onNavigate?.('work')}
                className="group relative px-12 py-6 bg-white text-brand-deep rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 shadow-2xl"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">Portfolio Access</span>
                <div className="absolute inset-0 bg-brand-magenta translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </button>
            </div>
            
            <div className="relative group perspective-[2000px]">
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative aspect-square md:aspect-video rounded-[48px] overflow-hidden shadow-[0_60px_100px_-20px_rgba(255,0,160,0.3)] bg-brand-deep border border-white/5"
              >
                <img 
                  src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200" 
                  alt="Production Floor" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 to-transparent flex items-center justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center pl-1 hover:bg-brand-magenta transition-all shadow-2xl"
                  >
                     <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ecosystem;
