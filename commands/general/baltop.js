const Discord = require('discord.js')
const db = require('../../db')
const {getBalTop} = require("../../dbManager");

module.exports = {
    name: "baltop",
    category: 'General',
    description: "Get the classement of money",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        let statsCommand = new Discord.MessageEmbed()
            .setTitle('**Commande** `&baltop`')
            .setFooter("demandé par @"+message.author.tag)
            .setColor('LIGHT_GREY')
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

        getBalTop().then(res => {
            if (res.length === 0) return message.channel.send(statsCommand.setDescription(`Il n'y a aucuns utilisateurs enregistré dans la bdd`))

            let s = ''
            for (let i = 0; i < res.length; i++) {
                s += i+1 +'. '+ res[i].tag_user + " - " + res[i].money.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'EUR',
                }) + ' :coin:\n'
            }

            statsCommand.setDescription(s);

            message.channel.send(statsCommand);
        }).catch(err => {
            console.error(err)
        })
    }
}