
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Apply: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <span className="text-brand-magenta text-[11px] font-black tracking-[0.5em] uppercase mb-6 block">Elite Representation</span>
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-tight tracking-tighter">
            JOIN THE <br /> <span className="text-brand-magenta italic text-glow">ROSTER.</span>
          </h1>
          <p className="text-white/40 text-xl font-light max-w-2xl mx-auto">
            We don't manage thousands. We engineer dozens. If you're ready to transition from creator to legend, we're ready to talk.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-morphism p-12 md:p-20 rounded-[64px] shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-brand-magenta rounded-full mx-auto flex items-center justify-center text-white text-4xl mb-10 shadow-[0_0_30px_rgba(255,0,160,0.4)]">✓</div>
                <h3 className="text-4xl font-display font-black mb-6 uppercase tracking-tight">Application Received</h3>
                <p className="text-white/50 text-xl mb-12">Our A&R team will review your content and strategy within 72 hours.</p>
                <button 
                  onClick={() => window.location.hash = 'home'}
                  className="px-10 py-5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Return Home
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Stage Name / Full Name</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-brand-magenta outline-none transition-all placeholder:text-white/10" placeholder="e.g. Tunde Legend" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Primary Platform Link</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-brand-magenta outline-none transition-all placeholder:text-white/10" placeholder="instagram.com/username" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Current Follower Count</label>
                    <select required className="w-full bg-brand-deep border border-white/10 rounded-2xl px-8 py-5 focus:border-brand-magenta outline-none transition-all appearance-none">
                      <option>10k - 50k</option>
                      <option>50k - 200k</option>
                      <option>200k - 1M</option>
                      <option>1M+</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Primary Niche</label>
                    <select required className="w-full bg-brand-deep border border-white/10 rounded-2xl px-8 py-5 focus:border-brand-magenta outline-none transition-all appearance-none">
                      <option>Lifestyle & Tech</option>
                      <option>Beauty & Fashion</option>
                      <option>Entertainment & Music</option>
                      <option>Educational / Professional</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Why Mediaboss Africa?</label>
                  <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-brand-magenta outline-none transition-all placeholder:text-white/10" placeholder="What is your ultimate career goal?" />
                </div>

                <button 
                  disabled={formState === 'submitting'}
                  className="w-full py-8 bg-brand-magenta rounded-3xl font-black text-lg uppercase tracking-widest shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Processing Application...' : 'Submit Application'}
                </button>
              </form>
            )}
          </AnimatePresence>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-magenta/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 blur-[120px] pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
