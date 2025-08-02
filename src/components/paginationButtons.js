import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export function createPaginationButtons(index, total) {
  const row = new ActionRowBuilder();
  const components = [];

  if (index > 0) {
    components.push(
      new ButtonBuilder()
        .setCustomId(`prev_${index}`)
        .setLabel('Previous')
        .setStyle(ButtonStyle.Secondary)
    );
  }

  if (index < total - 1) {
    components.push(
      new ButtonBuilder()
        .setCustomId(`next_${index}`)
        .setLabel('Next')
        .setStyle(ButtonStyle.Primary)
    );
  }

  components.push(
    new ButtonBuilder()
      .setCustomId('quit')
      .setLabel('Quit')
      .setStyle(ButtonStyle.Danger)
  );

  // Only return row if it has components
  if (components.length > 0) {
    row.addComponents(...components);
    return row;
  }

  return null;
}
