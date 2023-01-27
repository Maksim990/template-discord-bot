const { client } = require("../../bot/index.js");
const { color } = require("./utils/color.js");
const ascii = require("ascii-table");

let table = new ascii("Информация о командах");

table.setHeading("#", "Команда", "Описание");

process.stdin.on("data", data => {
    main(data.toString().replaceAll("\n","").replaceAll("\r",""));
});

function main(message) {
    let args = message.split(" ");

    if(message == "help") {
        table.addRow("1", "help", "Позволяет вызвать информацию о других командах");
        table.addRow("2", "eval", "Внутренее использование евала на бота");
        table.addRow("3", "exit", "Завершает работу бота");
        console.log(table.toString());
    };
    if(message.startsWith("eval")) {
        if(!args[1]) return console.log(color("Ошибка, укажите текст для выполнения кода",{r: 255, g: 0, b: 0}));
        args = args.slice(1).join(" ");
        try{
            let evaled = eval(args);
            evaled = require("util").inspect(evaled);
            console.log(evaled);
        }catch(err){
            console.log(color(`${err.stack}`,{r: 250, g: 0, b: 0}));
        }
    };
    if(message == "exit") {
        process.exit(0);
    };
}

console.log(color(`Started console command beta1.2`,{r: 180, g: 180, b: 180}));