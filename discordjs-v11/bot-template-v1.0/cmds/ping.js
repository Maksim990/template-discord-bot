const Discord = module.require("disocrd.js");
const fs = require("fs");
module.exports.run = asyns (bot,message,args) => {
    message.channel.send("типо пинг :3");
};
module.exports.help = {
    name: "ping"
};
