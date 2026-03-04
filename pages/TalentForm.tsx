import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Clock, Info, ShieldCheck, Mail, Phone, Globe, Building2, User, Target, BarChart3, Users2, Layout, Sparkles, Send } from 'lucide-react';

// --- Types ---

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
  otherGoals: string;
  otherPlatforms: string;
  otherServices: string;
  _gotcha: string;
  _startTime: number;
  _turnstileToken?: string;
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
  otherGoals: '',
  otherPlatforms: '',
  otherServices: '',
    _gotcha: '',
    _startTime: Date.now(),
    _turnstileToken: '',
};

// --- Components ---

const ConsultationLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-void text-white">
      {/* Full-bleed background hero image */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear scale-110 motion-safe:animate-[slow-zoom_20s_infinite_alternate]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')" }}
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-void/40 via-brand-void/60 to-brand-void/90 md:bg-brand-void/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 max-w-2xl"
          >
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
              Mediaboss Africa – Client Consultation Form
            </h1>
            <p className="text-sm md:text-base text-white/70">
              Let’s get to know your brand so we can build bold, creative campaigns that convert. Please fill out the form below to help us tailor your consultation.
            </p>
            <div className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-magenta">
              <Clock className="w-3 h-3" />
              <span>Takes 2–3 minutes</span>
            </div>
          </motion.div>

          <div className="w-full max-w-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
    <motion.div
      className="h-full bg-brand-magenta shadow-[0_0_10px_#ff00a0]"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    />
  </div>
);

