import { Resend } from 'resend';
import {
  consultationSchema,
  contactSchema,
  applySchema,
  sanitizeForEmail,
  sanitizeSubject,
  validateWebsite,
} from './lib/validation.js';
import { checkRateLimit, validateNonce } from './lib/rateLimit.js';
import { checkDuplicate, markSubmitted } from './lib/dedup.js';
import { log, logSecurity, logValidationFailure, logSpam } from './lib/logger.js';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  'https://mediabossafrica.com',
  'https://www.mediabossafrica.com',
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:5173'] : []),
];

const FORM_SCHEMAS = {
  consultation: consultationSchema,
  contact: contactSchema,
  apply: applySchema,
};

export default async function handler(req, res) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

  const context = {
    ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
    userAgent: req.headers['user-agent'],
    path: req.url,
    method: req.method,
    requestId,
  };

  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Request-ID', requestId);

  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    logSecurity('method_not_allowed', { method: req.method }, context);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      req.body = body;
    } catch {
      logSecurity('invalid_json', {}, context);
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    const bodySize = Buffer.byteLength(JSON.stringify(body || {}), 'utf8');
    if (bodySize > 100 * 1024) {
      logSecurity('payload_too_large', { bodySize }, context);
      return res.status(413).json({ error: 'Payload too large' });
    }

    const rateLimitResult = await checkRateLimit(req);
    if (!rateLimitResult.success) {
      logSecurity(
        'rate_limit_exceeded',
        {
          ip: rateLimitResult.ip,
          retryAfter: rateLimitResult.retryAfter,
        },
        context
      );
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.retryAfter,
      });
    }

    const formType = typeof body?.formType === 'string' ? body.formType : 'consultation';
    const schema = FORM_SCHEMAS[formType];

    if (!schema) {
      return res.status(400).json({ error: 'Unsupported form type' });
    }

    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      logValidationFailure(validationResult.error.issues, context);
      return res.status(400).json({
        error: 'Validation failed',
        errors: errors.slice(0, 10),
      });
    }

    const formData = validationResult.data;

    if (formData._gotcha && formData._gotcha.length > 0) {
      logSpam('honeypot_triggered', context);
      return res.status(200).json({ success: true, message: 'Submission received' });
    }

    if (typeof formData._startTime === 'number') {
      const submitTime = Date.now();
      const timeDiff = submitTime - formData._startTime;

      if (timeDiff < 5000) {
        logSpam('too_fast', { timeDiff }, context);
        return res.status(400).json({ error: 'Submission too fast. Please try again.' });
      }

      if (timeDiff > 1800000) {
        logSpam('form_expired', { timeDiff }, context);
        return res.status(400).json({ error: 'Form session expired. Please refresh and try again.' });
      }
    }

    if (formData._nonce && !validateNonce(formData._nonce)) {
      logSpam('invalid_nonce', {}, context);
      return res.status(400).json({ error: 'Invalid session. Please refresh and try again.' });
    }

    const duplicateCheck = await checkDuplicate(formData);
    if (duplicateCheck.isDuplicate) {
      logSecurity('duplicate_submission', { key: duplicateCheck.key }, context);
      return res.status(409).json({
        error: 'Duplicate submission detected',
        message: 'You have already submitted this form recently. Please wait a few minutes.',
      });
    }

    const sanitizedData = sanitizeForEmail(formData);

    if (sanitizedData.website) {
      sanitizedData.website = validateWebsite(sanitizedData.website);
    }
    if (sanitizedData.platformLink) {
      sanitizedData.platformLink = validateWebsite(sanitizedData.platformLink);
    }

    const emailContent = buildEmailContent(formType, sanitizedData);
    const subject = buildSubject(formType, sanitizedData);

    const emailResult = await resend.emails.send({
      from: 'Mediaboss Africa <noreply@mediabossafrica.com>',
      to: ['info@mediabossafrica.com'],
      replyTo: sanitizedData.email,
      subject: sanitizeSubject(subject),
      text: emailContent,
      headers: {
        'X-Request-ID': requestId,
        'X-Submission-Time': new Date().toISOString(),
        'X-Form-Type': formType,
      },
    });

    if (emailResult.error) {
      throw new Error(`Resend error: ${emailResult.error.message}`);
    }

    if (duplicateCheck.key) {
      markSubmitted(duplicateCheck.key);
    }

    log(
      'info',
      'submission_success',
      {
        formType,
        email: sanitizedData.email,
        duration: Date.now() - startTime,
      },
      context
    );

    return res.status(200).json({
      success: true,
      message: 'Submission received successfully',
      requestId,
    });
  } catch (error) {
    log(
      'error',
      'submission_error',
      {
        error: error.message,
      },
      context
    );

    return res.status(500).json({
      error: 'Failed to process submission. Please try again later.',
      requestId,
    });
  }
}

