const { MessageButton, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
module.exports.run = async (client,message,args,user) => {
        
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		message.channel.send({ content: 'Pong!', components: [row] });

        const roww = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		message.channel.send({ content: 'Pong!', components: [roww] });
};
module.exports.interaction = (client,interaction) => {
    let cid = interaction.customId;
    //console.log(interaction)
    console.log(cid)

    if(interaction.values == "first_option"){
        interaction.reply("Hello")
    }

    if(cid == "primary"){
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY')
                .setDisabled(true),
			);

		interaction.reply({ ephemeral: true, content: 'Pong!', components: [row] });
    }
};
module.exports.help = {
    name: "test",
    "slash": {
        name: "test",
        description: "Тест команда, для тест команд"
    }
};