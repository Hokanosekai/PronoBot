const Discord = require('discord.js')
const db = require('../../db')
const {getTopLoose} = require("../../dbManager");

module.exports = {
    name: "toploose",
    category: 'General',
    description: "Affiche le classement en fonction du nombre de défaites",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member
        
        let statsCommand = new Discord.MessageEmbed()
            .setTitle('Classement par nombre de défaites')
            .setFooter("demandé par @"+message.author.tag)
            .setColor('BROWN')
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

        getTopLoose().then(res => {
            if (res.length === 0) return message.channel.send(`[❌] <@${author.id}> La BDD est vide.`)

            let s = ''
            for (let i = 0; i < res.length; i++) {
                s += i+1 +'. '+ res[i].tag_user + " - " + res[i].nb_loose + '\n'
            }

            statsCommand.setDescription(s);

            message.channel.send(statsCommand);
        }).catch(err => {
            console.error(err)
        })
    }
}