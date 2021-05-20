const {setGuildInfo} = require("../../guildConfig");

const mongo = require('mongoose')

module.exports = {
    name: "ready",
    loaded: true,

    execute(client, Discord, mongoose) {
        console.log('\x1b[35m','\n\n⇐=','\x1b[45m\x1b[32m','Prono is now ONLINE','\x1b[40m\x1b[35m','=⇒','\x1b[37m');

        /* Set the activity of the client every 2sec */
        let i = 0
        setInterval(() => {
            const statuses = [
                `Prono Bot`,
                `$open`,
                `by Hokanosekai`,
                `by Zyksa`,
                `&help`
            ]
            client.user.setActivity(statuses[i]).then(() => {
                i = ++i % statuses.length
            })
        }, 2000)

        setGuildInfo(mongoose)


    }
}