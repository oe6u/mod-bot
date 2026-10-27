const { successMsg, errorMsg } = require("../../utils/Components");

const USAGE = "!clear [1-100]";

module.exports = {
  name: "clear",

  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) {
      return message.reply(errorMsg("محتاج صلاحية **Manage Messages**"));
    }

    const amount = parseInt(args[0]);
    if (!amount || amount < 1 || amount > 100) {
      return message.reply(errorMsg(`الاستخدام: \`${USAGE}\``));
    }

    await message.delete();
    const deleted = await message.channel.bulkDelete(amount, true);

    const confirm = await message.channel.send(
      successMsg(`تم مسح **${deleted.size}** رسالة 🗑️`)
    );

    setTimeout(() => confirm.delete().catch(() => {}), 3000);
  },
};