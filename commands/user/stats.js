const Discord = require('discord.js')
const {getUser} = require("../../dbManager");

module.exports = {
    name: "stats",
    category: 'User',
    description: "Get your stats",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        let statsCommand = new Discord.MessageEmbed()
            .setTitle("Stats de @" + message.author.tag)
            .setFooter("demandé par @"+message.author.tag)
            .setColor('YELLOW')
            .setThumbnail(author.avatar)

        getUser(author.id).then(user => {
            if (user.length === 0) return message.channel.send(`[❌] <@${author.id}> Il faut te créer un compte pour cette commande`)

            statsCommand.addFields(
                { name: 'Nombre de victoires: ', value: ':trophy: '+ user[0].nb_win },
                { name: 'Nombre de défaites: ', value: ':poop: ' + user[0].nb_loose, inline: true },
                { name: 'Nombre de parties jouées: ', value: ':video_game: ' + user[0].nb_game, inline: true },
            )
            message.channel.send(statsCommand);
        }).catch(err => {
            console.error(err)
        })
    }
}