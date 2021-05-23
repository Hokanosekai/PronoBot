const user_controller = require('../../controllers/controller.user')

const name = 'transfer'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Transfer money between users",
    aliases: ['send'],
    usage: '<money> <@user>',
    args: true,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member
        const member = message.mentions.members.first()

        const USER = db_values.USER

        const langF = langFile.commands[category][name]

        if (args.length !== 2) return

        if (args[0] <= 0) return message.channel.send(`[❌] <@${author.id}> ${langF.negate}`)

        if (!member) return message.channel.send(`[❌] <@${author.id}> ${langF.no_mention}`)

        if (USER === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_account.replace('[prefix]', db_values.GUILD.prefix)}`)

        if (USER.money < args[0]) return message.channel.send(`[❌] <@${author.id}> ${langF.no_money}`)

        const MEMBER = await user_controller.get({guild: db_values.GUILD._id, user: member.id}).then(r => {return r[0]}).catch(err => console.error(err))
        if (MEMBER === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_exist}`)

        user_controller.update({_id: USER._id, type: 'money', value: USER.money - parseInt(args[0])}).then(() => {
            message.author.send(langF.send.replace('[money]', args[0]).replace('[user]', MEMBER.userTag))
        }).catch(err => console.error(err))

        const receiver = client.users.cache.get(MEMBER.userID)
        user_controller.update({_id: MEMBER._id, type: 'money', value: MEMBER.money + parseInt(args[0])}).then(() => {
            receiver.send(langF.receive.replace('[money]', args[0]).replace('[user]', USER.userTag))
        }).catch(err => console.error(err))
    }
}