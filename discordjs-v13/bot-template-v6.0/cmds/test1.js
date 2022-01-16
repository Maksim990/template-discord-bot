const functions = require("../lib/functions.js");
module.exports.run = async (client,message,args,user) => {
    let author = message.author;
    let guild = message.guild;
    const exampleEmbed = {
        color: 0x0099ff,
        title: 'Some title',
        url: 'https://discord.js.org',
        author: {
            name: 'Some name',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
            url: 'https://discord.js.org',
        },
        description: 'Some description here',
        thumbnail: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        fields: [
            {
                name: 'Regular field title',
                value: 'Some value here',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
        ],
        image: {
            url: 'https://i.imgur.com/wSTFkRM.png',
        },
        timestamp: new Date(),
        footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
        },
    };
    message.channel.send({embeds: [exampleEmbed] });
    message.channel.send({embeds: [{color: "RANDOM", description: `Привет ${user.toString()}`, fields: [{ name: "Привет код", value: `UptimeBot: ${timer(client.uptime)}`}]}]})
};
module.exports.interaction = (client,interaction) => {};
module.exports.help = {
    name: "test1",
    "slash": {
        name: "test1",
        description: "Тест команда, для тест команд"
    }
};