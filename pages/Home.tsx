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
  const smoothEasing = [0.16, 1, 0.3, 1] as const;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: smoothEasing } },
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem('newsletterEmail') as HTMLInputElement | null;
    const email = emailInput?.value?.trim();
    if (!email) return;

    window.location.href = `mailto:info@mediabossafrica.com?subject=${encodeURIComponent('Newsletter Subscription')}&body=${encodeURIComponent(`Please subscribe this email to the newsletter:\n${email}`)}`;
    form.reset();
  };

  return (
    <>
      <Hero onNavigate={onNavigate} />
      <TrustSection />

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
                Headquarters: Lagos, Nigeria
                <br />
                Operations: Africa | UK | US (Remote Capabilities)
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
                  <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">60-90</div>
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

      <section className="py-16 sm:py-24 md:py-28 bg-gray-50/50 dark:bg-brand-void/50 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8">
            <h3 className="text-3xl font-display font-black text-gray-900 dark:text-white">Vision</h3>
            <p className="mt-4 text-gray-700 dark:text-white/70 leading-relaxed">
              To become Africas most influential media ecosystem, shaping global conversations through talent, creativity, and culture.
            </p>
          </article>
          <article className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8">
            <h3 className="text-3xl font-display font-black text-gray-900 dark:text-white">Mission</h3>
            <p className="mt-4 text-gray-700 dark:text-white/70 leading-relaxed">
              To empower brands and creators to tell compelling stories, build strong communities, and achieve measurable growth through influence-led marketing and premium content production.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 bg-gray-50 dark:bg-brand-void border-y border-gray-200/20 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-gray-900 dark:text-white">Lets Work Together</h3>
          <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light">
            Whether youre a brand looking to scale influence, a talent ready to build legacy, or a partner seeking creative excellence, Mediaboss Africa delivers solutions that move culture and drive results.
          </p>
          <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light">Headquarters: Lagos, Nigeria</p>
          <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light">Operations: Africa | UK | US (Remote Capabilities)</p>
          <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light">Email: info@mediabossafrica.com</p>
          <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light">Instagram: @mediabossafrica</p>
          <p className="text-gray-600 dark:text-white/40 text-sm sm:text-base font-light">Studio Arm: The Mediaboss Studio</p>
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <button
              onClick={() => onNavigate('talent-form')}
              className="w-full md:w-auto px-12 sm:px-16 py-6 sm:py-7 bg-brand-magenta rounded-2xl sm:rounded-3xl font-black text-sm uppercase tracking-[0.2em] text-white shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] transition-all min-h-[48px]"
            >
              Lets Work Together
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white dark:bg-brand-deep transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-8 sm:p-10">
            <p className="text-brand-magenta text-[11px] font-black tracking-[0.4em] uppercase mb-4">Newsletter</p>
            <h3 className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white">Subscribe to our newsletter</h3>
            <p className="mt-4 text-gray-600 dark:text-white/50 text-sm sm:text-base">Get updates from Mediaboss Africa.</p>
            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="newsletterEmail"
                required
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-gray-300 dark:border-white/15 bg-white dark:bg-brand-void px-5 py-4 text-gray-900 dark:text-white outline-none focus:border-brand-magenta"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-2xl bg-brand-magenta px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
