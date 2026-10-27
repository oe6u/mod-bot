const { sendLog } = require("../utils/logger");

module.exports = {
    name: "guildBanRemove",

    async execute(ban) {
        const audit = await ban.guild.fetchAuditLogs({ type: 23, limit: 1 });
        const entry = audit.entries.first();
        const executor = entry?.executor?.tag || "غير معروف";

        await sendLog(
            ban.guild,
            "unban",
            `## 🔓 رفع بان\n👤 **العضو:** ${ban.user.tag} \`${ban.user.id}\`\n🛡️ **المنفذ:** ${executor}`
        );
    },
};