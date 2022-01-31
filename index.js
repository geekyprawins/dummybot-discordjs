const { Client, Intents, Collection } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");

const { Routes } = require("discord-api-types/v9");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

const slashCommands = [
  new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  new SlashCommandBuilder().setName("embed").setDescription("Embed!"),
].map((command) => command.toJSON());

const rest = new REST({ version: 9 }).setToken(process.env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    {
      body: slashCommands,
    }
  )
  .then(() => {
    console.log("Commands updated!");
  });

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require("./commands/" + file);
  client.commands.set(command.name, command);
}

for (const event of eventFiles) {
  const eventFile = require(`./events/` + event);

  if (eventFile.once) {
    client.once(eventFile.name, (...args) =>
      eventFile.execute(...args, client)
    );
  } else {
    client.on(eventFile.name, (...args) => eventFile.execute(...args, client));
  }
}

client.login(process.env.TOKEN.toString());
