const Discord = require('discord.js')
const {updateMoney, getUser, removeBetById, getBetByUserByGuild} = require("../../dbManager");

module.exports = {
    name: "unbet",
    category: 'User',
    description: "Delete the last bet in progress",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,

    run: async (message, args, client) => {
        const author = message.member
        const guildId = message.guild.id

        let unbet = new Discord.MessageEmbed()
            .setTitle('Bet supprimé !')
            .setFooter("Pronobot - 2021")
            .setColor('RED')

        getBetByUserByGuild(author.id, guildId).then(async bet => {
            if (bet.length === 0) return message.channel.send(`[❌] <@${author.id}> Erreur, soit tu n'as pas de comptes, soit tu n'as pas de bet en cours.`)

            await removeBetById(bet[0].id)
            getUser(author.id).then(async user => {
                await updateMoney(author.id, user[0].money + bet[0].somme).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.error(err)
            })

            message.channel.send(`[✅] <@${author.id}> vient d'annuler son dernier bet :poop:`)
            await message.author.send(unbet.setDescription(`Votre paris à ${bet[0].somme} :coin: sur ${bet[0].ville} avec une cote à @${bet[0].cote} a bien été annulé`))
        }).catch(err => {
            console.error(err)
        })
    }
}