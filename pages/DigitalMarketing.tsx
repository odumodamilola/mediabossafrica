import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MousePointer2, 
  Share2, 
  FileText, 
  Mail, 
  Briefcase, 
  Users, 
  BarChart, 
  PieChart, 
  Smartphone, 
  ShoppingBag, 
  Settings2,
  Zap,
  ArrowRight
} from 'lucide-react';
import TrustSection from '../components/TrustSection';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const SERVICE_PILLARS = [
  {
    title: 'Search Engine Optimization (SEO)',
    icon: Search,
    desc: 'Making your website show up on Google Search without paying for ads.',
    details: ['Keyword research', 'On-page optimization', 'Technical SEO', 'Backlink building'],
    goal: 'Get free organic traffic'
  },
  {
    title: 'Pay-Per-Click Advertising (PPC)',
    icon: MousePointer2,
    desc: 'Paid ads where you’re charged per click for instant lead generation.',
    details: ['Google Ads', 'Facebook Ads', 'Display & Search ads', 'Video advertisements'],
    goal: 'Get instant traffic and leads'
  },
  {
    title: 'Social Media Marketing',
    icon: Share2,
    desc: 'Leveraging Instagram, TikTok, and LinkedIn to build awareness.',
    details: ['Content creation', 'Community engagement', 'Influencer collaborations', 'Paid promotions'],
    goal: 'Build brand awareness + audience'
  },
  {
    title: 'Content Marketing',
    icon: FileText,
    desc: 'Creating valuable content to educate, attract, and build trust.',
    details: ['Blog posts', 'YouTube videos', 'Infographics', 'Guides & eBooks'],
    goal: 'Educate, attract, and build trust'
  },
  {
    title: 'Email Marketing',
    icon: Mail,
    desc: 'Sending targeted messages directly to your users’ inboxes.',
    details: ['Newsletters', 'Promotions', 'Automated sequences', 'Mailchimp/ConvertKit'],
    goal: 'Nurture leads and increase conversions'
  },
  {
    title: 'Affiliate Marketing',
    icon: Briefcase,
    desc: 'Scale sales through strategic partnerships and commission models.',
    details: ['Blogger partnerships', 'Influencer referrals', 'Third-party networks', 'Performance tracking'],
    goal: 'Scale sales through partnerships'
  },
  {
    title: 'Influencer Marketing',
    icon: Users,
    desc: 'Partnering with authorities who already have your ideal audience.',
    details: ['Creator matching', 'Campaign management', 'Trust leveraging', 'Audience reach'],
    goal: 'Leverage trust + reach new audiences'
  },
  {
    title: 'Conversion Rate Optimization (CRO)',
    icon: BarChart,
    desc: 'Improving your site so more visitors take measurable action.',
    details: ['Better UI/UX', 'A/B testing', 'Landing page optimization', 'User flow analysis'],
    goal: 'Turn traffic into customers'
  },
  {
    title: 'Analytics & Data Tracking',
    icon: PieChart,
    desc: 'Tracking performance and making decisions based on real data.',
    details: ['Google Analytics', 'Heatmaps', 'User behavior tracking', 'Performance audits'],
    goal: 'Understand what’s working'
  },
  {
    title: 'Mobile Marketing',
    icon: Smartphone,
    desc: 'Reaching users where they spend most of their time: on phones.',
    details: ['SMS marketing', 'Push notifications', 'In-app ads', 'Mobile-first design'],
    goal: 'Engage users on mobile devices'
  },
  {
    title: 'E-commerce Marketing',
    icon: ShoppingBag,
    desc: 'Specialized strategies for online stores to drive sales.',
    details: ['Product ads', 'Retargeting', 'Cart abandonment emails', 'Shopify optimization'],
    goal: 'Drive and optimize online sales'
  },
  {
    title: 'Marketing Automation',
    icon: Settings2,
    desc: 'Using tools to automate repetitive tasks and scale efficiently.',
    details: ['Email sequences', 'Lead scoring', 'CRM systems', 'Workflow automation'],
    goal: 'Scale marketing efficiently'
  }
];

const DigitalMarketing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-500">
      {/* Unique Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-magenta/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-magenta/5 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 mb-8"
            >
              <Zap className="w-4 h-4 text-brand-magenta" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-magenta">Full-Stack Digital Growth</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.85] text-gray-900 dark:text-white mb-8"
            >
              DIGITAL <br />
              <span className="text-brand-magenta italic">MARKETING.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-white/60 font-light max-w-2xl mx-auto leading-relaxed mb-12"
            >
              From SEO to Automation, we deliver comprehensive digital strategies that dominate the African market and move culture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <button className="group relative px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all overflow-hidden">
                <span className="relative z-10">Growth Strategy Session</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 12 Pillars Grid */}
      <section className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-20">
             <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
             <h2 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400">Our Ecosystem</h2>
             <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-10 rounded-[40px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-brand-magenta/30 transition-all group flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-6 h-6 text-brand-magenta" />
                </div>
                <h3 className="text-xl font-display font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight leading-tight">{pillar.title}</h3>
                <p className="text-gray-500 dark:text-white/40 text-sm font-light leading-relaxed mb-6">{pillar.desc}</p>
                
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pillar.details.map(detail => (
                      <span key={detail} className="px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-white/40">{detail}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-brand-magenta text-[10px] font-black uppercase tracking-widest">
                    <span>Goal: {pillar.goal}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Big Picture Concept */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-brand-void/50 border-y border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">The Big Picture</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-gray-900 dark:text-white mb-10 tracking-tight">
                THE GROWTH <br /> <span className="text-brand-magenta">FUNNEL.</span>
              </h2>
              
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-brand-magenta via-brand-magenta/20 to-transparent" />
                {[
                  { step: 'Traffic + Attention', desc: 'Capturing eyeballs through SEO, PPC, and Social.' },
                  { step: 'Engagement', desc: 'Building trust through Content and Email Marketing.' },
                  { step: 'Conversion', desc: 'Turning visitors into customers through CRO and Affiliate.' },
                  { step: 'Retention', desc: 'Keeping them coming back through CRM and Automation.' }
                ].map((item, idx) => (
                  <div key={item.step} className="pl-12 relative group">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-black border border-brand-magenta flex items-center justify-center z-10 group-hover:bg-brand-magenta transition-colors">
                      <span className="text-[10px] font-black text-brand-magenta group-hover:text-white">{idx + 1}</span>
                    </div>
                    <h4 className="text-xl font-display font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight">{item.step}</h4>
                    <p className="text-gray-500 dark:text-white/40 text-sm font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-brand-magenta/10 blur-[120px] rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Marketing Analytics" 
                className="relative z-10 rounded-[64px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tight">
            Scale Your <br /> <span className="text-brand-magenta">Dominance.</span>
          </h2>
          <button className="group relative px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all overflow-hidden">
            <span className="relative z-10">Command the Feed</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketing;