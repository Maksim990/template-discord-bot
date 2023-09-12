const { token } = require("../../config.json");
const { log } = require("../../core/lib");
const cmd = "command";

module.exports = {
    category: "dev",
    description: "?",
    usage: "test",
    cooldown: 10,
    name: cmd,
    run: async(client, message, args, mention) => {
        let db = await client.readDB();

        try {
            let [ar1, ar2] = [["off","err","ignore","adm"],["on","off"]];
            let embeds = [
                [{
                    color: client.rg.RED,
                    fields: [{
                        name: "❌Ошибка",
                        value: "Укажите тип выполнения\n```" +
                        "\noff - Выключить команду" +
                        "\nerr - Объявить ошибку в команде" +
                        "\nignore - Игнорировать ошибки в команде" +
                        "\nadm - Запретить использование команды, но может использоваться членами ADMIN/MODER - бота\n```"
                    }]
                }],
                [{
                    color: client.rg.RED,
                    fields: [{
                        name: "❌Ошибка",
                        value: "Укажите параметр```\non - включить\noff - выключить\n\n```"
                    }]
                }],
                [{ color: client.rg.RED, fields: [{ name: "❌Ошибка", value: "Укажите название команды" }] }],
                [{
                    color: client.rg.RED,
                    fields: [{
                        name: "❌Ошибка",
                        value: "Не удалось найти команду"
                    }]
                }],
                ["выключена"],
                ["с ошибкой"],
                ["игнорируется"],
                ["запрещена"]
            ];

            if (!args[0]) return message.channel.send({embeds:embeds[0]});
            if (!args[1]) return message.channel.send({embeds:embeds[1]});
            if (!args[2]) return message.channel.send({embeds:embeds[2]});
            if (!ar1.includes(args[0])) return message.channel.send({embeds:embeds[0]});
            if (!ar2.includes(args[1])) return message.channel.send({embeds:embeds[1]});
            if (!client.commands.has(args[2])) return message.channel.send({embeds:embeds[3]});

            switch(args[0]) {
                case "off":
                    if (args[1] == "on") {
                        if (db.cache.command.off.includes(args[2])) return message.reply(`Команда ${args[2]} уже ${embeds[4]}`);
                        db.cache.command.off.push(args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь ${embeds[4]}`);
                    };
                    if (args[1] == "off") {
                        if (!db.cache.command.off.includes(args[2])) return message.reply(`Команда ${args[2]} уже включена`);
                        db.cache.command.off = db.cache.command.off.filter(elem => elem != args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь не ${embeds[4]}`);
                    };
                    break;
                case "err":
                    if (args[1] == "on") {
                        if (db.cache.command.err.includes(args[2])) return message.reply(`Команда ${args[2]} уже ${embeds[5]}`);
                        db.cache.command.err.push(args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь ${embeds[5]}`);
                    };
                    if (args[1] == "off") {
                        if (!db.cache.command.err.includes(args[2])) return message.reply(`Команда ${args[2]} уже без ошибок`);
                        db.cache.command.err = db.cache.command.err.filter(elem => elem != args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь не ${embeds[4]}`);
                    };
                    break;
                case "ignore":
                    if (args[1] == "on") {
                        if (db.cache.command.ignore.includes(args[2])) return message.reply(`Команда ${args[2]} уже ${embeds[6]}`);
                        db.cache.command.ignore.push(args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь ${embeds[6]}`);
                    };
                    if (args[1] == "off") {
                        if (!db.cache.command.ignore.includes(args[2])) return message.reply(`Команда ${args[2]} уже без игнора ошибок`);
                        db.cache.command.ignore = db.cache.command.ignore.filter(elem => elem != args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь не ${embeds[6]}`);
                    };
                    break;
                case "adm":
                    if (args[1] == "on") {
                        if (db.cache.command.adm.includes(args[2])) return message.reply(`Команда ${args[2]} уже ${embeds[7]}`);
                        db.cache.command.adm.push(args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь ${embeds[7]}`);
                    };
                    if (args[1] == "off") {
                        if (!db.cache.command.adm.includes(args[2])) return message.reply(`Команда ${args[2]} уже без запрета`);
                        db.cache.command.adm = db.cache.command.adm.filter(elem => elem != args[2]);
                        await client.writeDB(db);
                        message.reply(`Команда ${args[2]} теперь не ${embeds[7]}`);
                    };
                    break;
            }
        } catch(err) {
            client.error.emit("error", { name: cmd, stack: err.stack }, message);
            await message.reply({embeds:[{color: client.rg.RED, fields: [{name: "❌Ошибка", value: "в команде произошла ошибка!\n```\n" + err.stack.replace(token, "cocks") + "\n```" }]}]});
        }
    }
}