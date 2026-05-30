// =======================================================================
// In-Memory Server-Side Rate Limiter
// =======================================================================
// Tracks submissions by IP address. Resets on server restart.
// Suitable for local dev / single-instance deployments.
// For production multi-instance, swap for Upstash Redis or similar.
// =======================================================================

const RATE_LIMIT_WINDOW_MS = 30_000; // 30-second sliding window
const CLEANUP_INTERVAL_MS = 300_000; // Purge stale entries every 5 min

const hitMap = new Map<string, number>();

// Periodic cleanup to prevent memory leaks
const cleanupTimer = setInterval(() => {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  for (const [key, timestamp] of hitMap) {
    if (timestamp < cutoff) hitMap.delete(key);
  }
}, CLEANUP_INTERVAL_MS);

// Allow the process to exit cleanly
if (cleanupTimer.unref) cleanupTimer.unref();

/**
 * Extract a consistent client identifier from request headers.
 * Falls back to 'unknown' if no IP header is present.
 *
 * @param {{ get(name: string): string | null }} headers - Request headers object.
 * @param {(name: string) => string | null} headers.get - Header retrieval method.
 *
 * @returns {string} Client IP address or 'unknown'.
 */
export function getClientIp(headers: { get(name: string): string | null }): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown';
}

/**
 * Check whether the given client is rate-limited and return
 * the number of seconds they must still wait.
 *
 * @param {string} clientId - Unique client identifier (typically IP address).
 *
 * @returns {number | null} Remaining cooldown in seconds, or null if allowed.
 */
export function checkSubmissionRate(clientId: string): number | null {
  const now = Date.now();
  const lastHit = hitMap.get(clientId);

  if (lastHit && now - lastHit < RATE_LIMIT_WINDOW_MS) {
    return Math.ceil((RATE_LIMIT_WINDOW_MS - (now - lastHit)) / 1000);
  }

  hitMap.set(clientId, now);
  return null;
}

/**
 * Generate a human-readable rate-limit error message.
 *
 * @param {number} remaining - Remaining cooldown time in seconds.
 *
 * @returns {string} User-friendly wait message.
 */
export function rateLimitMessage(remaining: number): string {
  return `Please wait ${remaining} second${remaining !== 1 ? 's' : ''} before submitting again.`;
}
