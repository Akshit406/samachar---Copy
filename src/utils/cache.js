// Simple in-memory cache for user-specific news sessions
const userCache = new Map();

/**
 * Save a user's news session
 * @param {string} userId 
 * @param {Array} articles 
 */
export function setUserSession(userId, articles) {
  userCache.set(userId, {
    articles,
    index: 0,
    lastInteraction: Date.now(),
  });
}

/**
 * Get a user's current session
 * @param {string} userId 
 * @returns {Object|null}
 */
export function getUserSession(userId) {
  const session = userCache.get(userId);
  if (!session || !Array.isArray(session.articles) || session.articles.length === 0) {
    return null;
  }
  return session;
}

/**
 * Advance to the next article in the user's session
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
 * Clear a user's session completely
 * @param {string} userId 
 */
export function clearUserSession(userId) {
  userCache.delete(userId);
}

/**
 * Update a user's session with new data (merging)
 * @param {string} userId 
 * @param {Object} newData 
 */
export function updateUserSession(userId, newData) {
  const session = userCache.get(userId);
  if (!session) return;

  userCache.set(userId, {
    ...session,
    ...newData,
    lastInteraction: Date.now(),
  });
}