const OptionCards: React.FC<{
  options: string[];
  selected: string | string[];
  onChange: (value: string) => void;
  type?: 'checkbox' | 'radio';
}> = ({ options, selected, onChange, type = 'checkbox' }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = Array.isArray(selected) ? selected.includes(option) : selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
              isSelected
                ? 'border-brand-magenta bg-brand-magenta/10 shadow-[0_0_15px_rgba(255,0,160,0.1)]'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
            }`}
          >
            <div className={`flex h-5 w-5 items-center justify-center rounded-lg border transition-all ${
              isSelected ? 'border-brand-magenta bg-brand-magenta' : 'border-white/20'
            }`}>
              {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
            </div>
            <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const FieldRenderer: React.FC<{
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}> = ({ label, icon, error, children }) => (
  <div className="space-y-2">
    {label && (
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50">
        {icon}
        {label}
      </label>
    )}
    <div className="relative">
      {children}
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs font-medium text-red-400"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const inputBaseClass = "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition-all duration-200 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta placeholder:text-white/30";

// --- Main Form Logic ---

const TalentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const groups = [
    {
      id: 'brand',
      title: 'About your brand',
      fields: ['brandName', 'contactPerson', 'email', 'phoneNumber', 'website'],
      render: () => (
        <div className="space-y-6">
          <FieldRenderer label="Business/Brand Name" icon={<Building2 className="w-3 h-3" />} error={errors.brandName}>
            <input className={inputBaseClass} placeholder="Enter your business name" value={formData.brandName} onChange={(e) => updateField('brandName', e.target.value)} />
          </FieldRenderer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldRenderer label="Contact Person" icon={<User className="w-3 h-3" />} error={errors.contactPerson}>
              <input className={inputBaseClass} placeholder="Your name" value={formData.contactPerson} onChange={(e) => updateField('contactPerson', e.target.value)} />
            </FieldRenderer>
            <FieldRenderer label="Email Address" icon={<Mail className="w-3 h-3" />} error={errors.email}>
              <input className={inputBaseClass} type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
            </FieldRenderer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldRenderer label="Phone Number" icon={<Phone className="w-3 h-3" />} error={errors.phoneNumber}>
              <input
                className={inputBaseClass}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                name="phoneNumber"
                placeholder="e.g. 08012345678"
                value={formData.phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
              />
            </FieldRenderer>
            <FieldRenderer label="Website / Social Links" icon={<Globe className="w-3 h-3" />} error={errors.website}>
              <input className={inputBaseClass} placeholder="www.yourbrand.com" value={formData.website} onChange={(e) => updateField('website', e.target.value)} />
            </FieldRenderer>
          </div>
        </div>
      )
    },
    {
      id: 'aims',
      title: 'What you’re aiming for',
      fields: ['industry', 'location', 'goals', 'kpis'],
      render: () => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldRenderer label="Industry / Niche" icon={<Target className="w-3 h-3" />} error={errors.industry}>
              <input className={inputBaseClass} placeholder="e.g. Fintech, Fashion" value={formData.industry} onChange={(e) => updateField('industry', e.target.value)} />
            </FieldRenderer>
            <FieldRenderer label="Location" icon={<Globe className="w-3 h-3" />} error={errors.location}>
              <input className={inputBaseClass} placeholder="City, Country" value={formData.location} onChange={(e) => updateField('location', e.target.value)} />
            </FieldRenderer>
          </div>
          <FieldRenderer label="Main Goals" icon={<Target className="w-3 h-3" />} error={errors.goals}>
            <OptionCards options={goalOptions} selected={formData.goals} onChange={(val) => toggleArray('goals', val)} />
            <AnimatePresence>
              {formData.goals.includes('Other') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                  <input
                    className={inputBaseClass}
                    placeholder="Please specify other goals"
                    value={formData.otherGoals}
                    onChange={(e) => updateField('otherGoals', e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </FieldRenderer>
          <FieldRenderer label="KPIs (optional)" icon={<BarChart3 className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={3} placeholder="How will we measure success?" value={formData.kpis} onChange={(e) => updateField('kpis', e.target.value)} />
          </FieldRenderer>
        </div>
      )
    },
    {
      id: 'audience',
      title: 'Who we’re speaking to',
      fields: ['targetAudience', 'platforms'],
      render: () => (
        <div className="space-y-6">
          <FieldRenderer label="Target Audience" icon={<Users2 className="w-3 h-3" />} error={errors.targetAudience}>
            <textarea className={inputBaseClass} rows={4} placeholder="Describe your ideal customer/audience" value={formData.targetAudience} onChange={(e) => updateField('targetAudience', e.target.value)} />
          </FieldRenderer>
          <FieldRenderer label="Audience Platforms" icon={<Layout className="w-3 h-3" />} error={errors.platforms}>
            <OptionCards options={platformOptions} selected={formData.platforms} onChange={(val) => toggleArray('platforms', val)} />
            <AnimatePresence>
              {formData.platforms.includes('Other') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                  <input
                    className={inputBaseClass}
                    placeholder="Please specify other platforms"
                    value={formData.otherPlatforms}
                    onChange={(e) => updateField('otherPlatforms', e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </FieldRenderer>
        </div>
      )
    },
    {
      id: 'needs',
      title: 'What you need from us',
      fields: ['services', 'campaignIdea'],
      render: () => (
        <div className="space-y-6">
          <FieldRenderer label="Services Needed" icon={<Sparkles className="w-3 h-3" />} error={errors.services}>
            <OptionCards options={serviceOptions} selected={formData.services} onChange={(val) => toggleArray('services', val)} />
            <AnimatePresence>
              {formData.services.includes('Other') && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                  <input
                    className={inputBaseClass}
                    placeholder="Please specify other services"
                    value={formData.otherServices}
                    onChange={(e) => updateField('otherServices', e.target.value)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </FieldRenderer>
          <FieldRenderer label="Campaign Idea" icon={<Sparkles className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={4} placeholder="Do you have a specific project or idea in mind?" value={formData.campaignIdea} onChange={(e) => updateField('campaignIdea', e.target.value)} />
          </FieldRenderer>
        </div>
      )
    },
    {
      id: 'timeline',
      title: 'Timeline & budget',
      fields: ['startDate', 'duration', 'budget'],
      render: () => (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldRenderer label="Start Date" icon={<Clock className="w-3 h-3" />}>
              <input className={inputBaseClass} type="date" value={formData.startDate} onChange={(e) => updateField('startDate', e.target.value)} />
            </FieldRenderer>
            <FieldRenderer label="Estimated Duration" icon={<Clock className="w-3 h-3" />}>
              <input className={inputBaseClass} placeholder="e.g. 3 months" value={formData.duration} onChange={(e) => updateField('duration', e.target.value)} />
            </FieldRenderer>
          </div>
          <FieldRenderer label="Budget Range" icon={<BarChart3 className="w-3 h-3" />} error={errors.budget}>
            <OptionCards options={budgetOptions} selected={formData.budget} onChange={(val) => updateField('budget', val)} type="radio" />
          </FieldRenderer>
        </div>
      )
    },
    {
      id: 'history',
      title: 'What you’ve tried before',
      fields: ['pastExperience', 'successfulStrategies', 'challenges'],
      render: () => (
        <div className="space-y-6">
          <FieldRenderer label="Past Experience" icon={<Info className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={3} placeholder="Have you worked with agencies or influencers before?" value={formData.pastExperience} onChange={(e) => updateField('pastExperience', e.target.value)} />
          </FieldRenderer>
          <FieldRenderer label="Successful Strategies" icon={<Info className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={3} placeholder="What has worked well for you in the past?" value={formData.successfulStrategies} onChange={(e) => updateField('successfulStrategies', e.target.value)} />
          </FieldRenderer>
          <FieldRenderer label="Challenges" icon={<Info className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={3} placeholder="What hurdles are you currently facing?" value={formData.challenges} onChange={(e) => updateField('challenges', e.target.value)} />
          </FieldRenderer>
        </div>
      )
    },
    {
      id: 'vibe',
      title: 'Brand vibe',
      fields: ['brandPersonality', 'admiredBrands', 'additionalInfo'],
      render: () => (
        <div className="space-y-6">
          <FieldRenderer label="Brand Personality" icon={<Sparkles className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={3} placeholder="How would you describe your brand's voice?" value={formData.brandPersonality} onChange={(e) => updateField('brandPersonality', e.target.value)} />
          </FieldRenderer>
          <FieldRenderer label="Admired Brands" icon={<Sparkles className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={3} placeholder="Which brands do you look up to and why?" value={formData.admiredBrands} onChange={(e) => updateField('admiredBrands', e.target.value)} />
          </FieldRenderer>
          <FieldRenderer label="Additional Info" icon={<Info className="w-3 h-3" />}>
            <textarea className={inputBaseClass} rows={3} placeholder="Anything else we should know?" value={formData.additionalInfo} onChange={(e) => updateField('additionalInfo', e.target.value)} />
          </FieldRenderer>
        </div>
      )
    },
    {
      id: 'review',
      title: 'Review',
      render: () => (
        <div className="space-y-6">
          <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-lg">Submission Summary</h3>
              <ShieldCheck className="w-5 h-5 text-green-400" />
            </div>
            <div className="p-6 space-y-6">
              {[
                { label: 'Brand', value: formData.brandName, groupIndex: 0 },
                { label: 'Contact', value: formData.contactPerson, groupIndex: 0 },
                { label: 'Services', value: formData.services.join(', '), groupIndex: 3 },
                { label: 'Budget', value: formData.budget, groupIndex: 4 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">{item.label}</p>
                    <p className="text-sm font-medium mt-1">{item.value || '-'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToGroup(item.groupIndex)}
                    className="text-xs font-bold text-brand-magenta hover:underline uppercase tracking-widest"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-white/40">
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      )
    }
  ];

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }
  };

  const toggleArray = (key: 'goals' | 'platforms' | 'services', value: string) => {
    setFormData((prev) => {
      const current = prev[key];
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
      return { ...prev, [key]: next };
    });
    if (errors[key]) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 15);
    updateField('phoneNumber', digitsOnly);
  };

  const validateGroup = (index: number) => {
    const group = groups[index];
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (group.id === 'brand') {
      if (!formData.brandName.trim()) newErrors.brandName = 'Required';
      if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Required';
      if (!formData.email.trim()) newErrors.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
      else if (!/^\d{7,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Use numbers only (7-15 digits)';
    } else if (group.id === 'aims') {
      if (!formData.industry.trim()) newErrors.industry = 'Required';
      if (!formData.location.trim()) newErrors.location = 'Required';
      if (formData.goals.length === 0) newErrors.goals = 'Select at least one';
    } else if (group.id === 'audience') {
      if (!formData.targetAudience.trim()) newErrors.targetAudience = 'Required';
      if (formData.platforms.length === 0) newErrors.platforms = 'Select at least one';
    } else if (group.id === 'needs') {
      if (formData.services.length === 0) newErrors.services = 'Select at least one';
    } else if (group.id === 'timeline') {
      if (!formData.budget) newErrors.budget = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextGroup = () => {
    if (validateGroup(currentGroup)) {
      setDirection(1);
      setCurrentGroup((prev) => Math.min(prev + 1, groups.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Small shake animation or scroll to first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementsByName(firstError)[0]?.focus();
      }
    }
  };

  const prevGroup = () => {
    setDirection(-1);
    setCurrentGroup((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToGroup = (index: number) => {
    setDirection(index > currentGroup ? 1 : -1);
    setCurrentGroup(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    const submissionData = { ...formData };
    
    // Merge 'Other' values into the main arrays
    if (submissionData.goals.includes('Other') && submissionData.otherGoals) {
      submissionData.goals = submissionData.goals.map(g => g === 'Other' ? `Other: ${submissionData.otherGoals}` : g);
    }
    if (submissionData.platforms.includes('Other') && submissionData.otherPlatforms) {
      submissionData.platforms = submissionData.platforms.map(p => p === 'Other' ? `Other: ${submissionData.otherPlatforms}` : p);
    }
    if (submissionData.services.includes('Other') && submissionData.otherServices) {
      submissionData.services = submissionData.services.map(s => s === 'Other' ? `Other: ${submissionData.otherServices}` : s);
    }

    const payload = {
      formType: submissionData.formType,
      brandName: submissionData.brandName,
      contactPerson: submissionData.contactPerson,
      email: submissionData.email,
      phoneNumber: submissionData.phoneNumber,
      website: submissionData.website,
      industry: submissionData.industry,
      location: submissionData.location,
      goals: submissionData.goals,
      kpis: submissionData.kpis,
      targetAudience: submissionData.targetAudience,
      platforms: submissionData.platforms,
      services: submissionData.services,
      campaignIdea: submissionData.campaignIdea,
      startDate: submissionData.startDate,
      duration: submissionData.duration,
      budget: submissionData.budget,
      pastExperience: submissionData.pastExperience,
      successfulStrategies: submissionData.successfulStrategies,
      challenges: submissionData.challenges,
      brandPersonality: submissionData.brandPersonality,
      admiredBrands: submissionData.admiredBrands,
      additionalInfo: submissionData.additionalInfo,
      _gotcha: submissionData._gotcha,
      _startTime: submissionData._startTime,
      _turnstileToken: submissionData._turnstileToken,
    };

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responsePayload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setErrors({ submit: responsePayload?.error || 'Submission failed. Please try again.' });
        return;
      }

      setIsSubmitted(true);
    } catch {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <ConsultationLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[2.5rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-8 md:p-12 text-center space-y-6"
        >
          <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-green-400" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-display font-black">Application Received</h2>
          <p className="text-white/60">
            Thanks. Your consultation request has been sent to our team. We will contact you shortly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-magenta px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 active:scale-95"
          >
            Back to Home
          </button>
        </motion.div>
      </ConsultationLayout>
    );
  }

  const progress = ((currentGroup + 1) / groups.length) * 100;

  return (
    <ConsultationLayout>
      <ProgressBar progress={progress} />

      <div className="relative">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/10 backdrop-blur-2xl p-6 md:p-10 shadow-2xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-display font-bold text-white">
              {groups[currentGroup].title}
            </h2>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              Step {currentGroup + 1} of {groups.length}
            </span>
          </div>

          <form onSubmit={submit}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentGroup}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -50 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="min-h-[300px]"
              >
                {groups[currentGroup].render()}
              </motion.div>
            </AnimatePresence>

            {/* Honeypot */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="website-url">Leave empty</label>
              <input id="website-url" value={formData._gotcha} onChange={(e) => updateField('_gotcha', e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            {errors.submit && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl bg-red-500/20 p-4 text-sm text-red-200 border border-red-500/50"
              >
                {errors.submit}
              </motion.p>
            )}

            <div className="mt-12 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={prevGroup}
                disabled={currentGroup === 0}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
                  currentGroup === 0 ? 'opacity-0 pointer-events-none' : 'text-white/40 hover:text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {currentGroup < groups.length - 1 ? (
                <button
                  type="button"
                  onClick={nextGroup}
                  className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-void transition-all hover:bg-brand-magenta hover:text-white active:scale-95"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-2 rounded-2xl bg-brand-magenta px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-[0_0_20px_rgba(255,0,160,0.4)] active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              )}
            </div>
            <p className="mt-4 text-center text-[11px] text-white/40">
              By submitting, you consent to secure processing and authorized follow-up by Mediaboss Africa.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1.1); }
          to { transform: scale(1.2); }
        }
      `}</style>
    </ConsultationLayout>
  );
};

export default TalentForm;
