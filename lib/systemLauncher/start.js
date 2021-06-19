"use strick";
require("cache-require-paths");
try{
var botconfig = require("../../botconfig.json");
}catch(e){}
const readline = require("readline");
const colors = require("colors");
const figlet = require("figlet");
const fs = require("fs");

fs.readFile("start.txt","utf-8",function(err,data){
    //console.log(data);
    if(data.substr(0,4) == "true"){
        console.log("\x1b[34m" + require("figlet").textSync("System\nLauncher\nv0.0.5"));
        console.log("\x1b[34m" + "Чтобы отключить лаунчер, напишите в start.txt, false");
        console.log("\x1b[34m" + "• В консоли существует команда exit");
    };
});

fs.readFile("start.txt", "utf-8", function(err,data){
    try{
        if(err) throw Error();
    }catch(e){
        console.log(colors.bgRed("Ошибка чтения, отсутствует файл start.txt".black));
        process.exit(1);
    }
    //console.log("start.txt : " + data);
    if(data.substr(0,4) == "true" || data.substr(0,5) == "false"){
        let dataTrueAndFalse = data.substr(0,4);
        if(dataTrueAndFalse == "true"){
            let rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false});
            rl.on("line",function(line){
                var message = line;
                var search = line;
                var color = "\x1b[34m";
                if(!message) return;
                if(search == "exit"){
                    let a;
                }else{
                    console.log(colors.bgRed("Команда не найдена".black));
                }
                if(message == "exit"){
                    console.log(color + "Выход");
                    setTimeout(() => {
                        process.exit(1);
                    }, 1);
                };
            });
            if(true){
                //Ряд проверок
                fs.readFile("./botconfig.json","utf-8",function(err){
                    if(err){
                        var err_botconfig = "Нет".red;
                    }else{
                        var yes_botconfig = "Да".green;
                    }
                    console.log("\x1b[34m" + "botconfig Имеется:" + `${err_botconfig || yes_botconfig}`);
                });
                //Сохранение botconfig.json
                fs.open("./.lib/systemLauncher/savebotconfig.txt", "w", function(err, fd){
                    if(err){
                        console.log(colors.bgRed("Не получается открыть файл savebotconfig.txt".black));
                        process.exit(1);
                    };
                    try{ var token = botconfig.token; var er1 = "(ошибок не найдено)" }catch(e){ var token; var err1 = "(ошибка токена)" }
                    if(!token){
                        var tokenFalse = "Нету";
                        console.log("\x1b[34m" + "Токен:" + "Нету".red);
                    }else{
                        var tokenTrue = `${token}`;
                        console.log("\x1b[34m" + "Токен:" + "Есть".green);
                    }
                    try{ var prefix = botconfig.prefix; var er2 = "(ошибок не найдено)"; var er3 = "(файл botconfig.json найден)" }catch(e){ var prefix; var err2 = "(ошибка префикса)"; var err3 = "(файл botconfig.json не найден)" }
                    if(!prefix){
                        var prefixFalse = "Нету";
                        console.log("\x1b[34m" + "Префикс:" + "Нету".red);
                    }else{
                        var prefixTrue = `${prefix}`;
                        console.log("\x1b[34m" + "Префикс:" + "Есть".green);
                    }
                    console.log("\x1b[34m" + "Автор шаблона:" + "Котик#9821".green);
                    console.log("\x1b[34m" + "Версия шаблона:" + "0.0.5".green);
                    let a = new Buffer.from(`Токен: ${tokenFalse || tokenTrue}${er1 || err1}\nПрефикс: ${prefixFalse || prefixTrue}${er2 || err2}\n${er3 || err3}`);
                    fs.write(fd, a, 0, a.length, null, function(err){
                        if(err){
                            console.log(colors.bgRed("Ошибка чтения файла savebotconfig.txt".black));
                        };
                        fs.close(fd, function(){
                            try{
                                let a = botconfig;
                                console.log("\x1b[34m" + "botconfig Сохранен:" + "Успешно".green);
                            }catch(e){
                                console.log("\x1b[34m" + "botconfig Сохранен:" + "Ошибка".red);
                            }
                        });
                    });
                });
                //Вывод окончательного старта
                try{
                    setTimeout(() => {
                        if(!botconfig.prefix){
                            console.log("\x1b[34m" + "\nПрефикс:" + "Нету".yellow);
                        }else{
                            console.log("\x1b[34m" + "Префикс:" + `${botconfig.prefix}`.green);
                        }
                    }, 2000);
                }catch(err){
                    console.log("\n\x1b[34m" + "Префикс:" + "Нету".red);
                }
                try{
                    setTimeout(() => {
                        if(!botconfig.user){
                            console.log("\x1b[34m" + "Пользователь:" + "example-user".yellow);
                        }else{
                            console.log("\x1b[34m" + "Пользователь:" + `${botconfig.user}`.green);
                        }
                    }, 2001);
                }catch(err){
                    console.log("\x1b[34m" + "Пользователь:" + "example-user".red);
                }
                //Конец кода
            };
        };
    }else{
        console.log(colors.bgRed("Ошибка данных, требуется ввести в файле start.txt\ntrue или false".black));
        process.exit(1);
    }
});

global.colors = colors;