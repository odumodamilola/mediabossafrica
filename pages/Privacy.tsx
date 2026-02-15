
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-display font-black mb-16 tracking-tighter text-gray-900 dark:text-white transition-colors">PRIVACY <span className="text-brand-magenta">POLICY.</span></h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-600 dark:text-white/50 space-y-10 leading-relaxed font-light transition-colors">
          <section>
            <h2 className="text-gray-900 dark:text-white text-2xl font-black uppercase tracking-widest mb-6 transition-colors">1. Data Sovereignty</h2>
            <p>At Mediaboss Africa, we prioritize the data privacy of our creators and partners. We collect only essential information required to secure brand partnerships and provide studio production services.</p>
          </section>
          <section>
            <h2 className="text-gray-900 dark:text-white text-2xl font-black uppercase tracking-widest mb-6 transition-colors">2. Usage Rights</h2>
            <p>Your content metadata and engagement analytics are used solely for optimization and pitching purposes. We do not sell your personal data to third-party brokers.</p>
          </section>
          <section>
            <h2 className="text-gray-900 dark:text-white text-2xl font-black uppercase tracking-widest mb-6 transition-colors">3. Data Security</h2>
            <p>All sensitive information is protected by industry-standard encryption protocols. Our systems are audited regularly to ensure the safety of your intellectual property.</p>
          </section>
          <p className="pt-10 border-t border-gray-200 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 transition-colors">Last Updated: October 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
