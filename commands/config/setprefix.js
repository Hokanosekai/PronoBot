const {setGuildInfo} = require("../../guildConfig");

const guild_controller = require('../../controllers/controller.guild')

const name = 'setprefix'
const category = 'config'

module.exports = {
    name,
    category,
    description: 'Change the default language of the bot',
    aliases: null,
    usage: '<new prefix>',
    args: true,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {

        const author = message.author

        const langF = langFile.commands[category][name]

        guild_controller.update({_id: db_values.GUILD._id, type:'prefix', value:args[0]}).then(() => {
            setGuildInfo()
            return message.channel.send(`[✅] <@${author.id}> ${langF.success}${args[0]}]`)
        })
    }
}