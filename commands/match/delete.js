const {capitalize} = require("../../util/functions");

const bet_controller = require('../../controllers/controller.bet')
const user_controller = require('../../controllers/controller.user')
const match_controller = require('../../controllers/controller.match')

const name = 'delete'
const category = 'match'

module.exports = {
    name,
    category,
    description: "Delete in progress match",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        const MATCH = db_values.MATCH

        let del = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setFooter("Pronobot - ©2021")
            .setColor('RED')

        if (MATCH === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_match}`)

        const match_info = JSON.parse(MATCH.info)

        let bets = []
        bets = await bet_controller.get({match: MATCH._id}).then(b => {
            return b
        }).catch(err => console.error(err))

        await bets.forEach((bet) => {

            user_controller.get({_id: bet.user_id}).then(u => {
                const USER = u[0]

                const bet_info = JSON.parse(bet.info)
                const member = client.users.cache.get(USER.userID)

                user_controller.update({_id: USER._id, type:'money', value: USER.money + parseInt(bet_info.somme)}).then(() => {

                    member.send(del.setDescription(langF.embed_desc.replace('[atk_name]', capitalize(match_info.atk_n))
                        .replace('[atk_cote]', match_info.atk_c)
                        .replace('[def_name]', capitalize(match_info.def_n))
                        .replace('[def_cote]', match_info.def_c)
                        .replace('[s_name]', bet.guild_id.serverName)
                    ))

                    bet_controller.delete({_id: bet._id}).catch(err => console.error(err))

                }).catch(err => console.error(err))
            });

        })

        await match_controller.delete({_id: MATCH._id}).then(() => {
            const n = db_values.GUILD.notif? db_values.GUILD.notif : author.id
            message.channel.send(`[✅] ${langF.success.replace('[author]', n)}`)
        }).catch(err => console.error(err))
    }
}