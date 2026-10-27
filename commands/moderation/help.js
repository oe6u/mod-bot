module.exports = {
  name: "help",

  async execute(message) {
    await message.reply({
      flags: 32768,
      components: [
        {
          type: 17,
          accent_color: 0x5865f2,
          components: [
            {
              type: 10,
              content: [
                "## 🛡️ أوامر المودريشن",
                "",
                "`!ban @يوزر [السبب]` — طرد دائم",
                "`!unban [ID]` — إزالة البان",
                "`!kick @يوزر [السبب]` — طرد مؤقت",
                "`!mute @يوزر [دقائق] [السبب]` — كتم",
                "`!unmute @يوزر` — رفع الكتم",
                "`!clear [1-100]` — مسح رسائل",
                "`!warn @يوزر [السبب]` — تحذير",
                "`!userinfo [@يوزر]` — معلومات عضو",
                "",
                "## 📋 أوامر اللوجات",
                "",
                "`!setlog ban [#شانل]` — شانل لوج البان",
                "`!setlog unban [#شانل]` — شانل لوج رفع البان",
                "`!setlog kick [#شانل]` — شانل لوج الكيك",
                "`!setlog mute [#شانل]` — شانل لوج الميوت",
                "`!setlog unmute [#شانل]` — شانل لوج رفع الميوت",
                "`!setlog warn [#شانل]` — شانل لوج التحذيرات",
                "`!setlog voice [#شانل]` — شانل لوج الصوتي",
              ].join("\n"),
            },
          ],
        },
      ],
    });
  },
};