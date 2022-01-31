const { Client, Intents, Collection } = require("discord.js");
require("dotenv").config();
const fs = require("fs");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.commands = new Collection();

const PREFIX = ".";

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require("./commands/${file}");
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Bot is online!🤖");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(PREFIX) !== 0) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(client, message, args);
  } catch (error) {
    message.reply(
      `There was an error trying to execute that command! ${error}`
    );
    console.error(error);
  }

  client.login(process.env.TOKEN.toString());
});
