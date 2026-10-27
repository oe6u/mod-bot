const { errorMsg } = require("../utils/Components");

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (error) {
      console.error(`خطأ في ${commandName}:`, error);
      await message.reply(errorMsg("حصل خطأ أثناء تنفيذ الأمر"));
    }
  },
};