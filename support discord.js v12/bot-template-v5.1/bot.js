//require
const systemLauncher = require("./lib/systemLauncher/start.js");
const functions = require("./lib/functions.js");
const Discord = require("discord.js");
const fs = require("fs");
//setting bot
setTimeout(() => {
    const bot = new Discord.Client();
    bot.commands = new Discord.Collection();
    var start_login;
    try{
        const botconfig = require(`./${settings.botconfig}`);
        if(!botconfig.token){ start_login = false }else{ start_login = true }
        bot.login(botconfig.token);
    }catch(err){
        start_login = false;
        console.log(colors.bgRed(`Не удалось найти файл ${settings.botconfig}`.black));
    }
//you code
var dirFolder = [
    "./cmds/"
];
fs.readdir(dirFolder[0],(err,files)=>{
    if(err) console.log(err);
    
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) return console.log("\nНет команд для загрузки".red);
    console.log("\x1b[34m" + `\nЗагружено ${jsfiles.length} команд в папке ${dirFolder[0]}`);
    jsfiles.forEach((f) => {
        let props = require(`${dirFolder[0]}${f}`);
        try{
            bot.commands.set(props.help.name,props);
        }catch(err){
            console.log(colors.bgRed("Видимо не дописал в файле название команды".black));
            process.exit(1);
        }
    });
});

setTimeout(() => {
    if(start_login == true){
        let block;
    }else{
        console.log(`Бот выключен!`.red);
    }
}, 1000);

bot.on("ready", () => {
    if(start_login == true){
        console.log("\x1b[34m" + `Бот ${bot.user.username} включен!`);
    }else{
        console.log(`Бот ${bot.user.username} выключен!`.red);
    }
});

bot.on("message", (message) => {});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    let user = message.author.username;
    let userid = message.author.id;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let argnext = message.content.split(" ").slice(1).join(" ");

    if(!message.content.startsWith(prefix)) return;
    
    let cmd = bot.commands.get(command.slice(prefix.length));
    //переменные для удобного кодинга
    let msg = message;
    //Основное использование message.author.<encoding>
    bot.mth = msg.author;
    //Упомянуть никого(себя) или кого-то(упомянение)
    bot.user = msg.mentions.users.first() || msg.author;
    //Дата время
    bot.time = time();

    try{
        if(cmd) cmd.run(bot,message,args,argnext);
    }catch(err){
        console.log(colors.bgRed("Не получилось прочитать команду\n".black) + "'module.exports.run = async (bot,message,args) => {};'".red);
    }
});
}, 1000); //Не уберай, иначе будет не красиво в консоли