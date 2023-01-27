const color = require("./color.js");
const time = require("./currentTime.js");

module.exports = (message, status) => {
    const colors = {
        "ok": [0,255,0],
        "info": [200,200,200],
        "warn": [250,250,0],
        "err": [235,72,72],
        "critical": [250,150,0]
    };

    if(!colors[status]) {
        console.log(color(`[${time()}] Не удалось отобразить сообщение`,[143,145,174]));
    } else console.log(color(`[${status.toUpperCase()} ${time()}] `, colors[status]) + message);
}