module.exports = {
  name: "clientReady",
  once: true,

  execute(client) {
    console.log(`🤖 البوت شغال: ${client.user.tag}`);
    console.log(`📡 متصل بـ ${client.guilds.cache.size} سيرفر`);
    client.user.setActivity("!help | يحمي السيرفر 🛡️", { type: 3 });
  },
};