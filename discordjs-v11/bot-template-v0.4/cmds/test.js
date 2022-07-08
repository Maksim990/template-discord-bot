const colors = require("colors");
const backup = require("../.lib/systemLauncher/backup.json");
const system = backup.backup;
module.exports.run = async (bot,message,args) => {
    try{
        let User = bot.User;

        message.channel.send(`Привет ${User.toString()}`);
    }catch(err){
        if(system == true){
            message.channel.send({embed: { color: "RED", description: "❌ Ошибка команды\n```\n" + `${err.stack}` + "\n```" }});
            console.log(`${err.stack}`.red);
        }else{
            message.channel.send("Error\n```\n" + `${err.stack}` + "\n```");
            console.log(`${err.stack}`);
        }
    }
};
module.exports.help = {
    name: "test"
};