const { warningMsg, errorMsg } = require("../../utils/Components");
const { sendLog } = require("../../utils/logger");

const USAGE = "!warn @يوزر [السبب]";
const warnings = new Map();

module.exports = {
  name: "warn",

  async execute(message, args) {
    if (!message.member.permissions.has("ModerateMembers")) {
      return message.reply(errorMsg("محتاج صلاحية **Moderate Members**"));
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply(errorMsg(`الاستخدام: \`${USAGE}\``));

    const reason = args.slice(1).join(" ") || "مفيش سبب";
    const userId = target.user.id;

    if (!warnings.has(userId)) warnings.set(userId, []);
    warnings.get(userId).push({ reason, moderator: message.author.tag });

    const warnCount = warnings.get(userId).length;

    await message.reply(
      warningMsg(`تم تحذير **${target.user.tag}** ⚠️\n**السبب:** ${reason}\n**التحذيرات:** ${warnCount}\n**المنفذ:** ${message.author.tag}`)
    );

    await sendLog(
      message.guild,
      "warn",
      `## ⚠️ تحذير\n👤 **العضو:** ${target.user.tag} \`${target.user.id}\`\n📝 **السبب:** ${reason}\n🔢 **التحذيرات:** ${warnCount}\n🛡️ **المنفذ:** ${message.author.tag}`
    );

    try {
      await target.send(
        warningMsg(`تحذير من **${message.guild.name}**\n**السبب:** ${reason}\n**التحذيرات:** ${warnCount}`)
      );
    } catch {}
  },
};