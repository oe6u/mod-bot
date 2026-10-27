module.exports = {
  name: "userinfo",

  async execute(message) {
    const target = message.mentions.members.first() || message.member;
    const user = target.user;

    const joined = target.joinedAt ? target.joinedAt.toLocaleDateString("ar-EG") : "غير معروف";
    const created = user.createdAt ? user.createdAt.toLocaleDateString("ar-EG") : "غير معروف";
    const topRole = target.roles.highest.name !== "@everyone" ? target.roles.highest.toString() : "مفيش رتبة";
    const roles = target.roles.cache.filter((r) => r.name !== "@everyone").map((r) => r.toString()).join(", ") || "مفيش رتب";

    await message.reply({
      flags: 32768,
      components: [
        {
          type: 17,
          accent_color: parseInt(target.displayHexColor.replace("#", ""), 16) || 0x3498db,
          components: [
            {
              type: 10,
              content: `## 👤 ${user.username}\n🏷️ **الاسم:** ${user.tag}\n🆔 **ID:** ${user.id}\n📅 **إنشاء الحساب:** ${created}\n📥 **الانضمام:** ${joined}\n👑 **أعلى رتبة:** ${topRole}\n📋 **الرتب:** ${roles}`,
            },
          ],
        },
      ],
    });
  },
};