const { Client, Intents } = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

const PREFIX = ".";

client.once("ready", () => {
  console.log("Bot is online!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(PREFIX) !== 0) return;

  if (message.content === ".talk") {
    message.reply({ content: "padhai karo bc" });
  }
  if (message.content.startsWith(".say")) {
    const args = message.content.slice(5).split(" ");
    const sayMessage = args.join(" ");
    message.channel.send(sayMessage);
  }
});

client.login(process.env.TOKEN.toString());
