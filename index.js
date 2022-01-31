const { Client, Intents, Collection } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const cli = require("nodemon/lib/cli");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
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
