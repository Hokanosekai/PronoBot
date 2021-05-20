
const log = require('../../log')
module.exports = {
    name: "guildBanAdd",
    loaded: false,
    once: false,
    execute(guild, user) {
        const author = user.id
        const guildID = guild.id

        getUser({id_u: author, id_g: guildID}).then(async u => {
            if (u.length === 0) return
            await removeUser({id: u[0].id, id_u: null, id_g: null}).catch(err => {
                console.error(err)
            })
            await removeBet({id: null, id_u: author, id_g: guildID}).catch(err => {
                console.error(err)
            })
            log(`: Deleted user / Banned / ${user.tag} | ${user.id} | ${guildID}`)
        }).catch(err => {
            console.error(err)
        })
    }
}