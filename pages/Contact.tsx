import React, { useState } from 'react';

type ContactPayload = {
  formType: 'contact';
  name: string;
  email: string;
  category: string;
  message: string;
  _gotcha: string;
  _startTime: number;
  _turnstileToken?: string;
};

const inputClass =
  'w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-6 py-4 text-gray-900 dark:text-white outline-none transition-colors focus:border-brand-magenta';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<ContactPayload>({
    formType: 'contact',
    name: '',
    email: '',
    category: 'brand',
    message: '',
    _gotcha: '',
    _startTime: Date.now(),
    _turnstileToken: '',
  });

  const updateField = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState === 'submitting') return;

    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMessage(payload?.error || 'Failed to send message. Please try again.');
        setFormState('idle');
        return;
      }

      setFormState('success');
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setFormState('idle');
    }
  };

  return (
    <div className="pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-24 items-start">
          <div>
            <span className="text-brand-magenta text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase mb-4 sm:mb-6 block">Let's Work Together</span>
            <p className="text-gray-500 dark:text-white/50 text-lg sm:text-xl font-light mb-8 sm:mb-12 leading-relaxed max-w-lg transition-colors">
              Whether you are a brand, talent, or partner, send us a message and we will reply shortly.
            </p>
            <div className="space-y-4 sm:space-y-6 text-gray-700 dark:text-white/70">
              <p className="text-sm sm:text-base"><strong>Email:</strong> info@mediabossafrica.com</p>
              <p className="text-sm sm:text-base"><strong>Location:</strong> Lagos, Nigeria</p>
            </div>
          </div>

          <div className="glass-morphism p-8 sm:p-12 md:p-16 rounded-[40px] sm:rounded-[64px] relative shadow-2xl">
            {formState === 'success' ? (
              <div className="text-center space-y-6 py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-magenta rounded-full mx-auto flex items-center justify-center text-white text-3xl sm:text-4xl shadow-lg">?</div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-gray-900 dark:text-white">Message Received</h3>
                <p className="text-gray-500 dark:text-white/40 text-base sm:text-lg">Your message was sent directly to our inbox.</p>
                <button
                  onClick={() => {
                    setFormState('idle');
                    setFormData((prev) => ({ ...prev, name: '', email: '', category: 'brand', message: '', _gotcha: '', _startTime: Date.now() }));
                  }}
                  className="text-brand-magenta font-black uppercase tracking-widest text-[10px] sm:text-xs hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit} aria-label="Contact Form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/40 ml-2">Your Name</label>
                    <input
                      required
                      id="name"
                      type="text"
                      className={inputClass}
                      placeholder="e.g. Damilola Cole"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/40 ml-2">Email Address</label>
                    <input
                      required
                      id="email"
                      type="email"
                      className={inputClass}
                      placeholder="e.g. cole@email.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/40 ml-2">What are you looking for?</label>
                  <select
                    required
                    id="category"
                    className={inputClass}
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                  >
                    <option value="brand">I'm a Brand / Business</option>
                    <option value="talent">I'm a Creator / Talent</option>
                    <option value="studio">Studio Production Inquiry</option>
                    <option value="partnership">Brand Partnership / Endorsement</option>
                    <option value="media">Media Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/40 ml-2">Your Message</label>
                  <textarea
                    required
                    id="message"
                    rows={4}
                    className={inputClass}
                    placeholder="Tell us about your brand, your goals, or how you'd like to work together..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </div>
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="contact-gotcha">Leave empty</label>
                  <input id="contact-gotcha" value={formData._gotcha} onChange={(e) => updateField('_gotcha', e.target.value)} />
                </div>
                {errorMessage && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">{errorMessage}</p>}
                <button
                  disabled={formState === 'submitting'}
                  className="w-full bg-brand-magenta text-white py-5 sm:py-6 rounded-2xl sm:rounded-3xl text-lg sm:text-xl font-black shadow-[0_20px_40px_-10px_rgba(255,0,160,0.5)] hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Us a Brief'}
                </button>
                <p className="text-center text-[11px] text-gray-500 dark:text-white/40">
                  By submitting, you consent to secure processing and authorized follow-up by Mediaboss Africa.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
