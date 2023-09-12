const { token } = require("../../config.json");
const cmd = "eval";

module.exports = {
    category: "dev",
    description: "Евал для теста функций, или проверка кода",
    usage: "eval <blockpost> <code>",
    cooldown: 10,
    name: cmd,
    run: async(client, message, args, mention, log) => {
        try {
            if (!client.ADMIN.includes(message.author.id)) {
                message.channel.send({embeds:[{ color: client.rg.RED, fields:[{ name:"❌Ошибка", value: "Эта команда доступна только создателю бота" }]}]});
                return;
            };

            let code = args.join(" ");
            const matched = code.match(/`{3}(?:js)?\n(?<code>.+)\n`{3}/s);
            if (!matched) {
                await message.channel.send({embeds:[{ color: client.rg.RED,fields:[{ name:"❌Ошибка", value:"Укажите код, который запустится" }]}]});
                return;
            } else code = matched.groups.code;

            try {
                const evaled = eval(`(async () => {\ntry{${code}}catch(err){log(err.stack)}\n})();`);
                //"try{${code}}catch(err){log(err.stack)}"
                if (typeof evaled !== "string") {
                    const text = require("util").inspect(evaled);
                    const arr = text.split("\n");
                    let already = "";
        
                    while (arr.length) {
                        const element = arr.shift();
                        if (already.length + element.length > 1900) {
                            message.reply("`\``js\n" + already + "\n`\``");
                            already = "";
                        };
        
                        already += element + "\n";
                    }
                    if (already.length) await message.reply("`\``js\n" + already + "\n`\``");
                };
            } catch (e) {}
        } catch (err) {
            client.error.emit("error", { name: cmd, stack: err.stack }, message);
            await message.reply({embeds:[{color: client.rg.RED, fields: [{name: "❌Ошибка", value: "в команде произошла ошибка!\n```\n" + err.stack.replace(token, "cocks") + "\n```" }]}]});
        }
    }
}