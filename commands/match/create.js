const Discord = require('discord.js')
const db = require('../../db')
const {addMatch} = require("../../dbManager");
const {getMatch} = require("../../dbManager");

module.exports = {
    name: "create",
    category: 'Match',
    description: "Create a match",
    aliases: null,
    usage: '<club1> @<cote1> <nul> @<cote_nul> <club2> @<cote2> optional: <2021-04-30T15:00:00>',
    args: true,
    admin: true,

    run: async (message, args, client) => {
        const author = message.member
        const guildId = message.guild.id

        //if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send(`[❌] <@${author.id}> Vous n'avez pas la permission d'éxecuter cette commande`)

        if (args.length < 6) return

        let date = args[6]? new Date(`${args[6]}`).getTime() : 'null'

        getMatch(guildId).then(async match => {
            if (match.length !== 0) return message.channel.send(`[❌] <@${author.id}> Il y a déjà un match en cours :crossed_flags:`)

            const values = {
                id_g: guildId,
                id_u: author.id,
                atk_n: args[0].toLowerCase(),
                atk_c: args[1].substring(1),
                nul_n: args[2].toLowerCase(),
                nul_c: args[3].substring(1),
                def_n: args[4].toLowerCase(),
                def_c: args[5].substring(1),
                end: date
            }
            await addMatch(values).then(() => {

                let matche = new Discord.MessageEmbed()
                    .setTitle(`**Match** :crossed_flags: ${args[0]} / ${args[4]}`)
                    .setColor('DARK_GREEN')
                    .addFields(
                        {name: args[0], value: args[1], inline: true},
                        {name: args[2], value: args[3], inline: true},
                        {name: args[4], value: args[5], inline: true}
                    )
                    .setDescription(`Utilisez \`&bet <club> <somme>\` pour miser`)

                if (args[6] === 'null') {
                    matche.setDescription(`Utilisez \`&bet <club> <somme>\` pour miser \nVous ne pourrez plus parier à partie de : ${args[6]}`)
                }

                message.channel.send(matche)

            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            console.error(err)
        })
    }
}