import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TRUSTED_BRANDS } from '../constants';

const TrustSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[#f7f5ee] dark:bg-brand-void border-y border-black/10 dark:border-white/10 transition-colors">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
      />
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 py-10 sm:py-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="shrink-0 text-gray-900 dark:text-white text-sm font-black transition-colors"
          >
            Trusted By:
          </motion.p>

          <div className="relative w-full overflow-hidden mba-marquee-pause">
            <div className={`flex flex-nowrap gap-x-10 sm:gap-x-14 md:gap-x-16 items-center w-max ${reduceMotion ? '' : 'mba-marquee'}`}>
              {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex-shrink-0 transition-all duration-300 flex items-center justify-center hover:opacity-80"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className={`max-h-7 sm:max-h-9 md:max-h-10 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all ${brand.className || ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
