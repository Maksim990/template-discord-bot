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

const client = new Client(options);
client.commands = new Collection();
client.aliases = new Collection();
const cooldown = new Collection();

require('dotenv').config()
const { TOKEN, PREFIX, ADMINS } = process.env;
if(!TOKEN || typeof TOKEN !== "string") return console.log(color("Невозможно запустить бота. Проверьте параметры файла .env", { r: 255, g: 0, b: 0 }));

const fs = require("fs");

client.login(TOKEN).then(() => {
    client.categories = fs.readdirSync(__dirname + "/cmds/");
    ["commands", "events"].forEach((handler) => {
        require(`./handlers/${handler}`)(client,PREFIX);
    });
});

client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;

    if(!message.content.startsWith(PREFIX) && message.content.startsWith(client.user.id))
        return message.reply(`Мой перфикс: **\`${PREFIX}\`**, используйте \`${PREFIX}help\` для подробной информации`);
    if(!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd);

    if(cmd.length === 0) return;
    if(!command) command = client.commands.get(client.aliases.get(cmd));

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
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(
                    `Подождите ${timeLeft.toFixed(1)} секунд чтобы повторно использовать \`${command.name}\` команду.`
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