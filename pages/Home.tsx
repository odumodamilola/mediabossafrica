
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

      {/* Lagos Positioning — Geographic authority + real metrics */}
      <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-gray-50/50 dark:bg-brand-void/50 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 md:gap-20">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -20% 0px" }}
              className="flex-1"
            >
              <motion.span variants={itemVariants} className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4 sm:mb-6 block">
                Headquarters: Lagos, Nigeria
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 sm:mb-8 text-gray-900 dark:text-white transition-colors">
                Rooted in <span className="text-brand-magenta italic">Lagos.</span> <br />
                Built for the world.
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-600 dark:text-white/50 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
                Operations: Africa | UK | US (Remote Capabilities)
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-6 sm:gap-8 mt-12">
                <div className="group">
                  <div className="text-xl sm:text-2xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">Strategic Campaigns</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest mt-1">Data-driven performance</div>
                </div>
                <div className="group border-l border-gray-200 dark:border-white/10 pl-6 sm:pl-8">
                  <div className="text-xl sm:text-2xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">Brand Endorsements</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest mt-1">Talent matching</div>
                </div>
                <div className="group border-l border-gray-200 dark:border-white/10 pl-6 sm:pl-8">
                  <div className="text-xl sm:text-2xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">Content Production</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest mt-1">The Mediaboss Studio</div>
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
                src="https://images.unsplash.com/photo-1618828665347-d870c38c95c7?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mediaboss Lagos studio"
                className="relative z-10 rounded-3xl sm:rounded-[40px] md:rounded-[48px] border border-gray-200/20 dark:border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>



      <Services onNavigate={onNavigate} />
      <Ecosystem onNavigate={onNavigate} />

      {/* Final CTA — Confident, mature, not aggressive */}
      <section className="py-16 sm:py-24 md:py-32 bg-gray-50 dark:bg-brand-void border-y border-gray-200/20 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-gray-900 dark:text-white transition-colors">
              Ready to <span className="text-brand-magenta italic">grow?</span>
            </h3>
            <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light mt-2 sm:mt-3">
              Whether you're a brand looking to scale influence, a talent ready to build legacy, or a partner seeking creative excellence, Mediaboss Africa delivers solutions that move culture and drive results.
            </p>
          </motion.div>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('talent-form')}
              className="w-full md:w-auto px-12 sm:px-16 py-6 sm:py-7 bg-brand-magenta rounded-2xl sm:rounded-3xl font-black text-sm uppercase tracking-[0.2em] text-white shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] transition-all min-h-[48px]"
            >
              Book a Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('talent')}
              className="w-full md:w-auto px-12 sm:px-16 py-6 sm:py-7 border border-gray-300 dark:border-white/15 rounded-2xl sm:rounded-3xl font-black text-sm uppercase tracking-[0.2em] text-gray-900 dark:text-white transition-all min-h-[48px]"
            >
              Join as Talent
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
