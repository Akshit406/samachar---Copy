const cooldowns = new Map();

/**
 * Check if a user is rate-limited
 * @param {string} userId 
 * @param {number} cooldownMs 
 * @returns {boolean}
 */
export function isRateLimited(userId, cooldownMs = 2000) {
  const lastUsed = cooldowns.get(userId);
  const now = Date.now();

  if (!lastUsed || now - lastUsed >= cooldownMs) {
    cooldowns.set(userId, now);
    return false; // Not rate-limited
  }

  return true; // Rate-limited
} 
