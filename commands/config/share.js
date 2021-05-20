const Discord = require("discord.js");
const name = 'share'
const category = 'config'

module.exports = {
    name,
    category,
    description: "Share the bot to your friends",
    aliases: null,
    usage: null,
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile) => {

        const langF = langFile.commands[category][name]

        let share = new Discord.MessageEmbed()
            .setTitle(`**${langF.embed_title}**`)
            .setColor('#451F55')
            .addFields(
                {name: langF.add, value: '[Add Link](https://discord.com/oauth2/authorize?client_id=835256483356737546&scope=bot&permissions=8)'},
                {name: langF.web, value: '[Our Website](https://pronobot.top/)'}
            )

        await message.channel.send(share)
    }
}