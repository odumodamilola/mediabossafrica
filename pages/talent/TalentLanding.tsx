import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  CheckCircle2, 
  Trophy, 
  Globe, 
  Video, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Layout,
  Instagram,
  Twitter,
  Youtube,
  Users
} from 'lucide-react';
import { TRUSTED_BRANDS } from '../../constants';

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[32px] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 transition-all shadow-xl dark:shadow-none"
  >
    <div className="w-12 h-12 bg-brand-magenta/10 rounded-2xl flex items-center justify-center text-brand-magenta mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-display font-black mb-4 uppercase tracking-tight text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Step: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex gap-6 items-start">
    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-magenta text-white font-display font-black flex items-center justify-center text-xl shadow-[0_10px_30px_rgba(255,0,160,0.3)]">
      {number}
    </div>
    <div className="pt-2">
      <h4 className="text-lg font-display font-black mb-2 uppercase tracking-tight text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-500 dark:text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const TalentLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-brand-deep transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-magenta/30 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/20 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-magenta text-[11px] font-black tracking-[0.5em] uppercase mb-8 block"
            >
              The Future of African Influence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-9xl font-display font-black mb-10 leading-tight tracking-tighter text-gray-900 dark:text-white"
            >
              JOIN THE <br /> <span className="text-brand-magenta italic text-glow">ELITE.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-white/50 text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Mediaboss Africa is more than an agency. We are an ecosystem for creators who want to scale, professionalize, and dominate the global stage.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <button 
                onClick={() => navigate('/talent/apply')}
                className="px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Apply for Roster <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#how-it-works"
                className="px-12 py-6 border border-gray-200 dark:border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-gray-900 dark:text-white flex items-center justify-center gap-3"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-12">Building with world-class brands</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {TRUSTED_BRANDS.slice(0, 5).map((brand, i) => (
              <img key={i} src={brand.logo} alt={brand.name} className={`h-8 md:h-12 w-auto object-contain ${brand.className || ''}`} loading="lazy" decoding="async" />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 uppercase tracking-tight text-gray-900 dark:text-white">Why Mediaboss?</h2>
            <p className="text-gray-500 dark:text-white/40 text-lg max-w-2xl mx-auto font-light">We handle the business so you can focus on the art.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Globe className="w-6 h-6" />}
              title="Global Brand Deals"
              description="Direct access to multinational brand partnerships and global campaign budgets that standard creators can't reach."
            />
            <BenefitCard 
              icon={<Video className="w-6 h-6" />}
              title="Elite Production"
              description="Free access to our professional studios in Lagos, with world-class editing and creative direction at your service."
            />
            <BenefitCard 
              icon={<ShieldCheck className="w-6 h-6" />}
              title="Legal & Financial"
              description="We handle contract negotiations, legal protection, invoicing, and tax management so you never get underpaid."
            />
            <BenefitCard 
              icon={<Zap className="w-6 h-6" />}
              title="Career Strategy"
              description="Personalized 360-degree management to help you evolve from an 'influencer' into a global media brand."
            />
            <BenefitCard 
              icon={<TrendingUp className="w-6 h-6" />}
              title="Data & Growth"
              description="Deep analytics and insight-led strategies to help you hack growth and retain high-value audiences."
            />
            <BenefitCard 
              icon={<Trophy className="w-6 h-6" />}
              title="Exclusive Network"
              description="Be part of an elite inner circle of Africa's most influential voices for collaboration and community."
            />
          </div>
        </div>
      </section>

      {/* Who it's for & Checklist */}
      <section className="py-32 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-black mb-10 uppercase tracking-tight text-gray-900 dark:text-white leading-tight">
                WHO WE ARE <br /> <span className="text-brand-magenta">LOOKING FOR.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-magenta flex-shrink-0" />
                  <p className="text-gray-600 dark:text-white/60 text-lg leading-relaxed font-light">
                    <strong className="text-gray-900 dark:text-white font-bold">The Visionary:</strong> Creators who think long-term and want to build a lasting legacy in African media.
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-magenta flex-shrink-0" />
                  <p className="text-gray-600 dark:text-white/60 text-lg leading-relaxed font-light">
                    <strong className="text-gray-900 dark:text-white font-bold">The Specialist:</strong> Authorities in Niche sectors (Fintech, Fashion, Tech, Lifestyle, Professional services).
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-magenta flex-shrink-0" />
                  <p className="text-gray-600 dark:text-white/60 text-lg leading-relaxed font-light">
                    <strong className="text-gray-900 dark:text-white font-bold">The Hustler:</strong> Talent with a high-growth mindset and exceptional engagement rates.
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-morphism p-12 rounded-[48px] border border-gray-200 dark:border-white/10 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-8">
                <Layout className="w-12 h-12 text-brand-magenta opacity-20" />
              </div>
              <h3 className="text-2xl font-display font-black mb-8 uppercase tracking-tight text-gray-900 dark:text-white">What you'll need</h3>
              <ul className="space-y-5">
                {[
                  "Active platform links (Instagram, TikTok, or YouTube)",
                  "Recent engagement data (Screenshot or link)",
                  "A clear niche or area of expertise",
                  "A short 'Why Mediaboss' pitch",
                  "High-quality content portfolio examples"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-600 dark:text-white/60 font-medium">
                    <div className="w-2 h-2 rounded-full bg-brand-magenta" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/talent/apply')}
                className="w-full mt-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Start Your Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 uppercase tracking-tight text-gray-900 dark:text-white">The Process</h2>
            <p className="text-gray-500 dark:text-white/40 text-lg max-w-2xl mx-auto font-light">A seamless path to professional representation.</p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
            <Step 
              number="01" 
              title="Apply Online" 
              description="Fill out our premium intake form with your platform data and career goals. Takes about 2 minutes."
            />
            <Step 
              number="02" 
              title="Portfolio Review" 
              description="Our talent scouts analyze your engagement, niche authority, and content quality."
            />
            <Step 
              number="03" 
              title="Strategic Interview" 
              description="We invite selected talent for a session to discuss 360-degree management and career goals."
            />
            <Step 
              number="04" 
              title="Onboarding" 
              description="Once signed, you get immediate access to our legal, production, and brand deal networks."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Block */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="bg-brand-magenta rounded-[64px] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(255,0,160,0.5)]">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-accent blur-[120px] rounded-full" />
            </div>
            
            <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-10 leading-none tracking-tighter relative z-10">
              READY TO BE <br /> <span className="italic">LEGENDARY?</span>
            </h2>
            <p className="text-white/80 text-xl max-w-xl mx-auto mb-16 font-light relative z-10">
              Our roster is limited to ensure high-velocity growth for every creator we sign. Don't wait.
            </p>
            <button 
              onClick={() => navigate('/talent/apply')}
              className="relative z-10 px-16 py-8 bg-white text-brand-magenta rounded-[32px] font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Submit Your Profile
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentLanding;
