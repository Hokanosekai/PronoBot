const Discord = require('discord.js')
const {getBetByUserByGuild} = require("../../dbManager");
const {getBetsByUser} = require("../../dbManager");
const {updateMoney, addBet, getMatch, getUser} = require("../../dbManager");

module.exports = {
    name: "bet",
    category: 'User',
    description: "Betting on a match",
    aliases: null,
    usage: '<club> <mise>',
    args: true,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member
        const guildId = message.guild.id
        const club = args[0].toLowerCase()

        let beti = new Discord.MessageEmbed()
            .setTitle('Bet validé !')
            .setFooter("Pronobot - 2021")
            .setColor('GREEN')

        if (args.length < 2) return

        /* Si mise negative */
        if (args[1] <= 0 && args[1] !== 'all') return message.channel.send(`[❌] <@${author.id}> Tu ne peux pas miser 0 :coin:`)

        getUser(author.id).then(async user => {
            /* Si l'utilisateur n'est pas enregisté */
            if (user.length === 0) return message.channel.send(`[❌] <@${author.id}> Il faut te créer un compte pour cette commande`)

            /* Si la mise est plus grande que le solde */
            if (user[0].money < args[1] && args[1] !== 'all') return message.channel.send(`[❌] <@${author.id}> Tu ne possèdes pas suffisament de :coin: pour placer ce bet`)

            let mise = args[1] === 'all'? user[0].money : args[1]
            //console.log(mise, args[1])

            await getMatch(guildId).then(async match => {
                /* Si il n'y a pas de match */
                if (match.length === 0) return message.channel.send(`[❌] <@${author.id}> Il n'y a pas de matchs en cours`)

                await getBetByUserByGuild(user[0].id_user, match[0].id_guild).then(async bet => {
                    if (bet.length !== 0) return message.channel.send(`[❌] <@${author.id}> Tu as déja un bet en cours sur ce match, annule le pour en refaire un`)

                    let diff = match[0].end_date !== null? Date.now() - match[0].end_date : 0
                    console.log(match[0].end_date, Date.now(), diff)

                    if (diff > 0) return message.channel.send(`[❌] <@${author.id}> Tu ne peux plus parier sur ce match`)

                    /* Si atk/def n'existe pas */
                    if (club !== match[0].atk_name && club !== match[0].def_name && club !== match[0].nul_name) return message.channel.send(`[❌] <@${author.id}> Le club que tu as choisie ne joue pas ce match`)

                    let cote
                    switch (club) {
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

                    const values = {
                        id_g: guildId,
                        id_u: author.id,
                        club: club,
                        cote: cote,
                        somme: mise,
                        gain: mise*cote
                    }

                    await addBet(values).catch(err => {
                        console.error(err)
                    })
                    await updateMoney(author.id, user[0].money - mise).catch(err => {
                        console.error(err)
                    })

                    message.channel.send(`[✅] <@${author.id}> vient de parier :zap:`)
                    await message.author.send(beti.setDescription(`
                        Vous avez misé ${mise} :coin: sur **${club.replace(/^\w/, c => { return c.toUpperCase() })}**,
                        Avec une cote à @${cote}, vous pouvez gagner ${mise*cote} :coin:
                        Serveur -> **${message.guild.name}**
                    `))
                }).catch(err => {
                    console.error(err)
                })
            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            console.error(err)
        })
    }
}