
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
                Based in Lekki, Lagos
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-6 sm:mb-8 text-gray-900 dark:text-white transition-colors">
                Rooted in <span className="text-brand-magenta italic">Lagos.</span> <br />
                Built for the world.
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray-600 dark:text-white/50 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10 max-w-xl">
                From our production studio in Lekki to our brand partnerships across London and Dubai, we give Nigerian creators the infrastructure to compete globally.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-6 sm:gap-8">
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">500M+</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest">Combined reach</div>
                </div>
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">12+</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest">Brand partners</div>
                </div>
                <div className="group">
                  <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">60–90</div>
                  <div className="text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest">Days to first deal</div>
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
                src="https://i.ibb.co/mC1y1gZq/Snap-Insta-to-609936017-18066266552537287-3499075154829762202-n.jpg"
                alt="Mediaboss Lagos studio"
                className="relative z-10 rounded-3xl sm:rounded-[40px] md:rounded-[48px] border border-gray-200/20 dark:border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works — Process transparency */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              className="text-center"
            >
              <motion.span variants={itemVariants} className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4 sm:mb-6 block">
                How it works
              </motion.span>
              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-10 sm:mb-14 md:mb-16 text-gray-900 dark:text-white transition-colors">
                From application to <span className="text-brand-magenta italic">first deal.</span>
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-left">
                {[
                  {
                    step: '01',
                    title: 'Apply',
                    desc: 'Submit your profile and content samples. We review every application within 48 hours.'
                  },
                  {
                    step: '02',
                    title: 'Onboard',
                    desc: 'If accepted, we build your media kit, define your brand positioning, and connect you with our studio.'
                  },
                  {
                    step: '03',
                    title: 'Earn',
                    desc: 'We pitch you to brands, negotiate deals, and handle all contracts. Most creators land their first deal within 60–90 days.'
                  }
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="relative">
                    <span className="text-6xl sm:text-7xl md:text-8xl font-display font-black text-gray-100 dark:text-white/5 absolute -top-4 sm:-top-6 -left-2 select-none transition-colors">{item.step}</span>
                    <div className="relative z-10 pt-8 sm:pt-10">
                      <h3 className="text-xl sm:text-2xl font-display font-black mb-3 sm:mb-4 text-gray-900 dark:text-white transition-colors">{item.title}</h3>
                      <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              Commission-based. No upfront fees. We only earn when you earn.
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('contact')}
            className="w-full md:w-auto px-12 sm:px-16 py-6 sm:py-7 bg-brand-magenta rounded-2xl sm:rounded-3xl font-black text-sm uppercase tracking-[0.2em] text-white shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] transition-all min-h-[48px]"
          >
            Apply now
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default Home;
