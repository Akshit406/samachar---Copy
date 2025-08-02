import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export function createPaginationButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('next_news')
      .setLabel('Next')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId('exit_news')
      .setLabel('Exit')
      .setStyle(ButtonStyle.Danger)
  );
}
