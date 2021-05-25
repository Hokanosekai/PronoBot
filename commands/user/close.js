const userC = require('../../controllers/controller.user')

const name = 'close'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Close your account",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        if (db_values.USER === undefined) return  message.channel.send(`[❌] <@${author.id}> ${langF.no_account}`)

        await userC.delete({_id: db_values.USER._id})
            .then(() => {
                const n = db_values.GUILD.notif? db_values.GUILD.notif : author.id
                message.member.roles.remove(n)
                message.channel.send(`[✅] <@${author.id}> ${langF.success}`)
            })
            .catch(err => console.error(err))


        /*u.read({user: author.id, guild: guildID}).then(async user => {
            if (user.length === 0)
            await u.delete({uuid: user[0].uuid}).catch(err => {
                console.error(err)
            })

            await b.read({user: author.id, guild: guildID}).then(async bet => {
                if (bet.length === 0) return
                await b.delete({uuid: bet[0].uuid}).catch(err => {
                    console.error(err)
                })
            }).catch(err => {
                console.error(err)
            })



        }).catch(err => {
            console.error(err)
        })*/
    }
}