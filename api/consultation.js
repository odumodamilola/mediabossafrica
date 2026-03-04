import crypto from 'node:crypto';
import { Resend } from 'resend';
import {
  consultationSchema,
  contactSchema,
  applySchema,
  normalizeInput,
  sanitizeForEmail,
  sanitizeSubject,
  validateWebsite,
} from './lib/validation.js';
import { checkRateLimit } from './lib/rateLimit.js';
import { checkDuplicate, markSubmitted, redactIdempotencyKey } from './lib/dedup.js';
import { log, logSecurity, logValidationFailure, logSpam } from './lib/logger.js';
import { verifyTurnstile } from './lib/turnstile.js';

const resend = new Resend(process.env.RESEND_API_KEY);
const MAX_BODY_BYTES = 64 * 1024;
const FORM_MIN_SUBMIT_MS = 35 * 1000;
const FORM_MAX_SUBMIT_MS = 30 * 60 * 1000;
const isProduction = process.env.NODE_ENV === 'production';

const BASE_ALLOWED_ORIGINS = [
  'https://mediabossafrica.com',
  'https://www.mediabossafrica.com',
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
    : []),
  ...(isProduction ? [] : ['http://localhost:3000', 'http://localhost:5173']),
];

const ALLOWED_ORIGINS = Array.from(new Set(BASE_ALLOWED_ORIGINS));

const FORM_SCHEMAS = {
  consultation: consultationSchema,
  contact: contactSchema,
  apply: applySchema,
};

function getNormalizedOrigin(value) {
  if (!value || typeof value !== 'string') return '';
  try {
    return new URL(value).origin;
  } catch {
    return '';
  }
}

function resolveOrigin(req) {
  const origin = req.headers.origin;
  const refererOrigin = getNormalizedOrigin(req.headers.referer);
  const requestOrigin = getNormalizedOrigin(origin) || refererOrigin;
  const isAllowedOrigin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin);

  return { origin, refererOrigin, requestOrigin, isAllowedOrigin };
}

function setSecurityHeaders(res, requestId, requestOrigin) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Request-ID', requestId);
  res.setHeader('Vary', 'Origin');
  if (requestOrigin) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');
  res.setHeader('Access-Control-Max-Age', '600');
}

function contentLengthTooLarge(req) {
  const length = Number(req.headers['content-length'] || 0);
  return Number.isFinite(length) && length > MAX_BODY_BYTES;
}

function getClientIp(req) {
  const raw = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || '';
  return String(raw).split(',')[0]?.trim() || 'unknown';
}

function getFormTypeFromBody(body, allowedTypes) {
  const requested = typeof body?.formType === 'string' ? body.formType : allowedTypes[0];
  return allowedTypes.includes(requested) ? requested : null;
}

