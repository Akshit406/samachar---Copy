import { Client, Collection, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import "./server.js"

import { handleCategorySelect } from './interactions/handleCategorySelect.js';
import { handlePagination } from './interactions/handlePagination.js';
import { categories } from './config/categories.js';
import { createCategorySelectMenu } from './components/categorySelectMenu.js';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();

// Dynamically load all slash commands
const commands = [];
const commandsPath = path.join(process.cwd(), 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = (await import(`./commands/${file}`)).default;
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}

// Register slash commands on startup
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔁 Registering slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Slash commands registered.');
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
  }
})();

// Handle command interaction
client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ There was an error executing this command.', ephemeral: true });
    }
  }

  if (interaction.isStringSelectMenu() && interaction.customId === 'select_category') {
    return handleCategorySelect(interaction);
  }

  if (interaction.isButton()) {
    return handlePagination(interaction);
  }
});

client.once(Events.ClientReady, () => {
  console.log(`🤖 ${client.user.tag} is online!`);
});

client.login(process.env.DISCORD_TOKEN)
  .then(() => console.log("🟢 Bot logged in successfully!"))
  .catch((err) => console.error("❌ Bot login failed:", err));
