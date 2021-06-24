//require
const systemLauncher = require("./lib/systemLauncher/start.js");
const child_process = require("child_process");
const Discord = require("discord.js");
const fs = require("fs");
//setting bot
setTimeout(() => {
    const bot = new Discord.Client();
    bot.commands = new Discord.Collection();
    const botconfig = require("./botconfig.json");
    const prefix = botconfig.prefix;
    bot.login(botconfig.token);
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
        let props = require(`./cmds/${f}`);
        try{
            bot.commands.set(props.help.name,props);
        }catch(err){
            console.log(colors.bgRed("Видимо не дописал в файле название команды".black));
            process.exit(1);
        }
    });
});

bot.on("ready", () => {
    console.log("\x1b[34m" + `Бот ${bot.user.username} включен!`);
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

    if(!message.content.startsWith(prefix)) return;
    
    let cmd = bot.commands.get(command.slice(prefix.length));
    //переменные для удобного кодинга
    let msg = message;
    //Основное использование message.author.<encoding>
    bot.mth = msg.author;
    //Упомянуть никого(себя) или кого-то(упомянение)
    bot.user = msg.mentions.users.first() || msg.author;

    try{
        if(cmd) cmd.run(bot,message,args);
    }catch(err){
        console.log(colors.bgRed("Не получилось прочитать команду\n".black) + "'module.exports.run = async (bot,message,args) => {};'".red);
    }
});
}, 1000); //Не уберай, иначе будет не красиво в консоли