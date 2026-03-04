// Duplicate submission detection with optional Upstash Redis REST backend.
import crypto from 'node:crypto';

const submissions = new Map();
const DEDUP_WINDOW_MS = 45 * 60 * 1000;
const DEDUP_WINDOW_SEC = 45 * 60;

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const redisEnabled = Boolean(REDIS_URL && REDIS_TOKEN);
const isProduction = process.env.NODE_ENV === 'production';

function cleanup() {
  const now = Date.now();
  for (const [key, timestamp] of submissions.entries()) {
    if (now - timestamp > DEDUP_WINDOW_MS) {
      submissions.delete(key);
    }
  }
}

setInterval(cleanup, 60 * 1000);

async function redisCheckAndMark(key) {
  const endpoint = `${REDIS_URL}/set/${encodeURIComponent(key)}/1?EX=${DEDUP_WINDOW_SEC}&NX=true`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });

  if (!response.ok) {
    throw new Error(`Redis dedup failed: ${response.status}`);
  }

  const payload = await response.json();
  return payload?.result !== null;
}

function normalizeValue(value) {
  if (typeof value === 'string') {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
  }
  if (Array.isArray(value)) {
    return value.map(normalizeValue).sort();
  }
  return value;
}

function payloadHash(data) {
  const relevant = {
    email: normalizeValue(data.email || ''),
    brandName: normalizeValue(data.brandName || ''),
    formType: normalizeValue(data.formType || ''),
    services: normalizeValue(data.services || []),
    goals: normalizeValue(data.goals || []),
    budget: normalizeValue(data.budget || ''),
    campaignIdea: normalizeValue(data.campaignIdea || ''),
    platformLink: normalizeValue(data.platformLink || ''),
    niche: normalizeValue(data.niche || ''),
    message: normalizeValue(data.message || ''),
    targetAudience: normalizeValue(data.targetAudience || ''),
  };
  return crypto.createHash('sha256').update(JSON.stringify(relevant)).digest('hex');
}

function headerHash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export async function checkDuplicate(data, idempotencyKey) {
  try {
    if (isProduction && !redisEnabled) {
      return { unavailable: true, isDuplicate: false };
    }

    const email = (data.email || '').toLowerCase().trim();
    const hash = payloadHash(data);

    if (!email) {
      return { isDuplicate: false };
    }

    const key = `dedup:payload:${email}:${hash}`;
    const idemKey = idempotencyKey
      ? `dedup:idem:${email}:${headerHash(idempotencyKey.trim())}`
      : null;

    if (redisEnabled) {
      const [payloadInserted, idempotencyInserted] = await Promise.all([
        redisCheckAndMark(key),
        idemKey ? redisCheckAndMark(idemKey) : Promise.resolve(true),
      ]);
      return { isDuplicate: !payloadInserted || !idempotencyInserted, key };
    }

    if (submissions.has(key)) {
      return { isDuplicate: true, key };
    }
    if (idemKey && submissions.has(idemKey)) {
      return { isDuplicate: true, key: idemKey };
    }

    return { isDuplicate: false, key, idemKey };
  } catch (error) {
    console.error('Dedup check error:', error);
    return { isDuplicate: false, unavailable: isProduction };
  }
}

export function markSubmitted(key, idemKey) {
  if (redisEnabled || (!key && !idemKey)) return;
  if (key) {
    submissions.set(key, Date.now());
  }
  if (idemKey) {
    submissions.set(idemKey, Date.now());
  }
}

export function dedupReady() {
  if (isProduction) return redisEnabled;
  return true;
}

export function distributedStoreReady() {
  if (isProduction) return redisEnabled;
  return true;
}

export function redactIdempotencyKey(value) {
  if (!value || typeof value !== 'string') return null;
  return `${value.slice(0, 6)}***`;
}

export function getSubmissionStats() {
  return {
    trackedSubmissions: submissions.size,
    dedupWindowMinutes: 45,
  };
}
