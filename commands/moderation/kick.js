const { successMsg, errorMsg } = require("../../utils/Components");

const USAGE = "!kick @يوزر [السبب]";

module.exports = {
  name: "kick",

  async execute(message, args) {
    if (!message.member.permissions.has("KickMembers")) {
      return message.reply(errorMsg("محتاج صلاحية **Kick Members**"));
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply(errorMsg(`الاستخدام: \`${USAGE}\``));
    if (!target.kickable) return message.reply(errorMsg("مش قادر أطرد العضو ده"));

    const reason = args.slice(1).join(" ") || "مفيش سبب";
    await target.kick(`${message.author.tag}: ${reason}`);

    await message.reply(
      successMsg(`تم طرد **${target.user.tag}** 👢\n**السبب:** ${reason}\n**المنفذ:** ${message.author.tag}`)
    );
  },
};