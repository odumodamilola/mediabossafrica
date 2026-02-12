
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 bg-brand-deep">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          Frequently Asked <span className="text-brand-magenta">Questions</span>
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-white/10 rounded-2xl overflow-hidden transition-all ${
                openIndex === idx ? 'bg-white/5' : 'bg-transparent'
              }`}
            >
              <button 
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className={`text-brand-magenta transform transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
              </button>
              {openIndex === idx && (
                <div className="p-6 pt-0 text-white/60 border-t border-white/5 animate-in slide-in-from-top-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
