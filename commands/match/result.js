const Discord = require('discord.js')
const {removeMatch} = require("../../dbManager");
const {removeBetByGuild} = require("../../dbManager");
const {updateLoose} = require("../../dbManager");
const {updateWin} = require("../../dbManager");
const {updateMoney} = require("../../dbManager");
const {updateGame} = require("../../dbManager");
const {getUser} = require("../../dbManager");
const {getBetsByGuild} = require("../../dbManager");
const {getMatch} = require("../../dbManager");

module.exports = {
    name: "result",
    category: 'Match',
    description: "Give the result of a match",
    aliases: null,
    usage: '<winner>',
    args: true,
    admin: true,

    run: async (message, args, client) => {
        const author = message.member

        //if (!author.hasPermission('ADMINISTRATOR')) return message.channel.send(`[❌] <@${author.id}> Vous n'avez pas la permission d'éxecuter cette commande`)

        let resultat = args[0].toLowerCase();
        let guildId = message.guild.id;

        getMatch(guildId).then(async match => {
            if (match.length === 0) return message.channel.send(`[❌] <@${author.id}> Il n'y a aucun match en cours`)

            if((resultat !== match[0].atk_name) && (resultat !== match[0].def_name) && (resultat !== match[0].nul_name)) return message.channel.send(`[❌] <@${author.id}> Ce match n'existe pas`)

            let cote
            switch (resultat) {
                case match[0].atk_name :
                    cote = match[0].atk_cote
                    break
                case match[0].def_name :
                    cote = match[0].def_cote
                    break
                default :
                    cote = match[0].nul_cote
                    break
            }

            getBetsByGuild(guildId).then(async bets => {
                console.log(bets.length)
                if (bets.length === 0) return

                bets.forEach(bet => {
                    getUser(bet.id_user).then(async user => {
                        const member = client.users.cache.get(user[0].id_user)
                        //console.log(member)
                        //console.log(bet.id,user.nb_game, user.nb_loose, user.nb_win)

                        let del = new Discord.MessageEmbed()
                            .setTitle('Match terminé !')
                            .setFooter("Pronobot - 2021")
                            .setColor('GREE')
                            .addFields(
                                {name: match[0].atk_name.replace(/^\w/, c => { return c.toUpperCase()}), value: '@'+match[0].atk_cote, inline: true},
                                {name: match[0].nul_name.replace(/^\w/, c => { return c.toUpperCase()}), value: '@'+match[0].nul_cote, inline: true},
                                {name: match[0].def_name.replace(/^\w/, c => { return c.toUpperCase()}), value: '@'+match[0].def_cote, inline: true}
                            )
                            .setDescription(`
                                Vous avez perdu ${bet.somme} :coin:
                                Vous aviez misé sur **${bet.ville}**
                                Serveur -> **${message.guild.name}**
                            `)

                        if (bet.ville === resultat) {

                            await updateMoney(user[0].id_user, user[0].money + bet.gain).catch(err => {
                                console.log(err)
                            })
                            await updateWin(user[0].id_user, user[0].nb_win + 1).catch(err => {
                                console.log(err)
                            })

                            del.setDescription(`
                                Vous avez gagner ${bet.gain} :coin:
                                Vous aviez misé sur **${bet.ville}**
                                Serveur -> **${message.guild.name}**
                            `)
                        } else {
                            await updateLoose(user[0].id_user, user[0].nb_loose + 1).catch(err => {
                                console.log(err)
                            })
                        }

                        await updateGame(user[0].id_user, user[0].nb_game + 1).then(() => {
                            member.send(del)
                        }).catch(err => {
                            console.log(err)
                        })

                    }).catch(err => {
                        console.log(err)
                    })
                })

            }).catch(err => {
                console.log(err)
            })

            await removeMatch(guildId).catch(err => {
                console.log(err)
            })
            await removeBetByGuild(guildId).catch(err => {
                console.log(err)
            })

            if (resultat === 'nul') return message.channel.send(`[✅] <@${author.id}> :loudspeaker: Match terminé ! Aucun gagnant: ${args[0].replace(/^\w/, c => { return c.toUpperCase()})} @${cote}`)
            return message.channel.send(`[✅] <@${author.id}> :loudspeaker: Match terminé ! Gagnant: ${args[0].replace(/^\w/, c => { return c.toUpperCase()})} @${cote}`)

        }).catch(err => {
            console.log(err)
        })
    }
}