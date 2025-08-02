
import { EmbedBuilder } from 'discord.js';

export function createNewsEmbed(article, index, total, category) {
  return new EmbedBuilder()
    .setTitle(article.title)
    .setDescription(article.content)
    .setURL(article.url)
    .setImage(article.imageUrl)
    .setFooter({ text: `By ${article.author || 'Inshorts'} | ${article.date}` })
    .setColor(0x007acc)
    .setAuthor({ name: `${category.replace(/_/g, ' ').toUpperCase()} | Article ${index + 1} of ${total}` });
}
