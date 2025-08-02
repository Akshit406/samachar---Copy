// interactions/handleCategorySelect.js

import { fetchArticlesByCategory } from '../services/inshortsApi.js';
import { createNewsEmbed } from '../components/newsEmbed.js';
import { createPaginationButtons } from '../components/paginationButtons.js';
import { updateUserSession } from '../utils/cache.js';

export async function handleCategorySelect(interaction) {
  const selected = interaction.values[0];
  const userId = interaction.user.id;

  await interaction.deferUpdate();

  const articles = await fetchArticlesByCategory(selected, userId);

  if (!articles || articles.length === 0) {
    return interaction.followUp({
      content: '⚠️ Could not fetch news for that category.',
      ephemeral: true,
    });
  }

  // Save session using correct key: `articles`
  updateUserSession(userId, {
    articles,
    index: 0,
    category: selected,
  });

  const embed = createNewsEmbed(articles[0], 0, articles.length, selected);
  const buttons = createPaginationButtons(0, articles.length);

  await interaction.editReply({
    content: `📰 News in **${selected.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}**`,
    embeds: [embed],
    components: [buttons],
  });
}
