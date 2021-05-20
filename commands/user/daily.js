const userC = require('../../controllers/controller.user')

const name = 'daily'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Get daily reward",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values) => {
        const author = message.member

        const USER = db_values.USER

        const langF = langFile.commands[category][name]

        if (USER === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_account}`)

        if (USER.daily_claimed) return message.channel.send(`[❌] <@${author.id}> ${langF.already}`)

        await userC.update({_id: USER._id, type:'money', value: USER.money + 5}).catch(err => console.error(err))

        await userC.update({_id: USER._id, type: 'daily', value: true}).catch(err => console.error(err))

        message.channel.send(`[✅] <@${author.id}> ${langF.success.replace('[plus]', USER.money+5)}`)
    }
}