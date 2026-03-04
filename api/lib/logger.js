// Structured logging with PII redaction

const SENSITIVE_FIELDS = [
  'email',
  'phoneNumber',
  'phone',
  'contactPerson',
  'brandName',
  'location',
  'message',
];

/**
 * Mask email address
 * @param {string} email
 * @returns {string}
 */
function maskEmail(email) {
  if (!email || typeof email !== 'string') return '***';
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const maskedLocal = local.substring(0, 2) + '***';
  const [domainName, tld] = domain.split('.');
  const maskedDomain = domainName.substring(0, 2) + '***';
  return `${maskedLocal}@${maskedDomain}.${tld || 'com'}`;
}

/**
 * Redact PII from data
 * @param {Object} data
 * @returns {Object}
 */
function redactPII(data) {
  if (!data || typeof data !== 'object') return data;

  const redacted = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_FIELDS.includes(key)) {
      if (key === 'email' && typeof value === 'string') {
        redacted[key] = maskEmail(value);
      } else if (typeof value === 'string') {
        redacted[key] = '***REDACTED***';
      } else {
        redacted[key] = value;
      }
    } else if (Array.isArray(value)) {
      redacted[key] = value.map(v =>
        typeof v === 'string' && SENSITIVE_FIELDS.includes(key) ? '***REDACTED***' : v
      );
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

/**
 * Create structured log entry
 * @param {string} level - 'info', 'warn', 'error'
 * @param {string} event - Event name
 * @param {Object} data - Log data
 * @param {Object} context - Request context
 */
export function log(level, event, data = {}, context = {}) {
  const timestamp = new Date().toISOString();

  const logEntry = {
    timestamp,
    level,
    event,
    data: redactPII(data),
    context: {
      ip: context.ip ? context.ip.substring(0, 7) + '***' : undefined,
      userAgent: context.userAgent,
      path: context.path,
      method: context.method,
    },
    service: 'consultation-api',
    version: '1.0.0',
  };

  // Remove undefined values
  Object.keys(logEntry).forEach(key => {
    if (logEntry[key] === undefined) {
      delete logEntry[key];
    }
  });

  // Output as JSON for structured logging
  const output = JSON.stringify(logEntry);

  if (level === 'error') {
    console.error(output);
  } else if (level === 'warn') {
    console.warn(output);
  } else {
    console.log(output);
  }
}

/**
 * Log security event
 * @param {string} event - Security event type
 * @param {Object} details - Event details
 * @param {Object} context - Request context
 */
export function logSecurity(event, details, context) {
  log('warn', `security:${event}`, details, context);
}

/**
 * Log rate limit event
 * @param {string} type - 'ip' or 'email'
 * @param {string} identifier - The limited identifier
 * @param {Object} context - Request context
 */
export function logRateLimit(type, identifier, context) {
  logSecurity('rate_limit', { type, identifier: identifier?.substring(0, 10) + '***' }, context);
}

/**
 * Log validation failure
 * @param {Array} errors - Validation errors
 * @param {Object} context - Request context
 */
export function logValidationFailure(errors, context) {
  logSecurity('validation_failure', {
    errorCount: errors.length,
    errorTypes: errors.map(e => e.path?.join('.')).filter(Boolean)
  }, context);
}

/**
 * Log spam detection
 * @param {string} reason - Why it was flagged as spam
 * @param {Object} context - Request context
 */
export function logSpam(reason, context) {
  logSecurity('spam_detected', { reason }, context);
}
