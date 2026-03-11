import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, Megaphone, Users2 } from 'lucide-react';
import { PageType } from '../types';

interface ServicesProps {
  onNavigate?: (page: PageType) => void;
}

const smoothEase = [0.16, 1, 0.3, 1] as const;

const CORE_SERVICES = [
  {
    id: 'influencer-marketing',
    title: 'Influencer Marketing & Campaigns',
    description:
      'Strategic influencer-led campaigns designed for reach, engagement, and conversion across Instagram, TikTok, YouTube, X (Twitter), and emerging platforms.',
    bullets: null,
  },
  {
    id: 'talent-management',
    title: 'Talent Management & Development',
    description: 'Comprehensive talent representation including:',
    bullets: [
      'Personal brand strategy',
      'Deal negotiation & brand endorsements',
      'Career growth and monetization',
      'Media training & positioning',
    ],
  },
  {
    id: 'brand-partnerships',
    title: 'Brand Partnerships & Endorsements',
    description: 'Matching brands with the right talents for:',
    bullets: ['Product launches', 'Brand ambassadorships', 'Event partnerships', 'Long-term collaborations'],
  },
  {
    id: 'campaign-strategy',
    title: 'Campaign Strategy, Media Planning & Analytics',
    description: 'Insight-led campaign development with performance tracking, reporting, and optimization.',
    bullets: null,
  },
];

const SERVICE_ICONS = [Megaphone, Users2, Briefcase, BarChart3];

const Services: React.FC<ServicesProps> = () => {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 relative overflow-hidden" aria-labelledby="services-title">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,160,0.05)_0%,_transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 sm:gap-12 mb-16 sm:mb-24 lg:mb-32">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-brand-magenta text-[11px] font-black tracking-[0.6em] uppercase mb-6 sm:mb-8 block"
            >
              Core Services
            </motion.span>
            <h2 id="services-title" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black tracking-[-0.03em] leading-[0.9] text-gray-900 dark:text-white transition-colors">
              Core Services
            </h2>
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-gray-600 dark:text-white/40 text-base sm:text-lg md:text-xl font-light max-w-md leading-relaxed">
            At Mediaboss Africa, we dont just create visibility - we build influence that converts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-12">
          {CORE_SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: smoothEase }}
              className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] p-8 sm:p-10 relative overflow-hidden shadow-sm dark:shadow-none flex flex-col hover:scale-[1.01] transition-transform xl:col-span-6"
            >
              <div className="absolute -right-8 -top-8 w-48 h-48 bg-brand-magenta/5 rounded-full blur-[80px] group-hover:bg-brand-magenta/15 transition-all duration-700" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-brand-magenta/30 font-display font-black text-5xl leading-none select-none">0{i + 1}</span>
                  {React.createElement(SERVICE_ICONS[i], {
                    className: 'h-5 w-5 text-brand-magenta',
                    'aria-hidden': true,
                  })}
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black mb-5 text-gray-900 dark:text-white group-hover:text-brand-magenta transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-white/50 text-base sm:text-lg leading-relaxed mb-5 transition-colors">{service.description}</p>

                {service.bullets && (
                  <ul className="space-y-3 mt-auto">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-magenta flex-shrink-0 mt-2" />
                        <span className="text-gray-700 dark:text-white/70 text-base transition-colors">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;