
import React from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../constants';

const smoothEase = [0.16, 1, 0.3, 1] as const;

const Solutions: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">

        {/* ── Header ───────────────────────────────────── */}
        <div className="max-w-4xl mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-brand-magenta text-xs font-black tracking-[0.4em] uppercase mb-6 block"
          >
            Industries We Serve
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: smoothEase, delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none text-gray-900 dark:text-white transition-colors"
          >
            INDUSTRIES WE <br />
            <span className="text-brand-magenta italic">SERVE.</span>
          </motion.h1>
        </div>

        {/* ── Industry Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: smoothEase }}
              className="group relative overflow-hidden rounded-[40px] aspect-square bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none"
            >
              {/* Image */}
              <img
                src={industry.image}
                alt={industry.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.2s]"
                loading="lazy"
                decoding="async"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Name label */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-white font-display font-black text-2xl sm:text-3xl leading-tight tracking-tight">
                  {industry.name}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Solutions;
