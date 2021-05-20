const guildC = require('./controllers/controller.guild')

global.GUILD = []
const setGuildInfo = async (mongoose) => {
    guildC.get({}).then(g => {
        let l = []
        g.forEach(t => {
            l.push(t)
        })

        global.GUILD = l
    }).catch(err => console.error(err))
}

module.exports = {
    setGuildInfo
}