// Duplicate submission detection with optional Upstash Redis REST backend.

const submissions = new Map();
const DEDUP_WINDOW_MS = 5 * 60 * 1000;
const DEDUP_WINDOW_SEC = 5 * 60;

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const redisEnabled = Boolean(REDIS_URL && REDIS_TOKEN);

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

export async function checkDuplicate(data) {
  try {
    const email = (data.email || '').toLowerCase().trim();
    const brandName = (data.brandName || '').toLowerCase().trim();
    const currentMinute = Math.floor(Date.now() / 60000);

    if (!email) {
      return { isDuplicate: false };
    }

    const key = `dedup:${email}:${brandName}:${currentMinute}`;

    if (redisEnabled) {
      const inserted = await redisCheckAndMark(key);
      return { isDuplicate: !inserted, key };
    }

    if (submissions.has(key)) {
      return { isDuplicate: true, key };
    }

    return { isDuplicate: false, key };
  } catch (error) {
    console.error('Dedup check error:', error);
    return { isDuplicate: false };
  }
}

export function markSubmitted(key) {
  if (!key || redisEnabled) return;
  submissions.set(key, Date.now());
}

export function getSubmissionStats() {
  return {
    trackedSubmissions: submissions.size,
    dedupWindowMinutes: 5,
  };
}
