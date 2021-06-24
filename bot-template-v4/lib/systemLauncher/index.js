const botconfig = require("../../botconfig.json");
const fs = require("fs");
const backup = require("./backup.json");
const colors = require("colors");
let token = botconfig.token;
let prefix = botconfig.prefix;
let version = botconfig.version;
let author = botconfig.author;
let system = backup.backup;

if(system == true){
    console.log(colors.bgWhite("System launcher v0.1\n".black));
    console.log("• Если не нравится лаунчер, можно выключить написав в файле backup.json " + '{"' + "backup" + '":false}\n');

    let buffer = new Buffer.from(`Токен : ${token}\nПрефикс : ${prefix}\nВерсия шаблона : ${version}\nАвтор шаблона : ${author}`);

    fs.open("./.lib/systemLauncher/backup.txt", "w", function(err, fd){
        if(err){
            throw `не возможно открыть файл: ${err}`.orange;
        };

        fs.write(fd, buffer, 0, buffer.length, null, function(err){
            if(err) throw `Ошибка записи файла: ${err}`.orange;
            fs.close(fd, function(){
                console.log("обновлено сохранение резервного файла botconfig.json\nпуть: /.lib/systemLauncher/backup.txt\n".blue);
            });
        });
    });
}else{
    console.log(colors.bgWhite("System off\n".black));
}