const log = require('../../log')
const {setGuildInfo} = require("../../guildConfig");
const guild_controller = require('../../controllers/controller.guild')
const config_controller = require('../../controllers/controller.config')

module.exports = {
    name: "guildCreate",
    loaded: true,
    once: false,

    execute: async (guild) => {

        let r = ""
        await guild.roles.create({
            data: {
                name: 'Notif PronoBot',
                color: 'BLUE',
                permissions: 'SEND_MESSAGES',
                mentionable: true
            }
        }).then(async () => {
            r = await guild.roles.cache.find(role => role.name === "Notif PronoBot")

        }).catch(console.error);

        const guildData = {
            serverID: guild.id,
            serverAvatar: guild.iconURL()? guild.iconURL(): "null",
            serverName: guild.name,
            prefix: "&",
            lang: "fr",
            notif: r.id
        }

        guild_controller.create(guildData).then(() => {
            setGuildInfo()
        }).catch(err => console.error(err))
        config_controller.update({_id: '60abcf4ba4151560f5ad248c', type: 'guild'}).catch(err => console.error(err))



        log(`: New server added : ${guild.name} | ${guild.id}`)
    }
}