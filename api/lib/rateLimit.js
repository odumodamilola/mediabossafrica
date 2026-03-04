// Serverless-safe rate limiting with optional Upstash Redis REST backend.
// Fallback: in-memory map for local development.

const memoryStore = new Map();

const CONFIG = {
  ip: { windowSec: 15 * 60, maxRequests: 10 },
  email: { windowSec: 60 * 60, maxRequests: 6 },
  global: { windowSec: 60, maxRequests: 40 },
};

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const redisEnabled = Boolean(REDIS_URL && REDIS_TOKEN);

async function redisIncrWithExpiry(key, ttlSeconds) {
  const endpoint = `${REDIS_URL}/pipeline`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', key],
      ['EXPIRE', key, String(ttlSeconds), 'NX'],
      ['TTL', key],
    ]),
  });

  if (!response.ok) {
    throw new Error(`Redis pipeline failed: ${response.status}`);
  }

  const payload = await response.json();
  const count = Number(payload?.[0]?.result ?? 0);
  const ttl = Number(payload?.[2]?.result ?? ttlSeconds);
  return { count, ttl: Number.isFinite(ttl) && ttl > 0 ? ttl : ttlSeconds };
}

function cleanupMemoryStore() {
  const now = Date.now();
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.resetTime) {
      memoryStore.delete(key);
    }
  }
}

setInterval(cleanupMemoryStore, 5 * 60 * 1000);

function memoryIncrWithExpiry(key, ttlSeconds) {
  const now = Date.now();
  const ttlMs = ttlSeconds * 1000;
  const existing = memoryStore.get(key);

  if (!existing || now > existing.resetTime) {
    const next = { count: 1, resetTime: now + ttlMs };
    memoryStore.set(key, next);
    return { count: 1, ttl: ttlSeconds };
  }

  existing.count += 1;
  memoryStore.set(key, existing);
  return { count: existing.count, ttl: Math.ceil((existing.resetTime - now) / 1000) };
}

async function bumpCounter(key, ttlSeconds) {
  if (redisEnabled) {
    return redisIncrWithExpiry(key, ttlSeconds);
  }
  return memoryIncrWithExpiry(key, ttlSeconds);
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (
    forwarded?.split(',')?.[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

export async function checkRateLimit(req) {
  const ip = getClientIp(req);
  const emailRaw = req.body?.email;
  const email = typeof emailRaw === 'string' ? emailRaw.toLowerCase().trim() : '';

  const ipKey = `ratelimit:ip:${ip}`;
  const globalKey = 'ratelimit:global';
  const emailKey = email ? `ratelimit:email:${email}` : null;

  const [ipData, globalData, emailData] = await Promise.all([
    bumpCounter(ipKey, CONFIG.ip.windowSec),
    bumpCounter(globalKey, CONFIG.global.windowSec),
    emailKey ? bumpCounter(emailKey, CONFIG.email.windowSec) : Promise.resolve(null),
  ]);

  const blockedByIp = ipData.count > CONFIG.ip.maxRequests;
  const blockedByGlobal = globalData.count > CONFIG.global.maxRequests;
  const blockedByEmail = emailData ? emailData.count > CONFIG.email.maxRequests : false;

  const retryAfter = Math.max(ipData.ttl, globalData.ttl, emailData?.ttl || 0);

  return {
    success: !(blockedByIp || blockedByGlobal || blockedByEmail),
    retryAfter,
    limits: {
      ip: {
        allowed: !blockedByIp,
        remaining: Math.max(0, CONFIG.ip.maxRequests - ipData.count),
      },
      global: {
        allowed: !blockedByGlobal,
        remaining: Math.max(0, CONFIG.global.maxRequests - globalData.count),
      },
      email: {
        allowed: !blockedByEmail,
        remaining: emailData ? Math.max(0, CONFIG.email.maxRequests - emailData.count) : CONFIG.email.maxRequests,
      },
    },
    ip: ip.substring(0, 7) + '***',
  };
}

export function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

const validNonces = new Set();
const nonceExpiry = new Map();

export function createNonce() {
  const nonce = generateNonce();
  validNonces.add(nonce);
  nonceExpiry.set(nonce, Date.now() + 30 * 60 * 1000);
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

  validNonces.delete(nonce);
  nonceExpiry.delete(nonce);
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [nonce, expiry] of nonceExpiry.entries()) {
    if (now > expiry) {
      validNonces.delete(nonce);
      nonceExpiry.delete(nonce);
    }
  }
}, 10 * 60 * 1000);
