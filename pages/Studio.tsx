import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Video, Podcast, Camera, Edit3, Monitor, Sparkles, Trophy, Users } from 'lucide-react';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fadeIn = (delay = 0, y = 30) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 1, ease: smoothEase, delay },
});

const STUDIO_SERVICES = [
  {
    title: 'Video Production',
    icon: <Video className="w-6 h-6" />,
    description: 'High-end short-form and long-form cinematic storytelling tailored for digital resonance.'
  },
  {
    title: 'Podcast Production',
    icon: <Podcast className="w-6 h-6" />,
    description: 'Professional audio-visual podcast development, from concept to global distribution.'
  },
  {
    title: 'Creative Direction',
    icon: <Camera className="w-6 h-6" />,
    description: 'Bespoke photography and visual identity strategies that define modern African excellence.'
  },
  {
    title: 'Branded Content',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Commercial-grade shoots that bridge the gap between brand goals and cultural impact.'
  },
  {
    title: 'Post-Production',
    icon: <Edit3 className="w-6 h-6" />,
    description: 'Elite editing, motion graphics, and color grading that bring every frame to life.'
  },
  {
    title: 'Show Development',
    icon: <Monitor className="w-6 h-6" />,
    description: 'End-to-end development of digital series and talk shows for creators and brands.'
  },
];

const YOUTUBE_PROJECTS = [
  {
    embed: 'https://www.youtube.com/embed/OvW7bjGKk6Q?si=skocnQb1-VS5AyXF',
    title: 'NO ONE HAS TO KNOW (LATEST NOLLYWOOD MOVIE 2025)',
    subtitle: 'Branded Feature Film Production',
    description: 'A powerful journey through trauma and advocacy, featuring top-tier Nollywood talent. This project highlights our capability in large-scale cinematic production and meaningful storytelling.',
    stats: [
      { label: 'Views', value: '1.2M+' },
      { label: 'Engagement', value: 'High' }
    ]
  },
  {
    embed: 'https://www.youtube.com/embed/J2DFJwTZ5fs?si=cryWCSb4nIofeVtN',
    title: 'THE TOBI MAKINDE SHOW - TRAILER',
    subtitle: 'Show Development & Digital Launch',
    description: 'Revolutionizing the talk show format in Nigeria. We handled everything from the set design to the high-velocity social media launch strategy.',
    stats: [
      { label: 'Growth', value: '11K+ Subs' },
      { label: 'Buzz', value: 'Viral' }
    ]
  }
];

const ScrollActivatedYouTube: React.FC<{
  embed: string;
  title: string;
  className?: string;
}> = ({ embed, title, className = '' }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const src = useMemo(() => {
    const url = new URL(embed);
    url.searchParams.set('autoplay', isActive ? '1' : '0');
    url.searchParams.set('mute', isMuted ? '1' : '0');
    url.searchParams.set('controls', '1');
    url.searchParams.set('rel', '0');
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('enablejsapi', '1');
    url.searchParams.set('origin', window.location.origin);
    return url.toString();
  }, [embed, isActive, isMuted]);

  const unmute = () => {
    setIsMuted(false);
    const player = iframeRef.current?.contentWindow;
    if (player) {
      player.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute', args: [] }),
        '*'
      );
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="w-full h-full object-cover"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {isMuted && (
        <button
          type="button"
          onClick={unmute}
          className="absolute bottom-4 right-4 rounded-xl bg-black/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white border border-white/20"
        >
          Unmute
        </button>
      )}
    </div>
  );
};

