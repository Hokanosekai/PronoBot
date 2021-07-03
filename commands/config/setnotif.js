const {setGuildInfo} = require("../../util/guildConfig");

const guild_controller = require('../../controllers/controller.guild')
const user_controller = require('../../controllers/controller.user')

const name = 'setnotif'
const category = 'config'

module.exports = {
    name,
    category,
    description: 'Change the default notification role',
    aliases: null,
    usage: '<role id>',
    args: true,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {

        const author = message.author

        const langF = langFile.commands[category][name]

        guild_controller.update({_id: db_values.GUILD._id, type:'notif', value:args[0]}).then(() => {
            setGuildInfo()

            user_controller.get({guild: db_values.GUILD._id}).then(res => {
                const n = message.guild.roles.cache.find(role => role.id === args[0])
                res.forEach(u => {
                    const member = message.guild.members.cache.get(u.userID)
                    if (member) member.roles.add(n)
                })
            })

            return message.channel.send(`[✅] <@${author.id}> ${langF.success}`)
        })
    }
}