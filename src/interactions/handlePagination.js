// interactions/handlePagination.js

import { createNewsEmbed } from '../components/newsEmbed.js';
import { createPaginationButtons } from '../components/paginationButtons.js';
import { getUserSession, updateUserSession,clearUserSession } from '../utils/cache.js';

export async function handlePagination(interaction) {
  const userId = interaction.user.id;
  const session = getUserSession(userId);

  if (!session || !session.articles || session.articles.length === 0) {
    return interaction.reply({
      content: '⚠️ No news session found. Please use `/samachar` again.',
      ephemeral: true,
    });
  }
  if (interaction.customId === 'quit') {
    clearUserSession(userId);
    return interaction.update({
      content: '🛑 News session ended.',
      embeds: [],
      components: [],
    });
  }

  if (interaction.customId.startsWith('next')) {
    session.index += 1;
    if (session.index >= session.articles.length) {
      session.index = 0; // Loop back to first
    }
  } else if (interaction.customId.startsWith('prev')) {
    session.index -= 1;
    if (session.index < 0) {
      session.index = session.articles.length - 1; // Loop to last
    }
  }

  updateUserSession(userId, session);

  const article = session.articles[session.index];
  const embed = createNewsEmbed(article, session.index, session.articles.length, session.category);
  const buttons = createPaginationButtons(session.index, session.articles.length);

  await interaction.update({
    embeds: [embed],
    components: [buttons],
  });
}
