let ms = Date.now();

const { size_byte } = require("./utils/size_byte.js");
const config = require("./settings.json");
const color = require("./utils/color.js");
const log = require("./utils/logger.js");
const util = require('util');
const fs = require("fs");

if(config.welcome) {
    console.log(color("Приветствую друг :), спасибо что используете этого бота, не забывайте проверять время от времени обновления",[180,10,40]));
    config.welcome = false;
    fs.writeFileSync("./settings.json",JSON.stringify(config,null,4));
};

let err, _log = true;

process.on("uncaughtExceptionMonitor", err => logsError(`[MonitorErrors]\n${err.stack}`));

function logsError(log) {
    if(config.logsError === false) return;
    fs.exists("./errors.log", e => {
        if(e === false) fs.writeFileSync("./errors.log",`----------[Create file on ${new Date().toString()}]----------`);
        if(err) {
            fs.appendFileSync("./errors.log",`\n----------[New logs on ${new Date().toString()}]----------\n${log}`);
            err = false;
        } else {
            fs.appendFileSync("./errors.log",`\n${log}`);
        }
    });
}

function logsConsole(log) {
    if(config.logsConsole === false) return;
    fs.exists("./console.log", e => {
        if(e === false) fs.writeFileSync("./console.log",`----------[Create file on ${new Date().toString()}]----------`);
        if(_log) {
            fs.appendFileSync("./console.log",`\n----------[New logs on ${new Date().toString()}]----------\n${log}`);
            _log = false;
        } else {
            fs.appendFileSync("./console.log",`${log}`);
        }
    });
}

function running() {
    return new Promise((resolve,reject) => {
        if(config.logsConsole) {
            /*
            ! Функция console.log заменена тут, не стоит нечего трогать, если не знаете что делаете :)
            ? Если это выполнение не нужно, и вы хотите что-то другое тут видеть, можно убрать
            */
            const regex = new RegExp('\\[38;2;\\d+;\\d+;\\d+m|\\[0m', 'g');
            let stdout = process.stdout;

            console.log = function(str) {
                logsConsole(util.format(str.replace(regex, '')) + "\n");
                stdout.write(util.format(str) + "\n");
            };
        };
        if(config.serverReplit) require("./modules/serverReplit/server.js").server();
        if(config.console) require("./modules/console/index.js");
        if(config.ErrorExit == false) {
            process.on("uncaughtException", err => {
                log(`[FatalErrorNoExit]\n${err.stack}`,"err");
                logsError(`[FatalErrorNoExit]\n${err.stack}`);
            });
            process.on('unhandledRejection', err => {
                log(`[ErrorPromise]: ${err.stack}`,"err");
                logsError(`[ErrorPromise]: ${err.stack}`);
            });
        };

        try {
            require("./bot/index.js");
        } catch(err) {
            log(`[TryError]: ${err.stack}`,"critical");
            logsError(`[TryError]\n${err.stack}`);
        }
    });
}

async function start() {
    try {
        console.log(`Ваша платформа определена как ${process.platform}`);
        await running();
    } catch(err) {
        log(`[CatchError]: ${err.stack}`,"critical");
        logsError(`[StartError]\n${err.stack}`);
    }
}

start();

function status(boolean) {
    if(boolean) {
        return "включено";
    }else if(boolean === false) {
        return "выключено";
    }
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
        Логирование консоли: ${status(config.logsConsole)}
    `);
};

/*
? Файл для запуска, так-же пригодится для тех, кому нужно шарды делать для бота
TODO Уменьшит задержку запуск на бота, если это надо отдельно запускать вместе с ботом
*/