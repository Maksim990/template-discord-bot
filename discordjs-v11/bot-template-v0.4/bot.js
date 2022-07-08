//requires
const systemLibrary = require("./.lib/systemLauncher/index.js");
const backup = require("./.lib/systemLauncher/backup.json");
const Discord = require("discord.js");
const fs = require("fs");
const colors = require("colors");
//settings bot
const bot = new Discord.Client(); //Клиент бот
bot.commands = new Discord.Collection();
const botconfig = require("./botconfig.json");
const token = botconfig.token;
const prefix = botconfig.prefix;
const version = botconfig.version;
const Author = botconfig.author;
const system = backup.backup;

if(system == true){
    if(!token){
        console.log(colors.bgRed("Нет токена".black));
        setTimeout(() => {
            console.log(colors.bgBlue("Авто выход".black));
            process.exit(1);
        }, 1000);
        return;
    };
};
//You code
fs.readdir("./cmds/",(err,files)=>{
    if(err) console.log(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) return console.log(colors.bgWhite("Нет команд для загрузки".black));
    console.log(`Загружено ${jsfiles.length} команд\n`.green);
    jsfiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        try{
          bot.commands.set(props.help.name,props);
        }catch(err){
            if(system == true){
                console.log(colors.bgRed("Упс не могу запустить команды, походу где-то в папке cmds, файлах не написан\nmodule.exports.help = {\n    name: " + '"' + "test" + '"' + "\n};\nчтобы я смог прочитать ваш код"));
                setTimeout(() => {
                    console.log(colors.bgGreen("Авто выход и за ошибки".black));
                    process.exit(1);
                }, 5000);
            }else{
                console.log(`${err.stack}`);
            }
        }
    });
});

bot.on("ready", () => {
    console.log(`Бот ${bot.user.username} включен!\nВерсия шаблона: ${version}\nАвтор шаблона: ${Author}`);
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
    //variables
    var msg = message;
    //общие использование message.author.<function>
    bot.mth = msg.author;
    //упомянуть чтобы получить данные участника
    bot.User = msg.mentions.users.first() || msg.author;
    //bot.rUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));

    if(cmd) cmd.run(bot,message,args);
});

bot.login(token);