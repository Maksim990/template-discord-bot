const { Client, Collection, Intents } = require("discord.js");
const options = {
    intents: [
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILDS,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
};

const time = require("./utils/time.js");
const fs = require("fs");

let config = {};
if(process.platform == "android") {
    config.TOKEN = require("../settings.json").bot.TOKEN;
    config.PREFIX = require("../settings.json").bot.PREFIX;
    config.ADMINS = require("../settings.json").bot.ADMINS;
    config.LOG = require("../settings.json").bot.LOG;
    if(!require("../settings.json").bot.TOKEN ||
        typeof require("../settings.json").bot.TOKEN !== "string") return console.log(color("Невозможно запустить бота. Проверьте параметры файла settings.json", { r: 255, g: 0, b: 0 }));
} else {
    require('dotenv').config();
    const { TOKEN, PREFIX, ADMINS, LOG } = process.env;
    config.TOKEN = TOKEN;
    config.PREFIX = PREFIX;
    config.ADMINS = ADMINS;
    config.LOG = LOG;
    if(!TOKEN || typeof TOKEN !== "string") return console.log(color("Невозможно запустить бота. Проверьте параметры файла .env", { r: 255, g: 0, b: 0 }));
}
const { TOKEN, PREFIX, ADMINS, LOG } = config;
const client = new Client(options);
client.commands = new Collection();
client.aliases = new Collection();
const cooldown = new Collection();

client.login(TOKEN).then(() => {
    client.categories = fs.readdirSync(__dirname + "/cmds/");
    ["commands", "events"].forEach((handler) => {
        require(`./handlers/${handler}`)(client,PREFIX);
    });
});

client.on("messageCreate", async message => {
    if(!message) return;
    if(!message.guild) return;
    if(!message.channel.type == "GUILD_PUBLIC_THREAD") if(!message.channel.permissionsFor(message.guild.me).has(["SEND_MESSAGES","EMBED_LINKS"])) return;
    if(message.channel.isVoice()) return;
    if(message.author.bot) return;

    if(!message.content.startsWith(PREFIX) && message.content.startsWith(client.user.id))
        return message.reply(`Мой перфикс: **\`${PREFIX}\`**, используйте \`${PREFIX}help\` для подробной информации`);
    if(!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd);

    if(cmd.length === 0) return;
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
    if(LOG) {
        console.log(`
            ---[USER ${message.author.tag}]---
            [COMMAND]: ${message.content}
            [MENTION]: ${mention}
            [ID]: ${message.author.id}
            ---[SERVER ${message.guild.name}]---
            [ID]: ${message.guild.id}
            [MEMBERS]: ${message.guild.memberCount}
            [REGION]: ${message.guild.preferredLocale}

            [TIME]: ${time("data list")}
        `);
    };

    if(command) {
        if(!cooldown.has(command.name)) {
            cooldown.set(command.name, new Collection());
        };

        const now = Date.now();
        const timestamps = cooldown.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if(timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if(now < expirationTime) {
                return message.reply(
                    `Подождите ${((expirationTime - now) / 1000).toFixed(1)} секунд чтобы повторно использовать \`${command.name}\` команду.`
                );
            };
        };

        timestamps.set(message.author.id, now);
        if(ADMINS.includes(message.author.id)) timestamps.delete(message.author.id);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.run(client, message, args, PREFIX);
        }catch(e) {
            console.log(e);
            return message.reply("Что-то пошло не так при запуске: `" + command.name + "` команды");
        }
    };
});

exports.client = client;