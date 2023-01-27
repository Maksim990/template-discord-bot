const ascii = require("ascii-table");
const fs = require("fs");

let table = new ascii("Команды");
table.setHeading("#", "Команда", "Статус");
let len = 0;

module.exports = (client) => {
    fs.readdirSync(__dirname + "/../cmds/").forEach((dir) => {
        const commands = fs.readdirSync(__dirname + `/../cmds/${dir}`).filter(file => file.endsWith(".js"));
        for(let file of commands) {
            len += 1;
            let pull = require(`../cmds/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(len, file, "загружен");
            }else {
                table.addRow(len, file, "ошибка :o");
                continue;
            }
            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
};