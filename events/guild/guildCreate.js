const log = require('../../log')

const guild_controller = require('../../controllers/controller.guild')
const config_controller = require('../../controllers/controller.config')

module.exports = {
    name: "guildCreate",
    loaded: true,
    once: false,

    execute: async (guild) => {

        const guildData = {
            serverID: guild.id,
            serverAvatar: guild.iconURL()? guild.iconURL(): "null",
            serverName: guild.name,
            prefix: "&",
            lang: "fr"
        }

        guild_controller.create(guildData).catch(err => console.error(err))
        config_controller.update({_id: '60abcf4ba4151560f5ad248c', type: 'guild'}).catch(err => console.error(err))

        log(`: New server added : ${guild.name} | ${guild.id}`)
    }
}