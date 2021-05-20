const Discord = require("discord.js")

module.exports = {
    name: 'servinfo',
    category: 'Config',
	description: 'Information sur le server',
	aliases: ['si'],
	usage: '<none>',
    args: false,
    admin: false,
    
    run: async (message) => {

        let serv = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setTitle(`Server name: ${message.guild.name}`)
            .addField(`Total members:`,` ${message.guild.memberCount}`)
            .addField(`Créateur du Server`,`${message.guild.owner}`)
            .setFooter("demandé par @" + message.author.tag)
            .setColor('#0099ff')
        
        message.channel.send(serv);
    }
}