const log = require('../../util/log')
const {setGuildInfo} = require("../../util/guildConfig");
const guild_controller = require('../../controllers/controller.guild')
const user_controller = require('../../controllers/controller.user')
const bet_controller = require('../../controllers/controller.bet')
const match_controller = require('../../controllers/controller.match')

module.exports = {
    name: "guildDelete",
    loaded: true,
    once: false,
    execute(guild, client) {

        guild_controller.get({guild: guild.id}).then(async g => {
            const n = await guild.roles.cache.find(role => role.id === g[0].notif)
            await user_controller.get({guild: g[0]._id}).then(res => {
                res.forEach(r => {
                    const member = guild.members.cache.get(r.userID)
                    if (member) member.roles.remove(n)
                })
                n.delete().then(console.log('test'))
            })




            guild_controller.delete({_id: g[0]._id}).catch(err => console.error(err))
            user_controller.delete({guild: g[0]._id}).catch(err => console.error(err))
            bet_controller.delete({guild: g[0]._id}).catch(err => console.error(err))
            match_controller.delete({guild: g[0]._id}).catch(err => console.error(err))

            log(`: Deleted server : ${guild.name} | ${guild.id}`)
            setGuildInfo()
        }).catch(err => console.error(err))
    }
}