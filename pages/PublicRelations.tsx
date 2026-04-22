import React from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  Send, 
  ShieldCheck, 
  AlertCircle, 
  MessageSquare, 
  Calendar, 
  Users2, 
  Heart,
  Zap,
  Globe2,
  Quote
} from 'lucide-react';
import TrustSection from '../components/TrustSection';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const PR_PILLARS = [
  {
    title: 'Media Relations',
    icon: Newspaper,
    desc: 'Connecting with journalists and global media platforms to secure high-value earned coverage.',
    highlights: ['News articles', 'TV Interviews', 'Press features', 'Editorial placement']
  },
  {
    title: 'Press Releases',
    icon: Send,
    desc: 'Strategic announcements crafted for maximum media adoption and industry impact.',
    highlights: ['Product launches', 'Company updates', 'Event notices', 'Achievement alerts']
  },
  {
    title: 'Reputation Management',
    icon: ShieldCheck,
    desc: 'Active monitoring and shaping of how your brand is perceived across all public touchpoints.',
    highlights: ['Sentiment analysis', 'Image building', 'Criticism response', 'Narrative control']
  },
  {
    title: 'Crisis Management',
    icon: AlertCircle,
    desc: 'Rapid-response strategies to mitigate damage and rebuild trust during unforeseen events.',
    highlights: ['Damage control', 'Strategic statements', 'Risk assessment', 'Trust recovery']
  },
  {
    title: 'Corporate Communication',
    icon: MessageSquare,
    desc: 'Unified internal and external messaging that aligns with your corporate values and vision.',
    highlights: ['CEO messaging', 'Company policies', 'Public statements', 'Internal culture']
  },
  {
    title: 'Event PR',
    icon: Calendar,
    desc: 'Ensuring your physical and digital events command the attention of the media and public.',
    highlights: ['Conferences', 'Sponsorships', 'Red carpet management', 'Global launches']
  },
  {
    title: 'Celebrity Relations',
    icon: Users2,
    desc: 'Aligning with influential public figures to build credibility and long-term brand trust.',
    highlights: ['Public figure alignment', 'Endorsement PR', 'Association mapping', 'Authority building']
  },
  {
    title: 'Community Relations',
    icon: Heart,
    desc: 'Managing how your organization interacts with and impacts society through meaningful action.',
    highlights: ['CSR projects', 'Charity partnerships', 'Social responsibility', 'Community impact']
  }
];

const PublicRelations: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-500">
      {/* Editorial Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gray-50 dark:bg-brand-void/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: smoothEase }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 mb-8"
              >
                <Globe2 className="w-4 h-4 text-brand-magenta" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-magenta">Authority & Perception</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
                className="text-5xl sm:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] text-gray-900 dark:text-white mb-8"
              >
                PUBLIC <br />
                <span className="text-brand-magenta italic">RELATIONS.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg sm:text-xl text-gray-600 dark:text-white/60 font-light leading-relaxed mb-12"
              >
                PR is the art of managing what people think and say about you when you're not in the room. We don't just sell; we build trust, resonance, and enduring reputations.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <button className="px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-magenta dark:hover:bg-brand-magenta dark:hover:text-white transition-all shadow-xl">
                  Build Your Reputation
                </button>
              </motion.div>
            </div>
            
            <div className="relative hidden lg:block">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 1.4, ease: smoothEase }}
                 className="aspect-[4/5] rounded-[64px] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop" 
                   alt="PR Narrative Strategy" 
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 />
               </motion.div>
               <div className="absolute -bottom-12 -left-12 bg-white dark:bg-brand-deep p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5 max-w-[280px]">
                  <Quote className="w-8 h-8 text-brand-magenta mb-4" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight">The Core Philosophy</p>
                  <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed font-light">"Your brand is not what you say it is, it's what they say it is."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PR Pillars Grid */}
      <section className="py-24 sm:py-32 relative bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
             <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Strategic Disciplines</span>
             <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white uppercase tracking-tight">The Architecture <br /> of Trust.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PR_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-8 rounded-[40px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-brand-magenta/30 transition-all group flex flex-col h-full"
              >
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-5 h-5 text-brand-magenta" />
                </div>
                <h3 className="text-xl font-display font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight leading-tight">{pillar.title}</h3>
                <p className="text-gray-500 dark:text-white/40 text-xs font-light leading-relaxed mb-6 flex-1">{pillar.desc}</p>
                
                <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                  <ul className="space-y-2">
                    {pillar.highlights.map(item => (
                      <li key={item} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/20">
                        <div className="w-1 h-1 rounded-full bg-brand-magenta/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Contrast Section (PR vs Marketing) */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-brand-void/50 border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">
                TRUST OVER <br /> <span className="text-brand-magenta">TRANSACTIONS.</span>
              </h2>
              <p className="text-gray-600 dark:text-white/50 text-lg font-light leading-relaxed">
                While digital marketing focuses on the sale, PR focuses on the <span className="font-bold text-gray-900 dark:text-white">legacy</span>. We bridge the gap between commercial growth and public credibility, ensuring that when people talk about your brand, they talk about trust.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Credibility', val: '100%' },
                { label: 'Impact', val: 'Global' },
                { label: 'Voice', val: 'Resonant' },
                { label: 'Reach', val: 'Earned' }
              ].map(stat => (
                <div key={stat.label} className="p-8 bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
                  <div className="text-3xl font-display font-black text-brand-magenta mb-1">{stat.val}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tight">
            Protect Your <br /> <span className="text-brand-magenta">Identity.</span>
          </h2>
          <button className="group relative px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all overflow-hidden">
            <span className="relative z-10">Start a Conversation</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PublicRelations;