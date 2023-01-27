const { color } = require("./utils/color.js");
const config = require("./settings.json");

if(config.serverReplit == true) require("./modules/serverReplit/server.js").server();
if(config.console == true) require("./modules/console/index.js");
if(config.ErrorExit == false) {
    process.on("uncaughtException", err => {
        console.log(color(`[FatalErrorNoExit]\n${err.stack}`,{r: 120, g: 0, b: 0}));
    });
};

try {
    require("./bot/index.js");
} catch(e) {
    console.log("[TryError]\n", e);
}

/*
Файл для запуска, так-же пригодится для тех, кому нужно шарды делать для бота
+ Уменьшит задержку запуска на бота, если это надо отдельно запускать вместе с ботом
*/