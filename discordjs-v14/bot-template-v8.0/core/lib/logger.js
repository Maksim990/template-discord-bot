const color = require("./color.js");
const time = require("./time.js");
const util = require("util");

module.exports = (message, status) => {
    const colors = {
        "ok": [0, 255, 0],
        "info": [200, 200, 200],
        "load": [120, 120, 180],
        "warn": [250, 250, 0],
        "err": [235, 72, 72],
        "critical": [250, 150, 0]
    };

    if (typeof message === "object") message = util.inspect(message, { depth: null, colors: true })

    if (!colors[status]) {
        console.log(color(`[${time("time min")}] Не удалось отобразить сообщение`, [143, 145, 174]));
    } else {
        console.log(color(`[${status.toUpperCase()} ${time("time min")}] `, colors[status]) + message);
    }
}