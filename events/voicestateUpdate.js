const { sendLog } = require("../utils/logger");

module.exports = {
    name: "voiceStateUpdate",

    async execute(oldState, newState) {
        const member = newState.member || oldState.member;

        if (!oldState.channel && newState.channel) {
            await sendLog(
                member.guild,
                "voice",
                `## 🎙️ دخل صوتي\n👤 **العضو:** ${member.user.tag}\n📍 **الشانل:** ${newState.channel.name}`
            );
        }

        else if (oldState.channel && !newState.channel) {
            await sendLog(
                oldState.guild,
                "voice",
                `## 🔕 خرج صوتي\n👤 **العضو:** ${member.user.tag}\n📍 **الشانل:** ${oldState.channel.name}`
            );
        }

        else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
            await sendLog(
                newState.guild,
                "voice",
                `## 🔀 انتقل صوتي\n👤 **العضو:** ${member.user.tag}\n📤 **من:** ${oldState.channel.name}\n📥 **إلى:** ${newState.channel.name}`
            );
        }
    },
};