async function parseAndValidateBody(req, res, requestId, context, allowedTypes) {
  if (contentLengthTooLarge(req)) {
    logSecurity('payload_too_large_header', { contentLength: req.headers['content-length'] }, context);
    res.status(413).json({ error: 'Payload too large', requestId });
    return null;
  }

  const contentType = String(req.headers['content-type'] || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    logSecurity('unsupported_media_type', { contentType }, context);
    res.status(415).json({ error: 'Unsupported Media Type', requestId });
    return null;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    logSecurity('invalid_json', {}, context);
    res.status(400).json({ error: 'Invalid JSON body', requestId });
    return null;
  }

  const normalizedBody = normalizeInput(body || {});
  const bodySize = Buffer.byteLength(JSON.stringify(normalizedBody), 'utf8');
  if (bodySize > MAX_BODY_BYTES) {
    logSecurity('payload_too_large_runtime', { bodySize }, context);
    res.status(413).json({ error: 'Payload too large', requestId });
    return null;
  }

  const formType = getFormTypeFromBody(normalizedBody, allowedTypes);
  if (!formType) {
    logSecurity('invalid_form_type', { formType: normalizedBody?.formType }, context);
    res.status(400).json({ error: 'Unsupported form type', requestId });
    return null;
  }

  const schema = FORM_SCHEMAS[formType];
  const validationResult = schema.safeParse(normalizedBody);
  if (!validationResult.success) {
    logValidationFailure(validationResult.error.issues, context);
    res.status(400).json({
      error: 'Validation failed',
      requestId,
      errors: validationResult.error.issues.slice(0, 10).map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return null;
  }

  return { formType, formData: validationResult.data };
}

async function performSpamChecks(formData, req, res, requestId, context) {
  if (formData._gotcha && formData._gotcha.length > 0) {
    logSpam('honeypot_triggered', context);
    res.status(200).json({ success: true, message: 'Submission received', requestId });
    return false;
  }

  if (typeof formData._startTime === 'number') {
    const diff = Date.now() - formData._startTime;
    if (diff < FORM_MIN_SUBMIT_MS) {
      logSpam('too_fast', { diff }, context);
      res.status(400).json({ error: 'Submission too fast. Please try again.', requestId });
      return false;
    }
    if (diff > FORM_MAX_SUBMIT_MS) {
      logSpam('form_expired', { diff }, context);
      res.status(400).json({ error: 'Form session expired. Please refresh and try again.', requestId });
      return false;
    }
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = formData._turnstileToken;
    if (!token) {
      logSpam('missing_turnstile_token', context);
      res.status(400).json({ error: 'Verification required. Please refresh and try again.', requestId });
      return false;
    }
    const validTurnstile = await verifyTurnstile(token, getClientIp(req));
    if (!validTurnstile) {
      logSpam('invalid_turnstile_token', context);
      res.status(400).json({ error: 'Verification failed. Please try again.', requestId });
      return false;
    }
  }

  return true;
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

export function createHandler(allowedTypes = ['consultation', 'contact', 'apply']) {
  return async function handler(req, res) {
    const requestId = crypto.randomUUID();
    const startTime = Date.now();
    const context = {
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'],
      path: req.url,
      method: req.method,
      requestId,
    };

    const { origin, refererOrigin, requestOrigin, isAllowedOrigin } = resolveOrigin(req);
    setSecurityHeaders(res, requestId, isAllowedOrigin ? requestOrigin : '');

    if (req.method === 'OPTIONS') {
      if (!isAllowedOrigin) {
        logSecurity('forbidden_origin_preflight', { origin, refererOrigin }, context);
        return res.status(403).json({ error: 'Forbidden', requestId });
      }
      return res.status(204).end();
    }

    if (req.method !== 'POST') {
      logSecurity('method_not_allowed', { method: req.method }, context);
      return res.status(405).json({ error: 'Method Not Allowed', requestId });
    }

    if (!isAllowedOrigin) {
      logSecurity('forbidden_origin', { origin, refererOrigin }, context);
      return res.status(403).json({ error: 'Forbidden', requestId });
    }

    try {
      const parsed = await parseAndValidateBody(req, res, requestId, context, allowedTypes);
      if (!parsed) return;

      const { formType, formData } = parsed;
      const allowSubmission = await performSpamChecks(formData, req, res, requestId, context);
      if (!allowSubmission) return;

      const rateLimit = await checkRateLimit({ ...req, body: formData });
      if (rateLimit.unavailable) {
        logSecurity('rate_limit_unavailable', { error: rateLimit.error }, context);
        return res.status(503).json({
          error: 'Temporarily unavailable, please try again',
          requestId,
        });
      }
      if (!rateLimit.success) {
        logSecurity('rate_limit_exceeded', { retryAfter: rateLimit.retryAfter }, context);
        return res.status(429).json({
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimit.retryAfter,
          requestId,
        });
      }

      const idempotencyKeyRaw = req.headers['idempotency-key'];
      const idempotencyKey = typeof idempotencyKeyRaw === 'string' ? idempotencyKeyRaw : '';
      const duplicateCheck = await checkDuplicate(formData, idempotencyKey);
      if (duplicateCheck.unavailable) {
        logSecurity('dedup_unavailable', { idempotencyKey: redactIdempotencyKey(idempotencyKey) }, context);
        return res.status(503).json({
          error: 'Temporarily unavailable, please try again',
          requestId,
        });
      }
      if (duplicateCheck.isDuplicate) {
        logSecurity(
          'duplicate_submission',
          { idempotencyKey: redactIdempotencyKey(idempotencyKey) },
          context
        );
        return res.status(409).json({
          error: 'Duplicate submission detected',
          message: 'Your request was already received recently.',
          requestId,
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
      const subject = sanitizeSubject(buildSubject(formType, sanitizedData));
      const replyTo = typeof sanitizedData.email === 'string' ? sanitizedData.email : undefined;

      const emailResult = await resend.emails.send({
        from: 'Mediaboss Africa <noreply@mediabossafrica.com>',
        to: ['info@mediabossafrica.com'],
        replyTo,
        subject,
        text: emailContent,
        headers: {
          'X-Request-ID': requestId,
          'X-Form-Type': formType,
        },
      });

      if (emailResult.error) {
        throw new Error(`email_provider_error:${emailResult.error.message}`);
      }

      markSubmitted(duplicateCheck.key, duplicateCheck.idemKey);

      log(
        'info',
        'submission_success',
        { formType, duration: Date.now() - startTime },
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
        { error: error instanceof Error ? error.message : 'unknown_error' },
        context
      );

      return res.status(500).json({
        error: 'Failed to process submission. Please try again later.',
        requestId,
      });
    }
  };
}

export default createHandler(['consultation', 'contact', 'apply']);
