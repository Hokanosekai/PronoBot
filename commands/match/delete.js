const Discord = require('discord.js')
const db = require('../../db')
const {removeBetByGuild} = require("../../dbManager");
const {updateMoney} = require("../../dbManager");
const {getUser} = require("../../dbManager");
const {getBetsByGuild} = require("../../dbManager");
const {removeMatch} = require("../../dbManager");
const {getMatch} = require("../../dbManager");

module.exports = {
    name: "delete",
    category: 'Match',
    description: "Delete in progress match",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: true,

    run: async (message, args, client) => {
        const author = message.member
        const guildId = message.guild.id

        let del = new Discord.MessageEmbed()
            .setTitle('Match supprimé !')
            .setFooter("Pronobot - 2021")
            .setColor('RED')

        //if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send(`[❌] <@${author.id}> Tu n'as pas la permission d'éxecuter cette commande`)

        getMatch(guildId).then(async match => {
            if (match.length === 0) return message.channel.send(`[❌] <@${author.id}> Il n'y a pas de match en cours`)

            await getBetsByGuild(guildId).then(async bets => {
                if (bets.length === 0) return

                await bets.forEach(bet => {
                    const member = client.users.cache.get(bet.id_user)

                    getUser(bet.id_user).then(async user => {
                        await updateMoney(user[0].id_user, user[0].money+bet.somme).then(() => {

                            member.send(del.setDescription(`
                                Le Match **${match[0].atk_name.replace(/^\w/, c => { return c.toUpperCase()})} @${match[0].atk_cote} - ${match[0].def_name.replace(/^\w/, c => { return c.toUpperCase()})} @${match[0].def_cote}**
                                sur le serveur **${message.guild.name}** à été annulé.
                                Vous avez été remboursé de l'intégralité de votre mise
                            `))

                        }).catch(err => {
                            console.error(err)
                        })
                    }).catch(err => {
                        console.error(err)
                    })
                })

            }).catch(err => {
                console.error(err)
            })

            message.channel.send(`[✅] :flag_white: Le match à été annulé par <@${author.id}>, tous les parieurs ont été remboursé`)

            await removeMatch(guildId).catch(err => {
                console.error(err)
            })
            await removeBetByGuild(guildId).catch(err => {
                console.error(err)
            })

        }).catch(err => {
            console.error(err)
        })
    }
}