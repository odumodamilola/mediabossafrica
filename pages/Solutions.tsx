import React from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Megaphone, Target, Users2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Services from '../components/Services';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const Solutions: React.FC = () => {
  const navigate = useNavigate();
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
            Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: smoothEase, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white transition-colors"
          >
            SERVICES WE <br />
            <span className="text-brand-magenta italic">RENDER.</span>
          </motion.h1>
        </div>

        <div className="mt-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-8 block"
          >
            Core Business Offerings
          </motion.span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'digital-marketing', label: 'Digital Marketing', icon: Megaphone, desc: 'Influencer & Event Marketing', href: '/digital-marketing' },
              { id: 'pr', label: 'Public Relations', icon: Target, desc: 'Strategic Communications', href: '/public-relations' },
              { id: 'talent', label: 'Talent Management', icon: Users2, desc: 'Representation & Growth', href: '/talent-management' },
              { id: 'content', label: 'Content Production', icon: Clapperboard, desc: 'Studio & Digital Storytelling', href: '/content-production' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: smoothEase }}
                  className="group relative overflow-hidden rounded-[32px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:scale-[1.02] transition-all cursor-pointer"
                  onClick={() => navigate(item.href)}
                >
                  <div className="block relative z-10">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-magenta/10 text-brand-magenta group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-display font-black text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-white/30 text-xs font-light">
                      {item.desc}
                    </p>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-white/20 group-hover:text-brand-magenta transition-colors">
                      Explore Section
                    </p>
                  </div>
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
