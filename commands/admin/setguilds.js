const guild_controller = require('../../controllers/controller.guild')

module.exports = {
    name: "setguilds",
    category: 'Admin',
    description: "Set the balance of an user",
    aliases: null,
    usage: '<@user> <new balance>',
    args: false,
    admin: true,
    loaded: false,

    run: async (message, args, client, langFile, db_values, Discord) => {

        const request = require('request')

        request('https://pronobot.top/api/guilds', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            let i = 0
            body.data.forEach(g => {

                const guild = {
                    serverID: g.discord_id,
                    serverAvatar: `${g.userAvatar}`,
                    serverName: g.discord_name,
                    prefix: g.prefix,
                    lang: g.lang,
                }

                guild_controller.create(guild).then(() => {
                    console.log('Success user n°'+i,g.discord_name)
                    message.channel.send(`[✅] Success user n°${i} <${g.discord_name}>`)
                    i++
                }).catch(err => console.error(err))

            })
        });

    }
}