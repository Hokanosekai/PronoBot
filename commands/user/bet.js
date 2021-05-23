const {capitalize} = require("../../functions");
const {ObjectId} = require("bson");

const bet_controller = require('../../controllers/controller.bet')
const user_controller = require('../../controllers/controller.user')

const name = 'bet'
const category = 'user'

module.exports = {
    name,
    category,
    description: "Betting on a match",
    aliases: null,
    usage: '<club> <mise>',
    args: true,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const USER = db_values.USER
        const MATCH = db_values.MATCH
        const BET = db_values.BET

        const langF = langFile.commands[category][name]

        let beti = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setFooter("Pronobot - ©2021")
            .setColor('GREEN')

        if (args.length < 2) return

        /* if bet is negate */
        if (args[1] <= 0 && args[1] !== 'all') return message.channel.send(`[❌] <@${author.id}> ${langF.negate}`)

        /* if user did not exist */
        if (USER === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_account.replace('[prefix]', db_values.GUILD.prefix)}`)

        /* if user have not enough money */
        if (USER.money < args[1] && args[1] !== 'all') return message.channel.send(`[❌] <@${author.id}> ${langF.no_money}`)

        let mise = args[1] === 'all'? USER.money : args[1]

        /* if there is no match in server */
        if (MATCH === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_match}`)

        /* id user already have in progress bet */
        if (BET !== undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.already_bet}`)

        const match_info = JSON.parse(MATCH.info)

        /* if the end date of match is passed */
        let diff = match_info.end_date !== null? Date.now() - match_info.end_date : 0
        if (diff > 0) return message.channel.send(`[❌] <@${author.id}> ${langF.time_pass}`)

        /* if club selected did not exist */
        const club = args[0].toLowerCase()
        if (club !== match_info.atk_n && club !== match_info.def_n && club !== match_info.nul_n) return message.channel.send(`[❌] <@${author.id}> ${langF.no_club}`)

        let cote
        switch (club) {
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

        const betData = {
            guild_id: ObjectId(db_values.GUILD._id),
            user_id: ObjectId(USER._id),
            match_id: ObjectId(MATCH._id),
            info: JSON.stringify({
                "club": club,
                "cote": cote,
                "somme": mise,
                "gain": mise*cote
            })
        }

        bet_controller.create(betData).then(() => {

            user_controller.update({_id: USER._id, type: 'money', value: USER.money - mise}).then(() => {

                message.channel.send(`[✅] <@${author.id}> ${langF.success}`)
                let t = langF.embed_desc.replace('[somme]', mise)
                    .replace('[ville]', capitalize(club))
                    .replace('[cote]', cote)
                    .replace('[gain]', mise*cote)
                    .replace("[s_name]", message.guild.name)

                message.author.send(beti.setDescription(t))

            }).catch(err => console.error(err))
        }).catch(err => console.error(err))
    }
}