const Discord = require('discord.js')
const {getBetsByUser} = require("../../dbManager");
const {getMatch} = require("../../dbManager");

module.exports = {
    name: "bets",
    category: 'User',
    description: "See all your bets",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member

        getBetsByUser(author.id).then(async bets => {
            if (bets.length === 0) return message.channel.send(`[❌] <@${author.id}> Erreur, soit tu n'as pas de comptes, soit tu n'as pas de bet en cours.`)

            let bet = new Discord.MessageEmbed()
                .setTitle(`Tes bets en cours`)
                .setColor('DARK_GREEN')

            let s = ''
            for (let i = 0; i < bets.length; i++) {
                let serveur = client.guilds.cache.get(bets[i].id_guild)
                s += `${i+1}. **${bets[i].ville.replace(/^\w/, c => {return c.toUpperCase()})}** - @${bets[i].cote} | mise: ${bets[i].somme} :coin: gain: ${bets[i].gain} :coin: | (serveur - ${serveur.name})\n`
            }

            bet.setDescription(s);

            await message.author.send(bet)
        }).catch(err => {
            console.error(err)
        })
    }
}