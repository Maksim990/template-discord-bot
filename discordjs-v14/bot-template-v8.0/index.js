const { token, process: processN, shards } = require("./config.json");
const { ShardingManager } = require("discord.js");
const { log } = require("./core/lib");
const process = require("process");
require("./core/optimize");
const os = require("os");
let state = true;

process.stdin.resume();
process.title = processN;

async function running() {
    if (!token) {
        log("[bot] Не указан токен бота, запуск невозможен","critical");
        process.exit(0);
    };

    if (shards >= os.cpus().length) log(`[start] Процессор перегружен, запущено больше ${os.cpus().length} процессов на поток`,"warn");

    let start = 0;
    const manager = new ShardingManager("./client.js", {
        token: token,
        totalShards: shards,
        timeout: -1,
        shardDelay: 5*1000,
        execArgv: ["--no-warnings"]
    });

    manager.on("debug", d => {
        log(`[Debug Shard]: ${d}`, "info");
    });

    manager.on("shardCreate", async shard => {
        log(`Запущен шард ${shard.id + 1}/${shards}`, "info");
        start++;

        if (start === shards) state = true;
    });

    manager.spawn({ timeout: -1, shardDelay: 5 * 1000 });
}

async function start() {
    try {
        if (state) {
            if (process.platform !== "linux") {
                log("Некоторые функции могут не работать на вашей платформе","warn");
            };
            state = false;
        };
        await running();
    } catch (err) {
        log(`[StartError]: ${err.stack}`,"critical");
    }
}
start();