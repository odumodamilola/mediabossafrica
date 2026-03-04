
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TRUSTED_BRANDS } from '../constants';

const TrustSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-20 border-y border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-brand-deep/20 relative transition-colors">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-white/30 text-[10px] font-black uppercase tracking-[0.5em] mb-10"
        >
          We Are Trusted By
        </motion.p>

        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TRUSTED_BRANDS.slice(0, 6).map((brand) => (
            <div
              key={`grid-${brand.name}`}
              className="rounded-2xl border border-gray-200 bg-white/90 px-4 py-4 dark:border-white/10 dark:bg-white/5"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className={`mx-auto h-10 w-auto object-contain ${brand.className || ''}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex flex-nowrap gap-x-12 sm:gap-x-16 md:gap-x-24 items-center w-max"
            animate={reduceMotion ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={{
              repeat: reduceMotion ? 0 : Infinity,
              ease: "linear",
              duration: 24
            }}
          >
            {/* Double the array for seamless infinite scroll */}
            {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex-shrink-0 relative transition-all duration-300 cursor-pointer flex justify-center items-center hover:opacity-80 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className={`max-h-12 md:max-h-14 w-auto object-contain rounded-lg ${brand.className || ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                  {(brand as any).showText && (
                    <span className="font-display font-bold text-gray-900 dark:text-white whitespace-nowrap">{brand.name}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-magenta/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-magenta/10 to-transparent" />
    </section>
  );
};

export default TrustSection;
