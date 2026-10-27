const { sendLog } = require("../utils/logger");

module.exports = {
    name: "guildBanAdd",

    async execute(ban) {
        const audit = await ban.guild.fetchAuditLogs({ type: 22, limit: 1 });
        const entry = audit.entries.first();
        const executor = entry?.executor?.tag || "غير معروف";
        const reason = ban.reason || "مفيش سبب";

        await sendLog(
            ban.guild,
            "ban",
            `## 🔨 بان\n👤 **العضو:** ${ban.user.tag} \`${ban.user.id}\`\n📝 **السبب:** ${reason}\n🛡️ **المنفذ:** ${executor}`
        );
    },
};