let ms = Date.now();

const { size_byte } = require("./utils/size_byte.js");
const { color } = require("./utils/color.js");
const config = require("./settings.json");
const fs = require("fs");
let errors = false;

function running() {
    return new Promise((resolve,reject) => {
        if(config.serverReplit) require("./modules/serverReplit/server.js").server();
        if(config.console) require("./modules/console/index.js");
        if(config.ErrorExit == false) {
            process.on("uncaughtException", err => {
                console.log(color(`[FatalErrorNoExit]\n${err.stack}`,{r: 220, g: 0, b: 0}));
                logsError(`[FatalErrorNoExit]\n${err.stack}`);
            });
            process.on('unhandledRejection', err => {
                console.log(color(`[ErrorPromise]: ${err.stack}`,{r: 220, g: 0, b: 0}));
                logsError(`[ErrorPromise]: ${err.stack}`);
            });
        };

        try {
            require("./bot/index.js");
        } catch(e) {
            console.log("[TryError]\n", e.stack);
            logsError(`[TryError]\n${e.stack}`);
        }
    });
}

start();

process.on("uncaughtExceptionMonitor", err => logsError(`[MonitorErrors]\n${err.stack}`));

async function start() {
    try {
        await running();
    } catch(e) {
        console.log("[CatchError]\n", e.stack);
        logsError(`[StartError]\n${e.stack}`);
    }
}

function status(boolean) {
    if(boolean) {
        return "включено";
    }else if(boolean === false) {
        return "выключено";
    }
}

function logsError(log) {
    if(config.logsError === false) return;
    fs.exists("./logs-error.log", e => {
        if(e === false) fs.writeFileSync("./logs-error.log",`----------[Create file on ${new Date().toString()}]----------`);
        if(errors) {
            fs.appendFileSync("./logs-error.log",`\n${log}`);
        }else {
            fs.appendFileSync("./logs-error.log",`\n----------[New logs on ${new Date().toString()}]----------\n${log}`);
        }
    });
}

if(config.debugStart) {
    console.log(`
        ========================[DEBUG]========================
        Задержка запуска: ${(Date.now() - ms)}ms
        Использование озу: ${size_byte(process.memoryUsage().rss)}
        консоль: ${status(config.console)}
        сервер replit: ${status(config.serverReplit)}
        Выход по ошибке: ${status(config.ErrorExit)}
        Сохранение логов: ${status(config.logsError)}
    `);
};

/*
Файл для запуска, так-же пригодится для тех, кому нужно шарды делать для бота
+ Уменьшит задержку запуска на бота, если это надо отдельно запускать вместе с ботом
*/
