module.exports.run = async (bot,message,args) => {
    let mth = bot.mth;
    message.channel.send(`Привет: ${mth.toString()}`);
};
module.exports.help = {
    name: "test"
};