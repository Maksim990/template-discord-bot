const color = require("./color.js");

module.exports = (message, status) => {
    const colors = {
        "ok": [0,255,0],
        "info": [200,200,200],
        "warn": [250,250,0],
        "err": [235,72,72],
        "critical": [250,150,0]
    };

    if(!colors[status]) {
        console.log(color(`[unknown] Не удалось отобразить сообщение`,[143,145,174]));
    } else console.log("[ " + color(`${status.toUpperCase()}`, colors[status]) + ` ]${message}`);
}