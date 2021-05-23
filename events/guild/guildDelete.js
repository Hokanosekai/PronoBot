const log = require('../../log')

const guild_controller = require('../../controllers/controller.guild')
const user_controller = require('../../controllers/controller.user')
const bet_controller = require('../../controllers/controller.bet')
const match_controller = require('../../controllers/controller.match')

module.exports = {
    name: "guildDelete",
    loaded: true,
    once: false,
    execute(guild, client) {

        guild_controller.get({guild: guild.id}).then(g => {
            console.log()

            guild_controller.delete({_id: g[0]._id}).catch(err => console.error(err))
            user_controller.delete({guild: g[0]._id}).catch(err => console.error(err))
            bet_controller.delete({guild: g[0]._id}).catch(err => console.error(err))
            match_controller.delete({guild: g[0]._id}).catch(err => console.error(err))

            log(`: Deleted server : ${guild.name} | ${guild.id}`)
        }).catch(err => console.error(err))
    }
}