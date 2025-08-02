import { SlashCommandBuilder } from 'discord.js';
import { createCategorySelectMenu } from '../components/categorySelectMenu.js';

export default {
  data: new SlashCommandBuilder()
    .setName('samachar')
    .setDescription('Get real-time news from Inshorts by category'),

  async execute(interaction) {
    const categoryMenu = createCategorySelectMenu();

    await interaction.reply({
      content: '🗂 Select a news category:',
      components: [categoryMenu],
      ephemeral: true,
    });
  },
};
