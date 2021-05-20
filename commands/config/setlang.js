const {setGuildInfo} = require("../../guildConfig");

const guild_controller = require('../../controllers/controller.guild')

const name = 'setlang'
const category = 'config'

module.exports = {
    name,
    category,
    description: 'Change the default language of the bot',
    aliases: null,
    usage: '<lang [a-z]*2>',
    args: true,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.author

        const langF = langFile.commands[category][name]

        const abbrs = []
        langF.langs.forEach(a => {abbrs.push(a.abbr)})
        if (!abbrs.includes(args[0].toLowerCase())) return message.channel.send(`[❌] <@${author.id}> ${langF.no_lang}`)

        guild_controller.update({_id: db_values.GUILD._id, type:'lang', value:args[0].toLowerCase()}).then(() => {
            setGuildInfo()
            return message.channel.send(`[✅] <@${author.id}> ${langF.success}`)
        })
    }
}