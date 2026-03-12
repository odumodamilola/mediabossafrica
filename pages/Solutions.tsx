import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import { INDUSTRIES } from '../constants';

const smoothEase = [0.16, 1, 0.3, 1] as const;
const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const Solutions: React.FC = () => {
  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-4xl mb-16 sm:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-brand-magenta text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase mb-4 sm:mb-6 block"
          >
            Industries We Serve
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: smoothEase, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white transition-colors"
          >
            INDUSTRIES WE <br />
            <span className="text-brand-magenta italic">SERVE.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: smoothEase }}
              className="group relative overflow-hidden rounded-3xl sm:rounded-[40px] aspect-[4/5] sm:aspect-square bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none"
            >
              <Link to={`/service/${toSlug(industry.name)}`} className="block h-full w-full">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <h2 className="text-white font-display font-black text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight">
                    {industry.name}
                  </h2>
                  <p className="mt-2 sm:mt-3 text-white/80 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
                    Open industry page
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-8 block"
          >
            Specialized Solutions
          </motion.span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: '/influencer-marketing-nigeria', label: 'Influencer Marketing', icon: Megaphone },
              { href: '/talent-management-nigeria', label: 'Talent Management', icon: Users2 },
              { href: '/film-production-nigeria', label: 'Film Production', icon: Clapperboard },
              { href: '/event-marketing-nigeria', label: 'Event Marketing', icon: Target },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: smoothEase }}
                  className="group relative overflow-hidden rounded-[32px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:scale-[1.02] transition-all"
                >
                  <Link to={item.href} className="block relative z-10">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-magenta/10 text-brand-magenta group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-white/20">
                      Explore Service
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-20">
          <Services />
        </div>
      </div>
    </div>
  );
};

export default Solutions;
