import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users2, 
  Search, 
  TrendingUp, 
  BarChart, 
  Compass, 
  Award, 
  Briefcase, 
  Heart,
  Star,
  Zap,
  Globe,
  Film,
  Building2,
  CheckCircle2
} from 'lucide-react';
import TrustSection from '../components/TrustSection';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const TALENT_PILLARS = [
  {
    title: 'Talent Acquisition',
    icon: Search,
    desc: 'Strategic scouting and recruitment of elite creators and skilled individuals with high potential.',
    highlights: ['Influencer scouting', 'Skill identification', 'Market matching', 'Vetting & Selection']
  },
  {
    title: 'Talent Development',
    icon: TrendingUp,
    desc: 'Comprehensive growth infrastructure through professional coaching, mentorship, and skill scaling.',
    highlights: ['Performance coaching', 'Skill improvement', 'Creative mentorship', 'Resource access']
  },
  {
    title: 'Performance Management',
    icon: BarChart,
    desc: 'Data-driven tracking and evaluation to ensure consistent excellence and objective fulfillment.',
    highlights: ['Goal setting', 'Progress tracking', 'Results evaluation', 'KPI optimization']
  },
  {
    title: 'Career Planning',
    icon: Compass,
    desc: 'Long-term architectural support to define direction and secure high-velocity career growth.',
    highlights: ['Direction strategy', 'Brand positioning', 'Promotion planning', 'Legacy building']
  },
  {
    title: 'Branding & Positioning',
    icon: Award,
    desc: 'Shaping public perception and crafting an authentic personal brand identity that scales.',
    highlights: ['Identity design', 'Market perception', 'Publicity strategy', 'Niche authority']
  },
  {
    title: 'Contract & Deal Management',
    icon: Briefcase,
    desc: 'Expert negotiation and legal management for high-value brand partnerships and collaborations.',
    highlights: ['Partnership strategy', 'Deal negotiation', 'Legal agreements', 'Financial management']
  },
  {
    title: 'Retention Strategy',
    icon: Heart,
    desc: 'Maintaining talent satisfaction and loyalty through institutional support and sustainable growth.',
    highlights: ['Crisis support', 'Long-term incentives', 'Conflict resolution', 'Talent welfare']
  },
  {
    title: 'Elite Management',
    icon: Star,
    desc: '360-degree representation for those at the pinnacle of their respective industries.',
    highlights: ['Global representation', 'Exclusive network', 'Direct brand access', 'Personalized support']
  }
];

const TalentManagement: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-500">
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-20 dark:opacity-10 grayscale" 
             alt="Talent background"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-black via-white/80 dark:via-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-brand-magenta text-white mb-10 shadow-xl shadow-brand-magenta/20"
            >
              <Star className="w-4 h-4 fill-white" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scaling Human Capital</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: smoothEase }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.85] text-gray-900 dark:text-white mb-8"
            >
              TALENT <br />
              <span className="text-brand-magenta italic">MANAGEMENT.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl sm:text-2xl text-gray-600 dark:text-white/70 font-light max-w-2xl leading-relaxed mb-12"
            >
              Talent is the ultimate business asset. We find, develop, and retain the skilled elite to build legacies and achieve unprecedented success.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-6"
            >
               <button className="px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                 Apply for Roster
               </button>
               <div className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <div className="text-2xl font-display font-black text-gray-900 dark:text-white">500M+</div>
                  <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Combined Reach</div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-brand-void/50 border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
              <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Ecosystems of Influence</span>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">Where we operate.</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Entertainment', 
                  icon: Film, 
                  desc: 'Managing musicians, actors, and artists to secure shows, deals, and global promotions.' 
                },
                { 
                  title: 'Corporate World', 
                  icon: Building2, 
                  desc: 'Building high-performance workforces through strategic staff training and development.' 
                },
                { 
                  title: 'Digital Creator Space', 
                  icon: Globe, 
                  desc: 'Scaling TikTok and Instagram creators through brand deals, growth strategy, and scheduling.' 
                }
              ].map((sector, i) => (
                <motion.div
                  key={sector.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-[48px] bg-white dark:bg-black border border-gray-100 dark:border-white/5 shadow-xl hover:border-brand-magenta/20 transition-all text-center"
                >
                   <div className="w-16 h-16 rounded-3xl bg-brand-magenta/10 flex items-center justify-center mx-auto mb-8">
                      <sector.icon className="w-8 h-8 text-brand-magenta" />
                   </div>
                   <h3 className="text-2xl font-display font-black mb-4 uppercase tracking-tight">{sector.title}</h3>
                   <p className="text-gray-500 dark:text-white/40 font-light leading-relaxed">{sector.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-24 sm:py-32 relative bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-20">
             <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">The 7-Pillar Framework</span>
             <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white uppercase tracking-tight">Professional <br /> Infrastructure.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TALENT_PILLARS.map((pillar, i) => (
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

      {/* Framework Section */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-brand-void/50 border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
              <div className="flex-1">
                 <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Our Approach</span>
                 <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase">
                    Beyond <br /> <span className="text-brand-magenta">Representation.</span>
                 </h2>
                 <p className="text-gray-600 dark:text-white/50 text-lg font-light leading-relaxed mb-10">
                    We provide a full-stack infrastructure for creators, including legal support, brand partnership strategy, and content optimization to ensure long-term career sustainability and global impact.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Global Reach', val: '500M+' },
                      { label: 'Brand Partners', val: '100+' },
                      { label: 'Growth Rate', val: '300%' },
                      { label: 'Excellence', val: '100%' }
                    ].map(stat => (
                      <div key={stat.label} className="p-6 bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm text-center">
                         <div className="text-2xl font-display font-black text-brand-magenta mb-1">{stat.val}</div>
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 relative">
                 <div className="aspect-square rounded-[64px] overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10">
                    <img 
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" 
                      alt="Talent Excellence" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                 </div>
                 <div className="absolute -bottom-8 -right-8 bg-brand-magenta p-8 rounded-3xl shadow-2xl">
                    <Zap className="w-8 h-8 text-white animate-pulse" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tight">
            Ready for your <br /> <span className="text-brand-magenta">Next Chapter?</span>
          </h2>
          <button className="group relative px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all overflow-hidden">
            <span className="relative z-10">Apply to Join the Roster</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default TalentManagement;