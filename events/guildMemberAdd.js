const { sendLog } = require("../utils/logger");

module.exports = {
    name: "guildMemberAdd",

    async execute(member) {
        const created = member.user.createdAt.toLocaleDateString("ar-EG");
        await sendLog(
            member.guild,
            `## 📥 عضو جديد\n👤 **الاسم:** ${member.user.tag}\n🆔 **ID:** ${member.user.id}\n📅 **الحساب اتعمل:** ${created}`
            );
        },
};