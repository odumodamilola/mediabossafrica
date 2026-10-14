"use client"; 

import React, { useEffect, useState } from 'react'; 
import { motion } from 'framer-motion'; 
import { ArrowRight, Loader2, Zap, CheckCircle2 } from 'lucide-react'; 
import TrustSection from '../components/TrustSection'; 
import { apiClient } from '../services/api';

const smoothEase = [0.16, 1, 0.3, 1] as const; 

interface ServiceDetailProps {
  slug: string;
}

export default function ServiceDetail({ slug }: ServiceDetailProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await apiClient.get(`/services/${slug}`);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        setError('Service not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-brand-magenta" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex p-4 rounded-full bg-brand-magenta/10 text-brand-magenta mb-6">
            <Zap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black mb-4 uppercase text-foreground">{error || 'Service not found'}</h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">The service you are looking for might have been moved or does not exist.</p>
          <a href="/" className="inline-block px-8 py-3 rounded-xl bg-primary text-primary-foreground uppercase text-xs font-bold tracking-widest hover:opacity-90 transition-opacity">Return Home</a>
        </div>
      </div>
    );
  }

  // Clean display title for Hero
  const displayTitle = data.shortTitle || (data.title ? data.title.split('|')[0].split('–')[0].split('-')[0].trim() : 'Service');
  const titleWords = displayTitle.split(' ').filter(Boolean);

  return ( 
    <div className="bg-background transition-colors duration-500"> 
      {/* Hero Section */} 
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden"> 
        <div className="absolute inset-0 z-0"> 
          <div className="absolute inset-0 bg-gradient-to-b from-brand-magenta/5 via-transparent to-transparent" /> 
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-magenta/5 blur-[100px] rounded-full animate-pulse" /> 
        </div> 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"> 
          <div className="max-w-4xl mx-auto"> 
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: smoothEase }} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-magenta/10 border border-brand-magenta/20 mb-8" > 
              <Zap className="w-4 h-4 text-brand-magenta" /> 
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-magenta">{data.shortTitle || displayTitle}</span> 
            </motion.div> 
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: smoothEase }} className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[0.88] text-foreground mb-8 uppercase" > 
              {titleWords.map((word: string, i: number) => (
                <React.Fragment key={i}>
                  {i === titleWords.length - 1 ? (
                    <span className="text-brand-magenta italic">{word}.</span>
                  ) : (
                    <>{word} <br className="hidden sm:inline" /> </>
                  )}
                </React.Fragment>
              ))}
            </motion.h1> 
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed mb-12" > 
              {data.heroTitle || data.description} 
            </motion.p> 
            {data.ctaLabel && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} > 
                <a href={data.ctaHref || "/contact"} className="inline-block group relative px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 transition-all overflow-hidden"> 
                  <span className="relative z-10">{data.ctaLabel}</span> 
                  <div className="absolute inset-0 bg-background/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" /> 
                </a> 
              </motion.div> 
            )}
          </div> 
        </div> 
      </section> 

      {/* Description & Intro */}
      {(data.description || data.intro) && (
        <section className="py-20 sm:py-24 bg-muted/50 border-y border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            {data.description && <p className="text-xl sm:text-2xl font-light text-foreground mb-6">{data.description}</p>}
            {data.intro && <p className="text-muted-foreground leading-relaxed">{data.intro}</p>}
          </div>
        </section>
      )}

      {/* Capabilities */}
      {data.capabilities && data.capabilities.length > 0 && (
        <section className="py-24 sm:py-32 relative"> 
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
            <div className="flex items-center gap-6 mb-20"> 
              <div className="h-px flex-1 bg-border" /> 
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground">Our Capabilities</h2> 
              <div className="h-px flex-1 bg-border" /> 
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> 
              {data.capabilities.map((capability: string, i: number) => ( 
                <motion.div key={capability} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.8 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-muted dark:bg-card border border-border hover:border-brand-magenta/30 transition-all group flex items-start gap-4" > 
                  <CheckCircle2 className="w-6 h-6 text-brand-magenta shrink-0 mt-1" />
                  <span className="text-lg font-bold text-foreground leading-snug">{capability}</span>
                </motion.div> 
              ))} 
            </div> 
          </div> 
        </section> 
      )}

      <TrustSection /> 

      {/* Outcomes */}
      {data.outcomes && data.outcomes.length > 0 && (
        <section className="py-24 sm:py-32 bg-muted border-y border-border overflow-hidden"> 
          <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20"> 
              <div className="flex-1"> 
                <span className="text-brand-magenta text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Proven Results</span> 
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-foreground mb-10 tracking-tight"> EXPECTED <br /> <span className="text-brand-magenta">OUTCOMES.</span> </h2> 
                <div className="space-y-8 relative"> 
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-brand-magenta via-brand-magenta/20 to-transparent" /> 
                  {data.outcomes.map((item: string, idx: number) => ( 
                    <div key={item} className="pl-12 relative group"> 
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-brand-magenta flex items-center justify-center z-10 group-hover:bg-brand-magenta transition-colors"> 
                        <span className="text-[10px] font-black text-brand-magenta group-hover:text-white">{idx + 1}</span> 
                      </div> 
                      <p className="text-lg font-bold text-foreground">{item}</p> 
                    </div> 
                  ))} 
                </div> 
              </div> 
              <div className="flex-1 relative"> 
                <div className="absolute inset-0 bg-brand-magenta/10 blur-[120px] rounded-full" /> 
                <img src={data.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"} alt={data.imageAlt || data.title} className="relative z-10 rounded-[64px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 object-cover aspect-square" /> 
              </div> 
            </div> 
          </div> 
        </section> 
      )}

      {/* Final CTA */} 
      <section className="py-24 sm:py-32 text-center"> 
        <div className="container mx-auto px-4"> 
          <h2 className="text-4xl sm:text-6xl font-display font-black text-foreground mb-10 uppercase tracking-tight"> Ready To <br /> <span className="text-brand-magenta">Dominate?</span> </h2> 
          <a href={data.ctaHref || "/contact"} className="inline-block group relative px-12 py-6 bg-brand-magenta text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all overflow-hidden"> 
            <span className="relative z-10">{data.ctaLabel || 'Contact Us'}</span> 
            <div className="absolute inset-0 bg-background/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" /> 
          </a> 
        </div> 
      </section> 
    </div> 
  ); 
}
