import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
} from 'discord.js';
import { categories } from '../config/categories.js';

export function createCategorySelectMenu() {
  const options = Object.entries(categories).map(([key, value]) =>
    new StringSelectMenuOptionBuilder()
      .setLabel(key.charAt(0).toUpperCase() + key.slice(1))
      .setValue(value)
  );

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('select_category')
    .setPlaceholder('Select a news category')
    .addOptions(options);

  const row = new ActionRowBuilder().addComponents(selectMenu);

  return row;
} 