const config_controller = require("../../controllers/controller.config");
const user_controller = require("../../controllers/controller.user");
const {setGuildInfo} = require("../../util/guildConfig");

const {getLvl} = require("../../util/levels");

const cron = require('node-cron')

const mongo = require('../../util/mongo')

module.exports = {
    name: "ready",
    loaded: true,

    execute: async (client, Discord, mongoose) => {
        console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','Prono is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');

        /* Set the activity of the client every 2sec */
        let i = 0
        setInterval(async () => {
            const config = await config_controller.get().then(res => {return res[0]}).catch(err => console.error(err))
            const statuses = [
                `PronoBot`,
                `${config.guild_count} servers`,
                `by Hokanosekai`,
                `${config.match_count} matches`,
                `&help`
            ]
            client.user.setActivity(statuses[i]).then(() => {
                i = ++i % statuses.length
            })
        }, 2000)

        setGuildInfo(mongoose).catch(err => console.error(err))


        const config = await config_controller.get().then(res => {return res[0]}).catch(err => console.error(err))
        console.log(config)
        if (config === undefined) {
            let configData = {
                bet_count: 0,
                match_count: 0,
                user_count: 0,
                guild_count: 0
            }
            config_controller.create(configData).catch(err => console.error(err))
        }

        cron.schedule('0 0 * * *', () => {
            user_controller.get({}).then(res => {
                res.forEach(r => {
                    user_controller.update({_id: r._id, type:'daily', value: false}).catch(err => console.error(err))
                })
                console.log('daily reset')
            }).catch(err => console.error(err))
        })
        /*setInterval(() => {
            user_controller.get({}).then(res => {
                res.forEach(r => {
                    user_controller.update({_id: r._id, type:'daily', value: false}).catch(err => console.error(err))
                })
                console.log('daily reset')
            }).catch(err => console.error(err))
        }, 1000*60*60*24)*/
    }
}