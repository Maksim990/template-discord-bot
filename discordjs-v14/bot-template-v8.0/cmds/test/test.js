const { token } = require("../../config.json");
const { log } = require("../../core/lib");
const cmd = "test";

module.exports = {
    category: "test",
    description: "?",
    usage: "test",
    cooldown: 10,
    name: cmd,
    run: async(client, message, args, mention) => {
        try {
            message.reply("kek");
        } catch(err) {
            client.error.emit("error", { name: cmd, stack: err.stack }, message);
            await message.reply({embeds:[{color: client.rg.RED, fields: [{name: "❌Ошибка", value: "в команде произошла ошибка!\n```\n" + err.stack.replace(token, "cocks") + "\n```" }]}]});
        }
    }
}