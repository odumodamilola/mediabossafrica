import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FormData = {
  formType: 'consultation';
  brandName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  website: string;
  industry: string;
  location: string;
  goals: string[];
  kpis: string;
  targetAudience: string;
  platforms: string[];
  services: string[];
  campaignIdea: string;
  startDate: string;
  duration: string;
  budget: string;
  pastExperience: string;
  successfulStrategies: string;
  challenges: string;
  brandPersonality: string;
  admiredBrands: string;
  additionalInfo: string;
  _gotcha: string;
  _startTime: number;
};

const budgetOptions = ['NGN 1,000,000 - NGN 5,000,000', 'NGN 5,000,000+', "I'm not sure yet"];
const goalOptions = [
  'Increase brand awareness',
  'Drive sales or conversions',
  'Launch a new product/service',
  'Grow social media presence',
  'Training/Workshop',
  'Build community engagement',
  'Other',
];
const platformOptions = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'Facebook', 'Other'];
const serviceOptions = [
  'Influencer Marketing',
  'Talent Sourcing or Management',
  'Social Media Strategy',
  'Content Creation',
  'Paid Ads & Media Buying',
  'Event Promotion',
  'Brand Collaborations',
  'Social Media Marketing',
  'Other',
];

const initialFormData: FormData = {
  formType: 'consultation',
  brandName: '',
  contactPerson: '',
  email: '',
  phoneNumber: '',
  website: '',
  industry: '',
  location: '',
  goals: [],
  kpis: '',
  targetAudience: '',
  platforms: [],
  services: [],
  campaignIdea: '',
  startDate: '',
  duration: '',
  budget: '',
  pastExperience: '',
  successfulStrategies: '',
  challenges: '',
  brandPersonality: '',
  admiredBrands: '',
  additionalInfo: '',
  _gotcha: '',
  _startTime: Date.now(),
};

const inputClass =
  'w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-brand-magenta';

const steps = [
  'Brand Details',
  'Objectives',
  'Audience',
  'Services',
  'Project',
  'History',
  'Voice',
  'Review',
];

const TalentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidForSubmit = useMemo(() => {
    return (
      formData.brandName.trim() &&
      formData.contactPerson.trim() &&
      formData.email.trim() &&
      formData.phoneNumber.trim() &&
      formData.industry.trim() &&
      formData.location.trim() &&
      formData.goals.length > 0 &&
      formData.targetAudience.trim() &&
      formData.platforms.length > 0 &&
      formData.services.length > 0 &&
      formData.budget
    );
  }, [formData]);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrorMessage('');
  };

  const toggleArray = (key: 'goals' | 'platforms' | 'services', value: string) => {
    setFormData((prev) => {
      const current = prev[key];
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const validateStep = () => {
    if (currentStep === 0) {
      return (
        formData.brandName.trim() &&
        formData.contactPerson.trim() &&
        formData.email.trim() &&
        formData.phoneNumber.trim() &&
        formData.industry.trim() &&
        formData.location.trim()
      );
    }
    if (currentStep === 1) return formData.goals.length > 0;
    if (currentStep === 2) return formData.targetAudience.trim() && formData.platforms.length > 0;
    if (currentStep === 3) return formData.services.length > 0;
    if (currentStep === 4) return !!formData.budget;
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) {
      setErrorMessage('Please complete required fields in this section before continuing.');
      return;
    }
    setErrorMessage('');
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidForSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrorMessage(payload?.error || 'Submission failed. Please try again.');
        return;
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (currentStep === 0) {
      return (
        <section className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="Business/Brand Name" value={formData.brandName} onChange={(e) => updateField('brandName', e.target.value)} />
          <input className={inputClass} placeholder="Contact Person" value={formData.contactPerson} onChange={(e) => updateField('contactPerson', e.target.value)} />
          <input className={inputClass} type="email" placeholder="Email Address" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
          <input className={inputClass} placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => updateField('phoneNumber', e.target.value)} />
          <input className={inputClass} placeholder="Website / Social Links" value={formData.website} onChange={(e) => updateField('website', e.target.value)} />
          <input className={inputClass} placeholder="Industry / Niche" value={formData.industry} onChange={(e) => updateField('industry', e.target.value)} />
          <input className={`${inputClass} md:col-span-2`} placeholder="Location" value={formData.location} onChange={(e) => updateField('location', e.target.value)} />
        </section>
      );
    }

    if (currentStep === 1) {
      return (
        <section className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-white/50">Main Goals</p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {goalOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 p-3 text-sm">
                <input type="checkbox" checked={formData.goals.includes(option)} onChange={() => toggleArray('goals', option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <textarea className={inputClass} rows={3} placeholder="KPIs (optional)" value={formData.kpis} onChange={(e) => updateField('kpis', e.target.value)} />
        </section>
      );
    }

    if (currentStep === 2) {
      return (
        <section className="space-y-3">
          <textarea className={inputClass} rows={3} placeholder="Target Audience" value={formData.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} />
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-white/50">Audience Platforms</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {platformOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 p-3 text-sm">
                <input type="checkbox" checked={formData.platforms.includes(option)} onChange={() => toggleArray('platforms', option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </section>
      );
    }

    if (currentStep === 3) {
      return (
        <section className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-white/50">Services Needed</p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {serviceOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 p-3 text-sm">
                <input type="checkbox" checked={formData.services.includes(option)} onChange={() => toggleArray('services', option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </section>
      );
    }

    if (currentStep === 4) {
      return (
        <section className="grid gap-4 md:grid-cols-2">
          <textarea className={`${inputClass} md:col-span-2`} rows={3} placeholder="Campaign Idea" value={formData.campaignIdea} onChange={(e) => updateField('campaignIdea', e.target.value)} />
          <input className={inputClass} type="date" value={formData.startDate} onChange={(e) => updateField('startDate', e.target.value)} />
          <input className={inputClass} placeholder="Estimated Duration" value={formData.duration} onChange={(e) => updateField('duration', e.target.value)} />
          <div className="md:col-span-2">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-white/50">Budget</p>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {budgetOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 p-3 text-sm">
                  <input type="radio" name="budget" checked={formData.budget === option} onChange={() => updateField('budget', option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (currentStep === 5) {
      return (
        <section className="grid gap-4 md:grid-cols-2">
          <textarea className={inputClass} rows={3} placeholder="Past Experience" value={formData.pastExperience} onChange={(e) => updateField('pastExperience', e.target.value)} />
          <textarea className={inputClass} rows={3} placeholder="Successful Strategies" value={formData.successfulStrategies} onChange={(e) => updateField('successfulStrategies', e.target.value)} />
          <textarea className={`${inputClass} md:col-span-2`} rows={3} placeholder="Challenges" value={formData.challenges} onChange={(e) => updateField('challenges', e.target.value)} />
        </section>
      );
    }

    if (currentStep === 6) {
      return (
        <section className="grid gap-4 md:grid-cols-2">
          <textarea className={inputClass} rows={3} placeholder="Brand Personality" value={formData.brandPersonality} onChange={(e) => updateField('brandPersonality', e.target.value)} />
          <textarea className={inputClass} rows={3} placeholder="Admired Brands" value={formData.admiredBrands} onChange={(e) => updateField('admiredBrands', e.target.value)} />
          <textarea className={`${inputClass} md:col-span-2`} rows={3} placeholder="Additional Info" value={formData.additionalInfo} onChange={(e) => updateField('additionalInfo', e.target.value)} />
        </section>
      );
    }

    return (
      <section className="space-y-3 text-sm">
        <p className="text-gray-700 dark:text-white/70">Review your details before submitting.</p>
        <div className="rounded-xl border border-gray-200 dark:border-white/10 p-4 space-y-2 text-gray-700 dark:text-white/70">
          <p><strong>Brand:</strong> {formData.brandName || '-'}</p>
          <p><strong>Contact:</strong> {formData.contactPerson || '-'}</p>
          <p><strong>Email:</strong> {formData.email || '-'}</p>
          <p><strong>Services:</strong> {formData.services.join(', ') || '-'}</p>
          <p><strong>Budget:</strong> {formData.budget || '-'}</p>
        </div>
      </section>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-brand-deep flex items-center justify-center px-6">
        <div className="max-w-xl rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-10 text-center">
          <h1 className="text-3xl font-display font-black text-gray-900 dark:text-white">Application Received</h1>
          <p className="mt-4 text-gray-600 dark:text-white/60">Thanks. Your consultation request has been sent to our team. We will contact you shortly.</p>
          <button onClick={() => navigate('/')} className="mt-8 rounded-xl bg-brand-magenta px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-brand-void py-10 px-4">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-white/75 dark:bg-brand-void/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-deep p-6 md:p-10">
        <div className="mb-10 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-gradient-to-br from-white to-gray-50 dark:from-white/5 dark:to-white/[0.02] p-6 md:p-8">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-magenta">Mediaboss Africa</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-black tracking-tight text-gray-900 dark:text-white">Build influence that converts.</h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-600 dark:text-white/65">
            Tell us where your brand is now and where you want it to go. This form goes directly to our team inbox so we can reply with a clear plan.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-1 text-[11px] font-semibold text-gray-700 dark:text-white/70">Direct web mail delivery</span>
            <span className="rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-1 text-[11px] font-semibold text-gray-700 dark:text-white/70">Response within 48 hours</span>
            <span className="rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-1 text-[11px] font-semibold text-gray-700 dark:text-white/70">Strategy-led onboarding</span>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {steps.map((step, index) => (
            <button
              key={step}
              type="button"
              onClick={() => setCurrentStep(index)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${index === currentStep ? 'bg-brand-magenta text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70'}`}
            >
              {index + 1}. {step}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-8">
          {renderStep()}

          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="website-url">Leave empty</label>
            <input id="website-url" value={formData._gotcha} onChange={(e) => updateField('_gotcha', e.target.value)} />
          </div>

          {errorMessage && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">{errorMessage}</p>}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="rounded-xl border border-gray-200 dark:border-white/10 px-5 py-3 text-sm font-bold text-gray-700 dark:text-white/80 disabled:opacity-50"
            >
              Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button type="button" onClick={nextStep} className="rounded-xl bg-gray-900 dark:bg-white px-5 py-3 text-sm font-bold text-white dark:text-gray-900">
                Continue
              </button>
            ) : (
              <button type="submit" disabled={!isValidForSubmit || isSubmitting} className="rounded-xl bg-brand-magenta px-5 py-3 text-sm font-bold text-white disabled:opacity-60">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TalentForm;