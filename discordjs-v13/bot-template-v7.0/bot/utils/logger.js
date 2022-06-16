const time = require("./currentTime.js");
const color = require("./color.js");

module.exports = (message, type) => {
    const types = {
        "error": {
            r: 235,
            g: 72,
            b: 72,
        },
        "warn": {
            r: 255,
            g: 255,
            b: 0
        },
        "info": {
            r: 180,
            g: 180,
            b: 180
        },
        "success": {
            r: 0,
            g: 255,
            b: 0
        },
    }

    console.log(color(`[${type.toUpperCase()}][${time()}] ${message}`, types[type]))
}