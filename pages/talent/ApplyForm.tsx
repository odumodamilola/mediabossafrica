import React, { useState } from 'react';

type ApplyPayload = {
  formType: 'apply';
  name: string;
  email: string;
  platformLink: string;
  followerCount: string;
  niche: string;
  whyMediaboss: string;
  _gotcha: string;
  _startTime: number;
};

const inputClass =
  'w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-8 py-5 text-gray-900 dark:text-white outline-none transition-all';

const ApplyForm: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<ApplyPayload>({
    formType: 'apply',
    name: '',
    email: '',
    platformLink: '',
    followerCount: '10k - 50k',
    niche: 'Lifestyle & Tech',
    whyMediaboss: '',
    _gotcha: '',
    _startTime: Date.now(),
  });

  const updateField = <K extends keyof ApplyPayload>(key: K, value: ApplyPayload[K]) => {
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
        setErrorMessage(payload?.error || 'Failed to submit application. Please try again.');
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
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <span className="text-brand-magenta text-[11px] font-black tracking-[0.5em] uppercase mb-6 block">Talent Management & Development</span>
          <h1 className="text-6xl md:text-8xl font-display font-black mb-8 leading-tight tracking-tighter text-gray-900 dark:text-white">
            JOIN THE <br /> <span className="text-brand-magenta italic text-glow">ROSTER.</span>
          </h1>
          <p className="text-gray-500 dark:text-white/40 text-xl font-light max-w-2xl mx-auto">
            Apply for representation and we will review your profile.
          </p>
        </div>

        <div className="glass-morphism p-12 md:p-20 rounded-[64px] shadow-2xl relative overflow-hidden">
          {formState === 'success' ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-brand-magenta rounded-full mx-auto flex items-center justify-center text-white text-4xl mb-10 shadow-[0_0_30px_rgba(255,0,160,0.4)]">?</div>
              <h3 className="text-4xl font-display font-black mb-6 uppercase tracking-tight text-gray-900 dark:text-white">Application Received</h3>
              <p className="text-gray-500 dark:text-white/50 text-xl mb-12">Your application has been sent to our inbox for review.</p>
              <button
                onClick={() => {
                  setFormState('idle');
                  setFormData({
                    formType: 'apply',
                    name: '',
                    email: '',
                    platformLink: '',
                    followerCount: '10k - 50k',
                    niche: 'Lifestyle & Tech',
                    whyMediaboss: '',
                    _gotcha: '',
                    _startTime: Date.now(),
                  });
                }}
                className="px-10 py-5 border border-gray-200 dark:border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all text-gray-900 dark:text-white"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30 ml-2">Stage Name / Full Name</label>
                  <input
                    required
                    className={inputClass}
                    placeholder="e.g. Tunde Legend"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30 ml-2">Email Address</label>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder="e.g. talent@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30 ml-2">Primary Platform Link</label>
                  <input
                    required
                    className={inputClass}
                    placeholder="instagram.com/username"
                    value={formData.platformLink}
                    onChange={(e) => updateField('platformLink', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30 ml-2">Current Follower Count</label>
                  <select required className={inputClass} value={formData.followerCount} onChange={(e) => updateField('followerCount', e.target.value)}>
                    <option>10k - 50k</option>
                    <option>50k - 200k</option>
                    <option>200k - 1M</option>
                    <option>1M+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30 ml-2">Primary Niche</label>
                <select required className={inputClass} value={formData.niche} onChange={(e) => updateField('niche', e.target.value)}>
                  <option>Lifestyle & Tech</option>
                  <option>Beauty & Fashion</option>
                  <option>Entertainment & Music</option>
                  <option>Educational / Professional</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-white/30 ml-2">Why Mediaboss Africa?</label>
                <textarea
                  required
                  rows={5}
                  className={inputClass}
                  placeholder="What is your ultimate career goal?"
                  value={formData.whyMediaboss}
                  onChange={(e) => updateField('whyMediaboss', e.target.value)}
                />
              </div>

              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="apply-gotcha">Leave empty</label>
                <input id="apply-gotcha" value={formData._gotcha} onChange={(e) => updateField('_gotcha', e.target.value)} />
              </div>

              {errorMessage && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">{errorMessage}</p>}

              <button
                disabled={formState === 'submitting'}
                className="w-full py-8 bg-brand-magenta rounded-3xl font-black text-lg uppercase tracking-widest shadow-[0_20px_60px_-10px_rgba(255,0,160,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {formState === 'submitting' ? 'Processing Application...' : 'Submit Application'}
              </button>
            </form>
          )}

          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-magenta/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 blur-[120px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;