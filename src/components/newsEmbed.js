import { EmbedBuilder } from 'discord.js';

export function createNewsEmbed(newsItem, index = 0, total = 1, category = '') {
  return new EmbedBuilder()
    .setTitle(newsItem.title || 'Untitled')
    .setURL(newsItem.url || 'https://inshorts.com/')
    .setDescription(newsItem.content || 'No content available.')
    .setImage(newsItem.imageUrl || null)
    .setFooter({
      text: `📰 Source: Inshorts • Article ${index + 1}/${total} • Category: ${category.replace(/_/g, ' ')}`,
    })
    .setTimestamp(new Date(newsItem.date || Date.now()));
}
