const { Client, Collection, Intents } = require("discord.js");
const config = require("iniparser").parseSync("./config.ini");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Collection();
client.login(config.client.token);
const prefix = config.client.prefix;
//Твои библиотеки
const functions = require("./lib/functions.js"); //Описания функций закомментировано
require("./lib/slash-commands.js");
const colors = require("colors");
require("cache-require-paths");
const fs = require("fs");

fs.readdir("./cmds/",(err,files)=>{
    if(err) console.log(err);
    
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) return console.log("Нет команд для загрузки".red.bold);
    console.log(`Загружено ${jsfiles.length} команд в папке ./cmds/`.yellow.bold);
    jsfiles.forEach((f) => {
        let props = require(`./cmds/${f}`);
        client.commands.set(props.help.name,props);
    });
});

client.on("ready", () => {
    console.log("Версия шаблон бота: ".green.bold + "v6.0.0".yellow.bold);
    console.log("Автор шаблона: ".green.bold + "Котик9821(Github:Maksim990)".yellow.bold);
    console.log("Пользователь шаблона: ".blue.bold + `${config.client.user}`.green.bold);
    console.log(`Запущен бот ${client.user.username}`.blue.bold);
});

client.on("interactionCreate", async interaction => {
    fs.readdir("./cmds/",(err,files)=>{
        if(err) console.log(err);
        
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        jsfiles.forEach((f) => {
            let props = require(`./cmds/${f}`).interaction(client,interaction);
        });
    });
    if(interaction.commandName == "test"){
        interaction.reply("Привет мой плюшевый мишка");
    }
});

client.on("messageCreate", async message => {
    /*function send(text, args, boolean){
        //Убирайте этот код, работает криво. Если есть идеи его переделать пожалуйста.
        //Эта функция выполняет режим парсера для объектов, и не дает создать ошибку при пустом сообщение,
        // + присутсвует логгер, парсер и логгер можно выключать, по умолчанию логгер включен
        if(boolean == true){}else{boolean = false}
        if(boolean == false){
            if(String(JSON.stringify(text)).includes("embeds")){
                console.log(`POST(EMBED): ${JSON.stringify(text)}`.yellow.bold);
                message.channel.send(text);
            }else if(String(JSON.stringify(text)).includes("components")){
                console.log(`POST(ACTION): ${JSON.stringify(text)}`.yellow.bold);
                message.channel.send(text);
            }else{
                if(args == true){}else{args = false}
                if(args == false){
                    if(typeof text == "object") return message.channel.send(JSON.stringify(text,null,4));
                }else{
                    message.channel.send(text);
                }
                if(text && text != ""){message.channel.send(text);}else{console.log("POST(ERROR): Cannot send an empty message".red.bold)}
            };
        }else{
            if(String(JSON.stringify(text)).includes("embeds")){
                message.channel.send(text);
            }else if(String(JSON.stringify(text)).includes("components")){
                message.channel.send(text);
            }else{
                if(args == true){}else{args = false}
                if(args == false){
                    if(typeof text == "object") return message.channel.send(JSON.stringify(text,null,4));
                }else{
                    message.channel.send(text);
                }
                if(text && text != "") message.channel.send(text);
            };
        }
    }*/

    //проверка
    if(message.author.bot) return;
    if(message.channel.type == "DM") return;
    if(!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let user = message.mentions.users.first() || message.author;
    var cmd = client.commands.get(command.slice(prefix.length));

    if(!message.content.startsWith(prefix)) return;
    if(cmd) cmd.run(client,message,args,user);
});