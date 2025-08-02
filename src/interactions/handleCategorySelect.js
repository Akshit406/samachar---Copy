import { fetchArticlesByCategory } from '../services/inshortsApi.js';
import { createNewsEmbed } from '../components/newsEmbed.js';
import { createPaginationButtons } from '../components/paginationButtons.js';
import { updateUserSession } from '../utils/cache.js';

export async function handleCategorySelect(interaction) {
  const selected = interaction.values[0];
  const userId = interaction.user.id;

  await interaction.deferUpdate(); // Optional: shows "thinking..." for smoother UX

  const news = await fetchArticlesByCategory(selected);
  if (!news || news.length === 0) {
    return interaction.followUp({
      content: '⚠️ Could not fetch news for that category.',
      ephemeral: true,
    });
  }

  // Save session
  updateUserSession(userId, {
    news,
    index: 0,
    category: selected,
  });

  const embed = createNewsEmbed(news[0], 0, news.length, selected);
  const buttons = createPaginationButtons();

  await interaction.editReply({
    content: `📰 News in **${selected.replace(/_/g, ' ')}**`,
    embeds: [embed],
    components: [buttons],
  });
}
