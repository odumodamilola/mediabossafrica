
import React from 'react';
import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../constants';
import { PageType } from '../types';

interface PricingProps {
  onNavigate: (page: PageType) => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-8">PARTNERSHIP</h1>
          <p className="text-white/50 text-xl font-light">Transparent models for high-velocity growth. We win when you win.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[48px] border flex flex-col ${
                plan.recommended 
                  ? 'bg-brand-magenta text-white border-brand-magenta shadow-[0_30px_60px_-15px_rgba(255,0,160,0.5)]' 
                  : 'glass-morphism border-white/10'
              }`}
            >
              <h3 className="text-2xl font-display font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
              <div className="text-5xl font-display font-black mb-6">{plan.price}</div>
              <p className={`mb-10 text-sm ${plan.recommended ? 'text-white/80' : 'text-white/50'}`}>
                {plan.description}
              </p>
              
              <div className="flex-grow space-y-4 mb-12">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm font-semibold">
                    <svg className={`w-5 h-5 ${plan.recommended ? 'text-white' : 'text-brand-magenta'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onNavigate('apply')}
                className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  plan.recommended 
                    ? 'bg-white text-brand-deep hover:scale-105 shadow-xl' 
                    : 'bg-white/10 border border-white/10 hover:bg-white/20'
                }`}
              >
                Apply for Roster
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
