// Duplicate submission detection
// Uses in-memory store - replace with Redis for production

const submissions = new Map();

// Clean up old entries periodically
const DEDUP_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function cleanup() {
  const now = Date.now();
  for (const [key, timestamp] of submissions.entries()) {
    if (now - timestamp > DEDUP_WINDOW_MS) {
      submissions.delete(key);
    }
  }
}

// Run cleanup every minute
setInterval(cleanup, 60 * 1000);

/**
 * Check if this submission is a duplicate
 * @param {Object} data - Form data
 * @returns {Promise<{isDuplicate: boolean, key?: string}>}
 */
export async function checkDuplicate(data) {
  try {
    // Create a fingerprint from email + brand name + current minute
    const email = (data.email || '').toLowerCase().trim();
    const brandName = (data.brandName || '').toLowerCase().trim();
    const currentMinute = Math.floor(Date.now() / 60000); // Current minute timestamp

    if (!email) {
      return { isDuplicate: false };
    }

    const key = `dedup:${email}:${brandName}:${currentMinute}`;

    if (submissions.has(key)) {
      return { isDuplicate: true, key };
    }

    return { isDuplicate: false, key };
  } catch (error) {
    console.error('Dedup check error:', error);
    // On error, allow submission but log it
    return { isDuplicate: false };
  }
}

/**
 * Mark a submission key as processed
 * @param {string} key - The deduplication key
 */
export function markSubmitted(key) {
  if (key) {
    submissions.set(key, Date.now());
  }
}

/**
 * Get submission stats for monitoring
 */
export function getSubmissionStats() {
  return {
    trackedSubmissions: submissions.size,
    dedupWindowMinutes: 5
  };
}
