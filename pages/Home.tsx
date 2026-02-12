
import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import Services from '../components/Services';
import Ecosystem from '../components/Ecosystem';
import { PageType } from '../types';

interface HomeProps {
  onNavigate: (page: PageType) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const smoothEasing = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: smoothEasing } }
  };

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <TrustSection />
      
      <section className="py-32 relative overflow-hidden bg-brand-void/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
              className="flex-1"
            >
              <motion.span variants={itemVariants} className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
                Lagos Infrastructure
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-display font-black leading-tight mb-8">
                ROOTED IN <span className="text-brand-magenta italic">LAGOS.</span> <br />
                BUILT FOR THE WORLD.
              </motion.h2>
              <motion.p variants={itemVariants} className="text-white/50 text-xl font-light leading-relaxed mb-10">
                From our state-of-the-art studio in Lekki to our strategy hub in London, we provide the physical and digital infrastructure African creators need to dominate global charts.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap gap-8">
                <div className="group">
                  <div className="text-3xl font-display font-black text-white group-hover:text-brand-magenta transition-colors">500M+</div>
                  <div className="text-[10px] font-black uppercase text-white/30 tracking-widest">Naija Reach</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-display font-black text-white group-hover:text-brand-magenta transition-colors">12+</div>
                  <div className="text-[10px] font-black uppercase text-white/30 tracking-widest">Global Partners</div>
                </div>
                <div className="group">
                  <div className="text-3xl font-display font-black text-white group-hover:text-brand-magenta transition-colors">4K</div>
                  <div className="text-[10px] font-black uppercase text-white/30 tracking-widest">Cinema Native</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: smoothEasing }}
              viewport={{ once: true, margin: "-10%" }}
              className="flex-1 relative"
            >
               <div className="absolute inset-0 bg-brand-magenta/10 blur-[100px] rounded-full" />
               <img 
                 src="https://images.unsplash.com/photo-1541535881962-e6686230e0c1?q=80&w=800" 
                 alt="Lagos Creative Hub" 
                 className="relative z-10 rounded-[48px] border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
               />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-64 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              className="text-center"
            >
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.9 },
                  visible: { opacity: 0.05, y: 0, scale: 1, transition: { duration: 2, ease: smoothEasing } }
                }}
                className="text-[10vw] md:text-[8rem] font-display font-black leading-[0.8] tracking-[-0.04em] mb-20 text-white uppercase select-none"
              >
                Future <br /> Proof.
              </motion.h2>
              
              <div className="relative mt-[-120px] z-10">
                <motion.p variants={itemVariants} className="max-w-4xl mx-auto text-2xl md:text-5xl font-display font-light leading-[1.2] text-white/90 mb-16 px-4">
                  "Legacy is not built on <span className="text-brand-magenta italic">vibe</span>. It's built on <span className="underline decoration-brand-magenta/40 underline-offset-8">infrastructure</span>, data-driven decisions, and relentless cultural output."
                </motion.p>
                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('features')}
                  className="px-12 py-6 bg-white text-brand-deep rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl transition-all"
                >
                  Our Architecture
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Services onNavigate={onNavigate} />
      <Ecosystem onNavigate={onNavigate} />
      
      <section className="py-32 bg-brand-void border-y border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter"
          >
            READY FOR <span className="text-brand-magenta italic">DOMINANCE?</span>
          </motion.h3>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('contact')}
            className="w-full md:w-auto px-16 py-8 bg-brand-magenta rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] transition-all"
          >
            Apply Now
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default Home;
