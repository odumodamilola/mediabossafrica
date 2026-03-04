import { z } from 'zod';

export const BUDGET_OPTIONS = [
  'NGN 1,000,000 - NGN 5,000,000',
  'NGN 5,000,000+',
  "I'm not sure yet",
  '',
];

const commonMetaFields = {
  _gotcha: z.string().max(0, 'Invalid submission').optional(),
  _startTime: z.number().optional(),
  _turnstileToken: z.string().max(2048, 'Invalid captcha token').optional(),
};

export const consultationSchema = z.object({
  formType: z.literal('consultation').optional(),
  brandName: z.string().min(1, 'Brand name is required').max(100, 'Brand name too long'),
  contactPerson: z.string().min(1, 'Contact person is required').max(100, 'Name too long'),
  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email too long')
    .transform((val) => val.toLowerCase().trim()),
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .max(15, 'Phone number too long')
    .regex(/^\d{7,15}$/, 'Phone number must contain only numbers'),
  website: z.string().max(500, 'URL too long').optional().or(z.literal('')),
  industry: z.string().min(1, 'Industry is required').max(100, 'Industry too long'),
  location: z.string().min(1, 'Location is required').max(200, 'Location too long'),
  goals: z.array(z.string().max(100)).max(10, 'Too many goals selected').default([]),
  kpis: z.string().max(1000, 'KPIs text too long').optional(),
  targetAudience: z.string().min(1, 'Target audience is required').max(2000, 'Description too long'),
  platforms: z.array(z.string().max(50)).max(10, 'Too many platforms selected').default([]),
  services: z.array(z.string().max(100)).max(10, 'Too many services selected').default([]),
  campaignIdea: z.string().max(5000, 'Campaign idea too long').optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional().or(z.literal('')),
  duration: z.string().max(100, 'Duration too long').optional(),
  budget: z.enum(BUDGET_OPTIONS, { required_error: 'Please select a budget range' }),
  pastExperience: z.string().max(2000, 'Text too long').optional(),
  successfulStrategies: z.string().max(2000, 'Text too long').optional(),
  challenges: z.string().max(2000, 'Text too long').optional(),
  brandPersonality: z.string().max(1000, 'Text too long').optional(),
  admiredBrands: z.string().max(1000, 'Text too long').optional(),
  additionalInfo: z.string().max(3000, 'Text too long').optional(),
  ...commonMetaFields,
}).strict();

export const contactSchema = z.object({
  formType: z.literal('contact'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email too long')
    .transform((val) => val.toLowerCase().trim()),
  category: z.string().min(1, 'Category is required').max(100, 'Category too long'),
  message: z.string().min(5, 'Message is too short').max(3000, 'Message too long'),
  ...commonMetaFields,
}).strict();

export const applySchema = z.object({
  formType: z.literal('apply'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string()
    .email('Invalid email format')
    .max(254, 'Email too long')
    .transform((val) => val.toLowerCase().trim()),
  platformLink: z.string().min(3, 'Primary platform link is required').max(500, 'Link too long'),
  followerCount: z.string().min(1, 'Follower count is required').max(50, 'Follower count too long'),
  niche: z.string().min(1, 'Primary niche is required').max(100, 'Niche too long'),
  whyMediaboss: z.string().min(5, 'Please share a short reason').max(3000, 'Response too long'),
  ...commonMetaFields,
}).strict();

// Sanitize user input to prevent injection attacks
export function sanitizeForEmail(data) {
  const emailRegex = /[\r\n]/g;
  const htmlRegex = /<[^>]*>/g;
  const nullRegex = /\x00/g;

  const sanitize = (value) => {
    if (typeof value !== 'string') return value;
    return value
      .replace(emailRegex, '')
      .replace(htmlRegex, '')
      .replace(nullRegex, '')
      .trim();
  };

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, sanitize(value)];
      }
      if (Array.isArray(value)) {
        return [key, value.map((v) => (typeof v === 'string' ? sanitize(v) : v))];
      }
      return [key, value];
    })
  );
}

export function normalizeInput(data) {
  if (!data || typeof data !== 'object') return data;

  const normalizeString = (value) =>
    value
      .replace(/[\r\n]/g, ' ')
      .replace(/\x00/g, '')
      .trim();

  const normalizedEntries = Object.entries(data).map(([key, value]) => {
    if (typeof value === 'string') {
      return [key, normalizeString(value)];
    }
    if (Array.isArray(value)) {
      return [
        key,
        value.map((item) => (typeof item === 'string' ? normalizeString(item) : item)),
      ];
    }
    if (value && typeof value === 'object') {
      return [key, normalizeInput(value)];
    }
    return [key, value];
  });

  return Object.fromEntries(normalizedEntries);
}

export function validateWebsite(url) {
  if (!url || url === '') return '';
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.')
    ) {
      return '';
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

export async function hashData(data) {
  const encoder = new TextEncoder();
  const dataString = JSON.stringify(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(dataString));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function sanitizeSubject(subject) {
  if (typeof subject !== 'string') return 'Unknown';
  return subject
    .replace(/[\r\n]/g, '')
    .substring(0, 100)
    .trim() || 'New Submission';
}
