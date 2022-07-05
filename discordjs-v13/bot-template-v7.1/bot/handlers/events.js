const log = require("../utils/logger.js");
module.exports = (client,prefix) => {
    client.on("ready", async () => {
        log(`Бот ${client.user.tag} запущен.`, "success");
        client.user.setActivity(`Префикс ${prefix}`, { type: "PLAYING" });
    });
};