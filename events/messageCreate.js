const PREFIX = "*";

module.exports = {
  name: "messageCreate",
  description: "Message create event!",
  execute(message, client) {
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
  },
};