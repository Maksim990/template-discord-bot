const { size_byte, FileSize } = require("../../core/lib");
const { token } = require("../../config.json");
const system = require("systeminformation");
const cpu = require("node-os-utils").cpu;
const fs = require("fs-extra");
const os = require("os");
const cmd = "stat";

module.exports = {
    category: "test",
    description: "?",
    usage: "test",
    cooldown: 10,
    name: cmd,
    run: async(client, message, args, mention) => {
        try {
            const ping = await client.shard.fetchClientValues("ws.ping");
            let [platform, cmds, guilds, users] = [0, 0, 0, 0];
            let createdAt = client.user.createdAt;
            let startCommand = Date.now();

            //сбор данных
            (await client.shard.broadcastEval((client) => client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0))).map(arr => users += arr);
            (await client.shard.fetchClientValues("guilds.cache.size")).map(arr => guilds += arr);
            createdAt = `<t:${Math.round(new Date(createdAt).getTime()/1000)}>`
            platform = process.platform.toLowerCase();

            fs.readdirSync(__dirname + "/../").forEach((dir) => {
                const commands = fs.readdirSync(__dirname + `/../${dir}`).filter(file => file.endsWith(".js"));
                for (let file of commands) {
                    cmds += 1;
                }
            });

            //подготовка
            const a = Date.now();
            const m = await message.channel.send("loading info...");
            let v = Date.now() - a;
            m.delete();

            startCommand = (Date.now() - startCommand);
            let mem = await system.mem();

            const end = process.hrtime(client.tm);
            const timeInNanoseconds = end[0] * 1e9 + end[1];
            const botms = timeInNanoseconds / 1e6;

            message.channel.send({embeds: [{
                fields: [
                    {
                        name: "**Запуск бота**",
                        value: `> Запущен бот: <t:${Math.round(new Date(client.readyAt).getTime()/1000)}>` +
                        `\n> Кол-во команд: ${cmds}` +
                        `\n> База данных: ${size_byte(FileSize(__dirname + "/../../core/db"))}` +
                        `\n> Платформа: ${platform}`,
                        inline: true
                    },
                    {
                        name: "**Информация о боте**",
                        value: `> Создан бот: ${createdAt}` +
                        `\n> Версия бота: -` +
                        `\n> Участников: ${users}` +
                        `\n> Серверов: ${guilds}`,
                        inline: true
                    },
                    {
                        name: "**Информация о системе**",
                        value: `> Нагрузка цп: ${await cpu.usage().then(info => info)}%` +
                        `\n> Используется озу: ${size_byte(process.memoryUsage().heapUsed + process.memoryUsage().external)}` +
                        `\n> Пинг: ${ping[message.guild.shardId]}ms`,
                        inline: false
                    },
                    {
                        name: "**Среда разработки**",
                        value: `> discord.js ${require(process.cwd() + "/package.json").dependencies["discord.js"].replace("^", "v")}` +
                        `\n> nodejs ${process.version}`,
                        inline: true
                    },
                    {
                        name: "**Локальное время ответа**",
                        value: `> Бот: ${botms.toFixed(3)}ms` +
                        `\n> Команда: ${startCommand - v}ms` +
                        `\n> Время ответа: ${v}ms`,
                        inline: true
                    }
                ]
            }]});
        } catch(err) {
            client.error.emit("error", { name: cmd, stack: err.stack }, message);
            await message.reply({embeds:[{color: client.rg.RED, fields: [{name: "❌Ошибка", value: "в команде произошла ошибка!\n```\n" + err.stack.replace(token, "cocks") + "\n```" }]}]});
        }
    }
}