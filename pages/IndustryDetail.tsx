import React from 'react';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../constants';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

type IndustryProfile = {
  summary: string;
  focus: string[];
};

const INDUSTRY_PROFILES: Record<string, IndustryProfile> = {
  'Fashion & Lifestyle': {
    summary:
      'In fashion and lifestyle, we build creator-led campaigns that keep the brand premium while driving daily relevance.',
    focus: ['Influencer Marketing & Campaigns', 'Brand Partnerships & Endorsements', 'Social Media Content Creation'],
  },
  'Beauty & Skincare': {
    summary:
      'In beauty and skincare, we focus on trust-first storytelling, creator education, and content that drives repeat purchase.',
    focus: ['Influencer Marketing & Campaigns', 'Campaign Strategy, Media Planning & Analytics', 'Branded Content & Commercial Shoots'],
  },
  'Tech & Fintech': {
    summary:
      'In tech and fintech, we simplify complex products into clear, conversion-focused stories across short-form and long-form media.',
    focus: ['Campaign Strategy, Media Planning & Analytics', 'Influencer Marketing & Campaigns', 'Video Production (Short-form & Long-form)'],
  },
  'Food & Beverage': {
    summary:
      'In food and beverage, we use culture-led creator content and local moments to increase trial, visibility, and loyalty.',
    focus: ['Brand Partnerships & Endorsements', 'Influencer Marketing & Campaigns', 'Photography & Creative Direction'],
  },
  'Entertainment & Music': {
    summary:
      'In entertainment and music, we amplify releases and personalities with high-volume creative and strategic talent activations.',
    focus: ['Talent Management & Development', 'Show & Digital Series Development', 'Editing, Motion Graphics & Post-Production'],
  },
  'Real Estate': {
    summary:
      'In real estate, we turn listings and projects into strong visual stories that attract quality buyers and partners.',
    focus: ['Video Production (Short-form & Long-form)', 'Campaign Strategy, Media Planning & Analytics', 'Brand Partnerships & Endorsements'],
  },
  'Events & Experiences': {
    summary:
      'In events and experiences, we design pre-event buzz, live visibility, and post-event content cycles for lasting impact.',
    focus: ['Influencer Marketing & Campaigns', 'Branded Content & Commercial Shoots', 'Podcast Production'],
  },
};

const IndustryDetail: React.FC = () => {
  const { industrySlug } = useParams();

  const industry = useMemo(
    () => INDUSTRIES.find((item) => toSlug(item.name) === industrySlug),
    [industrySlug]
  );
  const profile = industry ? INDUSTRY_PROFILES[industry.name] : null;

  if (!industry) {
    return (
      <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-gray-900 dark:text-white">
            Industries We Serve
          </h1>
          <p className="mt-4 sm:mt-5 text-gray-600 dark:text-white/60">
            Industry profile not found.
          </p>
          <Link
            to="/service"
            className="mt-6 sm:mt-8 inline-flex rounded-xl sm:rounded-2xl bg-brand-magenta px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-white"
          >
            Back to Service
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="overflow-hidden rounded-3xl sm:rounded-[44px] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-white/5"
        >
          <div className="relative h-[18rem] sm:h-[30rem] lg:h-[36rem]">
            <img
              src={industry.image}
              alt={industry.name}
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
              <p className="text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-[0.3em] text-white/80">
                Industries We Serve
              </p>
              <h1 className="mt-2 sm:mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.95] tracking-tighter">
                {industry.name}
              </h1>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl sm:rounded-[32px] border border-gray-200 bg-white p-6 sm:p-8 md:p-10 dark:border-white/10 dark:bg-white/5 lg:col-span-2"
          >
            <h2 className="text-xl sm:text-2xl font-display font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Service Focus
            </h2>
            <p className="mt-4 max-w-4xl text-gray-600 dark:text-white/60 text-base sm:text-lg lg:text-xl font-light leading-relaxed">
              {profile?.summary}
            </p>
            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile?.focus.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-200 dark:border-white/10 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-white/75 bg-gray-50 dark:bg-white/5 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        <div className="mt-8 sm:mt-10">
          <Link
            to="/service"
            className="inline-flex rounded-xl sm:rounded-2xl border border-gray-300 dark:border-white/20 px-6 py-3 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-gray-900 dark:text-white transition-all hover:border-brand-magenta hover:text-brand-magenta"
          >
            Back to Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndustryDetail;
