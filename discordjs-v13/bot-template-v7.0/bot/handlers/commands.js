const ascii = require("ascii-table");
const fs = require("fs");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    fs.readdirSync(__dirname + "/../cmds/").forEach((dir) => {
        const commands = fs.readdirSync(__dirname + `/../cmds/${dir}`).filter(file => file.endsWith(".js"));
        for(let file of commands) {
            let pull = require(`../cmds/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, "ready");
            }else {
                table.addRow(file, "error");
                continue;
            }
            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString());
};