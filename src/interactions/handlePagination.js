import { createNewsEmbed } from '../components/newsEmbed.js';
import { createPaginationButtons } from '../components/paginationButtons.js';
import { getUserSession, updateUserSession } from '../utils/cache.js';

export async function handlePagination(interaction) {
  const userId = interaction.user.id;
  const session = getUserSession(userId);

  if (!session || !session.news || session.news.length === 0) {
    return interaction.reply({
      content: '⚠️ No news session found. Please use `/samachar` again.',
      ephemeral: true,
    });
  }

  if (interaction.customId === 'next_news') {
    session.index += 1;

    if (session.index >= session.news.length) {
      session.index = 0; // Loop to beginning
    }

    updateUserSession(userId, session);

    const nextArticle = session.news[session.index];
    const embed = createNewsEmbed(nextArticle, session.index, session.news.length, session.category);
    const buttons = createPaginationButtons();

    await interaction.update({ embeds: [embed], components: [buttons] });

  } else if (interaction.customId === 'exit_news') {
    await interaction.update({
      content: '🛑 News session ended.',
      embeds: [],
      components: [],
    });
  }
}
