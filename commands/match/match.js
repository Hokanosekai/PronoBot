const dateformat = require('dateformat')
const {capitalize} = require("../../functions");



const name = 'match'
const category = 'match'

module.exports = {
    name,
    category,
    description: "Match in progress",
    aliases: null,
    usage: '<none>',
    args: false,
    admin: false,
    loaded: true,

    run: async (message, args, client, langFile, db_values, Discord) => {
        const author = message.member

        const langF = langFile.commands[category][name]

        if (db_values.MATCH === undefined) return message.channel.send(`[❌] <@${author.id}> ${langF.no_match}`)

        const match_info = JSON.parse(db_values.MATCH.info)

        let matche = new Discord.MessageEmbed()
            .setTitle(langF.embed_title)
            .setColor('DARK_GREEN')
            .addFields(
                {name: capitalize(match_info.atk_n), value: '@'+match_info.atk_c, inline: true},
                {name: capitalize(match_info.nul_n), value: '@'+match_info.nul_c, inline: true},
                {name: capitalize(match_info.def_n), value: '@'+match_info.def_c, inline: true}
            )
            .setDescription(langF.no_time)
            .setFooter("Pronobot - ©2021")

        if (match_info.end_date !== 'null') {
            let restTime = match_info.end - Date.now()
            matche.setDescription(langF.time.replace('[time]', dateformat(new Date(restTime).getTime(), "HH'h'MM'min'ss'sec' UTC")))
        }

        await message.channel.send(matche)
    }
}