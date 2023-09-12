const { ignoreErr } = require("./config.json");
const { log, time } = require("../lib");
const fs = require("fs");
let start = true;

process.stdin.resume();

function logger(txt) {
    fs.appendFileSync(__dirname + "/../../errors.log", txt);
}

function exit(code) {
    if (!ignoreErr) {
        logger(`close code -> ${code}\n`);
        process.exit(code);
    };
    logger("close code -> OFF\n");
}

if (start) {
    logger(`Запуск -> ${time("data list")}\n`);
    start = false;
};

process.on("SIGINT", () => {
    log("[close]: This is program stopping\n","ok");
    logger(`CLOSE [ ${time("data list")} ] -> This is program stopping\n`);
    process.exit(10);
});

process.on("uncaughtException", err => {
    log(`[exception]: ${err.stack}`,"err");
    logger(`ERROR [ ${time("data list")} ] -> ${err.stack}\n`);

    exit(1);
});

process.on("uncaughtExceptionMonitor", err => {
    log(`[exceptionMonitor]: ${err.stack}`,"err");
    logger(`ERROR [ ${time("data list")} ] -> ${err.stack}\n`);

    exit(1);
});

process.on('unhandledRejection', err => {
    log(`[rejection]: ${err.stack}`,"err");
    logger(`ERROR [ ${time("data list")} ] -> ${err.stack}\n`);

    exit(1);
});