const Discord = require('discord.js')
const db = require('../../db')
const {getTopWin} = require("../../dbManager");

module.exports = {
    name: "topwin",
    category: 'General',
    description: "Affiche le classement en fonction du nombre de victoires",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        let statsCommand = new Discord.MessageEmbed()
            .setTitle('Classement par nombre de victoires')
            .setFooter("demandé par @"+message.author.tag)
            .setColor('YELLOW')
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

        getTopWin().then(res => {
            if (res.length === 0) return message.channel.send(`[❌] <@${author.id}> La BDD est vide.`)

            let s = ''
            for (let i = 0; i < res.length; i++) {
                s += i+1 +'. '+ res[i].tag_user + " - " + res[i].nb_win + '\n'
            }

            statsCommand.setDescription(s);

            message.channel.send(statsCommand);
        }).catch(err => {
            console.error(err)
        })
    }
}