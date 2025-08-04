import axios from 'axios';
import { setUserSession } from '../utils/cache.js';

const BASE_URL = 'https://inshorts.com/api/en/search/trending_topics';

/**
 * Fetch articles by category from Inshorts
 * @param {string} category - e.g., 'technology', 'sports', 'Health___Fitness'
 * @param {string} userId - Discord user ID for session tracking
 * @returns {Array} Simplified news articles
 */
export const fetchArticlesByCategory = async (category, userId) => {
  try {
    const url = `${BASE_URL}/${category}?page=1&type=NEWS_CATEGORY&max_limit=10`;
    const response = await axios.get(url);

    const suggestedNews = response?.data?.data?.suggested_news;

    if (!Array.isArray(suggestedNews)) {
      throw new Error('Invalid response structure from Inshorts API');
    }

    const articles = suggestedNews.map((item) => {
      const news = item.news_obj;

      return {
        title: news.title,
        content: news.content,
        url: news.source_url || '',
        imageUrl: news.image_url || '',
        date: new Date(news.created_at).toLocaleString(),
        source: news.source_name || 'Inshorts',
        author: news.author_name || 'Unknown',
      };
    });

    // Save to user session cache
    setUserSession(userId, articles);

    return articles;
  } catch (error) {
    console.error('🛑 Error fetching articles:', error.message);
    return [];
  }
};
