(async() => {
    const { Client, Collection, GatewayIntentBits, PermissionFlagsBits } = require("discord.js");
    const fs = require("fs-extra");
    const util = require("util");

    const options = {
        intents: [
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.Guilds
        ],
        partials: ["MESSAGE", "CHANNEL", "REACTION"]
    };

    const RangColors = {
        RED: 0xff0000,
        GREEN: 0x00ff00,
        BLUE: 0x0000ff,
        YELLOW: 0xffff00,
        CYAN: 0x00ffff,
        MAGENTA: 0xff00ff,
        BLACK: 0x000000,
        WHITE: 0xffffff,
        GRAY: 0x808080
    };

    const permission = {
        SEND_MESSAGES: PermissionFlagsBits.SendMessages,
        EMBED_LINKS: PermissionFlagsBits.EmbedLinks
    };

    const { token, prefix, ADMIN, MODER, shards } = await JSON.parse(await fs.readFile("./config.json"));
    const { read, write } = require("./core/db");
    const { log } = require("./core/lib");
    const client = new Client(options);
    let db = await read();

    client.writeDB = async(obj) => { await write(obj) };
    client.readDB = async() => { return await read() };
    client.commands = new Collection();
    client.aliases = new Collection();
    client.setMaxListeners(10);
    client.flag = permission;
    db.core.shardLOCK = true;
    client.rg = RangColors;
    client.prefix = prefix;
    client.ADMIN = ADMIN;
    client.MODER = MODER;
    await write(db);

    if (client.ws.shards.every((shard) => shard.status === "ready")) {
        db.core.stateShard += 1;
        await write(db);

        if (db.core.stateShard == shards) {
            log("[shards] Все шарды успешно запущены!","ok");
            db.core.shardLOCK = false;
            db.core.stateShard = 0;
            await write(db);
        };

        //TODO: Не изменяйте эту функцию либо замените, чтобы не иметь проблем
        global.console.log = function(str) {
            if (typeof str === 'object') {
                str = util.inspect(str, { depth: null, colors: true });
            };

            if (client.options.shards[0] == 0) process.stdout.write(str + "\n");
        };
    };

    await client.login(token).then(() => {
        client.categories = fs.readdirSync(__dirname + "/cmds/");
        ["events","commands","message"].forEach(handler => {
            require(`./handlers/${handler}`)(client);
        });
    });
    setInterval(() => client.tm = process.hrtime());
})();