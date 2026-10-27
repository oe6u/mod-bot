const { successMsg, errorMsg } = require("../../utils/Components");
const { sendLog } = require("../../utils/logger");

const USAGE = "!unmute [ID]";

module.exports = {
    name: "unban",

    async execute(message, args) {
        if (!message.member.permissions.has("BanMembers")) {
            return message.reply(errorMsg("محتاج صلاحية **Ban Members**"));
        }

        const userId = args[0];
        if (!userId) return message.reply(errorMsg(`الاستخدام: \`${USAGE}\``));

        const bans = await message.guild.bans.fetch();
        const banned = bans.get(userId);

        if (!banned) return message.reply(errorMsg("المستخدم دا مش محظور"));

        await message.guild.members.unban(userId);

        await message.reply(
            successMsg(`تم إزالة البان عن **${banned.user.tag}** 🔓\n**المنفذ:** ${message.author.tag}`)
        );
    },
};