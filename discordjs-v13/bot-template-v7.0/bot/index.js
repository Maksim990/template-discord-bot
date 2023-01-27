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

const log = require("./utils/logger.js");
const client = new Client(options);
client.commands = new Collection();
client.aliases = new Collection();
const cooldown = new Collection();

require('dotenv').config()
const { TOKEN, PREFIX } = process.env;

const fs = require("fs");

client.login(TOKEN).then(() => {
    log(`Бот ${client.user.tag} запущен`, "info");

    client.categories = fs.readdirSync(__dirname + "/cmds/");
    ["commands", "events"].forEach((handler) => {
        require(`./handlers/${handler}`)(client,PREFIX);
    });
});

client.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;

    if(!message.content.startsWith(PREFIX) && message.content.startsWith(client.user.id))
        return message.reply(`My Prefix is: **\`${PREFIX}\`**, type \`${PREFIX}help\` for more information!`);
    if(!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;

    let command = client.commands.get(cmd);
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
                    `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
                );
            };
        };

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.run(client, message, args, PREFIX);
        }catch(e) {
            console.log(e);
            return message.reply("Something went wrong while, running the: `" + command.name + "` command");
        }
    };
});