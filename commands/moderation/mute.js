const { successMsg, errorMsg } = require("../../utils/Components");

const USAGE = "!mute @يوزر [دقائق] [السبب]";

module.exports = {
  name: "mute",

  async execute(message, args) {
    if (!message.member.permissions.has("ModerateMembers")) {
      return message.reply(errorMsg("محتاج صلاحية **Moderate Members**"));
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply(errorMsg(`الاستخدام: \`${USAGE}\``));

    const minutes = parseInt(args[1]) || 10;
    if (minutes > 40320) return message.reply(errorMsg("المدة القصوى 28 يوم"));

    const reason = args.slice(2).join(" ") || "مفيش سبب";
    await target.timeout(minutes * 60 * 1000, reason);

    await message.reply(
      successMsg(`تم كتم **${target.user.tag}** 🔇\n**المدة:** ${minutes} دقيقة\n**السبب:** ${reason}\n**المنفذ:** ${message.author.tag}`)
    );
  },
};