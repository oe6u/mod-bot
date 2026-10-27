const { successMsg, errorMsg } = require("../../utils/Components");

const USAGE = "!ban @يوزر [السبب]";

module.exports = {
  name: "ban",

  async execute(message, args) {
    if (!message.member.permissions.has("BanMembers")) {
      return message.reply(errorMsg("محتاج صلاحية **Ban Members**"));
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply(errorMsg(`الاستخدام: \`${USAGE}\``));
    if (!target.bannable) return message.reply(errorMsg("مش قادر أطرد العضو ده"));

    const reason = args.slice(1).join(" ") || "مفيش سبب";
    await target.ban({ reason: `${message.author.tag}: ${reason}` });

    await message.reply(
      successMsg(`تم طرد **${target.user.tag}** بشكل دائم 🔨\n**السبب:** ${reason}\n**المنفذ:** ${message.author.tag}`)
    );
  },
};