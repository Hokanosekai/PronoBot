const {capitalize, addXp, removeXp} = require('../../functions')

const bet_controller = require('../../controllers/controller.bet')
const user_controller = require('../../controllers/controller.user')
const match_controller = require('../../controllers/controller.match')
const config_controller = require('../../controllers/controller.config')

const name = 'result'
const category = 'match'

module.exports = {
    name,
    category,
    description: "Give the result of a match",
    aliases: null,
    usage: '<winner>',
    args: true,
    admin: true,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        let result = args[0].toLowerCase();

        const MATCH = db_values.MATCH
        const USER = db_values.USER

        const langF = langFile.commands[category][name]

        if (MATCH === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_match}`)

        const match_info = JSON.parse(MATCH.info)
        if((result !== match_info.atk_n) && (result !== match_info.def_n) && (result !== match_info.nul_n)) return message.channel.send(`[❌] <@${author.id}> ${langF.unknown_match}`)

        let cote
        switch (result) {
            case match_info.atk_n :
                cote = match_info.atk_c
                break
            case match_info.def_n :
                cote = match_info.def_c
                break
            default :
                cote = match_info.nul_c
                break
        }

        let bets = []
        bets = await bet_controller.get({match: MATCH._id}).then(b => {
            return b
        }).catch(err => console.error(err))


        for (const bet of bets) {
            const bet_info = JSON.parse(bet.info)
            let U
            U = await user_controller.get({_id: bet.user_id}).then(b => {
                return b[0]
            }).catch(err => console.error(err))

            let del = new Discord.MessageEmbed()
                .setTitle(langF.embed_title)
                .setFooter("Pronobot - ©2021")
                .setColor('GREE')
                .addFields(
                    {name: capitalize(match_info.atk_n), value: '@'+match_info.atk_c, inline: true},
                    {name: capitalize(match_info.nul_n), value: '@'+match_info.nul_c, inline: true},
                    {name: capitalize(match_info.def_n), value: '@'+match_info.def_c, inline: true}
                )
                .setDescription(langF.loose_msg.replace('[somme]', bet_info.somme)
                    .replace('[ville]', bet_info.club)
                    .replace('[s_name]', bet.guild_id.serverName)
                )

            /* IF USER WIN */
            if (bet_info.club === result) {
                /* Update User Money */
                user_controller.update({_id: U._id, type: 'money', value: U.money + parseInt(bet_info.gain)}).catch(err => console.error(err))

                /* Update User Win */
                user_controller.update({_id: U._id, type: 'win', value: U.win + 1}).catch(err => console.error(err))

                /* Update User Gain Total */
                user_controller.update({_id: U._id, type: 'gain', value: U.gain_tot + parseInt(bet_info.gain)}).catch(err => console.error(err))

                /* Add XP */
                //console.log(addXp(parseInt(bet_info.cote), parseInt(bet_info.somme), U.money))
                user_controller.update({_id: U._id, type: 'xp', value: U.xp + addXp(parseFloat(bet_info.cote), parseFloat(bet_info.somme), U.money)}).catch(err => console.error(err))

                del.setDescription(langF.win_msg.replace('[gain]', bet_info.gain)
                    .replace('[ville]', bet_info.club)
                    .replace('[s_name]', bet.guild_id.serverName)
                )

            /* IF USER LOOSE */
            } else {
                /* Remove XP */
                //console.log(removeXp(parseInt(bet_info.cote), parseInt(bet_info.somme), U.money))
                user_controller.update({_id: U._id, type: 'xp', value: U.xp + removeXp(parseFloat(bet_info.cote), parseFloat(bet_info.somme), U.money)}).catch(err => console.error(err))

                /* Update User Loose */
                user_controller.update({_id: U._id, type: 'loose', value: U.loose + 1}).catch(err => console.error(err))
            }

            /* Update User Game */
            user_controller.update({_id: U._id, type: 'game', value: U.game + 1}).catch(err => console.error(err))

            /* Update User Mise Total */
            user_controller.update({_id: U._id, type: 'mise', value: U.mise_tot + parseInt(bet_info.somme)}).catch(err => console.error(err))


            const member = client.users.cache.get(U.userID)
            if (member !== undefined) member.send(del)

            /* Delete User Bet */
            bet_controller.delete({_id: bet._id}).catch(err => console.error(err))

            /* Update Config Number Bet */
            config_controller.update({_id: '60abcf4ba4151560f5ad248c', type: 'bet'}).catch(err => console.error(err))
        }

        /* Delete Mach  */
        await match_controller.delete({_id: MATCH._id}).catch(err => console.error(err))

        /* Update Config Number Match */
        config_controller.update({_id: '60abcf4ba4151560f5ad248c', type: 'match'}).catch(err => console.error(err))

        const n = db_values.GUILD.notif? db_values.GUILD.notif : author.id
        if (result === 'nul') return message.channel.send(`[✅] <@&${n}> ${langF.no_winner.replace('[nul]', capitalize(args[0])).replace('[cote]', cote)}`)
        return message.channel.send(`[✅] <@&${n}> ${langF.winner.replace('[ville]', capitalize(args[0])).replace('[cote]', cote)}`)
    }
}