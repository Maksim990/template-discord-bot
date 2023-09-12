const { Collection } = require("discord.js");
const { log, time } = require("../core/lib");
const { EventEmitter } = require("events");
const fs = require("fs");
class errors extends EventEmitter {}
const error = new errors();

module.exports = async client => {
    const cooldown = new Collection();
    let db = await client.readDB();
    const ping = new Collection();
    const prefix = client.prefix;

    //обработка ошибок от команд
    function logErr(txt) {
        fs.appendFileSync(__dirname + "/../errors.log", txt + "\n");
    }

    error.on("error", async (obj, message) => {
        db = await client.readDB();
        log(`[ErrCommand]: ${obj.stack}`,"err");
        logErr(`ERROR [ ${time("data list")} ] -> ${obj.stack}`);

        if (!db.cache.command.ignore.includes(obj.name)) {
            db.cache.command.err.push(obj.name);
            await client.writeDB(db);
        } else {
            await message.channel.send({embeds:[{
                color: client.rg.YELLOW,
                fields: [{
                    name: "⚠️Предупреждение",
                    value: "Ошибки на команде игнорируются, посмотрите логи"
                }]
            }]});
        }
    });
    client.error = error;

    client.on("messageCreate", async message => {
        if (!message) return;
        if (!message.guild) return;
        if (!message.channel.permissionsFor(client.user).has([client.flag.SEND_MESSAGES, client.flag.EMBED_LINKS])) return;

        if (message.content.startsWith(`<@${client.user.id}>`)) {
            const amountping = 5 * 1000;
            const now = Date.now();

            if (ping.get(message.author.id)) {
                const expirationTime = ping.get(message.author.id) + amountping;
                if (now < expirationTime) return message.react("❌");
            };

            ping.set(message.author.id, now);
            if (client.ADMIN.includes(message.author.id)) ping.delete(message.author.id);
            setTimeout(() => ping.delete(message.author.id), amountping);

            await message.reply(`Мой префикс: **\`${prefix}\`**, используйте \`${prefix}help\` для подробной информации`);
            return;
        };
        if (!message.content.startsWith(prefix)) return;

        //обработка текста
        const filter = message.content.replace(/\\u/g, '\\\\u');
        const args = filter.slice(prefix.length).trim().split(/ +/g);
        const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const cmd = args.shift().toLowerCase();
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        db = await client.readDB();

        //лог команда
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

        if (command) {
            if (db.core.shardLOCK) {
                message.channel.send({embeds: [{ color: client.rg.RED, fields: [{ name: "❌Ошибка", value: "Бот ещё не закончил запуск" }]}]});
                return;
            };

            if (db.cache.command.off.includes(cmd)) {
                message.channel.send({embeds: [{ color: client.rg.RED, fields: [{ name: "❌Ошибка", value: "На данный момент эта команда выключена" }]}]});
                return;
            };

            //тайм-аут команд
            if (!cooldown.has(command.name)) {
                cooldown.set(command.name, new Collection());
            };

            const now = Date.now();
            const timestamps = cooldown.get(command.name);
            const cooldownAmount = (command.cooldown || 1) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) return message.react("❌");
            };

            timestamps.set(message.author.id, now);
            if (client.ADMIN.includes(message.author.id)) timestamps.delete(message.author.id);
            if (client.MODER.includes(message.author.id)) timestamps.delete(message.author.id);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            if (db.cache.maintenance) {
                message.channel.send({embeds: [{ color: client.rg.RED, fields: [{ name: "❌Ошибка", value: "Команда недоступна, тех.обслуживание бота" }]}]});
                return;
            };

            if (db.cache.command.adm.includes(cmd)) {
                if (!client.ADMIN.includes(message.author.id)) {
                    if (!client.MODER.includes(message.author.id)) {
                        message.channel.send({embeds:[{ color: client.rg.RED, fields: [{ name: "❌Ошибка", value: "Команда недоступна для использования" }]}]});
                        return;
                    };
                };
            };

            //функции
            function send(txt) {
                const text = require("util").inspect(txt);
                const arr = text.split("\n");
                let already = "";

                while (arr.length) {
                    const element = arr.shift();
                    if (already.length + element.length > 1900) {
                        types(already);
                        already = "";
                    };

                    already += element + "\n";
                }
                if (already.length) types(already);
            }
            function types(msg) {
                if (typeof msg == "object") message.channel.send("```js\n" + require("util").inspect(msg,false,null) + "\n```");
                if (!msg || typeof msg == "number" || typeof msg == "boolean") message.channel.send("```js\n" + String(msg) + "\n```");
                if (typeof msg == "string") message.channel.send("```js\n" + msg + "\n```");
            }

            //выполнение команд
            try {
                command.run(client, message, args, mention, send);
            } catch(err) {
                log(`[run]: ${err.stack}`,"err");
            }
        };
    });
};