import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Mic2, 
  MousePointerClick, 
  Lightbulb, 
  PenTool, 
  Settings, 
  UploadCloud, 
  Share2, 
  BarChart,
  Play,
  Zap,
  CheckCircle2
} from 'lucide-react';
import TrustSection from '../components/TrustSection';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const CONTENT_FORMATS = [
  {
    title: 'Written Content',
    icon: FileText,
    desc: 'The foundation of communication. High-impact text that drives engagement and search visibility.',
    examples: ['Blog posts', 'Social captions', 'Email newsletters', 'Video scripts']
  },
  {
    title: 'Visual Content',
    icon: ImageIcon,
    desc: 'Bespoke designs that command attention. We transform brand values into stunning visual identities.',
    examples: ['Infographics', 'Brand designs', 'Thumbnails', 'Event posters']
  },
  {
    title: 'Video Content',
    icon: Video,
    desc: 'The most powerful medium for storytelling. Cinematic production for every platform.',
    examples: ['TikTok/Reels', 'Product demos', 'YouTube features', 'Brand films']
  },
  {
    title: 'Audio Content',
    icon: Mic2,
    desc: 'Professional sound engineering for podcasts and voiceovers that build deep audience trust.',
    examples: ['Podcasts', 'Audio ads', 'Interviews', 'Narrative voiceovers']
  },
  {
    title: 'Interactive Content',
    icon: MousePointerClick,
    desc: 'Content that users don’t just consume, but experience directly through engagement.',
    examples: ['Quizzes & Polls', 'Web applications', 'Surveys', 'Digital calculators']
  }
];

const ContentProduction: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-500 text-gray-900 dark:text-white">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
           <video 
             autoPlay 
             muted 
             loop 
             playsInline
             className="w-full h-full object-cover opacity-60 dark:opacity-40 grayscale"
           >
              <source src="https://cdn.coverr.co/videos/the-producer-working-on-a-film-1473/720p.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-white/20 dark:to-black/20" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-magenta/10 backdrop-blur-md border border-brand-magenta/20 mb-8">
              <Zap className="w-4 h-4 text-brand-magenta" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-magenta">The Communication Engine</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.85] mb-8">
              CONTENT <br />
              <span className="text-brand-magenta italic">PRODUCTION.</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-white/60 font-light max-w-2xl leading-relaxed mb-12">
              Everything a brand creates to communicate. We are the engine that powers your Digital Marketing, Social Media, and PR.
            </p>

            <button className="group flex items-center gap-4 px-10 py-5 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl transition-all hover:scale-105">
               <span>View Showreel</span>
               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <Play className="w-3 h-3 fill-white" />
               </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Formats Grid */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-brand-void/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-3xl mb-20">
              <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Core Output Formats</span>
              <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight uppercase">High-Fidelity Assets.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONTENT_FORMATS.map((format, i) => (
                <motion.div
                  key={format.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-[40px] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-brand-magenta/30 transition-all group flex flex-col h-full"
                >
                   <format.icon className="w-10 h-10 text-brand-magenta mb-8 group-hover:scale-110 transition-transform" />
                   <h3 className="text-2xl font-display font-black mb-4 uppercase tracking-tight leading-tight">{format.title}</h3>
                   <p className="text-gray-500 dark:text-white/40 text-sm font-light leading-relaxed mb-8 flex-1">{format.desc}</p>
                   
                   <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex flex-wrap gap-2">
                      {format.examples.map(ex => (
                        <span key={ex} className="px-3 py-1 rounded-full bg-gray-50 dark:bg-white/5 text-[10px] font-bold text-gray-400">{ex}</span>
                      ))}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <TrustSection />

      {/* The 7-Step Process */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              <div className="flex-1 lg:sticky lg:top-32">
                 <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Our Workflow</span>
                 <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 dark:text-white mb-8 tracking-tight uppercase leading-tight">
                    From Idea <br /> <span className="text-brand-magenta">to Analysis.</span>
                 </h2>
                 <p className="text-gray-600 dark:text-white/50 text-lg font-light leading-relaxed mb-10">
                    Good content is never random. We follow a rigorous, 7-step production system to ensure quality, consistency, and results.
                 </p>
                 <div className="p-8 rounded-3xl bg-brand-magenta/5 border border-brand-magenta/20">
                    <p className="text-sm font-bold text-brand-magenta uppercase tracking-widest mb-2">The Outcome</p>
                    <p className="text-xs text-gray-600 dark:text-white/60 font-light leading-relaxed">Build trust, attract attention, educate your audience, and grow your digital legacy.</p>
                 </div>
              </div>
              
              <div className="flex-1 space-y-12">
                 {[
                   { step: '01', title: 'Idea Generation', desc: 'Identifying trends, solving problems, and creative conceptualization.', icon: Lightbulb },
                   { step: '02', title: 'Planning', desc: 'Scripting, storyboarding, and defining the optimal format.', icon: PenTool },
                   { step: '03', title: 'Creation', desc: 'The studio phase: writing, designing, and recording.', icon: Settings },
                   { step: '04', title: 'Editing', desc: 'Refining quality, fixing errors, and ensuring brand consistency.', icon: Play },
                   { step: '05', title: 'Publishing', desc: 'Strategic posting and scheduling across platforms.', icon: UploadCloud },
                   { step: '06', title: 'Distribution', desc: 'SEO promotion, social sharing, and targeted amplification.', icon: Share2 },
                   { step: '07', title: 'Analysis', desc: 'Data-driven review of performance and optimization.', icon: BarChart }
                 ].map((item) => (
                   <motion.div 
                     key={item.step}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="flex gap-8 group"
                   >
                      <div className="text-4xl font-display font-black text-brand-magenta/20 group-hover:text-brand-magenta transition-colors">{item.step}</div>
                      <div>
                         <h4 className="text-xl font-display font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">{item.title}</h4>
                         <p className="text-gray-500 dark:text-white/40 text-sm font-light leading-relaxed">{item.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Production vs Marketing Comparison */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-brand-void/50 border-y border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto overflow-hidden rounded-[48px] bg-white dark:bg-black border border-gray-100 dark:border-white/10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                 <div className="p-12 border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5">
                    <h3 className="text-2xl font-display font-black mb-8 text-gray-900 dark:text-white uppercase tracking-tight">Content Production</h3>
                    <ul className="space-y-4">
                       {['The creative engine', 'Focus on Output', 'Making the video', 'Visual storytelling'].map(i => (
                         <li key={i} className="flex items-center gap-3 text-sm text-gray-500 dark:text-white/40">
                            <CheckCircle2 className="w-4 h-4 text-brand-magenta" />
                            {i}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="p-12 bg-brand-magenta/5">
                    <h3 className="text-2xl font-display font-black mb-8 text-brand-magenta uppercase tracking-tight">Content Marketing</h3>
                    <ul className="space-y-4">
                       {['The strategic vehicle', 'Focus on Goals', 'Using the video', 'Audience acquisition'].map(i => (
                         <li key={i} className="flex items-center gap-3 text-sm text-gray-900 dark:text-white/80">
                            <CheckCircle2 className="w-4 h-4 text-brand-magenta" />
                            {i}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
           <p className="mt-12 text-center text-gray-400 dark:text-white/20 text-sm italic">"Production is the engine, Marketing is the vehicle."</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-display font-black text-gray-900 dark:text-white mb-10 uppercase tracking-tight">
            No Content, <br /> <span className="text-brand-magenta">No Communication.</span>
          </h2>
          <button className="group relative px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all overflow-hidden">
            <span className="relative z-10">Book a Production Brief</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContentProduction;