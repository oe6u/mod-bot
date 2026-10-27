const { successMsg, errorMsg } = require("../../utils/Components");
const { setLogChannel, LOG_TYPES } = require("../../utils/logger");

const USAGE = "!setlog [ban | unban | kick | mute | unmute | warn | voice] [#شانل]";

module.exports = {
    name: "setlog",

    async execute(message, args) {
        if (!message.member.permissions.has("ManageGuild")) {
            return message.reply(errorMsg("محتاج صلاحية **Manage Server**"));
        }

        const type = args[0]?.toLowerCase();
        if (!type || !LOG_TYPES.includes(type)) {
            return message.reply(
                errorMsg(`الاستخدام: \`${USAGE}\`\n**الأنواع المتاحة:** ${LOG_TYPES.join(", ")}`)
            );
        }

        const channel = message.mentions.channels.first() || message.channel;
        setLogChannel(message.guild.id, type, channel.id);

        await message.reply(
            successMsg(`تم تعيين شانل لوج **${type}** على ${channel} ✅`)
        );
    },
};