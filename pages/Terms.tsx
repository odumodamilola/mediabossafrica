
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black mb-12 sm:mb-16 tracking-tighter text-gray-900 dark:text-white transition-colors">TERMS OF <span className="text-brand-magenta">SERVICE.</span></h1>
        <div className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-white/50 space-y-8 sm:space-y-10 leading-relaxed font-light transition-colors">
          <section>
            <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-black uppercase tracking-widest mb-4 sm:mb-6 transition-colors">1. Representation Engagement</h2>
            <p className="text-base sm:text-lg">By applying to Mediaboss Africa, you agree to a standard review of your public digital assets. Formal representation is only established through a signed Master Representation Agreement.</p>
          </section>
          <section>
            <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-black uppercase tracking-widest mb-4 sm:mb-6 transition-colors">2. Studio Governance</h2>
            <p className="text-base sm:text-lg">Use of Mediaboss Studios is subject to scheduling availability and adherece to our professional conduct protocols. Equipment usage requires priority booking for roster talent.</p>
          </section>
          <section>
            <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-black uppercase tracking-widest mb-4 sm:mb-6 transition-colors">3. Intellectual Property</h2>
            <p className="text-base sm:text-lg">All creative assets produced within the Mediaboss ecosystem remain the property of the creator, subject to specific usage rights granted to Mediaboss Africa for management and promotion purposes as defined in your contract.</p>
          </section>
          <p className="pt-8 sm:pt-10 border-t border-gray-200 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/30 transition-colors">Mediaboss Africa legal Entity: Lagos, Nigeria.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
