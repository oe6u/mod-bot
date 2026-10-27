const { sendLog } = require("../utils/logger");

module.exports = {
    name: "guildMemberRemove",

    async execute(member) {
        const audit = await member.guild.fetchAuditLogs({ type: 20, limit: 1 });
        const entry = audit.entries.first();

        if (entry && entry.target.id === member.user.id && Date.now() - entry.createdTimestamp < 5000) {
            const executor = entry?.executor?.tag || "غير معروف";
            const reason = entry?.reason || "مفيش سبب";

            return await sendLog(
                member.guild,
                "kick",
                `## 👢 كيك\n👤 **العضو:** ${member.user.tag} \`${member.user.id}\`\n📝 **السبب:** ${reason}\n🛡️ **المنفذ:** ${executor}`
            );
        }
    },
};