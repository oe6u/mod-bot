const { sendLog } = require("../utils/logger");

module.exports = {
    name: "guildMemberUpdate",

    async execute(oldMember, newMember) {
        const wasTimedOut = oldMember.communicationDisabledUntil;
        const isTimedOut = newMember.communicationDisabledUntil;

        // تم الميوت (مكانش متكتم وبقى متكتم)
        if (!wasTimedOut && isTimedOut) {
            const audit = await newMember.guild.fetchAuditLogs({ type: 24, limit: 1 });
            const entry = audit.entries.first();
            const executor = entry?.executor?.tag || "غير معروف";
            const reason = entry?.reason || "مفيش سبب";
            const until = new Date(isTimedOut).toLocaleDateString("ar-EG");

            await sendLog(
                newMember.guild,
                "mute",
                `## 🔇 ميوت\n👤 **العضو:** ${newMember.user.tag} \`${newMember.user.id}\`\n⏱️ **حتى:** ${until}\n📝 **السبب:** ${reason}\n🛡️ **المنفذ:** ${executor}`
            );
        }
        else if (wasTimedOut && !isTimedOut) {
            const audit = await newMember.guild.fetchAuditLogs({ type: 24, limit: 1 });
            const entry = audit.entries.first();
            const executor = entry?.executor?.tag || "غير معروف";

            await sendLog(
                newMember.guild,
                "unmute",
                `## 🔊 رفع ميوت\n👤 **العضو:** ${newMember.user.tag} \`${newMember.user.id}\`\n🛡️ **المنفذ:** ${executor}`
            );
        }
    },
};