function buildSubject(formType, data) {
  if (formType === 'contact') {
    return `New Contact Inquiry: ${data.name}`;
  }
  if (formType === 'apply') {
    return `New Talent Application: ${data.name}`;
  }
  return `New Consultation: ${data.brandName}`;
}

function buildEmailContent(formType, data) {
  if (formType === 'contact') {
    return [
      'NEW CONTACT INQUIRY',
      '='.repeat(60),
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Category: ${data.category}`,
      '',
      'Message:',
      data.message || 'None provided',
      '',
      '='.repeat(60),
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n');
  }

  if (formType === 'apply') {
    return [
      'NEW TALENT APPLICATION',
      '='.repeat(60),
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Primary Platform: ${data.platformLink || 'None provided'}`,
      `Follower Count: ${data.followerCount}`,
      `Primary Niche: ${data.niche}`,
      '',
      'Why Mediaboss Africa:',
      data.whyMediaboss || 'None provided',
      '',
      '='.repeat(60),
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n');
  }

  const sections = [
    {
      title: 'BRAND/TALENT DETAILS',
      fields: [
        ['Brand Name', data.brandName],
        ['Contact Person', data.contactPerson],
        ['Email', data.email],
        ['Phone', data.phoneNumber],
        ['Website', data.website || 'None provided'],
        ['Industry', data.industry],
        ['Location', data.location],
      ],
    },
    {
      title: 'GOALS & OBJECTIVES',
      fields: [
        ['Goals', data.goals?.join(', ') || 'None selected'],
        ['KPIs', data.kpis || 'None provided'],
      ],
    },
    {
      title: 'AUDIENCE',
      fields: [
        ['Target Audience', data.targetAudience],
        ['Platforms', data.platforms?.join(', ') || 'None selected'],
      ],
    },
    {
      title: 'SERVICES',
      fields: [['Services Needed', data.services?.join(', ') || 'None selected']],
    },
    {
      title: 'PROJECT DETAILS',
      fields: [
        ['Campaign Idea', data.campaignIdea || 'None provided'],
        ['Start Date', data.startDate || 'Not specified'],
        ['Duration', data.duration || 'Not specified'],
        ['Budget Range', data.budget || 'Not specified'],
      ],
    },
    {
      title: 'MARKETING HISTORY',
      fields: [
        ['Past Experience', data.pastExperience || 'None provided'],
        ['Successful Strategies', data.successfulStrategies || 'None provided'],
        ['Challenges', data.challenges || 'None provided'],
      ],
    },
    {
      title: 'BRAND VOICE',
      fields: [
        ['Personality', data.brandPersonality || 'None provided'],
        ['Admired Brands', data.admiredBrands || 'None provided'],
      ],
    },
    {
      title: 'ADDITIONAL INFO',
      fields: [['Notes', data.additionalInfo || 'None provided']],
    },
  ];

  let email = 'NEW MEDIABOSS TALENT/CLIENT CONSULTATION REQUEST\n';
  email += '='.repeat(60) + '\n\n';

  for (const section of sections) {
    email += `${section.title}:\n`;
    email += '-'.repeat(section.title.length + 1) + '\n';
    for (const [label, value] of section.fields) {
      email += `${label}: ${value}\n`;
    }
    email += '\n';
  }

  email += '='.repeat(60) + '\n';
  email += `Submitted: ${new Date().toISOString()}\n`;

  return email;
}
