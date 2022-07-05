module.exports = {
    name: "test", //имя команды
    category: "test", //категория к которому относится команда
    aliases: ["t", "testinfo"], //скороченный ввод команды
    cooldown: 5, //задежка на использование команды 5 сек
    usage: "test <test>", //способ использования команды
    description: "команда для проверок", //описание для команды

    run: async (client, message, args, prefix) => { //место для вашего кода :з
        message.channel.send("obom");
        console.log("Задержка команды " + (Date.now() - ms) + "ms");
    }
}