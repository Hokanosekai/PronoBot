const Discord = require('discord.js')
const db = require('../../db')
const dateformat = require('dateformat')
const {getMatch} = require("../../dbManager");

module.exports = {
    name: "match",
    category: 'Match',
    description: "Match in progress",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        getMatch(message.guild.id).then(async match => {
            if (match.length === 0) return message.channel.send(`[❌] <@${author.id}> Il n'y a pas de match en cours sur ce serveur`)

            let matche = new Discord.MessageEmbed()
                .setTitle(`Match actuel :crossed_flags:`)
                .setColor('DARK_GREEN')
                .addFields(
                    {name: match[0].atk_name.replace(/^\w/, c => { return c.toUpperCase()}), value: '@'+match[0].atk_cote, inline: true},
                    {name: match[0].nul_name.replace(/^\w/, c => { return c.toUpperCase()}), value: '@'+match[0].nul_cote, inline: true},
                    {name: match[0].def_name.replace(/^\w/, c => { return c.toUpperCase()}), value: '@'+match[0].def_cote, inline: true}
                )
                .setDescription('Utilisez `&bet <club> <somme>` pour miser')

            if (match[0].end_date !== 'null') {
                let restTime = match[0].end_date - Date.now()
                matche.setDescription(`Utilisez \`&bet <club> <somme>\` pour miser \nIl reste ${dateformat(new Date(restTime).getTime(), "HH'h'MM'min'ss'sec' UTC")}`)
            }

            await message.channel.send(matche)
        }).catch(err => {
            console.error(err)
        })
    }
}