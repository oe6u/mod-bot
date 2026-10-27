const { successMsg, errorMsg } = require("../../utils/Components");

const USAGE = "!unmute @يوزر";

module.exports = {
  name: "unmute",

  async execute(message, args) {
    if (!message.member.permissions.has("ModerateMembers")) {
      return message.reply(errorMsg("محتاج صلاحية **Moderate Members**"));
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply(errorMsg(`الاستخدام: \`${USAGE}\``));
    if (!target.communicationDisabledUntil) return message.reply(errorMsg("العضو مش متكتم"));

    await target.timeout(null);

    await message.reply(
      successMsg(`تم رفع الكتم عن **${target.user.tag}** 🔊\n**المنفذ:** ${message.author.tag}`)
    );
  },
};