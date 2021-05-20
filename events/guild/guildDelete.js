const log = require('../../log')

const guild_controller = require('../../controllers/controller.guild')

module.exports = {
    name: "guildDelete",
    loaded: true,
    once: false,
    execute(guild, client) {

        guild_controller.get({guild: guild.id}).then(g => {
            guild_controller.delete({_id: g[0]._id}).catch(err => console.error(err))
            log(`: Deleted server : ${guild.name} | ${guild.id}`)
        }).catch(err => console.error(err))
    }
}