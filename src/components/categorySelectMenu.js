import { categories } from '../config/categories.js';
import { StringSelectMenuBuilder, ActionRowBuilder } from 'discord.js';

export function createCategorySelectMenu() {
  const options = Object.entries(categories).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize label
    value,
  }));

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('select_category')
    .setPlaceholder('Select a news category')
    .addOptions(options);

  const row = new ActionRowBuilder().addComponents(selectMenu);

  return row;
}
