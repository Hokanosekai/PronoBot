const userC = require('../../controllers/controller.user')
const guildC = require('../../controllers/controller.guild')

const name =  "balance"
const category = 'user'

module.exports = {
    name,
    category,
    description: "See available money on your account",
    aliases: ["money", "bal"],
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        if (db_values.USER === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_account}`)

        message.channel.send(`[✅] <@${author.id}> ${langF.success.replace('[money]',db_values.USER.money)}`)
    }
}