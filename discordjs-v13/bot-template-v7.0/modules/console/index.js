const { client } = require(__dirname + "/../client/client.js");
const { color } = require("./utils/color.js");

process.stdin.on("data", data => {
    main(data.toString().replaceAll("\n","").replaceAll("\r",""));
});

console.log(color("Started console command version beta1.1",{r: 180, g: 180, b: 180}));
process.consoleStart = Date.now();

function main(message) {
    let args = message.split(" ");

    if(message == "help") {
        console.log(`
            info command
            help - help commands
            eval - inside eval
            exit - exit and stop script
        `);
    };
    if(message == "exit") {
        process.exit(0);
    };
    if(message.startsWith("eval")) {
        if(!args[1]) return console.log(color("Error, required to enter is text",{r: 255, g: 0, b: 0}));
        args = args.slice(1).join(" ");
        try{
            let evaled = eval(args);
            evaled = require("util").inspect(evaled);
            console.log(evaled);
        }catch(err){
            console.log(color(`${err.stack}`,{r: 250, g: 0, b: 0}));
        }
    };
}