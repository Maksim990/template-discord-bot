const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("iniparser").parseSync(__dirname + "/../config.ini");
const colors = require("colors");
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/../cmds').filter(file => file.endsWith('.js'));
const rest = new REST({ version: '9' }).setToken(config.client.token);

for(const file of commandFiles){
	const command = require(__dirname + `/../cmds/${file}`);
	commands.push(command.help.slash);
}

(async () => {
	try{
		console.log('Запуск слеш команд (/)'.green.bold);

		await rest.put(
			Routes.applicationCommands(config.slash_commands.clientID),
			{ body: commands },
		);

		console.log('Обновление слеш команд (/)'.green.bold);
	}catch(err) {
		console.log(err);
	}
})();