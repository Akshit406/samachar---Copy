import { SlashCommandBuilder } from 'discord.js';
import { createCategorySelectMenu } from '../components/categorySelectMenu.js';

export default {
  data: new SlashCommandBuilder()
    .setName('samachar')
    .setDescription('Get real-time news from Inshorts by category'),

  async execute(interaction) {
    const selectMenuRow = createCategorySelectMenu(); // already includes ActionRowBuilder

    await interaction.reply({
      content: '🗂 Select a news category:',
      components: [selectMenuRow],
      ephemeral: true, // only visible to the user
    });
  },
};
