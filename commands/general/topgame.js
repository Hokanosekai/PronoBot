const Discord = require('discord.js')
const db = require('../../db')
const {getTopGame} = require("../../dbManager");

module.exports = {
    name: "topgame",
    category: 'General',
    description: "Affiche le classement en fonction du nombre de parties jouées",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        let statsCommand = new Discord.MessageEmbed()
            .setTitle('Classement par parties jouées')
            .setFooter("demandé par @"+message.author.tag)
            .setColor('BLUE')
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

        getTopGame().then(res => {
            if (res.length === 0) return message.channel.send(`[❌] <@${author.id}> La BDD est vide.`)

            let s = ''
            for (let i = 0; i < res.length; i++) {
                s += i+1 +'. '+ res[i].tag_user + " - " + res[i].nb_game + '\n'
            }

            statsCommand.setDescription(s);

            message.channel.send(statsCommand);
        }).catch(err => {
            console.error(err)
        })
    }
}