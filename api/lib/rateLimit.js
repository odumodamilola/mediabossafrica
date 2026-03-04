// Simple in-memory rate limiting store
// For production with multiple regions, use Redis or Vercel KV

const store = new Map();

// Rate limit configuration
const CONFIG = {
  ip: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 requests per 15 minutes per IP
  email: { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 requests per hour per email
  global: { windowMs: 60 * 1000, maxRequests: 20 }, // 20 requests per minute globally
};

function cleanup() {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanup, 5 * 60 * 1000);

export async function checkRateLimit(req) {
  const now = Date.now();
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
             req.headers['x-real-ip'] ||
             req.socket?.remoteAddress ||
             'unknown';

  // Get email from body if available
  let email = '';
  try {
    if (req.body?.email) {
      email = req.body.email.toLowerCase().trim();
    }
  } catch {
    // Ignore parsing errors
  }

  const results = {
    ip: { allowed: true, remaining: CONFIG.ip.maxRequests },
    email: { allowed: true, remaining: CONFIG.email.maxRequests },
    global: { allowed: true, remaining: CONFIG.global.maxRequests },
  };

  // Check IP rate limit
  const ipKey = `ratelimit:ip:${ip}`;
  const ipRecord = store.get(ipKey) || { count: 0, resetTime: now + CONFIG.ip.windowMs };

  if (now > ipRecord.resetTime) {
    ipRecord.count = 0;
    ipRecord.resetTime = now + CONFIG.ip.windowMs;
  }

  if (ipRecord.count >= CONFIG.ip.maxRequests) {
    results.ip = {
      allowed: false,
      retryAfter: Math.ceil((ipRecord.resetTime - now) / 1000),
      remaining: 0
    };
  } else {
    results.ip.remaining = CONFIG.ip.maxRequests - ipRecord.count;
  }

  // Check email rate limit (if email provided)
  if (email) {
    const emailKey = `ratelimit:email:${email}`;
    const emailRecord = store.get(emailKey) || { count: 0, resetTime: now + CONFIG.email.windowMs };

    if (now > emailRecord.resetTime) {
      emailRecord.count = 0;
      emailRecord.resetTime = now + CONFIG.email.windowMs;
    }

    if (emailRecord.count >= CONFIG.email.maxRequests) {
      results.email = {
        allowed: false,
        retryAfter: Math.ceil((emailRecord.resetTime - now) / 1000),
        remaining: 0
      };
    } else {
      results.email.remaining = CONFIG.email.maxRequests - emailRecord.count;
    }

    // Update email count if allowed
    if (results.email.allowed && results.ip.allowed) {
      emailRecord.count++;
      store.set(emailKey, emailRecord);
    }
  }

  // Check global rate limit
  const globalKey = 'ratelimit:global';
  const globalRecord = store.get(globalKey) || { count: 0, resetTime: now + CONFIG.global.windowMs };

  if (now > globalRecord.resetTime) {
    globalRecord.count = 0;
    globalRecord.resetTime = now + CONFIG.global.windowMs;
  }

  if (globalRecord.count >= CONFIG.global.maxRequests) {
    results.global = {
      allowed: false,
      retryAfter: Math.ceil((globalRecord.resetTime - now) / 1000),
      remaining: 0
    };
  }

  // Update counts if allowed
  if (results.ip.allowed && results.email.allowed && results.global.allowed) {
    ipRecord.count++;
    store.set(ipKey, ipRecord);

    globalRecord.count++;
    store.set(globalKey, globalRecord);
  }

  const success = results.ip.allowed && results.email.allowed && results.global.allowed;
  const retryAfter = Math.max(
    results.ip.retryAfter || 0,
    results.email.retryAfter || 0,
    results.global.retryAfter || 0
  );

  return {
    success,
    retryAfter: retryAfter > 0 ? retryAfter : undefined,
    limits: results,
    ip: ip.substring(0, 7) + '***' // Mask IP for logging
  };
}

// Generate a simple nonce for form submissions
export function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

// Check if nonce is valid (simple in-memory check)
const validNonces = new Set();
const nonceExpiry = new Map();

export function createNonce() {
  const nonce = generateNonce();
  validNonces.add(nonce);
  nonceExpiry.set(nonce, Date.now() + 30 * 60 * 1000); // 30 minute expiry
  return nonce;
}

export function validateNonce(nonce) {
  if (!nonce || typeof nonce !== 'string') return false;
  if (!validNonces.has(nonce)) return false;

  const expiry = nonceExpiry.get(nonce);
  if (!expiry || Date.now() > expiry) {
    validNonces.delete(nonce);
    nonceExpiry.delete(nonce);
    return false;
  }

  // Single use - remove after validation
  validNonces.delete(nonce);
  nonceExpiry.delete(nonce);
  return true;
}

// Cleanup old nonces periodically
setInterval(() => {
  const now = Date.now();
  for (const [nonce, expiry] of nonceExpiry.entries()) {
    if (now > expiry) {
      validNonces.delete(nonce);
      nonceExpiry.delete(nonce);
    }
  }
}, 10 * 60 * 1000); // Every 10 minutes
