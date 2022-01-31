const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Embed!",
  execute(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle("New Embed!")
      .setAuthor("Geekyprawins test bot")
      .setColor(0x00ae86)
      .setThumbnail("https://i.imgur.com/wSTFkRM.png")
.setDescription("This is an embed!")
      .setFooter("Embed!")
      .setTimestamp()
      .setImage("https://i.imgur.com/wSTFkRM.png")
      .addField("Field1", "Value1", true)
      .addField("Field2", "Value2", true)
      .addField("Field3", "Value3", true)
      .addField("Field4", "Value4", true);

    message.channel.send(embed);
  },
};
