
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Let's Connect</span>
            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-none">START YOUR <br /> <span className="text-brand-magenta italic">JOURNEY.</span></h1>
            <p className="text-white/40 text-2xl font-light mb-12 leading-relaxed">
              We're looking for talented creators who want to build a lasting legacy. Ready to get started? Send us a message.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-3xl glass-morphism flex items-center justify-center text-brand-magenta">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="text-white/30 text-xs font-black uppercase tracking-widest mb-1">Email Us</h4>
                  <p className="text-xl font-bold">hq@mediabossafrica.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-3xl glass-morphism flex items-center justify-center text-brand-magenta">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-white/30 text-xs font-black uppercase tracking-widest mb-1">Visit Us</h4>
                  <p className="text-xl font-bold">Lagos | London | Remote</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-morphism p-12 md:p-16 rounded-[64px] relative bento-shadow min-h-[500px] flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-brand-magenta rounded-full mx-auto flex items-center justify-center text-white text-4xl">✓</div>
                  <h3 className="text-3xl font-display font-black">MESSAGE RECEIVED!</h3>
                  <p className="text-white/40 text-lg">Thanks for reaching out! Our team will review your profile and get back to you within 48 hours.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-brand-magenta font-black uppercase tracking-widest text-xs"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8" 
                  onSubmit={handleSubmit}
                  aria-label="Contact Form"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Your Name</label>
                      <input required id="name" type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-magenta outline-none transition-colors" placeholder="e.g. Damilola Cole" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Email Address</label>
                      <input required id="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-magenta outline-none transition-colors" placeholder="e.g. cole@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">What are you looking for?</label>
                    <select required id="category" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-magenta outline-none transition-colors appearance-none">
                      <option value="talent" className="bg-brand-deep">I'm a Creator / Talent</option>
                      <option value="brand" className="bg-brand-deep">I'm a Brand / Business</option>
                      <option value="media" className="bg-brand-deep">Media Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Your Message</label>
                    <textarea required id="message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-brand-magenta outline-none transition-colors" placeholder="Tell us a little bit about yourself..."></textarea>
                  </div>
                  <button 
                    disabled={formState === 'submitting'}
                    className="w-full bg-brand-magenta py-6 rounded-3xl text-xl font-black shadow-[0_20px_40px_-10px_rgba(255,0,160,0.5)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                  >
                    {formState === 'submitting' ? 'SENDING...' : 'Send Message'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
