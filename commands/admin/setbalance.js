const user_controller = require('../../controllers/controller.user')
const guild_controller = require('../../controllers/controller.guild')


module.exports = {
    name: "setbalance",
    category: 'Admin',
    description: "Set the balance of an user",
    aliases: null,
    usage: '<@user> <new balance>',
    args: true,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const member = message.mentions.members.first()

        if (args.length < 2) return

        let user_id = args[0]
        let guild_id = args[1]
        let new_balance = args[2]

        if (new_balance < 0) return message.channel.send(`[❌] <@${author.id}> Vous ne pouvez pas mettre moins que 0.`)

        guild_controller.get({_id: guild_id}).then(res => {
           if (res.length <= 0) return message.channel.send(`[❌] <@${author.id}> Guild inexistante`)
        });

        user_controller.get({_id: user_id}).then(res => {
            if (res.length <= 0) return message.channel.send(`[❌] <@${author.id}> utilisateur inexistant`)
        })

        user_controller.update({_id: user_id, type: 'money', value: new_balance}).then(() => {
            message.channel.send(`vous avez bien modifier la balance de l'utilisateur ${user_id}`)
        })
    }
}