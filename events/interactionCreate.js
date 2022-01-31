module.exports = {
  name: "interactionCreate",
  description: "Interaction create event!",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const commandName = interaction.getCommandName();
    if (commandName === "ping") {
      await interaction.reply("Pong !");
    }

    if (commandName === "embed") {
      const embed = new MessageEmbed()
        .setTitle("New Embed!")
        .setAuthor({ name: "Geekyprawins test bot" })
        .setColor(0x00ae86)
        .setThumbnail("https://i.imgur.com/wSTFkRM.png")
        .setDescription("This is an embed!")
        .setFooter({ text: "Embed!" })
        .setTimestamp()
        .setImage("https://i.imgur.com/wSTFkRM.png")
        .addField("Field1", "Value1", true)
        .addField("Field2", "Value2", true)
        .addField("Field3", "Value3", true)
        .addField("Field4", "Value4", true);

      await interaction.reply({ embeds: [embed] });
    }
  },
};
