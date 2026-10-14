"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';

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
  'w-full rounded-2xl border border-border bg-card px-5 py-4 text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary text-sm';

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
    <div className="pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-primary text-[10px] sm:text-xs font-black tracking-[0.4em] uppercase mb-4 block">
                Let's Work Together
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-foreground mb-6 leading-tight">
                Connect with <br />
                <span className="text-primary italic">MediaBoss.</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed max-w-md">
                Whether you are a global brand seeking influence, an elite creator scaling your reach, or a partner exploring collaboration, we are here.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Inquiries</h4>
                  <a href="mailto:info@mediabossafrica.com" className="text-foreground hover:text-primary transition-colors font-semibold text-sm sm:text-base">
                    info@mediabossafrica.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Direct Line</h4>
                  <a href="tel:+2349029982101" className="text-foreground hover:text-primary transition-colors font-semibold text-sm sm:text-base">
                    +234 902 998 2101
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hub Location</h4>
                  <p className="text-foreground font-semibold text-sm sm:text-base">
                    Lagos, Nigeria (Global Capabilities)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-7 bg-card border border-border p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-12"
              >
                <div className="w-20 h-20 bg-primary/15 text-primary rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-foreground">Message Received</h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A senior partner will review your brief and follow up within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormState('idle');
                    setFormData((prev) => ({
                      ...prev,
                      name: '',
                      email: '',
                      category: 'brand',
                      message: '',
                      _gotcha: '',
                      _startTime: Date.now(),
                    }));
                  }}
                  className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact Form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                      Your Name *
                    </label>
                    <input
                      required
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={inputClass}
                      placeholder="e.g. Damilola Cole"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      required
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      placeholder="e.g. cole@company.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                    What are you looking for? *
                  </label>
                  <select
                    required
                    id="category"
                    name="category"
                    className={inputClass}
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                  >
                    <option value="brand">Brand Campaign / Strategy</option>
                    <option value="talent">Creator / Talent Representation</option>
                    <option value="studio">Studio Production Booking</option>
                    <option value="partnership">Brand Endorsement & Partnership</option>
                    <option value="media">Media & Press Inquiries</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                    Your Message / Brief *
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    className={inputClass}
                    placeholder="Tell us about your brand, campaign goals, timelines, or requirements..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </div>

                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="contact-gotcha">Leave empty</label>
                  <input
                    id="contact-gotcha"
                    value={formData._gotcha}
                    onChange={(e) => updateField('_gotcha', e.target.value)}
                  />
                </div>

                {errorMessage && (
                  <p className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive font-medium">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-primary text-primary-foreground py-4 sm:py-5 rounded-2xl text-sm sm:text-base font-black uppercase tracking-widest shadow-xl hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {formState === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending Brief...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Brief
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  By submitting, you consent to confidential processing by Mediaboss Africa.
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