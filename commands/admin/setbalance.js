const Discord = require('discord.js')

module.exports = {
    name: "setbalance",
    category: 'Admin',
    description: "Set the balance of an user",
    aliases: null,
    usage: '<@user> <new balance>',
    args: true,
    admin: true,
    loaded: false,

    run: async (message, args, client, langFile) => {
        const author = message.member

        const member = message.mentions.members.first()

        if (args.length < 2) return

        if (!member) return message.channel.send(`[❌] <@${author.id}> Veuiller mentionner un utilisateur.`)

        if (args[1] < 0) return message.channel.send(`[❌] <@${author.id}> Vous ne pouvez pas mettre moins que 0.`)

        getUser(member.id).then(async user => {
            if (user.length === 0) return message.channel.send(`[❌] <@${author.id}> Erreur, cet utilisateur n'existe pas.`)

            let bet = new Discord.MessageEmbed()
                .setTitle(`Commande \`&setbalance\``)
                .setColor('DARK_GREEN')
                .setDescription(`Vous avez mis la balance de ${member.tag} à ${args[1]} :coin:`)

            await updateMoney(user[0].id_user, args[1]).then(() => {
                message.author.send(bet)

            }).catch(err => {
                console.error(err)
            })

        }).catch(err => {
            console.error(err)
        })
    }
}