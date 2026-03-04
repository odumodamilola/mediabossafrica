
import React from 'react';
import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../constants';
import { PageType } from '../types';

interface PricingProps {
  onNavigate: (page: PageType) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.9] mb-6 sm:mb-8 text-gray-900 dark:text-white transition-colors">PARTNERSHIP</h1>
          <p className="text-gray-500 dark:text-white/50 text-lg sm:text-xl font-light transition-colors px-4">Transparent models for high-velocity growth. We win when you win.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 sm:p-10 rounded-3xl sm:rounded-[48px] border flex flex-col transition-all duration-300 ${plan.recommended
                  ? 'bg-brand-magenta text-white border-brand-magenta shadow-[0_30px_60px_-15px_rgba(255,0,160,0.5)]'
                  : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white shadow-xl dark:shadow-none'
                }`}
            >
              <h3 className="text-xl sm:text-2xl font-display font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
              <div className="text-4xl sm:text-5xl font-display font-black mb-6">{plan.price}</div>
              <p className={`mb-8 sm:mb-10 text-sm ${plan.recommended ? 'text-white/80' : 'text-gray-500 dark:text-white/50'}`}>
                {plan.description}
              </p>

              <div className="flex-grow space-y-4 mb-10 sm:mb-12">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm font-semibold">
                    <svg className={`w-5 h-5 flex-shrink-0 ${plan.recommended ? 'text-white' : 'text-brand-magenta'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate(plan.name === 'Corporate' ? 'talent-form' : 'talent')}
                className={`w-full py-5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest transition-all ${plan.recommended
                    ? 'bg-white text-brand-deep hover:scale-105 shadow-xl'
                    : 'bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white'
                  }`}
              >
                {plan.name === 'Corporate' ? 'Book Consultation' : 'Join as Talent'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
