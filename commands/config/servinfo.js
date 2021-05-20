const Discord = require("discord.js")

const name = 'servinfo'
const category = 'config'

module.exports = {
    name,
    category,
	description: 'Information about the server',
	aliases: ['si'],
	usage: '<none>',
    args: false,
    admin: false,
    loaded: true,
    
    run: async (message, args, client, langFile) => {

        const langF = langFile.commands[category][name]

        let serv = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setTitle(`${langF.name} ${message.guild.name}`)
            .addField(langF.members,` ${message.guild.memberCount}`)
            .addField(langF.owner,`${message.guild.owner}`)
            .setFooter("Pronobot - ©2021")
            .setColor('#0099ff')
        
        await message.channel.send(serv);
    }
}