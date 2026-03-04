
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES, TRUSTED_BRANDS } from '../constants';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: smoothEase, delay },
});

const Features: React.FC = () => {
  const coreServices = [
    {
      title: 'Influencer Marketing & Campaigns',
      description:
        'Strategic influencer-led campaigns designed for reach, engagement, and conversion across Instagram, TikTok, YouTube, X (Twitter), and emerging platforms.',
      bullets: [],
    },
    {
      title: 'Talent Management & Development',
      description: 'Comprehensive talent representation including:',
      bullets: [
        'Personal brand strategy',
        'Deal negotiation & brand endorsements',
        'Career growth and monetization',
        'Media training & positioning',
      ],
    },
    {
      title: 'Brand Partnerships & Endorsements',
      description: 'Matching brands with the right talents for:',
      bullets: ['Product launches', 'Brand ambassadorships', 'Event partnerships', 'Long-term collaborations'],
    },
    {
      title: 'Campaign Strategy, Media Planning & Analytics',
      description: 'Insight-led campaign development with performance tracking, reporting, and optimization.',
      bullets: [],
    },
  ];

  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20 sm:space-y-28 lg:space-y-32">

        {/* ─────────────────────────────────────────────────
            Company Overview
        ───────────────────────────────────────────────── */}
        <section>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block"
          >
            About Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: smoothEase, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black tracking-tighter leading-[0.9] mb-8 sm:mb-10 text-gray-900 dark:text-white transition-colors"
          >
            MEDIABOSS<br />
            <span className="text-brand-magenta italic">AFRICA.</span>
          </motion.h1>

          <div className="border-l-2 border-brand-magenta pl-8 mb-12 py-4">
            <p className="text-gray-600 dark:text-white/70 text-lg font-medium italic leading-relaxed max-w-3xl transition-colors">
              Influence. Innovation. Impact. Let&apos;s make it mediaboss.
            </p>
          </div>

          <div className="space-y-1 mb-4">
            <p className="text-gray-800 dark:text-white/70 text-xs font-black tracking-[0.3em] uppercase mb-6 text-brand-magenta">Company Overview</p>
          </div>

          <p className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed max-w-4xl mb-6 transition-colors">
            Mediaboss Africa is a leading pan-African talent management, influencer marketing, and creative media company at the intersection of culture, entertainment, and commerce. We help brands and talents win in the digital economy through strategic storytelling, data-driven campaigns, and culturally relevant content.
          </p>
          <p className="text-gray-800 dark:text-white/80 text-xl font-semibold leading-relaxed max-w-3xl transition-colors">
            At Mediaboss Africa, we don&apos;t just create visibility - we build influence that converts.
          </p>
        </section>

        {/* ─────────────────────────────────────────────────
            Our Ecosystem
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Our Ecosystem</span>
          <motion.p {...fade()} className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed max-w-4xl mb-16 transition-colors">
            Mediaboss Africa operates through a structured creative ecosystem designed to deliver end-to-end solutions:
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 1. Parent Company */}
            <motion.div {...fade(0.1)} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] p-12 shadow-xl dark:shadow-none">
              <span className="text-brand-magenta text-xs font-black tracking-[0.3em] uppercase mb-4 block">1. Mediaboss Africa (Parent Company)</span>
              <p className="text-gray-600 dark:text-white/60 text-base leading-relaxed mb-6 transition-colors">Focuses on:</p>
              <ul className="space-y-3">
                {[
                  'Influencer marketing',
                  'Talent management',
                  'Brand partnerships',
                  'Campaign strategy & execution',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-magenta flex-shrink-0 mt-2" />
                    <span className="text-gray-700 dark:text-white/70 text-lg transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 2. Studio */}
            <motion.div {...fade(0.2)} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] p-12 shadow-xl dark:shadow-none">
              <span className="text-brand-magenta text-xs font-black tracking-[0.3em] uppercase mb-4 block">2. The Mediaboss Studio (Subsidiary)</span>
              <p className="text-gray-600 dark:text-white/60 text-lg leading-relaxed transition-colors">
                Our in-house creative production and content innovation hub, powering high-quality storytelling and digital media production for brands and talents.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            Vision & Mission
        ───────────────────────────────────────────────── */}
        <section className="grid md:grid-cols-2 gap-8">
          {[
            {
              label: 'Vision',
              text: 'To become Africa\u2019s most influential media ecosystem, shaping global conversations through talent, creativity, and culture.',
            },
            {
              label: 'Mission',
              text: 'To empower brands and creators to tell compelling stories, build strong communities, and achieve measurable growth through influence-led marketing and premium content production.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fade(i * 0.15)}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[40px] p-12 shadow-xl dark:shadow-none"
            >
              <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-4 block">{item.label}</span>
              <p className="text-gray-700 dark:text-white/80 text-xl font-light leading-relaxed transition-colors">{item.text}</p>
            </motion.div>
          ))}
        </section>

        {/* ─────────────────────────────────────────────────
            Core Services
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Core Services</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {coreServices.map((service, i) => (
              <motion.div
                key={service.title}
                {...fade(i * 0.08)}
                className={`bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-10 shadow-sm dark:shadow-none relative overflow-hidden h-full min-h-[420px] sm:min-h-[460px] flex flex-col justify-end group ${
                  i === 0 ? '' : ''
                }`}
              >
                {(FEATURES[i]?.image || i === 0) && (
                  <>
                    <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <img
                        src={
                          i === 0
                            ? 'https://i.pinimg.com/1200x/2e/72/f6/2e72f667c733ea7f9893027f83382c06.jpg'
                            : i === 1
                              ? 'https://i.pinimg.com/736x/d0/9a/9c/d09a9c0cafff6e9350c78c0319c05230.jpg'
                              : i === 2
                                ? 'https://i.pinimg.com/736x/1e/e4/53/1ee453e7e6a44b0c78c11e65ba6a007c.jpg'
                                : i === 3
                                  ? 'https://i.pinimg.com/1200x/be/a4/4a/bea44ab9b60bacd14ec237cccbc6c150.jpg'
                            : FEATURES[i].image
                        }
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </>
                )}

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-display font-black mb-3 text-gray-900 dark:text-white group-hover:text-white transition-colors">{service.title}</h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed mb-5 group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                  {service.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {service.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-brand-magenta flex-shrink-0 mt-2" />
                          <span className="text-sm sm:text-base text-gray-700 dark:text-white/70 group-hover:text-white/80 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            The Mediaboss Studio (Subsidiary)
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">The Mediaboss Studio (Subsidiary)</span>
          <motion.p {...fade()} className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed max-w-4xl mb-10 transition-colors">
            The Mediaboss Studio is the creative engine of Mediaboss Africa — a full-service content production and digital storytelling studio built to serve brands, creators, and campaigns.
          </motion.p>

          <motion.p {...fade(0.1)} className="text-gray-700 dark:text-white/70 font-semibold mb-6 transition-colors">Studio Services Include:</motion.p>

          <motion.div {...fade(0.15)} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[36px] p-10 shadow-sm dark:shadow-none mb-8">
            <ul className="space-y-3">
              {[
                'Video Production (Short-form & Long-form)',
                'Social Media Content Creation',
                'Podcast Production',
                'Photography & Creative Direction',
                'Branded Content & Commercial Shoots',
                'Show & Digital Series Development',
                'Editing, Motion Graphics & Post-Production',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-magenta flex-shrink-0 mt-2" />
                  <span className="text-gray-700 dark:text-white/70 text-lg transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p {...fade(0.2)} className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed max-w-4xl transition-colors">
            The Studio ensures every campaign and talent story is visually compelling, platform-optimized, and culturally relevant.
          </motion.p>
        </section>

        {/* ─────────────────────────────────────────────────
            Industries We Serve
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Industries We Serve</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Fashion & Lifestyle',
              'Beauty & Skincare',
              'Tech & Fintech',
              'Food & Beverage',
              'Entertainment & Music',
              'Real Estate',
              'Events & Experiences',
            ].map((industry, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.07)}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl px-6 py-5 text-center shadow-sm dark:shadow-none"
              >
                <span className="text-gray-800 dark:text-white/80 font-semibold text-base transition-colors">{industry}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            Why Mediaboss Africa?
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Why Mediaboss Africa?</span>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              'Pan-African & Global Reach',
              'Strong Talent & Creator Network',
              'In-House Production via The Mediaboss Studio',
              'Culture-Driven, Data-Backed Strategies',
              'Proven Results Across Multiple Industries',
              'One Ecosystem: Strategy, Talent & Production',
            ].map((point, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.08)}
                className="flex items-start gap-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl px-8 py-7 shadow-sm dark:shadow-none"
              >
                <div className="w-2 h-2 rounded-full bg-brand-magenta flex-shrink-0 mt-2.5" />
                <span className="text-gray-800 dark:text-white/80 font-medium text-lg leading-snug transition-colors">{point}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            Our Talent Network
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Our Talent Network</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              'Influencers & Digital Creators',
              'Actors & Entertainers',
              'Musicians & Public Figures',
              'Lifestyle & Thought Leaders',
            ].map((type, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.1)}
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center shadow-sm dark:shadow-none"
              >
                <span className="text-gray-800 dark:text-white/80 font-semibold text-base transition-colors">{type}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            We Are Trusted By
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">We Are Trusted By</span>
          <div className="relative w-full overflow-hidden py-4">
            <motion.div
              className="flex flex-nowrap gap-x-12 sm:gap-x-16 items-center w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25
              }}
            >
              {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex-shrink-0 transition-all duration-300 flex items-center justify-center hover:opacity-80 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={`max-h-12 w-auto object-contain rounded-lg ${brand.className || ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                    {(brand as any).showText && (
                      <span className="font-display font-bold text-gray-900 dark:text-white text-sm whitespace-nowrap">{brand.name}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────
            Let's Work Together
        ───────────────────────────────────────────────── */}
        <section>
          <span className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block">Let&apos;s Work Together</span>
          <motion.div {...fade()} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-[48px] p-14 shadow-xl dark:shadow-none relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,_rgba(255,0,160,0.05),transparent_70%)]" />
            <div className="relative z-10 space-y-4">
              <p className="text-gray-600 dark:text-white/60 text-xl font-light leading-relaxed max-w-3xl transition-colors">
                Whether you&apos;re a brand looking to scale influence, a talent ready to build legacy, or a partner seeking creative excellence, Mediaboss Africa delivers solutions that move culture and drive results.
              </p>
              <div className="pt-6 space-y-2 text-gray-700 dark:text-white/70 transition-colors">
                <p><span className="font-black text-gray-900 dark:text-white">Headquarters:</span> Lagos, Nigeria</p>
                <p><span className="font-black text-gray-900 dark:text-white">Operations:</span> Africa | UK | US (Remote Capabilities)</p>
                <p><span className="font-black text-gray-900 dark:text-white">Email:</span>{' '}
                  <a href="mailto:info@mediabossafrica.com" className="text-brand-magenta hover:underline">info@mediabossafrica.com</a>
                </p>
                <p><span className="font-black text-gray-900 dark:text-white">Instagram:</span>{' '}
                  <a href="https://instagram.com/mediabossafrica" target="_blank" rel="noopener noreferrer" className="text-brand-magenta hover:underline">@mediabossafrica</a>
                </p>
                <p><span className="font-black text-gray-900 dark:text-white">Studio Arm:</span> The Mediaboss Studio</p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default Features;

