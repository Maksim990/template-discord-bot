const { log } = require("../core/lib");

module.exports = async client => {
    let db = await client.readDB();

    client.on("ready", async () => {
        log(`Бот ${client.user.tag} запущен.`, "ok");

        client.user.setActivity(`Префикс ${client.prefix} | ...`)
        setInterval(() => client.user.setActivity(`Префикс ${client.prefix} | ...`),60000);

        //TODO: Не трогайте эту функцию, чтобы избежать проблем с рейт-лимитами и шардами.
        process.on("SIGINT", async() => {
            try {
                db = await client.readDB();
                db.core.stateShard = 0;
                await client.writeDB(db);
                client.destroy();
                process.exit(1);
            } catch(err) {
                db.core.stateShard = 0;
                await client.writeDB(db);
                client.destroy();
                process.exit(1);
            }
        });
    });
};