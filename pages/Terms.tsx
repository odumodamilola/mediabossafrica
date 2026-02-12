
import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-display font-black mb-16 tracking-tighter">TERMS OF <span className="text-brand-magenta">SERVICE.</span></h1>
        <div className="prose prose-invert prose-lg max-w-none text-white/50 space-y-10 leading-relaxed font-light">
          <section>
            <h2 className="text-white text-2xl font-black uppercase tracking-widest mb-6">1. Representation Engagement</h2>
            <p>By applying to Mediaboss Africa, you agree to a standard review of your public digital assets. Formal representation is only established through a signed Master Representation Agreement.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-black uppercase tracking-widest mb-6">2. Studio Governance</h2>
            <p>Use of Mediaboss Studios is subject to scheduling availability and adherece to our professional conduct protocols. Equipment usage requires priority booking for roster talent.</p>
          </section>
          <section>
            <h2 className="text-white text-2xl font-black uppercase tracking-widest mb-6">3. Intellectual Property</h2>
            <p>All creative assets produced within the Mediaboss ecosystem remain the property of the creator, subject to specific usage rights granted to Mediaboss Africa for management and promotion purposes as defined in your contract.</p>
          </section>
          <p className="pt-10 border-t border-white/5 text-[10px] font-black uppercase tracking-widest">Mediaboss Africa legal Entity: Lagos, Nigeria.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
