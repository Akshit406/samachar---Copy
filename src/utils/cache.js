// Simple in-memory cache for user-specific news sessions
const userCache = new Map();

/**
 * Save user's news session
 * @param {string} userId 
 * @param {Array} articles 
 */
export function setUserSession(userId, articles) {
  userCache.set(userId, {
    articles,
    index: 0,
    lastInteraction: Date.now()
  });
}

/**
 * Get user's current session
 * @param {string} userId 
 * @returns {Object|null}
 */
export function getUserSession(userId) {
  return userCache.get(userId) || null;
}

/**
 * Advance to next article for user
 * @param {string} userId 
 * @returns {Object|null}
 */
export function nextArticle(userId) {
  const session = userCache.get(userId);
  if (!session || session.index >= session.articles.length - 1) return null;

  session.index += 1;
  session.lastInteraction = Date.now();
  return session.articles[session.index];
}

/**
 * Clear a user's session
 * @param {string} userId 
 */
export function clearUserSession(userId) {
  userCache.delete(userId);
}

/**
 * Update existing user's session data
 * @param {string} userId 
 * @param {Object} newData 
 */
export function updateUserSession(userId, newData) {
  const session = userCache.get(userId);
  if (!session) return;

  userCache.set(userId, {
    ...session,
    ...newData,
    lastInteraction: Date.now()
  });
}