const Studio: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-brand-deep transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-brand-magenta/30 blur-[100px] sm:blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-brand-accent/20 blur-[100px] sm:blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-5xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-brand-magenta text-[10px] sm:text-[11px] font-black tracking-[0.4em] sm:tracking-[0.6em] uppercase mb-4 sm:mb-8 block"
            >
              Creative Engine
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: smoothEase }}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black mb-8 sm:mb-12 leading-[0.85] tracking-tighter text-gray-900 dark:text-white"
            >
              THE <br /> MEDIABOSS <br /> <span className="text-brand-magenta italic text-glow">STUDIO.</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-8 sm:gap-12 items-start"
            >
              <div className="flex-1 border-l-2 border-brand-magenta/30 pl-6 sm:pl-8">
                <p className="text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-gray-600 dark:text-white/70">
                  We bridge the gap between raw creativity and world-class production.
                </p>
              </div>
              <div className="flex-1">
                <p className="text-base sm:text-lg text-gray-500 dark:text-white/50 font-light leading-relaxed">
                  The Mediaboss Studio is a full-service production powerhouse built for the digital age. We don't just "make videos" — we engineer culturally relevant assets that move markets.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Width Video Showcase (Primary) */}
      <section className="py-12 sm:py-20 bg-gray-100 dark:bg-black overflow-hidden relative group transition-colors">
        <div className="absolute inset-0 z-0 opacity-60 dark:opacity-40 transition-opacity">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:to-black transition-colors" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            {...fadeIn()}
            className="w-full aspect-video rounded-2xl sm:rounded-[48px] overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-2xl shadow-brand-magenta/10 transition-colors"
          >
            <ScrollActivatedYouTube
              embed="https://www.youtube.com/embed/OvW7bjGKk6Q?si=skocnQb1-VS5AyXF"
              title="Featured Production"
              className="w-full h-full"
            />
          </motion.div>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-end">
             <div className="px-2">
                <span className="text-brand-magenta text-[9px] sm:text-[10px] font-black tracking-widest uppercase mb-3 sm:mb-4 block">Featured Masterpiece</span>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-gray-900 dark:text-white mb-4 sm:mb-6 uppercase tracking-tight leading-none transition-colors">NO ONE HAS TO <br /> <span className="italic">KNOW (2025)</span></h2>
                <p className="text-gray-600 dark:text-white/50 text-base sm:text-lg font-light leading-relaxed max-w-xl transition-colors">
                   Our latest Nollywood feature film production. From script consultation to final color grade, we delivered a cinematic experience that resonated across borders.
                </p>
             </div>
             <div className="flex gap-6 sm:gap-8 border-t border-gray-200 dark:border-white/10 pt-6 sm:pt-8 md:justify-end px-2 transition-colors">
                <div className="text-center">
                   <div className="text-3xl sm:text-4xl font-display font-black text-brand-magenta">1.2M+</div>
                   <div className="text-[9px] sm:text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest mt-1 transition-colors">Total Views</div>
                </div>
                <div className="text-center border-l border-gray-200 dark:border-white/10 pl-6 sm:pl-8 transition-colors">
                   <div className="text-3xl sm:text-4xl font-display font-black text-gray-900 dark:text-white transition-colors">#1</div>
                   <div className="text-[9px] sm:text-[10px] font-black uppercase text-gray-500 dark:text-white/30 tracking-widest mt-1 transition-colors">Trending</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-24 gap-8 sm:gap-12">
            <div className="px-2">
               <span className="text-brand-magenta text-[10px] sm:text-[11px] font-black tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-4 sm:mb-6 block">Capabilities</span>
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-gray-900 dark:text-white">STUDIO <br /> <span className="text-brand-magenta italic text-glow">SERVICES.</span></h2>
            </div>
            <p className="max-w-md text-gray-500 dark:text-white/40 text-lg sm:text-xl font-light px-2">
               End-to-end creative solutions for brands and creators who refuse to blend in.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {STUDIO_SERVICES.map((service, i) => (
              <motion.div
                key={i}
                {...fadeIn(i * 0.1)}
                whileHover={{ y: -8 }}
                className="p-8 sm:p-10 rounded-3xl sm:rounded-[40px] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 transition-all shadow-xl dark:shadow-none hover:border-brand-magenta/30 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-magenta/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-brand-magenta mb-6 sm:mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black mb-3 sm:mb-4 uppercase tracking-tight text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-500 dark:text-white/50 text-xs sm:text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Project Showcase */}
      <section className="py-24 sm:py-32 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mb-12 sm:mb-20 px-2">
             <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-gray-900 dark:text-white leading-tight">
               IP DEVELOPMENT <br /> & DIGITAL <span className="text-brand-magenta italic">SHOWS.</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 gap-16 sm:gap-24">
             {YOUTUBE_PROJECTS.slice(1).map((project, i) => (
                <div key={i} className="group">
                   <motion.div 
                     {...fadeIn()}
                     className="w-full aspect-video rounded-2xl sm:rounded-[48px] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl relative"
                   >
                     <ScrollActivatedYouTube
                        embed={project.embed}
                        title={project.title}
                        className="w-full h-full"
                      />
                   </motion.div>
                   <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 px-2">
                      <div className="lg:col-span-8">
                         <h3 className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white mb-4 sm:mb-6 uppercase tracking-tight leading-none">{project.title}</h3>
                         <p className="text-gray-600 dark:text-white/50 text-base sm:text-lg font-light leading-relaxed">
                            {project.description}
                         </p>
                      </div>
                      <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6">
                         {project.stats.map((stat, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-3 sm:pb-4">
                               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                               <span className="text-lg sm:text-xl font-display font-black text-brand-magenta">{stat.value}</span>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Trust & Results */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
             <div className="px-2">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tight text-gray-900 dark:text-white mb-8 sm:mb-10 leading-none">
                   BUILT FOR <br /> <span className="text-brand-magenta italic text-glow">SCALE.</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-500 dark:text-white/40 font-light leading-relaxed mb-10 sm:mb-12">
                   The Studio serves as the backbone for Mediaboss Africa's most successful IP. We don't just provide equipment; we provide the strategic creative vision required to win in today's attention economy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                   <div className="flex flex-col items-start">
                      <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-brand-magenta mb-3 sm:mb-4" />
                      <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white">Award-Grade</div>
                      <div className="text-[9px] sm:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Cinematic Quality</div>
                   </div>
                   <div className="flex flex-col items-start">
                      <Users className="w-6 h-6 sm:w-8 sm:h-8 text-brand-magenta mb-3 sm:mb-4" />
                      <div className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white">Platform-First</div>
                      <div className="text-[9px] sm:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">Algorithm Optimized</div>
                   </div>
                </div>
             </div>
             <div className="relative mt-8 lg:mt-0 px-2">
                <motion.div 
                  initial={{ rotate: 5, scale: 0.95, opacity: 0 }}
                  whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: smoothEase }}
                  className="rounded-3xl sm:rounded-[64px] overflow-hidden border-4 sm:border-8 border-white dark:border-white/5 shadow-2xl relative z-10"
                >
                   <img 
                     src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
                     alt="Professional Studio Set" 
                     className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                   />
                </motion.div>
                <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 bg-brand-magenta/20 blur-[80px] sm:blur-[100px] rounded-full z-0" />
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-brand-magenta rounded-[40px] sm:rounded-[80px] p-10 sm:p-16 md:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(255,0,160,0.5)]">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] right-[-5%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-white blur-[100px] sm:blur-[150px] rounded-full" />
              <div className="absolute bottom-[-10%] left-[-5%] w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-brand-accent blur-[100px] sm:blur-[150px] rounded-full" />
            </div>
            
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-white mb-6 sm:mb-10 leading-[0.9] tracking-tighter relative z-10">
              BUILD YOUR <br /> <span className="italic">LEGACY.</span>
            </h2>
            <p className="text-white/80 text-lg sm:text-xl max-w-xl mx-auto mb-10 sm:mb-16 font-light relative z-10 leading-relaxed">
              From viral trailers to cinematic features, we turn vision into high-impact digital reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center relative z-10">
              <button 
                onClick={() => navigate('/talent-form')}
                className="w-full sm:w-auto px-10 sm:px-16 py-6 sm:py-8 bg-white text-brand-magenta rounded-2xl sm:rounded-[32px] font-black text-xs sm:text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Work With The Studio
              </button>
              <button 
                onClick={() => navigate('/work')}
                className="w-full sm:w-auto px-10 sm:px-16 py-6 sm:py-8 border-2 border-white/30 text-white rounded-2xl sm:rounded-[32px] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Studio;
