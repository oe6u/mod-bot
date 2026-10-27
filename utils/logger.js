const logChannels = new Map();
const LOG_TYPES = ["ban", "unban", "kick", "mute", "unmute", "warn", "voice"];

async function sendLog(guild, type, content) {
    const guildLogs = logChannels.get(guild.id);
    if (!guildLogs) return;

    const channelId = guildLogs[type];
    if (!channelId) return;

    const channel = guild.channels.cache.get(channelId);
    if (!channel) return;

    await channel.send({
        flags: 32768,
        components: [
            {
                type: 17,
                accent_color: 0x95a5a6,
                components: [
                    {
                        type: 10,
                        content: content,
                    },
                ],
            },
        ],
    }).catch(() => {});
}

function setLogChannel(guildId, type, channelId) {
    if (!logChannels.has(guildId)) logChannels.set(guildId, {});
    logChannels.get(guildId)[type] = channelId;
}

function getLogChannel(guildId, type) {
    return logChannels.get(guildId)?.[type];
}

module.exports = { sendLog, setLogChannel, getLogChannel, LOG_TYPES };