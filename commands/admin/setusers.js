const guild_controller = require('../../controllers/controller.guild')
const user_controller = require('../../controllers/controller.user')

module.exports = {
    name: "setusers",
    category: 'Admin',
    description: "Set the balance of an user",
    aliases: null,
    usage: '<@user> <new balance>',
    args: false,
    admin: true,
    loaded: false,

    run: async (message, args, client, langFile, db_values, Discord) => {

        const request = require('request')

        let gs
        gs = await guild_controller.get({}).then(res => {return res}).catch(err => console.error(err))

        request('https://pronobot.top/api/users', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            let i = 0
            body.data.forEach(u => {

                let gu
                gs.forEach(g => {
                    if (g.serverName === u.guild.discord_name) gu = g._id
                })

                let t = u.gain_tot === null?0 : u.gain_tot
                let y = u.mise_tot === null?0 : u.mise_tot

                const user = {
                    userID: u.userID,
                    userAvatar: `${u.userAvatar}`,
                    userTag: u.userTag,
                    guild_id: ObjectId(`${gu}`),
                    money: u.money,
                    win: u.win,
                    loose: u.loose,
                    game: u.game,
                    gain_tot: t,
                    mise_tot: y,
                    daily_claimed: false
                }



                user_controller.create(user).then(() => {
                    console.log('Success user n°'+i,u.userTag)
                    message.channel.send(`[✅] Success user n°${i} <${u.userTag}>`)
                    i++
                }).catch(err => console.error(err))

            })
        });

    }
}