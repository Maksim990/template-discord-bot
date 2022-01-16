const colorEmbed = require("../lib/RandomColorEmbed/index.js");
module.exports.run = async (bot,message,args,argnext) => {
    try{
        let mth = bot.mth;
        let user = bot.user;
        let time = bot.time;
        message.channel.send({embed:{
            color: colorEmbed.randomColor(),
            description: `Привет ${user.toString()}`,
            footer: {
                text: "test, " + mth.username + " | " + time
            }
        }});
    }catch(err){
        message.channel.send({embed: { color: "RED", description: "❌Ошибка команды\n```\n" + `${err.stack}` + "\n```", footer: { text: "Error the " + time()}}});
    }
};
module.exports.help = {
    name: "test"
};